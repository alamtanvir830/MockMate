-- ─────────────────────────────────────────────────────────────────────────────
-- Expand content_version constraint to allow V4 (values 1–4) on SAT tables.
--
-- Root cause: content_version was added to sat_in_progress_attempts and
-- standardized_exam_attempts directly in the Supabase dashboard (no prior
-- migration exists in the codebase). The column was constrained to
-- CHECK (content_version IN (1, 2, 3)) when V3 was introduced.
--
-- When Form 7 V4 content shipped, every autosave attempt sent
-- content_version=4, which the database CHECK constraint rejected.
-- The upsert returned an error → the API responded 500 → the client
-- displayed "Unable to save — retrying" and created no in-progress row.
--
-- This migration is fully idempotent:
--   • ADD COLUMN IF NOT EXISTS — no-op if column already exists.
--   • DO block drops the old named constraint only if it matches the pattern.
--   • ADD CONSTRAINT with a known name — safe to re-run (will error if the
--     constraint already exists with the correct definition; use the DROP
--     CONSTRAINT IF EXISTS in the DO block to ensure idempotency).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── sat_in_progress_attempts ──────────────────────────────────────────────────

-- 1. Ensure column exists (no-op if already present).
ALTER TABLE public.sat_in_progress_attempts
  ADD COLUMN IF NOT EXISTS content_version INTEGER DEFAULT 1;

-- 2. Drop any existing CHECK constraint whose check clause references
--    content_version. The original constraint name varies across environments
--    so we discover and drop it dynamically.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.check_constraints cc
      ON  tc.constraint_name = cc.constraint_name
      AND tc.constraint_schema = cc.constraint_schema
    WHERE tc.table_schema = 'public'
      AND tc.table_name   = 'sat_in_progress_attempts'
      AND tc.constraint_type = 'CHECK'
      AND cc.check_clause ILIKE '%content_version%'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.sat_in_progress_attempts DROP CONSTRAINT IF EXISTS %I',
      r.constraint_name
    );
  END LOOP;
END $$;

-- 3. Add the corrected constraint allowing versions 1–4.
--    NULL is also allowed: rows written before the column existed have no value.
ALTER TABLE public.sat_in_progress_attempts
  DROP CONSTRAINT IF EXISTS sat_in_progress_content_version_check;

ALTER TABLE public.sat_in_progress_attempts
  ADD CONSTRAINT sat_in_progress_content_version_check
  CHECK (content_version IS NULL OR content_version IN (1, 2, 3, 4));

-- ── standardized_exam_attempts ────────────────────────────────────────────────

-- 1. Ensure column exists (no-op if already present).
ALTER TABLE public.standardized_exam_attempts
  ADD COLUMN IF NOT EXISTS content_version INTEGER DEFAULT 1;

-- 2. Drop any existing CHECK constraint referencing content_version.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.check_constraints cc
      ON  tc.constraint_name = cc.constraint_name
      AND tc.constraint_schema = cc.constraint_schema
    WHERE tc.table_schema = 'public'
      AND tc.table_name   = 'standardized_exam_attempts'
      AND tc.constraint_type = 'CHECK'
      AND cc.check_clause ILIKE '%content_version%'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.standardized_exam_attempts DROP CONSTRAINT IF EXISTS %I',
      r.constraint_name
    );
  END LOOP;
END $$;

-- 3. Add the corrected constraint allowing versions 1–4.
ALTER TABLE public.standardized_exam_attempts
  DROP CONSTRAINT IF EXISTS standardized_exam_content_version_check;

ALTER TABLE public.standardized_exam_attempts
  ADD CONSTRAINT standardized_exam_content_version_check
  CHECK (content_version IS NULL OR content_version IN (1, 2, 3, 4));
