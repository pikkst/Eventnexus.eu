import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../lib/supabase/server';

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

const isAllowed = <T>(value: string, allowed: readonly T[]) => allowed.includes(value as T);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.formData();

    const fullName = String(body.get('fullName') || '').trim();
    const email = String(body.get('email') || '').trim();
    const phoneOrChannel = String(body.get('phone') || '').trim();
    const companyName = String(body.get('company') || '').trim();
    const region = String(body.get('region') || '').trim();
    const projectType = String(body.get('projectType') || '').trim();
    const projectTitle = String(body.get('projectTitle') || '').trim();
    const ideaDescription = String(body.get('ideaDescription') || '').trim();
    const targetUsers = String(body.get('targetUsers') || '').trim();
    const problemToSolve = String(body.get('problemToSolve') || '').trim();
    const desiredOutcome = String(body.get('desiredOutcome') || '').trim();
    const requiredFeatures = body.getAll('features').map((v) => String(v));
    const technicalNeeds = body.getAll('technicalNeeds').map((v) => String(v));
    const timeline = String(body.get('timeline') || '').trim();
    const budgetRange = String(body.get('budgetRange') || '').trim();
    const projectStatus = String(body.get('projectStatus') || '').trim();
    const existingDomain = String(body.get('existingDomain') || '').trim();
    const existingUrl = String(body.get('existingUrl') || '').trim();
    const existingRepo = String(body.get('existingRepo') || '').trim();
    const existingBrandAssets = String(body.get('existingBrandAssets') || '').trim();
    const integrations = body.getAll('integrations').map((v) => String(v));
    const extraNotes = String(body.get('extraFeatures') || '').trim();
    const contactMessage = String(body.get('contactMessage') || '').trim();
    const consent = body.get('consent') === 'on';

    if (!consent) {
      return new Response(JSON.stringify({ error: 'Consent is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!fullName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isContactOnly = contactMessage.length > 0;

    if (isContactOnly) {
      if (contactMessage.length < 10) {
        return new Response(JSON.stringify({ error: 'Message must be at least 10 characters' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      if (ideaDescription.length < 80) {
        return new Response(JSON.stringify({ error: 'Idea description must be at least 80 characters' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!projectType) {
        return new Response(JSON.stringify({ error: 'Project type is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isAllowed(projectType, ALLOWED_PROJECT_TYPES)) {
        return new Response(JSON.stringify({ error: 'Invalid project type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (timeline && !isAllowed(timeline, ALLOWED_TIMELINES)) {
        return new Response(JSON.stringify({ error: 'Invalid timeline' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (budgetRange && !isAllowed(budgetRange, ALLOWED_BUDGETS)) {
        return new Response(JSON.stringify({ error: 'Invalid budget range' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (projectStatus && !isAllowed(projectStatus, ALLOWED_PROJECT_STATUSES)) {
        return new Response(JSON.stringify({ error: 'Invalid project status' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const supabase = getSupabaseServerClient();

    const { data, error: supabaseError } = await supabase
      .from('project_leads')
      .insert({
        full_name: fullName,
        email,
        phone_or_channel: phoneOrChannel,
        company_name: companyName,
        region,
        project_type: projectType,
        project_title: projectTitle,
        idea_description: isContactOnly ? contactMessage : ideaDescription,
        target_users: targetUsers,
        problem_to_solve: problemToSolve,
        desired_outcome: desiredOutcome,
        required_features: requiredFeatures,
        technical_needs: technicalNeeds,
        timeline,
        budget_range: budgetRange,
        project_status: projectStatus,
        existing_domain: existingDomain,
        existing_url: existingUrl,
        existing_repo: existingRepo,
        existing_brand_assets: existingBrandAssets,
        integrations,
        extra_notes: extraNotes,
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
