import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { StudyRoundClient } from './StudyRoundClient'
import type { StudyRoundQuestion, StudyRoundAttemptSummary } from '@/app/actions/study-rounds'
import type { MindMapData } from '@/lib/ai/generate-mind-map'

export const metadata: Metadata = { title: 'Study Round' }

export default async function StudyRoundPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch session (must belong to user)
  const { data: session } = await supabase
    .from('study_round_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', user!.id)
    .maybeSingle()

  if (!session) notFound()

  // Fetch all attempts for this session, ordered by round number
  const { data: rawAttempts } = await supabase
    .from('study_round_attempts')
    .select('*')
    .eq('session_id', sessionId)
    .order('round_number', { ascending: true })

  const attempts: StudyRoundAttemptSummary[] = (rawAttempts ?? []).map((a) => ({
    id: a.id as string,
    round_number: a.round_number as number,
    score_percent: a.score_percent as number | null,
    correct_count: a.correct_count as number | null,
    incorrect_count: a.incorrect_count as number | null,
    completed_at: a.completed_at as string | null,
    questions_json: (a.questions_json ?? []) as StudyRoundQuestion[],
    responses_json: (a.responses_json ?? []) as StudyRoundAttemptSummary['responses_json'],
    mind_map_json: (a.mind_map_json ?? null) as MindMapData | null,
  }))

  if (attempts.length === 0) notFound()

  const latestAttempt = attempts[attempts.length - 1]
  const sessionStatus = session.status as string

  return (
    <StudyRoundClient
      session={{
        id: session.id as string,
        started_at: session.started_at as string,
        status: sessionStatus,
        total_duration_minutes: (session.total_duration_minutes as number) ?? 120,
        question_count: session.question_count as number,
        subject: session.subject as string,
        exam_title: session.exam_title as string,
        language: (session.language as string | null) ?? undefined,
        original_exam_id: (session.original_exam_id as string | null) ?? undefined,
        standardized_exam: (session.standardized_exam as string | null) ?? undefined,
      }}
      attempts={attempts}
      latestAttempt={latestAttempt}
    />
  )
}
