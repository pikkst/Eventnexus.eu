-- Test 4: Authenticated users cannot promote themselves to admin
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_current_role TEXT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  UPDATE public.profiles SET role = 'admin' WHERE id = v_user_id;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  SELECT role INTO v_current_role FROM public.profiles WHERE id = v_user_id;
  IF v_current_role = 'admin' THEN
    RAISE EXCEPTION 'Test 4 failed: authenticated user can change own role to admin';
  END IF;

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 4 passed: authenticated users cannot promote themselves to admin';
END;
$$;
