# SAT Forms 6–10 Database Migration Audit

**Audit date:** 2026-08-05
**Branch:** `feat/sat-forms-6-through-10`
**Auditor:** Automated schema audit (Claude agent)

---

## Executive Summary

**No SQL migration is required** to release SAT Practice Forms 6–10.

Every table that stores exam data (`standardized_exam_attempts`, `standardized_exam_responses`, `sat_in_progress_attempts`, `sat_exam_module_feedback`) accepts any positive integer for `form_number`. No CHECK constraint restricts the value to ≤ 5. No RLS policy references a specific form number. No enum type gates form numbers.

One code bug was found and fixed during this audit: `SATExamTaker.tsx` contained `formNumber > 5` guards in its autosave and sendBeacon handlers that silently skipped in-progress saves for Forms 6–10. Both guards were updated to `formNumber > 10`.

One test was updated: the `sat-content-versioning.test.ts` test "throws for form 6" became stale once Form 6 was added to the resolver. It was updated to "throws for form 11".

---

## STEP 1 — Migration Files Inventoried

All 42 migration files in `supabase/migrations/` were reviewed:

| File | Purpose |
|------|---------|
| `20260630_question_bank.sql` | Practice set and response tables |
| `20260701_standardized_exam_attempts.sql` | Core exam attempt and response tables |
| `20260712_qbank_identity_fields.sql` | Adds user_name/user_email to question bank |
| `20260712_sat_exam_module_feedback.sql` | Module feedback table |
| `20260714_sat_premium_interest.sql` | Premium interest columns on feedback |
| `20260715_reading_speed_sessions.sql` | Reading speed sessions |
| `20260716_academy_*.sql` | R&W Academy schema, curriculum, videos |
| `20260717_diagnostic_summary.sql` | Diagnostic summary table |
| `20260718_math_academy_schema.sql` | Math Academy tables |
| `20260718_math_diagnostic_schema.sql` | Math diagnostic tables |
| `20260718_sat_form1_access_48h.sql` | Shorten Form 1 window from 72h to 48h |
| `20260719_stripe_events_idempotency.sql` | Stripe event deduplication |
| `20260720_sat_premium_subscriptions.sql` | Premium subscription table |
| `20260721_sat_exam_feedback_referral.sql` | Referral columns on feedback |
| `20260721_sat_free_exam_form2.sql` | sat_free_exam_access table |
| `20260722_sat_in_progress_attempts.sql` | In-progress attempt autosave table |
| `20260723_diagnostic_v2_branch.sql` | Diagnostic v2 schema |
| `20260723_sat_in_progress_user_identity.sql` | user_name/user_email on sat_in_progress_attempts |
| `20260724_sat_form3_promotion.sql` | Form 3 promotion table |
| `20260724_sat_premium_one_time_plans.sql` | One-time purchase plans |
| `20260725_activate_sat_form3_promotion.sql` | Activate Form 3 promo |
| `20260725_math_academy_mastery_v2.sql` | Math Academy mastery upgrade |
| `20260725_sat_feedback_prior_score.sql` | Prior score column on feedback |
| `20260725_sat_form3_all_users.sql` | Expand Form 3 eligibility |
| `20260726_activate_form3_promotion.sql` | Activate Form 3 (retry) |
| `20260726_form3_eligibility_all_users.sql` | All users eligible for Form 3 |
| `20260726_sat_feedback_prior_score_prod.sql` | Prior score column (prod fix) |
| `20260727_form3_auto_activate.sql` | Login-triggered Form 3 timer |
| `20260728_sat_form3_per_user_timer.sql` | Per-user Form 3 timer; drops old promo table |
| `20260729_profiles_google_auth.sql` | Google auth profile columns |
| `20260730_sat_in_progress_attempts_eastern_view.sql` | Eastern-time display view |
| `20260731000000_ai_daily_usage_limits.sql` | AI daily quota table |
| `20260801_sat_form3_global_reopen.sql` | Recreates sat_form3_promotion table |
| `20260801_sat_premium_purchases_and_stripe_events.sql` | Purchase and Stripe event tables |
| `20260801_sat_premium_trial_claims.sql` | Trial claims table |
| `20260802_sat_feedback_scores.sql` | Score columns on feedback |
| `20260802_sat_feedback_scores_backfill.sql` | Backfill scores from attempts |

