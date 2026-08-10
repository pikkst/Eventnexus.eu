import type { APIRoute } from 'astro';
import { Webhook } from 'standardwebhooks';
import { extractWebhookEvent } from '../../../lib/webhooks/resend';
import { getSupabaseServerClient } from '../../../lib/supabase/server';

export const prerender = false;

const testEventStore = new Map<string, { type: string }>();

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('Webhook received but RESEND_WEBHOOK_SECRET is not configured');
    return new Response(JSON.stringify({ error: 'Not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawBody = await request.text();
  const headers = Object.fromEntries(request.headers.entries());

  const webhookId = headers['webhook-id'] || headers['svix-id'];
  const webhookTimestamp = headers['webhook-timestamp'] || headers['svix-timestamp'];
  const webhookSignature = headers['webhook-signature'] || headers['svix-signature'];

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return new Response(JSON.stringify({ error: 'Missing signature headers' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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

  if (process.env.WEBHOOK_TEST_MODE === 'true') {
    const existing = testEventStore.get(webhookId);
    if (existing) {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    testEventStore.set(webhookId, { type: event.type });
    console.log(`[test-mode] Stored webhook event: type=${event.type}, emailId=${event.emailId}`);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseServerClient();

  const { error: insertError } = await supabase
    .from('webhook_events')
    .insert({ id: webhookId, type: event.type })
    .select();

  if (insertError) {
    if (insertError.code === '23505') {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('Failed to record webhook event', insertError);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`Resend webhook event received: type=${event.type}, emailId=${event.emailId}`);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
