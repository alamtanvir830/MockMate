BEGIN;

-- 1. Extend sat_free_exam_access to support per-form records
ALTER TABLE public.sat_free_exam_access DROP CONSTRAINT sat_free_exam_access_pkey;
ALTER TABLE public.sat_free_exam_access RENAME COLUMN free_form_number TO form_number;
ALTER TABLE public.sat_free_exam_access ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE public.sat_free_exam_access ADD CONSTRAINT sat_free_exam_access_pkey PRIMARY KEY (user_id, form_number);

-- 2. Drop INSERT/UPDATE RLS policies — all writes go through service role only
DROP POLICY IF EXISTS sat_free_exam_access_insert ON public.sat_free_exam_access;
DROP POLICY IF EXISTS sat_free_exam_access_update ON public.sat_free_exam_access;

-- 3. Remove the old global promotion table
DROP TABLE IF EXISTS public.sat_form3_promotion;

-- 4. Create atomic function using trusted DB time for Form 3 timer initialization
-- SECURITY DEFINER + restricted search_path prevents privilege escalation
-- ON CONFLICT (user_id, form_number) DO NOTHING ensures idempotency and atomicity
CREATE OR REPLACE FUNCTION public.init_form3_free_window(p_user_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO sat_free_exam_access (user_id, form_number, access_started_at, access_expires_at, reason)
  VALUES (p_user_id, 3, now(), now() + INTERVAL '48 hours', 'login_48h_window')
  ON CONFLICT (user_id, form_number) DO NOTHING;
$$;

REVOKE ALL ON FUNCTION public.init_form3_free_window(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.init_form3_free_window(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.init_form3_free_window(uuid) TO service_role;

COMMIT;
