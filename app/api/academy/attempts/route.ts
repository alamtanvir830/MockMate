import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { computeMastery } from '@/lib/academy/mastery'
import type { Difficulty } from '@/lib/academy/types'
import { hasSatPremium } from '@/lib/auth/server'

interface AttemptBody {
  questionId: string
  skillSlug: string
  subskillSlug?: string
  difficulty: Difficulty
  selectedAnswer?: string
  correctAnswer: string
  isCorrect: boolean
  sourceType: string
  sourceId: string
  responseTimeSeconds?: number
  // New curriculum v2 fields
  practiceMode?: string
  domainSlug?: string
  questionTypeIdentified?: string
  questionTypeCorrect?: boolean
  hintCount?: number
  confidence?: number
  timed?: boolean
  errorCategory?: string
  contentVersion?: number
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as AttemptBody

    // Validate required fields
    if (
      typeof body.questionId !== 'string' || !body.questionId ||
      typeof body.skillSlug !== 'string' || !body.skillSlug ||
      typeof body.difficulty !== 'string' || !['easy', 'medium', 'hard'].includes(body.difficulty) ||
      typeof body.correctAnswer !== 'string' || !body.correctAnswer ||
      typeof body.isCorrect !== 'boolean' ||
      typeof body.sourceType !== 'string' || !body.sourceType ||
      typeof body.sourceId !== 'string' || !body.sourceId
    ) {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const { data: insertedAttempt, error: attemptError } = await supabase
      .from('sat_rw_academy_attempts')
      .insert({
        user_id: user.id,
        user_email,
        user_name,
        source_type: body.sourceType,
        source_id: body.sourceId,
        question_id: body.questionId,
        skill_slug: body.skillSlug,
        subskill_slug: body.subskillSlug ?? null,
        difficulty: body.difficulty,
        selected_answer: body.selectedAnswer ?? null,
        correct_answer: body.correctAnswer,
        is_correct: body.isCorrect,
        response_time_seconds: body.responseTimeSeconds ?? null,
        // Curriculum v2 enrichment fields
        practice_mode: body.practiceMode ?? null,
        domain_slug: body.domainSlug ?? null,
        question_type_identified: body.questionTypeIdentified ?? null,
        question_type_correct: body.questionTypeCorrect ?? null,
        hint_count: body.hintCount ?? 0,
        confidence: body.confidence ?? null,
        timed: body.timed ?? false,
        error_category: body.errorCategory ?? null,
        content_version: body.contentVersion ?? 1,
      })
      .select('id')
      .single()

    if (attemptError) {
      console.error('academy/attempts insert error:', attemptError)
      return NextResponse.json({ error: attemptError.message }, { status: 500 })
    }

    let addedToReview = false

    if (!body.isCorrect) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      const { error: reviewError } = await supabase
        .from('sat_rw_review_queue')
        .upsert(
          {
            user_id: user.id,
            question_id: body.questionId,
            source_type: body.sourceType,
            skill_slug: body.skillSlug,
            review_stage: 0,
            next_review_at: tomorrow.toISOString(),
            last_result_correct: false,
            last_reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,question_id,source_type',
          },
        )

      if (reviewError) {
        console.error('academy/attempts review queue upsert error:', reviewError)
      } else {
        addedToReview = true
      }
    }

    return NextResponse.json({ id: insertedAttempt.id, addedToReview })
  } catch (err) {
    console.error('academy/attempts error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    // Fetch all attempts for this user, ordered by created_at
    const { data: attempts, error } = await supabase
      .from('sat_rw_academy_attempts')
      .select('skill_slug, difficulty, is_correct, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('academy/attempts GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by skill
    const bySkill: Record<string, { difficulty: string; is_correct: boolean; created_at: string }[]> = {}
    for (const a of attempts ?? []) {
      if (!bySkill[a.skill_slug]) bySkill[a.skill_slug] = []
      bySkill[a.skill_slug].push(a)
    }

    const result = Object.entries(bySkill).map(([skillSlug, skillAttempts]) => {
      // Only last 30 for mastery calc
      const recentForMastery = skillAttempts.slice(-30).map(a => ({
        difficulty: a.difficulty as Difficulty,
        is_correct: a.is_correct,
      }))
      const { score, status } = computeMastery(recentForMastery)
      const lastAttempt = skillAttempts[skillAttempts.length - 1]

      return {
        skillSlug,
        attemptCount: skillAttempts.length,
        masteryScore: score,
        status,
        lastAttemptAt: lastAttempt?.created_at ?? null,
      }
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('academy/attempts GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
