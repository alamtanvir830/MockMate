'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateFeedback } from '@/lib/ai/generate-feedback'
import { gradeShortResponseAnswers } from '@/lib/ai/grade-short-response'
import { sendResultsToFriends } from '@/lib/email/send-results'

export async function submitExam(input: {
  examId: string
  answers: Record<string, string> // questionId -> selected answer
}): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Verify exam ownership — use select('*') so adding new columns (e.g. language)
  // never breaks this query when the DB migration hasn't run yet.
  const { data: exam, error: examErr } = await supabase
    .from('exams')
    .select('*')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .single()

  console.log('[submitExam] lookup', {
    examId: input.examId,
    userId: user.id,
    found: !!exam,
    dbError: examErr?.message ?? null,
  })

  if (!exam) return { error: 'Exam not found' }

  // Enforce unlock date server-side
  const today = new Date().toISOString().split('T')[0]
  if (exam.unlock_date > today) return { error: 'This exam is not yet available' }

  // Block re-submission
  if (exam.status === 'completed') return { error: 'This exam has already been submitted' }

  // Fetch active questions only — removed questions are excluded from scoring
  const { data: questionsActive, error: qActiveErr } = await supabase
    .from('questions')
    .select('id, question_text, correct_answer, marks, options, question_type, "order"')
    .eq('exam_id', input.examId)
    .eq('is_active', true)
    .order('order', { ascending: true })

  // Fallback if is_active column hasn't been migrated yet
  const { data: questionsFallback, error: qFallbackErr } = qActiveErr?.message?.includes('is_active')
    ? await supabase
        .from('questions')
        .select('id, question_text, correct_answer, marks, options, question_type, "order"')
        .eq('exam_id', input.examId)
        .order('order', { ascending: true })
    : { data: null, error: null }

  const questions = questionsFallback ?? questionsActive
  const qErr = qFallbackErr ?? (qActiveErr?.message?.includes('is_active') ? null : qActiveErr)

  if (qErr || !questions || questions.length === 0) {
    return { error: 'Could not load questions' }
  }

  const isShortResponse = questions.some((q) => (q as { question_type?: string }).question_type === 'short_response')

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
  let score = 0
  let responseRows: Array<{
    question_id: string
    selected_answer: string | null
    is_correct: boolean
    marks_awarded: number
    score_out_of_10?: number
    grading_summary?: string
    missing_details?: string[]
    incorrect_or_unclear_points?: string[]
    what_to_improve?: string
    optimal_answer?: string
  }>

  if (isShortResponse) {
    // ── AI grading for short response ─────────────────────────────────────
    const gradeInputs = questions.map((q) => ({
      question_id: q.id,
      question_text: q.question_text,
      optimal_answer: q.correct_answer,
      user_answer: input.answers[q.id] ?? null,
    }))

    let grades
    try {
      grades = await gradeShortResponseAnswers(gradeInputs, exam.subject)
    } catch (err) {
      console.error('[submitExam] short response grading failed:', err)
      return { error: 'Grading failed — please try submitting again.' }
    }

    const gradeMap = new Map(grades.map((g) => [g.question_id, g]))

    responseRows = questions.map((q) => {
      const grade = gradeMap.get(q.id)
      const scoreOut10 = grade?.score_out_of_10 ?? 0
      score += scoreOut10
      return {
        question_id: q.id,
        selected_answer: input.answers[q.id] ?? null,
        is_correct: grade?.is_correct ?? false,
        marks_awarded: scoreOut10,
        score_out_of_10: scoreOut10,
        grading_summary: grade?.grading_summary,
        missing_details: grade?.missing_details,
        incorrect_or_unclear_points: grade?.incorrect_or_unclear_points,
        what_to_improve: grade?.what_to_improve,
        optimal_answer: grade?.optimal_answer,
      }
    })
  } else {
    // ── String comparison for multiple choice ──────────────────────────────
    responseRows = questions.map((q) => {
      const selected = input.answers[q.id] ?? null
      const isCorrect = selected !== null && selected === q.correct_answer
      const marksAwarded = isCorrect ? q.marks : 0
      score += marksAwarded
      return {
        question_id: q.id,
        selected_answer: selected,
        is_correct: isCorrect,
        marks_awarded: marksAwarded,
      }
    })
  }

  const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0

  // Create the attempt record
  const { data: attempt, error: attemptErr } = await supabase
    .from('exam_attempts')
    .insert({
      exam_id: input.examId,
      user_id: user.id,
      submitted_at: new Date().toISOString(),
      score,
      total_marks: totalMarks,
      percentage,
      status: 'completed',
    })
    .select('id')
    .single()

  if (attemptErr || !attempt) {
    return { error: `Failed to save attempt: ${attemptErr?.message ?? 'unknown error'}` }
  }

  // Save individual responses — try with grading columns, fall back if not migrated
  const fullResponseRows = responseRows.map((r) => ({ attempt_id: attempt.id, ...r }))
  let { error: respErr } = await supabase.from('exam_responses').insert(fullResponseRows)

  if (respErr) {
    const msg = respErr.message ?? ''
    const hasNewCols = ['score_out_of_10', 'grading_summary', 'missing_details',
      'incorrect_or_unclear_points', 'what_to_improve', 'optimal_answer'].some((c) => msg.includes(c))

    if (hasNewCols) {
      // Retry with only the columns guaranteed to exist
      const basicRows = responseRows.map((r) => ({
        attempt_id: attempt.id,
        question_id: r.question_id,
        selected_answer: r.selected_answer,
        is_correct: r.is_correct,
        marks_awarded: r.marks_awarded,
      }))
      const { error: retryErr } = await supabase.from('exam_responses').insert(basicRows)
      respErr = retryErr ?? null
    }
  }

  if (respErr) {
    await supabase.from('exam_attempts').delete().eq('id', attempt.id)
    return { error: `Failed to save answers: ${respErr.message}` }
  }

  // Mark exam as completed
  await supabase.from('exams').update({ status: 'completed' }).eq('id', input.examId)

  // Generate AI feedback — non-fatal if it fails
  try {
    const wrongQuestions = questions
      .filter((q) => {
        const r = responseRows.find((r) => r.question_id === q.id)
        return r && !r.is_correct
      })
      .map((q) => ({
        question: q.question_text,
        correct_answer: q.correct_answer,
        user_answer: input.answers[q.id] ?? '(no answer)',
      }))

    const feedback = await generateFeedback({
      examTitle: exam.title,
      subject: exam.subject,
      percentage,
      totalQuestions: questions.length,
      wrongQuestions,
      language: (exam as { language?: string }).language ?? undefined,
    })

    await supabase
      .from('exam_attempts')
      .update({ ai_feedback: feedback })
      .eq('id', attempt.id)
  } catch {
    // Feedback failure does not block results
  }

  // Send results email to accountability friends — non-fatal
  try {
    const { data: friends, error: friendsErr } = await supabase
      .from('accountability_friends')
      .select('name, email')
      .eq('exam_id', input.examId)

    console.log('[attempts] accountability_friends query:', {
      examId: input.examId,
      friends,
      error: friendsErr?.message,
    })

    if (friends && friends.length > 0) {
      const studentName =
        user.user_metadata?.full_name ??
        user.email?.split('@')[0] ??
        'Your friend'

      const correctCount = responseRows.filter((r) => r.is_correct).length

      await sendResultsToFriends(friends, {
        examTitle: exam.title,
        subject: exam.subject,
        studentName,
        score,
        totalMarks,
        percentage,
        correctCount,
        incorrectCount: questions.length - correctCount,
        submittedAt: new Date().toISOString(),
      })
    } else {
      console.log('[attempts] no accountability friends found for exam', input.examId)
    }
  } catch (err) {
    console.error('[attempts] email block error:', err)
  }

  redirect(`/exams/${input.examId}/results`)
}
