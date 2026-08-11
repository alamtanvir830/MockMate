# MCAT Release Hardening Audit

**Date:** 2026-08-11
**Scope:** Forms 1–5 + Question Bank (700 questions)
**Auditor:** Automated grep audit

---

## 1. Form Question Counts

### Expected: 59 C/P + 53 CARS + 59 B/B + 59 P/S = 230 per form

| Form | C/P | CARS | B/B | P/S | Total | Status |
|------|-----|------|-----|-----|-------|--------|
| 1    | 59  | 53   | 59  | 59  | 230   | PASS   |
| 2    | 59  | 53   | 59  | 59  | 230   | PASS   |
| 3    | 59  | 53   | 59  | 59  | 230   | PASS   |
| 4    | 59  | 53   | 59  | 59  | 230   | PASS   |
| 5    | 59  | 53   | 59  | 59  | 230   | PASS   |

**Total across all forms: 1,150 questions — PASS**

---

## 2. Question Bank Counts

### Expected: 700 total (C/P=180, CARS=160, B/B=180, P/S=180)

| Section | Count | Status |
|---------|-------|--------|
| C/P (`mcat-qb-cp-*`) | 180 | PASS |
| CARS (`mcat-qb-cars-*`) | 160 | PASS |
| B/B (`mcat-qb-bb-*`) | 180 | PASS |
| P/S (`mcat-qb-ps-*`) | 180 | PASS |
| **Total** | **700** | **PASS** |

### QB File Breakdown

| File | Count |
|------|-------|
| chem-phys.ts | 113 |
| chem-phys-2.ts | 37 |
| chem-phys-3.ts | 30 |
| cars.ts | 102 |
| cars-2.ts | 30 |
| cars-3.ts | 28 |
| bio-biochem.ts | 103 |
| bio-biochem-2.ts | 40 |
| bio-biochem-3.ts | 37 |
| psych-soc.ts | 92 |
| psych-soc-2.ts | 44 |
| psych-soc-3.ts | 44 |

---

## 3. Duplicate ID Audit

| Scope | Duplicates Found | Status |
|-------|-----------------|--------|
| Within forms (mcat1–mcat5) | 0 | PASS |
| Within QB (mcat-qb-*) | 0 | PASS |
| Cross-reference forms + QB | 0 | PASS |

**No duplicate IDs detected — PASS**

---

## 4. Answer Distribution Audit

### Threshold: FAIL if any letter exceeds 40% of a section

#### Form 1 (PASS — well balanced)

| Section | A | B | C | D | Total | B% | Status |
|---------|---|---|---|---|-------|----|--------|
| C/P     | 14 | 22 | 10 | 13 | 59 | 37.3% | PASS |
| CARS    | 17 | 12 | 12 | 12 | 53 | 22.6% | PASS |
| B/B     | 19 | 18 | 11 | 11 | 59 | 30.5% | PASS |
| P/S     | 18 | 14 | 15 | 12 | 59 | 23.7% | PASS |
| **Total** | **68** | **66** | **48** | **48** | **230** | **28.7%** | **PASS** |

#### Forms 2–5 Answer Distribution (CRITICAL FAILURE)

Forms 2–5 have a severe 'B' bias. Nearly all questions across CARS, B/B, and P/S sections in forms 2–5 are answered 'B', with 'D' answers almost entirely absent.

| Form | Section | B Count | Total | B% | Status |
|------|---------|---------|-------|----|--------|
| 2 | C/P | 29 | 59 | 49.2% | FAIL |
| 2 | CARS | 52 | 53 | 98.1% | FAIL |
| 2 | B/B | 51 | 59 | 86.4% | FAIL |
| 2 | P/S | 44 | 59 | 74.6% | FAIL |
| **2** | **TOTAL** | **176** | **230** | **76.5%** | **FAIL** |
| 3 | C/P | 37 | 59 | 62.7% | FAIL |
| 3 | CARS | 47 | 53 | 88.7% | FAIL |
| 3 | B/B | 42 | 59 | 71.2% | FAIL |
| 3 | P/S | 43 | 59 | 72.9% | FAIL |
| **3** | **TOTAL** | **169** | **230** | **73.5%** | **FAIL** |
| 4 | C/P | 26 | 59 | 44.1% | FAIL |
| 4 | CARS | 37 | 53 | 69.8% | FAIL |
| 4 | B/B | 45 | 59 | 76.3% | FAIL |
| 4 | P/S | 40 | 59 | 67.8% | FAIL |
| **4** | **TOTAL** | **148** | **230** | **64.3%** | **FAIL** |
| 5 | C/P | 30 | 59 | 50.8% | FAIL |
| 5 | CARS | 37 | 53 | 69.8% | FAIL |
| 5 | B/B | 39 | 59 | 66.1% | FAIL |
| 5 | P/S | 35 | 59 | 59.3% | FAIL |
| **5** | **TOTAL** | **141** | **230** | **61.3%** | **FAIL** |

