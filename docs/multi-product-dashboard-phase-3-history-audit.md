# Phase 3 Audit: /exams History Architecture

Audited: 2026-08-07  
Branch: `feat/multi-product-dashboard-phase-3`  
Base: `94bbaf8` (production main)

## Goal

Separate SAT exam history from Classroom exam history on `/exams` so each workspace
sees only its relevant section. No new URLs; no database migration.

## Data sources on `/exams` (pre-Phase-3)

| Source | Table | Filter | Workspace |
|--------|-------|--------|-----------|
| Custom exams | `exams` | `user_id = auth.uid()` | Classroom |
| Shared exams | `exam_shared_recipients` + `exams` (admin) | `email = user.email` | Classroom |
| In-progress SAT | `sat_in_progress_attempts` | implicit (user RLS) | SAT |
| Completed SAT | `standardized_exam_attempts` | `exam_type = 'SAT'` | SAT |

### Key finding: data is already naturally partitioned

- **Classroom data** comes from the `exams` / `exam_attempts` tables (user-created or shared custom exams).
- **SAT data** comes from `sat_in_progress_attempts` and `standardized_exam_attempts` (dedicated SAT tables with `exam_type` discriminator).

No schema changes are required. The separation is purely a UI concern.

## Workspace detection for `/exams`

`/exams` is a **shared route** — `getDefinitiveWorkspace('/exams')` returns `null`. The
active workspace is resolved from localStorage (written by the sidebar when the user
navigates through definitive routes). Safe fallback is `'sat'`.

| User journey | localStorage at /exams | View shown |
|---|---|---|
| SAT sidebar → /exams | `'sat'` | SAT Exam History |
| Classroom sidebar → /exams | `'classroom'` | My Practice Exams |
| Direct visit (no context) | `null` | SAT Exam History (safe default) |
| After /dashboard → /exams | `'sat'` | SAT Exam History |
| After /classroom/dashboard → /exams | `'classroom'` | My Practice Exams |

## Page-level changes decided

- **Server page** (`app/(dashboard)/exams/page.tsx`): still fetches ALL data for both
  workspaces. No workspace-conditional fetching — workspace is UI only, never a data gate.
- **New client component** (`components/exams/ExamsHistoryView.tsx`): reads workspace
  from localStorage via `useWorkspace`, delegates to `getExamsViewConfig` for display
  config, conditionally renders SAT vs Classroom sections.
- **New pure logic module** (`lib/exams/exams-view.ts`): `getExamsViewConfig` maps
  `(workspace, classroomExamCount, satAttemptCount) → ExamsViewConfig`. Fully unit-tested.

## Security invariants (unchanged)

- Workspace context is UI-only. It controls which SECTIONS are rendered, not which
  rows are fetched or whether Premium content is accessible.
- The server never branches data fetches on workspace. All rows are fetched; the client
  hides sections irrelevant to the current workspace.
- No `?workspace=` query parameter is added. Workspace is always resolved client-side
  from localStorage, consistent with Phase 2.

## What is NOT changed

- URL: `/exams` remains the single canonical URL for both views.
- Data queries: identical to pre-Phase-3 (no query removed, none added).
- Premium/billing logic: untouched.
- SAT scoring, content versioning, trial flow: untouched.
- `PremadeAttemptsSection` internals: only `InProgressRow` interface made exportable.
