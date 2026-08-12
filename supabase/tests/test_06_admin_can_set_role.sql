-- Test 6: Admins can change roles via profiles_set_role
DO $$
DECLARE
  v_admin_id UUID := gen_random_uuid();
  v_user_id UUID := gen_random_uuid();
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
