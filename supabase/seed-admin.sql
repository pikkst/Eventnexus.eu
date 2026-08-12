-- Seed: 202508120000_admin_user
-- Description: Insert initial admin user profile
-- IMPORTANT: Replace the placeholder values below with real data before running.
-- The UUID must match an existing auth.users(id) row created via Supabase Auth.

INSERT INTO public.profiles (id, role, full_name, email)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin',
  'Admin User',
  'admin@example.com'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = now();
