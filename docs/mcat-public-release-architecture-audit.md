# MCAT Public Release — Architecture Audit

**Branch:** feat/mcat-forms-1-5-qbank-700  
**Starting main HEAD:** f991de5  
**Audit date:** 2026-08-09  
**Auditor:** Claude (automated audit + manual code inspection)

---

## 1. Current MCAT Routes

| Route | File | Status |
|-------|------|--------|
| `/mcat/dashboard` | `app/(dashboard)/mcat/dashboard/page.tsx` | Live — server component, no auth gate |
| `/premade/mcat` | `app/(dashboard)/premade/mcat/page.tsx` | Live — client, password gate (`downstate123`) |
| `/premade/mcat/form-1` | `app/(exam)/premade/mcat/form-1/page.tsx` | Live — client, sessionStorage gate |
| `/premade/mcat/form-1/results/[attemptId]` | `app/(dashboard)/premade/mcat/form-1/results/[attemptId]/page.tsx` | Live |
| `/question-bank/mcat` | `app/(dashboard)/question-bank/mcat/page.tsx` | Live |
| `/question-bank/mcat/results` | `app/(dashboard)/question-bank/mcat/results/page.tsx` | Live |
| `/question-bank/mcat/practice` | `app/(exam)/question-bank/mcat/practice/page.tsx` | Live |

**Missing routes (needed for public release):**
- `/premade/mcat/form-2` through `/premade/mcat/form-5`
- `/premade/mcat/form-2/results/[attemptId]` through `form-5/results/[attemptId]`

---

## 2. Form 1 Structure

**File:** `lib/premade-exams/mcat/form-1.ts` (assembles four section files)

| Section | File | Questions | Expected | Status |
|---------|------|-----------|----------|--------|
| Chem/Phys | `form-1-chem-phys.ts` (1,896 lines) | **59** | 59 | ✓ |
| CARS | `form-1-cars.ts` (1,558 lines) | **53** | 53 | ✓ |
| Bio/Biochem | `form-1-bio-biochem.ts` (1,844 lines) | **59** | 59 | ✓ |
| Psych/Soc | `form-1-psych-soc.ts` (1,828 lines) | **59** | 59 | ✓ |
| **Total** | | **230** | **230** | ✓ |

Form 1 is COMPLETE at required question counts.

---

## 3. Forms 2–5 Status

**Do not exist.** No content files, no route pages.  
Creating all four forms is the primary content task for this branch.

| Form | Content files | Routes | Status |
|------|-------------|--------|--------|
| Form 2 | None | None | NOT STARTED |
| Form 3 | None | None | NOT STARTED |
| Form 4 | None | None | NOT STARTED |
| Form 5 | None | None | NOT STARTED |

---

## 4. Passage Structure

MCATPassage in `lib/premade-exams/mcat/types.ts`:
```ts
MCATPassage {
  id: string
  sectionId: string
  title: string
  passageText: string
  figures?: MCATFigure[]    // MCATTableData | MCATFigureData
  questions: MCATQuestion[]
}
```

`MCATFigureData.description` is a text description (no SVG/canvas), which is Phase 1 approach.  
Tables render correctly via `MCATTableData` with headers + rows arrays.

**Gap:** No `contentVersion` or `sourceDeclaration` field on passages. Needed for public release.

---

## 5. MCATQuestion Schema

```ts
MCATQuestion {
  id: string
  sectionId: string
  passageId: string | null
  questionType: 'passage' | 'discrete'
  discipline: string
  contentCategory: string
  foundationalConcept: string
  scientificSkill: 'Skill 1' | 'Skill 2' | 'Skill 3' | 'Skill 4'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  choices: MCATChoice[]      // { label: 'A'|'B'|'C'|'D'; text: string }
  correctAnswer: MCATChoiceLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<MCATChoiceLabel, string>>
  teachingPoint: string
  relatedTopics: string[]
}
```

**Gaps:**
- No `contentVersion` field — needed for historical attempt resolution
- No `sourceDeclaration` field — needed for copyright audit trail
- `wrongAnswerExplanations` is `Partial<Record<...>>` — for quality all four choices should be explained

---

## 6. Section Timing

