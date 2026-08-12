-- RLS test: Anonymous users cannot insert project_messages
-- Requires: auth.users row for test user when needed

DO $$
DECLARE
  v_lead_id UUID := gen_random_uuid();
  v_project_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  INSERT INTO public.projects (id, lead_id, status)
  VALUES (v_project_id, v_lead_id, 'new');

  PERFORM set_config('request.jwt.claims', '{}', true);
  SET ROLE anon;
  BEGIN
    INSERT INTO public.project_messages (project_id, sender_type, sender_email, message_type, subject, body)
    VALUES (v_project_id, 'admin', 'admin@example.com', 'custom', 'Subject', 'Body');
    RAISE EXCEPTION 'Test 19 failed: anonymous users can insert project_messages directly';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.projects WHERE id = v_project_id;
  DELETE FROM public.project_leads WHERE id = v_lead_id;
  RAISE NOTICE 'Test 19 passed: anonymous users cannot insert project_messages directly';
END;
$$;
