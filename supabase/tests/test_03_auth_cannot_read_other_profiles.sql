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

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles WHERE id = v_other_id;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 3 failed: authenticated user can read other profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.profiles WHERE id IN (v_user_id, v_other_id);
  RAISE NOTICE 'Test 3 passed: authenticated users cannot read other profiles';
END;
$$;
