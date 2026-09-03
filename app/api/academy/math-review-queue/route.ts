import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { getFreshAuthUser } from '@/lib/entitlements'

// Stage → days until next review (same schedule as R&W Academy)
const STAGE_INTERVALS: Record<number, number> = { 0: 1, 1: 3, 2: 7, 3: 14 }
function nextReviewDays(stage: number) {
  return STAGE_INTERVALS[stage] ?? 30
}

// ── GET — items due for review ─────────────────────────────────────────────────

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(await getFreshAuthUser(user))) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const now = new Date().toISOString()
    const { data: items, error, count } = await supabase
      .from('sat_math_review_queue')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .lte('next_review_at', new Date(Date.now() + 86_400_000).toISOString())
      .order('next_review_at', { ascending: true })
      .limit(50)

    if (error) {
      console.error('math-review-queue GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ items: items ?? [], totalDue: count ?? 0 })
  } catch (err) {
    console.error('math-review-queue GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ── POST — update item after review ──────────────────────────────────────────

interface ReviewBody {
  questionId: string
  sourceType?: string
  isCorrect: boolean
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(await getFreshAuthUser(user))) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as ReviewBody

    if (typeof body.questionId !== 'string' || !body.questionId || typeof body.isCorrect !== 'boolean') {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const sourceType = body.sourceType ?? 'drill'
    const now = new Date()

    // Fetch current stage
    const { data: existing } = await supabase
      .from('sat_math_review_queue')
      .select('id, review_stage')
      .eq('user_id', user.id)
      .eq('question_id', body.questionId)
      .eq('source_type', sourceType)
      .single()

    if (!existing) return NextResponse.json({ error: 'Review item not found.' }, { status: 404 })

    const newStage = body.isCorrect ? existing.review_stage + 1 : 0
    const daysAhead = nextReviewDays(newStage)
    const nextReview = new Date(now)
    nextReview.setDate(nextReview.getDate() + daysAhead)

    const { error } = await supabase
      .from('sat_math_review_queue')
      .update({
        review_stage:        newStage,
        next_review_at:      nextReview.toISOString(),
        last_result_correct: body.isCorrect,
        last_reviewed_at:    now.toISOString(),
        updated_at:          now.toISOString(),
      })
      .eq('id', existing.id)

    if (error) {
      console.error('math-review-queue update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, newStage, nextReviewDays: daysAhead })
  } catch (err) {
    console.error('math-review-queue POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
