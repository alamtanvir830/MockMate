# Repository Security Checklist — MockMate

## GitHub Settings (manual verification required)

- [ ] Repository is **private**
- [ ] **Secret scanning** enabled (Settings → Code security → Secret scanning)
- [ ] **Dependabot alerts** enabled (Settings → Security → Dependabot alerts)
- [ ] **Dependabot security updates** enabled (auto-PRs for vulnerable dependencies)
- [ ] **Branch protection** on `main`: require PR review + passing CI
- [ ] All collaborators have **2FA** enabled
- [ ] Inactive collaborators removed from repository access
- [ ] GitHub Actions workflows scoped to minimum permissions

## Dependency Audit (run regularly)

```bash
npm audit
npm outdated
```

### Current findings (2026-07-19)
- **next** — HIGH severity: update to latest patch
- **ws** — HIGH severity: update or check if transitively resolved

To fix:
```bash
npm update
npm audit fix
```

Always review breaking changes before applying major upgrades.

### Priority packages to keep current
- `next` — core framework; security patches are critical
- `@supabase/supabase-js` / `@supabase/ssr` — auth and data layer
- `stripe` — payment processing
- `react` / `react-dom` — XSS and hydration security
- Any Markdown / HTML renderer used in user-facing content

## Code Security Findings (from 2026-07-19 audit)

### Resolved in this commit
- ✅ Centralized `isAdminUser` / `hasSatPremium` helpers in `lib/auth/server.ts`
- ✅ `revokeSATPremium()` added to `lib/entitlements.ts`
- ✅ Stripe webhook idempotency via `processed_stripe_events` table
- ✅ Stripe webhook now verifies `payment_status === 'paid'` before granting access
- ✅ Security headers added (X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy)
- ✅ Production browser source maps disabled
- ✅ `/.well-known/security.txt` added

### Open items (require further work)
- **Client-trusted scoring in `save-attempt`**: `/api/premade/save-attempt` currently accepts `correctAnswer` and `isCorrect` from the client. These are not used for access control, but allow a user to manipulate their own score records. Recommend server-side re-grading by importing static form question data in the API route and recomputing correctness.
- **Content Security Policy**: A full CSP requires confirmed origins per environment. See `manual-production-checklist.md`.
- **Rate limiting**: No server-side rate limiting on high-abuse routes (Checkout creation, AI feedback, bulk Academy attempt submission). Add via Vercel Edge Middleware or Upstash Redis.
- **Admin API routes use `SUPABASE_SERVICE_ROLE_KEY` as bearer token**: Functional but circular. Consider a dedicated admin JWT or internal secret for these endpoints.
- **`isPremiumUser` still duplicated per route**: All routes correctly use `user_metadata.sat_upgrade_unlocked` from the server session (trusted), but the helper is copy-pasted. Gradually migrate to importing `hasSatPremium` from `lib/auth/server.ts`.

## Admin Email

Only one admin: `ranvi.contact@gmail.com`

Never add another admin email to code. If access expansion is needed, use a database role system instead of hardcoded email lists.