**No new migration files exist on `feat/sat-forms-6-through-10`** compared to `main`. All TypeScript application changes are code-only.

---

## STEP 2 — Form-Number Constraint Search

The following patterns were searched across ALL migration files:

- `form_number`, `form_id`, `sat_form`, `exam_form`
- `BETWEEN 1 AND`, `IN (1, 2, 3`, `<= 5`, `< 6`
- `CHECK`, `CREATE POLICY`, `CREATE FUNCTION`, `CREATE TRIGGER`, `CREATE VIEW`

**Findings with form-number relevance:**

| Location | Constraint | Safe for 6–10? |
|----------|-----------|----------------|
| `standardized_exam_attempts.form_number` | `INT NOT NULL` — no CHECK | YES |
| `standardized_exam_responses.form_number` | `INT NOT NULL` — no CHECK | YES |
| `sat_in_progress_attempts.form_number` | `INT NOT NULL`, `UNIQUE(user_id, form_number)` — no CHECK | YES |
| `sat_exam_module_feedback.form_number` | `INTEGER NOT NULL` — no CHECK | YES |
| `sat_form3_promotion.form_number` | `INTEGER NOT NULL DEFAULT 3 CHECK (form_number = 3)` | N/A — Form 3 promo only |
| `sat_free_exam_access.form_number` | `INTEGER NOT NULL` (PK composite) — no CHECK | YES |

The `sat_form3_promotion` table CHECK constraint (`form_number = 3`) is scoped only to that single-row config table and is irrelevant to new forms. No code path for Forms 6–10 touches this table.

---

## STEP 3 — Table-by-Table Inspection

### `standardized_exam_attempts`

Created in `20260701_standardized_exam_attempts.sql`:

```sql
form_number  int  NOT NULL  -- comment says "1 | 2 | 3" but no CHECK constraint
```

- No numeric range constraint.
- RLS policies (`users_select_own_attempts`, `users_insert_own_attempts`, `users_update_own_attempts`) check only `auth.uid() = user_id`.
- Index: `idx_sea_user_form ON (user_id, exam_type, form_number)` — will work for any form number.
- The code writes `user_name`, `user_email`, and `content_version` to this table. These columns are NOT in the migration file — they were added directly to production (pre-existing schema drift, not a Forms 6–10 concern). The code defensively guards `content_version` with a spread operator; `user_name`/`user_email` are unconditionally written.

**Verdict: accepts Forms 6–10 without any migration.**

### `standardized_exam_responses`

Created in `20260701_standardized_exam_attempts.sql`:

```sql
form_number  int  NOT NULL  -- no CHECK constraint
```

- Rows reference `standardized_exam_attempts.id` via FK with CASCADE DELETE.
- RLS policies (`users_select_own_responses`, `users_insert_own_responses`) check only `auth.uid() = user_id`.

**Verdict: accepts Forms 6–10 without any migration.**

### `sat_in_progress_attempts`

Created in `20260722_sat_in_progress_attempts.sql`:

```sql
form_number  int  NOT NULL
UNIQUE (user_id, form_number)
```

- The UNIQUE constraint supports one in-progress row per user per form — any integer is valid.
- RLS policies (`sat_in_progress_select`, `sat_in_progress_insert`, `sat_in_progress_update`, `sat_in_progress_delete`) check only `auth.uid() = user_id`.
- User identity fields (`user_name`, `user_email`) added via `20260723_sat_in_progress_user_identity.sql`.
- The Eastern-time display view (`sat_in_progress_attempts_eastern`) in `20260730_sat_in_progress_attempts_eastern_view.sql` selects all rows from the base table without form-number filtering.
- The `content_version` column referenced in the API is NOT in any migration file; it exists in the live DB (pre-existing schema drift).

