import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExamStatusBadge } from '@/components/ui/badge'
import { daysUntil, isExamLocked } from '@/lib/utils'
import type { Exam } from '@/types'

export const metadata: Metadata = { title: 'My Exams' }

export default async function ExamsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allExams: Exam[] = exams ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Exams</h1>
          <p className="mt-1 text-sm text-slate-500">
            {allExams.length} exam{allExams.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link href="/exams/create">
          <Button size="sm">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New exam
          </Button>
        </Link>
      </div>

      <Card padded={false}>
        {allExams.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-slate-700">No exams yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Create your first mock exam to get started
            </p>
            <Link href="/exams/create" className="inline-block mt-4">
              <Button size="sm">Create exam</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {allExams.map((exam) => {
              const days = daysUntil(exam.exam_date)
              const locked = isExamLocked(exam.unlock_date)
              const unlockDay = exam.unlock_date
                ? new Date(exam.unlock_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : null
              return (
                <div
                  key={exam.id}
                  className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{exam.title}</p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {exam.subject} ·{' '}
                      {exam.status === 'completed'
                        ? 'Completed'
                        : locked
                        ? `Unlocks ${unlockDay}`
                        : days >= 0
                        ? `${days} day${days !== 1 ? 's' : ''} left`
                        : 'Past date'}{' '}
                      ·{' '}
                      {new Date(exam.exam_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <ExamStatusBadge status={exam.status} locked={locked} />
                  {exam.status === 'completed' ? (
                    <Link
                      href={`/exams/${exam.id}/results`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0"
                    >
                      View results
                    </Link>
                  ) : locked ? (
                    <span className="text-sm text-slate-400 shrink-0 flex items-center gap-1">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      Locked
                    </span>
                  ) : (
                    <Link
                      href={`/exams/${exam.id}/take`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0"
                    >
                      Open →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
