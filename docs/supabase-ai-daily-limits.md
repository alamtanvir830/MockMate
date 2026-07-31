# Supabase AI Daily Usage Limits

Per-user, per-feature daily AI request quotas enforced at the database layer.

---

## Table: `public.ai_daily_usage`

| Column | Type | Description |
|---|---|---|
| `user_id` | `uuid` | FK → `auth.users(id)` ON DELETE CASCADE |
| `feature` | `text` | Quota bucket: `mcat_feedback` or `other_ai_feedback` |
| `usage_date` | `date` | Date in America/New_York timezone |
| `request_count` | `integer` | Requests made today for this (user, feature) pair |
| `created_at` | `timestamptz` | Row creation timestamp |
| `updated_at` | `timestamptz` | Last increment timestamp |

Primary key: `(user_id, feature, usage_date)`

---

## RPC: `consume_ai_daily_quota(p_feature text)`

**Returns:** `jsonb`

```json
{
  "allowed":         true,
  "limit_count":     25,
  "used_count":      1,
  "remaining_count": 24,
  "reset_at":        "2026-08-01T04:00:00+00"
}
```

**Security properties:**

- `SECURITY DEFINER` — runs as the table owner, bypassing RLS.
- `SET search_path = public` — prevents search-path injection.
- `auth.uid()` — user identity comes from the server session token; callers cannot supply a user ID.
- Atomic upsert — `ON CONFLICT … DO UPDATE … CASE` prevents double-counting under concurrent requests.
- Raises `EXCEPTION 'unauthenticated'` if called without a session.
- Raises `EXCEPTION 'invalid_feature'` if the feature key is not in the allowed set.

---

## Route-to-Bucket Mapping

| Route | Bucket | Daily Limit |
|---|---|---|
| `POST /api/mcat-feedback` | `mcat_feedback` | 25 |
| `POST /api/sat-feedback` | `other_ai_feedback` | 50 |
| `POST /api/anki` | `other_ai_feedback` | 50 |
| `POST /api/study-guide` | `other_ai_feedback` | 50 |
| `POST /api/mind-map` | `other_ai_feedback` | 50 |

The `other_ai_feedback` bucket is **shared** across all non-MCAT routes. A user who generates an Anki deck, a study guide, and a mind map in the same day consumes from the same 50-request pool.

---

## Limits

| Feature | Daily Limit | Notes |
|---|---|---|
| `mcat_feedback` | 25 | Only `/api/mcat-feedback` |
| `other_ai_feedback` | 50 | Shared across SAT feedback, Anki, study guide, mind map |

Limits are defined in the `consume_ai_daily_quota()` function body and can be adjusted by editing the function (see "How to Adjust Limits" below).

---

## Timezone

Resets at **midnight America/New_York** (Eastern Time).

- Summer (EDT): midnight ET = 04:00 UTC
- Winter (EST): midnight ET = 05:00 UTC

The IANA timezone name `America/New_York` in the SQL function handles DST transitions automatically via PostgreSQL's built-in timezone database.

The `reset_at` timestamp returned by the RPC is always the next midnight ET in UTC, which is used by the API helper to compute `Retry-After` and `X-RateLimit-Reset` response headers.

---

## RLS: No Client Access

Row-Level Security is enabled on `ai_daily_usage` with **no client policies**. Direct reads and writes from browser roles (`anon`, `authenticated`) are blocked:

```sql
REVOKE ALL ON public.ai_daily_usage FROM anon, authenticated;
```

All access flows through `consume_ai_daily_quota()`, which is `SECURITY DEFINER`.

---

## Concurrency Safety

The atomic upsert prevents double-counting when the same user fires concurrent requests:

```sql
INSERT INTO public.ai_daily_usage ... VALUES (v_user_id, p_feature, v_today, 1, now())
ON CONFLICT (user_id, feature, usage_date) DO UPDATE
  SET request_count = CASE
        WHEN ai_daily_usage.request_count < v_limit
        THEN ai_daily_usage.request_count + 1
        ELSE ai_daily_usage.request_count   -- already at limit, do not increment
      END,
      updated_at = now()
```

