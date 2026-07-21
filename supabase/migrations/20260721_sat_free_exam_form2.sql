-- Move 48-hour free SAT access from Form 1 to Form 2
-- ─────────────────────────────────────────────────────────────────────────────
-- Creates a generic sat_free_exam_access table keyed on user_id.
-- Backfills every existing auth.users row with a 47h 59m Form 2 window
-- so all existing accounts get a fresh chance at the new free exam.
-- sat_form_1_access is preserved intact for historical lookups.

CREATE TABLE sat_free_exam_access (
  user_id           UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             TEXT,
  free_form_number  INTEGER     NOT NULL DEFAULT 2,
  access_started_at TIMESTAMPTZ NOT NULL,
  access_expires_at TIMESTAMPTZ NOT NULL,
  reason            TEXT        NOT NULL DEFAULT '',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast expiry lookups in admin queries
CREATE INDEX idx_sat_free_exam_access_expires
  ON sat_free_exam_access (access_expires_at);

-- Row-level security: users can only read/write their own row
ALTER TABLE sat_free_exam_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own free exam access"
  ON sat_free_exam_access FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own free exam access"
  ON sat_free_exam_access FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own free exam access"
  ON sat_free_exam_access FOR UPDATE
  USING (auth.uid() = user_id);

-- Backfill: every existing user gets a 47h 59m Form 2 window from now
-- New users who sign up after this migration get 48h from their first visit
-- (created by getOrCreateFreeExamAccess in the server component)
INSERT INTO sat_free_exam_access (
  user_id,
  email,
  free_form_number,
  access_started_at,
  access_expires_at,
  reason
)
SELECT
  id,
  email,
  2,
  now(),
  now() + interval '47 hours 59 minutes',
  'migration_existing_user_reset'
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