| Section | Time | Break after | Break type |
|---------|------|-------------|------------|
| Chem/Phys | 95 min | 10 min | short |
| CARS | 90 min | 30 min | long (mid-exam) |
| Bio/Biochem | 95 min | 10 min | short |
| Psych/Soc | 95 min | null | none |

`MCATSection.seededCount` allows for Phase 1 partial seeding — currently all sections are fully seeded (seededCount == questionCount == actual question count). This field can be removed or kept but should not show "Phase 1" warnings in production.

---

## 7. Timer Implementation — CRITICAL RISK

**Current timer in `MCATExamTaker.tsx`:**
```ts
timerRef.current = setInterval(() => {
  setSectionTimers(prev => {
    next[sIdx]--   // decrement in-memory counter
    ...
  })
}, 1000)
```

**Problem:** This is the same fragile `setInterval`-only pattern that caused SAT timer freezes. Browsers throttle `setInterval` in background tabs. React re-renders can skip ticks. There is no wall-clock reconciliation.

**SAT solution (in `SATExamTaker.tsx`):**
```ts
const deadlineMs = Date.now() + minutes * 60 * 1000
moduleDeadlineRef.current = deadlineMs
// On tab visibility change:
const remaining = Math.max(0, Math.floor((moduleDeadlineRef.current - Date.now()) / 1000))
```

The SAT stores `module_deadline_at` in Supabase `sat_in_progress_attempts` so the deadline survives browser refresh.

**Required fix:** Adopt the same deadline-timestamp pattern for MCAT timers.

---

## 8. Scoring Implementation

**File:** `lib/premade-exams/mcat/mcat-score-conversion.ts`

Piecewise linear approximation 118–132 per section:
- 0% → 118, 25% → 120, 50% → 125, 75% → 129, 90% → 131, 100% → 132

Total: 472–528 (sum of four sections).

Label used: "MockMate Estimated MCAT Score" ✓  
Disclaimer: "NOT an official AAMC score" ✓  
Monotone: Yes (higher raw % → higher score) ✓  
Percentile guide: References plausible AAMC-like values — labeled "Approximate percentile" ✓

**Gap:** No `scoringVersion` persisted with attempts. If calibration changes, old attempts will not know which curve they used.

---

## 9. Current Question Bank

**Files:** `lib/question-bank/mcat/`

| Section | Questions | Target | Gap |
|---------|-----------|--------|-----|
| Chem/Phys | **113** | 180 | -67 |
| CARS | **102** | 160 | -58 |
| Bio/Biochem | **103** | 180 | -77 |
| Psych/Soc | **92** | 180 | -88 |
| **Total** | **410** | **700** | **-290** |

**290 QB questions needed to reach 700 target.**

QB questions use `MCATQBQuestion` type (separate from exam questions) with:
- `id`, `test: 'MCAT'`, `section`, `discipline`, `contentCategory`, `foundationalConcept`, `scientificSkill`, `difficulty`, `questionType`
- `passageText?`, `tableData?`
- `question`, `choices`, `correctAnswer`, `explanation`, `wrongAnswerExplanations`, `teachingPoint`, `relatedTopics`

**Gaps:** No `contentVersion`, no `sourceDeclaration` field.

---

## 10. Attempt Persistence

### Current State

**All MCAT attempt persistence is localStorage-only.**

```ts
// Completed attempts
localStorage.setItem('mockmate_mcat_attempts_v1', JSON.stringify(attempts))
// In-progress saves
localStorage.setItem(`mcat_progress_${attemptId}`, JSON.stringify({answers, bookmarks, savedAt}))
```

No Supabase table. No authenticated ownership. No cross-device sync.

### SAT Comparison

SAT has `sat_in_progress_attempts` Supabase table with:
- `user_id` (FK to auth.users, RLS enforced)
- `form_number`, `local_attempt_id`
- `answers`, `bookmarks`, `strikeouts` (jsonb)
- `module_deadline_at` (timestamptz — the wall-clock timer deadline)
- `current_phase_tag`, `current_section`, `current_module`, `current_question_idx`
- Full RLS: `auth.uid() = user_id`

SAT completed attempts also store in localStorage but the in-progress state is durably in Supabase.

