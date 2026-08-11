import type { APIRoute } from 'astro';
import {
  resetIdempotencyStore,
  setTestIdempotencyStore,
} from '../../api/webhooks/resend';
import { InMemoryIdempotencyStore } from '../../../lib/webhooks/idempotency';

export const prerender = false;

export const POST: APIRoute = async () => {
  if (globalThis.process?.env?.NODE_ENV !== 'test') {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  resetIdempotencyStore();
  setTestIdempotencyStore(new InMemoryIdempotencyStore());

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
