-- SAT Math & Desmos Academy — mastery-system upgrade (v2)
-- Adds columns needed for weighted mastery calculation, confidence tracking,
-- drill modes, and spaced-repetition review queue.
-- All changes are additive (IF NOT EXISTS / IF EXISTS) — no data is lost.

-- ── Extend sat_math_academy_attempts ─────────────────────────────────────────

ALTER TABLE sat_math_academy_attempts
  ADD COLUMN IF NOT EXISTS difficulty         TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  ADD COLUMN IF NOT EXISTS selected_answer    TEXT,
  ADD COLUMN IF NOT EXISTS correct_answer     TEXT,
  ADD COLUMN IF NOT EXISTS subskill_slug      TEXT,
  ADD COLUMN IF NOT EXISTS domain_slug        TEXT,
  ADD COLUMN IF NOT EXISTS hint_count         INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS confidence         TEXT CHECK (confidence IN ('guessing', 'unsure', 'confident')),
  ADD COLUMN IF NOT EXISTS timed              BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS error_category     TEXT,
  ADD COLUMN IF NOT EXISTS content_version    INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS response_time_seconds INTEGER;

-- Drop the old narrow practice_mode constraint and replace with the expanded set.
ALTER TABLE sat_math_academy_attempts
  DROP CONSTRAINT IF EXISTS sat_math_academy_attempts_practice_mode_check;

ALTER TABLE sat_math_academy_attempts
  ADD CONSTRAINT sat_math_academy_attempts_practice_mode_check
    CHECK (practice_mode IN (
      'skill_drill',
      'mastery_assessment',
      'knowledge_check',
      'recognition_check',
      'diagnostic',
      'desmos_drill',
      'guided_practice',
      'capstone',
      'mastery_check',
      'mixed_practice'
    ));

-- Composite index for mastery calculation (last N attempts per skill)
CREATE INDEX IF NOT EXISTS idx_math_attempts_user_skill_created
  ON sat_math_academy_attempts (user_id, skill_slug, created_at DESC);

-- Index for domain-level aggregations
CREATE INDEX IF NOT EXISTS idx_math_attempts_user_domain
  ON sat_math_academy_attempts (user_id, domain_slug);

-- ── Spaced-repetition review queue ───────────────────────────────────────────
-- Mirrors sat_rw_review_queue; intervals: stage 0→1d, 1→3d, 2→7d, 3→14d, 4+→30d.
-- On incorrect answer: reset to stage 0, next_review = tomorrow.

CREATE TABLE IF NOT EXISTS sat_math_review_queue (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id          TEXT NOT NULL,
  source_type          TEXT NOT NULL DEFAULT 'drill',
  skill_slug           TEXT NOT NULL,
  review_stage         INTEGER NOT NULL DEFAULT 0,
  next_review_at       TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '1 day',
  last_result_correct  BOOLEAN,
  last_reviewed_at     TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (user_id, question_id, source_type)
);

ALTER TABLE sat_math_review_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own math review queue"
  ON sat_math_review_queue FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own math review queue"
  ON sat_math_review_queue FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own math review queue"
  ON sat_math_review_queue FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_math_review_queue_user_due
  ON sat_math_review_queue (user_id, next_review_at);

CREATE INDEX IF NOT EXISTS idx_math_review_queue_skill
  ON sat_math_review_queue (user_id, skill_slug);
