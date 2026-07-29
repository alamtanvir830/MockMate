# SAT Form 3 — Student Feedback Audit Report

**INTERNAL USE ONLY — Not student-facing. Do not deploy as public content.**

Date: 2026-07-29
Analyst: System (automated + manual review)
Feedback export: 63 total submissions (27 Form 1, 17 Form 2, 19 Form 3)

---

## Excluded Rows

The following feedback row IDs were excluded from all content and marketing decisions due to gibberish, copied question text, repetitive filler, or invalid prior-score values. Original DB records are preserved.

| Feedback Row ID |
|---|
| 4ac3787e-2771-450b-b3cc-a35927cd1f8e |
| 19041284-0a0c-448a-a80b-ca645a8f2d54 |
| c3ed63b1-3690-464b-80c5-4eec998ff72c |
| 2bac8e9d-f697-4fb0-8116-5bc92cd83bfa |
| b3e37d93-762a-4959-b028-7a861bf2410b |
| bc71df36-98f1-497f-be98-6b682ed630ca |

---

## Form 3 Substantive Feedback — Attempt Mapping

### E.L. (self-reported 1520)
- Feedback row: `e7c7b01a-12ba-48a3-a5b5-159870120906`
- Local attempt: `1785270012017-7t7s8y1`
- Route: R&W hard, Math hard

**Table formatting complaint (R&W M1 + M2):**
- Identified questions with data tables: `sat-f3-rw-m1-q13` (linguist/loanwords), `sat-f3-rw-m2h-q12` (pedestrian crossings), `sat-f3-rw-m2h-q13` (ocean acidification shell thickness)
- Root cause confirmed: `StimulusRenderer` did not render pipe-separated content as HTML tables
- Fix applied: Added `isTableBlock()` + `TableBlock` component to `StimulusRenderer`
- Also applies to `sat-f3-rw-m2e-q11` (bee populations table)

