# Multi-Product Dashboard — Phase 0 Architecture Audit

**Date:** 2026-08-07
**Branch:** feat/multi-product-dashboard-phase-1
**Starting HEAD:** d832f99

---

## 1. Landing Page

**File:** `app/(marketing)/page.tsx`

### CTA Buttons

| Button | Location | Current href |
|--------|----------|-------------|
| "Get A Free SAT Exam!" (hero) | Hero section | `/signup?next=/premade/sat` |
| "Start Free SAT Practice" (bottom CTA) | Final CTA section | `/signup?next=/premade/sat` |
| "Sign in" (top nav) | Header `<nav>` | `/login` (plain `<Link href="/login">`) |
| "Get started free" (top nav) | Header `<nav>` | `/signup` (plain `<Link href="/signup">`) |

**Key finding:** The landing page is a server component (`app/(marketing)/page.tsx`). It has no awareness of whether the visitor is authenticated. Both buttons route to auth pages unconditionally — there is no authenticated-redirect shortcut on the landing page.

---

## 2. Auth Routes

| Route | File |
|-------|------|
| Sign-in page | `app/(auth)/login/page.tsx` |
| Sign-up page | `app/(auth)/signup/page.tsx` |
| Forgot password | `app/(auth)/forgot-password/page.tsx` |
| Reset password | `app/(auth)/reset-password/page.tsx` |
| OAuth/PKCE/OTP callback | `app/auth/callback/route.ts` |

### Post-auth redirect mechanism

The app uses a `?next=` query parameter throughout:

1. **Email/password login** (`app/actions/auth.ts` → `login` server action): reads `formData.get('next')` and calls `safeNextRedirect()`. Default: `/dashboard`.
2. **Email/password signup** (`app/actions/auth.ts` → `signup` server action): reads `formData.get('next')`. Default: `/dashboard`.
3. **Google OAuth** (`components/auth/google-button.tsx`): appends `?next=<value>` to the OAuth `redirectTo` URL: `callbackUrl.searchParams.set('next', next)`.
4. **Auth callback** (`app/auth/callback/route.ts`): reads `?next=` from the callback URL and calls `safeRedirect()`. Handles PKCE code exchange AND OTP/token-hash flows. Default: `/dashboard`.

### Open-redirect protection (already implemented)

`safeRedirect()` in `app/auth/callback/route.ts` and `safeNextRedirect()` in `app/actions/auth.ts` both enforce:
- Must start with `/` but NOT `//`
- Must not match a URI-scheme pattern (`[a-zA-Z][a-zA-Z0-9+\-.]*:`)
- Falls back to `/dashboard` on any violation

### No middleware.ts

There is **no `middleware.ts`** file in this project. Route protection is handled entirely at the layout/page level via `createClient()` + `redirect('/login')` in server components.

---

## 3. Dashboard

| Item | Path |
|------|------|
| Main dashboard route | `app/(dashboard)/dashboard/page.tsx` |
| Dashboard layout | `app/(dashboard)/layout.tsx` |
| Authenticated guard | In layout: `if (!user) redirect('/login')` |

### Authenticated layout

`app/(dashboard)/layout.tsx` imports `Sidebar`, `MobileHeader`, `SyncSatAttempts`, `SyncQBHistory`, `AcademySidebarSlot`, and `MathAcademySidebarSlot`. Every route under `(dashboard)` shares this layout.

---

## 4. Sidebar

**File:** `components/dashboard/sidebar.tsx`

Client component. Nav items (in order):

1. Dashboard — `/dashboard`
2. Exam Forms (SAT) — `/premade`
3. SAT R&W Academy — `/sat-rw-academy`
4. SAT Math Academy — `/sat-math-academy`
5. Question Bank — `/question-bank`
6. Exam History — `/exams`
7. Personal Notes — `/notes`
8. My Groups — `/groups`
9. Performance — `/performance`
10. Create My Own Exam — `/exams/create`
11. Get SAT Premium — `/billing` (amber premium style)
12. Settings — `/settings`

Collapsible (localStorage persisted). Has admin-only link to `/admin/sat-rw-academy/content-reports`.

---

## 5. SAT Routes

| Feature | Route |
|---------|-------|
| SAT Exam Forms page | `app/(dashboard)/premade/sat/page.tsx` → `/premade/sat` |
| SAT Form 1–10 | `app/(dashboard)/premade/sat/form-{1-10}/page.tsx` |
| SAT Question Bank | `app/(dashboard)/question-bank/page.tsx` → `/question-bank` |
| SAT R&W Academy | `app/(dashboard)/sat-rw-academy/page.tsx` → `/sat-rw-academy` |
| SAT Math Academy | `app/(dashboard)/sat-math-academy/page.tsx` → `/sat-math-academy` |
| Exam History | `app/(dashboard)/exams/page.tsx` → `/exams` |
| SAT Premium billing | `app/(dashboard)/billing/page.tsx` → `/billing` |
| Legacy `/premade` landing | `app/(dashboard)/premade/page.tsx` → `/premade` |

