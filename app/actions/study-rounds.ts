'use server'

import { createClient } from '@/lib/supabase/server'
import { generateStudyRoundQuestions } from '@/lib/ai/generate-study-round-questions'
import type { MissedQuestionInput } from '@/lib/ai/generate-study-round-questions'
import type { MindMapData } from '@/lib/ai/generate-mind-map'

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface StudyRoundQuestion {
  id: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation_correct: string
  explanation_incorrect: Record<string, string>
  marks: number
}

export interface StudyRoundResponse {
  question_id: string
  selected_answer: string | null
  is_correct: boolean
  marks_awarded: number
}

export interface StudyRoundAttemptSummary {
  id: string
  round_number: number
  score_percent: number | null
  correct_count: number | null
  incorrect_count: number | null
  completed_at: string | null
  questions_json: StudyRoundQuestion[]
  responses_json: StudyRoundResponse[]
  mind_map_json: MindMapData | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function questionsFromGenerated(
  generated: Awaited<ReturnType<typeof generateStudyRoundQuestions>>,
): StudyRoundQuestion[] {
  return generated.map((q) => ({
    id: crypto.randomUUID(),
    question_text: q.question_text,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation_correct: q.explanation_correct ?? '',
    explanation_incorrect: q.explanation_incorrect ?? {},
    marks: 1,
  }))
}

// ─── createStudyRoundSession ──────────────────────────────────────────────────

export async function createStudyRoundSession(input: {
  examId: string
  missedQuestions: MissedQuestionInput[]
  subject: string
  examTitle: string
  language?: string
  questionCount: number
  standardizedExam?: string
}): Promise<{ sessionId: string } | { error: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (input.missedQuestions.length === 0) {
    return { error: 'No missed questions to study — you scored perfectly!' }
  }

  // Clamp question count: not more than 5× the number of missed concepts
  const targetCount = Math.min(input.questionCount, input.missedQuestions.length * 5)

  // Generate round 1 questions
  let generated: Awaited<ReturnType<typeof generateStudyRoundQuestions>>
  try {
    generated = await generateStudyRoundQuestions({
      missedQuestions: input.missedQuestions,
      subject: input.subject,
      examTitle: input.examTitle,
      questionCount: targetCount,
      language: input.language,
      standardizedExam: input.standardizedExam,
    })
  } catch (e) {
    console.error('[study-rounds] generate round 1 failed:', e)
    return { error: 'Failed to generate study questions. Please try again.' }
  }

  if (generated.length === 0) {
    return { error: 'Could not generate valid questions. Please try again.' }
  }

  const questions = questionsFromGenerated(generated)

  // Create session
  const { data: session, error: sessionErr } = await supabase
    .from('study_round_sessions')
    .insert({
      user_id: user.id,
      original_exam_id: input.examId || null,
      status: 'active',
      total_duration_minutes: 120,
      subject: input.subject,
      exam_title: input.examTitle,
      language: input.language ?? null,
      standardized_exam: input.standardizedExam ?? null,
      question_count: questions.length,
    })
    .select('id')
    .single()

  if (sessionErr || !session) {
    return { error: `Failed to create study session: ${sessionErr?.message ?? 'unknown'}` }
  }

  // Create round 1 attempt
  const { error: attemptErr } = await supabase.from('study_round_attempts').insert({
    session_id: session.id,
    round_number: 1,
    questions_json: questions,
    responses_json: [],
  })

  if (attemptErr) {
    // Clean up session
    await supabase.from('study_round_sessions').delete().eq('id', session.id)
    return { error: `Failed to create first round: ${attemptErr.message}` }
  }

  return { sessionId: session.id }
}

// ─── submitStudyRoundAttempt ──────────────────────────────────────────────────

export async function submitStudyRoundAttempt(input: {
  attemptId: string
  sessionId: string
  answers: Record<string, string>
}): Promise<
  | {
      scorePercent: number
      correctCount: number
      incorrectCount: number
      responses: StudyRoundResponse[]
    }
  | { error: string }
> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Fetch the attempt (verify session ownership)
  const { data: attempt, error: fetchErr } = await supabase
    .from('study_round_attempts')
    .select('id, questions_json, session_id')
    .eq('id', input.attemptId)
    .single()

