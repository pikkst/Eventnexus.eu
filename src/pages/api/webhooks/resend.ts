import type { APIRoute } from 'astro';

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

async function verifyResendSignature(secret: string, rawBody: string, signature: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signatureData = encoder.encode(rawBody);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, signatureData);
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return timingSafeEqual(signature.toUpperCase(), expectedSignature.toUpperCase());
}

function isTimestampValid(timestamp: string | null): boolean {
  if (!timestamp) {
    return false;
  }

  const timestampMs = Number(timestamp);
  if (!Number.isFinite(timestampMs)) {
    return false;
  }

  const now = Date.now();
  const normalizedTimestamp = timestampMs > 1_000_000_000_000 ? timestampMs : timestampMs * 1000;
  const fiveMinutes = 5 * 60 * 1000;

  return Math.abs(now - normalizedTimestamp) <= fiveMinutes;
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

  const signature = request.headers.get('x-resend-signature');
  const timestampHeader = request.headers.get('x-resend-signature-timestamp');
  const rawBody = await request.text();

  if (!signature || !timestampHeader) {
    return new Response(JSON.stringify({ error: 'Missing signature headers' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isTimestampValid(timestampHeader)) {
    return new Response(JSON.stringify({ error: 'Invalid or expired timestamp' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const isSignatureValid = await verifyResendSignature(secret, rawBody, signature);
  if (!isSignatureValid) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const type = typeof payload.type === 'string' ? payload.type : 'unknown';
  const emailId = typeof payload.data?.email_id === 'string' ? payload.data.email_id : 'n/a';

  let recipient = 'n/a';
  if (Array.isArray(payload.data?.to)) {
    recipient = payload.data.to.join(', ');
  } else if (typeof payload.data?.to === 'string') {
    recipient = payload.data.to;
  }

  console.log(`Resend webhook event received: type=${type}, emailId=${emailId}, recipient=${recipient}`);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
