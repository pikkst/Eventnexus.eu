import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () => {
  const { resetRateLimitStore } =
    await import('../../../lib/abuse-protection/rate-limit');
  resetRateLimitStore();

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
