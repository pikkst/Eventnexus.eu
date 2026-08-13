import type { APIRoute } from 'astro';
import { getAdminSession } from '../../../../../lib/auth/session';
import { getSupabaseServerClient } from '../../../../../lib/supabase/server';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const result = await getAdminSession(request);
  if (!result.session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.status !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const validStatuses = [
    'new',
    'reviewed',
    'accepted',
    'in_progress',
    'awaiting_client_input',
    'delivered',
    'completed',
    'blocked',
    'on_hold',
    'archived',
    'rejected',
  ];
  if (!validStatuses.includes(body.status)) {
    return new Response(JSON.stringify({ error: 'Invalid status' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .update({ status: body.status })
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
