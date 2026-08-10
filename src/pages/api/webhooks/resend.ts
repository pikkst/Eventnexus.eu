import type { APIRoute } from 'astro';
import { getSupabaseServerClient } from '../../../lib/supabase/server';

export const prerender = false;

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifyWebhook(
  secret: string,
  rawBody: string,
  headers: Record<string, string | null>
): Promise<void> {
  const webhookId = headers['webhook-id'] || headers['svix-id'];
  const webhookTimestamp = headers['webhook-timestamp'] || headers['svix-timestamp'];
  const webhookSignature = headers['webhook-signature'] || headers['svix-signature'];

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    throw new Error('Missing webhook headers');
  }

  const timestampMs = Number(webhookTimestamp);
  if (!Number.isFinite(timestampMs)) {
    throw new Error('Invalid timestamp');
  }

  const now = Date.now();
  const normalizedTimestamp =
    timestampMs > 1_000_000_000_000 ? timestampMs : timestampMs * 1000;
  const fiveMinutes = 5 * 60 * 1000;

  if (Math.abs(now - normalizedTimestamp) > fiveMinutes) {
    throw new Error('Expired timestamp');
  }

  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureData = encoder.encode(signedContent);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, signatureData);
  const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

  const signatures = webhookSignature.split(' ').map((s) => s.trim());
  const isValid = signatures.some((sig) => {
    const parts = sig.split(',');
    if (parts[0] !== 'v1') return false;
    const providedSignature = parts[1];
    if (!providedSignature) return false;
    return timingSafeEqual(providedSignature, expectedSignature);
  });

  if (!isValid) {
    const fs = await import('fs');
    fs.writeFileSync('C:/Users/PC/Desktop/Eventnexus.eu/webhook-debug.log', JSON.stringify({
      webhookId,
      webhookTimestamp,
      rawBody,
      expectedSignature,
      providedSignature: webhookSignature,
    }, null, 2));
    throw new Error('Invalid signature');
  }
}

function extractWebhookEvent(
  rawBody: string
): { id: string; type: string; emailId: string } {
  let payload: {
    type?: string;
    data?: {
      email_id?: string;
      to?: string | string[];
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    throw new Error('Invalid JSON body');
  }

  const type = typeof payload.type === 'string' ? payload.type : 'unknown';
  const emailId =
    typeof payload.data?.email_id === 'string' ? payload.data.email_id : 'n/a';

  return { id: '', type, emailId };
}

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

  try {
    await verifyWebhook(secret, rawBody, headers);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Missing webhook headers')) {
      return new Response(JSON.stringify({ error: 'Missing signature headers' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
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

  const webhookId = request.headers.get('webhook-id') || request.headers.get('svix-id');

  if (!webhookId) {
    return new Response(JSON.stringify({ error: 'Missing webhook id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    supabase = null;
  }

  if (supabase) {
    const { data: existing, error: fetchError } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('id', webhookId)
      .maybeSingle();

    if (fetchError) {
      console.error('Failed to check webhook idempotency', fetchError.message);
      return new Response(JSON.stringify({ error: 'Database error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (existing) {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error: insertError } = await supabase
      .from('webhook_events')
      .insert({ id: webhookId, type: event.type });

    if (insertError) {
      console.error('Failed to record webhook event', insertError.message);
      return new Response(JSON.stringify({ error: 'Database error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  console.log(`Resend webhook event received: type=${event.type}, emailId=${event.emailId}`);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
