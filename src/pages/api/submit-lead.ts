import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../lib/supabase/server';
import { sendLeadNotificationEmail } from '../../lib/resend/server';

export const prerender = false;

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

const validateFields = (fields: FieldValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!fields.consent) {
    errors.consent = 'Consent is required';
  }

  if (!fields.fullName) {
    errors.fullName = 'Full name is required';
  } else if (fields.fullName.length > MAX_LENGTHS.fullName) {
    errors.fullName = `Full name must be under ${MAX_LENGTHS.fullName} characters`;
  }

  if (!fields.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Invalid email address';
  } else if (fields.email.length > MAX_LENGTHS.email) {
    errors.email = `Email must be under ${MAX_LENGTHS.email} characters`;
  }

  if (fields.phoneOrChannel.length > MAX_LENGTHS.phoneOrChannel) {
    errors.phoneOrChannel = `Phone must be under ${MAX_LENGTHS.phoneOrChannel} characters`;
  }

  if (fields.companyName.length > MAX_LENGTHS.companyName) {
    errors.companyName = `Company name must be under ${MAX_LENGTHS.companyName} characters`;
  }

  if (fields.region.length > MAX_LENGTHS.region) {
    errors.region = `Region must be under ${MAX_LENGTHS.region} characters`;
  }

  const isContactOnly = fields.contactMessage.length > 0;

  if (isContactOnly) {
    if (fields.contactMessage.length < 10) {
      errors.contactMessage = 'Message must be at least 10 characters';
    } else if (fields.contactMessage.length > MAX_LENGTHS.contactMessage) {
      errors.contactMessage = `Message must be under ${MAX_LENGTHS.contactMessage} characters`;
    }
  } else {
    if (fields.ideaDescription.length < 80) {
      errors.ideaDescription =
        'Idea description must be at least 80 characters';
    } else if (fields.ideaDescription.length > MAX_LENGTHS.ideaDescription) {
      errors.ideaDescription = `Idea description must be under ${MAX_LENGTHS.ideaDescription} characters`;
    }

    if (!fields.projectType) {
      errors.projectType = 'Project type is required';
    } else if (!isAllowed(fields.projectType, ALLOWED_PROJECT_TYPES)) {
      errors.projectType = 'Invalid project type';
    }

    if (!fields.projectTitle) {
      errors.projectTitle = 'Project title is required';
    } else if (fields.projectTitle.length > MAX_LENGTHS.projectTitle) {
      errors.projectTitle = `Project title must be under ${MAX_LENGTHS.projectTitle} characters`;
    }

    if (fields.targetUsers.length > MAX_LENGTHS.targetUsers) {
      errors.targetUsers = `Target users must be under ${MAX_LENGTHS.targetUsers} characters`;
    }

    if (fields.problemToSolve.length > MAX_LENGTHS.problemToSolve) {
      errors.problemToSolve = `Problem description must be under ${MAX_LENGTHS.problemToSolve} characters`;
    }

    if (fields.desiredOutcome.length > MAX_LENGTHS.desiredOutcome) {
      errors.desiredOutcome = `Outcome description must be under ${MAX_LENGTHS.desiredOutcome} characters`;
    }

    if (fields.extraNotes.length > MAX_LENGTHS.extraNotes) {
      errors.extraNotes = `Notes must be under ${MAX_LENGTHS.extraNotes} characters`;
    }

    if (fields.timeline && !isAllowed(fields.timeline, ALLOWED_TIMELINES)) {
      errors.timeline = 'Invalid timeline';
    }

    if (fields.budgetRange && !isAllowed(fields.budgetRange, ALLOWED_BUDGETS)) {
      errors.budgetRange = 'Invalid budget range';
    }

    if (
      fields.projectStatus &&
      !isAllowed(fields.projectStatus, ALLOWED_PROJECT_STATUSES)
    ) {
      errors.projectStatus = 'Invalid project status';
    }

    if (
      fields.existingDomain &&
      fields.existingDomain.length > MAX_LENGTHS.existingDomain
    ) {
      errors.existingDomain = `Domain must be under ${MAX_LENGTHS.existingDomain} characters`;
    }

    if (fields.existingUrl && !validateUrl(fields.existingUrl)) {
      errors.existingUrl = 'Invalid URL';
    } else if (
      fields.existingUrl &&
      fields.existingUrl.length > MAX_LENGTHS.existingUrl
    ) {
      errors.existingUrl = `URL must be under ${MAX_LENGTHS.existingUrl} characters`;
    }

    if (fields.existingRepo && !validateUrl(fields.existingRepo)) {
      errors.existingRepo = 'Invalid URL';
    } else if (
      fields.existingRepo &&
      fields.existingRepo.length > MAX_LENGTHS.existingRepo
    ) {
      errors.existingRepo = `URL must be under ${MAX_LENGTHS.existingRepo} characters`;
    }

    if (fields.existingBrandAssets.length > MAX_LENGTHS.existingBrandAssets) {
      errors.existingBrandAssets = `Brand assets must be under ${MAX_LENGTHS.existingBrandAssets} characters`;
    }
  }

  return errors;
};

export const POST: APIRoute = async ({ request }) => {
  // Check for Supabase environment variables before proceeding
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return new Response(
      JSON.stringify({
        error:
          'Supabase is not configured for lead submissions. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.',
      }),
      {
        status: 501, // Not Implemented
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await request.formData();

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

    const validationErrors = validateFields(fields);

    if (Object.keys(validationErrors).length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          fields: validationErrors,
        }),
        {
          status: 400,
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
      return new Response(JSON.stringify({ error: supabaseError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
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
      console.error('Lead notification email failed:', emailError);
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