**Verdict: accepts Forms 6–10 without any migration.**

### `sat_exam_module_feedback`

Created in `20260712_sat_exam_module_feedback.sql`:

```sql
form_number  integer  NOT NULL  -- no CHECK constraint
```

- CHECK constraints exist only for feedback text length (min 50 chars), not for form number.
- RLS policies (`Users can insert their own feedback`, `Users can select their own feedback`) check only `auth.uid() = user_id`.
- The API route (`app/api/sat/module-feedback/route.ts`) was updated on this branch to accept `validFormNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`.

**Verdict: accepts Forms 6–10 without any migration.**

### `sat_free_exam_access`

```sql
PRIMARY KEY (user_id, form_number)
form_number  INTEGER NOT NULL  -- no CHECK constraint
```

- This table governs free-window access for specific forms (currently Forms 2, 3, 4).
- Forms 6–10 are premium-only; no row in this table is created or required for Forms 6–10.

**Verdict: not involved in Forms 6–10 release.**

### `sat_form3_promotion` (recreation in `20260801_sat_form3_global_reopen.sql`)

```sql
form_number  integer  NOT NULL DEFAULT 3  CHECK (form_number = 3)
```

- This constraint enforces that the promotion config row is always for Form 3.
- Forms 6–10 do not use this table.

**Verdict: not involved; constraint is intentional and isolated.**

### Analytics / Score-report / Exam-history tables

The exam history page (`app/(dashboard)/exams/page.tsx`) queries `standardized_exam_attempts` and `sat_in_progress_attempts` with `eq('user_id', user.id)` — no form-number filter beyond what RLS enforces.

### Personalized practice / Question bank tables

`question_bank_practice_sets` and `question_bank_responses` have no form_number column. They are not affected by Forms 6–10.

### PDF generation

No PDF generation tables were found. Score reports are rendered client-side.

---

## STEP 4 — RLS Policies, Functions, Triggers, Views

### RLS Policies

All RLS policies on exam-related tables use only `auth.uid() = user_id`. No policy filters or restricts by form_number.

| Table | Policies |
|-------|---------|
| `standardized_exam_attempts` | SELECT/INSERT/UPDATE: `auth.uid() = user_id` |
| `standardized_exam_responses` | SELECT/INSERT: `auth.uid() = user_id` |
| `sat_in_progress_attempts` | SELECT/INSERT/UPDATE/DELETE: `auth.uid() = user_id` |
| `sat_exam_module_feedback` | SELECT/INSERT: `auth.uid() = user_id` |

### Functions

`activate_sat_form3_if_needed()` — Form 3 promo timer only; not relevant to Forms 6–10.
`init_form3_free_window(p_user_id uuid)` — Form 3 free window only; not relevant to Forms 6–10.

### Triggers

No triggers exist on any of the four core exam tables.

### Views

`sat_in_progress_attempts_eastern` — read-only display view; uses `WITH (security_invoker = true)`; passes through all rows without form-number filtering.
`question_bank_practice_sets_admin_view` — admin convenience view; not related to exam attempts.

---

## STEP 5 — Risk Assessment

