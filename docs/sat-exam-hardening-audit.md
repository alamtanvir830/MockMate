# SAT Exam Hardening — Full Audit Report

**Branch:** `feat/sat-exam-hardening`
**Date:** 2026-08-03
**Owner decision:** Option B approved — parallel immutable version files

---

## 1. Architecture Findings

### Content Storage
- All five SAT forms (Forms 1–5) are stored as TypeScript source files in `lib/premade-exams/sat/`.
- Form 1 uses root module files (`rw-module-1.ts`, `math-module-1.ts`, etc.).
- Forms 2–5 use form-prefixed files (`form-2-rw-module-1.ts`, etc.).
- Each form has 6 module files: R&W M1, R&W M2 easy, R&W M2 hard, Math M1, Math M2 easy, Math M2 hard.
- Total content: ~20,000 lines across 30 module files + 5 assembly files.

### Historical Attempt Storage Model
**⚠ CRITICAL — STOP CONDITION (now resolved by versioning)**

Attempts are stored in TWO locations:

**1. Client-side localStorage** (`lib/premade-exams/sat/attempt-store.ts`):
- Key: `mockmate_premade_attempts_v1`
- Stores: `answers: Record<string, string>` (questionId → choiceLabel), raw correct counts, module types, AI feedback, and now `contentVersion: 1 | 2`.
- On read: `normalizeSatContentVersion()` converts missing/null/invalid → V1 (backward-compatible default).

**2. Supabase** (`standardized_exam_attempts` + `standardized_exam_responses`):
- Stores: scores, correct counts, `submitted_answers`, per-question `correct_answer` and `is_correct` (baked in at submission time).
- `content_version` column now persisted (additive — migration required before deployment).
- Supabase data is NOT used by the results display — it is for admin reporting only.

### Results Page Behavior (FIXED)
Every Results client (`SATFormXResultsClient.tsx`) now:
1. Loads stored attempt from localStorage.
2. Calls `normalizeSatContentVersion(attempt.contentVersion)` → V1 for old attempts.
3. Calls `getSatForm(formNumber, version)` → resolves the correct immutable module set.
4. Passes the resolved form object to `SATExamTaker` as `form` prop.
5. `countCorrect(resolvedModule, storedAnswers)` uses the historically correct questions.

---

## 2. Versioning Architecture (Option B — Implemented)

### File Structure
```
lib/premade-exams/sat/
├── version-constants.ts          ← SAT_CONTENT_VERSION_V1/V2, CURRENT, normalizer
├── sat-form-resolver.ts          ← getSatForm(formNumber, version)
├── attempt-store.ts              ← PremadeAttempt.contentVersion added
│
├── form-1.ts (V1 assembly — frozen)
├── rw-module-1.ts (V1 — frozen)
├── form-3-math-module-2-hard.ts  ← V1 Vieta restored to original (5x²−30x+p=0)
├── ...30 V1 module files (all frozen)
│
└── v2/
    ├── form-1.ts (V2 assembly)
    ├── rw-module-1.ts (V2 — IDs: sat-f1-v2-rw-m1-qNN)
    ├── form-3-math-module-2-hard.ts (V2 Vieta: 5x²−45x+p=0, corrected)
    └── ...30 V2 module files
```

### Version Constants
```typescript
SAT_CONTENT_VERSION_V1 = 1
SAT_CONTENT_VERSION_V2 = 2
CURRENT_SAT_CONTENT_VERSION = 2   // controls new attempt creation only
```

### Attempt Field
```typescript
interface PremadeAttempt {
  // ...existing fields...
  contentVersion: 1 | 2   // normalized from storage; missing → 1
}
```

### Central Resolver
```typescript
getSatForm(formNumber: 1|2|3|4|5, contentVersion: SATContentVersion): SATForm
```
- `contentVersion = 1` → returns V1 frozen form object
- `contentVersion = 2` → returns V2 form object
- `undefined / null / invalid` → normalizes to V1 (never V2)