> **Root cause:** Forms 2–5 subsection files (p01–p05, p06–p09/p10, discretes) were populated with a very high proportion of 'B' correct answers. For example, `form-2/cars-p01-p05.ts` has 30 'B' out of 30 questions (100%). Form 1 does not exhibit this problem (28.7% B overall). This appears to be a systematic issue in how forms 2–5 were generated — likely placeholder or template 'B' answers were never replaced.

#### QB Answer Distribution

| Section | A | B | C | D | Total | B% | Status |
|---------|---|---|---|---|-------|----|--------|
| C/P     | 34 | 72 | 52 | 22 | 180 | 40.0% | WARN |
| CARS    | 27 | 63 | 48 | 22 | 160 | 39.4% | PASS |
| B/B     | 38 | 67 | 45 | 30 | 180 | 37.2% | PASS |
| P/S     | 26 | 97 | 36 | 21 | 180 | 53.9% | FAIL |
| **Total** | **125** | **299** | **181** | **95** | **700** | **42.7%** | **FAIL** |

- QB P/S (psych-soc): 53.9% B answers — exceeds 40% threshold — **FAIL**
  - psych-soc-2.ts: 33/44 = 75% B
  - psych-soc-3.ts: 28/44 = 63.6% B
- QB C/P: 40.0% B — exactly at threshold — **WARN**
- QB overall B = 42.7% — **FAIL**

---

## 5. Passage Reference Audit

All passage `id` values vs `passageId` references checked for all 5 forms, all 4 sections.

| Form | C/P | CARS | B/B | P/S | Status |
|------|-----|------|-----|-----|--------|
| 1 | 10 passages, all matched | 9 passages, all matched | 10 passages, all matched | 10 passages, all matched | PASS |
| 2 | 10 passages, all matched | 9 passages, all matched | 10 passages, all matched | 9 passages, all matched | PASS |
| 3 | 10 passages, all matched | 9 passages, all matched | 10 passages, all matched | 9 passages, all matched | PASS |
| 4 | 10 passages, all matched | 9 passages, all matched | 10 passages, all matched | 9 passages, all matched | PASS |
| 5 | 10 passages, all matched | 9 passages, all matched | 10 passages, all matched | 9 passages, all matched | PASS |

**No orphaned passageId references — PASS**

---

## 6. CARS Logic Audit (No Figure/Table References in QB)

Checked for `the figure`, `the table`, `Figure 1`, `Table 1` in questions and answer choices in QB CARS files (cars.ts, cars-2.ts, cars-3.ts).

- No CARS QB questions reference "the figure" or "the table" in question stems or answer choices
- Passage text naturally uses these terms in context (acceptable)

**PASS**

Also checked form CARS sections (all 5 forms): no such references found.

---

## 7. Difficulty Distribution Audit (QB)

| Section | Easy | Medium | Hard | Total | Hard% | Status |
|---------|------|--------|------|-------|-------|--------|
| C/P     | 39   | 93     | 48   | 180   | 26.7% | PASS |
| CARS    | 26   | 79     | 55   | 160   | 34.4% | PASS |
| B/B     | 37   | 96     | 47   | 180   | 26.1% | PASS |
| P/S     | 48   | 95     | 37   | 180   | 20.6% | PASS |
| **Total** | **150** | **363** | **187** | **700** | **26.7%** | **PASS** |

Distribution: Easy=21.4%, Medium=51.9%, Hard=26.7% — well balanced. PASS

---

## 8. Blueprint Foundational Concept Coverage (QB)

### FC Format Inconsistency Warning

QB files use three different FC formats across files:
- `'FC1'`, `'FC2'`, ... `'FC10'` (bio-biochem-2/3, psych-soc-2/3)
- `'1: Biomolecules have unique properties'` (long-form, chem-phys.ts, bio-biochem.ts, psych-soc.ts)
- `'5'`, `'1'`, etc. (bare numeric strings, some files)

This is an inconsistency — the field has no enforced enum. Functional impact depends on whether the UI/filtering code normalizes the value.

### FC Numeric Coverage (numeric extraction from all formats)

| FC | Count | Section | Status |
|----|-------|---------|--------|
| 1 | 29 (FC1) + many long-form | C/P, B/B | PASS |
| 2 | 40 (FC2) + others | B/B | PASS |
| 3 | 8 (FC3) + others | B/B | PASS |
| 4 | present | C/P | PASS |
| 5 | present | C/P | PASS |
| 6 | 16 (FC6) + others | P/S | PASS |
| 7 | 21 (FC7) + others | P/S | PASS |
| 8 | 22 (FC8) + others | P/S | PASS |
| 9 | 27 (FC9) + others | P/S | PASS |
| 10 | 2 (FC10) + others | P/S | WARN (low count) |

