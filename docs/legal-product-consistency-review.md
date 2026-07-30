# Legal & Product Consistency Review

_Last updated: 2026-07-30_

This review cross-checks the claims made in the new public SEO pages against the actual
product configuration in the codebase, and flags items requiring human review.

## Pricing

Verified against `lib/pricing.ts` (`SAT_PREMIUM_PLAN_CARDS`):

| Plan | Price | Type | Notes |
| --- | --- | --- | --- |
| Monthly | **$9.99** | Recurring (monthly) | "Billed monthly and automatically renews. Cancel any time." |
| 3-Month Access | **$24.99** | One-time | "No automatic renewal." Save $4.98 vs. three monthly payments. |
| Lifetime Access | **$29.99** | One-time | "Best Value", featured. "Pay once, keep forever." |

- The new SEO copy uses these exact figures ($9.99/mo, $24.99, $29.99) and correctly
  distinguishes the monthly plan as recurring vs. the two one-time plans.
- `SAT_PREMIUM_PRICING` also defines the legacy single-plan monthly config ($9.99/month,
  "Billed monthly. Cancel anytime.") used by the compact upgrade banner — consistent.

## Lifetime access

- `lib/pricing.ts` markets Lifetime at **$29.99 one-time** with `savingsLabel: 'Pay once,
  keep forever'` and `badge: 'Best Value'`. The "pay once, keep forever" language is
  verified in code. SEO copy matches.

## Plan features

`SAT_PREMIUM_CARD_FEATURES` lists: SAT Exam Forms 1–5, 700+ question bank, SAT Reading &
Writing Academy, SAT Math & Desmos Academy. SEO pages describe the same inclusions plus
personalized score reports. Consistent.

## Free forms

- New-user free access covers **Forms 1, 2, and 3** with a **48-hour** window (per the
  brief's verified facts). SEO copy states this.
- `lib/premade-exams/sat/free-exam-access.ts` sets `newUserDurationHours: 48` — the
  48-hour window is verified in code.

### ⚠️ DISCREPANCY — needs human review

- The **homepage CTA** (`app/(marketing)/page.tsx`, line ~103) reads **"Start Free SAT
  Form 3"**.
- But `lib/premade-exams/sat/free-exam-access.ts` sets **`formNumber: 2`** in
  `FREE_SAT_EXAM_CONFIG`, and writes `free_form_number: 2` to the DB.
- So the marketing CTA advertises Form 3 while the free-access config targets Form 2.
- The new SEO pages deliberately avoid naming a single specific free form; they say "Form
  1, 2, or 3" to sidestep this mismatch. **A human should reconcile the homepage CTA and
  the free-exam config** so they point to the same form. (Homepage is frozen and was not
  changed.)

## Refund policy

- Refund terms live in `app/(marketing)/refund-policy/`. Per the brief, a **7-day** refund
  policy applies. Support/refund contact is **ranvi.contact@gmail.com**.
- New SEO pages (contact, footer) route refund questions to this email and link to the
  refund policy. Consistent — verify the 7-day figure on the live refund-policy page
  before publishing marketing that restates a specific window.

## Supabase data storage

The product stores the following in Supabase (observed across dashboard/exam code):

- **User records** (`auth.users`, with `user_metadata` such as `full_name`, SAT
  entitlement flags).
- **Attempts** — completed exam attempts (synced via `SyncSatAttempts`).
- **In-progress attempts** — autosaved partial exams enabling resume.
- **Profiles / entitlements** — SAT premium status, purchase plan type/status/expiry.
- **Free-exam access records** — `user_id`, `email`, `free_form_number`,
  `access_started_at`, `access_expires_at`.
- **Question-bank history** (synced via `SyncQBHistory`).

The Privacy Policy should reflect these categories. Human review recommended to confirm
the privacy page enumerates them accurately.

## AI involvement

- An **AI Disclosure** page exists at `app/(marketing)/ai-disclosure/`. Per the brief, it
  discloses that AI is used for feedback, and explanations note AI assistance.
- New SEO content describes explanations as "worked explanations" and describes the review
  process (`how-we-review-sat-content`) without overstating human-only authorship. The
  content-review page correctly states questions are independently produced and not
  College-Board reviewed.
- **Human review item:** ensure the AI Disclosure page's scope matches any implied
  human-review claims on the new `how-we-review-sat-content` page.

## Estimated scores

- The **SAT Disclaimer** page (`app/(marketing)/sat-disclaimer/`) states scores are
  estimates, not official College Board scores.
- Every new SEO page includes an **Independence disclaimer callout**, and the
  `sat-score-reports` page has an explicit "Score Limitations" section clarifying that
  scores are estimates from a proprietary model and can vary with form difficulty.
  Consistent with the disclaimer page.

## Contact email

- Business/support contact is **ranvi.contact@gmail.com** across the footer, contact page,
  and about page.
- **Human review item:** this is a personal Gmail address used for business support. Not a
  legal blocker, but a branded domain email (e.g., support@mockmateapp.com) would improve
  trust and deliverability. Left as-is to match the verified product fact.

## Independence / trademark

- All new pages state MockMate is independent and not affiliated with the College Board,
  and that questions are independently created "SAT-style." Footer includes a College
  Board trademark acknowledgment. Consistent with the SAT Disclaimer page.

## Summary of human-review items

1. **Homepage "Form 3" CTA vs. `formNumber: 2`** free-exam config mismatch. (Highest
   priority.)
2. Confirm the refund window figure (7-day) on the live refund-policy page.
3. Confirm the Privacy Policy enumerates the Supabase data categories above.
4. Confirm AI Disclosure scope aligns with the content-review page.
5. Consider a branded support email vs. the personal Gmail address.
