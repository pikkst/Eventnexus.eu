export interface ResendWebhookPayload {
  type?: string;
  data?: {
    email_id?: string;
    to?: string | string[];
  };
}

export class WebhookVerificationFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookVerificationFailedError';
  }
}

export function verifyWebhook(
  secret: string,
  rawBody: string,
  headers: Record<string, string | null>
): void {
  const webhookId = headers['webhook-id'] || headers['svix-id'];
  const webhookTimestamp = headers['webhook-timestamp'] || headers['svix-timestamp'];
  const webhookSignature = headers['webhook-signature'] || headers['svix-signature'];

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    throw new WebhookVerificationFailedError('Missing webhook headers');
  }

  const timestampMs = Number(webhookTimestamp);
  if (!Number.isFinite(timestampMs)) {
    throw new WebhookVerificationFailedError('Invalid timestamp');
  }

  const now = Date.now();
  const normalizedTimestamp =
    timestampMs > 1_000_000_000_000 ? timestampMs : timestampMs * 1000;
  const fiveMinutes = 5 * 60 * 1000;

  if (Math.abs(now - normalizedTimestamp) > fiveMinutes) {
    throw new WebhookVerificationFailedError('Expired timestamp');
  }

  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  
  crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  ).then((key) => {
    const signatureData = encoder.encode(signedContent);
    return crypto.subtle.sign('HMAC', key, signatureData);
  }).then((signatureBuffer) => {
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    
    const signatures = webhookSignature.split(' ').map((s) => s.trim());
    const isValid = signatures.some((sig) => {
      const parts = sig.split(',');
      if (parts[0] !== 'v1') return false;
      const providedSignature = parts[1];
      if (!providedSignature) return false;
      
      if (providedSignature.length !== expectedSignature.length) return false;
      let result = 0;
      for (let i = 0; i < providedSignature.length; i++) {
        result |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
      }
      return result === 0;
    });
    
    if (!isValid) {
      throw new WebhookVerificationFailedError('Invalid signature');
    }
  });
}

export function extractWebhookEvent(
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