> FC4 and FC5 are only present in C/P long-form strings; no bare `FC4`/`FC5` tags. FC10 has only 2 `FC10` entries (psych-soc-2.ts) but additional entries under long-form `'10: ...'` strings.

**Overall FC coverage: All 10 FCs present — PASS**
**Format inconsistency across QB files: WARN — consider normalizing to a single format**

---

## 9. Scientific Skill Distribution (QB)

| Section | Skill 1 | Skill 2 | Skill 3 | Skill 4 | Total |
|---------|---------|---------|---------|---------|-------|
| C/P     | 63 | 94 | 21 | 2 | 180 |
| CARS    | 62 | 84 | 13 | 1 | 160 |
| B/B     | 62 | 77 | 28 | 13 | 180 |
| P/S     | 70 | 83 | 20 | 7 | 180 |
| **Total** | **257** | **338** | **82** | **23** | **700** |

- Skill 4 (Data-based reasoning) is underrepresented: 23/700 = 3.3%
- AAMC blueprint typically targets Skill 4 at ~10% (70 questions for 700)
- Skill 3 (Reasoning About Design) also below expected (~12% AAMC target)
- Skill 2 dominant: 338/700 = 48.3%

**WARN — Skill 3 and Skill 4 underrepresented relative to AAMC targets**

---

## 10. Form Passage Count Audit

### Expected: C/P=10, CARS=9, B/B=10, P/S=9-10

| Form | C/P | CARS | B/B | P/S | Status |
|------|-----|------|-----|-----|--------|
| 1    | 10  | 9    | 10  | 10  | PASS   |
| 2    | 10  | 9    | 10  | 9   | PASS   |
| 3    | 10  | 9    | 10  | 9   | PASS   |
| 4    | 10  | 9    | 10  | 9   | PASS   |
| 5    | 10  | 9    | 10  | 9   | PASS   |

**PASS — all passage counts within expected ranges**

---

## Summary

| Check | Result |
|-------|--------|
| 1. Form question counts (5×230) | PASS |
| 2. QB counts (700 total, 180/160/180/180) | PASS |
| 3. Duplicate ID audit | PASS |
| 4a. Form 1 answer distribution | PASS |
| 4b. Form 2 answer distribution | **FAIL — 76.5% B** |
| 4c. Form 3 answer distribution | **FAIL — 73.5% B** |
| 4d. Form 4 answer distribution | **FAIL — 64.3% B** |
| 4e. Form 5 answer distribution | **FAIL — 61.3% B** |
| 4f. QB C/P answer distribution | WARN (40.0% B) |
| 4g. QB CARS answer distribution | PASS |
| 4h. QB B/B answer distribution | PASS |
| 4i. QB P/S answer distribution | **FAIL — 53.9% B** |
| 5. Passage reference integrity | PASS |
| 6. CARS figure/table logic | PASS |
| 7. QB difficulty distribution | PASS |
| 8. FC blueprint coverage | PASS (WARN: format inconsistency) |
| 9. Scientific skill distribution | WARN (Skill 3/4 underrepresented) |
| 10. Form passage counts | PASS |

---

## Critical Issues (Must Fix Before Release)

### CRITICAL — Forms 2–5 Answer Distribution Bias

**Forms 2, 3, 4, 5 have a severe 'B' answer bias that will be immediately obvious to test-takers and invalidates the exams.**

Evidence:
- Form 2 `cars-p01-p05.ts`: 30/30 questions answered 'B' (100%)
- Form 2 `cars-p06-p09.ts`: 22/23 questions answered 'B' (95.7%)
- Form 2 `bio-biochem-p01-p05.ts`: 23/25 answered 'B'
- Across forms 2–5, 'D' is nearly absent from CARS, B/B, and P/S sections

This suggests the answer keys for forms 2–5 (except form 1 and the C/P section which show better balance) contain placeholder or default 'B' values that were never verified against actual answer choices.

**Action required:** Full answer key review for forms 2–5. Each question's `correctAnswer` must be verified against its actual `options` array.

### HIGH — QB P/S Answer Bias

QB psych-soc-2.ts (75% B) and psych-soc-3.ts (63.6% B) skew the entire P/S QB section to 53.9% B. Students drilling the QB will develop a 'B' bias for P/S questions.

**Action required:** Review psych-soc-2.ts and psych-soc-3.ts answer keys.

---

## Warnings (Should Fix)

- **FC format inconsistency:** Three different formats (`FC1`, `'1'`, `'1: long description'`) across QB files. Normalize to one schema before any filtering/taxonomy UI is built.
- **Skill 4 underrepresentation:** Only 23/700 QB questions tagged Skill 4 (3.3% vs AAMC ~10% target). Skill 3 also low at 82/700 (11.7% vs ~15% target).
- **QB CP at 40.0% B:** Exactly at threshold. Small additional B-skewed additions could push it over.
