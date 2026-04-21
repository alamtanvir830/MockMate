'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Remove a question from an exam.
 * Allowed only when:
 *  - the caller is the exam creator
 *  - no completed attempts exist for this exam (creator or member)
 * After deletion the remaining questions are renumbered.
 */
export async function deleteExamQuestion(input: {
  examId: string
  questionId: string
}): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Creator-only
  const { data: exam } = await admin
    .from('exams')
    .select('id')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!exam) return { error: 'Only the exam creator can edit questions.' }

  // Lock once anyone has submitted
  const { data: attempts } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('status', 'completed')
    .limit(1)
  if ((attempts ?? []).length > 0) return { error: 'editing_locked' }

  const { error: deleteError } = await admin
    .from('questions')
    .delete()
    .eq('id', input.questionId)
    .eq('exam_id', input.examId)
  if (deleteError) return { error: `Failed to remove question: ${deleteError.message}` }

  // Renumber remaining questions so order is contiguous
  const { data: remaining } = await admin
    .from('questions')
    .select('id')
    .eq('exam_id', input.examId)
    .order('order', { ascending: true })

  if (remaining && remaining.length > 0) {
    await Promise.allSettled(
      remaining.map((q, i) =>
        admin.from('questions').update({ order: i + 1 }).eq('id', q.id),
      ),
    )
  }

  return { ok: true }
}

/**
 * Manually add a multiple-choice question to an exam.
 * Same locking rules as deleteExamQuestion.
 */
export async function addExamQuestion(input: {
  examId: string
  question: {
    question_text: string
    options: string[]
    correct_answer: string
  }
}): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Creator-only
  const { data: exam } = await admin
    .from('exams')
    .select('id')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!exam) return { error: 'Only the exam creator can edit questions.' }

  // Lock once anyone has submitted
  const { data: attempts } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('exam_id', input.examId)
    .eq('status', 'completed')
    .limit(1)
  if ((attempts ?? []).length > 0) return { error: 'editing_locked' }

  // Determine next order value
  const { data: last } = await admin
    .from('questions')
    .select('order')
    .eq('exam_id', input.examId)
    .order('order', { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextOrder = ((last as { order: number } | null)?.order ?? 0) + 1

  const { error: insertError } = await admin
    .from('questions')
    .insert({
      exam_id: input.examId,
      question_text: input.question.question_text.trim(),
      question_type: 'multiple_choice' as const,
      options: input.question.options,
      correct_answer: input.question.correct_answer,
      marks: 1,
      order: nextOrder,
    })

  if (insertError) return { error: `Failed to add question: ${insertError.message}` }
  return { ok: true }
}
