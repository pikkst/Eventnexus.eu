-- Migration: 202608130003_add_project_messages_updated_at
-- Created: 2026-08-13
-- Description: Add updated_at column to project_messages and fix trigger

ALTER TABLE public.project_messages
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now() NOT NULL;

CREATE INDEX IF NOT EXISTS idx_project_messages_updated_at
ON public.project_messages USING btree (updated_at DESC);

DROP TRIGGER IF EXISTS trg_update_project_messages_updated_at ON public.project_messages;

CREATE TRIGGER trg_update_project_messages_updated_at
  BEFORE UPDATE ON public.project_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_project_messages_updated_at();
