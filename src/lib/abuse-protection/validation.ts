export const ALLOWED_FEATURES = [
  'frontend',
  'backend',
  'database',
  'authentication',
  'admin-dashboard',
  'payment-integration',
  'integration',
  'automation',
  'ai-workflow',
  'deployment',
  'monitoring',
  'other',
] as const;

export const ALLOWED_TECHNICAL_NEEDS = [
  'responsive-design',
  'cross-browser-compatibility',
  'accessibility',
  'performance-optimization',
  'seo',
  'security',
  'testing',
  'ci-cd',
  'documentation',
  'other',
] as const;

export const ALLOWED_INTEGRATIONS = [
  'payment',
  'email',
  'analytics',
  'crm',
  'cms',
  'social-media',
  'search',
  'monitoring',
  'other',
] as const;

const MAX_ARRAY_ITEMS = 10;
const MAX_ARRAY_ITEM_LENGTH = 60;

export interface FieldValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateArrayField(
  name: string,
  values: string[],
  allowedValues: readonly string[],
  maxCount: number = MAX_ARRAY_ITEMS,
  maxItemLength: number = MAX_ARRAY_ITEM_LENGTH
): FieldValidationResult {
  const errors: string[] = [];

  if (values.length > maxCount) {
    errors.push(`${name} must have at most ${maxCount} items`);
    return { valid: false, errors };
  }

  for (const value of values) {
    if (value.length > maxItemLength) {
      errors.push(`${name} item exceeds maximum length of ${maxItemLength} characters`);
      return { valid: false, errors };
    }

    if (!allowedValues.includes(value as string)) {
      errors.push(`${name} contains an invalid value`);
      return { valid: false, errors };
    }
  }

  return { valid: true, errors: [] };
}
