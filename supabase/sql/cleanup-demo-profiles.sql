-- =============================================================================
-- MockMate — Demo Profile Cleanup
-- =============================================================================
-- PURPOSE:
--   Remove demo/test/fake accounts from public.profiles that were created by
--   the old seedDemoGroupExam() function (Bob, John, Timothy with
--   @mockmate-demo.invalid emails) and any other obvious demo accounts.
--
-- SAFETY RULES (read before running anything):
--   • Never deletes auth.users — only public.profiles rows.
--   • Never deletes ranvi.contact@gmail.com.
--   • Never deletes paying/subscribed users.
--   • Never deletes users with real exam attempts (non-demo).
--   • Never deletes users with Stripe subscription records.
--   • Always run PHASE 1 (dry run) first and review output before PHASE 2.
--
-- EXECUTION ORDER:
--   1. Run PHASE 1 — review every candidate row
--   2. Confirm the list contains only demo accounts
--   3. Run PHASE 2 step A (backup)
--   4. Run PHASE 2 step B (delete)
-- =============================================================================


-- =============================================================================
-- PHASE 1 — DRY RUN  (read-only, no changes)
-- =============================================================================
-- Run this first. Review EVERY row before proceeding.

SELECT
  p.id,
  p.email,
  p.full_name,
  p.created_at,

  -- Why this row is a candidate
  CASE
    WHEN p.email ILIKE '%@mockmate-demo.invalid' THEN 'mockmate-demo.invalid domain (fake demo user)'
    WHEN p.email ILIKE '%demo%'                  THEN 'email contains "demo"'
    WHEN p.email ILIKE '%@example.%'             THEN 'example TLD domain'
    WHEN p.email ILIKE '%@test.%'                THEN 'test TLD domain'
    WHEN p.email ILIKE '%fake%'                  THEN 'email contains "fake"'
    WHEN p.email ILIKE '%seed%'                  THEN 'email contains "seed"'
    WHEN p.full_name ILIKE '%demo%'              THEN 'full_name contains "demo"'
    WHEN p.full_name ILIKE '%test%'              THEN 'full_name contains "test"'
    WHEN p.full_name ILIKE '%sample%'            THEN 'full_name contains "sample"'
    ELSE 'manual review needed'
  END AS reason_detected,

  -- Related-data counts — non-zero means extra caution before deleting
  (SELECT COUNT(*) FROM public.exam_attempts ea WHERE ea.user_id = p.id)           AS exam_attempts_count,
  (SELECT COUNT(*) FROM public.exams ex WHERE ex.user_id = p.id)                   AS exams_owned_count,
  (SELECT COUNT(*) FROM public.exam_shared_recipients esr WHERE esr.email = p.email) AS shared_exams_count,

  -- Stripe/billing protection
  CASE
    WHEN p.stripe_customer_id IS NOT NULL OR p.stripe_subscription_id IS NOT NULL
      THEN 'YES — DO NOT DELETE'
    ELSE 'none'
  END AS stripe_record,

  p.subscription_status,
  p.subscription_tier

FROM public.profiles p

WHERE
  -- Must match at least one demo indicator
  (
    p.email ILIKE '%@mockmate-demo.invalid'
    OR p.email ILIKE '%demo%'
    OR p.email ILIKE '%@example.%'
    OR p.email ILIKE '%@test.%'
    OR p.email ILIKE '%fake%'
    OR p.email ILIKE '%seed%'
    OR p.full_name ILIKE '%demo%'
    OR p.full_name ILIKE '%test%'
    OR p.full_name ILIKE '%sample%'
  )

  -- Hard exclusions — never delete these
  AND p.email != 'ranvi.contact@gmail.com'
  AND p.email NOT ILIKE '%+%@gmail.com'        -- real Gmail with + alias (skip for safety)
  AND p.stripe_customer_id IS NULL
  AND p.stripe_subscription_id IS NULL
  AND (p.subscription_status IS NULL OR p.subscription_status = '')

ORDER BY p.created_at ASC;


