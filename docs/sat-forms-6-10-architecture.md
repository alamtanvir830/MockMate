# SAT Forms 6–10 Architecture Inventory

Branch: `feat/sat-forms-6-through-10`
Audit date: 2026-08-04
Starting commit: `04c7fe2`

---

## 1. Content Versioning System

Two immutable parallel content generations exist:
- **V1** (original): `lib/premade-exams/sat/` — frozen permanently
- **V2** (current): `lib/premade-exams/sat/v2/` — active generation for all new attempts

Version constants (`lib/premade-exams/sat/version-constants.ts`):
```ts
SAT_CONTENT_VERSION_V1 = 1 as const
SAT_CONTENT_VERSION_V2 = 2 as const
CURRENT_SAT_CONTENT_VERSION: SATContentVersion = 2
normalizeSatContentVersion(value: unknown): SATContentVersion   // missing/null → V1
```

**Forms 6–10 have no pre-existing V1**: their V1 stub files will re-export the V2 content.
This is safe because `normalizeSatContentVersion` only returns V1 for `null`/`undefined`, and
no historical attempts exist for Forms 6–10 yet. New attempts always start at V2.

---

## 2. Question Schemas

### RWQuestion
```ts
interface RWQuestion {
  id: string                      // e.g. 'sat-f6-v2-rw-m1-q01' (must contain '-v2-')
  section: 'reading-writing'
  moduleId: string                // e.g. 'f6v2-rw-module-1'
  domain: RWDomain
  skill: RWSkill
  difficulty: Difficulty          // 'easy' | 'medium' | 'hard'
  stimulus: string                // passage text, 25–150 words
  graphData?: SATGraphData        // optional table/chart
  underlineTargets?: string[]     // phrases marked "underlined"
  question: string
  choices: Choice[]               // [{ label: 'A'|'B'|'C'|'D', text: string }, ...]
  correctAnswer: ChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<ChoiceLabel, string>>
}
```

### MathMCQuestion
```ts
interface MathMCQuestion {
  id: string                      // e.g. 'sat-f6-v2-math-m1-q01'
  section: 'math'
  moduleId: string
  domain: MathDomain
  skill: string
  difficulty: Difficulty
  type: 'multiple_choice'
  stimulus?: string               // optional context paragraph
  graphData?: SATGraphData
  question: string
  choices: Choice[]
  correctAnswer: ChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<ChoiceLabel, string>>
}
```

### MathGridInQuestion
```ts
interface MathGridInQuestion {
  id: string
  section: 'math'
  moduleId: string
  domain: MathDomain
  skill: string
  difficulty: Difficulty
  type: 'grid_in'
  stimulus?: string
  graphData?: SATGraphData
  question: string
  correctAnswer: string           // primary accepted answer string
  acceptableAnswers: string[]     // all acceptable string values
  explanation: string
  scoringNotes?: string
}
```

---

## 3. Form File Structure

Each form in `v2/` follows this exact pattern:

```ts
// VERSION 2 — immutable content generation. Do not modify.
import type { SATForm } from '../types'
import { f{N}RwModule1QuestionsV2 }      from './form-{N}-rw-module-1'
import { f{N}RwModule2EasyQuestionsV2 }  from './form-{N}-rw-module-2-easy'
import { f{N}RwModule2HardQuestionsV2 }  from './form-{N}-rw-module-2-hard'
import { f{N}MathModule1QuestionsV2 }    from './form-{N}-math-module-1'
import { f{N}MathModule2EasyQuestionsV2 } from './form-{N}-math-module-2-easy'
import { f{N}MathModule2HardQuestionsV2 } from './form-{N}-math-module-2-hard'

export const satForm{N}V2: SATForm = {
  id: 'sat-form-{N}',
  title: 'SAT Practice Test {N}',
  description: 'Full-length adaptive SAT practice exam',
  disclaimer: 'This is an unofficial practice test created for educational purposes. ...',
  totalQuestions: 98,
  totalTimeMinutes: 134,
  rwRoutingThreshold: 17,
  mathRoutingThreshold: 14,
  sections: [rw section (27+27+27), math section (22+22+22)]
}
```

