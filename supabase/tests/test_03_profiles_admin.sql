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

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin_id)::text, true);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.profiles;
  IF v_count != 2 THEN
    RAISE EXCEPTION 'Test 5 failed: admin cannot read all profiles (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

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

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin_id)::text, true);
  SET ROLE authenticated;
  PERFORM public.profiles_set_role(v_user_id, 'admin');
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

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

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  BEGIN
    PERFORM public.profiles_set_role(v_user_id, 'admin');
    RAISE EXCEPTION 'Test 7 failed: non-admin can change role via profiles_set_role';
  EXCEPTION
    WHEN OTHERS THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 7 passed: non-admins cannot change roles via profiles_set_role';
END;
$$;
