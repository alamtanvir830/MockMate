'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateFeedback } from '@/lib/ai/generate-feedback'

export async function submitSharedExam(input: {
  examId: string
  answers: Record<string, string>
}): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Verify this user's email is a shared recipient for this exam
  const { data: recipient } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('email', user.email!)
    .single()

  if (!recipient) return { error: 'You do not have access to this exam' }

  // Block re-submission — each shared user can only submit once
  const { data: existing } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .single()

  if (existing) return { error: 'You have already submitted this exam' }

  // Fetch exam metadata
  const { data: exam } = await admin
    .from('exams')
    .select('id, title, subject')
    .eq('id', input.examId)
    .single()

  if (!exam) return { error: 'Exam not found' }

  // Fetch questions
  const { data: questions, error: qErr } = await admin
    .from('questions')
    .select('id, question_text, correct_answer, marks, options, "order"')
    .eq('exam_id', input.examId)
    .order('order', { ascending: true })

  if (qErr || !questions || questions.length === 0) {
    return { error: 'Could not load questions' }
  }

  // Score every question
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
  let score = 0
  const responseRows = questions.map((q) => {
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
  const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0

  // Create attempt — uses this user's user_id (independent from creator's attempt)
  const { data: attempt, error: attemptErr } = await admin
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

  // Save per-question responses
  const { error: respErr } = await admin
    .from('exam_responses')
    .insert(responseRows.map((r) => ({ attempt_id: attempt.id, ...r })))

  if (respErr) {
    await admin.from('exam_attempts').delete().eq('id', attempt.id)
    return { error: `Failed to save answers: ${respErr.message}` }
  }

  // Note: the exam's own status is NOT changed here — the creator's exam state is independent

  // Generate AI feedback — non-fatal
  try {
    const wrongQuestions = questions
      .filter((q) => responseRows.find((r) => r.question_id === q.id && !r.is_correct))
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
    })

    await admin
      .from('exam_attempts')
      .update({ ai_feedback: feedback })
      .eq('id', attempt.id)
  } catch {
    // non-fatal
  }

  // Redirect to preferences page — user must answer visibility questions before seeing results
  redirect(`/exams/${input.examId}/shared/preferences`)
}

/**
 * In-place update of group privacy preferences — does NOT redirect.
 * Used by the GroupPrivacyPrefs client component on the results page.
 * Works for both exam recipients and the exam creator.
 */
export async function updateGroupPrivacyInPlace(input: {
  examId: string
  showScoreToGroup: boolean
  includeInRankings: boolean
}): Promise<{ error: string } | { ok: true }> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    console.error('[updateGroupPrivacyInPlace] auth error:', authError)
    return { error: 'Not authenticated' }
  }

  const admin = createAdminClient()

  // Accept both recipients and the exam creator
  const [recipientResult, examResult] = await Promise.all([
    admin
      .from('exam_shared_recipients')
      .select('id')
      .eq('exam_id', input.examId)
      .eq('email', user.email!)
      .maybeSingle(),
    admin
      .from('exams')
      .select('id')
      .eq('id', input.examId)
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  const isRecipient = !!recipientResult.data
  const isCreator = !!examResult.data

  if (!isRecipient && !isCreator) {
    console.error('[updateGroupPrivacyInPlace] access denied — user:', user.id, 'exam:', input.examId)
    return { error: 'You do not have access to this exam' }
  }

  // Find the completed attempt for this user
  const { data: attempt, error: attemptError } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('submitted_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (attemptError) {
    console.error('[updateGroupPrivacyInPlace] attempt lookup failed:', attemptError)
    return { error: `Could not find attempt: ${attemptError.message}` }
  }
  if (!attempt) {
    console.error('[updateGroupPrivacyInPlace] no completed attempt — user:', user.id, 'exam:', input.examId)
    return { error: 'No completed attempt found for this exam' }
  }

  // Update preference columns
  const { error: updateError } = await admin
    .from('exam_attempts')
    .update({
      show_score_to_group: input.showScoreToGroup,
      include_in_rankings: input.includeInRankings,
    })
    .eq('id', attempt.id)

  if (updateError) {
    const msg = updateError.message ?? ''
    const isColumnMissing =
      msg.includes('show_score_to_group') ||
      msg.includes('include_in_rankings') ||
      (msg.includes('column') && msg.includes('does not exist'))

    if (isColumnMissing) {
      console.error(
        '[updateGroupPrivacyInPlace] preference columns missing on exam_attempts.',
        'Run this SQL in your Supabase SQL editor:\n',
        'ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS show_score_to_group boolean DEFAULT false;\n' +
        'ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS include_in_rankings boolean DEFAULT false;',
        updateError,
      )
      return { error: 'columns_missing' }
    }

    console.error('[updateGroupPrivacyInPlace] update failed:', updateError)
    return { error: `Failed to save: ${updateError.message}` }
  }

  return { ok: true }
}

export async function saveSharedExamPreferences(input: {
  examId: string
  showScoreToGroup: boolean
  includeInRankings: boolean
}): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Verify this user is a recipient
  const { data: recipient } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('email', user.email!)
    .single()

  if (!recipient) return { error: 'You do not have access to this exam' }

  // Find the completed attempt
  const { data: attempt } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .single()

  if (!attempt) return { error: 'No completed attempt found' }

  const { error } = await admin
    .from('exam_attempts')
    .update({
      show_score_to_group: input.showScoreToGroup,
      include_in_rankings: input.includeInRankings,
    })
    .eq('id', attempt.id)

  if (error) return { error: `Failed to save preferences: ${error.message}` }

  redirect(`/exams/${input.examId}/shared`)
}
