import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../lib/supabase/server';
import { sendLeadNotificationEmail } from '../../lib/resend/server';
import {
  verifyTurnstileToken,
  rateLimit,
  validateArrayField,
  ALLOWED_FEATURES,
  ALLOWED_TECHNICAL_NEEDS,
  ALLOWED_INTEGRATIONS,
  checkHoneypot,
  checkMinimumCompletionTime,
  checkDuplicateSubmission,
  logAbuseEvent,
} from '../../lib/abuse-protection';

export const prerender = false;

const MAX_REQUEST_SIZE = 1024 * 1024;

const ALLOWED_PROJECT_TYPES = [
  'company website',
  'landing page',
  'SaaS platform',
  'customer portal',
  'booking or request platform',
  'internal business tool',
  'admin dashboard',
  'e-commerce or payment-enabled service',
  'AI-assisted workflow tool',
  'automation or integration',
  'not sure yet',
  'other',
] as const;

const ALLOWED_TIMELINES = [
  'as soon as possible',
  'within 2-4 weeks',
  'within 1-2 months',
  'within 3-6 months',
  'flexible timeline',
  'just exploring',
] as const;

const ALLOWED_BUDGETS = [
  'under 500 EUR',
  '500-1,500 EUR',
  '1,500-3,000 EUR',
  '3,000-7,500 EUR',
  '7,500-15,000 EUR',
  '15,000+ EUR',
  'not sure yet',
] as const;

const ALLOWED_PROJECT_STATUSES = [
  'idea only',
  'rough plan exists',
  'design or specification exists',
  'existing website or app needs improvement',
  'existing product needs new features',
  'urgent business need',
] as const;

const MAX_LENGTHS = {
  fullName: 120,
  email: 254,
  phoneOrChannel: 80,
  companyName: 120,
  region: 80,
  projectType: 60,
  projectTitle: 160,
  ideaDescription: 4000,
  targetUsers: 500,
  problemToSolve: 2000,
  desiredOutcome: 2000,
  contactMessage: 4000,
  existingDomain: 253,
  existingUrl: 2048,
  existingRepo: 2048,
  existingBrandAssets: 1000,
  extraNotes: 2000,
} as const;

const isAllowed = <T>(value: string, allowed: readonly T[]) =>
  allowed.includes(value as T);

const sanitizeText = (value: string) => value.replace(/<[^>]*>/g, '').trim();

const validateUrl = (value: string) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

interface FieldValues {
  fullName: string;
  email: string;
  phoneOrChannel: string;
  companyName: string;
  region: string;
  projectType: string;
  projectTitle: string;
  ideaDescription: string;
  targetUsers: string;
  problemToSolve: string;
  desiredOutcome: string;
  contactMessage: string;
  timeline: string;
  budgetRange: string;
  projectStatus: string;
  existingDomain: string;
  existingUrl: string;
  existingRepo: string;
  existingBrandAssets: string;
  extraNotes: string;
  consent: boolean;
}

const validateFields = (fields: FieldValues): boolean => {
  if (!fields.consent) return false;
  if (!fields.fullName || fields.fullName.length > MAX_LENGTHS.fullName) return false;
  if (!fields.email || !validateEmail(fields.email) || fields.email.length > MAX_LENGTHS.email) return false;
  if (fields.phoneOrChannel.length > MAX_LENGTHS.phoneOrChannel) return false;
  if (fields.companyName.length > MAX_LENGTHS.companyName) return false;
  if (fields.region.length > MAX_LENGTHS.region) return false;

  const isContactOnly = fields.contactMessage.length > 0;

  if (isContactOnly) {
    if (fields.contactMessage.length < 10 || fields.contactMessage.length > MAX_LENGTHS.contactMessage) {
      return false;
    }
  } else {
    if (fields.ideaDescription.length < 80 || fields.ideaDescription.length > MAX_LENGTHS.ideaDescription) return false;
    if (!fields.projectType || !isAllowed(fields.projectType, ALLOWED_PROJECT_TYPES)) return false;
    if (!fields.projectTitle || fields.projectTitle.length > MAX_LENGTHS.projectTitle) return false;
    if (fields.targetUsers.length > MAX_LENGTHS.targetUsers) return false;
    if (fields.problemToSolve.length > MAX_LENGTHS.problemToSolve) return false;
    if (fields.desiredOutcome.length > MAX_LENGTHS.desiredOutcome) return false;
    if (fields.extraNotes.length > MAX_LENGTHS.extraNotes) return false;
    if (fields.timeline && !isAllowed(fields.timeline, ALLOWED_TIMELINES)) return false;
    if (fields.budgetRange && !isAllowed(fields.budgetRange, ALLOWED_BUDGETS)) return false;
    if (fields.projectStatus && !isAllowed(fields.projectStatus, ALLOWED_PROJECT_STATUSES)) return false;
    if (fields.existingDomain.length > MAX_LENGTHS.existingDomain) return false;
    if (fields.existingUrl && (!validateUrl(fields.existingUrl) || fields.existingUrl.length > MAX_LENGTHS.existingUrl)) return false;
    if (fields.existingRepo && (!validateUrl(fields.existingRepo) || fields.existingRepo.length > MAX_LENGTHS.existingRepo)) return false;
    if (fields.existingBrandAssets.length > MAX_LENGTHS.existingBrandAssets) return false;
  }

  return true;
};

