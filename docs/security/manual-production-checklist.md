# MockMate — Manual Production Security Checklist

Items that cannot be verified or changed from the repository.
The owner must review and action each item.

Status key: `[ ]` = not yet verified · `[x]` = verified

---

## VERCEL

### Preview & Deployment Protection
- [ ] **Vercel Authentication on Preview deployments** — In Vercel project Settings → Deployment Protection, enable "Vercel Authentication" so preview builds require login to a Vercel-authorized account before loading. This prevents public access to preview URLs that may contain unreleased exam content.
- [ ] **Development deployments protected** — Confirm "Development" protection is also enabled if development branches are deployed.
- [ ] **Production domain remains public** — Ensure `mockmateapp.com` (and any custom domain) is listed as an exception to Deployment Protection so real users can access the site.
- [ ] **Old preview URLs inaccessible** — Previously deployed preview URLs should be blocked by Vercel Authentication. Verify that old `*.vercel.app` URLs from past deployments no longer expose question content.

### Environment Variables
- [ ] **`SUPABASE_SERVICE_ROLE_KEY` not in Preview scope** — In Vercel → Settings → Environment Variables, confirm `SUPABASE_SERVICE_ROLE_KEY` is scoped to **Production only**, not Preview or Development. Leaking this key in a preview environment grants full database bypass.
- [ ] **`STRIPE_SECRET_KEY` not in Preview scope** — Same as above for the live Stripe secret key. Use a Stripe test key for Preview/Development.
- [ ] **`STRIPE_WEBHOOK_SECRET` scoped to Production** — Preview and Development webhooks should use a separate test webhook secret.
- [ ] **Sensitive Environment Variables enabled** — In Vercel project settings, ensure "Sensitive Environment Variables" feature is enabled to prevent variable values from being visible in deployment logs.
- [ ] **`OPENAI_API_KEY`, `RESEND_API_KEY` scoped appropriately** — Ensure these are not unnecessarily exposed to Preview environments if Preview does not require them.

### Access & Logs
- [ ] **Vercel team members reviewed** — Remove any inactive or unauthorized collaborators from the Vercel team.
- [ ] **Deployment logs do not expose secrets** — Spot-check recent deployment logs for accidentally logged environment-variable values or stack traces containing credentials.

### Source Maps
- [ ] **Production browser source maps disabled** — `productionBrowserSourceMaps: false` is set in `next.config.ts`. Verify in Vercel build output that `.js.map` files are not generated for the production deployment.

---

## SUPABASE

### Row Level Security
- [ ] **RLS enabled on every private table** — Go to Supabase Dashboard → Table Editor → each table → check RLS is enabled. Tables that must have RLS: `profiles`, `standardized_exam_attempts`, `standardized_exam_responses`, `sat_form_1_access`, `sat_rw_academy_attempts`, `sat_math_academy_attempts`, `sat_rw_lesson_progress`, `sat_math_lesson_progress`, `sat_rw_diagnostic_attempts`, `sat_math_diagnostic_attempts`, `qbank_practice_sets`, `qbank_practice_set_questions`, `qbank_attempts`, `review_queue`, `reading_speed_sessions`, `processed_stripe_events` (restrictive, service-role only).
- [ ] **Ownership policies enforce `auth.uid() = user_id`** — Verify each user-owned table has an RLS policy that restricts SELECT/UPDATE/DELETE to the row owner.
- [ ] **`processed_stripe_events` is service-role only** — The idempotency table must not be readable or writable by authenticated users.
- [ ] **Storage buckets reviewed** — In Supabase Dashboard → Storage, confirm no private bucket is set to public. Owner-based RLS policies should restrict access.

### Auth Configuration
- [ ] **Auth redirect URLs restricted** — In Supabase Dashboard → Authentication → URL Configuration, ensure the list of allowed redirect URLs does not include open redirects or wildcard domains.
- [ ] **Leaked-password protection enabled** — If available in your Supabase tier, enable HaveIBeenPwned integration to block known-breached passwords at signup.
- [ ] **Rate limits configured** — Review Supabase Auth rate limits for signup, email OTP, and password reset to prevent abuse.
- [ ] **Service-role key rotation considered** — If `SUPABASE_SERVICE_ROLE_KEY` was ever committed to git, logged, or shared insecurely, rotate it immediately in Supabase Dashboard → Settings → API.

