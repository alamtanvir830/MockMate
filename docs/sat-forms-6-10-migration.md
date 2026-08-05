# SAT Forms 6–10 Database Migration

## Summary

**No SQL migration is required** to support SAT Practice Forms 6–10.

After inspecting all Supabase migrations, no database-level CHECK constraints restrict
`form_number` to the range 1–5. All application-layer range checks have been updated
in the code.

---

## Why No Migration Is Needed

### Tables inspected:

**`standardized_exam_attempts`** (migration `20260701_*`):
- `form_number int NOT NULL` — no CHECK constraint on range

**`standardized_exam_responses`** (migration `20260701_*`):
- `form_number int NOT NULL` — no CHECK constraint on range

**`sat_in_progress_attempts`** (migration `20260722_*`):
- `form_number int NOT NULL`
- `UNIQUE (user_id, form_number)` — one in-progress row per user per form; supports any integer

**`sat_exam_module_feedback`** (migration `20260712_*`):
- `form_number integer not null` — no CHECK constraint
- The range check `[1, 2, 3, 4, 5]` was only in the API route (now updated to include 6–10)

**`sat_form3_promotion`** (migration `20260801_*`):
- `form_number CHECK (form_number = 3)` — Form 3 specific; not relevant to new forms

**`sat_free_exam_access`** (migration `20260721_*`):
- `free_form_number INTEGER NOT NULL DEFAULT 2` — Form 2 specific; not relevant

**`sat_form_1_access`** (migration `20260718_*`):
- No form_number column; Form 1 specific

No enum types constrain form numbers anywhere in the schema.

---

## Pre-Migration Verification SQL

Run this to confirm no hidden form-number constraints exist before deploying:

```sql
-- Check all constraints on the four relevant tables
SELECT
  n.nspname AS schema,
  c.relname AS table_name,
  con.conname AS constraint_name,
  con.contype AS constraint_type,
  pg_get_constraintdef(con.oid) AS constraint_def
FROM pg_constraint con
JOIN pg_class c ON c.oid = con.conrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname IN (
  'standardized_exam_attempts',
  'standardized_exam_responses',
  'sat_in_progress_attempts',
  'sat_exam_module_feedback'
)
AND con.contype IN ('c', 'u', 'p')  -- check, unique, primary key
ORDER BY c.relname, con.conname;

-- Also verify a form_number of 6 is accepted by attempting to explain an insert:
-- (Do NOT run as a real insert in production — this is a structure check only)
SELECT column_name, data_type, character_maximum_length, column_default, is_nullable
FROM information_schema.columns
WHERE table_name IN (
  'standardized_exam_attempts',
  'standardized_exam_responses',
  'sat_in_progress_attempts',
  'sat_exam_module_feedback'
)
AND column_name = 'form_number'
ORDER BY table_name;
```

Expected result: no CHECK constraints on form_number, data_type = `integer` for all four tables.

---

## Post-Deployment Verification SQL

After deploying the code update, verify that new attempts for Forms 6–10 can be created:

```sql
-- After a test attempt has been created (in a staging environment):
SELECT form_number, COUNT(*) as attempt_count
FROM standardized_exam_attempts
WHERE exam_type = 'SAT'
GROUP BY form_number
ORDER BY form_number;

-- Expected: rows for form_number 1-10 as users take exams

-- Verify in-progress rows work for new forms:
SELECT form_number, COUNT(*) as in_progress_count
FROM sat_in_progress_attempts
GROUP BY form_number
ORDER BY form_number;

-- Verify feedback accepts new form numbers:
SELECT form_number, COUNT(*) as feedback_count
FROM sat_exam_module_feedback
GROUP BY form_number
ORDER BY form_number;
```

---

## Rollback

If rollback is needed after code deployment:
1. Revert the code changes (git revert the commit)
2. No database rollback is needed — no schema was changed
3. Any attempts created for Forms 6–10 during the window will remain in the database
   but will become inaccessible via the application (404 or resolver error)
4. To remove test data: `DELETE FROM standardized_exam_attempts WHERE form_number > 5;`
   (only if needed; do not run without review)

---

## Deployment Ordering

1. Owner reviews this document and confirms: ✓
2. **Deploy code** (GitHub push → Vercel deployment)
3. Verify new form routes resolve (smoke test)
4. Verify Premium gate blocks free users for Forms 6–10
5. Verify form content loads correctly for Premium users
6. No database migration step required

---

## Production Migration Applied: NO

The production database does not need any schema change for Forms 6–10.

---

## Notes on `content_version` Column

The `sat_in_progress_attempts.content_version` column was added in a previous migration
and allows NULL (defaults to 1 via application-layer normalization). New Forms 6–10
attempts will write `content_version = 2` (the current `CURRENT_SAT_CONTENT_VERSION`).
No schema change needed.

The `standardized_exam_attempts.content_version` column was similarly added previously.
No change needed.
