import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { cookieOptions } from '../../../../lib/auth/cookies';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await authClient.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error || !data.user || !data.session) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;
  const expiresIn = data.session.expires_in;

  cookies.set('sb-access-token', accessToken, {
    ...cookieOptions,
    maxAge: expiresIn,
  });

  cookies.set('sb-refresh-token', refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
