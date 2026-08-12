# Admin Seed Setup

This document explains how to create the initial admin user for the Eventnexus admin workspace.

## Prerequisites

- Access to the Supabase dashboard for project `Eventnexus.eu` (ID: `yzsoczlghgcqitevamfo`)

## Step 1: Create Auth User

Create a new user in Supabase Auth with email/password.

### Via Supabase Dashboard

1. Open https://supabase.com/dashboard/project/yzsoczlghgcqitevamfo/auth/users
2. Click "Add user"
3. Enter the admin email address and a strong password
4. Click "Create user"
5. Copy the user ID from the users list

## Step 2: Link User to Admin Profile

After the auth user is created, link them to a `profiles` row with `role = 'admin'`.

### Via Supabase Dashboard SQL Editor

1. Open https://supabase.com/dashboard/project/yzsoczlghgcqitevamfo/editor
2. Open the SQL Editor
3. Run the following SQL, replacing `<AUTH_USER_ID>` with the actual user ID from step 1:

```sql
INSERT INTO public.profiles (id, role, full_name, email)
VALUES ('<AUTH_USER_ID>', 'admin', 'Admin User', 'admin@example.com')
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();
```

### Via Local Development Seed Script

For local development, set `LOCAL_ADMIN_EMAIL` and `LOCAL_ADMIN_PASSWORD` in your local `.env.test` file, ensure `SUPABASE_URL` points to the local Supabase instance (`http://127.0.0.1:54321` or `http://localhost:54321`), then run:

```powershell
npm run seed:local-admin
```

`scripts/seed-local-admin.ts` includes a hostname boundary check and will refuse to run if `SUPABASE_URL` is not an exact loopback address. It creates or finds the local auth user and upserts the `profiles` row with `role = 'admin'`.

## Step 3: Verify Admin Access

1. Navigate to `/admin/login`
2. Sign in with the admin email and password
3. Verify access to the admin workspace is granted

## Security Notes

- Email sign-ups should remain disabled in Supabase Auth settings so only invited users can create accounts
- The first admin account should be created manually, not through public sign-up
- Rotate the admin password if it was shared during setup
- Store the admin credentials in a secure password manager
