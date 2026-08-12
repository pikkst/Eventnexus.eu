-- Test 9: Anonymous users cannot insert leads directly
DO $$
DECLARE
  v_count INT;
BEGIN
  PERFORM set_config('request.jwt.claims', '{}', true);
  SET ROLE anon;
  BEGIN
    INSERT INTO public.project_leads (full_name, email, idea_description, project_type)
    VALUES ('Test', 'test@example.com', 'desc', 'web');
    RAISE EXCEPTION 'Test 9 failed: anonymous users can insert leads directly';
  EXCEPTION
    WHEN insufficient_privilege OR check_violation THEN
      NULL;
  END;
  RESET ROLE;
  PERFORM set_config('request.jwt.claims', '{}', true);
  RAISE NOTICE 'Test 9 passed: anonymous users cannot insert leads directly';
END;
$$;
