export interface HoneypotResult {
  passed: boolean;
  reason?: string;
}

export function checkHoneypot(
  value: string | null | undefined,
  minCompletionTimeMs: number = 3000
): HoneypotResult {
  if (value && value.trim().length > 0) {
    return { passed: false, reason: 'honeypot_filled' };
  }

  return { passed: true };
}

export function checkMinimumCompletionTime(
  submittedAt: string | null | undefined,
  minCompletionTimeMs: number = 3000
): HoneypotResult {
  if (!submittedAt) {
    return { passed: false, reason: 'missing_timestamp' };
  }

  const submittedTime = Date.parse(submittedAt);
  if (Number.isNaN(submittedTime)) {
    return { passed: false, reason: 'invalid_timestamp' };
  }

  const elapsed = Date.now() - submittedTime;
  if (elapsed < minCompletionTimeMs) {
    return { passed: false, reason: 'submission_too_fast' };
  }

  return { passed: true };
}
