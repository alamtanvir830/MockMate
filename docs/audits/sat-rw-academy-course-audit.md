# SAT Reading & Writing Academy — Course Audit

_Audit date: 2026-07-21_

## Executive summary

The SAT R&W Academy is **already a structured, adaptive mastery system**, not a content
library. It ships eleven fully authored skill lessons, three full-length capstones, a
diagnostic, mixed practice, a mastery check, a spaced-repetition Review Queue, vocabulary
and reading-speed trainers, a glossary, and an admin content-report pipeline. Progress and
attempts are persisted server-side in Supabase with RLS, and all content routes are gated
behind `hasSatPremium`.

The lesson model is **skill-based**, not the generic "11-section lesson" shape described in
the overhaul brief, but each skill lesson already contains functional equivalents of every
required section (see mapping below). Content volume is substantial (429–704 lines per skill
file; 10–15 authored questions each).

**Conclusion: retain the existing architecture.** Building the parallel
`academy_lesson_progress` / `academy_practice_attempts` tables and `/api/academy/progress`
routes from the brief would duplicate working infrastructure and risk regressions. The audit
recommends targeted improvements instead.

## Routes

| Route | Purpose | Status |
|---|---|---|
| `/sat-rw-academy` | Course home (`AcademyHome.tsx`, 69 KB) — resume card, unit path, review-due, weak skills, capstones, final mastery | Functional |
| `/sat-rw-academy/reading` | Reading skills hub | Functional |
| `/sat-rw-academy/writing` | Writing skills hub | Functional |
| `/sat-rw-academy/lesson/[skillSlug]` | Per-skill lesson (Overview / Strategy / Traps / Guided Examples / Drill / Mastery tabs) | Functional |
| `/sat-rw-academy/diagnostic` | Adaptive diagnostic | Functional |
| `/sat-rw-academy/mixed-practice` | Cross-skill mixed drill | Functional |
| `/sat-rw-academy/mastery-check` | Final mastery check | Functional |
| `/sat-rw-academy/capstones` + `/capstones/[id]` | 3 full 54-question timed capstones | Functional (all 3 live) |
| `/sat-rw-academy/review` | Spaced-repetition Review Queue | Functional |
| `/sat-rw-academy/vocabulary` | Vocabulary trainer | Functional |
| `/sat-rw-academy/reading-speed` | Reading-speed trainer | Functional |
| `/sat-rw-academy/glossary` | Term glossary | Functional |
| `/admin/sat-rw-academy/content-reports` | Admin review of user-reported content issues | Functional |

## Content location

All lesson content is authored in TypeScript under `lib/academy/`:

- `lib/academy/reading/*.ts` — 7 reading skills
- `lib/academy/writing/*.ts` — 4 writing skills
- `lib/academy/capstones/*.ts` — capstones 1–3 (each ~1,100–1,400 lines / 54 questions)
- `lib/academy/vocabulary/`, `lib/academy/glossary/`, `lib/academy/passages/`
- `lib/academy/diagnostic-questions*.ts`

The `AcademySkill` type (`lib/academy/types.ts`) is the unit of content.

## Section coverage mapping

Every skill's `AcademySkill` object provides functional equivalents of the brief's 11 sections:

| Brief section | Existing field | Present? |
|---|---|---|
| Objective | `overview.whatItTests` + `overview.howItAppears` | Yes (implicit) |
| Teaching | `overview.*` (4 facets) | Yes |
| Worked examples | `guidedExamples[]` (stepped, with wrong-answer analysis) | Yes (3–5 each) |
| Common mistakes | `commonTraps[]` (title / description / avoidance) | Yes (3+ each) |
| Strategy | `strategy.steps` + `timeSavingTip` + `whenNotToOverthink` | Yes |
| Knowledge check | Mixed Recognition Check (3 cross-skill Qs after drill) | Yes |
| Practice | `drillQuestions[]` (difficulty-tagged, wrong-answer analysis, teaching point) | Yes (10+ each) |
| Mastery score | `computeMastery()` (difficulty-weighted, server attempts) | Yes |
| Recommendation | `getNextStep()` logic in `AcademyHome.tsx` | Yes |
| Not placeholder | — | Confirmed non-placeholder |
| Premium gated | `hasSatPremium` on every API route | Yes |

The only structural gap versus the brief: no explicit single-sentence "By the end of this
lesson you will be able to…" objective string. This is cosmetic; content already conveys the
objective through the overview facets.

## Security posture (verified)

- All academy API routes call `supabase.auth.getUser()` then `hasSatPremium(user)`.
- Mastery is computed **server-side** in `lib/academy/mastery.ts` from persisted attempts;
  the client never supplies a mastery number.
- RLS policies restrict every academy table to `auth.uid() = user_id`.
- Answer keys live in server-imported content modules.
- Admin content-report review is service-role gated.

## Gaps and recommendations

1. **Dead "Coming Soon" branch for Capstone 3** in `AcademyHome.tsx` — `cap3.available` is
   now `true` from the API, so the `coming_soon` override is unreachable. Harmless but stale.
2. **No explicit lesson objective sentence.** Optional cosmetic enhancement.
3. Otherwise: **retain**. R&W Academy is complete and functional.

## Action taken this pass

No R&W content changes were required — the eleven skill lessons, three capstones, and mastery
infrastructure are complete and non-placeholder. Work this pass focused on the Math Academy,
which had a genuine Desmos-integration content gap (see the math audit).
