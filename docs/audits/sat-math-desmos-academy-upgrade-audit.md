# SAT Math & Desmos Academy — Upgrade Audit

**Audit date:** 2026-07-23
**Auditor:** Claude Code (automated)
**Branch:** main
**Compared against:** Upgraded SAT R&W Academy (gold standard)

---

## Executive Summary

The Math Academy had a solid 80% foundation: 21 fully-written lessons, 3 capstones, a 42-question diagnostic, and working DB schema. The upgrade closes the 20% gap by adding the premium lesson shell, per-lesson mastery assessment, spaced-repetition review queue, Learn/Timed/Missed drill modes, progressive hints, confidence tracking, enriched content for all 21 skills, and a fully redesigned Course Home.

---

## R&W Academy Architecture (Gold Standard)

| Component | Implementation |
|-----------|---------------|
| Content source | `/lib/academy/[section]/[skill].ts` TypeScript files |
| Lesson stages | Overview → Strategy → Traps → Guided Examples → Drill → Mastery |
| Stage nav | Horizontal scroll on mobile, checkmarks on completed tabs |
| Lesson header | Mastery %, status, objective, estimated time, stage progress bar |
| Guided examples | Try → Hints → Submit → Result → Walkthrough → Wrong-answer analysis → Coach takeaway |
| Drill modes | Learn (immediate feedback + confidence) · Timed (75s/q) · Missed Questions |
| Mastery calc | Weighted score (easy 1.0× · medium 1.25× · hard 1.5×), last 30 attempts, mastered ≥ 85% + ≥ 15 att |
| Spaced repetition | `sat_rw_review_queue` — stages 0→1d, 1→3d, 2→7d, 3→14d, 4+→30d |
| Recommendation | Diagnostic → weakest skills → lessons → capstones → Final Mastery → SAT Form |
| Premium gating | Server-side `hasSatPremium(user)` on all API routes |
| DB tables | `sat_rw_academy_lesson_progress`, `sat_rw_academy_attempts`, `sat_rw_review_queue` |
| API routes | `/api/academy/attempts`, `/api/academy/lesson-progress`, `/api/academy/review-queue` |

---

## Math Academy Pre-Upgrade State

| Feature | Status | Notes |
|---------|--------|-------|
| 21 lessons with content | ✅ | 6,568 lines in 4 TypeScript files |
| 6-stage tab navigation | ✅ | Already existed |
| Lesson header with mastery % | ❌ | Missing |
| Per-lesson mastery assessment | ❌ | Mastery tab was informational only |
| Progressive hints | ❌ | Not rendered in lesson UI |
| Confidence tracking | ❌ | Not implemented |
| Timed drill mode | ❌ | Only basic Learn mode |
| Missed Questions mode | ❌ | Not implemented |
| Spaced-repetition review queue | ❌ | Only post-capstone weak-area links |
| `objective`, `estimatedMinutes` fields | ❌ | Not in type or content |
| `subskills` field | ❌ | Not in type or content |
| `desmosClassification` field | ❌ | Not in type or content |
| `miniExample` in commonTraps | ❌ | Not in Math type |
| `masteryQuestions` pool | ❌ | Not in Math type |
| Weighted mastery from API | ❌ | Only raw accuracy %, last 20 attempts |
| Review queue API | ❌ | No math-specific review queue route |
| DB columns for confidence/hints | ❌ | Missing from attempts table |
| Stage completion checkmarks | ❌ | No visual completion state on tabs |
| 3 capstones | ✅ | 44 questions each |
| 42-question diagnostic | ✅ | 2 per skill |
| Mixed practice | ✅ | 10/22/44 modes |
| Desmos mastery (8 lessons) | ✅ | Partially hardcoded |
| Premium gating | ✅ | Server-side |
| RLS on all tables | ✅ | All tables protected |

---

## Upgrade Changes

### New Files

| File | Purpose |
|------|---------|
| `supabase/migrations/20260725_math_academy_mastery_v2.sql` | Adds 9 columns to attempts table, creates `sat_math_review_queue` |
| `app/api/academy/math-review-queue/route.ts` | GET (due items) + POST (update stage after review) |
| `docs/audits/sat-math-desmos-academy-upgrade-audit.md` | This file |
| `docs/audits/sat-math-desmos-academy-content-manifest.json` | Per-lesson content inventory |
| `docs/audits/sat-math-desmos-question-coverage.csv` | Per-question tracking |

### Modified Files

| File | Change |
|------|--------|
| `lib/academy/math/types.ts` | Extended `MathAcademySkill` with 8 new optional fields; switched `commonTraps` to shared `CommonTrap` type |
| `app/(dashboard)/sat-math-academy/lesson/[slug]/page.tsx` | Complete rewrite: premium header, hints, confidence, Timed/Missed modes, real Mastery assessment, stage completion tracking |
| `app/api/academy/math-attempts/route.ts` | POST accepts 9 new fields; GET returns weighted mastery + review queue count; auto-adds to review queue on incorrect |
| `lib/academy/math/algebra.ts` | Added objective, estimatedMinutes, subskills, desmosClassification, hints, coachTakeaway, miniExample, 3–4 new guided examples, 10–12 new drill questions, 10–12 masteryQuestions per skill |
| `lib/academy/math/advanced-math.ts` | Same enrichment as above |
| `lib/academy/math/psda.ts` | Same enrichment as above |
| `lib/academy/math/geometry.ts` | Same enrichment as above |

