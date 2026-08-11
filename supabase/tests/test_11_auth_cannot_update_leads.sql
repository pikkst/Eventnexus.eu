-- Test 11: Authenticated users cannot update leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_lead_id UUID := gen_random_uuid();
  v_row_count INT;
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at, aud, role)
  VALUES (v_user_id, 'test@example.com', 'test', now(), now(), 'authenticated', 'authenticated')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  UPDATE public.project_leads SET status = 'reviewed' WHERE id = v_lead_id;
  GET DIAGNOSTICS v_row_count = ROW_COUNT;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  IF v_row_count > 0 THEN
    RAISE EXCEPTION 'Test 11 failed: authenticated users can update leads (updated % rows)', v_row_count;
  END IF;

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 11 passed: authenticated users cannot update leads';
END;
$$;
