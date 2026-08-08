# MockMate — Final Multi-Product Workspace Audit

## Architecture Summary

MockMate exposes three workspaces to authenticated users. Workspace is **navigation context only** — it never gates server-side data or acts as authorization.

| Workspace | Entry | Dashboard | Definitive prefixes |
|-----------|-------|-----------|---------------------|
| SAT | `/dashboard` | SAT Dashboard | `/dashboard`, `/premade/sat`, `/question-bank` (excl. `/mcat`, `/history`), `/sat-rw-academy`, `/sat-math-academy`, `/billing`, `/performance` |
| MCAT | `/mcat/dashboard` | MCAT Prep | `/mcat`, `/premade/mcat`, `/question-bank/mcat` |
| Classroom | `/classroom/dashboard` | Classroom | `/classroom`, `/exams/create` |

**Shared routes** (null from `getDefinitiveWorkspace`) preserve the stored context from localStorage:  
`/exams`, `/notes`, `/settings`, `/groups`, `/question-bank/history`, `/choose-study-path`

---

## Chooser (`/choose-study-path`)

All three cards are active `<Link>` elements:
- SAT → `/dashboard`
- MCAT → `/mcat/dashboard`
- Classroom → `/classroom/dashboard`

No "Coming Soon" or disabled state remains.

---

## Auth Flow

| Entry point | Authenticated redirect | Unauthenticated redirect |
|-------------|----------------------|--------------------------|
| Generic "Sign in" on marketing | `/choose-study-path` | `/login?next=/choose-study-path` |
| Generic "Get started" on marketing | `/choose-study-path` | `/signup?next=/choose-study-path` |
| SAT-specific CTA on marketing | `/dashboard` | `/signup?next=/dashboard` |
| Direct `/login` (no next param) | — | → `/choose-study-path` after sign-in |
| Middleware-redirected sign-in | — | → original path after sign-in |
| Password reset | — | `/dashboard` |

`safeNextRedirect(null)` defaults to `/choose-study-path` so raw sign-in without a `next` param lands at the chooser rather than defaulting to SAT.

---

## Navigation per Workspace

### SAT
Dashboard · SAT Exam Forms · SAT R&W Academy · SAT Math Academy · Question Bank · Exam History · Performance · **My Groups** · Personal Notes · Get SAT Premium · Settings

### MCAT
MCAT Dashboard · MCAT Practice Exams · MCAT Question Bank · Exam History · **My Groups** · Personal Notes · Settings

### Classroom
Classroom Dashboard · Create Practice Exam · My Practice Exams · My Groups · Personal Notes · Settings

`/groups` is present in all three workspaces as a shared navigational item. Desktop sidebar and mobile header nav items are kept in sync via `SAT_NAV_HREFS`, `MCAT_NAV_HREFS`, and `CLASSROOM_NAV_HREFS` in `lib/workspace/workspace.ts`.

---

## MCAT Access and Gating

| Route | Gate | Status |
|-------|------|--------|
| `/mcat/dashboard` | None (standard auth layout) | Open to all authenticated users |
| `/question-bank/mcat` | None | Open to all authenticated users |
| `/premade/mcat` | `sessionStorage['mcat_unlocked'] === '1'` (password: `downstate123`) | Owner-controlled alpha gate |
| MCAT QB at `/question-bank/mcat` | None | Open |

The `/premade/mcat` gate is intentional and preserved from before Phase 5A. The MCAT workspace is usable via the dashboard and question bank; exam forms require the password. Setting `localStorage['mockmate-workspace'] = 'mcat'` has no effect on gate state.

**STOP CONDITION result**: No blocker. The MCAT workspace is not fundamentally unusable — users can browse the dashboard and question bank. The exam forms gate is owner-controlled, not an accidental development artifact.

---

## History Separation

`getExamsViewConfig(workspace, classroomCount, satCount, mcatCount)` returns mutually exclusive display flags:

| Workspace | showSatExams | showMcatExams | showClassroomExams |
|-----------|-------------|---------------|-------------------|
| `sat` | true | false | false |
| `mcat` | false | true | false |
| `classroom` | false | false | true |

SAT attempts come from Supabase (`standardized_exam_attempts` table, SAT-only).  
MCAT attempts come from localStorage (`mockmate_mcat_attempts_v1`).  
Classroom exams come from Supabase (`exams` table, user-scoped via RLS).

No cross-contamination is possible at the data layer since each product uses a separate storage mechanism.

---

## Database

No SQL migration is required for this transition:

- SAT: `standardized_exam_attempts` (existing), `sat_in_progress_attempts` (existing)
- MCAT: localStorage only (no Supabase table)
- Classroom: `exams`, `groups` (existing), RLS enforced

---

## Security

- Workspace is `localStorage`-based navigation context only
- `localStorage['mockmate-workspace'] = 'mcat'` cannot bypass the `/premade/mcat` sessionStorage gate
- MCAT QB (`/question-bank/mcat`) is open to all authenticated users; workspace value does not change this
- `SUPABASE_SERVICE_ROLE_KEY` never exposed to the browser
- RLS automatically scopes all database reads to the authenticated user

---

## Active Nav State

`isNavItemActive(href, pathname, exact?)` in `lib/workspace/workspace.ts` handles all three workspaces:

- `/question-bank` (SAT) explicitly excludes `/question-bank/mcat` sub-routes
- `/question-bank/mcat` (MCAT) activates for MCAT QB and sub-routes
- `/mcat/dashboard` activates for all `/mcat/*` routes
- `/exams` activates for exam detail pages but not `/exams/create`

---

## Test Coverage

After the finalize branch: 910 original + 1 (test 21b in mcat-workspace.test.ts) + N (final-three-workspace.test.ts) tests.

New test file `__tests__/integration/final-three-workspace.test.ts` covers:
- Chooser → workspace classification
- SAT/MCAT nav completeness (including /groups)
- /groups shared-route behavior across all three workspaces
- All six product-switch transitions
- Shared routes context preservation for all three products
- isNavItemActive for /groups
- QB route separation
- MCAT access and security invariants
- Performance route isolation (SAT-only)
- History isolation per workspace
- URL-first resolution on refresh / direct nav / back button

---

## Preserved (Unchanged by Finalize Branch)

- All SAT exam content, scoring, and answer keys
- All MCAT question content and scoring
- MCAT attempt storage (`mockmate_mcat_attempts_v1` in localStorage)
- MCAT entitlement model (sessionStorage password gate)
- Stripe integration and billing
- SAT Premium entitlement checks
- Supabase RLS policies
- All academy content (R&W, Math)
- All existing 910 automated tests
