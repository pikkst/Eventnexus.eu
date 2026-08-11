import type { APIRoute } from 'astro';
import {
  resetIdempotencyStore,
  setTestIdempotencyStore,
} from '../../api/webhooks/resend';
import { InMemoryIdempotencyStore } from '../../../lib/webhooks/idempotency';

export const prerender = false;

export const POST: APIRoute = async () => {
  resetIdempotencyStore();
  setTestIdempotencyStore(new InMemoryIdempotencyStore());

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