**Math M2 unclear notation (`r*s` / `p`):**
- Complaint: "some questions were confusing like umm I think number 7 or something, with like r*s and p"
- Position 7 maps to: `sat-f3-math-m2h-q07` — Product of roots (Vieta's formulas)
- Question used variables r, s, p plus notation `r · s = 14`
- Objective problem: `r · s` notation could appear as `r*s` on some render contexts; question requires non-obvious knowledge of Vieta's product-of-roots formula without any contextual setup
- Fix applied: Rephrased to "the product of r and s equals 14" — clearer, no ambiguity about operator
- SAT skill preserved: Advanced Math / Quadratic functions (Vieta's formulas are valid SAT content)
- Confirmed: complaint is corrective. E.L. not added as public testimonial.

---

### T.O. (self-reported 1490)
- Feedback row: `1c329839-08c0-4655-8239-c39f314d5d02`
- Local attempt: `1785161739969-px7y9rv`
- Route: R&W hard, Math hard

**Hemisphere question:**
- Complaint: "Don't know what a hemisphere is and never saw it in an SAT test."
- Question identified: `sat-f3-math-m2h-q20` — Volume of composite solid (cylinder + hemisphere)
- Domain/skill: Geometry and Trigonometry / Area and volume — VALID SAT CONTENT
- College Board authority: Hemisphere volume is within official scope (geometric modeling)
- Student unfamiliarity does not override official scope
- Objective improvement identified: question lacked an explicit definition of "hemisphere"
- Fix applied: Added "(A hemisphere is exactly half of a sphere.)" to question context
- Difficulty preserved: still requires computing cylinder + hemisphere volumes and selecting the correct expression
- T.O. approved as public testimonial: `T. O. — 1490 scorer — "No time to review, very similar to the actual SAT exam."` (R&W M2 feedback)

**R&W grammar difficulty:**
- Complaint: "some questions were a bit difficult, especially the grammar ones"
- Action: No change. A 1490 scorer finding some grammar difficult is expected and appropriate. R&W M1 difficulty mix is preserved.

---

### S.M. (self-reported 1420)
- Feedback row: `20af17b9-eb41-46ca-ba13-d067e64aa9c3`
- Local attempt: `1785246409503-o2u5m7m`
- Route: R&W hard, Math hard

**R&W M2 evidence questions — ambiguity check:**
- Student mentioned: "A couple of the evidence-based questions felt slightly ambiguous"
- Evidence questions shown in R&W M2 Hard: `sat-f3-rw-m2h-q10`, `sat-f3-rw-m2h-q11`, `sat-f3-rw-m2h-q12`, `sat-f3-rw-m2h-q13`
- Manual review result:
  - q10 (bee diversity): Correct answer A is uniquely supported. No revision required.
  - q11 (emotional regulation): Correct answer D is uniquely supported. No revision required.
  - q12 (pedestrian crossings): Table rendering was the core problem — fixed via StimulusRenderer. Correct answer B uniquely supported by data.
  - q13 (ocean acidification): Table rendering fixed. Correct answer D is uniquely supported.
- Conclusion: Ambiguity likely stemmed from hard-to-read ASCII table display, not from question logic.

**R&W passage length:**
- Saint described R&W M2 passages as "much longer." No passage in the hard module exceeds official guidelines (~25–150 words).
- Passage lengths were checked and confirmed acceptable.

**Math M2 difficulty:**
- Saint found it realistic with step-up difficulty. Preserved.
- S.M. approved as public testimonial (curated excerpt): `S. M. — 1420 scorer — "Definitely a step up in difficulty compared to Module 1… the difficulty felt realistic overall."`

---

### Claire
- Feedback row: `727c34cc-143b-46ed-8b20-f3b3cdfd7789`
- Local attempt: `1785207331940-0imjbdt`
- Route: R&W hard, Math hard

**Math difficulty gap:**
- Claire reported Math M2 was "around the same level as Module 1."
- Validator confirms Math M2 Hard avg difficulty = 2.91 vs M1 = 2.05 — a meaningful separation exists.
- Claire's perception is noted as supporting evidence for the general "Math feels easy" theme.
- No specific question changes made; difficulty labels are accurate per validator.
- Claire approved as public testimonial (no score label): `C. — "The Reading & Writing Module 2 was much more difficult, which I think is great."`

---

### Vinicius Rizzi
- Feedback row: `eb78c8d4-8ce4-4554-af45-02087ba2018b`
- Local attempt: `1785263064235-oi6pbhq`
- Route: R&W hard, Math hard

**Timer freeze — critical finding:**
- Complaint: "the timer stopped at 13 minutes [R&W M1]… stopped at 9 minutes [R&W M2]… stopped in [Math M1] too"
- Root cause identified: Timer used a pure client-side `setInterval` decrementing integer with NO `visibilitychange` reconciliation. Browsers (Chrome, Safari) throttle `setInterval` in background tabs, causing the displayed counter to freeze while real time passes. On return, the interval resumes from the stale count rather than recalculating from the wall clock.
- Note: The server already stores a `module_deadline_at` (computed server-side from `secsLeft` on save). The resume path correctly uses this deadline. The gap was in the ACTIVE session: no deadline was stored client-side for real-time reconciliation.
- Fix applied:
  1. Added `moduleDeadlineRef` to store wall-clock deadline when `startTimer()` is called
  2. Also set `moduleDeadlineRef` when restoring from server deadline on resume
  3. Added `document.addEventListener('visibilitychange', ...)` handler that, on tab becoming visible, recalculates `secsLeft = max(0, floor((deadline - Date.now()) / 1000))`
  4. Updated `stopTimer()` to clear `moduleDeadlineRef`
- This ensures the displayed timer snaps to the correct remaining time immediately on tab focus, even after background throttling, sleep, or mobile app switching.

**Topic variety complaint:**
- Vinicius requested more variety — questions of "the same topic" appearing consecutively.
- Official SAT groups similar skills together (e.g., all Words in Context questions together). This is intentional structure.
- No reordering applied. The current grouping follows official domain/skill ordering.

---

### Valentina Ruiz Caldera
- Feedback row: `14f0f56b-cc47-4c47-91be-6260d26bcdee`
- Local attempt: `1785337919285-k325rox`
- Route: R&W hard, Math hard

**Data questions confusing:**
- Complaint across all four modules: "you need to improve the questions about data, its so confusing"
- Investigation: All tables in visible hard route used pipe-character markdown syntax (`| col | data |`) that `StimulusRenderer` rendered as raw ASCII text.
- Fix: `StimulusRenderer` now detects pipe-delimited content and renders HTML `<table>` elements with proper headers, alternating row colors, responsive overflow scroll, and semantic ARIA.
- This addresses the display problem without reducing the conceptual difficulty of the data interpretation tasks.
- Conceptual difficulty preserved — question logic unchanged.

---

### Maeher Grover
- Feedback row: `38716aa7-cbc8-4dd4-9b5e-ad21cd821485`
- Local attempt: `1785343521962-bib77c5`
- Route: R&W hard, Math hard

**Vocab and Math M2:**
- "This part was similar to the real exam but with easier vocab." — WIC questions noted for context-based discrimination quality.
- "There were less super difficult questions in module 2." — supports the "Math M2 top-end" theme.
- No specific question changes applied in this session; noted as supporting evidence.

---

### Kalio Badika
- Feedback row: `ab16b29b-48ed-4ae0-8f59-23da526b5e15`
- Local attempt: `1785303025140-nkdt691`
- Route: R&W hard, Math hard

**Supporting evidence only:**
- R&W difficulty progression functioning correctly per Kalio.
- Math M1 has "some confusing questions" — noted as supporting evidence for wording clarity focus.
- Math M2 "a tad bit more harder" — consistent with measured avg difficulty separation (2.05 → 2.91).

---

## Cross-Form Supporting Evidence Applied

| Theme | Form 3 Action |
|---|---|
| Math feels too easy | Noted; difficulty labels verified accurate by validator. Top-end items exist (20 hard questions in Math M2H). |
| R&W M2 difficulty works | Preserved. No broad rewrites. |
| Tables rendered as ASCII | Fixed via StimulusRenderer table renderer |
| Wording clarity | Q07 Math M2H rephrased for clarity |
| Timer freezing | Fixed via visibilitychange reconciliation |

---

## Questions Revised in This Audit

| Question ID | Module | Issue | Action |
|---|---|---|---|
| `sat-f3-math-m2h-q07` | Math M2 Hard | `r · s` notation + implicit Vieta's knowledge requirement | Rephrased: "the product of r and s equals 14" |
| `sat-f3-math-m2h-q20` | Math M2 Hard | Hemisphere undefined | Added: "(A hemisphere is exactly half of a sphere.)" |
| `sat-f3-rw-m2h-q12` | R&W M2 Hard | Table rendered as raw ASCII | Fixed stimulus `\n\n` paragraph separation; StimulusRenderer now renders as HTML table |
| `sat-f3-rw-m2h-q13` | R&W M2 Hard | Table rendered as raw ASCII | Fixed stimulus paragraph separation |
| All table questions | All modules | General ASCII table rendering | StimulusRenderer upgraded globally |

---

## Questions Investigated But Not Revised

| Question ID | Module | Complaint Source | Finding | Action |
|---|---|---|---|---|
| `sat-f3-rw-m2h-q10` | R&W M2 Hard | S.M. (ambiguous evidence) | One uniquely defensible answer. Distractor A uses unconditional probability — a valid wrong-answer trap. | No revision |
| `sat-f3-rw-m2h-q11` | R&W M2 Hard | S.M. (ambiguous evidence) | One uniquely defensible answer (D). B actually supports the psychologist's claim. | No revision |
| `sat-f3-math-m2h-q20` | Math M2 Hard | T.O. (didn't know hemisphere) | Valid Geometry content per College Board scope | Added definition only |
| All hemisphere questions | Math | T.O. unfamiliarity | Hemisphere volume is official SAT Geometry & Trig content | Preserved topic |
| All probability questions | Math | (General concern) | Probability/conditional probability = official SAT PSDA content | Preserved topic |

---

## Testimonials Approved for Landing Page

| Public ID | Initials | Score Label | Quote | Source |
|---|---|---|---|---|
| form3-tareq-1490 | T. O. | 1490 scorer | "No time to review, very similar to the actual SAT exam." | Form 3, self-reported prior score |
| form3-saint-1420 | S. M. | 1420 scorer | "Definitely a step up in difficulty compared to Module 1… the difficulty felt realistic overall." | Form 3, curated excerpt, self-reported prior score |
| form3-claire-rw | C. | (none) | "The Reading & Writing Module 2 was much more difficult, which I think is great." | Form 3 |
| form2-akshaya-structure | A. K. | (none) | "The structure was good and accurate to the actual exam." | Form 2 |

**Not added as testimonial:** E.L. (1520) — feedback was corrective, not promotional. Evelyn's name, initials, and score label must not appear in marketing.

---

## Timer Compliance

| Scenario | Status |
|---|---|
| Normal use | ✓ `setInterval` decrements normally |
| Tab backgrounded | ✓ Fixed — `visibilitychange` snaps to wall-clock deadline |
| Laptop sleep/wake | ✓ Fixed — `visibilitychange` fires on wake |
| Refresh during module | ✓ Server `module_deadline_at` used for resume calculation |
| Disconnect/reconnect | ✓ Handled by existing offline detection + retry |
| `moduleDeadlineRef` set | ✓ On `startTimer()` and on server resume |

---

## Historical Attempt Protection

Form 3 questions are stored in TypeScript module files (`form-3-*.ts`) and imported at runtime. There is no separate question-versioning table in the current architecture. Changes to these files affect all NEW attempts. Completed attempts store their answers by question ID in `standardized_exam_attempts`. Historical scores and answer records in the DB are unchanged by content file edits.

**Risk assessment:** The two revised questions (`sat-f3-math-m2h-q07` and `sat-f3-math-m2h-q20`) changed only the question wording — not the correct answer, not the answer choices. Historical scoring is unaffected because completed attempt records store `answers` (student choice) compared against the canonical correct answer. The correct answer keys (C and A respectively) did not change.

---

*End of audit. Do not publish this file.*
