-- Seed local admin profile for development
-- This inserts a local admin profile for use with the local Supabase database.
-- IMPORTANT: This is for local development only. Do NOT use these values in production.

-- First, ensure there is a local auth user to link to.
-- If you need to create one, use the Supabase dashboard at http://127.0.0.1:54323
-- or create it via the Auth API and use the returned user ID below.

-- Replace the UUID below with an actual auth.users(id) from your local Supabase Auth.
INSERT INTO public.profiles (id, role, full_name, email)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin',
  'Local Admin',
  'admin@example.com'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = now();
