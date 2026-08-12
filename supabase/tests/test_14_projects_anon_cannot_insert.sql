-- RLS test: Anonymous users cannot insert projects
-- Requires: auth.users row for test user when needed

DO $$
DECLARE
  v_lead_id UUID := gen_random_uuid();
BEGIN
  INSERT INTO public.project_leads (id, full_name, email, idea_description, project_type)
  VALUES (v_lead_id, 'Test Lead', 'lead@example.com', 'desc', 'web');

  PERFORM set_config('request.jwt.claims', '{}', true);
  SET ROLE anon;
  BEGIN
    INSERT INTO public.projects (lead_id, status, admin_notes, lead_score, next_action)
    VALUES (v_lead_id, 'new', 'notes', 5, 'follow up');
    RAISE EXCEPTION 'Test 14 failed: anonymous users can insert projects directly';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);

  DELETE FROM public.project_leads WHERE id = v_lead_id;
  RAISE NOTICE 'Test 14 passed: anonymous users cannot insert projects directly';
END;
$$;
