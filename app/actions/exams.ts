'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateQuestions } from '@/lib/ai/generate-questions'
import { sendGroupAddedEmails } from '@/lib/email/send-group-added'

export interface CreateExamInput {
  title: string
  subject: string
  examDate: string
  topics: string
  subtopics: string
  lectureContent: string
  format: string
  pastPaperStyle: string
  additionalNotes: string
  questionCount: number
  unlockDaysBefore: number
  friends: { name: string; email: string }[]
  sharedWith: { name: string; email: string }[]
  standardizedExam?: string
  usmleStyles?: string[]
  timeLimitMinutes?: number | null
  groupMessage?: string | null
  adaptiveMode?: boolean
}

export async function createExam(
  input: CreateExamInput,
): Promise<{ error: string } | void> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Compute unlock_date: N days before the real exam
  const examDateObj = new Date(input.examDate)
  const unlockDateObj = new Date(examDateObj)
  unlockDateObj.setDate(examDateObj.getDate() - input.unlockDaysBefore)
  const unlockDate = unlockDateObj.toISOString().split('T')[0]

  // 1. Insert the exam row
  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      user_id: user.id,
      title: input.title.trim(),
      subject: input.subject.trim(),
      exam_date: input.examDate,
      unlock_days_before: input.unlockDaysBefore,
      unlock_date: unlockDate,
      status: 'draft',
      ...(input.timeLimitMinutes != null ? { time_limit_minutes: input.timeLimitMinutes } : {}),
      ...(input.groupMessage ? { group_message: input.groupMessage } : {}),
      ...(input.adaptiveMode ? { adaptive_mode: true } : {}),
      ...(input.standardizedExam ? { standardized_exam: input.standardizedExam } : {}),
    })
    .select('id')
    .single()

  if (examError || !exam) {
    return { error: examError?.message ?? 'Failed to create exam' }
  }

  // 2. Generate questions via OpenAI
  let questions
  try {
    questions = await generateQuestions({
      title: input.title,
      subject: input.subject,
      topics: input.topics,
      subtopics: input.subtopics,
      lectureContent: input.lectureContent,
      format: input.format,
      pastPaperStyle: input.pastPaperStyle,
      additionalNotes: input.additionalNotes,
      questionCount: input.questionCount,
      standardizedExam: input.standardizedExam,
      usmleStyles: input.usmleStyles,
      adaptiveMode: input.adaptiveMode,
    })
  } catch (err) {
    // Clean up the exam row so the user isn't left with a broken draft
    await supabase.from('exams').delete().eq('id', exam.id)
    const message = err instanceof Error ? err.message : 'AI generation failed'
    return { error: `Question generation failed: ${message}` }
  }

  // 3. Insert questions into the questions table
  const rows = questions.map((q, i) => ({
    exam_id: exam.id,
    question_text: q.question_text,
    question_type: 'multiple_choice' as const,
    options: q.options,
    correct_answer: q.correct_answer,
    marks: 1,
    order: i + 1,
    // Include explanation + difficulty columns if present (requires SQL migrations;
    // falls back gracefully if columns don't exist yet)
    ...(q.explanation_correct !== undefined ? { explanation_correct: q.explanation_correct } : {}),
    ...(q.explanation_incorrect !== undefined ? { explanation_incorrect: q.explanation_incorrect } : {}),
    ...(q.difficulty !== undefined ? { difficulty: q.difficulty } : {}),
  }))

  let { error: questionsError } = await supabase.from('questions').insert(rows)

  // If the error mentions optional columns (migrations not yet run), retry with progressively
  // fewer optional columns until the insert succeeds.
  if (questionsError) {
    const msg = questionsError.message ?? ''
    const missingExplanations =
      msg.includes('explanation_correct') || msg.includes('explanation_incorrect')
    const missingDifficulty = msg.includes('difficulty')

    if (missingExplanations || missingDifficulty) {
      const rowsReduced = questions.map((q, i) => ({
        exam_id: exam.id,
        question_text: q.question_text,
        question_type: 'multiple_choice' as const,
        options: q.options,
        correct_answer: q.correct_answer,
        marks: 1,
        order: i + 1,
        // Only include whichever columns are not causing the error
        ...(!missingExplanations && q.explanation_correct !== undefined
          ? { explanation_correct: q.explanation_correct }
          : {}),
        ...(!missingExplanations && q.explanation_incorrect !== undefined
          ? { explanation_incorrect: q.explanation_incorrect }
          : {}),
      }))
      const { error: retryError } = await supabase.from('questions').insert(rowsReduced)
      questionsError = retryError ?? null
    }
  }

  // Legacy fallback: strip all optional columns
  if (
    questionsError &&
    (questionsError.message?.includes('explanation_correct') ||
      questionsError.message?.includes('explanation_incorrect'))
  ) {
    const rowsWithoutExplanations = questions.map((q, i) => ({
      exam_id: exam.id,
      question_text: q.question_text,
      question_type: 'multiple_choice' as const,
      options: q.options,
      correct_answer: q.correct_answer,
      marks: 1,
      order: i + 1,
    }))
    const { error: retryError } = await supabase.from('questions').insert(rowsWithoutExplanations)
    questionsError = retryError ?? null
  }

  if (questionsError) {
    await supabase.from('exams').delete().eq('id', exam.id)
    return { error: `Failed to save questions: ${questionsError.message}` }
  }

  // 4. Mark exam as ready
  await supabase
    .from('exams')
    .update({ status: 'ready' })
    .eq('id', exam.id)

  // 5. Save accountability friends (non-fatal)
  const validFriends = input.friends.filter(
    (f) => f.name.trim() && f.email.trim() && f.email.includes('@'),
  )
  if (validFriends.length > 0) {
    await supabase.from('accountability_friends').insert(
      validFriends.map((f) => ({
        exam_id: exam.id,
        user_id: user.id,
        name: f.name.trim(),
        email: f.email.trim(),
      })),
    )
  }

  // 6. Save shared exam recipients and notify them by email (non-fatal)
  console.log('[createExam] sharedWith raw input:', JSON.stringify(input.sharedWith))

  const validShared = input.sharedWith.filter(
    (p) => p.name.trim() && p.email.trim() && p.email.includes('@'),
  )

  console.log(
    `[createExam] validShared after filter: ${validShared.length} recipient(s)`,
    validShared.map((p) => p.email),
  )

  if (validShared.length > 0) {
    console.log('[createExam] inserting exam_shared_recipients rows...')
    const { error: recipientsInsertError } = await supabase
      .from('exam_shared_recipients')
      .insert(
        validShared.map((p) => ({
          exam_id: exam.id,
          user_id: user.id,
          name: p.name.trim(),
          email: p.email.trim(),
        })),
      )

    if (recipientsInsertError) {
      console.error('[createExam] exam_shared_recipients insert error:', recipientsInsertError)
    } else {
      console.log('[createExam] exam_shared_recipients insert succeeded')
    }

    // Notify each recipient that they have been added to the group
    const addedByName =
      user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Someone'

    console.log(
      `[createExam] calling sendGroupAddedEmails for ${validShared.length} recipient(s), addedByName="${addedByName}", RESEND_API_KEY set=${!!process.env.RESEND_API_KEY}`,
    )

    try {
      await sendGroupAddedEmails(validShared, {
        examTitle: input.title.trim(),
        addedByName,
        groupMessage: input.groupMessage ?? null,
      })
      console.log('[createExam] sendGroupAddedEmails returned without throwing')
    } catch (e) {
      console.error('[createExam] sendGroupAddedEmails threw an unexpected error:', e)
    }
  } else {
    console.log('[createExam] no valid shared recipients — skipping group-added email')
  }

  redirect('/dashboard')
}
