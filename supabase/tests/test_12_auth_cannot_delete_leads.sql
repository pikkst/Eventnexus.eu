-- Test 12: Authenticated users cannot delete leads
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_lead_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  BEGIN
    DELETE FROM public.project_leads WHERE id = v_lead_id;
    RAISE EXCEPTION 'Test 12 failed: authenticated users can delete leads';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 12 passed: authenticated users cannot delete leads';
END;
$$;
