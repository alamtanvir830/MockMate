# Multi-Product Dashboard — Phase 2 Plan

**Scope:** Sidebar refactor for workspace-aware navigation.
**Do NOT implement until Phase 1 is shipped and validated.**
**This document is a plan only. No code changes.**

---

## Goal

Phase 1 added `/choose-study-path` and intent-based routing. Phase 2 makes the sidebar workspace-aware, so SAT users see SAT-specific navigation and Classroom users see classroom-specific navigation — without breaking any existing URLs.

---

## 1. Exact sidebar component to refactor

**File:** `components/dashboard/sidebar.tsx`

This is a client component that renders a single flat `navItems` array. It currently contains all SAT, classroom, and utility navigation items in one list. Phase 2 splits this into workspace-specific nav sections.

---

## 2. Current nav items and their workspace affinity

| Label | href | Workspace |
|-------|------|-----------|
| Dashboard | `/dashboard` | SAT (or shared entry point) |
| Exam Forms (SAT) | `/premade` | SAT |
| SAT R&W Academy | `/sat-rw-academy` | SAT |
| SAT Math Academy | `/sat-math-academy` | SAT |
| Question Bank | `/question-bank` | SAT |
| Exam History | `/exams` | Shared (both SAT + Classroom) |
| Personal Notes | `/notes` | Shared |
| My Groups | `/groups` | Classroom (or shared) |
| Performance | `/performance` | SAT |
| Create My Own Exam | `/exams/create` | Classroom |
| Get SAT Premium | `/billing` | SAT |
| Settings | `/settings` | Shared |

---

## 3. How to make SAT nav links point directly to the right places

Currently "Exam Forms (SAT)" goes to `/premade` which is a general premade landing page. Phase 2 should change this to go directly to `/premade/sat` — the SAT exam forms grid.

