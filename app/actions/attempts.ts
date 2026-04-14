'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateFeedback } from '@/lib/ai/generate-feedback'
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

  // Verify exam ownership — also fetch subject for email
  const { data: exam } = await supabase
    .from('exams')
    .select('id, title, subject, unlock_date, status')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .single()

  if (!exam) return { error: 'Exam not found' }

  // Enforce unlock date server-side
  const today = new Date().toISOString().split('T')[0]
  if (exam.unlock_date > today) return { error: 'This exam is not yet available' }

  // Block re-submission
  if (exam.status === 'completed') return { error: 'This exam has already been submitted' }

  // Fetch all questions with correct answers
  const { data: questions, error: qErr } = await supabase
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

  // Save individual responses
  const { error: respErr } = await supabase
    .from('exam_responses')
    .insert(responseRows.map((r) => ({ attempt_id: attempt.id, ...r })))

  if (respErr) {
    // Clean up orphaned attempt
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
