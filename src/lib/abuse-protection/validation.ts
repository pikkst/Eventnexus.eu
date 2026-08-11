export const ALLOWED_FEATURES = [
  'public_pages',
  'user_accounts',
  'login_registration',
  'user_roles_permissions',
  'admin_dashboard',
  'customer_dashboard',
  'booking_scheduling',
  'request_quote_forms',
  'file_uploads',
  'payments_subscriptions',
  'email_notifications',
  'crm_lead_workflow',
  'analytics_reporting',
  'map_location_features',
  'ai_features',
  'third_party_integrations',
  'multilingual_support',
  'not_sure_yet',
] as const;

export const ALLOWED_TECHNICAL_NEEDS = [
  'frontend',
  'backend',
  'database',
  'authentication',
  'payment_integration',
  'admin_system',
  'api_integration',
  'automation',
  'deployment_hosting',
  'domain_setup',
  'maintenance',
  'technical_planning',
  'not_sure_yet',
] as const;

export const ALLOWED_INTEGRATIONS = [
  'stripe_payment',
  'supabase',
  'crm',
  'email_provider',
  'calendar',
  'maps',
  'analytics',
  'ai_api',
  'internal_system',
  'other',
  'not_sure_yet',
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
      errors.push(
        `${name} item exceeds maximum length of ${maxItemLength} characters`
      );
      return { valid: false, errors };
    }

    if (!allowedValues.includes(value as string)) {
      errors.push(`${name} contains an invalid value`);
      return { valid: false, errors };
    }
  }

  return { valid: true, errors: [] };
}
