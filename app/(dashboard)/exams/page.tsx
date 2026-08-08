import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Exam } from '@/types'
import { ExamsHistoryView } from '@/components/exams/ExamsHistoryView'
import type { ServerAttemptRow } from '@/components/exams/PremadeAttemptsSection'

export const metadata: Metadata = { title: 'Exam History' }

export default async function ExamsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allExams: Exam[] = exams ?? []

  // Shared exams — find exams shared with this user's email via admin client (bypasses RLS)
  const { data: sharedRecipients } = await admin
    .from('exam_shared_recipients')
    .select('exam_id')
    .eq('email', user!.email!)

  const sharedExamIds = (sharedRecipients ?? []).map((r) => r.exam_id)
  let sharedExams: Exam[] = []

  if (sharedExamIds.length > 0) {
    const { data } = await admin
      .from('exams')
      .select('*')
      .in('id', sharedExamIds)
      .order('created_at', { ascending: false })
    sharedExams = data ?? []
  }

  // Which shared exams has this user already completed (their own attempt)?
  const completedSharedIds: string[] = []
  if (sharedExamIds.length > 0) {
    const { data: myAttempts } = await admin
      .from('exam_attempts')
      .select('exam_id')
      .in('exam_id', sharedExamIds)
      .eq('user_id', user!.id)
      .eq('status', 'completed')
    for (const a of myAttempts ?? []) completedSharedIds.push(a.exam_id)
  }

  // In-progress SAT attempts
  const { data: inProgressRows } = await supabase
    .from('sat_in_progress_attempts')
    .select('local_attempt_id, form_number, answers, started_at, last_saved_at, current_phase_tag, rw_m2_type, math_m2_type')
    .order('last_saved_at', { ascending: false })

  // Completed SAT attempts from DB (authoritative fallback when localStorage is cleared)
  const { data: dbAttemptRows } = await supabase
    .from('standardized_exam_attempts')
    .select('local_attempt_id, form_number, exam_title, total_score, rw_score, math_score, completed_at')
    .eq('user_id', user!.id)
    .eq('exam_type', 'SAT')
    .not('completed_at', 'is', null)
    .order('completed_at', { ascending: false })

  return (
    <ExamsHistoryView
      allExams={allExams}
      sharedExams={sharedExams}
      completedSharedIds={completedSharedIds}
      inProgressAttempts={inProgressRows ?? []}
      serverAttempts={(dbAttemptRows ?? []) as ServerAttemptRow[]}
    />
  )
}
