import type { APIRoute } from 'astro';
import { Webhook } from 'standardwebhooks';
import { extractWebhookEvent } from '../../../lib/webhooks/resend';
import { getSupabaseServerClient } from '../../../lib/supabase/server';
import type { IdempotencyStore } from '../../../lib/webhooks/idempotency';
import {
  SupabaseIdempotencyStore,
  InMemoryIdempotencyStore,
} from '../../../lib/webhooks/idempotency';

export const prerender = false;

let cachedStore: IdempotencyStore | null = null;
let testStoreOverride: IdempotencyStore | null = null;

export function resetIdempotencyStore() {
  cachedStore = null;
  testStoreOverride = null;
}

export function setTestIdempotencyStore(store: IdempotencyStore) {
  testStoreOverride = store;
}

function createIdempotencyStore(): IdempotencyStore {
  if (testStoreOverride) {
    return testStoreOverride;
  }

  if (cachedStore) {
    return cachedStore;
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.WEBHOOK_TEST_MODE === 'true'
  ) {
    cachedStore = new InMemoryIdempotencyStore();
  } else {
    const supabase = getSupabaseServerClient();
    cachedStore = new SupabaseIdempotencyStore(supabase as any);
  }

  return cachedStore;
}

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.warn(
      'Webhook received but RESEND_WEBHOOK_SECRET is not configured'
    );
    return new Response(JSON.stringify({ error: 'Not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawBody = await request.text();
  const headers = Object.fromEntries(request.headers.entries());

  const webhookId = headers['webhook-id'] || headers['svix-id'];
  const webhookTimestamp =
    headers['webhook-timestamp'] || headers['svix-timestamp'];
  const webhookSignature =
    headers['webhook-signature'] || headers['svix-signature'];

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return new Response(
      JSON.stringify({ error: 'Missing signature headers' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const timestampMs = Number(webhookTimestamp);
  if (!Number.isFinite(timestampMs)) {
    return new Response(JSON.stringify({ error: 'Invalid timestamp' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const now = Date.now();
  const normalizedTimestamp =
    timestampMs > 1_000_000_000_000 ? timestampMs : timestampMs * 1000;
  const fiveMinutes = 5 * 60 * 1000;

  if (Math.abs(now - normalizedTimestamp) > fiveMinutes) {
    return new Response(JSON.stringify({ error: 'Expired timestamp' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const webhook = new Webhook(secret);

  try {
    JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    webhook.verify(rawBody, {
      'webhook-id': webhookId,
      'webhook-timestamp': webhookTimestamp,
      'webhook-signature': webhookSignature,
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let event;
  try {
    event = extractWebhookEvent(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const store = createIdempotencyStore();

  try {
    const result = await store.claim({ id: webhookId, type: event.type });

    if (result === 'duplicate') {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Failed to record webhook event', error);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(
    `Resend webhook event received: type=${event.type}, emailId=${event.emailId}`
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