### Required for Public Release

An MCAT in-progress attempts table mirroring the SAT approach:
```sql
CREATE TABLE public.mcat_in_progress_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_number int NOT NULL,
  local_attempt_id text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}',
  bookmarks jsonb NOT NULL DEFAULT '[]',
  current_section_idx int,
  current_question_idx int,
  section_deadline_at timestamptz,  -- wall-clock deadline for current section
  section_start_times jsonb DEFAULT '{}',  -- sectionId → startTimestamp
  started_at timestamptz NOT NULL DEFAULT now(),
  last_saved_at timestamptz NOT NULL DEFAULT now(),
  content_version text NOT NULL DEFAULT 'v1',
  UNIQUE (user_id, form_number)
);
```

Full RLS required. `auth.uid() = user_id` on all operations.

**This requires a SQL migration. Owner must apply to production separately.**

---

## 11. Result Persistence

Completed results stored in `localStorage['mockmate_mcat_attempts_v1']`.

**No Supabase storage for completed MCAT results.**

For public release, a completed results table is needed:
```sql
CREATE TABLE public.mcat_completed_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  local_attempt_id text NOT NULL UNIQUE,
  form_number int NOT NULL,
  content_version text NOT NULL,
  scoring_version text NOT NULL DEFAULT 'mcat-estimate-v1',
  completed_at timestamptz NOT NULL,
  chem_phys_score int NOT NULL,
  cars_score int NOT NULL,
  bio_biochem_score int NOT NULL,
  psych_soc_score int NOT NULL,
  total_score int NOT NULL,
  chem_phys_correct int NOT NULL, chem_phys_total int NOT NULL,
  cars_correct int NOT NULL, cars_total int NOT NULL,
  bio_biochem_correct int NOT NULL, bio_biochem_total int NOT NULL,
  psych_soc_correct int NOT NULL, psych_soc_total int NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}',
  bookmarks jsonb NOT NULL DEFAULT '[]'
);
```

**Also requires SQL migration.**

---

## 12. History Implementation

**MCAT history currently uses localStorage:**
```ts
loadAllMCATAttempts() // reads from localStorage['mockmate_mcat_attempts_v1']
```

Exam history at `/exams` reads from `standardized_exam_attempts` Supabase table (for custom exams/classroom). MCAT pre-made attempts do not appear there.

`ExamHistoryNotice` component on `/premade/mcat` warns users that history is device-local.

---

## 13. Existing Feedback System

**`sat_exam_module_feedback` Supabase table** exists and is active for SAT.  
**`mcat_exam_feedback` Supabase table** exists (referenced in admin API route).

Admin export endpoint: `/api/admin/mcat-feedback` (requires service role key).  
Post-exam AI feedback: `/api/mcat-feedback` (rate-limited, generates Claude AI commentary).

---

## 14. Alpha/Password Gate

**Implementation:**  
- Password: `downstate123` (hardcoded in `app/(dashboard)/premade/mcat/page.tsx`)
- Storage: `sessionStorage.setItem('mcat_unlocked', '1')`
- Guard: `app/(exam)/premade/mcat/form-1/page.tsx` checks `sessionStorage.getItem('mcat_unlocked') !== '1'`

**Security notes:**
- Trivially bypassable via DevTools (this is by design for alpha)
- sessionStorage clears on tab close (appropriate for alpha)
- Does NOT grant Supabase access — for actual data security, RLS handles ownership

**Decision:** Keep gate until owner decides to open MCAT access. Do not remove in this branch.

---

## 15. MCATExamTaker UI Assessment

| Feature | Status | Notes |
|---------|--------|-------|
| Split pane (passage + question) | ✓ KEEP | 46%/54% split, scrollable, clean |
| Sticky header with timer | ✓ KEEP | Needs timer fix |
| Section abbreviation + discipline + skill sub-bar | ✓ KEEP | Useful metadata |
| Toolbar (Highlight, Strikeout, Flag) | Partial | Highlight/Strikeout are placeholders; Flag is functional |
| Question palette in footer | ✓ KEEP | Scrollable, color-coded |
| Section review screen | ✓ KEEP | Good UX |
| Break screen with countdown | ✓ KEEP | Needs timer fix |
| Welcome screen | ✓ KEEP | |
| Results: total + section scores | ✓ KEEP | |
| Results: discipline breakdown | ✓ KEEP | |
| Results: SIRS breakdown | ✓ KEEP | |
| Results: AI feedback | ✓ KEEP | Rate-limited |
| Results: answer review | ✓ KEEP | |
| Mobile support | Partial — full exam is desktop-optimized |

