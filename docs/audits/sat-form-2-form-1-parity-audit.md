# SAT Form 2 — Form 1 Parity Audit

This document tracks every known Form 1 fix against Form 2 to determine whether Form 2
inherited the same fixes. Form 2's question files were last edited in commit `d237554`
(Jul 20, 13:xx), which predates the Form 1 content audit `092b3cf` (Jul 20, 23:xx), so
Form 2 did **not** automatically receive those fixes.

## Form 1 commits reviewed

| Commit | Title | Relevant to Form 2? |
| --- | --- | --- |
| `092b3cf` | Audit Form 1 Desmos + add authentic parameter questions | YES (primary) |
| `668a568` | SAT realism: difficulty calibration, grammar quality, UI copy | Partial (R&W grammar) |
| `52c7f03` | Increase Form 1 math difficulty | Reference only |
| `4d6541c` | Rebalance SAT question-type sequencing (touched Form 2 files) | Already applied to Form 2 |
| `8bc51a9` | Score-weighted SAT feedback fixes | Reference only |

---

## Issue 1 — Parameter questions missing explicit Desmos slider method

- **Form 1 problem:** Parameter/constant questions (find `k`, `b`, `a`, `m`) had algebraic-only
  explanations with no guidance on solving via the Desmos calculator that the exam ships with.
- **Form 1 fix (`092b3cf`):** Added a "Desmos method:" paragraph to m1-09, m1-13, m2e-08,
  m2h-01, m2h-13 explaining the slider/tangent/x-intercept approach.
- **Does Form 2 have the same issue?** YES. Form 2 had **zero** "Desmos method" strings across
  all three math modules.
- **What was found in Form 2:** Genuine, Desmos-efficient parameter questions with algebra-only
  explanations:
  - `sat2-math-m1-h01` — system with no solution, find k
  - `sat2-math-m1-h04` — vertex-form parabola, find a
  - `sat2-math-m1-h05` — one real solution (discriminant), find k
  - `sat2-math-m2e-m07` — infinitely many solutions, find k
  - `sat2-math-m2h-m04` — horizontal tangent to a circle, find k
  - `sat2-math-m2h-h04` — two-parameter quadratic f(x)=x²+bx+c, find f(0)
- **Correction:** Added an explicit "Desmos method:" paragraph to all six explanations, matching
  the Form 1 format (enter equation, add slider(s), adjust until the geometric condition is met,
  read the value).
- **Status:** FIXED (6 Desmos methods added).

## Issue 2 — Trivial "parameter" questions labeled Medium/Hard

- **Form 1 problem:** m2e-18 asked for `k` in `(x+3)(x−3)=x²+kx−9` → `k=0` by inspection; too easy
  for its slot.
- **Form 1 fix (`092b3cf`):** Replaced with an exponential parameter question `g(x)=k·2^x`
  through `(3,24)` → `k=3`.
- **Does Form 2 have the same issue?** NO exact analog. The closest was `sat2-math-m1-m09`
  (find b in `p(x)=x²+bx−1`, where `p(3)=8` yields `b=0`), but that question is not a
  "find the parameter" answer — it asks for `3·p(−2)=9`, so the trivial `b=0` is only an
  intermediate step, and the question is correctly labeled Medium in Module 1. No replacement
  needed.
- **Status:** ALREADY_CORRECT / N/A.

## Issue 3 — Duplicate rational-simplification question

- **Form 1 problem:** m2h-11 duplicated an existing rational-simplification pattern.
- **Form 1 fix (`092b3cf`):** Replaced with a two-parameter vertex question.
- **Does Form 2 have the same issue?** NO. Form 2 M2H contains a single rational/inverse-function
  question (`sat2-math-m2h-h11`, find f⁻¹) and no duplicated rational-simplification stem within
  the form. Verified stems across M1/M2E/M2H are distinct.
- **Status:** ALREADY_CORRECT / N/A.

## Issue 4 — Answer-key / explanation mismatches

- **Form 1 problem:** Explanations that named the wrong option letter or contradicted the key.
- **Does Form 2 have the same issue?** YES — three R&W explanations cited the wrong choice letter
  (the answer key itself was correct; only the prose was wrong):
  - `sat2-rw-m1-018` — answer D, explanation said "Choice B acknowledges…"
  - `sat2-rw-m2e-022` — answer D, explanation said "Choice A uses a comma…" (and referenced "A"
    twice more)
  - `sat2-rw-m2h-009` — answer D, explanation said "Choice B accurately synthesizes…"
