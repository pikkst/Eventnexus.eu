import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function cleanupLeads() {
  const retentionDays = parseInt(process.env.RETENTION_LEAD_DAYS || '1095', 10);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);

  console.log(
    `Cleaning up project_leads older than ${cutoff.toISOString()}...`
  );

  const { error } = await supabase
    .from('project_leads')
    .delete()
    .lt('created_at', cutoff.toISOString());

  if (error) {
    console.error('Cleanup failed:', error.message);
    process.exit(1);
  }

  console.log('Project leads cleanup completed.');
}

cleanupLeads().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
