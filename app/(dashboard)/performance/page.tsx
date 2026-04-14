import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PerformanceClient } from '@/components/performance/performance-client'

export const metadata: Metadata = { title: 'Previous Exam Performance' }

export default async function PerformancePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch all performance entries for this user
  const { data: entries } = await supabase
    .from('real_exam_performances')
    .select('*')
    .eq('user_id', user!.id)
    .order('date_taken', { ascending: false })

  // Fetch completed practice exams (for the link dropdown)
  const { data: practiceExams } = await supabase
    .from('exams')
    .select('id, title, subject')
    .eq('user_id', user!.id)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  // Fetch latest practice attempt percentage per exam
  const examIds = (practiceExams ?? []).map((e) => e.id)
  const practiceScoreMap: Record<string, number> = {}

  if (examIds.length > 0) {
    const { data: attempts } = await supabase
      .from('exam_attempts')
      .select('exam_id, percentage, submitted_at')
      .in('exam_id', examIds)
      .eq('status', 'completed')
      .order('submitted_at', { ascending: false })

    // Keep only the most recent attempt per exam
    for (const attempt of attempts ?? []) {
      if (!(attempt.exam_id in practiceScoreMap)) {
        practiceScoreMap[attempt.exam_id] = attempt.percentage
      }
    }
  }

  const practiceExamOptions = (practiceExams ?? []).map((e) => ({
    id: e.id,
    title: e.title,
    subject: e.subject,
    practicePercentage: practiceScoreMap[e.id] ?? null,
  }))

  return (
    <PerformanceClient
      entries={entries ?? []}
      practiceExams={practiceExamOptions}
    />
  )
}
