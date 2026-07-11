-- Optional: admin_users table for Phase 4A admin membership.
--
-- Uncomment and apply this migration only if the profiles table alone
-- is insufficient for your access control requirements.
--
-- The primary admin role storage for Phase 4A is the profiles table.

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'admin' NOT NULL CHECK (role IN ('admin', 'super_admin')),
  UNIQUE(user_id)
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_admin_users_updated_at();

-- Service role has full access (bypasses RLS anyway)
-- Admins can read admin_users via server-side service role key

CREATE POLICY "admin_users_authenticated_select"
ON public.admin_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

CREATE POLICY "admin_users_authenticated_insert"
ON public.admin_users FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

CREATE POLICY "admin_users_authenticated_update"
ON public.admin_users FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

CREATE POLICY "admin_users_authenticated_delete"
ON public.admin_users FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);
