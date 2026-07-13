import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import { allMCATQBQuestions } from '@/lib/question-bank/mcat'
import type { QBPracticeSetResult, QBQuestion } from '@/lib/question-bank/types'
import type { MCATQBPracticeSetResult, MCATQBQuestion } from '@/lib/question-bank/mcat/types'

const ALL_SAT: QBQuestion[] = [...rwQuestions, ...mathQuestions]
const ALL_MCAT: MCATQBQuestion[] = allMCATQBQuestions

function satIsCorrect(q: QBQuestion, ans: string | undefined): boolean {
  if (!ans) return false
  if (q.questionType === 'grid_in') {
    return (q.acceptableAnswers ?? [q.correctAnswer]).some(
      a =>
        a.replace(/\s/g, '').toLowerCase() ===
        ans.replace(/\s/g, '').toLowerCase(),
    )
  }
  return ans === q.correctAnswer
}

function buildSatSnapshot(q: QBQuestion): Record<string, unknown> {
  return {
    id: q.id,
    test: q.test,
    section: q.section,
    domain: q.domain,
    skill: q.skill,
    difficulty: q.difficulty,
    questionType: q.questionType,
    stimulus: q.stimulus ?? null,
    question: q.question,
    choices: q.choices ?? null,
    correctAnswer: q.correctAnswer,
    acceptableAnswers: q.acceptableAnswers ?? null,
    explanation: q.explanation,
    wrongAnswerExplanations: q.wrongAnswerExplanations ?? null,
    teachingPoint: q.teachingPoint,
  }
}

