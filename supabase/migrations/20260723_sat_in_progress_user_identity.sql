-- Forward-only: add student identity fields to sat_in_progress_attempts.
-- Enables admin review without joining auth.users on every query.

ALTER TABLE public.sat_in_progress_attempts
  ADD COLUMN IF NOT EXISTS user_name  text,
  ADD COLUMN IF NOT EXISTS user_email text;

-- Backfill from auth.users and profiles.full_name where records already exist.
-- Safe and idempotent: only fills rows where the columns are currently null.
UPDATE public.sat_in_progress_attempts AS a
SET
  user_email = u.email,
  user_name  = NULLIF(TRIM(COALESCE(p.full_name, '')), '')
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE a.user_id = u.id
  AND (a.user_email IS NULL OR a.user_name IS NULL);
