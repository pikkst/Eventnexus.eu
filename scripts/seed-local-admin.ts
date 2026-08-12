import dotenv from 'dotenv';
import { createClient, type User } from '@supabase/supabase-js';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath =
  process.env.DOTENV_CONFIG_PATH || join(__dirname, '..', '.env.test');
dotenv.config({ path: envPath, override: true });

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const localAdminEmail = process.env.LOCAL_ADMIN_EMAIL;
const localAdminPassword = process.env.LOCAL_ADMIN_PASSWORD;

function isFakeServiceRoleKey(key: string | undefined): boolean {
  if (!key) return true;
  return key.startsWith('fake-') || key.length < 20;
}

function parseSupabaseStatus(): { url: string; secret: string } | null {
  try {
    const stdout = execSync('supabase status', { encoding: 'utf8' });
    const urlMatch = stdout.match(/Project URL\s*│\s*(https?:\/\/[^\s│]+)/);
    const secretMatch = stdout.match(/Secret\s*│\s*(sb_secret_[^\s│]+)/);
    if (urlMatch?.[1] && secretMatch?.[1]) {
      return { url: urlMatch[1], secret: secretMatch[1] };
    }
  } catch {
    // ignore
  }
  return null;
}

let resolvedUrl = supabaseUrl;
let resolvedServiceRoleKey = serviceRoleKey;

const statusValues = parseSupabaseStatus();
if (statusValues) {
  if (!resolvedUrl || isFakeServiceRoleKey(resolvedServiceRoleKey)) {
    resolvedUrl = statusValues.url;
    resolvedServiceRoleKey = statusValues.secret;
  }
}

if (!resolvedUrl || !resolvedServiceRoleKey) {
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

const isLocalUrl = (() => {
  try {
    const parsed = new URL(resolvedUrl);
    const allowedHosts = new Set(['localhost', '127.0.0.1', '::1']);
    return (
      allowedHosts.has(parsed.hostname) &&
      (parsed.protocol === 'http:' || parsed.protocol === 'https:')
    );
  } catch {
    return false;
  }
})();

if (!isLocalUrl) {
  console.error(
    'Refusing to seed local admin into a non-local Supabase URL: %s',
    resolvedUrl
  );
  process.exit(1);
}

const adminClient = createClient(resolvedUrl, resolvedServiceRoleKey, {
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
