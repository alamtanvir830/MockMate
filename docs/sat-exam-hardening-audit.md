# SAT Exam Hardening — Phase 0 Audit Report

**Branch:** `feat/sat-exam-hardening`
**Date:** 2026-08-03
**Status:** Phase 0 complete. Phase 1+ blocked pending versioning decision.

---

## 1. Architecture Findings

### Content Storage
- All five SAT forms (Forms 1–5) are stored as TypeScript source files in `lib/premade-exams/sat/`.
- Form 1 uses root module files (`rw-module-1.ts`, `math-module-1.ts`, etc.).
- Forms 2–5 use form-prefixed files (`form-2-rw-module-1.ts`, etc.).
- Each form has 6 module files: R&W M1, R&W M2 easy, R&W M2 hard, Math M1, Math M2 easy, Math M2 hard.
- Total content: ~20,000 lines across 30 module files + 5 assembly files.

### Historical Attempt Storage Model
**⚠ CRITICAL — STOP CONDITION TRIGGERED**

Attempts are stored in TWO locations:

**1. Client-side localStorage** (`lib/premade-exams/sat/attempt-store.ts`):
- Key: `mockmate_premade_attempts_v1`
- Stores: `answers: Record<string, string>` (questionId → choiceLabel), raw correct counts, module types, AI feedback.
- Does NOT store question text, answer choice text, or correct answer content.

**2. Supabase** (`standardized_exam_attempts` + `standardized_exam_responses`):
- Stores: scores, correct counts, `submitted_answers`, per-question `correct_answer` and `is_correct` (baked in at submission time).
- Supabase data is NOT used by the results display — it is for admin reporting only.

### Results Page Behavior
The `SATExamTaker` component in **results/history-view mode**:
1. Loads stored `answers` from localStorage.
2. **Recomputes** `rwM1Correct = countCorrect(liveRwM1Module, answers)` from live question data.
3. Displays this recomputed score — NOT the stored counts.

**Consequence:** Changing `correctAnswer` for any question with an existing question ID will silently alter the displayed score for any user who previously completed that exam. A user who answered correctly will be shown as incorrect (or vice versa).

### Safe vs. Unsafe In-Place Changes

| Change Type | Historical Impact | Safe In-Place? |
|---|---|---|
| Passage/stimulus text only | None (if answer label unchanged) | ✅ Yes |
| Question stem wording only | None (if answer label unchanged) | ✅ Yes |
| Wrong-answer choice text (labels unchanged) | None | ✅ Yes |
| Difficulty / domain / skill metadata | None | ✅ Yes |
| Explanation text | None | ✅ Yes |
| graphData / tables | None | ✅ Yes |
| Change `correctAnswer` label (e.g. B → C) | Corrupts displayed score | ❌ No |
| Reorder choices (new label becomes correct) | Corrupts displayed score | ❌ No |
| Delete a question | Removes from score calculation | ❌ No |
| Change question ID | Breaks answer lookup | ❌ No |

---

## 2. Versioning Strategy Required

To safely allow `correctAnswer` changes and choice reordering, the following versioning approach is needed:

### Option A — Form Version Suffix (Minimal)
- Introduce `formVersion` field on each form assembly file.
- New attempts write `formVersion` into their localStorage record.
- Results page loads the module corresponding to the stored `formVersion`.
- Prior attempts (no `formVersion`) fall back to the original module files.

### Option B — Separate Module Files
- Create `form-3-math-module-2-hard-v2.ts` alongside the original.
- New attempts import from `v2`; old attempts import from `v1`.
- No migration needed; old IDs remain stable.

**Recommended: Option B** — zero migration risk, no database changes, simple rollout.

### Migration SQL (if database versioning is added)

```sql
-- ADDITIVE ONLY — adds form_version column to track content version per attempt
-- DO NOT APPLY until versioning strategy is approved

ALTER TABLE public.standardized_exam_attempts
  ADD COLUMN IF NOT EXISTS form_version integer NOT NULL DEFAULT 1;

ALTER TABLE public.standardized_exam_responses
  ADD COLUMN IF NOT EXISTS form_version integer NOT NULL DEFAULT 1;

-- Verification
SELECT form_version, count(*) FROM public.standardized_exam_attempts GROUP BY 1;

-- Rollback
ALTER TABLE public.standardized_exam_attempts DROP COLUMN IF EXISTS form_version;
ALTER TABLE public.standardized_exam_responses DROP COLUMN IF EXISTS form_version;
```

---

## 3. Changes Completed in Phase 0 / Phase 1

### Form 3 — Vieta Question Fix (SAFE — correctAnswer unchanged)

**File:** `lib/premade-exams/sat/form-3-math-module-2-hard.ts`
**Question ID:** `sat-f3-math-m2h-q07`

| Field | Before | After |
|---|---|---|
| Equation | 5x² − 30x + p = 0 | 5x² − 45x + p = 0 |
| Discriminant (with p=70) | −500 (no real roots ❌) | 625 (two real roots ✓) |
| Roots | None (complex) | x = 2, x = 7 |
| Product of roots | Undefined (complex) | 2 × 7 = 14 ✓ |
| `correctAnswer` | C (70) | C (70) — UNCHANGED |
| Wrong answer explanations | Unchanged | Unchanged |
| Explanation | Sum = 30/5 = 6 | Sum = 45/5 = 9; added factored verification |

