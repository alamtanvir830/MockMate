-- SAT Form 3 July 24 2026 Global Promotional Window
-- ---------------------------------------------------
-- This migration creates the sat_form3_promotion table and
-- inserts an UNACTIVATED row.
--
-- TO ACTIVATE the promotion in production, run this one-time command:
--
--   UPDATE sat_form3_promotion
--   SET
--     starts_at  = now(),
--     ends_at    = now() + interval '47 hours 59 minutes',
--     is_active  = true,
--     updated_at = now()
--   WHERE promotion_key = 'july-24-2026'
--     AND starts_at IS NULL;
--
-- Run that command exactly once after deploying this migration.
-- The resulting starts_at / ends_at are immutable; do not run it again.

CREATE TABLE IF NOT EXISTS sat_form3_promotion (
  id                            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  promotion_key                 text        NOT NULL UNIQUE,
  form_number                   integer     NOT NULL DEFAULT 3,
  -- starts_at and ends_at are NULL until the admin runs the activation command above
  starts_at                     timestamptz,
  ends_at                       timestamptz,
  -- Eligibility window: accounts created on July 24 2026 America/New_York (EDT = UTC-4)
  -- 2026-07-24 00:00:00 EDT = 2026-07-24 04:00:00 UTC
  -- 2026-07-25 00:00:00 EDT = 2026-07-25 04:00:00 UTC  (exclusive upper bound)
  eligibility_signup_utc_start  timestamptz NOT NULL,
  eligibility_signup_utc_end    timestamptz NOT NULL,
  is_active                     boolean     NOT NULL DEFAULT false,
  created_at                    timestamptz NOT NULL DEFAULT now(),
  updated_at                    timestamptz NOT NULL DEFAULT now()
);

-- Insert the unactivated promotion record
INSERT INTO sat_form3_promotion (
  promotion_key,
  form_number,
  starts_at,
  ends_at,
  eligibility_signup_utc_start,
  eligibility_signup_utc_end,
  is_active
) VALUES (
  'july-24-2026',
  3,
  NULL,
  NULL,
  '2026-07-24 04:00:00+00',
  '2026-07-25 04:00:00+00',
  false
) ON CONFLICT (promotion_key) DO NOTHING;

-- RLS: authenticated users may read (for countdown display and eligibility UI)
--       nobody but service-role may insert or update (promotion is admin-activated via SQL)
ALTER TABLE sat_form3_promotion ENABLE ROW LEVEL SECURITY;

CREATE POLICY sat_form3_promotion_read
  ON sat_form3_promotion
  FOR SELECT
  TO authenticated
  USING (true);
