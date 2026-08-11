import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface SaveAttemptBody {
  localAttemptId: string
  formNumber: number
  examTitle: string
  contentVersion: string
  scoringVersion: string
  completedAt: string
  chemPhysScore: number
  carsScore: number
  bioBiochemScore: number
  psychSocScore: number
  totalScore: number
  chemPhysCorrect: number
  chemPhysTotal: number
  carsCorrect: number
  carsTotal: number
  bioBiochemCorrect: number
  bioBiochemTotal: number
  psychSocCorrect: number
  psychSocTotal: number
  answers: Record<string, string>
  bookmarks: string[]
}

interface UpdateFeedbackBody {
  localAttemptId: string
  aiFeedback: Record<string, unknown>
}

// POST — save completed MCAT attempt
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as SaveAttemptBody

    if (!body.localAttemptId || typeof body.localAttemptId !== 'string') {
      return NextResponse.json({ error: 'Invalid localAttemptId' }, { status: 400 })
    }
    if (typeof body.formNumber !== 'number' || body.formNumber < 1 || body.formNumber > 5) {
      return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
    }

    const { error } = await supabase
      .from('mcat_completed_attempts')
      .insert({
        user_id: user.id,
        local_attempt_id: body.localAttemptId,
        form_number: body.formNumber,
        content_version: body.contentVersion,
        scoring_version: body.scoringVersion,
        completed_at: body.completedAt,
        chem_phys_score: body.chemPhysScore,
        cars_score: body.carsScore,
        bio_biochem_score: body.bioBiochemScore,
        psych_soc_score: body.psychSocScore,
        total_score: body.totalScore,
        chem_phys_correct: body.chemPhysCorrect,
        chem_phys_total: body.chemPhysTotal,
        cars_correct: body.carsCorrect,
        cars_total: body.carsTotal,
        bio_biochem_correct: body.bioBiochemCorrect,
        bio_biochem_total: body.bioBiochemTotal,
        psych_soc_correct: body.psychSocCorrect,
        psych_soc_total: body.psychSocTotal,
        answers: body.answers,
        bookmarks: body.bookmarks,
      })

    if (error) {
      // Table may not exist yet — degrade gracefully (localStorage is primary path)
      if (error.code === '42P01') return NextResponse.json({ ok: true, degraded: true })
      // Duplicate: already saved (idempotent)
      if (error.code === '23505') return NextResponse.json({ ok: true, duplicate: true })
      console.error('mcat save-attempt error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('mcat save-attempt error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// PATCH — update ai_feedback on an existing completed attempt
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { localAttemptId, aiFeedback } = await req.json() as UpdateFeedbackBody

    if (!localAttemptId || typeof localAttemptId !== 'string') {
      return NextResponse.json({ error: 'Invalid localAttemptId' }, { status: 400 })
    }

    const { error } = await supabase
      .from('mcat_completed_attempts')
      .update({ ai_feedback: aiFeedback })
      .eq('local_attempt_id', localAttemptId)
      .eq('user_id', user.id)

    if (error) {
      if (error.code === '42P01') return NextResponse.json({ ok: true, degraded: true })
      console.error('mcat save-attempt patch error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('mcat save-attempt patch error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