function buildMcatSnapshot(q: MCATQBQuestion): Record<string, unknown> {
  return {
    id: q.id,
    test: q.test,
    section: q.section,
    discipline: q.discipline,
    contentCategory: q.contentCategory,
    foundationalConcept: q.foundationalConcept,
    scientificSkill: q.scientificSkill,
    difficulty: q.difficulty,
    questionType: q.questionType,
    passageText: q.passageText ?? null,
    question: q.question,
    choices: q.choices,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    wrongAnswerExplanations: q.wrongAnswerExplanations,
    teachingPoint: q.teachingPoint,
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const { satResults, mcatResults } = (await req.json()) as {
      satResults: QBPracticeSetResult[]
      mcatResults: MCATQBPracticeSetResult[]
    }

    const sat = satResults ?? []
    const mcat = mcatResults ?? []
    const allIds = [...sat.map(r => r.id), ...mcat.map(r => r.id)]

    if (allIds.length === 0) {
      return NextResponse.json({ inserted: 0, skipped: 0, errors: [] })
    }

    // Find which IDs already exist so we don't double-insert
    const { data: existing } = await supabase
      .from('question_bank_practice_sets')
      .select('id')
      .eq('user_id', user.id)
      .in('id', allIds)

    const existingIds = new Set((existing ?? []).map(r => r.id as string))

    const errors: string[] = []
    let inserted = 0
    let skipped = 0

    // ── SAT results ────────────────────────────────────────────────────────────
    for (const result of sat) {
      if (existingIds.has(result.id)) {
        skipped++
        continue
      }

      const snapshots: Record<string, unknown> = {}
      let correctCount = 0
      let incorrectCount = 0
      let totalTimeSec = 0

      for (const qid of result.questionIds) {
        const q = ALL_SAT.find(x => x.id === qid)
        const ans = result.answers[qid]
        const timeSec = Math.round(result.timeSpentSeconds?.[qid] ?? 0)
        totalTimeSec += timeSec

        if (q) {
          snapshots[qid] = buildSatSnapshot(q)
          if (ans !== undefined) {
            if (satIsCorrect(q, ans)) correctCount++
            else incorrectCount++
          }
        }
      }

      const { error: psErr } = await supabase
        .from('question_bank_practice_sets')
        .insert({
          id: result.id,
          user_id: user.id,
          user_name,
          user_email,
          test: 'SAT',
          section: result.config.section ?? null,
          mode: result.config.mode,
          question_ids: result.questionIds,
          count: result.questionIds.length,
          domains: result.config.domains?.length ? result.config.domains : null,
          skills: result.config.skills?.length ? result.config.skills : null,
          difficulties: result.config.difficulties?.length
            ? result.config.difficulties
            : null,
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          total_time_sec: totalTimeSec,
          question_snapshots: Object.keys(snapshots).length > 0 ? snapshots : null,
          completed_at: result.completedAt,
          created_at: result.completedAt,
        })

      if (psErr) {
        if (psErr.code === '23505') { skipped++; continue }
        errors.push(`SAT set ${result.id}: ${psErr.message}`)
        continue
      }

      inserted++

      const responseRows = result.questionIds.map(qid => {
        const q = ALL_SAT.find(x => x.id === qid)
        const ans = result.answers[qid] ?? null
        return {
          practice_set_id: result.id,
          user_id: user.id,
          question_id: qid,
          test: 'SAT',
          section: q?.section ?? null,
          domain: q?.domain ?? null,
          skill: q?.skill ?? null,
          difficulty: q?.difficulty ?? null,
          user_answer: ans,
          correct_answer: q?.correctAnswer ?? '',
          is_correct: q ? satIsCorrect(q, ans ?? undefined) : false,
          time_spent_sec: Math.round(result.timeSpentSeconds?.[qid] ?? 0),
          answered_at: result.completedAt,
        }
      })

      const { error: rErr } = await supabase
        .from('question_bank_responses')
        .insert(responseRows)

      if (rErr) errors.push(`SAT responses ${result.id}: ${rErr.message}`)
    }

    // ── MCAT results ───────────────────────────────────────────────────────────
    for (const result of mcat) {
      if (existingIds.has(result.id)) {
        skipped++
        continue
      }

      const snapshots: Record<string, unknown> = {}
      let correctCount = 0
      let incorrectCount = 0
      let totalTimeSec = 0

      for (const qid of result.questionIds) {
        const q = ALL_MCAT.find(x => x.id === qid)
        const ans = result.answers[qid]
        const timeSec = Math.round(result.timeSpentSeconds?.[qid] ?? 0)
        totalTimeSec += timeSec

        if (q) {
          snapshots[qid] = buildMcatSnapshot(q)
          if (ans !== undefined) {
            if (ans === q.correctAnswer) correctCount++
            else incorrectCount++
          }
        }
      }

      const { error: psErr } = await supabase
        .from('question_bank_practice_sets')
        .insert({
          id: result.id,
          user_id: user.id,
          user_name,
          user_email,
          test: 'MCAT',
          section: result.config.section ?? null,
          mode: 'browse',
          question_ids: result.questionIds,
          count: result.questionIds.length,
          domains: null,
          skills: result.config.skills?.length ? result.config.skills : null,
          difficulties: result.config.difficulties?.length
            ? result.config.difficulties
            : null,
          disciplines: null,
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          total_time_sec: totalTimeSec,
          question_snapshots: Object.keys(snapshots).length > 0 ? snapshots : null,
          completed_at: result.completedAt,
          created_at: result.completedAt,
        })

      if (psErr) {
        if (psErr.code === '23505') { skipped++; continue }
        errors.push(`MCAT set ${result.id}: ${psErr.message}`)
        continue
      }

      inserted++

      const responseRows = result.questionIds.map(qid => {
        const q = ALL_MCAT.find(x => x.id === qid)
        const ans = result.answers[qid] ?? null
        return {
          practice_set_id: result.id,
          user_id: user.id,
          question_id: qid,
          test: 'MCAT',
          section: q?.section ?? null,
          domain: null,
          skill: q?.scientificSkill ?? null,
          difficulty: q?.difficulty ?? null,
          discipline: q?.discipline ?? null,
          content_category: q?.contentCategory ?? null,
          foundational_concept: q?.foundationalConcept ?? null,
          scientific_skill: q?.scientificSkill ?? null,
          user_answer: ans,
          correct_answer: q?.correctAnswer ?? '',
          is_correct: q ? ans === q.correctAnswer : false,
          time_spent_sec: Math.round(result.timeSpentSeconds?.[qid] ?? 0),
          answered_at: result.completedAt,
        }
      })

      const { error: rErr } = await supabase
        .from('question_bank_responses')
        .insert(responseRows)

      if (rErr) errors.push(`MCAT responses ${result.id}: ${rErr.message}`)
    }

    return NextResponse.json({ inserted, skipped, errors })
  } catch (err) {
    console.error('[qb/sync-history]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
