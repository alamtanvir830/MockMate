'use server'
// Server-only module — never import from client components

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export type AiFeature = 'mcat_feedback' | 'other_ai_feedback'

interface QuotaResult {
  allowed: boolean
  limitCount: number
  usedCount: number
  remainingCount: number
  resetAt: string // ISO timestamp
}

interface QuotaRpcRow {
  allowed: boolean
  limit_count: number
  used_count: number
  remaining_count: number
  reset_at: string
}

/**
 * Atomically consume one unit of the authenticated user's daily AI quota.
 * Returns null when allowed, or a NextResponse with status 429 or 503.
 *
 * MUST be called AFTER supabase.auth.getUser() has confirmed a valid user.
 * Call this BEFORE any OpenAI invocation.
 */
export async function consumeAiQuota(
  feature: AiFeature,
): Promise<{ denied: NextResponse } | null> {
  const supabase = await createClient()

  let result: QuotaResult
  try {
    const { data, error } = await supabase.rpc('consume_ai_daily_quota', {
      p_feature: feature,
    })

    if (error) {
      console.error('[aiDailyQuota] RPC error:', error.code, error.message)
      return {
        denied: NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again shortly.' },
          { status: 503 },
        ),
      }
    }

    const row = data as QuotaRpcRow
    result = {
      allowed: row.allowed,
      limitCount: row.limit_count,
      usedCount: row.used_count,
      remainingCount: row.remaining_count,
      resetAt: row.reset_at,
    }
  } catch (err) {
    console.error('[aiDailyQuota] unexpected error:', err)
    return {
      denied: NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again shortly.' },
        { status: 503 },
      ),
    }
  }

  if (!result.allowed) {
    const resetAt = new Date(result.resetAt)
    const now = new Date()
    const retryAfterSeconds = Math.max(0, Math.ceil((resetAt.getTime() - now.getTime()) / 1000))

    return {
      denied: NextResponse.json(
        {
          error:
            "You have reached today's AI feedback limit. Your access resets at midnight Eastern Time.",
          reset_at: result.resetAt,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(result.limitCount),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(resetAt.getTime() / 1000)),
          },
        },
      ),
    }
  }

  return null // allowed
}
