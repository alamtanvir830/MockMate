# Rate Limiting Implementation Plan

## 1. Infrastructure Assessment

### Vercel Plan
The project is deployed on Vercel. Edge Middleware (used for rate limiting) is available on all Vercel plans including Hobby. However, the Hobby plan limits middleware execution time; keep middleware logic lightweight.

### Existing Rate Limiting Infrastructure
None. Audit of `package.json` confirms no `@upstash/ratelimit`, `@upstash/redis`, `ioredis`, `redis`, `rate-limiter-flexible`, or similar packages are present.

### Existing Middleware
No `middleware.ts` file exists in the project root. The closest configuration is in `next.config.ts`, which sets security headers via `async headers()`. The Supabase session refresh is not yet in middleware form.

---

## 2. Endpoints Requiring Rate Limiting

| Endpoint | HTTP Method | Risk | Recommended Limit | Key Strategy |
|---|---|---|---|---|
| `/api/mcat-feedback` | POST | HIGH — calls OpenAI GPT-4o-mini; unauthenticated abuse before auth fix; each call costs ~$0.002 | 5 requests / 10 minutes per user | Per `user.id` from JWT |
| `/api/sat-feedback` | POST | HIGH — calls OpenAI GPT-4o; each call costs ~$0.01–0.05 | 5 requests / 10 minutes per user | Per `user.id` from JWT |
| `/api/premade/save-attempt` | POST | MEDIUM — DB write, entitlement check | 20 requests / hour per user | Per `user.id` from JWT |
| `/api/sat/in-progress` | POST | LOW-MEDIUM — autosave; called frequently but low cost | 120 requests / minute per user | Per `user.id` from JWT |
| `/api/extract-text` | POST | MEDIUM — file parsing (PDF/DOCX), CPU-intensive | 30 requests / hour per user | Per `user.id` from JWT |
| `/api/sat-verify-password` | POST | HIGH — brute-force vector | 10 requests / hour per IP | Per IP (no auth on this endpoint) |
| `/api/admin/*` | POST/GET | MEDIUM — already key-protected but timing attacks possible | 60 requests / minute per IP | Per IP |
| `/api/stripe/webhook` | POST | LOW — Stripe signs all webhooks; still rate-limit replay attempts | 200 requests / minute per IP | Per IP |
| `/api/contact` or similar | POST | MEDIUM — spam / abuse vector | 5 requests / hour per IP | Per IP |

---

## 3. Recommended Approach: Upstash Redis + `@upstash/ratelimit`

### Why Upstash
- **Serverless-native**: Upstash Redis is HTTP-based; no persistent TCP connection needed in Vercel Edge/Serverless environments.
- **Free tier**: 10,000 requests/day free, sufficient for development and low-traffic production.
- **Official Vercel integration**: Available directly from the Vercel Marketplace.

### Implementation Pattern

#### Step 1 — Install dependencies
```bash
npm install @upstash/ratelimit @upstash/redis
```

#### Step 2 — Create the rate limiter utility

Create `lib/rate-limit.ts`:
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

/**
 * Pre-configured limiters. Import the one that matches your endpoint's risk level.
 */
export const rateLimiters = {
  // For AI endpoints (mcat-feedback, sat-feedback)
  aiEndpoint: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'rl:ai',
    analytics: true,
  }),

  // For exam submission endpoints
  examSubmit: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 h'),
    prefix: 'rl:exam-submit',
    analytics: true,
  }),

  // For autosave endpoints
  autosave: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(120, '1 m'),
    prefix: 'rl:autosave',
    analytics: true,
  }),

  // For IP-keyed endpoints (password verification, admin)
  ipBased: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    prefix: 'rl:ip',
    analytics: true,
  }),
}
```

#### Step 3 — Apply in route handlers

Pattern for user-keyed endpoints:
```typescript
import { rateLimiters } from '@/lib/rate-limit'

// Inside your POST handler, after auth check:
const { success, remaining, reset } = await rateLimiters.aiEndpoint.limit(user.id)
if (!success) {
  return NextResponse.json(
    { error: 'Too many requests. Please wait before trying again.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
        'X-RateLimit-Remaining': String(remaining),
      },
    }
  )
}
```

Pattern for IP-keyed endpoints:
```typescript
const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
const { success } = await rateLimiters.ipBased.limit(ip)
```

#### Step 4 — Optional: Next.js Middleware for global protection

For IP-based limits on unauthenticated endpoints, add `middleware.ts` at the project root:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  prefix: 'rl:global',
})

export async function middleware(req: NextRequest) {
  // Only apply to API routes
  if (!req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
```