### Database Logs
- [ ] **Database logs reviewed** — Check for unexpected queries, failed authentication attempts, or anomalous access patterns.

---

## STRIPE

### Webhook Configuration
- [ ] **Webhook endpoint uses the live signing secret** — In Stripe Dashboard → Developers → Webhooks, confirm the production webhook endpoint uses the live `whsec_...` secret, not the test secret.
- [ ] **Only required events are enabled** — The webhook endpoint should receive only `checkout.session.completed`. Remove any events that are not handled.
- [ ] **Live and test secrets are separated** — Confirm `STRIPE_WEBHOOK_SECRET` in Vercel Production uses the live secret, and Preview/Development uses the test secret.
- [ ] **Webhook delivery failures monitored** — In Stripe Dashboard, check the webhook event log for undelivered events or repeated failures.

### Dashboard Access
- [ ] **Stripe dashboard access restricted** — Review team members in Stripe → Team. Remove anyone who should not have access.
- [ ] **Two-factor authentication enabled** — All Stripe team members should have 2FA enabled.

---

## GITHUB

- [ ] **Repository is private** — Confirm the GitHub repository is private and cannot be accessed by the public.
- [ ] **Two-factor authentication** — All collaborators should have GitHub 2FA enabled.
- [ ] **Branch protection rules** — Main branch should require pull-request reviews and passing status checks before merge.
- [ ] **Secret scanning enabled** — In GitHub → Settings → Code security, enable secret scanning to detect accidentally committed credentials.
- [ ] **Dependabot alerts enabled** — Enable Dependabot security updates to receive automated PRs for vulnerable dependencies.
- [ ] **Inactive collaborators removed** — Audit GitHub collaborators and remove anyone who is no longer active on the project.
- [ ] **Actions secrets reviewed** — Any GitHub Actions secrets (for CI/CD) should be scoped to the minimum required environments.

---

## Content Security Policy (CSP)

A full CSP was not added in `next.config.ts` because the Supabase project URL varies by environment and some inline-script requirements need verification with Stripe and Desmos.

**Recommended CSP to add via Vercel custom headers (once origins are confirmed):**

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.desmos.com;
connect-src 'self' <SUPABASE_URL> https://api.stripe.com https://checkout.stripe.com https://www.desmos.com;
frame-src https://checkout.stripe.com https://js.stripe.com;
img-src 'self' data: blob: https:;
style-src 'self' 'unsafe-inline';
font-src 'self' data:;
frame-ancestors 'none';
```

Replace `<SUPABASE_URL>` with the production Supabase project URL.

Note: `'unsafe-inline'` for `script-src` is required unless Next.js nonce-based CSP is configured. The Desmos API v1.9 may require it as well. Evaluate whether nonces are feasible before removing `'unsafe-inline'`.

---

## Rate Limiting

The following endpoints have no server-side rate limiting in the current codebase. Consider adding rate limiting via Vercel Edge Middleware or an upstream provider:

- `POST /api/stripe/create-checkout-session` — prevent checkout session spam
- `POST /api/ai-feedback` / `POST /api/sat-feedback` — prevent AI cost abuse
- `POST /api/academy/attempts` — prevent bulk practice-data injection
- Auth endpoints (signup, login, password reset) — delegate to Supabase Auth rate limits plus consider additional middleware

---

## kurbanov.muhammadali23@gmail.com Access Revocation

After deploying this commit, the owner must call the revocation endpoint once:

```
POST /api/admin/revoke-user-premium
Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
Content-Type: application/json

{ "targetEmail": "kurbanov.muhammadali23@gmail.com" }
```

Or authenticate as `ranvi.contact@gmail.com` (admin session) and POST the same body without the Authorization header.

Verify the response confirms `"message": "SAT Premium access revoked"`.

After revocation, verify via Supabase Dashboard → Authentication → Users → find kurbanov.muhammadali23@gmail.com → user_metadata should show `sat_upgrade_unlocked: false`.
