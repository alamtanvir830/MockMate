-- SAT Math & Desmos Academy — initial schema
-- Phase 1: lesson progress and diagnostic attempts

-- ── Lesson progress ─────────────────────────────────────────────────────────────
-- Mirrors the pattern of sat_rw_academy_lesson_progress.
-- One row per user per skill slug; updated in-place as the user works through the lesson.

CREATE TABLE IF NOT EXISTS sat_math_academy_lesson_progress (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_slug     TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'in_progress'
                   CHECK (status IN ('in_progress', 'completed')),
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (user_id, skill_slug)
);

ALTER TABLE sat_math_academy_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own math lesson progress"
  ON sat_math_academy_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own math lesson progress"
  ON sat_math_academy_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own math lesson progress"
  ON sat_math_academy_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ── Practice attempts ──────────────────────────────────────────────────────────
-- Records individual question attempts during Math Academy drills, capstones,
-- and mastery-check sessions.
-- practice_mode: 'skill_drill' | 'capstone' | 'mastery_check' | 'mixed_practice'

CREATE TABLE IF NOT EXISTS sat_math_academy_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id     TEXT NOT NULL,
  skill_slug      TEXT NOT NULL,
  correct         BOOLEAN NOT NULL,
  time_spent_ms   INTEGER,
  practice_mode   TEXT NOT NULL DEFAULT 'skill_drill'
                    CHECK (practice_mode IN ('skill_drill', 'capstone', 'mastery_check', 'mixed_practice')),
  session_id      UUID,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE sat_math_academy_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own math attempts"
  ON sat_math_academy_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own math attempts"
  ON sat_math_academy_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── Indexes ─────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_math_lesson_progress_user
  ON sat_math_academy_lesson_progress (user_id);

CREATE INDEX IF NOT EXISTS idx_math_attempts_user_skill
  ON sat_math_academy_attempts (user_id, skill_slug);

CREATE INDEX IF NOT EXISTS idx_math_attempts_user_created
  ON sat_math_academy_attempts (user_id, created_at DESC);
