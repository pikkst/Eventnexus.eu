-- Migration: 202508120004_create_webhook_events
-- Created: 2025-08-12
-- Description: Create webhook_events table for Resend webhook idempotency

CREATE TABLE IF NOT EXISTS public.webhook_events (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  type TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'resend'
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at
ON public.webhook_events USING btree (created_at DESC);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "webhook_events_anon_select"
ON public.webhook_events FOR SELECT
TO anon
USING (false);

CREATE POLICY "webhook_events_authenticated_select"
ON public.webhook_events FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "webhook_events_anon_insert"
ON public.webhook_events FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "webhook_events_authenticated_insert"
ON public.webhook_events FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "webhook_events_anon_update"
ON public.webhook_events FOR UPDATE
TO anon
USING (false);

CREATE POLICY "webhook_events_authenticated_update"
ON public.webhook_events FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "webhook_events_anon_delete"
ON public.webhook_events FOR DELETE
TO anon
USING (false);

CREATE POLICY "webhook_events_authenticated_delete"
ON public.webhook_events FOR DELETE
TO authenticated
USING (false);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhook_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhook_events TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhook_events TO service_role;
