# Phase 3: Workspace-Filtered Exam History

Implemented: 2026-08-07  
Branch: `feat/multi-product-dashboard-phase-3`  
Base: `94bbaf8` (production main)

## Summary

`/exams` now renders two distinct views — SAT Exam History and My Practice Exams —
based on the active workspace context stored in localStorage. All data is fetched on
the server regardless of workspace; the client applies the filter to section visibility
only.

## New files

### `lib/exams/exams-view.ts`
Pure function `getExamsViewConfig(workspace, classroomExamCount, satAttemptCount)` that
returns an `ExamsViewConfig` object:

```ts
interface ExamsViewConfig {
  title: string            // "SAT Exam History" | "My Practice Exams"
  subtitle: string         // "N attempt(s) total" | "N exam(s) total"
  showNewExamButton: boolean  // only classroom
  showClassroomExams: boolean
  showSharedExams: boolean    // only classroom
  showSatExams: boolean
}
```

No side effects. Fully unit-tested (34 tests in `__tests__/exams/exams-view.test.ts`).

### `components/exams/ExamsHistoryView.tsx`
Client component. Receives all exam data as props from the server page, reads workspace
from localStorage via the same `useWorkspace` hook pattern as the sidebar, and renders
the SAT or Classroom view based on `getExamsViewConfig`.

### `__tests__/exams/exams-view.test.ts`
34 focused unit tests grouped by:
- SAT workspace: title and visibility (tests 1–5)
- SAT workspace: subtitle grammar (tests 6–10)
- Classroom workspace: title and visibility (tests 11–15)
- Classroom workspace: subtitle grammar (tests 16–20)
- Mutual exclusion invariants (tests 21–26)
- Subtitle grammar at scale (tests 27–30)
- Subtitle keyword isolation (tests 31–34)

## Modified files

### `app/(dashboard)/exams/page.tsx`
- Replaced inline JSX with `<ExamsHistoryView ... />`.
- `completedSharedIds` is now `string[]` instead of `Set<string>` (client components
  require serializable props).
- All data fetches preserved unchanged.

### `components/exams/PremadeAttemptsSection.tsx`
- `InProgressRow` interface exported (was internal). Required by `ExamsHistoryView`.

## Behaviour by workspace

| Workspace | Page title | Subtitle counts | Sections visible | "New exam" button |
|---|---|---|---|---|
| `sat` | SAT Exam History | SAT attempts | PremadeAttemptsSection | Hidden |
| `classroom` | My Practice Exams | Classroom exams | Custom + Shared exams | Visible |

## Workspace resolution for `/exams`

`/exams` is a shared route (`getDefinitiveWorkspace` returns `null`). On hydration,
`useWorkspace` reads `localStorage['mockmate-workspace']`. Direct visits with no stored
context fall back to `'sat'`.

## Security notes

- Workspace is display context only. All DB queries run regardless of workspace — no
  row is hidden from the query layer based on workspace.
- The server never reads a workspace parameter from the request. Workspace is always
  derived client-side from localStorage.
- No new entitlement checks. No Stripe logic touched.
