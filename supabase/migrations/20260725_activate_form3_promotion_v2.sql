-- Activate Form 3 global promotional window for all authenticated users
-- Safe: only activates if not already activated (starts_at IS NULL)
-- This replaces the July-24 cohort restriction with a global open window

-- First update the eligibility window to cover all possible signup dates
-- (1970-01-01 to 2099-12-31 = effectively everyone)
UPDATE sat_form3_promotion
SET
  eligibility_signup_utc_start = '1970-01-01 00:00:00+00',
  eligibility_signup_utc_end   = '2099-12-31 23:59:59+00',
  starts_at  = now(),
  ends_at    = now() + interval '47 hours 59 minutes',
  is_active  = true,
  updated_at = now()
WHERE promotion_key = 'july-24-2026'
  AND starts_at IS NULL;
