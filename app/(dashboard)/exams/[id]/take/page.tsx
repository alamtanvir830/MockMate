import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ExamTaker } from '@/components/exam/exam-taker'
import { isExamLocked, daysUntil } from '@/lib/utils'

export const metadata: Metadata = { title: 'Take Exam' }

export default async function TakeExamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: exam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!exam) notFound()

  // Gate: already completed — send to results
  if (exam.status === 'completed') {
    redirect(`/exams/${id}/results`)
  }

  // Gate: exam is locked until unlock_date
  if (isExamLocked(exam.unlock_date)) {
    const unlockDay = new Date(exam.unlock_date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    const daysLeft = daysUntil(exam.unlock_date)
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{exam.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{exam.subject}</p>
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">
              This mock exam is not available yet
            </p>
            <p className="mt-1 text-sm text-amber-700">
              Unlocks in <span className="font-bold">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</span> — on {unlockDay}
            </p>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Your real exam is on{' '}
            {new Date(exam.exam_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            . The mock unlocks {exam.unlock_days_before} days before.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('exam_id', id)
    .order('order', { ascending: true })

  if (error || !questions || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-800">No questions found for this exam.</p>
          <p className="mt-1 text-sm text-red-600">
            The exam may not have generated correctly. Please try creating a new exam.
          </p>
        </div>
      </div>
    )
  }

  return <ExamTaker exam={exam} questions={questions} />
}
