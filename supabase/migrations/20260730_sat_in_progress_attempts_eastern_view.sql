-- ──────────────────────────────────────────────────────────────────────────────
-- View: public.sat_in_progress_attempts_eastern
--
-- Read-only display view over public.sat_in_progress_attempts.
-- Retains every original column unchanged and adds two formatted display
-- columns that express started_at and last_saved_at in 12-hour
-- America/New_York time with the correct EDT/EST abbreviation.
--
-- The underlying table (sat_in_progress_attempts) is not modified.
-- No column types, defaults, or RLS policies on that table are changed.
--
-- Security: WITH (security_invoker = true) — the caller's credentials and
-- the base table's RLS policies apply when querying through this view.
-- A row that is hidden by RLS on sat_in_progress_attempts remains hidden
-- when queried through sat_in_progress_attempts_eastern.
-- Admin access via the service role (Supabase Dashboard / SQL editor) sees
-- all rows, identical to querying the base table directly.
--
-- Format: MM/DD/YYYY, h:mm AM/PM EDT  (summer)
--         MM/DD/YYYY, h:mm AM/PM EST  (winter)
--
-- Example conversions:
--   2026-07-30 17:07:42+00  →  07/30/2026, 1:07 PM EDT
--   2026-01-30 17:07:42+00  →  01/30/2026, 12:07 PM EST
-- ──────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW public.sat_in_progress_attempts_eastern
  WITH (security_invoker = true)
AS
SELECT
  -- ── Original columns — preserved verbatim ──────────────────────────────────
  id,
  user_id,
  form_number,
  local_attempt_id,
  answers,
  bookmarks,
  strikeouts,
  rw_m2_type,
  math_m2_type,
  current_phase_tag,
  current_section,
  current_module,
  current_question_idx,
  module_deadline_at,
  started_at,
  last_saved_at,
  user_name,
  user_email,

  -- ── started_at in 12-hour Eastern Time ─────────────────────────────────────
  -- Uses AT TIME ZONE 'America/New_York' — handles DST automatically.
  -- EDT/EST abbreviation is derived by comparing the UTC offset of the
  -- converted timestamp: UTC-4 → EDT (summer), UTC-5 → EST (winter).
  to_char(
    started_at AT TIME ZONE 'America/New_York',
    'MM/DD/YYYY, FMHH12:MI AM'
  ) || ' ' ||
  CASE
    WHEN EXTRACT(EPOCH FROM
      (started_at AT TIME ZONE 'America/New_York')::timestamptz - started_at
    ) / 3600.0 = -4
    THEN 'EDT'
    ELSE 'EST'
  END                                          AS started_at_eastern,

  -- ── last_saved_at in 12-hour Eastern Time ──────────────────────────────────
  to_char(
    last_saved_at AT TIME ZONE 'America/New_York',
    'MM/DD/YYYY, FMHH12:MI AM'
  ) || ' ' ||
  CASE
    WHEN EXTRACT(EPOCH FROM
      (last_saved_at AT TIME ZONE 'America/New_York')::timestamptz - last_saved_at
    ) / 3600.0 = -4
    THEN 'EDT'
    ELSE 'EST'
  END                                          AS last_saved_eastern

FROM public.sat_in_progress_attempts;
