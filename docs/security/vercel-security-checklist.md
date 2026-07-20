# Vercel Security Checklist — MockMate

These settings must be verified manually in the Vercel dashboard.
They cannot be changed from the repository.

## Deployment Protection

1. Go to Vercel → Your Project → Settings → Deployment Protection
2. Enable **Vercel Authentication** for Preview deployments
3. Enable protection for Development deployments
4. Add `mockmateapp.com` (production domain) as a **bypass exception** so real users are never blocked

## Environment Variable Scoping

For each sensitive variable, go to Vercel → Settings → Environment Variables and verify:

| Variable | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | ✓ Required | ✗ Remove | ✗ Remove |
| `STRIPE_SECRET_KEY` (live) | ✓ Required | Use test key | Use test key |
| `STRIPE_WEBHOOK_SECRET` (live) | ✓ Required | Use test secret | Use test secret |
| `OPENAI_API_KEY` | ✓ Required | Optional | Optional |
| `RESEND_API_KEY` | ✓ Required | Optional | Optional |
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | Staging URL | Dev URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | Staging key | Dev key |

## Sensitive Environment Variables

- Enable **Sensitive Environment Variables** in Vercel project settings
- This hides variable values from deployment logs

## Source Maps

- Confirm `productionBrowserSourceMaps: false` in `next.config.ts` (done in code)
- Verify in Vercel build logs that `*.js.map` files are not generated for production

## Team Access

- Review Vercel team members
- Remove inactive collaborators
- Ensure all team members use strong passwords and 2FA

## Deployment Logs

- Spot-check recent build and deployment logs
- Look for accidentally logged environment variable values
- Look for stack traces containing sensitive information
