# MCAT Form 1 — AAMC Blueprint Audit

Audit date: 2026-07-21
Scope: MockMate MCAT Practice Exam Form 1 (`lib/premade-exams/mcat/`)
Authoritative source: TypeScript content files (no database). Four section files
(`form-1-chem-phys.ts`, `form-1-cars.ts`, `form-1-bio-biochem.ts`,
`form-1-psych-soc.ts`) assembled by `form-1.ts`. Scoring in
`mcat-score-conversion.ts`.

The MCAT question bank (`lib/question-bank/mcat/`) is a **separate** content set
using the `mcat-qb-*` ID prefix; the premade exam uses `mcat1-*`. There is **no
ID overlap** and no shared records. The question bank is NOT modified by this
overhaul.

---

## 1. Structural counts — current vs required

| Section | Current passages | Current discrete | Current total | Required passages | Required discrete | Required total |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| C/P (Chem/Phys)     | 8 (5 ea)  | 19 | 59 | 10 (4-6 ea) | 15 | 59 |
| CARS                | 10 (5-6 ea) | 0 | 53 | 9 (5-7 ea) | 0 | 53 |
| B/B (Bio/Biochem)   | 8 (5 ea)  | 19 | 59 | 10 (4-6 ea) | 15 | 59 |
| P/S (Psych/Soc)     | 8 (5 ea)  | 19 | 59 | 10 (4-6 ea) | 15 | 59 |
| **TOTAL**           | 34 | 57 | **230** | 38 | 45 | **230** |

### Structural issues found
- **C/P**: 8 passages (need 10); 19 discrete (need 15). Fix: convert 4 discrete
  into two new passage sets and add passage content to reach 10 passages / 15
  discrete.
- **CARS**: 10 passages (need 9). Fix: consolidate to 9 passages, each 5-7
  questions, summing to exactly 53. Redistribute the removed passage's questions.
- **B/B**: 8 passages (need 10); 19 discrete (need 15). Same fix pattern as C/P.
- **P/S**: 8 passages (need 10); 19 discrete (need 15). Same fix pattern as C/P.

---

## 2. Discipline distribution — current vs AAMC target

### C/P
| Discipline | Current | Current % | AAMC target |
|---|:---:|:---:|:---:|
| General Chemistry        | 23 | 39% | ~30% |
| Introductory Physics     | 14 | 24% | ~25% |
| First-semester Biochem   | 12 | 20% | ~25% |
| Organic Chemistry        | 6  | 10% | ~15% |
| Introductory Biology     | 4  | 7%  | ~5%  |

Gap: General Chemistry over-represented; Biochemistry and Organic slightly light.

### B/B
| Discipline | Current | Current % | AAMC target |
|---|:---:|:---:|:---:|
| Introductory Biology     | 37 | 63% | ~65% |
| First-semester Biochem   | 16 | 27% | ~25% |
| General Chemistry        | 3  | 5%  | ~5%  |
| Organic Chemistry        | 3  | 5%  | ~5%  |

Gap: Well aligned. Maintain balance when adding two passages.

### P/S
| Discipline | Current | Current % | AAMC target |
|---|:---:|:---:|:---:|
| Introductory Psychology  | 38 | 64% | ~65% |
| Introductory Sociology   | 18 | 31% | ~30% |
| Introductory Biology     | 3  | 5%  | ~5%  |

Gap: Well aligned. Maintain when adding two passages.

Note: current files label disciplines as "Physics", "Biochemistry", "Biology".
Overhaul standardizes labels to AAMC nomenclature ("Introductory Physics",
"First-semester Biochemistry", "Introductory Biology") where appropriate.

---

## 3. Foundational Concept coverage — current vs target

### C/P (target FC 4 ~40%, FC 5 ~60%)
| FC | Current | Current % |
|---|:---:|:---:|
| FC 5 | 25 | 42% |
| FC 4 | 22 | 37% |
| FC 1 | 12 | 20% |

