import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'

export const metadata: Metadata = { title: 'Shared Exam Invite' }

export default async function JoinPage({
  params,
}: {
  params: Promise<{ examId: string }>
}) {
  const { examId } = await params
  const admin = createAdminClient()

  // Fetch basic exam info — no ownership check, just title/subject for the invite page
  const { data: exam } = await admin
    .from('exams')
    .select('id, title, subject, status')
    .eq('id', examId)
    .single()

  // Check current session
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Determine access state
  let isInvited = false
  if (user) {
    const { data: recipient } = await admin
      .from('exam_shared_recipients')
      .select('id')
      .eq('exam_id', examId)
      .eq('email', user.email!)
      .single()
    isInvited = !!recipient
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Minimal nav */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-6">

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>

            {/* Exam details or fallback */}
            {exam ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                  Shared exam
                </p>
                <h1 className="text-xl font-bold text-slate-900">{exam.title}</h1>
                <p className="text-sm text-slate-500 mt-1">{exam.subject}</p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold text-slate-900">Exam not found</h1>
                <p className="text-sm text-slate-500 mt-1">
                  This invite link may be invalid or the exam may have been removed.
                </p>
              </div>
            )}

            {/* State-based content */}
            {!exam ? (
              <Link href="/">
                <Button variant="outline" className="w-full">Go to homepage</Button>
              </Link>
            ) : !user ? (
              /* ── Not logged in ── */
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
                  <p className="text-sm font-semibold text-amber-900">
                    Account required
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    You need to create a MockMate account first before you can access this shared exam.
                  </p>
                </div>
                <Link href={`/signup?next=/exams/${examId}/shared`} className="block">
                  <Button className="w-full">Create a free account</Button>
                </Link>
                <Link href={`/login?next=/exams/${examId}/shared`} className="block">
                  <Button variant="outline" className="w-full">Sign in</Button>
                </Link>
                <p className="text-xs text-slate-400">
                  After signing in or signing up, you&apos;ll be redirected back to this exam.
                </p>
              </div>
            ) : isInvited ? (
              /* ── Logged in + invited ── */
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-sm text-emerald-800">
                    You have been invited to take this exam. Your attempt is independent — starting or finishing does not affect anyone else.
                  </p>
                </div>
                <Link href={`/exams/${examId}/shared`} className="block">
                  <Button className="w-full">Access exam</Button>
                </Link>
              </div>
            ) : (
              /* ── Logged in but not on invite list ── */
              <div className="space-y-4">
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                  <p className="text-sm font-semibold text-red-800">No access</p>
                  <p className="mt-1 text-sm text-red-700">
                    This exam was not shared with your account ({user.email}). Contact the exam creator if you believe this is a mistake.
                  </p>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">Go to dashboard</Button>
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
