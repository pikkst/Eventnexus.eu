-- RLS test: Authenticated users cannot read projects
-- Requires: auth.users row for test user when needed

DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_count INT;
  v_lead_id UUID := gen_random_uuid();
  v_project_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at, aud, role)
  VALUES (v_user_id, 'test-' || gen_random_uuid() || '@example.com', 'test', now(), now(), 'authenticated', 'authenticated')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  INSERT INTO public.projects (id, lead_id, status, admin_notes, lead_score, next_action)
  VALUES (v_project_id, v_lead_id, 'new', 'notes', 5, 'follow up');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  SELECT COUNT(*) INTO v_count FROM public.projects;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 15 failed: authenticated users can read projects (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.projects WHERE id = v_project_id;
  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 15 passed: authenticated users cannot read projects';
END;
$$;
