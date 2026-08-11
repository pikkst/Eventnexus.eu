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

-- Test 2: Authenticated users can read their own profile
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles WHERE id = v_user_id;
  IF v_count != 1 THEN
    RAISE EXCEPTION 'Test 2 failed: authenticated user cannot read own profile (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 2 passed: authenticated users can read their own profile';
END;
$$;