**Module IDs pattern:** `f{N}v2-rw-module-1`, `f{N}v2-rw-module-2-easy`, `f{N}v2-rw-module-2-hard`,
`f{N}v2-math-module-1`, `f{N}v2-math-module-2-easy`, `f{N}v2-math-module-2-hard`

**Question ID pattern:** `sat-f{N}-v2-rw-m1-q{##}`, `sat-f{N}-v2-rw-m2e-q{##}`,
`sat-f{N}-v2-rw-m2h-q{##}`, `sat-f{N}-v2-math-m1-q{##}`, `sat-f{N}-v2-math-m2e-q{##}`,
`sat-f{N}-v2-math-m2h-q{##}`

---

## 4. SAT Form Resolver

File: `lib/premade-exams/sat/sat-form-resolver.ts`

**Required changes for Forms 6–10:**
1. Fix regex: `/sat-form-(\d)$/` → `/sat-form-(\d+)$/` (Form 10 has two-digit number)
2. Import and add `satForm{N}` and `satForm{N}V2` for forms 6–10 to both registries

---

## 5. Files That Assume 1–5 / Must Be Updated

### Hard blockers (reject forms 6–10 at runtime):

| File | Line | Current | Required change |
|------|------|---------|-----------------|
| `app/api/sat/in-progress/route.ts` | 24 | `n <= 5` | `n <= 10` |
| `app/api/sat/module-feedback/route.ts` | 29 | `[1,2,3,4,5]` | `[1,2,3,4,5,6,7,8,9,10]` |
| `lib/premade-exams/sat/sat-form-resolver.ts` | 59 | `/sat-form-(\d)$/` | `/sat-form-(\d+)$/` |
| `app/api/academy/sat-forms/route.ts` | 5 | `[1,2,3,4,5]` | extend to include 6–10 |

### Entitlement gaps in APIs (forms 6–10 fall through to unguarded upsert):

| File | Required change |
|------|----------------|
| `app/api/sat/in-progress/route.ts` | Add Premium check for forms 6–10 |
| `app/api/premade/save-attempt/route.ts` | Add Premium check for forms 6–10 |

### Form registration (must happen after module files exist):

| File | Required change |
|------|----------------|
| `lib/premade-exams/sat/sat-form-resolver.ts` | Import + add to V1_FORMS and V2_FORMS |

### Per-form page files to create:

For each N ∈ {6, 7, 8, 9, 10}:
- `app/(dashboard)/premade/sat/form-{N}/page.tsx`
- `app/(dashboard)/premade/sat/form-{N}/SATExamTakerClient.tsx`
- `app/(dashboard)/premade/sat/form-{N}/results/[attemptId]/page.tsx`
- `app/(dashboard)/premade/sat/form-{N}/results/[attemptId]/SATForm{N}ResultsClient.tsx`

### UI / copy updates (after QA passes):

| File | Current | Required |
|------|---------|----------|
| `app/(dashboard)/premade/sat/page.tsx` | 5 form cards, `xl:grid-cols-5` | Add 5 form cards |
| `app/(dashboard)/dashboard/page.tsx` | "5 full-length", "Forms 1–5" | "10 full-length", "Forms 1–10" |
| `lib/sat-premium-features.ts` | `'SAT Practice Test Forms 1–5'` | Update |
| `app/(marketing)/page.tsx` | "5 full-length" | "10 full-length" |
| `app/(marketing)/digital-sat-prep/page.tsx` | "5 full" | Update |

### Test files requiring updates (loop bounds):

| File | Lines | Current upper bound | Required |
|------|-------|---------------------|----------|
| `__tests__/sat-versioning/sat-content-versioning.test.ts` | 139,147,162,172,183,199,205 | `5` | `10` |

---

## 6. Database: No Schema Changes Required

After inspecting all migrations, **no CHECK constraints block form numbers 6–10**:

- `standardized_exam_attempts.form_number int NOT NULL` — no range check
- `standardized_exam_responses.form_number int NOT NULL` — no range check
- `sat_in_progress_attempts.form_number int NOT NULL` — no range check (unique per user+form)
- `sat_exam_module_feedback.form_number integer not null` — no range check (only API-layer check)
- `sat_form3_promotion.form_number CHECK (form_number = 3)` — unrelated; only form 3
- No enum types constrain form numbers

