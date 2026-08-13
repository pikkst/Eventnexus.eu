import type { APIRoute } from 'astro';
import { getAdminSession } from '../../../lib/auth/session';
import { getSupabaseServerClient } from '../../../lib/supabase/server';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const result = await getAdminSession(request);
  if (result.status === 'unauthenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (result.status === 'authenticated') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  let query = supabase
    .from('projects')
    .select(
      'id, created_at, updated_at, lead_id, status, admin_notes, lead_score, next_action, follow_up_date, assigned_admin_id, project_value_estimate, project_leads(full_name, email, project_type, project_title)'
    )
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const result = await getAdminSession(request);
  if (result.status === 'unauthenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (result.status === 'authenticated') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .insert({
      lead_id: body.lead_id || null,
      status: body.status || 'new',
      admin_notes: body.admin_notes || null,
      lead_score: body.lead_score ?? 0,
      next_action: body.next_action || null,
      follow_up_date: body.follow_up_date || null,
      assigned_admin_id: body.assigned_admin_id || null,
      project_value_estimate: body.project_value_estimate || null,
    })
    .select(
      'id, created_at, updated_at, lead_id, status, admin_notes, lead_score, next_action, follow_up_date, assigned_admin_id, project_value_estimate'
    )
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
