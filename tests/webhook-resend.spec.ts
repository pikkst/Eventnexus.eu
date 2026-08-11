import { test, expect } from '@playwright/test';
import crypto from 'node:crypto';
import { Webhook } from 'standardwebhooks';

test.beforeEach(async ({ page }) => {
  await page.request.post('/api/test/reset-webhook-store', {
    headers: { Origin: 'http://127.0.0.1:4321' },
  });
  page.on('dialog', (dialog) => dialog.accept());
});

const WEBHOOK_SECRET = 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=';

function createWebhookSignature(
  secret: string,
  webhookId: string,
  payload: string,
  timestamp: number
): string {
  const webhook = new Webhook(secret);
  return webhook.sign(webhookId, new Date(timestamp * 1000), payload);
}

async function sendWebhookRequest(
  page: any,
  payload: Record<string, unknown>,
  options: {
    validSignature?: boolean;
    tamperBody?: boolean;
    differentKey?: boolean;
  } = {}
): Promise<{ status: number; body: unknown }> {
  const {
    validSignature = true,
    tamperBody = false,
    differentKey = false,
  } = options;

  let payloadString = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const webhookId = 'msg_' + crypto.randomUUID();

  let secret = WEBHOOK_SECRET;
  if (differentKey) {
    secret =
      'whsec_' + Buffer.from('a-different-secret-key').toString('base64');
  }

  const signature = validSignature
    ? createWebhookSignature(secret, webhookId, payloadString, timestamp)
    : 'invalid_signature';

  if (tamperBody) {
    const parsed = JSON.parse(payloadString);
    parsed.data = { ...parsed.data, email_id: 'tampered-email-id' };
    payloadString = JSON.stringify(parsed);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'svix-id': webhookId,
    'svix-timestamp': timestamp.toString(),
    'svix-signature': signature,
  };

  const response = await page.request.post('/api/webhooks/resend', {
    data: tamperBody
      ? payloadString
      : options.validSignature !== false
        ? payloadString
        : payloadString,
    headers,
  });

  const body = await response.json().catch(() => ({}));
  return { status: response.status(), body };
}

test('webhook: accepts valid Resend webhook signature with svix headers', async ({
  page,
}) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, {
    validSignature: true,
  });
  expect(result.status).toBe(200);
  expect(result.body).toHaveProperty('ok', true);
});

test('webhook: rejects tampered payload with valid signature', async ({
  page,
}) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, {
    validSignature: true,
    tamperBody: true,
  });
  expect(result.status).toBe(401);
  expect(result.body).toHaveProperty('error', 'Invalid signature');
});

test('webhook: rejects signature from different key', async ({ page }) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, {
    validSignature: true,
    differentKey: true,
  });
  expect(result.status).toBe(401);
  expect(result.body).toHaveProperty('error', 'Invalid signature');
});

test('webhook: rejects invalid signature', async ({ page }) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, {
    validSignature: false,
  });
  expect(result.status).toBe(401);
  expect(result.body).toHaveProperty('error', 'Invalid signature');
});

test('webhook: rejects missing signature headers', async ({ page }) => {
  const response = await page.request.post('/api/webhooks/resend', {
    data: JSON.stringify({ type: 'email.delivered' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json().catch(() => ({}));
  expect(response.status()).toBe(400);
  expect(body).toHaveProperty('error', 'Missing signature headers');
});

test('webhook: handles duplicate webhook idempotently when database is available', async ({
  page,
}) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const payloadString = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const webhookId = 'msg_' + crypto.randomUUID();
  const signature = createWebhookSignature(
    WEBHOOK_SECRET,
    webhookId,
    payloadString,
    timestamp
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'svix-id': webhookId,
    'svix-timestamp': timestamp.toString(),
    'svix-signature': signature,
  };

  const firstResponse = await page.request.post('/api/webhooks/resend', {
    data: payloadString,
    headers,
  });
  const firstResult = await firstResponse.json().catch(() => ({}));
  expect(firstResponse.status()).toBe(200);
  expect(firstResult).toHaveProperty('ok', true);
  expect(firstResult).not.toHaveProperty('duplicate');

  const secondResponse = await page.request.post('/api/webhooks/resend', {
    data: payloadString,
    headers,
  });
  const secondResult = await secondResponse.json().catch(() => ({}));
  expect(secondResponse.status()).toBe(200);
  expect(secondResult).toHaveProperty('ok', true);
  expect(secondResult).toHaveProperty('duplicate', true);
});

test('webhook: rejects malformed JSON', async ({ page }) => {
  const malformedPayload = '{"invalid json';
  const timestamp = Math.floor(Date.now() / 1000);
  const webhookId = 'msg_' + crypto.randomUUID();
  const signature = createWebhookSignature(
    WEBHOOK_SECRET,
    webhookId,
    malformedPayload,
    timestamp
  );

  const response = await page.request.post('/api/webhooks/resend', {
    data: Buffer.from(malformedPayload),
    headers: {
      'Content-Type': 'application/json',
      'svix-id': webhookId,
      'svix-timestamp': timestamp.toString(),
      'svix-signature': signature,
    },
  });

  const body = await response.json().catch(() => ({}));
  expect(response.status()).toBe(400);
  expect(body).toHaveProperty('error', 'Invalid JSON body');
});

test('webhook: rejects expired timestamp', async ({ page }) => {
  const payload = JSON.stringify({
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
    },
  });

  const expiredTimestamp = Math.floor(Date.now() / 1000) - 600;
  const webhookId = 'msg_' + crypto.randomUUID();
  const signature = createWebhookSignature(
    WEBHOOK_SECRET,
    webhookId,
    payload,
    expiredTimestamp
  );

  const response = await page.request.post('/api/webhooks/resend', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'svix-id': webhookId,
      'svix-timestamp': expiredTimestamp.toString(),
      'svix-signature': signature,
    },
  });

  const body = await response.json().catch(() => ({}));
  expect(response.status()).toBe(401);
  expect(body).toHaveProperty('error', 'Expired timestamp');
});
