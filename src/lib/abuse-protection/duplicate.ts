import { getSupabaseServerClient } from '../supabase/server';

const DUPLICATE_WINDOW_MS = 60_000 * 60;

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
}

export async function checkDuplicateSubmission(
  email: string,
  projectTitle: string
): Promise<DuplicateCheckResult> {
  const supabase = getSupabaseServerClient();

  const oneHourAgo = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();

  const { data, error } = await supabase
    .from('project_leads')
    .select('id')
    .eq('email', email)
    .eq('project_title', projectTitle)
    .gte('created_at', oneHourAgo)
    .limit(1);

  if (error) {
    return { isDuplicate: false };
  }

  if (data && data.length > 0) {
    return {
      isDuplicate: true,
      reason: 'duplicate_submission',
    };
  }

  return { isDuplicate: false };
}
