import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'
function isPremiumUser(user: { email?: string | null; user_metadata?: Record<string, unknown> }): boolean {
  return user.email === ADMIN_EMAIL || user.user_metadata?.sat_upgrade_unlocked === true
}

interface AttemptBody {
  questionId: string
  skillSlug: string
  difficulty: 'easy' | 'medium' | 'hard'
  selectedAnswer?: string
  correctAnswer: string
  isCorrect: boolean
  practiceMode?: string
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!isPremiumUser(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

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

    const { error } = await supabase
      .from('sat_math_academy_attempts')
      .insert({
        user_id: user.id,
        question_id: body.questionId,
        skill_slug: body.skillSlug,
        correct: body.isCorrect,
        practice_mode: body.practiceMode ?? 'skill_drill',
      })

    if (error) {
      console.error('math-attempts insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('math-attempts error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!isPremiumUser(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data: attempts, error } = await supabase
      .from('sat_math_academy_attempts')
      .select('skill_slug, correct, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('math-attempts GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group by skill, return attempt count + recent accuracy
    const bySkill: Record<string, { correct: boolean; created_at: string }[]> = {}
    for (const a of attempts ?? []) {
      if (!bySkill[a.skill_slug]) bySkill[a.skill_slug] = []
      bySkill[a.skill_slug].push(a)
    }

    const result = Object.entries(bySkill).map(([skillSlug, rows]) => {
      const recent = rows.slice(-20)
      const correctCount = recent.filter(r => r.correct).length
      const pct = recent.length > 0 ? Math.round((correctCount / recent.length) * 100) : 0
      return {
        skillSlug,
        attemptCount: rows.length,
        recentAccuracy: pct,
        lastAttemptAt: rows[rows.length - 1]?.created_at ?? null,
      }
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('math-attempts GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
