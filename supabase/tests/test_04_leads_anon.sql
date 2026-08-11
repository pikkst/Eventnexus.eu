-- Test 8: Anonymous users cannot read leads
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
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
  PERFORM set_config('request.jwt.claims', '{}', true);
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
  PERFORM set_config('request.jwt.claims', '{}', true);
  RAISE NOTICE 'Test 9 passed: anonymous users cannot insert leads directly';
END;
$$;
