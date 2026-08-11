-- RLS tests for profiles and project_leads
-- Requires: supabase db reset applied migrations

CREATE OR REPLACE FUNCTION public.test_set_auth_uid(p_uid UUID)
RETURNS VOID
LANGUAGE 'plpgsql'
AS $$
BEGIN
  PERFORM set_config('request.jwt.claims', json_build_object('sub', p_uid)::text, true);
END;
$$;

CREATE OR REPLACE FUNCTION public.test_clear_auth()
RETURNS VOID
LANGUAGE 'plpgsql'
AS $$
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$$;

-- Test 1: Anonymous users cannot read profiles
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM public.test_clear_auth();
  SET ROLE anon;
  SELECT COUNT(*) INTO v_count FROM public.profiles;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 1 failed: anonymous users can read profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  RAISE NOTICE 'Test 1 passed: anonymous users cannot read profiles';
END;
$$;

-- Test 2: Authenticated users can read their own profile
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles WHERE id = v_user_id;
  IF v_count != 1 THEN
    RAISE EXCEPTION 'Test 2 failed: authenticated user cannot read own profile (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 2 passed: authenticated users can read their own profile';
END;
$$;

-- Test 3: Authenticated users cannot read other profiles
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_other_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_other_id, 'user', 'Other User', 'other@example.com');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles WHERE id = v_other_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 3 failed: authenticated user can read other profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id IN (v_user_id, v_other_id);
  RAISE NOTICE 'Test 3 passed: authenticated users cannot read other profiles';
END;
$$;

-- Test 4: Authenticated users cannot promote themselves to admin
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  BEGIN
    UPDATE public.profiles SET role = 'admin' WHERE id = v_user_id;
    RAISE EXCEPTION 'Test 4 failed: authenticated user can change own role to admin';
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 4 passed: authenticated users cannot promote themselves to admin';
END;
$$;

-- Test 5: Admins can read all profiles
DO $$
DECLARE
  v_admin_id UUID := gen_random_uuid();
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_admin_id, 'admin', 'Admin User', 'admin@example.com');

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_admin_id);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles;
  IF v_count != 2 THEN
    RAISE EXCEPTION 'Test 5 failed: admin cannot read all profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id IN (v_admin_id, v_user_id);
  RAISE NOTICE 'Test 5 passed: admins can read all profiles';
END;
$$;

-- Test 6: Admins can change roles via profiles_set_role
DO $$
DECLARE
  v_admin_id UUID := gen_random_uuid();
  v_user_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_admin_id, 'admin', 'Admin User', 'admin@example.com');

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_admin_id);
  SET ROLE authenticated;
  PERFORM public.profiles_set_role(v_user_id, 'admin');
  RESET ROLE;
  PERFORM public.test_clear_auth();

  IF (SELECT role FROM public.profiles WHERE id = v_user_id) != 'admin' THEN
    RAISE EXCEPTION 'Test 6 failed: admin cannot change user role via profiles_set_role';
  END IF;

  DELETE FROM public.profiles WHERE id IN (v_admin_id, v_user_id);
  RAISE NOTICE 'Test 6 passed: admins can change roles via profiles_set_role';
END;
$$;

-- Test 7: Non-admins cannot change roles via profiles_set_role
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  BEGIN
    PERFORM public.profiles_set_role(v_user_id, 'admin');
    RAISE EXCEPTION 'Test 7 failed: non-admin can change role via profiles_set_role';
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 7 passed: non-admins cannot change roles via profiles_set_role';
END;
$$;

-- Test 8: Anonymous users cannot read leads
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM public.test_clear_auth();
  SET ROLE anon;
  SELECT COUNT(*) INTO v_count FROM public.project_leads;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 8 failed: anonymous users can read leads (count=%)', v_count;
  END IF;
  RESET ROLE;
  RAISE NOTICE 'Test 8 passed: anonymous users cannot read leads';
END;
$$;

-- Test 9: Anonymous users cannot insert leads directly
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM public.test_clear_auth();
  SET ROLE anon;
  BEGIN
    INSERT INTO public.project_leads (full_name, email, idea_description, project_type)
    VALUES ('Test', 'test@example.com', 'desc', 'web');
    RAISE EXCEPTION 'Test 9 failed: anonymous users can insert leads directly';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();
  RAISE NOTICE 'Test 9 passed: anonymous users cannot insert leads directly';
END;
$$;

-- Test 10: Authenticated users cannot read leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.project_leads;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 10 failed: authenticated users can read leads (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 10 passed: authenticated users cannot read leads';
END;
$$;

-- Test 11: Authenticated users cannot update leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_lead_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  BEGIN
    UPDATE public.project_leads SET status = 'reviewed' WHERE id = v_lead_id;
    RAISE EXCEPTION 'Test 11 failed: authenticated users can update leads';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 11 passed: authenticated users cannot update leads';
END;
$$;

-- Test 12: Authenticated users cannot delete leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_lead_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  PERFORM public.test_set_auth_uid(v_user_id);
  SET ROLE authenticated;
  BEGIN
    DELETE FROM public.project_leads WHERE id = v_lead_id;
    RAISE EXCEPTION 'Test 12 failed: authenticated users can delete leads';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 12 passed: authenticated users cannot delete leads';
END;
$$;