---

## 4. Fail-Open vs Fail-Closed Trade-offs

### Fail-Open (recommended for initial rollout)
If Redis/Upstash is unavailable, allow the request through.

**Pros**: No production outage if Upstash has an incident. Better user experience.
**Cons**: Rate limiting is temporarily disabled during Redis downtime.

Implementation: Wrap `ratelimit.limit()` in a try/catch that returns `{ success: true }` on error.

```typescript
async function checkRateLimit(limiter: Ratelimit, key: string): Promise<boolean> {
  try {
    const { success } = await limiter.limit(key)
    return success
  } catch (err) {
    console.error('[rate-limit] Redis error, failing open:', err)
    return true // fail open
  }
}
```

### Fail-Closed
Block requests if Redis is unavailable.

**Pros**: Strict abuse prevention even during infrastructure issues.
**Cons**: Legitimate users get 429 errors during Redis downtime. Risk of outage if Upstash has an incident.

**Recommendation**: Use fail-open for AI endpoints and autosave; consider fail-closed only for `/api/sat-verify-password` due to its brute-force risk.

---

## 5. Deployment Steps

1. Create an Upstash Redis database via the Vercel Marketplace integration (automatically sets env vars) or manually at console.upstash.com.
2. Add environment variables to Vercel (see Section 7).
3. Install `@upstash/ratelimit` and `@upstash/redis`: `npm install @upstash/ratelimit @upstash/redis`.
4. Create `lib/rate-limit.ts` with the limiters defined above.
5. Apply rate limiting to `/api/mcat-feedback` and `/api/sat-feedback` first (highest risk, lowest traffic).
6. Deploy to a staging/preview environment and test with a script that fires >5 requests in under 10 minutes.
7. Verify 429 responses include `Retry-After` header.
8. Roll out to `/api/premade/save-attempt` and `/api/sat/in-progress`.
9. Add middleware-level IP rate limiting for `/api/sat-verify-password`.
10. Monitor Upstash dashboard for analytics (enabled via `analytics: true`).

---

## 6. Rollback Steps

1. Remove the rate limit check block from the affected route handler (or wrap in `if (process.env.RATE_LIMITING_ENABLED === 'true')`).
2. Redeploy.
3. The Upstash Redis database retains counters but they expire naturally (sliding window).
4. Uninstall `@upstash/ratelimit` and `@upstash/redis` if removing entirely.

Feature-flag pattern for zero-downtime rollback:
```typescript
const RATE_LIMITING_ENABLED = process.env.RATE_LIMITING_ENABLED === 'true'
if (RATE_LIMITING_ENABLED) {
  const allowed = await checkRateLimit(rateLimiters.aiEndpoint, user.id)
  if (!allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
}
```

---

## 7. Required Environment Variables

Add these to Vercel Project Settings → Environment Variables:

- `UPSTASH_REDIS_REST_URL` — REST URL for the Upstash Redis database
- `UPSTASH_REDIS_REST_TOKEN` — Read-write token for the Upstash Redis database
- `RATE_LIMITING_ENABLED` — Optional feature flag: `"true"` to enable, `"false"` to bypass (useful for rollback)

---

## 8. Monitoring Approach

### Upstash Analytics Dashboard
Enable `analytics: true` on each `Ratelimit` instance. The Upstash console shows:
- Request counts per limiter prefix
- Blocked request counts (429s issued)
- Top rate-limited keys (user IDs or IPs)

### Vercel Logs
Search for `[rate-limit]` prefix in Vercel Function logs to track:
- Fail-open events (Redis errors)
- High-frequency limiters triggering

### Alerting
- Set up an Upstash alert if the daily command quota exceeds 80% of the plan limit.
- Consider adding a `console.warn('[rate-limit] blocked:', key)` log line for each 429 so Vercel log-based alerts can trigger.

### Metrics to Track at Launch
- 429 rate as a percentage of total API requests (target: <1% under normal load)
- P99 latency impact from the Redis call (target: <20ms added latency on Vercel Edge)
- False positive rate from legitimate heavy users (e.g., users retaking exams back-to-back)
