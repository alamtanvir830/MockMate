# Phase 5A — MCAT Workspace

## Overview

Phase 5A adds MCAT as a first-class workspace in the multi-product dashboard. It wires the existing MCAT functionality (premade exams, question bank, AI feedback) into the workspace navigation system introduced in Phases 1–4.

---

## Changes

### `lib/workspace/workspace.ts`

- `Workspace` type extended: `'sat' | 'mcat' | 'classroom'`
- `MCAT_NAV_HREFS` constant added: `/mcat/dashboard`, `/premade/mcat`, `/question-bank/mcat`, `/exams`, `/notes`, `/settings`
- `getDefinitiveWorkspace`: MCAT routes (`/mcat/*`, `/premade/mcat`, `/question-bank/mcat`) return `'mcat'`
- `getDefinitiveWorkspace`: `/question-bank/history` is now a shared (null) route so MCAT context is preserved when navigating there from the MCAT QB
- `isNavItemActive`: MCAT-specific cases added for `/mcat/dashboard`, `/premade/mcat`, `/question-bank/mcat`; SAT `/question-bank` no longer activates for MCAT QB sub-routes

### `lib/exams/exams-view.ts`

- `ExamsViewConfig` adds `showMcatExams: boolean`
- `getExamsViewConfig` accepts optional `mcatAttemptCount` parameter
- MCAT workspace returns title "MCAT Exam History", `showMcatExams: true`, all other flags false

### `app/(chooser)/choose-study-path/page.tsx`

- MCAT card changed from disabled `<div>` to active `<Link href="/mcat/dashboard">`
- Keyboard-accessible, emerald hover state, proper focus ring

### `app/(dashboard)/mcat/dashboard/page.tsx` (new)

- Server component, no auth queries needed
- Header: MCAT Prep heading with emerald icon
- Primary CTA: "Take a Practice Exam" → `/premade/mcat`
- Navigation cards: MCAT Practice Exams, MCAT Question Bank, Exam History, Personal Notes
- AAMC disclaimer footer

### `components/dashboard/sidebar.tsx`

- `useWorkspace`: handles `stored === 'mcat'`
- `MCAT_NAV_ITEMS`: Dashboard, MCAT Practice Exams, MCAT Question Bank, Exam History, Personal Notes, Settings
- `getWorkspaceNavItems`: returns `MCAT_NAV_ITEMS` for `workspace === 'mcat'`

### `components/dashboard/mobile-header.tsx`

- Same changes as sidebar: `useWorkspace` handles `'mcat'`, `MCAT_NAV_ITEMS` array, `getWorkspaceNavItems` updated

### `components/exams/ExamsHistoryView.tsx`

- `useWorkspace` handles `stored === 'mcat'`
- Loads MCAT attempts from localStorage (`loadAllMCATAttempts`) after mount
- MCAT section renders attempt list with score and "View results" link; empty state links to `/premade/mcat`

---

## What was NOT changed

- MCAT premade exam content, scoring, or question data — unchanged
- MCAT entitlement model (sessionStorage password gate) — unchanged
- MCAT question bank content — unchanged
- `/api/mcat-feedback` auth guard — unchanged
- No SQL migrations — MCAT attempts remain in localStorage

---

## Security

- Workspace is navigation context only; no data is gated by workspace value
- `localStorage['mockmate-workspace'] = 'mcat'` grants no additional data access
- MCAT does not use SAT Premium entitlement
- MCAT dashboard (`/mcat/dashboard`) is behind the standard `(dashboard)` auth layout

---

## Tests

- `__tests__/mcat/mcat-workspace.test.ts` — 48 tests covering workspace classification, nav hrefs, isNavItemActive, getExamsViewConfig, security invariants
- `__tests__/classroom/classroom-workspace.test.ts` — tests 29/30 updated to reflect MCAT is now enabled

All 862 prior tests continue to pass; Phase 5A adds 48 net-new tests.