---

## 6. MCAT Routes

| Route | File | Status |
|-------|------|--------|
| `/premade/mcat` | `app/(dashboard)/premade/mcat/page.tsx` | Password-gated (`downstate123`) — not public-facing |
| `/premade/mcat/form-1` | `app/(exam)/premade/mcat/form-1/page.tsx` | Functional (MCAT exam taker) |
| `/premade/mcat/form-1/results/[attemptId]` | `app/(dashboard)/premade/mcat/form-1/results/[attemptId]/page.tsx` | Results page |
| `/question-bank/mcat` | `app/(dashboard)/question-bank/mcat/page.tsx` | MCAT question bank |
| `/question-bank/mcat/results` | `app/(dashboard)/question-bank/mcat/results/page.tsx` | MCAT QB results |
| `app/api/mcat-feedback/route.ts` | API route for MCAT AI feedback | Backend route |

**Production-readiness:** MCAT Form 1 is technically functional (exam taker component `components/premade/MCATExamTaker.tsx` exists, API routes exist) but is **not public-facing** — it's hidden behind a hardcoded session-storage password (`downstate123`). There is also an `app/api/mcat-feedback/route.ts`. MCAT is NOT production-ready for general users.

---

## 7. Custom/Classroom Routes

| Feature | Route | File |
|---------|-------|------|
| Exam History (all user exams) | `/exams` | `app/(dashboard)/exams/page.tsx` |
| Create custom exam | `/exams/create` | `app/(dashboard)/exams/create/page.tsx` |
| Take custom exam | `/exams/[id]/take` | `app/(dashboard)/exams/[id]/take/page.tsx` |
| Custom exam results | `/exams/[id]/results` | `app/(dashboard)/exams/[id]/results/page.tsx` |
| Shared exam (recipient) | `/exams/[id]/shared` | `app/(dashboard)/exams/[id]/shared/page.tsx` |
| Groups | `/groups` | `app/(dashboard)/groups/page.tsx` |
| Performance analytics | `/performance` | `app/(dashboard)/performance/page.tsx` |
| Personal Notes | `/notes` | `app/(dashboard)/notes/page.tsx` |
| SHSAT Form 1 | `/premade/shsat/form-1` | `app/(dashboard)/premade/shsat/form-1/page.tsx` |
| SHSAT Form 2 | `/premade/shsat/form-2` | `app/(dashboard)/premade/shsat/form-2/page.tsx` |

The "Create My Own Exam" feature (`/exams/create`) is the custom exam builder. Groups (`/groups`) handles class/group functionality. There is no separate `/classroom/` route namespace — the custom exam builder lives under `/exams`.

---

## 8. Database — Profiles Table

**Known columns** (from migrations):

| Column | Type | Source migration |
|--------|------|-----------------|
| `id` | `uuid` (PK) | Original schema (pre-migration) |
| `email` | `text` | Original schema |
| `full_name` | `text` | Original schema |
| `used_google_auth` | `boolean NOT NULL DEFAULT false` | `20260729_profiles_google_auth.sql` |

**No `preferred_workspace`, `study_goal`, or workspace preference field exists.**

The profiles table was created before the migrations captured here. The earliest migration referencing it (`20260729_profiles_google_auth.sql`) adds `used_google_auth` and a trigger to auto-create profiles on `auth.users` insert.

---

## 9. Current Post-Auth Redirect Architecture (Summary)

```
User lands on /signup?next=/premade/sat
   ↓
SignupForm reads next from useSearchParams()
   ↓
Hidden <input name="next" value="/premade/sat" /> in form
   ↓
signup() server action reads formData.get('next')
   → safeNextRedirect() validates it
   → redirect('/premade/sat')

For Google OAuth:
   ↓
GoogleButton builds: /auth/callback?next=/premade/sat
   → Supabase redirects to Google, then back to /auth/callback?next=...
   → callback/route.ts reads ?next=, calls safeRedirect()
   → NextResponse.redirect(new URL(next, origin))
```

Default destination when no `next` param: `/dashboard`

---

## 10. Recommended Long-Term Routing Structure

```
/                           → Landing (multi-product)
/choose-study-path          → Study path chooser (Phase 1)
/dashboard                  → SAT dashboard (existing, unchanged)
/premade/sat                → SAT forms (existing)
/question-bank              → SAT QB (existing)
/sat-rw-academy             → SAT R&W Academy (existing)
/sat-math-academy           → SAT Math Academy (existing)
/classroom/dashboard        → Classroom shell (Phase 1 stub)
/premade/mcat               → MCAT (password-gated, Phase 2+)
/mcat/dashboard             → MCAT dashboard (future)
```

**Key insight:** The `next` param mechanism already supports arbitrary post-auth routing. Phase 1 only needs to wire up the correct `next` values in landing page links and add the two new pages (`/choose-study-path` and `/classroom/dashboard`).
