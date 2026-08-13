import type { APIRoute } from 'astro';
import { getAdminSession } from '../../../../lib/auth/session';
import { getSupabaseServerClient } from '../../../../lib/supabase/server';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const result = await getAdminSession(request);
  if (!result.session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, created_at, updated_at, lead_id, status, admin_notes, lead_score, next_action, follow_up_date, assigned_admin_id, project_value_estimate, project_leads(full_name, email, project_type, project_title, idea_description)'
    )
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const result = await getAdminSession(request);
  if (!result.session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
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
  const updates: Record<string, unknown> = {};

  if (body.status !== undefined) updates.status = body.status;
  if (body.admin_notes !== undefined) updates.admin_notes = body.admin_notes;
  if (body.lead_score !== undefined) updates.lead_score = body.lead_score;
  if (body.next_action !== undefined) updates.next_action = body.next_action;
  if (body.follow_up_date !== undefined)
    updates.follow_up_date = body.follow_up_date;
  if (body.assigned_admin_id !== undefined)
    updates.assigned_admin_id = body.assigned_admin_id;
  if (body.project_value_estimate !== undefined)
    updates.project_value_estimate = body.project_value_estimate;

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', params.id)
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
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const result = await getAdminSession(request);
  if (!result.session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', params.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(null, {
    status: 204,
  });
};
