-- Migration: 202608130001_create_projects
-- Created: 2026-08-13
-- Description: Create projects table for admin project management with RLS

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  lead_id UUID REFERENCES public.project_leads(id) ON DELETE SET NULL UNIQUE,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'accepted', 'in_progress', 'awaiting_client_input', 'delivered', 'completed', 'blocked', 'on_hold', 'archived', 'rejected')),
  admin_notes TEXT,
  lead_score INTEGER DEFAULT 0 NOT NULL,
  next_action TEXT,
  follow_up_date DATE,
  assigned_admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  project_value_estimate NUMERIC(12, 2)
);

CREATE INDEX IF NOT EXISTS idx_projects_status
ON public.projects USING btree (status);

CREATE INDEX IF NOT EXISTS idx_projects_created_at
ON public.projects USING btree (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_lead_id
ON public.projects USING btree (lead_id);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trg_update_projects_updated_at ON public.projects;

CREATE TRIGGER trg_update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_projects_updated_at();

-- Admin reads/writes happen server-side with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Public and authenticated roles cannot read, insert, update, or delete projects through RLS.
-- All admin operations go through protected server-side API routes with role verification.

CREATE POLICY "projects_anon_select"
ON public.projects FOR SELECT
TO anon
USING (false);

CREATE POLICY "projects_authenticated_select"
ON public.projects FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "projects_anon_insert"
ON public.projects FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "projects_authenticated_insert"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "projects_anon_update"
ON public.projects FOR UPDATE
TO anon
USING (false);

CREATE POLICY "projects_authenticated_update"
ON public.projects FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "projects_anon_delete"
ON public.projects FOR DELETE
TO anon
USING (false);

CREATE POLICY "projects_authenticated_delete"
ON public.projects FOR DELETE
TO authenticated
USING (false);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO service_role;
