-- Activate SAT Form 3 July 24 2026 promotion if not yet started
-- -------------------------------------------------------------------
-- Runs as a no-op if the promotion was already activated (starts_at IS NOT NULL).
-- Safe to apply multiple times.

UPDATE sat_form3_promotion
SET
  starts_at  = now(),
  ends_at    = now() + interval '47 hours 59 minutes',
  is_active  = true,
  updated_at = now()
WHERE promotion_key = 'july-24-2026'
  AND starts_at IS NULL;
