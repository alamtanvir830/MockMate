# Google Search Console Checklist — MockMate

_Last updated: 2026-07-30 · Domain: https://www.mockmateapp.com_

Use this checklist after deploying the SEO content hub to get pages discovered, indexed,
and monitored.

## 1. Verify a domain property

1. Go to [Google Search Console](https://search.google.com/search-console) and click
   **Add property**.
2. Choose the **Domain** property type (covers `http`, `https`, `www`, and non-www) and
   enter `mockmateapp.com`.
3. Verify via **DNS TXT record**: add the provided TXT record at your DNS host, then click
   **Verify**.
4. (Optional) Also add a **URL-prefix** property for `https://www.mockmateapp.com` if you
   want www-specific reporting, since production serves the www host.

## 2. Submit the sitemap

1. In GSC, open **Sitemaps** (left nav).
2. Enter `sitemap.xml` and submit → full URL `https://www.mockmateapp.com/sitemap.xml`.
3. Confirm status shows **Success** and the discovered URL count matches the pages in
   `app/sitemap.ts` (24 URLs: homepage + 23 public pages).
4. Confirm `https://www.mockmateapp.com/robots.txt` loads and references the sitemap.

## 3. Inspect each new page

Run **URL Inspection** on each page below and confirm "URL is on Google" or, if new,
"URL is not on Google" with **no coverage errors** and a **canonical that matches**:

- `/digital-sat-prep`, `/sat-practice-test`, `/sat-question-bank`
- `/sat-reading-writing-academy`, `/sat-math-desmos-academy`, `/sat-score-reports`
- `/how-mockmate-works`, `/how-we-review-sat-content`, `/about`, `/contact`
- `/resources` + all 6 `/resources/...` articles
- `/pricing`, `/privacy`, `/terms`, `/refund-policy`, `/sat-disclaimer`, `/ai-disclosure`

## 4. Request indexing

For each new page, after inspection, click **Request Indexing**. Prioritize the highest-
value pages first (`/digital-sat-prep`, `/sat-practice-test`, `/sat-question-bank`,
`/resources` articles). Note: indexing is not guaranteed or instant.

## 5. Check Google-selected canonicals

In URL Inspection, compare **User-declared canonical** (from our `alternates.canonical`)
with **Google-selected canonical**. They should match. If Google picks a different
canonical, investigate duplicate content, near-identical pages, or www/non-www conflicts.

## 6. Page Indexing report

Open **Indexing → Pages**. Review:

- **Not indexed** reasons (e.g., "Crawled - currently not indexed", "Discovered - not
  indexed", "Excluded by noindex tag").
- Confirm **private routes** (dashboard, exam, auth, settings, join, payment) show
  "Excluded by 'noindex' tag" or are blocked by robots — that is expected and correct.
- Confirm **public routes** move into the **Indexed** bucket over the following weeks.

## 7. Core Web Vitals

Open **Experience → Core Web Vitals**. Monitor LCP, INP, and CLS for mobile and desktop.
The new pages are server-rendered with minimal JS, so they should pass; watch the shared
nav/footer and image loading if any URLs are flagged.

## 8. Mobile usability

Confirm pages render without mobile issues (tap targets, viewport, text size). The new
SEO pages use responsive Tailwind layouts and a mobile hamburger nav; spot-check on a
real device or the URL Inspection "Test Live URL" mobile rendering.

## 9. Monitor impressions & clicks by page

In **Performance → Search results**, add a **Page** filter and track impressions, clicks,
CTR, and average position per new URL over time. Establish a baseline in the first 2–4
weeks after indexing.

## 10. Branded vs. non-branded queries

Use the **Queries** tab with a filter:

- **Branded**: queries containing "mockmate" — expect high CTR, confirms brand pickup.
- **Non-branded**: queries like "digital sat practice test", "sat question bank" — the
  real growth signal. Track which new pages rank for non-branded terms.

## 11. High-impressions / low-CTR pages

Sort the Performance report by impressions, then scan for pages with many impressions but
low CTR. These are title/description optimization opportunities — rewrite the page's
`metadata.title` / `description` to better match intent and stand out in the SERP.

## 12. Check for stale snippets

If a page's live content changed but the SERP snippet is outdated, use **URL Inspection →
Request Indexing** to prompt a recrawl. Verify the rendered `<title>` and meta description
in the "View crawled page" HTML match the current deployment.

## Ongoing cadence

- **Weekly (first month):** check Page Indexing status and request indexing for any
  stragglers.
- **Monthly:** review Performance by page/query, refresh low-CTR titles, monitor Core Web
  Vitals.
- **After each content change:** re-inspect and request indexing for the changed URL.
