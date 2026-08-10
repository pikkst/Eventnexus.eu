import { test, expect } from '@playwright/test';
import crypto from 'node:crypto';
import { Webhook } from 'standardwebhooks';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env') });

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || 'whsec_dGVzdC1zZWNyZXQtZm9yLXBsYXl3cmlnaHQ=';

function createWebhookSignature(secret: string, webhookId: string, payload: string, timestamp: number): string {
  const webhook = new Webhook(secret);
  return webhook.sign(webhookId, new Date(timestamp * 1000), payload);
}

async function sendWebhookRequest(page: any, payload: Record<string, unknown>, validSignature = true): Promise<{ status: number; body: unknown }> {
  const payloadString = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const webhookId = 'msg_' + crypto.randomUUID();
  const signature = validSignature
    ? createWebhookSignature(WEBHOOK_SECRET, webhookId, payloadString, timestamp)
    : 'invalid_signature';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'webhook-id': webhookId,
    'webhook-timestamp': timestamp.toString(),
    'webhook-signature': signature,
  };

  const response = await page.request.post('/api/webhooks/resend', {
    data: payloadString,
    headers,
  });

  const body = await response.json().catch(() => ({}));
  return { status: response.status(), body };
}

test('webhook: accepts valid Resend webhook signature', async ({ page }) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, true);
  expect(result.status).toBe(200);
  expect(result.body).toHaveProperty('ok', true);
});

test('webhook: rejects invalid signature', async ({ page }) => {
  const payload = {
    type: 'email.delivered',
    data: {
      email_id: 'test-email-id',
      to: ['recipient@example.com'],
    },
  };

  const result = await sendWebhookRequest(page, payload, false);
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

test('webhook: handles duplicate webhook idempotently when database is available', async ({ page }) => {
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
  const signature = createWebhookSignature(WEBHOOK_SECRET, webhookId, payloadString, timestamp);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'webhook-id': webhookId,
    'webhook-timestamp': timestamp.toString(),
    'webhook-signature': signature,
  };

  const firstResponse = await page.request.post('/api/webhooks/resend', {
    data: payloadString,
    headers,
  });
  const firstResult = await firstResponse.json().catch(() => ({}));
  expect(firstResponse.status()).toBe(200);
  expect(firstResult).toHaveProperty('ok', true);

  const secondResponse = await page.request.post('/api/webhooks/resend', {
    data: payloadString,
    headers,
  });
  const secondResult = await secondResponse.json().catch(() => ({}));
  expect(secondResponse.status()).toBe(200);
  expect(secondResult).toHaveProperty('ok', true);
});

test('webhook: rejects malformed JSON', async ({ page }) => {
  const malformedPayload = '{"invalid json';
  const timestamp = Math.floor(Date.now() / 1000);
  const webhookId = 'msg_' + crypto.randomUUID();
  const signature = createWebhookSignature(WEBHOOK_SECRET, webhookId, malformedPayload, timestamp);

  const response = await page.request.post('/api/webhooks/resend', {
    data: Buffer.from(malformedPayload),
    headers: {
      'Content-Type': 'application/json',
      'webhook-id': webhookId,
      'webhook-timestamp': timestamp.toString(),
      'webhook-signature': signature,
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
  const signature = createWebhookSignature(WEBHOOK_SECRET, webhookId, payload, expiredTimestamp);

  const response = await page.request.post('/api/webhooks/resend', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'webhook-id': webhookId,
      'webhook-timestamp': expiredTimestamp.toString(),
      'webhook-signature': signature,
    },
  });

  const body = await response.json().catch(() => ({}));
  expect(response.status()).toBe(401);
  expect(body).toHaveProperty('error', 'Expired timestamp');
});
