import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { cookieOptions } from '../../../../lib/auth/cookies';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown> | null = null;

    if (contentType.includes('application/json')) {
      body = await request.json().catch(() => null);
    } else {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        body = {
          email: formData.get('email'),
          password: formData.get('password'),
        };
      }
    }

    const baseUrl = new URL(request.url).origin;

    if (
      !body ||
      typeof body.email !== 'string' ||
      typeof body.password !== 'string'
    ) {
      return new Response(null, {
        status: 303,
        headers: { Location: `${baseUrl}/admin/login?error=invalid_request` },
      });
    }

    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `${baseUrl}/admin/login?error=service_unavailable`,
        },
      });
    }

    const tokenResponse = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      }
    );

    if (!tokenResponse.ok) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `${baseUrl}/admin/login?error=invalid_credentials`,
        },
      });
    }

    const tokenData = await tokenResponse.json();
    const data = {
      user: tokenData.user,
      session: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
      },
    };

    if (!data.user || !data.session) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: `${baseUrl}/admin/login?error=invalid_credentials`,
        },
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
      return new Response(null, {
        status: 303,
        headers: { Location: `${baseUrl}/admin/login?error=forbidden` },
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

    return new Response(null, {
      status: 303,
      headers: { Location: `${baseUrl}/admin` },
    });
  } catch (err) {
    console.error('login error', err);
    return new Response('Server error', { status: 500 });
  }
};
