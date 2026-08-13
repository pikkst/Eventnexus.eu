import type { APIRoute } from 'astro';
import { getAdminSession } from '../../../../../lib/auth/session';
import { getSupabaseServerClient } from '../../../../../lib/supabase/server';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
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
  const { data, error } = await supabase
    .from('project_messages')
    .select(
      'id, created_at, updated_at, project_id, sender_type, sender_email, message_type, subject, body, sent_via_email, email_sent_at, email_error'
    )
    .eq('project_id', params.id)
    .order('created_at', { ascending: false });

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

export const POST: APIRoute = async ({ params, request }) => {
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
  if (!body || typeof body !== 'object' || !body.subject || !body.body) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('project_messages')
    .insert({
      project_id: params.id,
      sender_type: body.sender_type || 'admin',
      sender_email:
        body.sender_email ||
        result.session?.user.email ||
        'admin@eventnexus.eu',
      message_type: body.message_type || 'custom',
      subject: body.subject,
      body: body.body,
      sent_via_email: body.sent_via_email || false,
    })
    .select(
      'id, created_at, updated_at, project_id, sender_type, sender_email, message_type, subject, body, sent_via_email, email_sent_at, email_error'
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
