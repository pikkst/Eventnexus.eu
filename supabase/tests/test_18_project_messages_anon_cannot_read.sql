-- RLS test: Anonymous users cannot read project_messages
-- Requires: auth.users row for test user when needed

DO $$
DECLARE
  v_count INT;
  v_lead_id UUID := gen_random_uuid();
  v_project_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  INSERT INTO public.projects (id, lead_id, status)
  VALUES (v_project_id, v_lead_id, 'new');

  INSERT INTO public.project_messages (project_id, sender_type, sender_email, message_type, subject, body)
  VALUES (v_project_id, 'admin', 'admin@example.com', 'custom', 'Subject', 'Body');

  PERFORM set_config('request.jwt.claims', '{}', true);
  SET ROLE anon;
  SELECT COUNT(*) INTO v_count FROM public.project_messages;
  IF v_count != 0 THEN
    RAISE EXCEPTION 'Test 18 failed: anonymous users can read project_messages (count=%)', v_count;
  END IF;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.project_messages WHERE project_id = v_project_id;
  DELETE FROM public.projects WHERE id = v_project_id;
  DELETE FROM public.project_leads WHERE id = v_lead_id;
  RAISE NOTICE 'Test 18 passed: anonymous users cannot read project_messages';
END;
$$;
