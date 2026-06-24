'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateQuestions } from '@/lib/ai/generate-questions'
import { generateShortResponseQuestions } from '@/lib/ai/generate-short-response-questions'
import { sendGroupAddedEmails } from '@/lib/email/send-group-added'

export interface AdvancedCustomization {
  recall: string; understanding: string; application: string; multiStep: string
  styleShort: string; styleScenario: string; styleProblem: string; styleConceptual: string
  lenVeryShort: string; lenMedium: string; lenLong: string
  overallDifficulty: string
  distEasy: string; distMedium: string; distHard: string
  trickiness: string; trickinessPercent: string
  answerSimilarity: string
  answerChoiceCount: string
  questionSources: string[]
  repetition: string
  topicIntegration: string
  calcIntensity: string
  visuals: string[]
  professorStyle: string
  commonMistakes: string
  highYieldTopics: string
}

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
  advancedCustomization?: AdvancedCustomization
  language?: string
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
      ...(input.language && input.language !== 'English' ? { language: input.language } : {}),
    })
    .select('id')
    .single()

  if (examError || !exam) {
    return { error: examError?.message ?? 'Failed to create exam' }
  }

  // 2. Generate questions via OpenAI
  const isShortResponse = input.format === 'short_answer'

  let questionsError: { message: string } | null = null

  if (isShortResponse) {
    // ── Short response path ──────────────────────────────────────────────────
    let srQuestions
    try {
      srQuestions = await generateShortResponseQuestions({
        title: input.title,
        subject: input.subject,
        topics: input.topics,
        subtopics: input.subtopics,
        lectureContent: input.lectureContent,
        pastPaperStyle: input.pastPaperStyle,
        additionalNotes: input.additionalNotes,
        questionCount: input.questionCount,
        language: input.language,
      })
    } catch (err) {
      await supabase.from('exams').delete().eq('id', exam.id)
      const message = err instanceof Error ? err.message : 'AI generation failed'
      return { error: `Question generation failed: ${message}` }
    }

    // Try inserting with new optional columns (key_points, grading_rubric)
    const srRows = srQuestions.map((q, i) => ({
      exam_id: exam.id,
      question_text: q.question_text,
      question_type: 'short_response' as const,
      options: [] as string[],
      correct_answer: q.optimal_answer,
      marks: 10,
      order: i + 1,
      key_points: q.key_points,
      grading_rubric: q.grading_rubric,
    }))

    let { error: srErr } = await supabase.from('questions').insert(srRows)

    // Fallback: new columns may not exist yet
    if (srErr && (srErr.message?.includes('key_points') || srErr.message?.includes('grading_rubric'))) {
      const srRowsBasic = srQuestions.map((q, i) => ({
        exam_id: exam.id,
        question_text: q.question_text,
        question_type: 'short_response' as const,
        options: [] as string[],
        correct_answer: q.optimal_answer,
        marks: 10,
        order: i + 1,
      }))
      const { error: retryErr } = await supabase.from('questions').insert(srRowsBasic)
      srErr = retryErr ?? null
    }

    questionsError = srErr
  } else {
    // ── Multiple choice path (unchanged) ────────────────────────────────────
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
        advancedCustomization: input.advancedCustomization,
        language: input.language,
      })
    } catch (err) {
      await supabase.from('exams').delete().eq('id', exam.id)
      const message = err instanceof Error ? err.message : 'AI generation failed'
      return { error: `Question generation failed: ${message}` }
    }

    const rows = questions.map((q, i) => ({
      exam_id: exam.id,
      question_text: q.question_text,
      question_type: 'multiple_choice' as const,
      options: q.options,
      correct_answer: q.correct_answer,
      marks: 1,
      order: i + 1,
      ...(q.explanation_correct !== undefined ? { explanation_correct: q.explanation_correct } : {}),
      ...(q.explanation_incorrect !== undefined ? { explanation_incorrect: q.explanation_incorrect } : {}),
      ...(q.difficulty !== undefined ? { difficulty: q.difficulty } : {}),
    }))

    let { error: mcErr } = await supabase.from('questions').insert(rows)

    if (mcErr) {
      const msg = mcErr.message ?? ''
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
          ...(!missingExplanations && q.explanation_correct !== undefined
            ? { explanation_correct: q.explanation_correct }
            : {}),
          ...(!missingExplanations && q.explanation_incorrect !== undefined
            ? { explanation_incorrect: q.explanation_incorrect }
            : {}),
        }))
        const { error: retryError } = await supabase.from('questions').insert(rowsReduced)
        mcErr = retryError ?? null
      }
    }

    if (
      mcErr &&
      (mcErr.message?.includes('explanation_correct') ||
        mcErr.message?.includes('explanation_incorrect'))
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
      mcErr = retryError ?? null
    }

    questionsError = mcErr
  }

  // 3. Handle question insert errors
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
