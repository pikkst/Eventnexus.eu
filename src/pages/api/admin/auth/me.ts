import type { APIRoute } from 'astro';
import { getAdminSession } from '../../../../lib/auth/session';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const result = await getAdminSession(request);

  if (!result.session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: result.session.user,
      role: result.session.role,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
