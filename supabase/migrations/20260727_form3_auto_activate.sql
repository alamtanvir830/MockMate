-- Reset the current promotion row so the new login-triggered activation takes over.
-- After deploy, the first authenticated user to log in will start the 47h59m timer.

UPDATE sat_form3_promotion
SET starts_at = NULL,
    ends_at = NULL,
    is_active = false,
    updated_at = CURRENT_TIMESTAMP
WHERE promotion_key = 'july-24-2026';

-- Atomic activation function using trusted DB server time (now()).
-- SECURITY DEFINER means it runs as the function owner regardless of caller role,
-- so it can UPDATE the table even though normal RLS blocks writes.
-- SET search_path = public prevents search-path injection.
CREATE OR REPLACE FUNCTION activate_sat_form3_if_needed()
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- WHERE starts_at IS NULL makes this atomic.
  -- If two logins race, PostgreSQL serialises the row update:
  -- the second UPDATE finds starts_at already set and updates 0 rows.
  UPDATE sat_form3_promotion
  SET starts_at = now(),
      ends_at = now() + interval '47 hours 59 minutes',
      is_active = true,
      updated_at = now()
  WHERE promotion_key = 'july-24-2026'
    AND starts_at IS NULL;
END;
$$;

GRANT EXECUTE ON FUNCTION activate_sat_form3_if_needed() TO service_role;