---

## 16. localStorage Dependencies

| Key | Purpose |
|-----|---------|
| `mockmate_mcat_attempts_v1` | All completed MCAT attempts |
| `mcat_progress_${attemptId}` | In-progress save (answers, bookmarks) |
| `mockmate_premade_attempts_v1` | SAT completed attempts (do not touch) |

---

## 17. Database Tables (MCAT)

Currently: **zero dedicated MCAT Supabase tables.**

Existing SAT tables that could be referenced as pattern:
- `sat_in_progress_attempts` — in-progress save (has `module_deadline_at`)
- `standardized_exam_attempts` — custom exam results (not premade)
- `sat_exam_module_feedback` — SAT feedback
- `mcat_exam_feedback` — MCAT AI feedback (already exists)
- `question_bank_history` — QB attempt history (need to verify if MCAT QB uses it)

---

## 18. Content Versioning

**SAT:** Has `contentVersion: SATContentVersion` in `PremadeAttempt` type, with `normalizeSatContentVersion()` for backward compat.  
**MCAT:** **No content version field** in `MCATAttempt` or `MCATQuestion`.

This is a gap. Historical attempts cannot resolve against specific content version.

---

## 19. Stable Code to Reuse

| System | Reuse decision |
|--------|---------------|
| `MCATExamTaker.tsx` — overall architecture | KEEP, fix timer |
| `MCATExamTaker.tsx` — phase machine | KEEP |
| `MCATExamTaker.tsx` — answer/bookmark state | KEEP |
| `MCATExamTaker.tsx` — passage split pane | KEEP |
| `MCATExamTaker.tsx` — question palette | KEEP |
| `MCATExamTaker.tsx` — results screen | KEEP |
| `mcat-score-conversion.ts` | KEEP, add scoring version |
| `lib/question-bank/mcat/` — types and selector | KEEP |
| Password gate — `premade/mcat/page.tsx` | KEEP until owner decides |
| SAT `sat_in_progress_attempts` SQL pattern | ADAPT for MCAT |
| SAT `module_deadline_at` timer pattern | ADAPT for MCAT |

---

## 20. Code Needing Refactoring

| Item | Issue | Priority |
|------|-------|----------|
| Timer in `MCATExamTaker.tsx` | `setInterval`-only, no wall-clock reconciliation | HIGH |
| Header hardcodes "Form 1" text | Static string on line ~420 and ~700 | MEDIUM |
| `seededCount` warning message | Shows "Phase 1" label in production | LOW |
| No `contentVersion` in `MCATAttempt` | Cannot resolve historical attempts | HIGH |
| No Supabase in-progress save | Session loss on refresh | HIGH (for public release) |

---

## 21. SQL Migration Needed

**Yes, migration is needed for public release.** Specifically:

1. `mcat_in_progress_attempts` table — for durable timer and in-progress state
2. `mcat_completed_attempts` table — for durable results and cross-device history

Migration files: to be created as `supabase/migrations/20260809_mcat_in_progress_attempts.sql` and `supabase/migrations/20260809_mcat_completed_attempts.sql`.

**DO NOT APPLY TO PRODUCTION.** Owner must review and apply separately.

---

## 22. Security Blockers for Public Release

| Issue | Severity | Status |
|-------|----------|--------|
| localStorage as sole storage | Medium | Will add Supabase |
| No server-side ownership check for results | High | Migration needed |
| AI feedback rate limiting | Low | Already implemented |
| Password gate hardcoded | Low | Acceptable for alpha |
| `correctAnswer` exposed in initial page payload | Low | Architecture constraint; normal for client-rendered forms |

---

*This document was created as part of the MCAT Public Release build audit on the branch `feat/mcat-forms-1-5-qbank-700`.*
