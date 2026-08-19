-- Migration: 202608130002_create_project_messages
-- Created: 2026-08-13
-- Description: Create project_messages table for admin-client communication with RLS

CREATE TABLE IF NOT EXISTS public.project_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT DEFAULT 'admin' NOT NULL CHECK (sender_type IN ('admin', 'client')),
  sender_email TEXT NOT NULL,
  message_type TEXT DEFAULT 'custom' NOT NULL CHECK (message_type IN ('acknowledgment', 'clarification_request', 'proposal_sent', 'status_update', 'delivery_notification', 'custom')),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_via_email BOOLEAN DEFAULT false NOT NULL,
  email_sent_at TIMESTAMPTZ,
  email_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_project_messages_project_id
ON public.project_messages USING btree (project_id);

CREATE INDEX IF NOT EXISTS idx_project_messages_created_at
ON public.project_messages USING btree (created_at DESC);

ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_project_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trg_update_project_messages_updated_at ON public.project_messages;

CREATE TRIGGER trg_update_project_messages_updated_at
  BEFORE UPDATE ON public.project_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_project_messages_updated_at();

-- Admin reads/writes happen server-side with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Public and authenticated roles cannot read, insert, update, or delete messages through RLS.
-- All admin operations go through protected server-side API routes with role verification.

CREATE POLICY "project_messages_anon_select"
ON public.project_messages FOR SELECT
TO anon
USING (false);

CREATE POLICY "project_messages_authenticated_select"
ON public.project_messages FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "project_messages_anon_insert"
ON public.project_messages FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "project_messages_authenticated_insert"
ON public.project_messages FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "project_messages_anon_update"
ON public.project_messages FOR UPDATE
TO anon
USING (false);

CREATE POLICY "project_messages_authenticated_update"
ON public.project_messages FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "project_messages_anon_delete"
ON public.project_messages FOR DELETE
TO anon
USING (false);

CREATE POLICY "project_messages_authenticated_delete"
ON public.project_messages FOR DELETE
TO authenticated
USING (false);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_messages TO service_role;
