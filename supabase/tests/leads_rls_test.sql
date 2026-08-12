-- RLS tests for public.project_leads
-- Run after migrations with: supabase db execute --file supabase/tests/leads_rls_test.sql
-- Requires: supabase/tests/_helpers.sql executed first

-- Test 1: Anonymous users cannot read leads
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM public.test_clear_auth();
  SET ROLE anon;
  SELECT COUNT(*) INTO v_count FROM public.project_leads;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 1 failed: anonymous users can read leads (count=%)', v_count;
  END IF;
  RESET ROLE;
  RAISE NOTICE 'Test 1 passed: anonymous users cannot read leads';
END;
$$;

-- Test 2: Anonymous users cannot insert leads directly
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM public.test_clear_auth();
  SET ROLE anon;
  BEGIN
    INSERT INTO public.project_leads (full_name, email, idea_description, project_type)
    VALUES ('Test', 'test@example.com', 'desc', 'web');
    RAISE EXCEPTION 'Test 2 failed: anonymous users can insert leads directly';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();
  RAISE NOTICE 'Test 2 passed: anonymous users cannot insert leads directly';
END;
$$;

-- Test 3: Authenticated users cannot read leads
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
    RAISE EXCEPTION 'Test 3 failed: authenticated users can read leads (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 3 passed: authenticated users cannot read leads';
END;
$$;

-- Test 4: Authenticated users cannot update leads
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
    RAISE EXCEPTION 'Test 4 failed: authenticated users can update leads';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 4 passed: authenticated users cannot update leads';
END;
$$;

-- Test 5: Authenticated users cannot delete leads
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
    RAISE EXCEPTION 'Test 5 failed: authenticated users can delete leads';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM public.test_clear_auth();

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 5 passed: authenticated users cannot delete leads';
END;
$$;
