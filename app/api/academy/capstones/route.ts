import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ACADEMY_SKILL_SLUGS } from '@/lib/academy/skill-mapping'
import { hasSatPremium } from '@/lib/auth/server'

const CAPSTONE_AVAILABLE: Record<string, boolean> = {
  'capstone-1': true,
  'capstone-2': true,
  'capstone-3': true,
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data: attempts, error } = await supabase
      .from('sat_rw_academy_attempts')
      .select('source_id, skill_slug, is_correct, created_at, practice_mode')
      .eq('user_id', user.id)
      .in('practice_mode', ['capstone', 'mastery_check'])

    if (error) {
      console.error('capstones GET error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const rows = attempts ?? []

    const capstones = [1, 2, 3].map(num => {
      const capstoneId = `capstone-${num}`
      const m1 = rows.filter(r => r.source_id === `${capstoneId}-m1`)
      const m2 = rows.filter(r => r.source_id === `${capstoneId}-m2`)
      const all = [...m1, ...m2]
      const completed = m2.length > 0
      const available = CAPSTONE_AVAILABLE[capstoneId] ?? false

      let accuracy: number | null = null
      let correctCount: number | null = null
      let totalCount: number | null = null
      const weakestSlugs: string[] = []
      let completedAt: string | null = null

      if (completed && all.length > 0) {
        const correct = all.filter(r => r.is_correct).length
        accuracy = Math.round((correct / all.length) * 100)
        correctCount = correct
        totalCount = all.length

        const bySkill: Record<string, { correct: number; total: number }> = {}
        for (const r of all) {
          if (!r.skill_slug) continue
          if (!bySkill[r.skill_slug]) bySkill[r.skill_slug] = { correct: 0, total: 0 }
          bySkill[r.skill_slug].total++
          if (r.is_correct) bySkill[r.skill_slug].correct++
        }

        // Rank weakest: lowest accuracy first, using ACADEMY_SKILL_SLUGS order as tiebreaker
        const skillOrder = [...ACADEMY_SKILL_SLUGS] as string[]
        weakestSlugs.push(
          ...Object.entries(bySkill)
            .sort(([slugA, a], [slugB, b]) => {
              const pctA = a.correct / a.total
              const pctB = b.correct / b.total
              if (pctA !== pctB) return pctA - pctB
              return skillOrder.indexOf(slugA) - skillOrder.indexOf(slugB)
            })
            .slice(0, 3)
            .map(([slug]) => slug)
        )

        // Approximate completion time from latest m2 record
        const m2Dates = m2.map(r => r.created_at).filter(Boolean).sort()
        completedAt = m2Dates[m2Dates.length - 1] ?? null
      }

      return { capstoneId, number: num, available, completed, accuracy, correctCount, totalCount, weakestSlugs, completedAt }
    })

    const masteryCheckDone = rows.some(r => r.practice_mode === 'mastery_check')

    return NextResponse.json({ capstones, masteryCheckDone })
  } catch (err) {
    console.error('capstones GET error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
