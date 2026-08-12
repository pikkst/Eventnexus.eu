-- RLS test: Authenticated users cannot update project_messages
-- Requires: auth.users row for test user when needed

DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_message_id UUID := gen_random_uuid();
  v_lead_id UUID := gen_random_uuid();
  v_project_id UUID := gen_random_uuid();
  v_row_count INT;
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at, aud, role)
  VALUES (v_user_id, 'test-' || gen_random_uuid() || '@example.com', 'test', now(), now(), 'authenticated', 'authenticated')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.profiles (id, role, full_name, email)
  VALUES (v_user_id, 'user', 'Test User', 'test@example.com');

  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  INSERT INTO public.projects (id, lead_id, status)
  VALUES (v_project_id, v_lead_id, 'new');

  INSERT INTO public.project_messages (id, project_id, sender_type, sender_email, message_type, subject, body)
  VALUES (v_message_id, v_project_id, 'admin', 'admin@example.com', 'custom', 'Subject', 'Body');

  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_id)::text, true);
  SET ROLE authenticated;
  UPDATE public.project_messages SET subject = 'Updated' WHERE id = v_message_id;
  GET DIAGNOSTICS v_row_count = ROW_COUNT;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  IF v_row_count > 0 THEN
    RAISE EXCEPTION 'Test 21 failed: authenticated users can update project_messages (updated % rows)', v_row_count;
  END IF;

  DELETE FROM public.project_messages WHERE id = v_message_id;
  DELETE FROM public.projects WHERE id = v_project_id;
  DELETE FROM public.project_leads WHERE id = v_lead_id;
  DELETE FROM public.profiles WHERE id = v_user_id;
  RAISE NOTICE 'Test 21 passed: authenticated users cannot update project_messages';
END;
$$;
