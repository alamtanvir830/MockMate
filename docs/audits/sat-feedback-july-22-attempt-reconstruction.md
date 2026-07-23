# SAT Feedback Attempt Reconstruction — July 22, 2026

Reconstruction of the four **substantive** feedback rows submitted after
`2026-07-21 22:33:50.470682+00`. The three keyboard-spam rows
(`dcac3f9b`, `942632a8`, `1dc33ada`) are excluded as invalid noise and did not
drive any content change.

## Privacy note

Private email addresses are intentionally **omitted** from this document. The
CSV feedback export does not include the Supabase `user_id` (auth UUID); the
in-progress and save-attempt tables store it server-side only, keyed by
`auth.getUser().id`. Where `user_id` is not derivable from the export it is
marked `not exposed in feedback export`. Reconstruction of the adaptive path is
therefore inferred from the reported module labels and the deterministic
routing rules in the exam engine, not from raw database rows.

## Routing rules (source of truth)

The Module 2 branch is chosen client-side by the exam engine
(`components/premade/SATExamTaker.tsx`, `handleRWM1Complete` /
`handleMathM1Complete`) using the per-form thresholds:

| Form | RW M1 → Hard when correct ≥ | Math M1 → Hard when correct ≥ |
|------|------------------------------|-------------------------------|
| Form 1 | 14 / 27 | 11 / 22 |
| Form 2 | 17 / 27 | 14 / 22 |

Below the threshold routes to the Easy Module 2; at or above routes to Hard.
Scoring later uses the exact same `rwM2Type` / `mathM2Type` module that was
displayed, so the branch a student saw is the branch that is scored.

---

## Attempt 1 — feedback `97912176` (Moyosoreoluwa)

- **Form:** 1 (SAT Practice Test 1)
- **local_attempt_id:** `1784680500326-l1xo7ud`
- **user_id:** not exposed in feedback export
- **Reported branches:** RW Module 2 **Hard**, Math Module 2 **Hard**
- **Inferred path:**
  - RW: M1 (`rw-module-1`) → scored ≥ 14/27 → RW M2 **Hard** (`rw-module-2-hard`)
  - Math: M1 (`math-module-1`) → scored ≥ 11/22 → Math M2 **Hard** (`math-module-2-hard`)
- **Key report:** Math M2 Hard — the graphing calculator glitched and required
  navigating to the review page and back before it would work again.
  → Addressed by the calculator fix (see Priority 1 in the change report).

## Attempt 2 — feedback `5e191921` (user "c")

- **Form:** 2 (SAT Practice Test 2)
- **local_attempt_id:** `1784748296186-qtrglw7`
- **user_id:** not exposed in feedback export
- **Reported branches:** RW Module 2 **Hard**, Math Module 2 **Hard**
- **Inferred path:**
  - RW: M1 (`f2-rw-module-1`) → scored ≥ 17/27 → RW M2 **Hard** (`f2-rw-module-2-hard`)
  - Math: M1 (`f2-math-module-1`) → scored ≥ 14/22 → Math M2 **Hard** (`f2-math-module-2-hard`)
- **Key report:** difficulty-perception only ("Math M1 harder than expected",
  "vocabulary a little harder"). No content defect confirmed; difficulty is by
  design and was not softened.

## Attempt 3 — feedback `54f877dc` (Agustya)

- **Form:** 2 (SAT Practice Test 2)
- **local_attempt_id:** `1784754397848-9f1ms1z`
- **user_id:** not exposed in feedback export
- **Reported branches:** RW Module 2 **Easy**, Math Module 2 **Easy**
- **Inferred path:**
  - RW: M1 (`f2-rw-module-1`) → scored < 17/27 → RW M2 **Easy** (`f2-rw-module-2-easy`)
  - Math: M1 (`f2-math-module-1`) → scored < 14/22 → Math M2 **Easy** (`f2-math-module-2-easy`)
- **Key report:** "some problems had a significant issue of wording." A full
  wording pass of all four modules Agustya saw found no grammatical, ambiguity,
  undefined-variable, or missing-unit defects. The most plausible source of the
  "wording" complaint is the slash-fraction display issue Kathy described, which
  the math-rendering fix resolves.

## Attempt 4 — feedback `58ffeaab` (Kathy)

- **Form:** 2 (SAT Practice Test 2)
- **local_attempt_id:** `1784756260871-2btjlw2`
- **user_id:** not exposed in feedback export
- **Reported branches:** RW Module 2 **Easy**, Math Module 2 **Easy**
- **Inferred path:**
  - RW: M1 (`f2-rw-module-1`) → scored < 17/27 → RW M2 **Easy** (`f2-rw-module-2-easy`)
  - Math: M1 (`f2-math-module-1`) → scored < 14/22 → Math M2 **Easy** (`f2-math-module-2-easy`)
- **Key report:** Math M1 and Math M2 Easy — "problems need to display proper
  diagrams or properly display the equations (display fractions as fractions
  instead of /)."
  → Addressed by the `MathText` renderer, which stacks slash fractions
  (e.g. `3/4`, `(x + 3)/(x − 2)`) into proper fraction layout in both the
  active-question and review views (see Priority 2 in the change report).

---

## Routing / ownership integrity (summary)

- Module 2 branch is determined from Module 1 answers via `countCorrect`
  against the form threshold — not from any URL param or localStorage flag that
  a student can hand-edit to change which module is served.
- The in-progress persistence route (`app/api/sat/in-progress/route.ts`) and the
  save-attempt route both resolve identity from `supabase.auth.getUser()` and
  key every read/write on the authenticated `user.id`; the client cannot supply
  a different owner.
- Scoring uses the same `rwM2Type` / `mathM2Type` module that was rendered, so a
  student is always scored on the questions they actually saw.