**Validation:**
- `5(2)² − 45(2) + 70 = 20 − 90 + 70 = 0` ✓
- `5(7)² − 45(7) + 70 = 245 − 315 + 70 = 0` ✓
- Discriminant = `45² − 4·5·70 = 2025 − 1400 = 625 = 25²` ✓
- Historical attempts: zero impact (correctAnswer label C unchanged)

---

## 4. Baseline Inventory

### Question Counts (all forms confirmed)

| Form | R&W M1 | R&W M2-E | R&W M2-H | Math M1 | Math M2-E | Math M2-H | Total |
|---|---|---|---|---|---|---|---|
| Form 1 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 2 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 3 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 4 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |
| Form 5 | 27 | 27 | 27 | 22 | 22 | 22 | 147 |

Total unique questions across all paths: **735** (147 × 5 forms)

### Module File Sizes

| File | Lines |
|---|---|
| form-3-rw-module-1.ts | 758 |
| form-3-rw-module-2-easy.ts | 871 |
| form-3-rw-module-2-hard.ts | 675 |
| form-3-math-module-1.ts | 587 |
| form-3-math-module-2-easy.ts | 494 |
| form-3-math-module-2-hard.ts | 552 |

---

## 5. Blocked Items — Require Versioning Decision

The following feedback-driven changes require reordering answer choices or changing `correctAnswer`. They are blocked until the versioning strategy is approved:

| Issue | Forms Affected | Why Blocked |
|---|---|---|
| Answer distribution rebalancing (B/C concentration) | All, esp. Form 3 | Requires choice reordering → new correctAnswer labels |
| "Improve distractors" for questions where current correct answer would shift | All | Changing which choice is right changes correctAnswer |
| Hardening questions where the "easy" distractor is currently the correct answer | All | Label change required |
| Full Forms 4 & 5 rebuild with new question content | 4, 5 | New questions may reuse IDs ambiguously |

---

## 6. Timer Architecture

**Component:** `components/premade/SATExamTaker.tsx`

The timer uses:
- `setInterval` for the visible countdown
- A wall-clock `moduleDeadlineRef` (Unix timestamp) as authoritative time
- `visibilitychange` event to reconcile countdown after tab backgrounding
- Deadline stored in `inProgressAttempt.moduleDeadlineAt` and restored on page refresh

**Reported freeze (Form 3 timer stops at 13 min / 9 min):**
- The `setInterval` is cleared and `timerRunning` is set false in one code path at line 1032.
- Possible cause: a React re-render or state update that clears the interval without restarting it, triggered by a Desmos open/close or question navigation event.
- This requires live reproduction to diagnose precisely. The fix would be ensuring `timerRunning` is not set to `false` prematurely, and that the interval is restarted after any interrupting state change.
- **Status:** Architecture understood; live reproduction required for definitive fix.

---

## 7. Desmos / Calculator Architecture

**Component:** `components/exam/calculator/SatCalculatorPanel.tsx` (406 lines)

**Reported issues:**
- Table-to-graph conversion not working
- Calculator state not persisting across question navigation

**Status:** Calculator architecture located. Specific bugs require live testing with the Desmos API. These are in the exam player, not the content files, and are independent of the content versioning issue.

---

## 8. Baseline Test Results

```
22 test files, 555 tests — all passing before any changes
```

Test categories present:
- `__tests__/premium/` — entitlement tests
- `__tests__/sat-form3-global-window/` — Form 3 access window
- `__tests__/sat-results-access/` — results routing
- `__tests__/sat-trial/` — trial eligibility / entitlement
- `__tests__/security/` — AI quota, email privacy, form 4/5 entitlements
- `__tests__/stripe/` — webhook entitlement

**Missing test categories** (per task requirements):
- Content structure validation (question counts, domain coverage, answer uniqueness)
- Adaptive routing validation
- Math difficulty ordering (hard > routing > easy)
- Timer behavior
- Score computation regression

---

## 9. Recommended Next Steps

**Immediate (safe, no versioning needed):**
1. ✅ Vieta question fix (done)
2. Fix timer freeze — locate the `clearInterval` path triggered by Desmos/navigation
3. Fix notes formatting (verify bullet rendering in `StimulusRenderer`)
4. Fix any grammar items where answer leaks into the blank (safe stem edit)
5. Add content structure validation tests (question counts, domain coverage)

**Requires versioning decision first:**
6. Answer distribution rebalancing (all forms)
7. Distractor improvements that change which label is correct
8. Forms 1–3 surgical hardening (correctAnswer changes)
9. Forms 4–5 advanced rebuild

**Requires design approval:**
10. Versioning strategy (Option A or B above)
11. Scope and timeline for full content hardening

---

## 10. Change Log

| Phase | Item | Status | correctAnswer changed? | File |
|---|---|---|---|---|
| 0 | Architecture audit | ✅ Done | N/A | — |
| 1 | Form 3 Vieta fix | ✅ Done | No | form-3-math-module-2-hard.ts |
| 1 | Timer freeze | ⏸ Blocked (needs repro) | N/A | SATExamTaker.tsx |
| 1 | Desmos table-to-graph | ⏸ Blocked (needs repro) | N/A | SatCalculatorPanel.tsx |
| 2 | Forms 1–3 hardening | ⏸ Blocked (versioning) | Yes (many) | multiple |
| 3 | Forms 4–5 rebuild | ⏸ Blocked (versioning) | Yes (new content) | multiple |
| 4 | Answer distribution | ⏸ Blocked (versioning) | Yes | multiple |
| 5 | Full QA | ⏸ Not started | — | — |
