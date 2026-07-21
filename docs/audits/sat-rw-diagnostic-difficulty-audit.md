# SAT R&W Diagnostic — Difficulty Audit (v2)

The v2 diagnostic is a two-module adaptive test: **20 questions in Module 1** plus
**16 questions in Module 2** (Easy or Hard branch), for a **36-question** experience.
The question bank below defines **52 original questions** (20 + 16 + 16).

- **Routing threshold:** a student who answers **≥ 70%** of Module 1 correctly is
  routed to the **Hard** Module 2; otherwise to the **Easy** Module 2.
- **Source file:** `lib/academy/diagnostic-questions-v2.ts`
- **Correct answer** is re-derived server-side; the client is never trusted.

## Module 1 — 20 questions (3 easy · 12 medium · 5 hard)

| # | ID | Skill | Difficulty | Correct |
|---|----|-------|-----------|---------|
| 1 | diag2-m1-001 | words-in-context | easy | A |
| 2 | diag2-m1-002 | words-in-context | medium | B |
| 3 | diag2-m1-003 | central-ideas-details | medium | B |
| 4 | diag2-m1-004 | central-ideas-details | medium | B |
| 5 | diag2-m1-005 | text-structure-purpose | medium | C |
| 6 | diag2-m1-006 | text-structure-purpose | hard | B |
| 7 | diag2-m1-007 | command-of-evidence | medium | A |
| 8 | diag2-m1-008 | command-of-evidence | hard | C |
| 9 | diag2-m1-009 | quantitative-evidence | medium | B |
| 10 | diag2-m1-010 | inferences | medium | A |
| 11 | diag2-m1-011 | inferences | medium | A |
| 12 | diag2-m1-012 | cross-text-connections | hard | B |
| 13 | diag2-m1-013 | boundaries | easy | A |
| 14 | diag2-m1-014 | boundaries | medium | A |
| 15 | diag2-m1-015 | form-structure-sense | easy | A |
| 16 | diag2-m1-016 | form-structure-sense | medium | B |
| 17 | diag2-m1-017 | transitions | medium | C |
| 18 | diag2-m1-018 | transitions | medium | B |
| 19 | diag2-m1-019 | rhetorical-synthesis | medium | B |
| 20 | diag2-m1-020 | rhetorical-synthesis | hard | C |

Difficulty tally: **easy 3, medium 12, hard 5**.
Skill coverage: words-in-context (2), central-ideas-details (2), text-structure-purpose (2),
command-of-evidence (2), quantitative-evidence (1), inferences (2), cross-text-connections (1),
boundaries (2), form-structure-sense (2), transitions (2), rhetorical-synthesis (2) — all 11 skills.

## Module 2 — Easy branch — 16 questions (6 easy · 9 medium · 1 hard)

| # | ID | Skill | Difficulty | Correct |
|---|----|-------|-----------|---------|
| 1 | diag2-m2e-001 | words-in-context | easy | A |
| 2 | diag2-m2e-002 | central-ideas-details | easy | B |
| 3 | diag2-m2e-003 | boundaries | easy | A |
| 4 | diag2-m2e-004 | form-structure-sense | easy | B |
| 5 | diag2-m2e-005 | transitions | easy | B |
| 6 | diag2-m2e-006 | inferences | easy | A |
| 7 | diag2-m2e-007 | text-structure-purpose | medium | A |
| 8 | diag2-m2e-008 | command-of-evidence | medium | A |
| 9 | diag2-m2e-009 | words-in-context | medium | B |
| 10 | diag2-m2e-010 | boundaries | medium | A |
| 11 | diag2-m2e-011 | form-structure-sense | medium | B |
| 12 | diag2-m2e-012 | transitions | medium | B |
| 13 | diag2-m2e-013 | quantitative-evidence | medium | B |
| 14 | diag2-m2e-014 | rhetorical-synthesis | medium | A |
| 15 | diag2-m2e-015 | cross-text-connections | medium | B |
| 16 | diag2-m2e-016 | inferences | hard | A |

Difficulty tally: **easy 6, medium 9, hard 1**.
Skill coverage: all 11 skills appear (words-in-context, central-ideas-details,
text-structure-purpose, command-of-evidence, quantitative-evidence, inferences,
cross-text-connections, boundaries, form-structure-sense, transitions, rhetorical-synthesis).

## Module 2 — Hard branch — 16 questions (0 easy · 6 medium · 10 hard)

| # | ID | Skill | Difficulty | Correct |
|---|----|-------|-----------|---------|
| 1 | diag2-m2h-001 | words-in-context | hard | B |
| 2 | diag2-m2h-002 | words-in-context | hard | C |
| 3 | diag2-m2h-003 | central-ideas-details | hard | B |
| 4 | diag2-m2h-004 | text-structure-purpose | hard | B |
| 5 | diag2-m2h-005 | command-of-evidence | hard | A |
| 6 | diag2-m2h-006 | inferences | hard | B |
| 7 | diag2-m2h-007 | cross-text-connections | hard | B |
| 8 | diag2-m2h-008 | boundaries | hard | A |
| 9 | diag2-m2h-009 | boundaries | hard | A |
| 10 | diag2-m2h-010 | form-structure-sense | hard | C |
| 11 | diag2-m2h-011 | form-structure-sense | medium | B |
| 12 | diag2-m2h-012 | transitions | hard | B |
| 13 | diag2-m2h-013 | transitions | medium | B |
| 14 | diag2-m2h-014 | rhetorical-synthesis | hard | B |
| 15 | diag2-m2h-015 | quantitative-evidence | medium | B |
| 16 | diag2-m2h-016 | central-ideas-details | medium | B |

Difficulty tally: **easy 0, medium 6, hard 10**.
Skill coverage: all 11 skills appear, with emphasis on complex reasoning
(secondary word meanings, hidden assumptions, author-vs-author disagreement,
`neither…nor` agreement, and offset-benefit transitions).

## Design notes

- **Hard-item distractors** are engineered to be superficially tempting: literal vs.
  figurative meanings (`guarded`, `qualified`, `muddied`, `eclipsed`), grammatically
  plausible but logically wrong punctuation, and evidence that matches the topic but
  not the specific claim being tested.
- **Every stimulus** is 60–130 words of realistic prose. Boundaries and form/structure
  items use the standard SAT prompt ("Which choice completes the text so that it
  conforms to the conventions of Standard English?"). Rhetorical-synthesis items supply
  bulleted notes for the student to work from.
- **Every explanation** is 3–5 sentences; **every** wrong-answer explanation is 1–2
  specific sentences; each question carries one transferable `teachingPoint`.
