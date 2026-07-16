import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface ReviewResultBody {
  queueItemId: string
  isCorrect: boolean
}

// Days to add per stage transition when correct
const STAGE_INTERVALS: Record<number, number> = {
  0: 1,   // stage 0 -> 1: +1 day
  1: 3,   // stage 1 -> 2: +3 days
  2: 7,   // stage 2 -> 3: +7 days
  3: 14,  // stage 3 -> 4: +14 days
}
const DEFAULT_INTERVAL = 30  // stage 4+: +30 days

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { data, error, count } = await supabase
      .from('sat_rw_review_queue')
      .select('id, question_id, source_type, skill_slug, review_stage', { count: 'exact' })
      .eq('user_id', user.id)
      .lte('next_review_at', new Date().toISOString())
      .order('next_review_at', { ascending: true })
      .limit(50)

    if (error) {
      console.error('academy/review-queue GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const items = (data ?? []).map((row) => ({
      id: row.id,
      questionId: row.question_id,
      sourceType: row.source_type,
      skillSlug: row.skill_slug,
      reviewStage: row.review_stage,
    }))

    return NextResponse.json({ items, totalDue: count ?? items.length })
  } catch (err) {
    console.error('academy/review-queue GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as ReviewResultBody

    if (typeof body.queueItemId !== 'string' || !body.queueItemId || typeof body.isCorrect !== 'boolean') {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    // Fetch current item (ensure it belongs to this user)
    const { data: item, error: fetchError } = await supabase
      .from('sat_rw_review_queue')
      .select('id, review_stage')
      .eq('id', body.queueItemId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !item) {
      return NextResponse.json({ error: 'Review item not found.' }, { status: 404 })
    }

    const now = new Date()
    let nextReviewAt: Date
    let newStage: number

    if (body.isCorrect) {
      newStage = item.review_stage + 1
      const daysToAdd = STAGE_INTERVALS[item.review_stage] ?? DEFAULT_INTERVAL
      nextReviewAt = new Date(now)
      nextReviewAt.setDate(nextReviewAt.getDate() + daysToAdd)
    } else {
      newStage = 0
      nextReviewAt = new Date(now)
      nextReviewAt.setDate(nextReviewAt.getDate() + 1)
    }

    const { error: updateError } = await supabase
      .from('sat_rw_review_queue')
      .update({
        review_stage: newStage,
        next_review_at: nextReviewAt.toISOString(),
        last_result_correct: body.isCorrect,
        last_reviewed_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq('id', body.queueItemId)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('academy/review-queue POST update error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ nextReviewAt: nextReviewAt.toISOString() })
  } catch (err) {
    console.error('academy/review-queue POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
