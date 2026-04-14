'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateQuestions } from '@/lib/ai/generate-questions'

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
  }))

  const { error: questionsError } = await supabase
    .from('questions')
    .insert(rows)

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

  redirect('/dashboard')
}