Similarly, "Question Bank" at `/question-bank` already goes directly to the SAT question bank (there's no general QB landing that splits SAT/MCAT for non-admin users). This can stay as-is.

SAT academy destinations stay at `/sat-rw-academy` and `/sat-math-academy` — no change needed.

---

## 4. Proposed WorkspaceSidebar structure

```tsx
// components/dashboard/sidebar.tsx — Phase 2 redesign

type Workspace = 'sat' | 'classroom' | 'mcat'

// Detect workspace from current path (or user preference in future phases)
function detectWorkspace(pathname: string): Workspace {
  if (pathname.startsWith('/sat-rw-academy') || pathname.startsWith('/sat-math-academy')
    || pathname.startsWith('/premade/sat') || pathname.startsWith('/question-bank')
    || pathname.startsWith('/billing') || pathname === '/dashboard') {
    return 'sat'
  }
  if (pathname.startsWith('/classroom') || pathname.startsWith('/exams/create')
    || pathname.startsWith('/groups')) {
    return 'classroom'
  }
  if (pathname.startsWith('/premade/mcat') || pathname.startsWith('/question-bank/mcat')) {
    return 'mcat'
  }
  return 'sat' // default
}
```

### SAT sidebar nav items (when workspace === 'sat')

1. Dashboard → `/dashboard`
2. SAT Exam Forms → `/premade/sat` (direct, bypasses `/premade` landing)
3. SAT R&W Academy → `/sat-rw-academy`
4. SAT Math Academy → `/sat-math-academy`
5. Question Bank → `/question-bank`
6. Exam History → `/exams`
7. Performance → `/performance`
8. Personal Notes → `/notes`
9. Get SAT Premium → `/billing` (amber premium style)
10. Settings → `/settings`

### Classroom sidebar nav items (when workspace === 'classroom')

1. Study Paths → `/choose-study-path`
2. Create Exam → `/exams/create`
3. My Exams → `/exams`
4. My Groups → `/groups`
5. Personal Notes → `/notes`
6. Settings → `/settings`

### MCAT sidebar nav items (future, when workspace === 'mcat')

1. Study Paths → `/choose-study-path`
2. MCAT Exams → `/premade/mcat`
3. MCAT Question Bank → `/question-bank/mcat`
4. Settings → `/settings`

---

## 5. Workspace switcher in sidebar

Add a small "switch product" element at the top of the sidebar (or bottom) that shows the current workspace and links to `/choose-study-path`. This lets users navigate between products without going back to the landing page.

```tsx
// Workspace switcher pill — shows in all workspace sidebars
<Link href="/choose-study-path">
  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">
    <GridIcon />
    <span>Switch product</span>
  </div>
</Link>
```

---

## 6. Migration path that avoids breaking existing URLs

**Critical constraint:** ALL existing URLs must continue to work. No redirects, no deletions.

| Existing URL | Phase 2 behavior |
|-------------|-----------------|
| `/dashboard` | Unchanged — SAT dashboard |
| `/premade` | Unchanged — keep general premade landing |
| `/premade/sat` | Unchanged — SAT forms grid (sidebar now links here directly) |
| `/question-bank` | Unchanged — SAT question bank |
| `/sat-rw-academy` | Unchanged |
| `/sat-math-academy` | Unchanged |
| `/exams` | Unchanged — exam history |
| `/exams/create` | Unchanged — custom exam builder |
| `/groups` | Unchanged |
| `/choose-study-path` | New in Phase 1 — unchanged |
| `/classroom/dashboard` | New in Phase 1 — unchanged |

The only change is in the sidebar's `href` for "Exam Forms (SAT)" from `/premade` to `/premade/sat`. The `/premade` page still exists and works; the sidebar just no longer links to it directly for SAT users.

---

## 7. Exact files likely to change in Phase 2

| File | Change |
|------|--------|
| `components/dashboard/sidebar.tsx` | Add workspace detection, split navItems by workspace, add switcher |
| `app/(dashboard)/layout.tsx` | Potentially pass workspace context to sidebar |
| `app/(dashboard)/dashboard/page.tsx` | May add "Switch product" link or breadcrumb |

**Files NOT to change in Phase 2:**
- Any page file under `app/(dashboard)/premade/sat/`
- Any page file under `app/(dashboard)/sat-rw-academy/`
- Any page file under `app/(dashboard)/sat-math-academy/`
- Any page file under `app/(dashboard)/question-bank/`
- `app/auth/callback/route.ts`
- `app/actions/auth.ts`
- Any landing page file

---

## 8. Tests required before Phase 2 ships

### Manual regression tests
- [ ] Navigate to `/dashboard` as SAT user — SAT sidebar visible, all SAT links work
- [ ] Navigate to `/classroom/dashboard` — Classroom sidebar visible
- [ ] Navigate to `/sat-rw-academy` — SAT sidebar visible, academy nav active
- [ ] Navigate to `/exams/create` — Classroom sidebar visible
- [ ] Sidebar collapse still works (localStorage persisted)
- [ ] Mobile header still works on all workspace pages
- [ ] `/premade/sat` is still accessible even though sidebar links to it directly
- [ ] `/premade` (general premade landing) still exists and loads

### TypeScript / lint / build
- [ ] `npx tsc --noEmit` — no errors
- [ ] `npm run lint` — no errors
- [ ] `npm run build` — successful

### Auth regression
- [ ] Google OAuth with `?next=/choose-study-path` → lands on chooser
- [ ] Email login with `?next=/premade/sat` → lands on SAT forms
- [ ] Email signup with `?next=/premade/sat` → lands on SAT forms
- [ ] Login with no `?next` → lands on `/dashboard` (default)

---

## 9. Open questions for owner to decide before Phase 2

1. **Should `/dashboard` stay the SAT dashboard, or become a generic workspace redirect?**
   Recommendation: keep it as SAT dashboard (existing bookmark compatibility). Add `/choose-study-path` as the new generic entry point.

2. **Should the sidebar show a "switch product" CTA for all users, or only users who've visited `/choose-study-path`?**
   Recommendation: show it to all users (it's always safe to let users switch).

3. **Should workspace state persist in `profiles.preferred_workspace`?**
   Phase 1 chose route-based detection (no DB). Phase 2 could optionally add a `preferred_workspace` column to remember the last workspace between sessions. Requires a DB migration.

4. **What happens to the `/premade` landing page?**
   It currently shows SAT, MCAT, and SHSAT cards. In a multi-product world it could become the new "SAT Forms" page, or be deprecated in favor of `/premade/sat`. Either works; no URL will break.
