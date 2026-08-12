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
