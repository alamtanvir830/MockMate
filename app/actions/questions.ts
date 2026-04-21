'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Soft-remove a question from an exam by setting is_active = false.
 *
 * Safe to call even when participants have already submitted attempts:
 * - The question row is never deleted, so existing exam_responses keep their
 *   foreign-key references intact and results pages are unaffected.
 * - Future/unstarted takers won't see the question because take-view queries
 *   filter is_active = true.
 *
 * Requires: ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
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

  // Soft-delete: mark inactive so existing attempts are unaffected
  const { error: updateError } = await admin
    .from('questions')
    .update({ is_active: false })
    .eq('id', input.questionId)
    .eq('exam_id', input.examId)

  if (updateError) {
    // If is_active column hasn't been added yet, surface a clear message
    if (updateError.message?.includes('is_active')) {
      return {
        error:
          'DB migration needed — run: ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;',
      }
    }
    return { error: `Failed to remove question: ${updateError.message}` }
  }

  return { ok: true }
}

/**
 * Manually add a multiple-choice question to an exam.
 * Creator-only. Always safe — adding a question never affects existing attempts.
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

  // Determine next order value (max over all questions, active or not)
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
      is_active: true,
    })

  if (insertError) {
    // Retry without is_active if column doesn't exist yet
    if (insertError.message?.includes('is_active')) {
      const { error: retryError } = await admin
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
      if (retryError) return { error: `Failed to add question: ${retryError.message}` }
      return { ok: true }
    }
    return { error: `Failed to add question: ${insertError.message}` }
  }

  return { ok: true }
}
