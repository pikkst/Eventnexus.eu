-- Migration: 202508120003_create_project_leads
-- Created: 2025-08-12
-- Description: Create project_leads table for structured lead capture with RLS

CREATE TABLE IF NOT EXISTS public.project_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  lead_score INTEGER DEFAULT 0 NOT NULL,

  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_or_channel TEXT,
  company_name TEXT,
  region TEXT,

  project_type TEXT NOT NULL,
  project_title TEXT,
  idea_description TEXT NOT NULL,
  target_users TEXT,
  problem_to_solve TEXT,
  desired_outcome TEXT,

  required_features TEXT[] DEFAULT '{}' NOT NULL,
  technical_needs TEXT[] DEFAULT '{}' NOT NULL,

  timeline TEXT,
  budget_range TEXT,
  project_status TEXT,

  existing_domain TEXT,
  existing_url TEXT,
  existing_repo TEXT,
  existing_brand_assets TEXT,

  integrations TEXT[] DEFAULT '{}' NOT NULL,
  extra_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_project_leads_status
ON public.project_leads USING btree (status);

CREATE INDEX IF NOT EXISTS idx_project_leads_created_at
ON public.project_leads USING btree (created_at DESC);

ALTER TABLE public.project_leads ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_project_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trg_update_project_leads_updated_at ON public.project_leads;

CREATE TRIGGER trg_update_project_leads_updated_at
  BEFORE UPDATE ON public.project_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_project_leads_updated_at();

-- Admin reads/writes happen server-side with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Public and authenticated roles cannot read, insert, update, or delete leads through RLS.
-- All writes go through the server-side /api/submit-lead endpoint with validation and abuse checks.

CREATE POLICY "project_leads_anon_select"
ON public.project_leads FOR SELECT
TO anon
USING (false);

CREATE POLICY "project_leads_authenticated_select"
ON public.project_leads FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "project_leads_anon_update"
ON public.project_leads FOR UPDATE
TO anon
USING (false);

CREATE POLICY "project_leads_authenticated_update"
ON public.project_leads FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "project_leads_anon_delete"
ON public.project_leads FOR DELETE
TO anon
USING (false);

CREATE POLICY "project_leads_authenticated_delete"
ON public.project_leads FOR DELETE
TO authenticated
USING (false);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_leads TO service_role;