### Question ID Format
| Form | V1 Sample ID | V2 Sample ID |
|---|---|---|
| Form 1 RW M1 | `rw1-01` | `sat-f1-v2-rw-m1-q01` |
| Form 1 Math M2H | `m2h-01` | `sat-f1-v2-math-m2h-q01` |
| Form 2 RW M1 | `sat2-rw-m1-001` | `sat-f2-v2-rw-m1-q001` |
| Form 3 Math M2H | `sat-f3-math-m2h-q07` | `sat-f3-v2-math-m2h-q07` |
| Form 4 Math M2H | `sat-f4-math-m2h-q01` | `sat-f4-v2-math-m2h-q01` |
| Form 5 RW M2H | `sat-f5-rw-m2h-q01` | `sat-f5-v2-rw-m2h-q01` |

All V2 IDs contain `-v2-`. No V1 ID contains `-v2-`. No overlap between V1 and V2 IDs.

### Version Routing Rules
| Attempt state | Resolved version | Source |
|---|---|---|
| Existing attempt, no contentVersion field | 1 | normalizeSatContentVersion(undefined) |
| Existing attempt, contentVersion: 1 | 1 | stored field |
| New attempt, created after V2 launch | 2 | CURRENT_SAT_CONTENT_VERSION |
| Retake after V2 launch | 2 | CURRENT_SAT_CONTENT_VERSION |
| Resume in-progress (server-stored) | stored value | content_version column |
| Invalid / corrupted value | 1 (fail-safe) | normalizeSatContentVersion() |

---

## 3. Version 1 Freeze Status

V1 module files are **permanently frozen**. No content changes are permitted.

The only in-place V1 changes in this branch:
- `form-3-math-module-2-hard.ts`: Vieta question **restored** to original defective form:
  - V1: `5x² − 30x + p = 0` (discriminant = −500, no real roots — historical defect preserved)
  - V2: `5x² − 45x + p = 0` (discriminant = 625, roots x=2 and x=7 — corrected)

V1 immutability is tested by:
- `__tests__/sat-versioning/sat-content-versioning.test.ts` (55 tests)
- ID snapshot tests confirm V1 IDs never contain `-v2-`
- Content isolation test confirms V1 Vieta retains original equation
- Separate object reference tests confirm V1/V2 cannot mutate each other

---

## 4. Safe vs. Unsafe In-Place Changes (V2 now allowed)

| Change Type | V1 Safe? | V2 Safe? |
|---|---|---|
| Passage/stimulus text | ✅ Yes (V1 frozen) | ✅ Yes |
| Question stem wording | ✅ Yes (V1 frozen) | ✅ Yes |
| Wrong-answer choice text | ✅ Yes (V1 frozen) | ✅ Yes |
| Metadata/explanations | ✅ Yes (V1 frozen) | ✅ Yes |
| Change `correctAnswer` label | ❌ V1 must not change | ✅ Yes (V2 isolated) |
| Reorder choices | ❌ V1 must not change | ✅ Yes (V2 isolated) |
| Delete a question | ❌ Never | ❌ Would corrupt stored answers |
| Change question ID | ❌ Never | ❌ Would corrupt stored answers |

---

## 5. Vieta Question Fix

**File (V1):** `lib/premade-exams/sat/form-3-math-module-2-hard.ts`
**File (V2):** `lib/premade-exams/sat/v2/form-3-math-module-2-hard.ts`
**Question ID V1:** `sat-f3-math-m2h-q07`
**Question ID V2:** `sat-f3-v2-math-m2h-q07`

| Field | Version 1 (frozen, defective) | Version 2 (corrected) |
|---|---|---|
| Equation | 5x² − 30x + p = 0 | 5x² − 45x + p = 0 |
| Discriminant (with p=70) | −500 (no real roots ❌) | 625 (two real roots ✓) |
| Roots | None (complex) | x = 2, x = 7 |
| Product of roots | Undefined | 2 × 7 = 14 ✓ |
| `correctAnswer` | C (70) | C (70) — same label |
| Sum of roots in explanation | 30/5 = 6 | 45/5 = 9 |

**Validation (V2):**
- `5(2)² − 45(2) + 70 = 20 − 90 + 70 = 0` ✓
- `5(7)² − 45(7) + 70 = 245 − 315 + 70 = 0` ✓
- Discriminant = `45² − 4·5·70 = 2025 − 1400 = 625 = 25²` ✓

