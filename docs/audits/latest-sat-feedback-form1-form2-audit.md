# SAT Forms 1 & 2 — Targeted Feedback Audit (July 21, 2026)

Evidence-based audit and correction of SAT Practice Test Forms 1 and 2, driven by
new legitimate student feedback. All changes are confined to the four SAT content
files named below; Forms 3–5, Question Bank, Academies, auth, Stripe, and RLS were
not touched.

## Files changed
- `lib/premade-exams/sat/rw-module-2-hard.ts` (Form 1 R&W Module 2 Hard)
- `lib/premade-exams/sat/math-module-2-hard.ts` (Form 1 Math Module 2 Hard)
- `lib/premade-exams/sat/form-2-math-module-1.ts` (Form 2 Math Module 1)
- `lib/premade-exams/sat/form-2-math-module-2-hard.ts` (Form 2 Math Module 2 Hard)

Note on file architecture: Form 1 is assembled in `form-1.ts` from the **non-prefixed**
module files (`rw-module-2-hard.ts`, `math-module-2-hard.ts`, etc.). Form 2 is
assembled in `form-2.ts` from the **`form-2-`prefixed** module files. This mapping
was verified before any edit so that Form 1 feedback was never applied to Form 2
content and vice versa.

## Feedback entries EXCLUDED (not substantive)
| CSV id | User | Form | Reason for exclusion |
|--------|------|------|----------------------|
| `3b3eefe1` | Ranvi | Form 1 | Copied the feedback-form instructions back verbatim; internal test entry, no content signal. |
| `453b44e6` | Ranvi | Form 2 | Same as above — copied instructions, internal test. |
| `eebb6e22` | Muhammad Atif Khan | Form 2 | Thousands of repeated `x` characters; spam, no actionable content. |

## Feedback entries that DROVE changes
| CSV id | User | Form / path | Actionable signal |
|--------|------|-------------|-------------------|
| `aee81cc5` | Fatema Akther | Form 1, R&W Hard / Math Hard | R&W M2 Hard: "grammar ones had the corresponding sentence present ... it should all be blank" (answer-leakage/duplication defect). Math M2 Hard: "wording a bit unclear." M1 (both) praised — preserved. |
| `5b98bf00` | Partho Kothuri | Form 2, R&W Hard / Math Hard | Math M1: "algebra very straightforward, felt a bit too easy" (harden weakest algebra). Math M2 Hard: "final few geometry/word problems confusing but didn't take long to solve" (fix wording + add depth). R&W M1 praised; R&W M2 Hard correctly harder — preserved. |

---

## PHASE 2 — Form 1 R&W Module 2 Hard: Standard English Conventions defect audit

Fatema's complaint: the grammar (SEC) items had "the corresponding sentence present,"
i.e. passage text was duplicated inside an answer choice so the completion no longer
read as a clean blank.

Official College Board SEC format confirmed: stem asks "Which choice completes the
text so that it conforms to the conventions of Standard English?"; the passage carries
a single blank; answer choices contain only the replacement text; the blank is never
pre-filled.

All six SEC items were audited:

| ID | Skill | Result |
|----|-------|--------|
| `rw2h-04` | Form, Structure, and Sense | No defect. Blank empty; choices are alternative independent clauses; no passage text duplicated. Not changed. |
| `rw2h-05` | Form, Structure, and Sense | No defect. Choices are verbs (`lies`/`lie`/…); no leakage. Not changed. |
| `rw2h-27` | Form, Structure, and Sense | No defect. Choices (`which were`/…) do not appear pre-filled in the passage. Not changed. |
| `rw2h-25` | Boundaries | No defect. Punctuation + `however` choices; "however" not present in stem. Not changed. |
| `rw2h-17` | Boundaries | No defect. Choices (`, which`/…) not duplicated in stem. Not changed. |
| **`rw2h-13`** | Boundaries | **DEFECT FOUND & FIXED.** |

### `rw2h-13` — confirmed defect and fix
- Passage: "...hinged on a single measurable clue ______ the tiny wobble that a planet's
  gravity induces in the motion of its host star."
- Original choice C was `, the tiny wobble; which is`. Inserting it **duplicated**
  "the tiny wobble," which already appears in the passage after the blank, producing the
  exact confusing "sentence already present" effect Fatema reported. The other three
  choices are punctuation + `the`, so choice C was also structurally inconsistent (it
  leaked passage text into the blank).