-- =============================================================================
-- PHASE 2A — BACKUP  (run only after reviewing Phase 1 output)
-- =============================================================================
-- Creates a backup table, then inserts the exact rows that Phase 2B will delete.
-- Run this BEFORE the DELETE.

/*  ← Remove these comment delimiters to run Phase 2A

CREATE TABLE IF NOT EXISTS public.deleted_demo_profiles_backup (
  -- Backup metadata
  deleted_at        timestamptz NOT NULL DEFAULT now(),
  delete_reason     text        NOT NULL DEFAULT 'demo-profile-cleanup-2026-07',

  -- Original public.profiles columns
  id                uuid,
  email             text,
  full_name         text,
  stripe_customer_id        text,
  stripe_subscription_id    text,
  subscription_status       text,
  subscription_tier         text,
  created_at        timestamptz
);

INSERT INTO public.deleted_demo_profiles_backup
  (delete_reason, id, email, full_name,
   stripe_customer_id, stripe_subscription_id,
   subscription_status, subscription_tier, created_at)
SELECT
  'demo-profile-cleanup-2026-07',
  p.id, p.email, p.full_name,
  p.stripe_customer_id, p.stripe_subscription_id,
  p.subscription_status, p.subscription_tier, p.created_at
FROM public.profiles p
WHERE
  (
    p.email ILIKE '%@mockmate-demo.invalid'
    OR p.email ILIKE '%demo%'
    OR p.email ILIKE '%@example.%'
    OR p.email ILIKE '%@test.%'
    OR p.email ILIKE '%fake%'
    OR p.email ILIKE '%seed%'
    OR p.full_name ILIKE '%demo%'
    OR p.full_name ILIKE '%test%'
    OR p.full_name ILIKE '%sample%'
  )
  AND p.email != 'ranvi.contact@gmail.com'
  AND p.email NOT ILIKE '%+%@gmail.com'
  AND p.stripe_customer_id IS NULL
  AND p.stripe_subscription_id IS NULL
  AND (p.subscription_status IS NULL OR p.subscription_status = '');

-- Confirm backup count before proceeding:
SELECT COUNT(*) AS backed_up_rows FROM public.deleted_demo_profiles_backup
WHERE delete_reason = 'demo-profile-cleanup-2026-07';

*/  -- ← end of Phase 2A block


-- =============================================================================
-- PHASE 2B — DELETE  (run only after Phase 2A backup is confirmed)
-- =============================================================================
-- Deletes ONLY from public.profiles — auth.users is NOT touched.
-- The WHERE clause is identical to Phase 1 and Phase 2A for consistency.

/*  ← Remove these comment delimiters to run Phase 2B

DELETE FROM public.profiles
WHERE id IN (
  SELECT p.id
  FROM public.profiles p
  WHERE
    (
      p.email ILIKE '%@mockmate-demo.invalid'
      OR p.email ILIKE '%demo%'
      OR p.email ILIKE '%@example.%'
      OR p.email ILIKE '%@test.%'
      OR p.email ILIKE '%fake%'
      OR p.email ILIKE '%seed%'
      OR p.full_name ILIKE '%demo%'
      OR p.full_name ILIKE '%test%'
      OR p.full_name ILIKE '%sample%'
    )
    AND p.email != 'ranvi.contact@gmail.com'
    AND p.email NOT ILIKE '%+%@gmail.com'
    AND p.stripe_customer_id IS NULL
    AND p.stripe_subscription_id IS NULL
    AND (p.subscription_status IS NULL OR p.subscription_status = '')
);

-- Verify delete count matches backup count:
SELECT
  (SELECT COUNT(*) FROM public.deleted_demo_profiles_backup
   WHERE delete_reason = 'demo-profile-cleanup-2026-07') AS backed_up,
  (SELECT COUNT(*) FROM public.profiles p
   WHERE p.email ILIKE '%@mockmate-demo.invalid'
      OR p.email ILIKE '%demo%') AS remaining_demo_profiles;

*/  -- ← end of Phase 2B block
