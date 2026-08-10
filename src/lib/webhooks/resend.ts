export interface ResendWebhookPayload {
  type?: string;
  data?: {
    email_id?: string;
    to?: string | string[];
  };
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
