const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface TurnstileVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
}

export async function verifyTurnstileToken(
  token: string | null | undefined
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey || process.env.SUPABASE_MOCK_MODE === 'true') {
    return { success: false, errorCodes: ['secret_key_missing'] };
  }

  if (!token) {
    return { success: false, errorCodes: ['missing_token'] };
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      return { success: false, errorCodes: ['verification_request_failed'] };
    }

    const data: TurnstileVerificationResult = await response.json();
    return data;
  } catch {
    return { success: false, errorCodes: ['verification_request_failed'] };
  }
}
