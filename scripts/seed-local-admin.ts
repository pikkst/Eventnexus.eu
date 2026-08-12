import 'dotenv/config';
import { createClient, type User } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const localAdminEmail = process.env.LOCAL_ADMIN_EMAIL;
const localAdminPassword = process.env.LOCAL_ADMIN_PASSWORD;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment'
  );
  process.exit(1);
}

if (!localAdminEmail || !localAdminPassword) {
  console.error(
    'Missing LOCAL_ADMIN_EMAIL or LOCAL_ADMIN_PASSWORD in environment'
  );
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await adminClient.auth.admin.listUsers();
  if (error || !data?.users) {
    console.error('Failed to list users', error);
    return null;
  }
  return data.users.find((user) => user.email === email) ?? null;
}

async function ensureAdminUser() {
  let user = await findUserByEmail(localAdminEmail);

  if (!user) {
    console.log(`Creating local admin user: ${localAdminEmail}`);
    const { data, error } = await adminClient.auth.admin.createUser({
      email: localAdminEmail,
      password: localAdminPassword,
      email_confirm: true,
    });
    if (error || !data.user) {
      console.error('Failed to create admin user', error);
      process.exit(1);
    }
    user = data.user;
  } else {
    console.log(`Found existing admin user: ${localAdminEmail}`);
  }

  const { error: profileError } = await adminClient.from('profiles').upsert(
    {
      id: user.id,
      role: 'admin',
      full_name: 'Local Admin',
      email: user.email ?? localAdminEmail,
    },
    { onConflict: 'id' }
  );

  if (profileError) {
    console.error('Failed to upsert admin profile', profileError);
    process.exit(1);
  }

  console.log('Local admin profile seeded successfully');
}

ensureAdminUser().catch((error) => {
  console.error('Unexpected error', error);
  process.exit(1);
});
