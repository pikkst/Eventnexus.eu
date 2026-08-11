-- Test 1: Anonymous users cannot read profiles
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
  SET ROLE anon;
  SELECT COUNT(*) INTO v_count FROM public.profiles;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 1 failed: anonymous users can read profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  RAISE NOTICE 'Test 1 passed: anonymous users cannot read profiles';
END;
$$;