---

## 6. Baseline Inventory

### Question Counts (all forms confirmed)

| Form | R&W M1 | R&W M2-E | R&W M2-H | Math M1 | Math M2-E | Math M2-H | Total |
|---|---|---|---|---|---|---|---|
| Form 1 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 2 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 3 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 4 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 5 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |

V1 total: 735 unique questions. V2 total: 735 unique questions (different IDs).
Combined unique question IDs across V1+V2: 1,470 (zero overlap confirmed).

---

## 7. Server Persistence — Migration Required

### Required columns (not yet applied to production)

**`sat_in_progress_attempts` table:**
```sql
ALTER TABLE public.sat_in_progress_attempts
  ADD COLUMN IF NOT EXISTS content_version integer NOT NULL DEFAULT 1
  CHECK (content_version IN (1, 2));

COMMENT ON COLUMN public.sat_in_progress_attempts.content_version
  IS 'SAT content version assigned at attempt start. 1=original V1, 2=hardened V2. Missing rows default to 1.';
```

**`standardized_exam_attempts` table:**
```sql
ALTER TABLE public.standardized_exam_attempts
  ADD COLUMN IF NOT EXISTS content_version integer NOT NULL DEFAULT 1
  CHECK (content_version IN (1, 2));

COMMENT ON COLUMN public.standardized_exam_attempts.content_version
  IS 'SAT content version at submission. 1=original V1, 2=hardened V2. Historical rows default to 1.';
```

**Verification:**
```sql
SELECT content_version, count(*) FROM public.sat_in_progress_attempts GROUP BY 1;
SELECT content_version, count(*) FROM public.standardized_exam_attempts GROUP BY 1;
```

**Rollback:**
```sql
ALTER TABLE public.sat_in_progress_attempts DROP COLUMN IF EXISTS content_version;
ALTER TABLE public.standardized_exam_attempts DROP COLUMN IF EXISTS content_version;
```

**⚠ Migration application status: NOT APPLIED TO PRODUCTION**
The code handles missing columns gracefully via spread (`...(body.contentVersion !== undefined ? { content_version: body.contentVersion } : {})`). The migration must be reviewed and applied before merging to main.

---

## 8. Timer Architecture

**Component:** `components/premade/SATExamTaker.tsx`

The timer uses:
- `setInterval` for the visible countdown
- A wall-clock `moduleDeadlineRef` (Unix timestamp) as authoritative time
- `visibilitychange` event to reconcile countdown after tab backgrounding
- Deadline stored in `inProgressAttempt.moduleDeadlineAt` and restored on page refresh

**Reported freeze (Form 3 timer stops at 13 min / 9 min):**
- Architecture understood. The `setInterval` is cleared and `timerRunning` is set false at line ~1032.
- Possible cause: a React re-render triggered by Desmos open/close or question navigation.
- **Status:** Architecture understood; live reproduction required for definitive fix. No code change made.

---

## 9. Desmos / Calculator Architecture

**Component:** `components/exam/calculator/SatCalculatorPanel.tsx`

**Reported issues:**
- Table-to-graph conversion not working
- Calculator state not persisting across question navigation

**Status:** Architecture located. Bugs require live testing with the Desmos API. Independent of content versioning.

---

## 10. Baseline Test Results

```
22 test files, 555 tests — all passing (pre-hardening baseline)
+ 1 new test file, 55 tests — sat-versioning (all passing)
Total: 23 test files, 610 tests
```

---

## 11. Content Hardening Status (V2)

### Phase D — Forms 1-3 Surgical Hardening

| Module | Status | Approach |
|---|---|---|
| Form 1 RW M2H | In progress (agent) | Stronger distractors, denser passages |
| Form 1 Math M2H | In progress (agent) | Error-targeted distractors |
| Form 2 RW M2H | In progress (agent) | Stronger distractors |
| Form 2 Math M2H | In progress (agent) | Error-targeted distractors |
| Form 3 RW M2H | In progress (agent) | Stronger distractors |
| Form 3 Math M2H | In progress (agent) | Stronger distractors + Vieta fix already applied |

### Phase E — Forms 4-5 Advanced Rebuild