- Fix: choice C changed to `, the` — a clean, punctuation-only distractor consistent
  with A/B/D. Choice C's wrong-answer explanation rewritten to explain why a comma is
  too weak to introduce the specifying (appositive) noun phrase after a complete
  independent clause, when a colon (correct answer B) is required.
- Correct answer unchanged (B, `: the`). **Difficulty before: hard. After: hard.**
  The question still tests colon vs. semicolon vs. comma vs. no-punctuation to introduce
  an appositive after an independent clause — not made easier.

### Words in Context audit (rw2h-01, -02, -03, -09)
`intractable`, `precipitate`, `ostensibly`, `tendentious` — all provide sufficient
context for a single defensible answer, use correct definitions in the explanations,
and are within SAT hard-module vocabulary scope. No defect on any of the four criteria
(out-of-scope vocab / insufficient context / multiple defensible answers / wrong
definition). Not changed. Deliberately NOT simplified — hard-module vocabulary is
allowed to be challenging.

---

## PHASE 3 — Form 1 Math Module 2 Hard: wording clarity

Fatema's complaint: "wording of the questions were a bit unclear." All 22 items audited
for clear target quantity, consistent units, and clear referents; priority on the final
geometry/word positions. Three wording-precision edits made; **no difficulty lowered**
(identical underlying mathematics in each case).

| ID | Change | Difficulty before/after |
|----|--------|-------------------------|
| `m2h-03` (sector area) | Reworded to name the sector explicitly as "the region bounded by the two radii and the intercepted arc," removing ambiguity between arc length and sector area. Same numbers (r = 10, 72°). | hard → hard |
| `m2h-20` (altitude to hypotenuse) | Reworded to state that PR is the hypotenuse and that PS is "the part of the hypotenuse between vertex P and point S," clarifying the referent segment. Same geometric-mean relation PS = PQ²/PR. | hard → hard |
| `m2h-22` (right-triangle legs) | Reworded so the hypotenuse condition and the constraint a + b = 17 are stated in clear separate clauses and the target is explicitly "the product ab." Same Pythagorean + algebraic-identity solution. | hard → hard |

All other items (`m2h-01/02/04/05/06/07/08/09/10/11/12/13/14/15/16/17/18/19/21`) had
clearly stated target quantities, consistent units, and unambiguous referents. Not
changed.

---

## PHASE 4 — Form 2 Math Module 1: hardening (Partho)

Partho: algebra "felt a bit too easy." Distribution audit and targeted hardening of the
weakest algebra items. Total remains 22; difficulty labels unchanged; easier-to-harder
ordering preserved (Easy block, then Medium block, then Hard block).

**Difficulty distribution (labels): before 1 easy / 11 medium / 10 hard → after 1 / 11 / 10 (unchanged).**

The nominal target (Easy 2–3, Medium 13–14, Hard 5–7) was intentionally NOT achieved by
relabeling: relabeling hard→medium would lower module difficulty, which is prohibited
and contradicts Partho's "too easy" signal. Instead the weakest algebra items were made
genuinely harder in content while keeping labels. The module still routes accurately
(one easy anchor, a full medium band, plus a hard band).

Three algebra items hardened (each gains a meaningful second step and realistic distractors):

| ID | Change | Difficulty before/after |
|----|--------|-------------------------|
| `sat2-math-m1-h01` (no-solution system) | Was a bare "find k for no solution." Now introduces a constant c and asks for k + c where c is the excluded value that would instead give infinitely many solutions — forces the student to distinguish no-solution vs. infinitely-many and combine two results. New distractors added. Answer changed to k + c = 7. | hard → hard (deeper) |
| `sat2-math-m1-h02` (line from x-intercept, grid-in) | Was a two-step plug-in. Now adds a perpendicular-through-origin consistency condition that must be checked, adding a verification step. Answer b = 2 preserved. | hard → hard (deeper) |
| `sat2-math-m1-m02` (system) | Target changed from a plain x − y readout to evaluating the expression 4x − 3y at the solution, with distractors modeling sign/omission errors. | medium → medium (deeper) |

All other Form 2 Math M1 items were left unchanged; the medium band already required
genuine translation/multi-step work (e.g. m03 freight comparison, m04 sign-flip
inequality, m06 linear-model parameter, m07 multiplicative percent change).

---

## PHASE 5 — Form 2 Math Module 2 Hard: final questions (Partho)

