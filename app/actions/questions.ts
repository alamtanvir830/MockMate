'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Create a versioned copy of an exam (for use when the original has completed attempts).
 * - Copies all exam metadata to a new row with parent_exam_id = original exam id
 * - Duplicates all questions into the new exam
 * - Original exam and its attempts/responses are untouched
 * Returns the new exam's id so the caller can redirect to it.
 */
export async function createExamVersion(input: {
  examId: string
}): Promise<{ newExamId: string } | { error: string }> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Creator-only
  const { data: original } = await admin
    .from('exams')
    .select('*')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!original) return { error: 'Only the exam creator can create a new version.' }

  // Count existing versions so we can set version_number correctly
  const { count: versionCount } = await admin
    .from('exams')
    .select('id', { count: 'exact', head: true })
    .eq('parent_exam_id', input.examId)

  // Build new exam row — copy all settings, set parent_exam_id
  // Strip fields that should not be copied (id, created_at, updated_at)
  const { id: _id, created_at: _ca, updated_at: _ua, ...examFields } = original as Record<string, unknown>
  void _id; void _ca; void _ua

  const newExamPayload: Record<string, unknown> = {
    ...examFields,
    user_id: user.id,
    status: 'draft',
    // version_number: how many versions already exist + 2 (original = v1)
    version_number: ((versionCount ?? 0) as number) + 2,
  }

  // Attach parent_exam_id — gracefully degrade if column doesn't exist yet
  let newExamId: string | null = null

  const withParent = { ...newExamPayload, parent_exam_id: input.examId }
  const { data: newExam, error: insertError } = await admin
    .from('exams')
    .insert(withParent)
    .select('id')
    .single()

  if (insertError) {
    // If the column doesn't exist, retry without it
    if (
      insertError.message?.includes('parent_exam_id') ||
      insertError.message?.includes('version_number')
    ) {
      const withoutVersioning = { ...newExamPayload }
      delete withoutVersioning['parent_exam_id']
      delete withoutVersioning['version_number']
      const { data: fallback, error: fallbackError } = await admin
        .from('exams')
        .insert(withoutVersioning)
        .select('id')
        .single()
      if (fallbackError || !fallback) {
        return { error: `Failed to create version: ${fallbackError?.message ?? 'unknown error'}` }
      }
      newExamId = fallback.id
    } else {
      return { error: `Failed to create version: ${insertError.message}` }
    }
  } else if (newExam) {
    newExamId = newExam.id
  }

  if (!newExamId) return { error: 'Failed to create version: no id returned' }

  // Duplicate questions
  const { data: questions } = await admin
    .from('questions')
    .select('*')
    .eq('exam_id', input.examId)
    .order('order', { ascending: true })

  if (questions && questions.length > 0) {
    const questionRows = questions.map((q: Record<string, unknown>) => {
      const { id: _qid, created_at: _qca, ...qFields } = q as Record<string, unknown>
      void _qid; void _qca
      return { ...qFields, exam_id: newExamId }
    })
    const { error: qError } = await admin.from('questions').insert(questionRows)
    if (qError) {
      // Clean up the new exam row if questions failed
      await admin.from('exams').delete().eq('id', newExamId)
      return { error: `Failed to copy questions: ${qError.message}` }
    }
  }

  return { newExamId }
}

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
