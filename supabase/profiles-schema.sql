CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  role TEXT DEFAULT 'user' NOT NULL CHECK (role IN ('admin', 'user')),
  full_name TEXT,
  email TEXT
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profiles_updated_at();

CREATE OR REPLACE FUNCTION public.profiles_update(
  p_full_name TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE 'plpgsql'
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_role TEXT;
BEGIN
  SELECT role INTO v_current_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF v_current_role IS NULL THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;

  UPDATE public.profiles
  SET
    full_name = COALESCE(p_full_name, full_name),
    email = COALESCE(p_email, email)
  WHERE id = auth.uid();
END;
$$;

CREATE OR REPLACE FUNCTION public.profiles_set_role(
  p_target_user_id UUID,
  p_new_role TEXT
)
RETURNS VOID
LANGUAGE 'plpgsql'
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_role TEXT;
BEGIN
  IF p_new_role IS NULL OR p_new_role NOT IN ('admin', 'user') THEN
    RAISE EXCEPTION 'Invalid role value';
  END IF;

  SELECT role INTO v_caller_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF v_caller_role IS NULL OR v_caller_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can change roles';
  END IF;

  UPDATE public.profiles
  SET role = p_new_role
  WHERE id = p_target_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.profiles_prevent_non_admin_role_change()
RETURNS TRIGGER AS $$
DECLARE
  v_caller_role TEXT;
BEGIN
  IF OLD.role = NEW.role THEN
    RETURN NEW;
  END IF;

  SELECT role INTO v_caller_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF v_caller_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can change the role column';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_profiles_prevent_non_admin_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.profiles_prevent_non_admin_role_change();

-- Users can read their own profile
CREATE POLICY "profiles_select_own"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_select_all"
ON public.profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- Admins can update all profiles
CREATE POLICY "profiles_admin_update_all"
ON public.profiles FOR UPDATE
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
