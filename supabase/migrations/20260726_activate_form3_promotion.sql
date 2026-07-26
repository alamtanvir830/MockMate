-- One-time activation of the Form 3 global promotional window.
-- Uses CURRENT_TIMESTAMP (no parentheses) to avoid copy-paste encoding issues.
-- Safe: WHERE starts_at IS NULL means a second deploy does nothing.

UPDATE sat_form3_promotion
SET starts_at = CURRENT_TIMESTAMP,
    ends_at = CURRENT_TIMESTAMP + interval '47 hours 59 minutes',
    is_active = true,
    updated_at = CURRENT_TIMESTAMP
WHERE promotion_key = 'july-24-2026'
  AND starts_at IS NULL;