**Verification SQL to confirm no hidden constraints:**
```sql
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid IN (
  'standardized_exam_attempts'::regclass,
  'standardized_exam_responses'::regclass,
  'sat_in_progress_attempts'::regclass,
  'sat_exam_module_feedback'::regclass
)
AND contype IN ('c', 'u');
```

**Conclusion: No SQL migration is required.**

---

## 7. Module Content Files to Create

### Form 6 — 6 files, 147 questions:
- `lib/premade-exams/sat/v2/form-6-rw-module-1.ts` — 27 RW questions
- `lib/premade-exams/sat/v2/form-6-rw-module-2-easy.ts` — 27 RW questions
- `lib/premade-exams/sat/v2/form-6-rw-module-2-hard.ts` — 27 RW questions
- `lib/premade-exams/sat/v2/form-6-math-module-1.ts` — 22 Math questions
- `lib/premade-exams/sat/v2/form-6-math-module-2-easy.ts` — 22 Math questions
- `lib/premade-exams/sat/v2/form-6-math-module-2-hard.ts` — 22 Math questions

### Forms 7–10 — same file pattern, 147 questions each.

---

## 8. Scoring

Score conversion is **not form-specific**. `sat-score-conversion.ts` contains shared tables
for 0–54 raw RW and 0–44 raw Math. No changes needed for Forms 6–10.

Routing thresholds:
- `rwRoutingThreshold: 17` (same as Forms 2–5; ≥17 correct → hard Module 2)
- `mathRoutingThreshold: 14` (same as Forms 2–5; ≥14 correct → hard Module 2)

---

## 9. Attempt Store

`lib/premade-exams/sat/attempt-store.ts`:
- Storage key: `mockmate_premade_attempts_v1` in localStorage
- No form-number range constraint in the store
- `examId` pattern: `'sat-form-{N}'` — any string is accepted
- `contentVersion` normalized via `normalizeSatContentVersion()`

---

## 10. Access Model for Forms 6–10

All five new forms will be **Premium-only** (same as Form 5). No free window.

Access check pattern (same as Forms 2 and 5):
```ts
if (body.formNumber >= 6 && body.formNumber <= 10 && !isAdmin) {
  const { satUpgradeUnlocked } = await getEntitlements()
  if (!satUpgradeUnlocked) {
    return NextResponse.json({ error: 'SAT Premium is required for this form.' }, { status: 403 })
  }
}
```

Lobby page pattern:
```tsx
const { satUpgradeUnlocked } = await getEntitlements()
if (!satUpgradeUnlocked) {
  return <UpgradeGate title="SAT Form {N} — Locked" description="..." />
}
return <SATExamTakerClient />
```

---

## 11. Results Architecture

Results pages use a per-form client component pattern. Each form {N} has:
- `SATForm{N}ResultsClient.tsx` — reads localStorage, renders `SATResults` component
- `page.tsx` — server component, checks auth + entitlements, renders client

Non-premium users who completed an attempt retain Results access (same policy as existing forms).

---

## 12. Exam History and Forms Page

`app/(dashboard)/premade/sat/page.tsx` (715 lines, no loop) must have 5 new JSX card blocks
added, one per form. Each Premium card uses the same locked/unlocked pattern.

`app/api/academy/sat-forms/route.ts` drives the Academy dashboard view and must have
`SAT_FORM_NUMBERS` extended to include 6–10.

---

## 13. What Does NOT Need to Change

- `lib/premade-exams/sat/sat-score-conversion.ts` — shared, form-agnostic
- `lib/premade-exams/sat/attempt-store.ts` — no form constraint
- `lib/premade-exams/sat/version-constants.ts` — shared V2 constant covers all forms
- `lib/premade-exams/sat/form1-access.ts` — Form 1 specific
- `lib/premade-exams/sat/form3-access.ts` — Form 3 specific
- `lib/premade-exams/sat/form4-access.ts` — Form 4 specific
- All Stripe configuration
- All MCAT/SHSAT files
- All existing Forms 1–5 content files
- Database schema (no constraints blocking 6–10)
- `SATExamTaker` component — generic, uses `form` prop
- `SATResults` component — generic, uses attempt data