  if (fetchErr || !attempt) return { error: 'Attempt not found' }

  // Verify session belongs to user
  const { data: session } = await supabase
    .from('study_round_sessions')
    .select('id')
    .eq('id', input.sessionId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!session) return { error: 'Session not found' }

  const questions = (attempt.questions_json ?? []) as StudyRoundQuestion[]

  // Score answers
  const responses: StudyRoundResponse[] = questions.map((q) => {
    const selected = input.answers[q.id] ?? null
    const isCorrect = selected !== null && selected === q.correct_answer
    return {
      question_id: q.id,
      selected_answer: selected,
      is_correct: isCorrect,
      marks_awarded: isCorrect ? q.marks : 0,
    }
  })

  const correctCount = responses.filter((r) => r.is_correct).length
  const incorrectCount = questions.length - correctCount
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0)
  const scorePercent = totalMarks > 0 ? Math.round((correctCount / totalMarks) * 100) : 0

  // Persist
  const { error: updateErr } = await supabase
    .from('study_round_attempts')
    .update({
      responses_json: responses,
      score_percent: scorePercent,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      completed_at: new Date().toISOString(),
    })
    .eq('id', input.attemptId)

  if (updateErr) return { error: `Failed to save answers: ${updateErr.message}` }

  return { scorePercent, correctCount, incorrectCount, responses }
}

// ─── createNextStudyRound ─────────────────────────────────────────────────────

export async function createNextStudyRound(input: {
  sessionId: string
  missedQuestions: MissedQuestionInput[]
  previousQuestionTexts: string[]
  roundNumber: number
}): Promise<{ attemptId: string; questions: StudyRoundQuestion[] } | { error: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Fetch session for config
  const { data: session } = await supabase
    .from('study_round_sessions')
    .select('*')
    .eq('id', input.sessionId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!session) return { error: 'Session not found' }

  const targetCount = Math.min(
    session.question_count as number,
    input.missedQuestions.length * 5,
  )

  let generated: Awaited<ReturnType<typeof generateStudyRoundQuestions>>
  try {
    generated = await generateStudyRoundQuestions({
      missedQuestions: input.missedQuestions,
      subject: session.subject as string,
      examTitle: session.exam_title as string,
      questionCount: targetCount,
      language: (session.language as string | null) ?? undefined,
      previousQuestionTexts: input.previousQuestionTexts,
      standardizedExam: (session.standardized_exam as string | null) ?? undefined,
    })
  } catch (e) {
    console.error('[study-rounds] generate next round failed:', e)
    return { error: 'Failed to generate next round. Please try again.' }
  }

  if (generated.length === 0) {
    return { error: 'Could not generate valid questions. Please try again.' }
  }

  const questions = questionsFromGenerated(generated)

  const { data: attempt, error: attemptErr } = await supabase
    .from('study_round_attempts')
    .insert({
      session_id: input.sessionId,
      round_number: input.roundNumber,
      questions_json: questions,
      responses_json: [],
    })
    .select('id')
    .single()

  if (attemptErr || !attempt) {
    return { error: `Failed to create next round: ${attemptErr?.message ?? 'unknown'}` }
  }

  return { attemptId: attempt.id, questions }
}

// ─── saveStudyRoundMindMap ────────────────────────────────────────────────────

export async function saveStudyRoundMindMap(input: {
  attemptId: string
  mindMapData: MindMapData
}): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('study_round_attempts')
    .update({ mind_map_json: input.mindMapData })
    .eq('id', input.attemptId)
}

// ─── endStudyRoundSession ─────────────────────────────────────────────────────

export async function endStudyRoundSession(input: {
  sessionId: string
  status: 'mastered' | 'timed_out' | 'manual'
}): Promise<void | { error: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  await supabase
    .from('study_round_sessions')
    .update({
      status: input.status,
      ended_at: new Date().toISOString(),
    })
    .eq('id', input.sessionId)
    .eq('user_id', user.id)
}
