import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'

const SAT_FORM_NUMBERS = [1, 2, 3, 4, 5] as const

export interface SATFormInfo {
  formNumber: typeof SAT_FORM_NUMBERS[number]
  startRoute: string
  resultsRoute: string | null
  accessible: boolean
  attemptCount: number
  lastCompletedAt: string | null
  latestAttemptId: string | null
  totalScore: number | null
  rwScore: number | null
  mathScore: number | null
}

export interface SATFormsAPIResponse {
  forms: SATFormInfo[]
  satPremium: boolean
  masteryCheckCompletedAt: string | null
  finalMilestoneComplete: boolean
  postMasteryForm: {
    formNumber: number
    attemptId: string
    completedAt: string
    totalScore: number | null
    rwScore: number | null
    mathScore: number | null
  } | null
  recommendedFormNumber: typeof SAT_FORM_NUMBERS[number]
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const satPremium = hasSatPremium(user)

    // Fetch all completed SAT form attempts for this user
    const [attemptsResult, masteryResult] = await Promise.all([
      supabase
        .from('standardized_exam_attempts')
        .select('local_attempt_id, form_number, total_score, rw_score, math_score, completed_at')
        .eq('user_id', user.id)
        .eq('exam_type', 'SAT')
        .in('form_number', SAT_FORM_NUMBERS)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false }),

      // Mastery check completion timestamp from academy attempts
      supabase
        .from('sat_rw_academy_attempts')
        .select('created_at')
        .eq('user_id', user.id)
        .eq('practice_mode', 'mastery_check')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ])

    const rows = attemptsResult.data ?? []
    const masteryCheckCompletedAt = masteryResult.data?.created_at ?? null

    // Aggregate per form (rows already sorted newest-first)
    const forms: SATFormInfo[] = SAT_FORM_NUMBERS.map(formNumber => {
      const formRows = rows.filter(r => r.form_number === formNumber)
      const latest = formRows[0] ?? null

      // Form 1 is accessible to all (free window or premium); Forms 2-5 require premium
      const accessible = satPremium || formNumber === 1

      return {
        formNumber,
        startRoute: `/premade/sat/form-${formNumber}`,
        resultsRoute: latest
          ? `/premade/sat/form-${formNumber}/results/${latest.local_attempt_id}`
          : null,
        accessible,
        attemptCount: formRows.length,
        lastCompletedAt: latest?.completed_at ?? null,
        latestAttemptId: latest?.local_attempt_id ?? null,
        totalScore: latest?.total_score ?? null,
        rwScore: latest?.rw_score ?? null,
        mathScore: latest?.math_score ?? null,
      }
    })

    // Find the first qualifying post-mastery SAT attempt
    let postMasteryForm: SATFormsAPIResponse['postMasteryForm'] = null
    if (masteryCheckCompletedAt) {
      const qualifying = rows.find(r => r.completed_at > masteryCheckCompletedAt)
      if (qualifying) {
        postMasteryForm = {
          formNumber: qualifying.form_number,
          attemptId: qualifying.local_attempt_id,
          completedAt: qualifying.completed_at,
          totalScore: qualifying.total_score ?? null,
          rwScore: qualifying.rw_score ?? null,
          mathScore: qualifying.math_score ?? null,
        }
      }
    }

    // Recommendation: prioritise accessible, uncompleted, lowest-numbered
    const accessibleForms = forms.filter(f => f.accessible)
    const uncompleted = accessibleForms.filter(f => f.lastCompletedAt === null)
    let recommendedFormNumber: typeof SAT_FORM_NUMBERS[number] = 1

    if (uncompleted.length > 0) {
      // Lowest-numbered uncompleted accessible form
      recommendedFormNumber = uncompleted.reduce((min, f) =>
        f.formNumber < min ? f.formNumber : min, uncompleted[0].formNumber,
      ) as typeof SAT_FORM_NUMBERS[number]
    } else if (accessibleForms.length > 0) {
      // All accessible forms completed — least recently completed
      const sorted = [...accessibleForms].sort((a, b) => {
        if (!a.lastCompletedAt) return 1
        if (!b.lastCompletedAt) return -1
        return a.lastCompletedAt.localeCompare(b.lastCompletedAt)
      })
      recommendedFormNumber = sorted[0].formNumber as typeof SAT_FORM_NUMBERS[number]
    }

    const response: SATFormsAPIResponse = {
      forms,
      satPremium,
      masteryCheckCompletedAt,
      finalMilestoneComplete: !!postMasteryForm,
      postMasteryForm,
      recommendedFormNumber,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('GET /api/academy/sat-forms error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