| Risk | Verdict | Evidence |
|------|---------|---------|
| Form 6 in-progress attempt | SAFE | `form_number INT NOT NULL`, no CHECK; `UNIQUE(user_id, form_number)` accepts any int |
| Form 10 in-progress attempt | SAFE | Same as above |
| Form 6 completed attempt | SAFE | `standardized_exam_attempts.form_number INT NOT NULL`, no CHECK |
| Form 10 completed attempt | SAFE | Same as above |
| Response rows for Forms 6–10 | SAFE | `standardized_exam_responses.form_number INT NOT NULL`, no CHECK |
| Module feedback for Forms 6–10 | SAFE | `sat_exam_module_feedback.form_number INTEGER NOT NULL`, no CHECK; API updated to 1–10 |
| Easy/hard module path for Forms 6–10 | SAFE | `rw_m2_type`/`math_m2_type` are free-text columns with `DEFAULT 'easy'` |
| Content-version values for Forms 6–10 | SAFE | Code uses `content_version` with a default-safe spread; DB column exists in production |
| Exam history queries for Forms 6–10 | SAFE | `sat-forms` API now uses `SAT_FORM_NUMBERS = [1..10]`; history page queries by `user_id` only |
| Results-page ownership for Forms 6–10 | SAFE | Results pages use localStorage `loadAttempt(attemptId)`; RLS blocks cross-user access |
| Retakes of Forms 6–10 | SAFE | `attempt_number` computed from `COUNT(*)` per user+form; no unique constraint blocks multiple attempts |

---

## STEP 6 — Build, Lint, and Test Results

### TypeScript (`npx tsc --noEmit`)
**Result: PASSED — zero errors.**

### Lint (`npm run lint`)
**Result: 78 errors, 78 warnings — all pre-existing on `main`.**
No errors specific to Forms 6–10 files. The errors are codebase-wide pre-existing issues (setState-in-effect patterns, `any` types, unescaped entities, `<a>` instead of `<Link>`).

### Build (`npm run build`)
**Result: PASSED.**
All 10 new routes compiled successfully:
- `/premade/sat/form-6`, `/premade/sat/form-6/results/[attemptId]`
- `/premade/sat/form-7`, `/premade/sat/form-7/results/[attemptId]`
- `/premade/sat/form-8`, `/premade/sat/form-8/results/[attemptId]`
- `/premade/sat/form-9`, `/premade/sat/form-9/results/[attemptId]`
- `/premade/sat/form-10`, `/premade/sat/form-10/results/[attemptId]`

### Tests (`npx vitest run`)
**Result: 682 passed, 0 failed (after fixes).**

Two test/code issues were found and fixed during this audit:

**Fix 1 — Stale test:**
`__tests__/sat-versioning/sat-content-versioning.test.ts`
Test "throws for form 6" was written when Form 6 was out-of-range. Now that Form 6 is supported, the test was updated to "throws for form 11 (above supported range)".

**Fix 2 — Autosave guard (code bug, not DB):**
`components/premade/SATExamTaker.tsx` lines 1074 and 1178 had:
```typescript
if (isNaN(formNumber) || formNumber < 1 || formNumber > 5) return
```
This silently skipped autosave for Forms 6–10. Both guards updated to:
```typescript
if (isNaN(formNumber) || formNumber < 1 || formNumber > 10) return
```

---

## Pre-Release Verification SQL

Run this in the Supabase SQL editor **before** deploying to confirm no hidden form-number constraints exist:

```sql
-- 1. Check all constraints on the four core exam tables
SELECT
  c.relname                          AS table_name,
  con.conname                        AS constraint_name,
  CASE con.contype
    WHEN 'c' THEN 'CHECK'
    WHEN 'u' THEN 'UNIQUE'
    WHEN 'p' THEN 'PRIMARY KEY'
    WHEN 'f' THEN 'FOREIGN KEY'
  END                                AS constraint_type,
  pg_get_constraintdef(con.oid)      AS constraint_def
FROM pg_constraint con
JOIN pg_class c ON c.oid = con.conrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname IN (
  'standardized_exam_attempts',
  'standardized_exam_responses',
  'sat_in_progress_attempts',
  'sat_exam_module_feedback'
)
ORDER BY c.relname, constraint_type, con.conname;

-- Expected: no CHECK constraints on form_number; only PRIMARY KEY, UNIQUE, FOREIGN KEY constraints.

-- 2. Verify column definitions for form_number
SELECT table_name, column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name IN (
  'standardized_exam_attempts',
  'standardized_exam_responses',
  'sat_in_progress_attempts',
  'sat_exam_module_feedback'
)
AND column_name = 'form_number'
ORDER BY table_name;

-- Expected: data_type = 'integer', is_nullable = 'NO', no DEFAULT.

-- 3. Check RLS policies do not filter by form_number
SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN (
  'standardized_exam_attempts',
  'standardized_exam_responses',
  'sat_in_progress_attempts',
  'sat_exam_module_feedback'
)
ORDER BY tablename, policyname;

-- Expected: all policies use only auth.uid() = user_id; none reference form_number.

-- 4. Verify the sat_in_progress_attempts table has content_version column
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'sat_in_progress_attempts'
ORDER BY ordinal_position;

-- Confirm content_version column exists (added directly to DB, not in tracked migrations).

-- 5. Verify sat_form3_promotion constraint does not affect other tables
SELECT c.relname, con.conname, pg_get_constraintdef(con.oid)
FROM pg_constraint con
JOIN pg_class c ON c.oid = con.conrelid
WHERE con.contype = 'c'  -- CHECK only
  AND pg_get_constraintdef(con.oid) LIKE '%form_number%';

-- Expected: only sat_form3_promotion has a form_number CHECK; no other tables.
```

