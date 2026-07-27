-- ─────────────────────────────────────────────────────────────────────────────
-- Forward-only migration: profile creation trigger + Google-auth tracking
-- ─────────────────────────────────────────────────────────────────────────────
-- Goals:
--   1. Add used_google_auth to public.profiles
--   2. Create AFTER INSERT ON auth.users trigger → guarantees every new Auth
--      user has exactly one matching profiles row at account-creation time
--   3. Create AFTER INSERT ON auth.identities trigger → marks existing users
--      when a Google identity is later linked to their account
--   4. Protect used_google_auth from client writes (monotonic + column REVOKE)
--   5. Backfill existing users: create missing profiles, flag Google users
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Add the column ─────────────────────────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS used_google_auth boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.profiles.used_google_auth
  IS 'True when the user has authenticated through a Google identity at least once.';


-- ── 2. Trigger: new auth.users row → create matching profile ─────────────────
--
-- Fires AFTER INSERT on auth.users so the user row fully exists.
-- SECURITY DEFINER + fixed search_path prevents search-path injection.
-- EXCEPTION block ensures auth is never blocked by a profile-creation error.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_is_google  boolean;
  v_full_name  text;
BEGIN
  -- Detect Google: raw_app_meta_data.provider is set by Supabase Auth at signup.
  v_is_google := (NEW.raw_app_meta_data ->> 'provider') = 'google';

  -- Prefer full_name, fall back to name (both supplied by Google OAuth metadata).
  v_full_name := NULLIF(TRIM(COALESCE(
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'name',
    ''
  )), '');

  INSERT INTO public.profiles (id, email, full_name, used_google_auth)
  VALUES (NEW.id, NEW.email, v_full_name, v_is_google)
  ON CONFLICT (id) DO UPDATE
    SET
      -- Fill email only when the existing value is empty.
      email          = CASE
                         WHEN profiles.email IS NULL OR profiles.email = ''
                         THEN EXCLUDED.email
                         ELSE profiles.email
                       END,
      -- Fill name only when the existing value is empty.
      full_name      = CASE
                         WHEN (profiles.full_name IS NULL OR profiles.full_name = '')
                              AND EXCLUDED.full_name IS NOT NULL
                         THEN EXCLUDED.full_name
                         ELSE profiles.full_name
                       END,
      -- Monotonic: once true, stays true.
      used_google_auth = profiles.used_google_auth OR EXCLUDED.used_google_auth;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block the auth flow due to a profile-creation error.
  RAISE WARNING '[handle_new_user] profile upsert failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ── 3. Trigger: Google identity linked later → mark existing profile ──────────
--
-- Fires when a Google identity row is inserted into auth.identities.
-- This covers the case where an existing email/password user later signs in
-- with Google and Supabase links the identity to their existing Auth user.

CREATE OR REPLACE FUNCTION public.handle_google_identity_added()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.provider = 'google' THEN
    UPDATE public.profiles
    SET used_google_auth = true
    WHERE id = NEW.user_id
      AND used_google_auth = false;
  END IF;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[handle_google_identity_added] failed for user %: %', NEW.user_id, SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_google_identity_created ON auth.identities;
CREATE TRIGGER on_auth_google_identity_created
  AFTER INSERT ON auth.identities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_google_identity_added();


-- ── 4a. Monotonic guard: once true, used_google_auth can never go back to false

CREATE OR REPLACE FUNCTION public.enforce_used_google_auth_monotonic()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF OLD.used_google_auth = true AND NEW.used_google_auth = false THEN
    NEW.used_google_auth := true;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_used_google_auth_monotonic ON public.profiles;
CREATE TRIGGER trg_used_google_auth_monotonic
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_used_google_auth_monotonic();


-- ── 4b. Column-level REVOKE: authenticated/anon clients cannot write the column

REVOKE UPDATE (used_google_auth) ON public.profiles FROM authenticated, anon;


-- ── 5. Backfill existing users ────────────────────────────────────────────────

-- 5a. Create profiles for auth users who have none yet.
--     Idempotent: ON CONFLICT (id) DO NOTHING means a second run is a no-op.
INSERT INTO public.profiles (id, email, full_name, used_google_auth)
SELECT
  u.id,
  u.email,
  NULLIF(TRIM(COALESCE(
    u.raw_user_meta_data ->> 'full_name',
    u.raw_user_meta_data ->> 'name',
    ''
  )), ''),
  EXISTS (
    SELECT 1 FROM auth.identities i
    WHERE i.user_id = u.id AND i.provider = 'google'
  )
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

-- 5b. Set used_google_auth = true for existing profiles whose Auth user has a
--     Google identity in auth.identities but was not yet marked.
--     Idempotent: WHERE used_google_auth = false means re-runs touch nothing.
UPDATE public.profiles p
SET used_google_auth = true
WHERE p.used_google_auth = false
  AND EXISTS (
    SELECT 1 FROM auth.identities i
    WHERE i.user_id = p.id AND i.provider = 'google'
  );
