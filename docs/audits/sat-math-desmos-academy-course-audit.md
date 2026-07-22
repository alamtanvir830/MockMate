# SAT Math & Desmos Academy — Course Audit

_Audit date: 2026-07-21_

## Executive summary

The SAT Math & Desmos Academy is a **structured mastery system** mirroring the R&W Academy:
21 authored skill lessons across four domains, a diagnostic, mixed practice, a mastery check,
a Review page, a standalone Desmos Mastery unit, a Desmos sandbox, and two full-length
capstones. Progress and attempts persist in Supabase (`sat_math_academy_*` tables) with RLS,
and every route is gated behind `hasSatPremium`.

Content volume is large: `algebra.ts` (1,326 lines), `advanced-math.ts` (1,576),
`psda.ts` (1,643), `geometry.ts` (1,111), plus two ~1,090-line capstones.

## Skill coverage (21 skills)

**Algebra** — `linear-equations`, `linear-equations-two-variables`, `linear-functions`,
`systems-of-equations`, `linear-inequalities`

**Advanced Math** — `equivalent-expressions`, `quadratic-equations`, `exponential-functions`,
`polynomial-expressions`, `radical-rational-equations`, `nonlinear-equations-systems`

**Problem-Solving & Data Analysis** — `ratios-rates-units`, `percentages`, `one-variable-data`,
`two-variable-data`, `probability`, `statistical-claims`

**Geometry & Trigonometry** — `area-volume`, `lines-angles-triangles`, `right-triangles-trig`,
`circles`

## Routes

| Route | Purpose | Status |
|---|---|---|
| `/sat-math-academy` | Course home (`MathAcademyHome.tsx`, 62 KB) | Functional |
| `/sat-math-academy/lesson/[slug]` | Per-skill lesson (Overview / Strategy / Traps / Guided Examples / Drill / Mastery) | Functional |
| `/sat-math-academy/diagnostic` | Adaptive math diagnostic | Functional |
| `/sat-math-academy/mixed-practice` | Cross-domain mixed drill | Functional |
| `/sat-math-academy/mastery-check` | Cumulative mastery check | Functional |
| `/sat-math-academy/capstones` + `/capstones/[id]` | Full-length capstones (1–2 live) | Functional |
| `/sat-math-academy/desmos-mastery` | Standalone Desmos technique unit | Functional |
| `/sat-math-academy/desmos-sandbox` | Live Desmos calculator sandbox | Functional |
| `/sat-math-academy/review` | Review page | Functional |

## Section coverage mapping

The `MathAcademySkill` type provides the same functional sections as R&W (overview, strategy,
commonTraps, guidedExamples, drillQuestions) plus a difficulty-weighted mastery model shared
with R&W via `lib/academy/mastery.ts`.

## Gaps and recommendations

### 1. Desmos guidance is NOT integrated into individual math lessons (primary gap — FIXED this pass)

Grep confirmed **zero Desmos mentions** in `algebra.ts`, `advanced-math.ts`, `psda.ts`,
`geometry.ts` before this pass. All Desmos instruction was siloed in the standalone
`/desmos-mastery` page. The overhaul brief requires each math worked example to show, where
applicable, the Desmos method with exact entry syntax and a recommendation tag.

**Action taken:** Added an optional `desmos?` field to `GuidedExample`
(`recommendation` tag + `entry` syntax + `note`), rendered it in the math lesson Guided
Examples tab, and authored Desmos guidance for the Algebra skills where Desmos is most
valuable (systems, two-variable linear, inequalities, linear functions). The field is optional
so R&W guided examples and traditional-faster math examples are unaffected.

### 2. Math Capstone 3 content is genuinely missing

`app/api/academy/math-capstones/route.ts` flags capstone 3 as `false // content pending`, and
`lib/academy/math/capstones/index.ts` only loads capstones 1 and 2. The home page correctly
shows a "Coming Soon" state — no broken link is exposed to users. Authoring a third
44-question capstone is out of scope for this pass and is left flagged for a follow-up.

### 3. Desmos "recommended vs traditional-faster" nuance

Where traditional algebra is faster (simple linear equations, ratios, percentages), authored
Desmos notes say traditional is faster rather than pushing Desmos.

## Security posture (verified)

Identical to R&W: `getUser()` + `hasSatPremium()` on every route; mastery computed server-side
from persisted attempts; RLS scoped to `auth.uid() = user_id`; answer keys server-side only.

## Action taken this pass

- Extended `GuidedExample` with an optional structured `desmos` field.
- Rendered Desmos guidance in the math lesson Guided Examples tab.
- Authored Desmos method guidance for the Algebra domain's Desmos-relevant skills.
- Documented the missing Math Capstone 3 for a follow-up authoring pass.