- **Correction:** Rewrote each explanation to reference the correct letter (D). No answer keys
  changed — all Form 2 math and R&W keys were independently verified correct.
- **Status:** FIXED (3 explanation corrections).

## Issue 5 — R&W questions with two defensible answers

- **Form 1 problem (`668a568`):** rw2h-25 had an ambiguous comma-before-"since" construction;
  replaced with an unambiguous semicolon/conjunctive-adverb item.
- **Does Form 2 have the same issue?** YES — `sat2-rw-m2e-023` used an "All of the above are
  grammatically correct" (choice D) format. Choices A, B, and C are each individually a valid
  comma-splice fix, so three options are defensible; the format is also not authentic SAT.
- **Correction:** Rewrote as a standard single-answer Boundaries item (blank + four punctuation
  options) where only ", and" (choice A) correctly joins the two independent clauses and each
  distractor contains a specific, identifiable error. Same stimulus topic, id, difficulty, and
  skill.
- **Status:** FIXED (1 R&W item rewritten).

## Issue 6 — R&W passage does not support the answer

- **Does Form 2 have the same issue?** NO. Every evidence/inference/central-idea item was checked
  against its stimulus; the keyed answer is supported by explicit passage text in all cases.
- **Status:** ALREADY_CORRECT.

## Issue 7 — Difficulty mislabels

- **Does Form 2 have the same issue?** NO material mislabels found. Module difficulty
  distributions are within spec:
  - Math M1: 1 easy / 11 medium / 10 hard (routing module, appropriate spread)
  - Math M2E: 6 easy / 13 medium / 3 hard (easier tier)
  - Math M2H: 6 medium / 16 hard (harder tier — meaningfully harder than M2E)
  - R&W modules follow the same easy→hard ordering by slot.
- **Status:** ALREADY_CORRECT.

## Issue 8 — Grammar-rule correctness (Boundaries / FSS / Transitions)

- **Form 1 fix (`668a568`):** Ensured conjunctive-adverb boundary items use semicolon+comma.
- **Does Form 2 have the same issue?** NO. Form 2 boundary items (`m2h-022`, `m2h-023`) already
  use the correct semicolon-before / comma-after pattern for "however"/"nevertheless". FSS and
  Transitions items are grammatically sound.
- **Status:** ALREADY_CORRECT.

## Issue 9 — Access control moved from Form 1 to Form 2 (`1819a69`)

- **Check:** `app/(dashboard)/premade/sat/form-2/page.tsx` uses `getOrCreateFreeExamAccess()`
  (not a Form-1-specific helper); `FREE_SAT_EXAM_CONFIG.formNumber === 2`.
- **Status:** ALREADY_CORRECT.

## Issue 10 — Scoring / adaptive routing form-independence

- **Check:** `sat-score-conversion.ts` contains no hardcoded form number. `SATExamTaker.tsx`
  routes using `form.rwRoutingThreshold` (17) and `form.mathRoutingThreshold` (14) read from
  `satForm2`, so routing is per-form and correct.
- **Status:** ALREADY_CORRECT.

## Issue 11 — Redesigned feedback form (`cb3affc`)

- **Check:** `SATExamTaker.tsx` feedback phase includes the four module-review textareas, the
  gold amber-styled SAT Premium card (amber-50 bg / amber-200 border / star / feature list /
  Yes-No radios), the friend-referral question with conditional required-name/optional-email
  fields, and submit-disabled validation until all inputs are valid.
- **Status:** ALREADY_CORRECT.

---

## Cross-form duplicate audit (Phase 4)

- **Form 1 ↔ Form 2:** Both forms include a Silk Road passage and a bioluminescence topic, but
  the Form 2 versions are independently worded and test different skills (Form 1 Silk Road =
  Words-in-Context "conduits"; Form 2 Silk Road = Central Ideas). These are acceptable thematic
  overlaps, not stem duplicates, consistent with how real exams reuse topics.
- **Within Form 2:** No repeated stems across M1/M2E/M2H in either section. No passage/context
  leakage between routing and second modules.
- **Status:** ALREADY_CORRECT (no true duplicates).

## Summary of corrections made to Form 2

| Category | Count |
| --- | --- |
| Desmos slider methods added | 6 |
| Answer-key errors fixed | 0 (all keys verified correct) |
| Explanation letter mismatches fixed | 3 |
| R&W ambiguous items rewritten | 1 |
| Difficulty mislabels fixed | 0 |
| Duplicates removed | 0 |
| Question counts changed | 0 (27/27/27 R&W, 22/22/22 Math) |
</content>