| Module | Status | Approach |
|---|---|---|
| Form 4 RW M2H | In progress (agent) | LSAT-inspired dense passages, deeper reasoning |
| Form 4 Math M2H | In progress (agent) | Multi-step problems |
| Form 5 RW M2H | In progress (agent) | LSAT-inspired qualified claims |
| Form 5 Math M2H | In progress (agent) | Complex applied problems |

### All M1 Routing Modules

| Form | Status |
|---|---|
| Forms 1-3 RW M1 + Math M1 | In progress (agent) |
| Forms 4-5 RW M1 + Math M1 | In progress (agent) |

### All Easy M2 Modules

| Form | Status |
|---|---|
| Forms 1-5 RW M2E + Math M2E | In progress (agent) |

---

## 12. Change Log

| Phase | Item | Status | correctAnswer changed? | File |
|---|---|---|---|---|
| 0 | Architecture audit | ✅ Done | N/A | — |
| A | Version constants | ✅ Done | N/A | version-constants.ts |
| A | Attempt schema (contentVersion) | ✅ Done | N/A | attempt-store.ts |
| A | Central resolver | ✅ Done | N/A | sat-form-resolver.ts |
| A | SATExamTaker version prop | ✅ Done | N/A | SATExamTaker.tsx |
| A | Results clients (5 forms) | ✅ Done | N/A | SATFormXResultsClient.tsx |
| A | Exam taker clients (5 forms) | ✅ Done | N/A | SATExamTakerClient.tsx |
| A | In-progress API (contentVersion) | ✅ Done | N/A | in-progress/route.ts |
| A | Save-attempt API (contentVersion) | ✅ Done | N/A | save-attempt/route.ts |
| A | Versioning tests (55 tests) | ✅ Done | N/A | sat-content-versioning.test.ts |
| B | V2 baseline — 30 module files | ✅ Done | No (ID rename only) | v2/*.ts |
| B | V2 assembly files (5 forms) | ✅ Done | N/A | v2/form-N.ts |
| C | V1 Vieta restored (defect preserved) | ✅ Done | No | form-3-math-module-2-hard.ts |
| C | V2 Vieta corrected | ✅ Done | No | v2/form-3-math-module-2-hard.ts |
| D | Forms 1-3 hard modules | ⏳ In progress | Yes (V2 only) | v2/*-module-2-hard.ts |
| D | Forms 1-3 M1 routing | ⏳ In progress | No | v2/*-module-1.ts |
| D | Forms 1-5 easy M2 | ⏳ In progress | No | v2/*-module-2-easy.ts |
| E | Forms 4-5 hard modules (LSAT depth) | ⏳ In progress | Yes (V2 only) | v2/form-4/5-*-hard.ts |
| F | Timer freeze | ⏸ Blocked (needs live repro) | N/A | SATExamTaker.tsx |
| F | Desmos table-to-graph | ⏸ Blocked (needs live repro) | N/A | SatCalculatorPanel.tsx |
| F | Final calibration | ⏳ Pending D/E completion | — | — |

---

## 13. Database Migration — Required Before Deployment

The `content_version` column must be added to two tables before the branch is merged and deployed.
The migration is additive: existing rows receive DEFAULT 1 (V1), which is historically correct.

**Migration must be reviewed and applied by the owner before deployment.**

Migration status: **NOT APPLIED. Provided in Section 7 of this document.**

---

## 14. Recommended Manual Review Steps

1. **Apply migration** (Section 7) to staging before merging — verify DEFAULT=1 on existing rows.
2. **Test V1 attempt backward compat** — take an exam on main, commit the localStorage attempt, switch to this branch, confirm results show the same score.
3. **Test V2 new attempt** — start a new exam on this branch, verify contentVersion=2 is persisted.
4. **Test cross-session resume** — start Form 3, close browser, reopen — verify same version resumes.
5. **Confirm timer freeze** — reproduce reported freeze at 13/9 min mark in Form 3 and file separate fix.
6. **Confirm Desmos table-to-graph** — live test in Math modules using Desmos API.
7. **Review V2 hardened content** — spot-check 5-10 questions per form for quality and accuracy.