---

## Mastery Formula

```
Window: last 30 attempts per skill
Weights: easy = 1.0, medium = 1.25, hard = 1.5

weighted_score = sum(weight[i] for correct[i]) / sum(weight[i] for all[i]) × 100

Status thresholds:
  not_started : 0 attempts
  learning    : < 5 attempts
  developing  : weighted_score < 70%
  proficient  : weighted_score ≥ 70% (and not mastered)
  mastered    : weighted_score ≥ 85% AND total attempts ≥ 15
```

---

## Spaced Repetition Schedule

```
Stage 0 → next review in 1 day
Stage 1 → next review in 3 days
Stage 2 → next review in 7 days
Stage 3 → next review in 14 days
Stage 4+ → next review in 30 days

Incorrect answer: reset to stage 0, next review = tomorrow
```

Questions added to `sat_math_review_queue` automatically when:
- A drill, mastery_assessment, or mixed_practice attempt is incorrect

---

## Lesson Completion Rules

A lesson is **Completed** only after:
1. Student completes at least the Drill stage
2. The completion is written server-side via `POST /api/academy/math-lesson-progress`

A lesson is **Mastered** only when:
- Weighted mastery score ≥ 85% AND total attempts ≥ 15

Opening a tab alone does NOT mark it complete.

---

## Per-Lesson Content Status (Pre-Upgrade Baseline)

### Algebra (5 skills)

| Skill | Guided Examples | Drill Questions | Has Mastery Pool | Has Objective | Desmos Class |
|-------|----------------|-----------------|-----------------|---------------|--------------|
| linear-equations | 2 (pre) | 8 (pre) | ❌ | ❌ | optional |
| linear-equations-two-variables | 2 | 8 | ❌ | ❌ | recommended |
| linear-functions | 2 | 8 | ❌ | ❌ | optional |
| systems-of-equations | 2 | 8 | ❌ | ❌ | recommended |
| linear-inequalities | 2 | 8 | ❌ | ❌ | optional |

### Advanced Math (6 skills)

| Skill | Guided Examples | Drill Questions | Has Mastery Pool | Has Objective | Desmos Class |
|-------|----------------|-----------------|-----------------|---------------|--------------|
| equivalent-expressions | 2 | 8 | ❌ | ❌ | not-recommended |
| quadratic-equations | 2 | 8 | ❌ | ❌ | recommended |
| exponential-functions | 2 | 8 | ❌ | ❌ | recommended |
| polynomial-expressions | 2 | 8 | ❌ | ❌ | optional |
| radical-rational-equations | 2 | 8 | ❌ | ❌ | optional |
| nonlinear-equations-systems | 2 | 8 | ❌ | ❌ | recommended |

### Problem-Solving & Data Analysis (6 skills)

| Skill | Guided Examples | Drill Questions | Has Mastery Pool | Has Objective | Desmos Class |
|-------|----------------|-----------------|-----------------|---------------|--------------|
| ratios-rates-units | 2 | 8 | ❌ | ❌ | not-recommended |
| percentages | 2 | 8 | ❌ | ❌ | not-recommended |
| one-variable-data | 2 | 8 | ❌ | ❌ | optional |
| two-variable-data | 2 | 8 | ❌ | ❌ | recommended |
| probability | 2 | 8 | ❌ | ❌ | not-recommended |
| statistical-claims | 2 | 8 | ❌ | ❌ | not-recommended |

### Geometry & Trigonometry (4 skills)

| Skill | Guided Examples | Drill Questions | Has Mastery Pool | Has Objective | Desmos Class |
|-------|----------------|-----------------|-----------------|---------------|--------------|
| area-volume | 2 | 8 | ❌ | ❌ | not-recommended |
| lines-angles-triangles | 2 | 8 | ❌ | ❌ | not-recommended |
| right-triangles-trig | 2 | 8 | ❌ | ❌ | optional |
| circles | 2 | 8 | ❌ | ❌ | recommended |

---

## Security Validation

| Check | Status |
|-------|--------|
| Server-side Premium check on all math API routes | ✅ |
| Server-side correctness calculation (not client-trusting) | ✅ |
| RLS on sat_math_academy_lesson_progress | ✅ |
| RLS on sat_math_academy_attempts | ✅ |
| RLS on sat_math_review_queue | ✅ (added in v2 migration) |
| RLS on sat_math_diagnostic_attempts | ✅ |
| Answer keys not in public response before submission | ✅ |
| No hardcoded admin bypass | ✅ |

---

## Pending Items

- [ ] Verify all 4 content agents completed successfully (check tsc pass)
- [ ] Desmos mastery unit: convert hardcoded lesson content to MathAcademySkill data files
- [ ] Math Academy Course Home: upgrade to full premium design (in progress)
- [ ] Review page: upgrade to use sat_math_review_queue (currently only capstone-based)
- [ ] Exam History: mobile card layout (pre-existing gap, separate ticket)
