-- 1) Prevent direct execution of SECURITY DEFINER / internal functions by API roles.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;

-- 2) Explicitly deny role modification from the API roles (defense-in-depth against privilege escalation).
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
GRANT ALL ON public.user_roles TO service_role;

DROP POLICY IF EXISTS "No one can insert roles via API" ON public.user_roles;
DROP POLICY IF EXISTS "No one can update roles via API" ON public.user_roles;
DROP POLICY IF EXISTS "No one can delete roles via API" ON public.user_roles;

CREATE POLICY "No one can insert roles via API"
ON public.user_roles FOR INSERT TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "No one can update roles via API"
ON public.user_roles FOR UPDATE TO anon, authenticated
USING (false) WITH CHECK (false);

CREATE POLICY "No one can delete roles via API"
ON public.user_roles FOR DELETE TO anon, authenticated
USING (false);