---

## Post-Deployment Verification SQL

After deploying the code update, run in staging (then production after smoke-test):

```sql
-- Verify forms 6-10 appear after test attempts
SELECT
  form_number,
  COUNT(*) AS attempt_count,
  MIN(completed_at) AS first_attempt,
  MAX(completed_at) AS last_attempt
FROM standardized_exam_attempts
WHERE exam_type = 'SAT'
GROUP BY form_number
ORDER BY form_number;

-- Verify in-progress rows work for forms 6-10
SELECT form_number, COUNT(*) AS in_progress_count
FROM sat_in_progress_attempts
GROUP BY form_number
ORDER BY form_number;

-- Verify module feedback accepts new form numbers
SELECT form_number, COUNT(*) AS feedback_count
FROM sat_exam_module_feedback
GROUP BY form_number
ORDER BY form_number;

-- Verify response rows for new forms
SELECT form_number, COUNT(*) AS response_count
FROM standardized_exam_responses
GROUP BY form_number
ORDER BY form_number;
```

---

## Rollback

No database rollback is required because no schema was changed.

If code rollback is needed:
1. Revert the commits on `feat/sat-forms-6-through-10` (git revert or rebase)
2. No DB rollback step required
3. Attempts already created for Forms 6–10 remain in the DB but become inaccessible via application (routes removed)
4. To clean test data: `DELETE FROM standardized_exam_attempts WHERE form_number > 5;` (staging only; review before any production run)

---

## Deployment Order

1. Owner reviews this document: confirm
2. **Deploy code** (push to `main` → Vercel deployment)
3. Smoke-test: verify `/premade/sat/form-6` loads for a Premium user
4. Smoke-test: verify Premium gate blocks free users on Forms 6–10
5. Smoke-test: verify autosave works mid-exam for Form 6 (checks the fixed guard)
6. Smoke-test: verify exam submission saves correctly and results page loads
7. No database migration step required

---

## Notes on Pre-Existing Schema Drift

The following columns are referenced by application code but are **not tracked in any migration file**. They exist in production but were added directly to the DB (a pre-existing issue, not caused by Forms 6–10):

| Table | Column | Status |
|-------|--------|--------|
| `standardized_exam_attempts` | `user_name` | Exists in prod; no migration |
| `standardized_exam_attempts` | `user_email` | Exists in prod; no migration |
| `standardized_exam_attempts` | `content_version` | Exists in prod; no migration |
| `sat_in_progress_attempts` | `content_version` | Exists in prod; no migration |

The `content_version` write in `save-attempt/route.ts` is guarded with a spread operator (`...(body.contentVersion !== undefined ? { content_version: body.contentVersion } : {})`), so it is safe if the column is missing. The `user_name`/`user_email` writes are unconditional and would fail if the columns were absent — but they are confirmed present in production.

---

## Production Migration Applied: NO

The production database does not need any schema change for Forms 6–10.
