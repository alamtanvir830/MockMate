-- Expand eligibility window to cover all past and future signups.
-- The signup-date check is superseded; all authenticated users are now eligible.
-- Safe to run multiple times.

UPDATE sat_form3_promotion
SET eligibility_signup_utc_start = '1970-01-01',
    eligibility_signup_utc_end = '2099-12-31'
WHERE promotion_key = 'july-24-2026';
