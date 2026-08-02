-- SAT Form 3 Global Promotional Reopen — August 2026
-- =====================================================
-- Recreates the sat_form3_promotion table (was dropped in 20260728_sat_form3_per_user_timer.sql)
-- as a single-row global configuration for the Form 3 free promotional window.
--
-- ACTIVATION (run ONCE immediately after deployment is Ready):
--
--   WITH activation AS (
--     SELECT clock_timestamp() AS ts
--   )
--   UPDATE sat_form3_promotion
--   SET
--     starts_at  = (SELECT ts FROM activation),
--     ends_at    = (SELECT ts FROM activation) + interval '47 hours 59 minutes',
--     enabled    = true,
--     updated_at = (SELECT ts FROM activation)
--   WHERE promotion_key = 'august-2026'
--     AND starts_at IS NULL;
--
-- Verify immediately after:
--
--   SELECT promotion_key, enabled, starts_at, ends_at,
--          ends_at - starts_at AS duration,
--          now() < ends_at     AS is_active_now,
--          now()               AS db_now
--   FROM sat_form3_promotion
--   WHERE promotion_key = 'august-2026';
--
-- Rollback (close window early):
--
--   UPDATE sat_form3_promotion
--   SET enabled = false, updated_at = clock_timestamp()
--   WHERE promotion_key = 'august-2026';

-- ── Table ──────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sat_form3_promotion (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  promotion_key text        NOT NULL UNIQUE,   -- human-readable version identifier
  form_number   integer     NOT NULL DEFAULT 3 CHECK (form_number = 3),
  starts_at     timestamptz,                   -- NULL until admin activates
  ends_at       timestamptz,                   -- NULL until admin activates
  enabled       boolean     NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  -- Integrity: either both NULL (not yet activated) or both set
  CONSTRAINT sat_form3_promotion_dates_consistency
    CHECK (
      (starts_at IS NULL AND ends_at IS NULL)
      OR (starts_at IS NOT NULL AND ends_at IS NOT NULL AND ends_at > starts_at)
    )
);

COMMENT ON TABLE sat_form3_promotion IS
  'Global SAT Form 3 promotional free-access window. One row per promotion. '
  'Activated via atomic SQL after deployment; never written by application code.';

COMMENT ON COLUMN sat_form3_promotion.enabled IS
  'Set to true at activation. Set to false to close the window early without changing timestamps.';

COMMENT ON COLUMN sat_form3_promotion.starts_at IS
  'Authoritative start time set via clock_timestamp() in an atomic UPDATE. '
  'NULL means not yet activated.';

COMMENT ON COLUMN sat_form3_promotion.ends_at IS
  'starts_at + interval ''47 hours 59 minutes''. Set atomically with starts_at.';

-- ── Seed row (disabled, not yet activated) ────────────────────────────────────

INSERT INTO sat_form3_promotion (promotion_key, form_number, starts_at, ends_at, enabled)
VALUES ('august-2026', 3, NULL, NULL, false)
ON CONFLICT (promotion_key) DO NOTHING;

-- ── Row-Level Security ────────────────────────────────────────────────────────
-- Authenticated users may read (needed for countdown display and access checks
-- via the server-side Supabase client using the user's JWT).
-- Only service_role (admin client) may write — enforced by denying all
-- INSERT/UPDATE/DELETE for authenticated and anon roles.

ALTER TABLE sat_form3_promotion ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS sat_form3_promotion_read ON sat_form3_promotion;
CREATE POLICY sat_form3_promotion_read
  ON sat_form3_promotion
  FOR SELECT
  TO authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policies for authenticated or anon means the service
-- role bypasses RLS (default Supabase behaviour) and ordinary users cannot write.