const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return 'unknown';
};

const getFingerprint = (email: string, ip: string): string => {
  const data = `${email}:${ip}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `fp-${Math.abs(hash).toString(36)}`;
};

export const POST: APIRoute = async ({ request }) => {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    logAbuseEvent('error', 'Supabase environment variables missing');
    return new Response(
      JSON.stringify({ error: 'Service unavailable' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE) {
    logAbuseEvent('warn', 'Request body too large', {
      contentLength,
    });
    return new Response(
      JSON.stringify({ error: 'Request too large' }),
      {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await request.formData();

    const turnstileToken = String(body.get('turnstileToken') || '');
    const turnstileResult = await verifyTurnstileToken(turnstileToken);

    if (!turnstileResult.success) {
      logAbuseEvent('warn', 'Turnstile verification failed', {
        errorCodes: turnstileResult.errorCodes,
      });
      return new Response(
        JSON.stringify({ error: 'Verification failed' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const ip = getClientIp(request);
    const email = sanitizeText(String(body.get('email') || '')).toLowerCase();
    const fingerprint = getFingerprint(email, ip);

    const rateLimitResult = rateLimit(`lead:${ip}:${fingerprint}`);
    if (!rateLimitResult.allowed) {
      logAbuseEvent('warn', 'Rate limit exceeded', {
        ip,
        fingerprint,
        remaining: rateLimitResult.remaining,
      });
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    const honeypotValue = String(body.get('website') || '');
    const honeypotResult = checkHoneypot(honeypotValue);
    if (!honeypotResult.passed) {
      logAbuseEvent('warn', 'Honeypot triggered', {
        ip,
        reason: honeypotResult.reason,
      });
      return new Response(
        JSON.stringify({ error: 'Submission rejected' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const formLoadedAt = String(body.get('formLoadedAt') || '');
    const timingResult = checkMinimumCompletionTime(formLoadedAt);
    if (!timingResult.passed) {
      logAbuseEvent('warn', 'Minimum completion time not met', {
        ip,
        reason: timingResult.reason,
      });
      return new Response(
        JSON.stringify({ error: 'Submission rejected' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const fields: FieldValues = {
      fullName: sanitizeText(String(body.get('fullName') || '')),
      email: sanitizeText(String(body.get('email') || '')).toLowerCase(),
      phoneOrChannel: sanitizeText(String(body.get('phone') || '')),
      companyName: sanitizeText(String(body.get('company') || '')),
      region: sanitizeText(String(body.get('region') || '')),
      projectType: sanitizeText(String(body.get('projectType') || '')),
      projectTitle: sanitizeText(String(body.get('projectTitle') || '')),
      ideaDescription: sanitizeText(String(body.get('ideaDescription') || '')),
      targetUsers: sanitizeText(String(body.get('targetUsers') || '')),
      problemToSolve: sanitizeText(String(body.get('problemToSolve') || '')),
      desiredOutcome: sanitizeText(String(body.get('desiredOutcome') || '')),
      contactMessage: sanitizeText(String(body.get('contactMessage') || '')),
      timeline: sanitizeText(String(body.get('timeline') || '')),
      budgetRange: sanitizeText(String(body.get('budgetRange') || '')),
      projectStatus: sanitizeText(String(body.get('projectStatus') || '')),
      existingDomain: sanitizeText(String(body.get('existingDomain') || '')),
      existingUrl: sanitizeText(String(body.get('existingUrl') || '')),
      existingRepo: sanitizeText(String(body.get('existingRepo') || '')),
      existingBrandAssets: sanitizeText(
        String(body.get('existingBrandAssets') || '')
      ),
      extraNotes: sanitizeText(String(body.get('extraFeatures') || '')),
      consent: body.get('consent') === 'on',
    };

    const requiredFeatures = body
      .getAll('features')
      .map((v) => sanitizeText(String(v)));
    const technicalNeeds = body
      .getAll('technicalNeeds')
      .map((v) => sanitizeText(String(v)));
    const integrations = body
      .getAll('integrations')
      .map((v) => sanitizeText(String(v)));

    const featuresValidation = validateArrayField(
      'features',
      requiredFeatures,
      ALLOWED_FEATURES
    );
    const technicalNeedsValidation = validateArrayField(
      'technicalNeeds',
      technicalNeeds,
      ALLOWED_TECHNICAL_NEEDS
    );
    const integrationsValidation = validateArrayField(
      'integrations',
      integrations,
      ALLOWED_INTEGRATIONS
    );

    const arrayErrors = [
      ...featuresValidation.errors,
      ...technicalNeedsValidation.errors,
      ...integrationsValidation.errors,
    ];

    if (arrayErrors.length > 0) {
      logAbuseEvent('warn', 'Array field validation failed', {
        ip,
        errors: arrayErrors,
      });
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!validateFields(fields)) {
      logAbuseEvent('warn', 'Field validation failed', {
        ip,
        email,
      });
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const duplicateResult = await checkDuplicateSubmission(
      fields.email,
      fields.projectTitle
    );
    if (duplicateResult.isDuplicate) {
      logAbuseEvent('warn', 'Duplicate submission detected', {
        ip,
        email,
        projectTitle: fields.projectTitle,
      });
      return new Response(
        JSON.stringify({ error: 'Submission rejected' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = getSupabaseServerClient();

    const { data, error: supabaseError } = await supabase
      .from('project_leads')
      .insert({
        full_name: fields.fullName,
        email: fields.email,
        phone_or_channel: fields.phoneOrChannel,
        company_name: fields.companyName,
        region: fields.region,
        project_type: fields.projectType,
        project_title: fields.projectTitle,
        idea_description: fields.contactMessage
          ? fields.contactMessage
          : fields.ideaDescription,
        target_users: fields.targetUsers,
        problem_to_solve: fields.problemToSolve,
        desired_outcome: fields.desiredOutcome,
        required_features: requiredFeatures,
        technical_needs: technicalNeeds,
        timeline: fields.timeline,
        budget_range: fields.budgetRange,
        project_status: fields.projectStatus,
        existing_domain: fields.existingDomain,
        existing_url: fields.existingUrl,
        existing_repo: fields.existingRepo,
        existing_brand_assets: fields.existingBrandAssets,
        integrations,
        extra_notes: fields.extraNotes,
        status: 'new',
        lead_score: 0,
      })
      .select('id')
      .single();

    if (supabaseError) {
      logAbuseEvent('error', 'Supabase insert failed', {
        ip,
        email,
        error: supabaseError.message,
      });
      return new Response(
        JSON.stringify({ error: 'Submission failed' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const leadCreatedAt = new Date().toISOString();

    try {
      await sendLeadNotificationEmail({
        id: String(data?.id),
        fullName: fields.fullName,
        email: fields.email,
        phoneOrChannel: fields.phoneOrChannel,
        companyName: fields.companyName,
        projectType: fields.projectType,
        projectTitle: fields.projectTitle,
        ideaDescription: fields.contactMessage
          ? fields.contactMessage
          : fields.ideaDescription,
        timeline: fields.timeline,
        budgetRange: fields.budgetRange,
        projectStatus: fields.projectStatus,
        requiredFeatures,
        technicalNeeds,
        integrations,
        createdAt: leadCreatedAt,
      });
    } catch (emailError) {
      logAbuseEvent('error', 'Lead notification email failed', {
        leadId: data?.id,
        email: fields.email,
        error: emailError instanceof Error ? emailError.message : 'unknown error',
      });
    }

    logAbuseEvent('info', 'Lead submission successful', {
      leadId: data?.id,
      email: fields.email,
      ip,
    });

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logAbuseEvent('error', 'Unexpected error in submit-lead', {
      error: error instanceof Error ? error.message : 'unknown error',
    });
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};