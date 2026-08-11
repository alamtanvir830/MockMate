-- MCAT completed attempts table
-- Durable, server-side storage for finished MCAT exams.
-- Complements localStorage (localStorage is the primary read path;
-- Supabase is the durable backup and cross-device record).
--
-- DO NOT APPLY TO PRODUCTION without owner review.
-- Branch: feat/mcat-forms-1-5-qbank-700

CREATE TABLE IF NOT EXISTS public.mcat_completed_attempts (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  local_attempt_id      text        NOT NULL UNIQUE,
  form_number           int         NOT NULL,
  content_version       text        NOT NULL DEFAULT 'v1',
  scoring_version       text        NOT NULL DEFAULT 'mcat-estimate-v1',
  completed_at          timestamptz NOT NULL,
  -- Section scaled scores (118–132 each)
  chem_phys_score       int         NOT NULL,
  cars_score            int         NOT NULL,
  bio_biochem_score     int         NOT NULL,
  psych_soc_score       int         NOT NULL,
  total_score           int         NOT NULL,
  -- Raw correct/total per section
  chem_phys_correct     int         NOT NULL,
  chem_phys_total       int         NOT NULL,
  cars_correct          int         NOT NULL,
  cars_total            int         NOT NULL,
  bio_biochem_correct   int         NOT NULL,
  bio_biochem_total     int         NOT NULL,
  psych_soc_correct     int         NOT NULL,
  psych_soc_total       int         NOT NULL,
  -- Full answer map and bookmarks
  answers               jsonb       NOT NULL DEFAULT '{}',
  bookmarks             jsonb       NOT NULL DEFAULT '[]',
  ai_feedback           jsonb,
  created_at            timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mcat_completed_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY mcat_completed_select ON public.mcat_completed_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY mcat_completed_insert ON public.mcat_completed_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow updating ai_feedback after initial insert (AI runs async)
CREATE POLICY mcat_completed_update ON public.mcat_completed_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- Index for history queries: newest attempts first per user
CREATE INDEX IF NOT EXISTS idx_mcat_completed_user_date
  ON public.mcat_completed_attempts (user_id, completed_at DESC);

-- Index for looking up a specific local attempt ID (used on results page)
CREATE INDEX IF NOT EXISTS idx_mcat_completed_local_id
  ON public.mcat_completed_attempts (local_attempt_id);
