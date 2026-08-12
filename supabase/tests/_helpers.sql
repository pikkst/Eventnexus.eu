-- Supabase RLS test helpers
-- This file defines helper functions used by RLS test files.

CREATE OR REPLACE FUNCTION public.test_set_auth_uid(p_uid UUID)
RETURNS VOID
LANGUAGE 'plpgsql'
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  PERFORM set_config('request.jwt.claims', json_build_object('sub', p_uid)::text, true);
END;
$$;

CREATE OR REPLACE FUNCTION public.test_clear_auth()
RETURNS VOID
LANGUAGE 'plpgsql'
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$$;
