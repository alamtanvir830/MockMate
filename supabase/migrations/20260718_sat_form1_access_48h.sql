-- Migrate sat_form_1_access from 72-hour to 48-hour free window.
--
-- Strategy: use access_started_at (the reliable first-dashboard-access timestamp)
-- as the anchor and recalculate access_expires_at = access_started_at + 48 hours.
--
-- Effects on existing rows:
--   • Users whose first dashboard access was > 48 hours ago → expires_at moves to the past (expired)
--   • Users whose first dashboard access was < 48 hours ago → expires_at shortens by 24 hours
--   • No user receives a new 48-hour window measured from migration time
--   • Completed attempts and results are unaffected (expiry only gates new attempts)

UPDATE sat_form_1_access
SET
  access_expires_at = access_started_at + interval '48 hours',
  reason            = 'migrated_72h_to_48h'
WHERE
  -- Only update rows still on the original 72-hour schedule (within ±1 hour tolerance)
  -- to avoid touching rows that were manually adjusted for other reasons.
  ABS(
    EXTRACT(EPOCH FROM (access_expires_at - access_started_at)) - 259200  -- 259200 = 72*60*60
  ) < 3600;  -- 1-hour tolerance

-- Also update any over-provisioned rows (> 48 h remaining from now) that slipped through.
-- This catches any row where expires_at is still more than 48 h in the future.
UPDATE sat_form_1_access
SET
  access_expires_at = access_started_at + interval '48 hours',
  reason            = 'migrated_72h_to_48h'
WHERE
  access_expires_at > NOW() + interval '48 hours'
  AND reason NOT IN ('migrated_72h_to_48h');
