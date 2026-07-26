-- Expand Form 3 promotion eligibility to all authenticated users.
-- Safe to run at any time; does not activate the promotion window.
-- To start the 47h59m window, run the one-time activation command separately.

UPDATE sat_form3_promotion
SET eligibility_signup_utc_start = '1970-01-01 00:00:00+00',
    eligibility_signup_utc_end = '2099-12-31 23:59:59+00',
    updated_at = now()
WHERE promotion_key = 'july-24-2026';