If two requests arrive simultaneously, PostgreSQL serializes the conflict resolution. One request gets count N and the other gets N+1. Neither will exceed the limit.

---

## 429 Behavior

When `allowed = false`, the TypeScript helper (`lib/security/aiDailyQuota.ts`) returns:

**Status:** `429 Too Many Requests`

**Body:**
```json
{
  "error": "You have reached today's AI feedback limit. Your access resets at midnight Eastern Time.",
  "reset_at": "<ISO timestamp of next midnight ET>"
}
```

**Headers:**
| Header | Value |
|---|---|
| `Retry-After` | Seconds until midnight ET |
| `X-RateLimit-Limit` | Daily limit (25 or 50) |
| `X-RateLimit-Remaining` | Always `0` when denied |
| `X-RateLimit-Reset` | Unix timestamp of reset |

---

## 503 Fail-Closed Behavior

When the quota RPC fails (DB connection error, function not found, etc.), the helper returns:

**Status:** `503 Service Unavailable`

**Body:**
```json
{
  "error": "AI service temporarily unavailable. Please try again shortly."
}
```

No OpenAI call is made. This is intentional — failing closed prevents quota bypass via DB outage.

---

## Admin Bypass

There is no automatic admin bypass at the quota layer. The quota RPC is called for all authenticated users equally.

If a future admin bypass is needed, add it in the route handler **after** auth and **before** the quota call:

```typescript
const isAdmin = isMockMateAdmin(user)
if (!isAdmin) {
  const quotaDenied = await consumeAiQuota('mcat_feedback')
  if (quotaDenied) return quotaDenied.denied
}
```

---

## How to Apply the Migration

1. Open your Supabase project → SQL Editor.
2. Copy the contents of `supabase/migrations/20260731000000_ai_daily_usage_limits.sql`.
3. Paste into the SQL Editor and click Run.
4. Verify: `SELECT * FROM information_schema.tables WHERE table_name = 'ai_daily_usage';`
5. Verify function: `SELECT * FROM pg_proc WHERE proname = 'consume_ai_daily_quota';`

**Note:** Docker is not installed in this environment. `supabase db push` is not available. Apply via the Supabase Dashboard SQL Editor only.

---

## Rollback Procedure

To fully remove the quota system:

```sql
-- 1. Drop the function
DROP FUNCTION IF EXISTS public.consume_ai_daily_quota(text);

-- 2. Drop the table (this also removes the index)
DROP TABLE IF EXISTS public.ai_daily_usage;
```

Then remove the `consumeAiQuota` import and calls from all route files.

---

## How to Adjust Limits

The limits are hardcoded in the `consume_ai_daily_quota()` SQL function:

```sql
IF p_feature = 'mcat_feedback' THEN
  v_limit := 25;       -- change this value
ELSE
  v_limit := 50;       -- change this value
END IF;
```

To update a limit, run `CREATE OR REPLACE FUNCTION public.consume_ai_daily_quota(...)` with the new values in the Supabase SQL Editor. No table migration is needed.

---

## How to Inspect Usage Safely

Usage data can only be read by an admin using the service role (Supabase Dashboard or a server-side admin client):

```sql
-- Usage summary by feature and date
SELECT feature, usage_date, COUNT(*) AS user_count, SUM(request_count) AS total_requests
FROM public.ai_daily_usage
GROUP BY feature, usage_date
ORDER BY usage_date DESC, feature;

-- Top users by today's usage (Eastern Time)
SELECT user_id, feature, request_count
FROM public.ai_daily_usage
WHERE usage_date = (now() AT TIME ZONE 'America/New_York')::date
ORDER BY request_count DESC
LIMIT 20;
```

Direct table access from browser clients is blocked by the REVOKE statement and the absence of RLS read policies.
