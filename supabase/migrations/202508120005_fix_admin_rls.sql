-- Migration: 202508120005_fix_admin_rls
-- Description: Fix admin_users policies to use is_admin()
-- Note: anon grants on profiles are intentionally kept so existing RLS tests
-- can query the table and receive 0 rows; RLS remains the actual access control.

-- Revoke anon access from admin_users only
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.admin_users FROM anon;

-- Drop recursive admin_users policies
DROP POLICY IF EXISTS "admin_users_authenticated_select" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_authenticated_insert" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_authenticated_update" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_authenticated_delete" ON public.admin_users;

-- Admins can read admin_users via is_admin()
CREATE POLICY "admin_users_admin_select"
ON public.admin_users FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admins can insert admin_users via is_admin()
CREATE POLICY "admin_users_admin_insert"
ON public.admin_users FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admins can update admin_users via is_admin()
CREATE POLICY "admin_users_admin_update"
ON public.admin_users FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admins can delete admin_users via is_admin()
CREATE POLICY "admin_users_admin_delete"
ON public.admin_users FOR DELETE
TO authenticated
USING (public.is_admin());
