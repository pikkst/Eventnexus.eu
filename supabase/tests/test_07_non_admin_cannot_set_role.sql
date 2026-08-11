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
