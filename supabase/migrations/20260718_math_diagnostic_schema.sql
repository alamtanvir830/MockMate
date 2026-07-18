-- SAT Math Academy — diagnostic attempts summary table.
-- Mirrors the structure of sat_rw_diagnostic_attempts.
-- Individual question responses are stored in sat_math_academy_attempts.

CREATE TABLE IF NOT EXISTS public.sat_math_diagnostic_attempts (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email              TEXT,
  user_name               TEXT,
  client_token            TEXT UNIQUE,
  diagnostic_version      INTEGER NOT NULL DEFAULT 1,
  total_questions         INTEGER NOT NULL,
  answered_questions      INTEGER NOT NULL DEFAULT 0
                            CHECK (answered_questions >= 0),
  correct_count           INTEGER NOT NULL DEFAULT 0
                            CHECK (correct_count >= 0),
  incorrect_count         INTEGER NOT NULL DEFAULT 0
                            CHECK (incorrect_count >= 0),
  omitted_count           INTEGER NOT NULL DEFAULT 0
                            CHECK (omitted_count >= 0),
  accuracy_percentage     NUMERIC(5,2) NOT NULL DEFAULT 0
                            CHECK (accuracy_percentage >= 0 AND accuracy_percentage <= 100),
  -- { [domain_slug]: { correct, total, pct, title } }
  domain_results          JSONB NOT NULL DEFAULT '{}',
  -- { [skill_slug]: { correct, total, pct, title, domain } }
  skill_results           JSONB NOT NULL DEFAULT '{}',
  strongest_skill_slugs   TEXT[] NOT NULL DEFAULT '{}',
  weakest_skill_slugs     TEXT[] NOT NULL DEFAULT '{}',
  recommended_skill_slug  TEXT,
  completed_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sat_math_diagnostic_attempts_user_completed_idx
  ON public.sat_math_diagnostic_attempts(user_id, completed_at DESC);

ALTER TABLE public.sat_math_diagnostic_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users insert own math diagnostic attempts"
  ON public.sat_math_diagnostic_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users read own math diagnostic attempts"
  ON public.sat_math_diagnostic_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
