-- ─────────────────────────────────────────────────────────────────────────────
-- Rolling per-user 36-hour free SAT exam access table
--
-- Activates immediately when the global Form 7 promo expires on 2026-08-18.
-- Every new eligible user (signed up on or after 2026-08-18T00:05:00Z) gets
-- one personal 36-hour window to take a free SAT exam.
--
-- The promo_form_number column stores which form the user was assigned when
-- their row was created (campaign versioning). If the admin rotates to a new
-- form, existing users keep their original assigned form — the DB row is the
-- source of truth, not the current ROLLING_PROMO_CONFIG.formNumber.
--
-- RLS policy: users may SELECT their own row only.
-- All writes (INSERT/UPDATE/DELETE) are performed via the service-role client
-- in server-side code, so users cannot self-grant or modify timestamps.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.sat_rolling_promo_access (
  user_id           UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             TEXT,
  promo_form_number INTEGER     NOT NULL,
  access_started_at TIMESTAMPTZ NOT NULL,
  access_expires_at TIMESTAMPTZ NOT NULL,
  reason            TEXT        NOT NULL DEFAULT 'rolling_promo_36h_first_visit',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast expiry lookups for admin reporting and cleanup
CREATE INDEX IF NOT EXISTS idx_sat_rolling_promo_access_expires
  ON public.sat_rolling_promo_access (access_expires_at);

-- Fast form-number lookups (useful when rotating to a new promo form)
CREATE INDEX IF NOT EXISTS idx_sat_rolling_promo_access_form
  ON public.sat_rolling_promo_access (promo_form_number);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE public.sat_rolling_promo_access ENABLE ROW LEVEL SECURITY;

-- Users may read their own row to display countdown timers client-side.
-- SELECT-only: no INSERT/UPDATE/DELETE policies for the authenticated role.
-- All writes happen via the service-role (admin) client in rolling-promo.ts.
CREATE POLICY sat_rolling_promo_access_select_own
  ON public.sat_rolling_promo_access
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- No INSERT / UPDATE / DELETE policies — service role only.
-- This prevents users from:
--   • Self-granting a promo row with a far-future expires_at
--   • Extending an expired window
--   • Changing their assigned promo_form_number to a different form
