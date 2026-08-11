import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () => {
  if (globalThis.process?.env?.NODE_ENV !== 'test') {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { resetRateLimitStore } =
    await import('../../../lib/abuse-protection/rate-limit');
  resetRateLimitStore();

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
