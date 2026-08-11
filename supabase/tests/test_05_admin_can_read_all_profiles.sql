-- Test 5: Admins can read all profiles
DO $$
DECLARE
  v_admin_id UUID := gen_random_uuid();
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at, aud, role)
  VALUES (v_admin_id, 'admin-' || gen_random_uuid() || '@example.com', 'test', now(), now(), 'authenticated', 'authenticated'),
          (v_user_id, 'test-' || gen_random_uuid() || '@example.com', 'test', now(), now(), 'authenticated', 'authenticated')
  ON CONFLICT (id) DO NOTHING;

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