Issue: 12 questions are tagged FC 1 (a B/B concept) inside C/P — these are the
biochemistry-integrated items. Retag to FC 5/FC 4 as appropriate so C/P reports
only FC 4 / FC 5, matching the blueprint.

### B/B (target FC 1 ~55%, FC 2 ~20%, FC 3 ~25%)
| FC | Current | Current % |
|---|:---:|:---:|
| FC 1 | 30 | 51% |
| FC 3 | 17 | 29% |
| FC 2 | 12 | 20% |

Gap: Close. Nudge FC 1 up toward 55% with new passages.

### P/S (target FC 6 ~25%, FC 7 ~35%, FC 8 ~20%, FC 9 ~15%, FC 10 ~5%)
| FC | Current | Current % |
|---|:---:|:---:|
| FC 8 | 23 | 39% |
| FC 7 | 19 | 32% |
| FC 9 | 12 | 20% |
| FC 6 | 4  | 7%  |
| FC 10 | 1 | 2% |

Gap: FC 6 under-represented (7% vs 25% target); FC 8 over-represented. New
passages should emphasize FC 6 (sensation/perception, cognition, emotion,
biological bases of behavior) and FC 10 (social stratification).

---

## 4. Scientific Skill distribution — current vs target

Target per science section: Skill 1 ~35%, Skill 2 ~45%, Skill 3 ~10%, Skill 4 ~10%.

| Section | Skill 1 | Skill 2 | Skill 3 | Skill 4 |
|---|:---:|:---:|:---:|:---:|
| C/P     | 18 (31%) | 25 (42%) | 5 (8%)  | 11 (19%) |
| B/B     | 17 (29%) | 26 (44%) | 7 (12%) | 9 (15%)  |
| P/S     | 16 (27%) | 26 (44%) | 9 (15%) | 8 (14%)  |

Gap: Skill 1 slightly light in all three; Skill 4 slightly heavy in C/P. Skill 3
(research design) is at or above target. Broadly acceptable; new questions bias
toward Skill 1/Skill 2 to align.

---

## 5. CARS skill distribution — current vs target

Target: Foundations of Comprehension ~30%, Reasoning Within Text ~30%,
Reasoning Beyond Text ~40%.

The current CARS file encodes skills as Skill 1/2/3 mapped to the three CARS
skills:
| Encoded skill | Current | Current % |
|---|:---:|:---:|
| Skill 1 (Foundations of Comprehension) | 16 | 30% |
| Skill 2 (Reasoning Within Text)        | 31 | 58% |
| Skill 3 (Reasoning Beyond Text)        | 6  | 11% |

Gap: **Reasoning Beyond Text is far under target** (11% vs 40%). This is the
largest CARS defect. The overhaul rebalances toward ~30/30/40 by re-skilling
existing questions and writing new Beyond-Text items during consolidation.

Content-area balance (current):
- Humanities: p1 language, p3 Woolf, p5 progress, p6 photography, p7 civil
  disobedience, p8 moral luck, p10 novel = strong humanities weight.
- Social science: p2 inequality, p4 gift exchange, p9 rational actor.
Target is ~50/50 humanities/social science; social science needs one more
passage to balance after consolidation to 9.

---

## 6. Difficulty distribution — current

Target across 230: Easy 10-15%, Medium 40-45%, Hard 40-50%.

| Section | Easy | Medium | Hard |
|---|:---:|:---:|:---:|
| C/P     | 10 (17%) | 37 (63%) | 12 (20%) |
| CARS    | 8 (15%)  | 31 (58%) | 14 (26%) |
| B/B     | 4 (7%)   | 39 (66%) | 16 (27%) |
| P/S     | 7 (12%)  | 38 (64%) | 14 (24%) |
| **TOTAL** | 29 (13%) | 145 (63%) | 66 (29%) |

