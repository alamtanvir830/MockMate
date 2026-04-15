import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { SharedPreferencesForm } from '@/components/exam/shared-preferences-form'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Group Preferences' }

export default async function SharedPreferencesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Verify this user is a recipient for this exam
  const { data: recipient } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', id)
    .eq('email', user!.email!)
    .maybeSingle()

  if (!recipient) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <p className="font-semibold text-red-800">Access denied</p>
          <p className="mt-1 text-sm text-red-600">
            This exam was not shared with your account ({user!.email}).
          </p>
          <Link href="/dashboard" className="mt-4 inline-block">
            <Button variant="outline" size="sm">Back to dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check for a completed attempt.
  // Use .limit(1).maybeSingle() to safely handle 0 or multiple rows without error.
  const { data: attempt } = await admin
    .from('exam_attempts')
    .select('id, show_score_to_group')
    .eq('exam_id', id)
    .eq('user_id', user!.id)
    .eq('status', 'completed')
    .order('submitted_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!attempt) {
    // No completed attempt — send them to take the exam
    redirect(`/exams/${id}/shared`)
  }

  // If preferences already saved, skip to results.
  // Checking !== null and !== undefined handles both the column-exists-with-value case
  // and the column-doesn't-exist-yet case safely.
  if (attempt.show_score_to_group !== null && attempt.show_score_to_group !== undefined) {
    redirect(`/exams/${id}/shared`)
  }

  // Fetch exam title for display
  const { data: exam } = await admin
    .from('exams')
    .select('title')
    .eq('id', id)
    .single()

  return (
    <SharedPreferencesForm
      examId={id}
      examTitle={exam?.title ?? 'this exam'}
    />
  )
}
