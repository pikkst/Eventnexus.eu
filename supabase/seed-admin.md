# Admin Seed Setup

This document explains how to create the initial admin user for the Eventnexus admin workspace.

## Prerequisites

- Access to the Supabase dashboard for project `Eventnexus.eu` (ID: `yzsoczlghgcqitevamfo`)
- Or Supabase CLI access linked to the project

## Step 1: Create Auth User

Create a new user in Supabase Auth with email/password:

### Via Supabase Dashboard

1. Open https://supabase.com/dashboard/project/yzsoczlghgcqitevamfo/auth/users
2. Click "Invite" or "Add user"
3. Enter the admin email address and a strong password
4. Send the invitation or create the user directly

### Via Supabase CLI

```powershell
supabase auth invite --email admin@example.com
```

## Step 2: Link User to Admin Profile

After the auth user is created, link them to a `profiles` row with `role = 'admin'`.

### Via Supabase Dashboard SQL Editor

Run the following SQL in the Supabase SQL Editor (replace `<AUTH_USER_ID>` with the actual user ID from step 1):

```sql
INSERT INTO public.profiles (id, role, full_name, email)
VALUES ('<AUTH_USER_ID>', 'admin', 'Admin User', 'admin@example.com')
ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();
```

### Via Supabase CLI

```powershell
supabase db execute --file supabase/seed-admin.sql
```

Then edit `supabase/seed-admin.sql` with the actual user ID before running.

## Step 3: Verify Admin Access

1. Navigate to `/admin/login`
2. Sign in with the admin email and password
3. Verify access to the admin workspace is granted

## Security Notes

- Email sign-ups should remain disabled in Supabase Auth settings so only invited users can create accounts
- The first admin account should be created manually, not through public sign-up
- Rotate the admin password if it was shared during setup
- Store the admin credentials in a secure password manager
