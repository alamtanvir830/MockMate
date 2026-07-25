import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'

// ── Mastery calculation ───────────────────────────────────────────────────────
// Mirrors sat_rw_academy_attempts mastery logic exactly.
// Weights: easy 1.0×, medium 1.25×, hard 1.5×.  Window: last 30 attempts.

const DIFFICULTY_WEIGHT: Record<string, number> = {
  easy: 1.0,
  medium: 1.25,
  hard: 1.5,
}

type MasteryStatus = 'not_started' | 'learning' | 'developing' | 'proficient' | 'mastered'

function computeMastery(attempts: { correct: boolean; difficulty: string | null }[]): {
  masteryPct: number
  masteryStatus: MasteryStatus
} {
  if (attempts.length === 0) return { masteryPct: 0, masteryStatus: 'not_started' }
  if (attempts.length < 5) return { masteryPct: 0, masteryStatus: 'learning' }

  const window = attempts.slice(-30)
  let weightedCorrect = 0
  let weightedTotal = 0
  for (const a of window) {
    const w = DIFFICULTY_WEIGHT[a.difficulty ?? 'medium'] ?? 1.0
    weightedTotal += w
    if (a.correct) weightedCorrect += w
  }

  const pct = weightedTotal > 0 ? Math.round((weightedCorrect / weightedTotal) * 100) : 0
  let masteryStatus: MasteryStatus
  if (pct >= 85 && attempts.length >= 15) masteryStatus = 'mastered'
  else if (pct >= 70) masteryStatus = 'proficient'
  else masteryStatus = 'developing'

  return { masteryPct: pct, masteryStatus }
}

// ── Spaced-repetition queue helper ───────────────────────────────────────────

const STAGE_INTERVALS: Record<number, number> = { 0: 1, 1: 3, 2: 7, 3: 14 }
function nextReviewDays(stage: number) {
  return STAGE_INTERVALS[stage] ?? 30
}

// ── POST — log one attempt ────────────────────────────────────────────────────

interface AttemptBody {
  questionId: string
  skillSlug: string
  subskillSlug?: string
  domainSlug?: string
  difficulty: 'easy' | 'medium' | 'hard'
  selectedAnswer?: string
  correctAnswer: string
  isCorrect: boolean
  practiceMode?: string
  hintCount?: number
  confidence?: 'guessing' | 'unsure' | 'confident'
  timed?: boolean
  errorCategory?: string
  contentVersion?: number
  responseTimeSeconds?: number
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as AttemptBody

    if (
      typeof body.questionId !== 'string' || !body.questionId ||
      typeof body.skillSlug !== 'string' || !body.skillSlug ||
      typeof body.difficulty !== 'string' || !['easy', 'medium', 'hard'].includes(body.difficulty) ||
      typeof body.correctAnswer !== 'string' || !body.correctAnswer ||
      typeof body.isCorrect !== 'boolean'
    ) {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const now = new Date().toISOString()

    const { error: insertError } = await supabase
      .from('sat_math_academy_attempts')
      .insert({
        user_id:              user.id,
        question_id:          body.questionId,
        skill_slug:           body.skillSlug,
        subskill_slug:        body.subskillSlug ?? null,
        domain_slug:          body.domainSlug ?? null,
        difficulty:           body.difficulty,
        selected_answer:      body.selectedAnswer ?? null,
        correct_answer:       body.correctAnswer,
        correct:              body.isCorrect,
        practice_mode:        body.practiceMode ?? 'skill_drill',
        hint_count:           body.hintCount ?? 0,
        confidence:           body.confidence ?? null,
        timed:                body.timed ?? false,
        error_category:       body.errorCategory ?? null,
        content_version:      body.contentVersion ?? 1,
        response_time_seconds: body.responseTimeSeconds ?? null,
      })

    if (insertError) {
      console.error('math-attempts insert error:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Auto-add to review queue when incorrect (non-blocking)
    if (!body.isCorrect && ['skill_drill', 'mastery_assessment', 'mixed_practice'].includes(body.practiceMode ?? 'skill_drill')) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      await supabase
        .from('sat_math_review_queue')
        .upsert(
          {
            user_id:         user.id,
            question_id:     body.questionId,
            source_type:     'drill',
            skill_slug:      body.skillSlug,
            review_stage:    0,
            next_review_at:  tomorrow.toISOString(),
            last_result_correct: false,
            last_reviewed_at: now,
            updated_at:      now,
          },
          { onConflict: 'user_id,question_id,source_type' },
        )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('math-attempts error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ── GET — mastery summary per skill ──────────────────────────────────────────

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data: attempts, error } = await supabase
      .from('sat_math_academy_attempts')
      .select('skill_slug, correct, difficulty, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('math-attempts GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by skill and compute weighted mastery
    const bySkill: Record<string, { correct: boolean; difficulty: string | null; created_at: string }[]> = {}
    for (const a of attempts ?? []) {
      if (!bySkill[a.skill_slug]) bySkill[a.skill_slug] = []
      bySkill[a.skill_slug].push(a)
    }

    const result = Object.entries(bySkill).map(([skillSlug, rows]) => {
      const { masteryPct, masteryStatus } = computeMastery(rows)
      return {
        skillSlug,
        attemptCount: rows.length,
        masteryPct,
        masteryStatus,
        lastAttemptAt: rows[rows.length - 1]?.created_at ?? null,
      }
    })

    // Also return count of review queue items due today
    const { count: reviewDue } = await supabase
      .from('sat_math_review_queue')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .lte('next_review_at', new Date(Date.now() + 86_400_000).toISOString())

    return NextResponse.json({ skills: result, reviewDue: reviewDue ?? 0 })
  } catch (err) {
    console.error('math-attempts GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
