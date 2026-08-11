-- Test 10: Authenticated users cannot read leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_count INT;
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.project_leads;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 10 failed: authenticated users can read leads (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 10 passed: authenticated users cannot read leads';
END;
$$;
