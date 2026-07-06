import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import {
  resolveModules,
  formNumberFromId,
  getSkill,
  getCorrectAnswer,
  isAnswerCorrect,
} from '@/lib/premade-exams/sat/question-utils'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { attempts } = await req.json() as { attempts: PremadeAttempt[] }
    if (!Array.isArray(attempts) || attempts.length === 0) {
      return NextResponse.json({ inserted: 0, skipped: 0, errors: [] })
    }

    // Filter to known SAT forms only
    const satAttempts = attempts.filter(a =>
      ['sat-form-1', 'sat-form-2', 'sat-form-3'].includes(a.examId)
    )

    // Find which local_attempt_ids already exist in DB
    const { data: existing } = await supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .in('local_attempt_id', satAttempts.map(a => a.id))

    const existingIds = new Set((existing ?? []).map(r => r.local_attempt_id as string))
    const newAttempts = satAttempts.filter(a => !existingIds.has(a.id))

    if (newAttempts.length === 0) {
      return NextResponse.json({ inserted: 0, skipped: satAttempts.length, errors: [] })
    }

    // Group new attempts by form, sorted chronologically for correct attempt_number assignment
    const byForm: Record<number, PremadeAttempt[]> = {}
    for (const a of newAttempts) {
      const fn = formNumberFromId(a.examId)
      if (!fn) continue
      if (!byForm[fn]) byForm[fn] = []
      byForm[fn].push(a)
    }
    for (const fn of Object.keys(byForm)) {
      byForm[Number(fn)].sort((a, b) =>
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
      )
    }

    // Get existing attempt counts per form (for attempt_number offset)
    const formNumbers = Object.keys(byForm).map(Number)
    const countsByForm: Record<number, number> = {}
    await Promise.all(formNumbers.map(async (fn) => {
      const { count } = await supabase
        .from('standardized_exam_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('exam_type', 'SAT')
        .eq('form_number', fn)
      countsByForm[fn] = count ?? 0
    }))

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const errors: string[] = []
    let inserted = 0

    for (const [fnStr, group] of Object.entries(byForm)) {
      const formNumber = Number(fnStr)
      const baseCount = countsByForm[formNumber] ?? 0

      for (let i = 0; i < group.length; i++) {
        const attempt = group[i]
        const attemptNumber = baseCount + i + 1

        // Resolve question modules for this attempt
        const modules = resolveModules(attempt.examId, attempt.rwM2Type, attempt.mathM2Type)
        if (!modules) {
          errors.push(`Unknown examId: ${attempt.examId}`)
          continue
        }

        const { rwM1, rwM2, mathM1, mathM2 } = modules
        const rwCorrect = [rwM1, rwM2].flatMap(m => m.questions).filter(q => isAnswerCorrect(q, attempt.answers[q.id])).length
        const mathCorrect = [mathM1, mathM2].flatMap(m => m.questions).filter(q => isAnswerCorrect(q, attempt.answers[q.id])).length

        // Compute weak skills
        const skillMap: Record<string, { section: string; correct: number; total: number }> = {}
        const allModules = [
          { mod: rwM1, section: 'rw' }, { mod: rwM2, section: 'rw' },
          { mod: mathM1, section: 'math' }, { mod: mathM2, section: 'math' },
        ]
        for (const { mod, section } of allModules) {
          for (const q of mod.questions) {
            const skill = getSkill(q)
            if (!skillMap[skill]) skillMap[skill] = { section, correct: 0, total: 0 }
            skillMap[skill].total++
            if (isAnswerCorrect(q, attempt.answers[q.id])) skillMap[skill].correct++
          }
        }
        const weakSkills = Object.entries(skillMap)
          .filter(([, v]) => v.correct < v.total)
          .map(([skill, v]) => ({ section: v.section, skill, correct: v.correct, total: v.total }))

        // Insert attempt row
        const { data: inserted_row, error: insertErr } = await supabase
          .from('standardized_exam_attempts')
          .insert({
            local_attempt_id:  attempt.id,
            user_id:           user.id,
            user_name,
            user_email,
            exam_type:         'SAT',
            form_number:       formNumber,
            exam_title:        attempt.examTitle,
            attempt_number:    attemptNumber,
            total_score:       attempt.totalScore,
            rw_score:          attempt.rwScaled,
            math_score:        attempt.mathScaled,
            rw_correct:        rwCorrect,
            rw_total:          attempt.rwTotal,
            math_correct:      mathCorrect,
            math_total:        attempt.mathTotal,
            rw_m2_type:        attempt.rwM2Type,
            math_m2_type:      attempt.mathM2Type,
            module_breakdown:  {
              rw_m1_correct: attempt.rwM1Correct, rw_m1_total: rwM1.questionCount,
              rw_m2_correct: attempt.rwM2Correct, rw_m2_total: rwM2.questionCount, rw_m2_type: attempt.rwM2Type,
              math_m1_correct: attempt.mathM1Correct, math_m1_total: mathM1.questionCount,
              math_m2_correct: attempt.mathM2Correct, math_m2_total: mathM2.questionCount, math_m2_type: attempt.mathM2Type,
            },
            weak_skills:       weakSkills,
            submitted_answers: attempt.answers,
            ai_feedback:       attempt.aiFeedback ?? null,
            completed_at:      attempt.completedAt,
          })
          .select('id')
          .single()

        if (insertErr) {
          // Conflict = already synced (race condition) — treat as skipped
          if (insertErr.code === '23505') continue
          errors.push(`${attempt.id}: ${insertErr.message}`)
          continue
        }

        inserted++

        // Insert question-level responses
        const moduleList = [
          { mod: rwM1, name: 'Reading & Writing Module 1' },
          { mod: rwM2, name: `Reading & Writing Module 2 (${attempt.rwM2Type})` },
          { mod: mathM1, name: 'Math Module 1' },
          { mod: mathM2, name: `Math Module 2 (${attempt.mathM2Type})` },
        ]
        const responseRows = moduleList.flatMap(({ mod, name }) =>
          mod.questions.map((q, idx) => ({
            standardized_exam_attempt_id: inserted_row.id,
            local_attempt_id:             attempt.id,
            user_id:                      user.id,
            exam_type:                    'SAT',
            form_number:                  formNumber,
            module_id:                    mod.id,
            module_name:                  name,
            question_id:                  q.id,
            question_number:              idx + 1,
            domain:                       q.domain ?? '',
            skill:                        getSkill(q),
            difficulty:                   q.difficulty ?? '',
            selected_answer:              attempt.answers[q.id] ?? null,
            correct_answer:               getCorrectAnswer(q),
            is_correct:                   isAnswerCorrect(q, attempt.answers[q.id]),
          }))
        )

        const { error: respErr } = await supabase
          .from('standardized_exam_responses')
          .insert(responseRows)

        if (respErr) {
          errors.push(`responses for ${attempt.id}: ${respErr.message}`)
        }
      }
    }

    return NextResponse.json({
      inserted,
      skipped: satAttempts.length - newAttempts.length,
      errors,
    })
  } catch (err) {
    console.error('sync-attempts error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
