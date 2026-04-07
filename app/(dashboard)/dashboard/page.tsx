import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExamStatusBadge } from '@/components/ui/badge'
import { daysUntil, isExamLocked } from '@/lib/utils'
import type { Exam } from '@/types'

export const metadata: Metadata = { title: 'Dashboard' }

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const fullName = user?.user_metadata?.full_name as string | undefined
  const displayName = fullName ?? user?.email?.split('@')[0] ?? 'there'

  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const allExams: Exam[] = exams ?? []
  const completedCount = allExams.filter((e) => e.status === 'completed').length
  const nextExam = allExams
    .filter((e) => e.status !== 'completed' && daysUntil(e.exam_date) >= 0)
    .sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())[0]

  const recentExams = allExams.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {greeting()}, {displayName} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {allExams.length === 0
              ? 'Create your first mock exam to get started'
              : `${allExams.length} exam${allExams.length !== 1 ? 's' : ''} total`}
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{allExams.length}</p>
            <p className="text-sm text-slate-500">Total exams</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
            <p className="text-sm text-slate-500">Completed</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {nextExam ? `${daysUntil(nextExam.exam_date)}d` : '—'}
            </p>
            <p className="text-sm text-slate-500">Days to next exam</p>
          </div>
        </Card>
      </div>

      {/* Next exam spotlight */}
      {nextExam && (() => {
        const locked = isExamLocked(nextExam.unlock_date)
        const daysToExam = daysUntil(nextExam.exam_date)
        const daysToUnlock = locked ? daysUntil(nextExam.unlock_date) : 0
        return (
          <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 shadow-lg shadow-emerald-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-emerald-200 uppercase tracking-widest mb-1">
                  Next exam
                </p>
                <h2 className="text-xl font-bold">{nextExam.title}</h2>
                <p className="text-emerald-200 mt-1 text-sm">{nextExam.subject}</p>
                <p className="mt-3 text-sm text-emerald-100">
                  <span className="font-semibold text-white">{daysToExam} days</span>{' '}
                  until{' '}
                  {new Date(nextExam.exam_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {locked && (
                  <p className="mt-1 text-xs text-emerald-300">
                    Mock unlocks in {daysToUnlock} day{daysToUnlock !== 1 ? 's' : ''} ·{' '}
                    {new Date(nextExam.unlock_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
              {locked ? (
                <div className="shrink-0 flex items-center gap-1.5 rounded-lg bg-white/10 text-emerald-200 text-sm font-medium px-4 py-2">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Locked
                </div>
              ) : (
                <Link href={`/exams/${nextExam.id}/take`}>
                  <button className="shrink-0 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 transition-colors backdrop-blur-sm">
                    Practice now
                  </button>
                </Link>
              )}
            </div>
          </Card>
        )
      })()}

      {/* Recent exams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Recent exams</h2>
          <Link
            href="/exams"
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
          >
            View all
          </Link>
        </div>

        {recentExams.length === 0 ? (
          <Card className="text-center py-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="font-medium text-slate-700">No exams yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Create your first mock exam to get started
            </p>
            <Link href="/exams/create" className="inline-block mt-4">
              <Button size="sm">Create exam</Button>
            </Link>
          </Card>
        ) : (
          <Card padded={false} className="divide-y divide-slate-100">
            {recentExams.map((exam) => {
              const days = daysUntil(exam.exam_date)
              const locked = isExamLocked(exam.unlock_date)
              return (
                <div
                  key={exam.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{exam.title}</p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {exam.subject} ·{' '}
                      {exam.status === 'completed'
                        ? 'Completed'
                        : locked
                        ? `Unlocks in ${daysUntil(exam.unlock_date)} day${daysUntil(exam.unlock_date) !== 1 ? 's' : ''}`
                        : days >= 0
                        ? `${days} day${days !== 1 ? 's' : ''} left`
                        : 'Past date'}
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
          </Card>
        )}
      </div>
    </div>
  )
}