Partho: "final few geometry and word problems quite confusing but didn't take long to
solve" — two issues: unclear wording AND insufficient depth once the setup is understood.
Final positions (h10–h16) reviewed. Two items had genuine shallowness once set up; both
were deepened (never replaced with easier algebra). No difficulty lowered.

| ID | Change | Difficulty before/after |
|----|--------|-------------------------|
| `sat2-math-m2h-h13` (parallelogram area) | Original used an axis-aligned base ((0,0),(4,0),(5,3),(1,3)) → trivial base×height. Replaced vertices with a tilted parallelogram A(1,1) B(6,3) C(8,8) D(3,6) that forces the vector cross-product (or shoelace) method: |AB×AD| = |25 − 4| = 21. Verified AB = DC = (5,2), so it is a valid parallelogram. Answer 12 → 21. | hard → hard (deeper) |
| `sat2-math-m2h-h10` (geometric sequence) | Original gave the third term directly (3r² = 48 → r), a single step. Now the condition is "the third term exceeds the second term by 36," requiring the student to set up and solve 3r² − 3r = 36, discard the negative root, then compute the fourth term. Answer 192 preserved. | hard → hard (deeper) |

Other final items were appropriately deep or conceptual and were left unchanged: h11
(inverse of a rational function), h12 (effect of adding a constant on mean vs. SD — a
concept item that is short by design), h14 (function-composition substitution), h15
(conditional probability requiring careful enumeration), h16 (profit maximization via
parabola vertex).

---

## PHASE 6 — Form 2 R&W preservation

Partho praised Form 2 R&W Module 1 and Module 2 Hard being harder is intended. All six
Form 2 R&W M2 Hard Standard English Conventions items were checked for the specific
defect Fatema reported (duplicated/leaked passage text in a choice):
- `sat2-rw-m2h-025`, `-026`, `-027` use the standard blank-completion format with
  short-word choices and no leakage — no defect.
- `sat2-rw-m2h-022`, `-023`, `-024` use the valid **sentence-revision** format ("Which
  choice best corrects the ... error?"), where the full sentence is intentionally shown
  because the task is to revise it. This is a legitimate, distinct SAT question type —
  not the answer-leakage defect. No defect.

No Form 2 R&W changes were made, consistent with the constraint that Form 1 feedback
must not be applied to Form 2 content.

---

## PHASE 7 — Validation results

- **Question counts (unchanged):**
  - Form 1 R&W M2 Hard: 27 ✓
  - Form 1 Math M2 Hard: 22 ✓
  - Form 2 Math M1: 22 ✓
  - Form 2 Math M2 Hard: 22 ✓
- **RW domain coverage** (Form 1 R&W M2 Hard): Craft and Structure 7, Information and
  Ideas 8, Standard English Conventions 6, Expression of Ideas 6 — all four present ✓
- **Math domain coverage** (all four domains present in each edited Math module) ✓
- **Difficulty preservation:** every changed item retained its difficulty label; content
  changes preserved or increased difficulty. No Hard→Medium or Medium→Easy anywhere ✓
- **Explanations:** every changed item retains a complete explanation and (for MC) full
  wrong-answer explanations; grid-ins retain scoring notes ✓
- **`npx tsc --noEmit`:** passes clean (exit 0) ✓
- **`npm run build`:** compiles and type-checks clean; full build succeeds when
  `OPENAI_API_KEY` is present. The only failure observed was a pre-existing environment
  condition — `/api/anki` and `/api/mind-map` instantiate an OpenAI client at module load
  and this worktree has no `.env` (only `.env.example`). It is unrelated to the SAT
  content changes (no API route was touched). Re-running the build with a dummy key
  completes with exit 0 ✓

## Official College Board alignment check
- SEC blank-completion items conform: single blank, replacement-text-only choices, no
  pre-filled blank (rw2h-13 brought back into conformance).
- SEC revision items (Form 2) conform to the College Board "Which choice best corrects"
  format.
- Math wording edits preserve College Board conventions (explicit target quantity,
  consistent units, unambiguous geometric referents) without altering the tested skill.

## Admin / access constraints (unchanged)
No changes to admin membership, premium flags, thresholds, or timing. `ranvi.contact@gmail.com`
remains the sole admin; `kurbanov.muhammadali23@gmail.com` remains non-admin/non-premium.
Adaptive routing thresholds and timing were not modified.
