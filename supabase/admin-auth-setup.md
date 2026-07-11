# Supabase Admin Auth Setup

This guide documents the manual steps required to complete ADM-002 in the Supabase dashboard.

## Prerequisites

- Access to the Supabase project `Eventnexus.eu` (project ID: `yzsoczlghgcqitevamfo`)
- Admin access to the Supabase dashboard

## Step 1: Enable Email/Password Authentication

1. Open the Supabase dashboard for `Eventnexus.eu`.
2. Navigate to **Authentication** > **Providers**.
3. Find **Email** in the providers list.
4. Enable **Email** provider.
5. Confirm that **Email** / **Password** is toggled on.

## Step 2: Enable Magic Link Authentication

1. In **Authentication** > **Providers** > **Email**.
2. Enable **Magic Link**.
3. Optionally configure the magic link email template under **Authentication** > **Email Templates**.

## Step 3: Disable Public Sign-Ups (Recommended)

1. Navigate to **Authentication** > **Providers** > **Email**.
2. Toggle **Enable email signups** to **OFF**.
3. This ensures only manually created or invited users can access admin accounts.

## Step 4: Apply Database Migrations

1. Navigate to **SQL Editor** in the Supabase dashboard.
2. Open `supabase/profiles-schema.sql` and paste its contents into the SQL Editor.
3. Run the query.
4. Verify that the `profiles` table appears under **Table Editor** > **public** > **profiles**.
5. Verify that RLS is enabled on `profiles` (the table icon should show a lock).

### Optional: Apply admin_users Migration

If you want to use the separate `admin_users` table instead of or in addition to `profiles`:

1. Open `supabase/admin-users-schema.sql`.
2. Paste and run in the SQL Editor.
3. Verify the table and RLS status.

## Step 5: Create Initial Admin User

1. Navigate to **Authentication** > **Users**.
2. Click **Add user** > **Create new user**.
3. Enter the admin email address and a strong password.
4. Toggle **Auto-confirm user** to **ON** (or send the confirmation email and complete it).
5. Copy the new user's UUID.

### Link Admin User to Profile

1. Navigate to **Table Editor** > **public** > **profiles**.
2. Click **Insert new row**.
3. Set `id` to the UUID of the admin user created in step 5.
4. Set `role` to `admin`.
5. Set `email` and `full_name` as appropriate.
6. Save the row.

## Step 6: Verify RLS Policies

1. Navigate to **Authentication** > **Policies**.
2. Select the `profiles` table.
3. Confirm the following policies exist:
   - `profiles_select_own`
   - `profiles_update_own`
   - `profiles_admin_select_all`
   - `profiles_admin_update_all`
4. Confirm each policy targets the `authenticated` role with the expected conditions.

## Step 7: Verify Admin Access

1. Navigate to **Authentication** > **Users** and confirm the admin user exists with status `confirmed`.
2. Navigate to **Table Editor** > **public** > **profiles** and confirm the admin user has `role = 'admin'`.
3. Test that the admin user can sign in via the application's `/admin/login` route once ADM-003 is implemented.

## Notes

- Do not store admin passwords or service-role keys in git.
- Server-side code must use `SUPABASE_SERVICE_ROLE_KEY` for admin data operations that bypass RLS.
- The `profiles` table is the source of truth for admin roles in Phase 4A.
- If `profiles` alone becomes insufficient, the optional `admin_users` table migration is available in `supabase/admin-users-schema.sql`.
