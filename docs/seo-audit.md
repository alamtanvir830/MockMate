# MockMate SEO Audit

_Last updated: 2026-07-30_

## Architecture

MockMate is a **Next.js 16 App Router** application (`app/` directory) using **route
groups** to organize the URL space:

- `app/(marketing)/` — public, indexable pages (no group `layout.tsx`, so pages inherit
  only the root layout). This is where all new SEO content lives.
- `app/(dashboard)/` — authenticated product surface (dashboard, exams list, question
  bank, academies, admin, billing, etc.). Has its own `layout.tsx`.
- `app/(exam)/` — the in-exam experience (premade + question-bank runners). Has its own
  `layout.tsx`.
- `app/(auth)/` — login, signup, forgot-password, reset-password.
- `app/(print)/` — print views.
- `app/settings/`, `app/api/`, `app/auth/` — settings, API routes, auth callbacks.

Metadata is handled with the Next.js **Metadata API**: a root `metadata` export in
`app/layout.tsx` defines defaults and a title template (`%s | MockMate`), and individual
pages/layouts override with their own `export const metadata`.

## Public (indexable) routes

- `/` (homepage — FROZEN, unchanged by this work)
- `/digital-sat-prep`
- `/sat-practice-test`
- `/sat-question-bank`
- `/sat-reading-writing-academy`
- `/sat-math-desmos-academy`
- `/sat-score-reports`
- `/how-mockmate-works`
- `/how-we-review-sat-content`
- `/about`
- `/contact`
- `/resources` (+ 6 article sub-pages under `/resources/...`)
- `/pricing`
- `/privacy`, `/terms`, `/refund-policy`, `/sat-disclaimer`, `/ai-disclosure`

## Private (non-indexable) routes

- `/(dashboard)/*` — dashboard, exams, premade, question-bank, admin, billing, notes,
  performance, groups, study-round, reading-speed, and both academies.
- `/(exam)/*` — premade + question-bank exam runners.
- `/(auth)/*` — login, signup, forgot-password, reset-password.
- `/settings`
- `/(marketing)/payment/*` — payment success (client component).
- `/(marketing)/join/[examId]` — shared exam invite (contains other users' exam data).

## Technical findings

| Finding | Status |
| --- | --- |
| No `robots.ts` | **FIXED** — added `app/robots.ts` with allow `/` and disallow list for private paths. |
| No `sitemap.ts` | **FIXED** — added `app/sitemap.ts` covering all public indexable routes. |
| No `noindex` on private routes | **FIXED** — see below. |

### noindex additions

- `app/(dashboard)/layout.tsx` — added `robots: { index: false, follow: false }`
  (covers all dashboard sub-routes).
- `app/(exam)/layout.tsx` — added noindex (covers all exam runners).
- `app/(auth)/login|signup|forgot-password|reset-password/page.tsx` — noindex on each.
- `app/settings/page.tsx` — noindex.
- `app/(marketing)/join/[examId]/page.tsx` — noindex.
- `app/(marketing)/payment/layout.tsx` — **new** layout added solely to noindex the
  client-component payment success page (which cannot export `metadata` itself).

Belt-and-suspenders: private routes are both `noindex` (page-level) and `Disallow`ed in
`robots.txt` (crawl-level).

## Metadata findings

- **Root layout** (`app/layout.tsx`) defines a title template `%s | MockMate` and a
  default title/description, plus OpenGraph and Twitter defaults.
- **metadataBase** is set to `https://www.mockmateapp.com` (the **www** apex). Note: the
  root layout's OG `url`/image use the non-www `https://mockmateapp.com`. All **new** SEO
  pages consistently use absolute `https://www.mockmateapp.com` URLs for canonical, OG,
  and Twitter to match `metadataBase` and the production domain. (Minor inconsistency in
  the root layout's own OG URLs is noted but left untouched to avoid homepage coupling.)
- **Homepage** uses the root defaults and was intentionally not modified.
- **Pricing** page previously had no metadata; a `metadata` export (title, description,
  canonical, OG, Twitter) was added without changing its visual content.

## Content gaps

**Addressed:**

- Dedicated landing pages for each core product surface (practice tests, question bank,
  both academies, score reports).
- Top-of-funnel informational content: `how-mockmate-works`, `how-we-review-sat-content`,
  `about`, `contact`, and a 6-article `/resources` guide hub.
- Structured data (JSON-LD) per page type: WebPage, Organization, SoftwareApplication,
  Dataset, Course, Article, ContactPage, CollectionPage.
- Internal linking between all new pages via `SeoNav`, `SeoFooter`, and inline links.
- Canonical URLs, OpenGraph, and Twitter cards on every new page.

**Remaining:**

- No dynamic OG image route was built (the brief deferred this); all pages reuse the
  existing `/mockmate-og-v3.png`. Per-page custom OG images would improve CTR.
- The root layout's OG `url`/image use non-www while `metadataBase` uses www — worth a
  future unification (left untouched here to avoid touching shared layout affecting home).
- No FAQ/HowTo rich-result markup on informational pages (could be added later).
- No `/blog` or ongoing content cadence yet beyond the 6 seed resource articles.

## Homepage recommendations (NOT implemented — homepage is frozen)

The homepage (`app/(marketing)/page.tsx`) was **not modified**. Recommended future work:

- Align homepage OG URLs to the www domain to match `metadataBase`.
- Resolve the "Start Free SAT Form 3" CTA vs. `free-exam-access.ts` `formNumber: 2`
  mismatch (see `legal-product-consistency-review.md`).
- Add internal links from the homepage into the new SEO hub pages to distribute
  authority.

## Indexing risks

- **Private dashboard/exam/auth routes visible to crawlers** — **FIXED** via noindex +
  robots disallow.
- **Shared exam invite (`/join/[examId]`) exposing other users' exam metadata to search**
  — **FIXED** via noindex + `/join/` disallow.
- **Payment success page indexed** — **FIXED** via the new payment layout noindex +
  `/payment/` disallow.

## Performance

- All new SEO pages are **server components** (no `'use client'`), so they render to
  static HTML with no client JS beyond the shared nav.
- The only client component in the new SEO surface is `SeoNav` (hamburger toggle), kept
  intentionally small.
- JSON-LD is emitted inline via a small `JsonLd` server component (no runtime cost).