Gap: **Medium is far over target (63% vs 40-45%); Hard is far under (29% vs
40-50%).** This is the single biggest content defect. The difficulty overhaul
re-levels ~40 medium questions to hard by adding multi-step reasoning,
cross-disciplinary integration, data interpretation, and passage integration —
without introducing ambiguity or out-of-scope trivia.

Target final distribution (approx, out of 230):
- Easy: ~28 (12%)
- Medium: ~100 (43%)
- Hard: ~102 (44%)

---

## 7. Answer-letter distribution — current

| Section | A | B | C | D |
|---|:---:|:---:|:---:|:---:|
| C/P     | 14 | 19 | 13 | 13 |
| CARS    | 13 | 14 | 13 | 13 |
| B/B     | 16 | 19 | 13 | 11 |
| P/S     | 14 | 15 | 17 | 13 |

Gap: B/B and C/P over-weight B; B/B light on D. No pathological long runs found,
but the overhaul balances each section toward ~25% per letter and checks for
runs of >3 identical consecutive answers.

---

## 8. Visual (figure/table) coverage — current

| Section | Passages with visual | Target |
|---|:---:|:---:|
| C/P  | 6 / 8  | ≥7 / 10 |
| B/B  | 5 / 8  | ≥8 / 10 |
| P/S  | 5 / 8  | ≥6 / 10 |
| CARS | 0 / 10 | text only (correct) |

Gap: All three science sections need more visuals, especially B/B (need ≥8/10).
New passages carry tables/figure descriptions. At least two amino-acid /
protein-chemistry structural visuals are added (one in C/P biochem-integrated
passage, one in B/B protein passage).

---

## 9. Questions flagged for revision or replacement

Per-question keep/revise/replace decisions are in
`mcat-form-1-content-coverage-matrix.csv`. Summary of the categories:

**Retag (metadata only, stem unchanged):**
- C/P: 12 questions tagged FC 1 → retag to FC 4/FC 5 (biochem-in-chem items).
- Several C/P/B/B discipline labels standardized to AAMC nomenclature.

**Re-level to hard (add reasoning/data steps):**
- ~40 medium questions across the four sections identified as recall-only or
  single-step; these are strengthened to multi-step / integrated / data-driven.

**Structural replacement / addition:**
- C/P: +2 passages (biochemistry-integrated amino-acid chemistry; separations/
  chromatography with data table). −4 discrete.
- B/B: +2 passages (protein structure & amino-acid chemistry with structural
  figure; molecular genetics / gel-interpretation experimental passage). −4
  discrete.
- P/S: +2 passages (FC 6 sensation/perception or cognition with data figure;
  FC 10 social stratification / health-disparities study). −4 discrete.
- CARS: consolidate 10→9 passages; add one social-science passage weight and
  rebalance skills toward Reasoning Beyond Text.

**Distractor strengthening:**
- All new questions written with misconception-targeted distractors (reversed
  cause/effect, wrong inhibition type, misread axis, right-fact-wrong-question;
  for CARS: too broad / too narrow / outside passage / logically reversed).

---

## 10. Overhaul plan by phase

1. Retag mis-tagged FC/discipline metadata (no ID changes).
2. C/P: reduce 19→15 discrete; add cp-p9, cp-p10 passages; re-level difficulty.
3. B/B: reduce 19→15 discrete; add bb-p9, bb-p10 passages; re-level difficulty.
4. P/S: reduce 19→15 discrete; add ps-p9, ps-p10 passages; re-level difficulty.
5. CARS: consolidate 10→9 passages (5-7 each = 53); rebalance skills.
6. Add visuals to reach section targets; add two amino-acid/protein visuals.
7. Balance answer letters; verify explanations populate all three wrong choices.
8. Validate counts (230), `tsc --noEmit`, `npm run build`.

All existing `mcat1-*` question IDs are preserved wherever the question is
retained (historical localStorage attempts key answers by ID). New questions use
IDs continuing each section's numbering (cp-060+, bb-060+, ps-061+).
