# Phase 5A MCAT Workspace Audit

## What MCAT functionality already exists

### Routes (app/)

| Route | Type | Status |
|---|---|---|
| `/premade/mcat` | Dashboard page | Fully built — password gate ("downstate123"), lists Form 1 |
| `/premade/mcat/form-1/results/[attemptId]` | Results page | Fully built — reads localStorage, renders MCATExamTaker |
| `(exam)/premade/mcat/form-1` | Exam taker | Fully built — MCATExamTaker component |
| `/question-bank/mcat` | QB selector | Fully built — full topic/discipline tree, difficulty/count/mode filters |
| `/question-bank/mcat/results` | QB results | Exists |
| `(exam)/question-bank/mcat/practice` | QB practice session | Exists |
| `/api/mcat-feedback` | AI feedback API | Fully built — auth-guarded, OpenAI, quota-checked |
| `/mcat/dashboard` | MCAT dashboard | **DOES NOT EXIST** — Phase 5A creates it |

### Libraries (lib/)

| Path | Purpose |
|---|---|
| `lib/premade-exams/mcat/form-1.ts` | Form 1 questions (4 sections, 230 questions) |
| `lib/premade-exams/mcat/form-1-{section}.ts` | Per-section question data |
| `lib/premade-exams/mcat/attempt-store.ts` | localStorage CRUD for MCATAttempt |
| `lib/premade-exams/mcat/mcat-score-conversion.ts` | 118–132 per section, 472–528 total |
| `lib/premade-exams/mcat/types.ts` | MCATAttempt, MCATForm, MCATSection, MCATQuestion types |
| `lib/question-bank/mcat/index.ts` | allMCATQBQuestions aggregate |
| `lib/question-bank/mcat/{section}.ts` | Per-section QB questions |
| `lib/question-bank/mcat/categories.ts` | Category tree builder |
| `lib/question-bank/mcat/question-selector.ts` | Question pool selector |
| `lib/question-bank/mcat/types.ts` | MCATQBQuestion, MCATQBDifficulty |

### Components

| Path | Purpose |
|---|---|
| `components/premade/MCATExamTaker.tsx` | Full exam taker + results + AI feedback renderer |

### Scripts

| Path | Purpose |
|---|---|
| `scripts/audit-mcat-scoring.ts` | Scoring audit |
| `scripts/check-mcat-qbank-format.ts` | QB format validation |
| `scripts/check-mcat-table-format.ts` | Table format check |
| `scripts/validate-mcat-qbank.ts` | QB validation |

---

## What MCAT routes exist

- `/premade/mcat` — MCAT practice exam listing
- `/premade/mcat/form-1/results/[attemptId]` — completed attempt results
- `(exam)/premade/mcat/form-1` — active exam session
- `/question-bank/mcat` — MCAT QB topic selector
- `/question-bank/mcat/results` — QB results
- `(exam)/question-bank/mcat/practice` — active QB session
- `/api/mcat-feedback` — AI feedback POST endpoint

---

## What MCAT exams exist

- **Form 1** — 4 sections (Chem/Phys · CARS · Bio/Biochem · Psych/Soc), 230 questions total, 6 hr 15 min
  - Scoring: 118–132 per section, 472–528 composite
  - examId: `'mcat-form-1'`
- **Form 2, Form 3** — "Coming soon" placeholders on `/premade/mcat` — no data

---

## MCAT attempt storage model

MCAT attempts are stored in **localStorage only** (`mockmate_mcat_attempts_v1`).  
No Supabase table exists for MCAT attempts.  
`standardized_exam_attempts` is SAT-only (comment: "One row per completed SAT practice form attempt").  
**No SQL migration is required for Phase 5A.**

---

## MCAT entitlement model

- `/premade/mcat` uses a **sessionStorage password gate** (`SESSION_KEY = 'mcat_unlocked'`, password hardcoded as `'downstate123'`). This is a pre-existing mechanism.
- `/question-bank/mcat` has **no visible entitlement gate** — open to all authenticated users.
- **MCAT does not use SAT Premium** (consistent with Phase 5A security constraint).
- Phase 5A keeps both entitlement mechanisms unchanged.

---

## Workspace system gaps (what Phase 5A fixes)

| Item | Current state | Phase 5A |
|---|---|---|
| `Workspace` type | `'sat' \| 'classroom'` | Add `'mcat'` |
| `getDefinitiveWorkspace('/mcat/*')` | Returns `null` | Returns `'mcat'` |
| `getDefinitiveWorkspace('/premade/mcat')` | Returns `null` | Returns `'mcat'` |
| `getDefinitiveWorkspace('/question-bank/mcat')` | Returns `'sat'` (wrong) | Returns `'mcat'` |
| `MCAT_NAV_HREFS` | Does not exist | Added |
| Sidebar `MCAT_NAV_ITEMS` | Does not exist | Added |
| Mobile-header MCAT nav | Does not exist | Added |
| `/choose-study-path` MCAT card | Disabled `<div>` | Active `<Link href="/mcat/dashboard">` |
| `/mcat/dashboard` | Does not exist | Created |
| `ExamsHistoryView` MCAT section | Does not exist | Shows localStorage MCAT attempts |
| `getExamsViewConfig` MCAT branch | Does not exist | Added `showMcatExams` |

---

## Whether any SQL migration is required

**No.** MCAT attempts remain in localStorage for Phase 5A. No new DB tables, columns, or policies are needed.

---

## Security invariants verified

- `/api/mcat-feedback` requires authentication (verified by existing test in `__tests__/security/mcat-auth.test.ts`)
- Workspace is navigation context only — MCAT workspace does not gate any DB query
- Forging `localStorage['mockmate-workspace'] = 'mcat'` exposes no restricted data (MCAT QB is open; MCAT exams gate via sessionStorage password, not workspace)
- MCAT does not share SAT Premium entitlement
- No RLS changes needed

---

## Existing tests touching MCAT

| File | Tests | Notes |
|---|---|---|
| `__tests__/security/mcat-auth.test.ts` | 3 | Tests `/api/mcat-feedback` auth guard — passes, unchanged |
| `__tests__/classroom/classroom-workspace.test.ts` | test 29–30 | Tests 29/30 assert MCAT is disabled — must be updated in Phase 5A |

---

## Phase 5A scope decision

All MCAT functionality required for a working MCAT workspace is already present. Phase 5A adds the workspace layer (nav context, dashboard, chooser) on top of the existing MCAT routes. No content, scoring, or question data changes.
