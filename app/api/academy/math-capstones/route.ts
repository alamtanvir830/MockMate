import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'
function isPremiumUser(user: { email?: string | null; user_metadata?: Record<string, unknown> }): boolean {
  return user.email === ADMIN_EMAIL || user.user_metadata?.sat_upgrade_unlocked === true
}

interface AttemptRow {
  question_id: string
  skill_slug: string
  correct: boolean
  created_at: string
  practice_mode: string
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!isPremiumUser(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data: attempts, error } = await supabase
      .from('sat_math_academy_attempts')
      .select('question_id, skill_slug, correct, created_at, practice_mode')
      .eq('user_id', user.id)
      .in('practice_mode', ['capstone', 'mastery_check'])

    if (error) {
      console.error('math-capstones GET error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const rows = (attempts ?? []) as AttemptRow[]

    const MATH_CAPSTONE_AVAILABLE: Record<number, boolean> = {
      1: true,
      2: true,
      3: false, // content pending
    }

    const capstones = [1, 2, 3].map(num => {
      const capPrefix = `mc${num}-`
      const m2Prefix = `mc${num}-m2-`
      const all = rows.filter(r => r.question_id.startsWith(capPrefix) && r.practice_mode === 'capstone')
      const m2 = rows.filter(r => r.question_id.startsWith(m2Prefix) && r.practice_mode === 'capstone')
      const completed = m2.length > 0

      let accuracy: number | null = null
      let correctCount: number | null = null
      let totalCount: number | null = null
      const weakestSlugs: string[] = []
      let completedAt: string | null = null

      if (completed && all.length > 0) {
        const correct = all.filter(r => r.correct).length
        accuracy = Math.round((correct / all.length) * 100)
        correctCount = correct
        totalCount = all.length

        const bySkill: Record<string, { correct: number; total: number }> = {}
        for (const r of all) {
          if (!r.skill_slug) continue
          if (!bySkill[r.skill_slug]) bySkill[r.skill_slug] = { correct: 0, total: 0 }
          bySkill[r.skill_slug].total++
          if (r.correct) bySkill[r.skill_slug].correct++
        }

        weakestSlugs.push(
          ...Object.entries(bySkill)
            .sort(([, a], [, b]) => (a.correct / a.total) - (b.correct / b.total))
            .slice(0, 3)
            .map(([slug]) => slug),
        )

        const m2Dates = m2.map(r => r.created_at).filter(Boolean).sort()
        completedAt = m2Dates[m2Dates.length - 1] ?? null
      }

      return {
        capstoneId: `math-capstone-${num}`,
        number: num,
        available: MATH_CAPSTONE_AVAILABLE[num] ?? false,
        completed,
        accuracy,
        correctCount,
        totalCount,
        weakestSlugs,
        completedAt,
      }
    })

    const masteryCheckDone = rows.some(r => r.practice_mode === 'mastery_check')

    return NextResponse.json({ capstones, masteryCheckDone })
  } catch (err) {
    console.error('math-capstones GET error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
