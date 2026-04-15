import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { isExamLocked, daysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Group Detail' }

interface Member {
  name: string
  email: string
  role: 'creator' | 'member'
  isCurrentUser: boolean
  status: 'completed' | 'not_started'
  completedAt: string | null
  // Preferences (only set for shared recipients who completed the exam)
  showScoreToGroup: boolean | null
  includeInRankings: boolean | null
  percentage: number | null
  score: number | null
  totalMarks: number | null
}

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ examId: string }>
}) {
  const { examId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Fetch exam
  const { data: exam } = await admin
    .from('exams')
    .select('id, title, subject, exam_date, unlock_date, status, user_id')
    .eq('id', examId)
    .single()

  if (!exam) notFound()

  const isCreator = exam.user_id === user!.id

  const { data: recipientRow } = await admin
    .from('exam_shared_recipients')
    .select('id')
    .eq('exam_id', examId)
    .eq('email', user!.email!)
    .single()

  if (!isCreator && !recipientRow) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <p className="font-semibold text-red-800">Access denied</p>
          <p className="mt-1 text-sm text-red-600">You are not a member of this group.</p>
          <Link href="/groups" className="mt-4 inline-block">
            <Button variant="outline" size="sm">Back to My Groups</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Fetch all recipients
  const { data: recipients } = await admin
    .from('exam_shared_recipients')
    .select('name, email')
    .eq('exam_id', examId)

  // Fetch all completed attempts for this exam (includes preference columns)
  const { data: attempts } = await admin
    .from('exam_attempts')
    .select('user_id, submitted_at, score, total_marks, percentage, show_score_to_group, include_in_rankings')
    .eq('exam_id', examId)
    .eq('status', 'completed')

  // Resolve each attempt's user_id → email via admin auth
  interface AttemptInfo {
    submittedAt: string
    score: number | null
    totalMarks: number | null
    percentage: number | null
    showScoreToGroup: boolean | null
    includeInRankings: boolean | null
  }
  const attemptByEmail = new Map<string, AttemptInfo>()
  for (const a of attempts ?? []) {
    try {
      const { data: authData } = await admin.auth.admin.getUserById(a.user_id)
      if (authData?.user?.email) {
        attemptByEmail.set(authData.user.email, {
          submittedAt: a.submitted_at,
          score: a.score,
          totalMarks: a.total_marks,
          percentage: a.percentage,
          showScoreToGroup: a.show_score_to_group,
          includeInRankings: a.include_in_rankings,
        })
      }
    } catch {
      // skip — non-fatal
    }
  }

  // Get creator's display info
  let creatorName = 'Group creator'
  let creatorEmail = ''
  try {
    const { data: creatorAuth } = await admin.auth.admin.getUserById(exam.user_id)
    creatorEmail = creatorAuth?.user?.email ?? ''
    creatorName =
      creatorAuth?.user?.user_metadata?.full_name ??
      creatorEmail.split('@')[0] ??
      'Group creator'
  } catch {
    // skip
  }

  // Build member list
  const members: Member[] = []

  // Creator — the creator's own attempt is in exam_attempts but NOT subject to
  // the shared preferences flow. We show their completion status but no score/preferences.
  const creatorAttemptInfo = attemptByEmail.get(isCreator ? user!.email! : creatorEmail)
  members.push({
    name: isCreator
      ? (user!.user_metadata?.full_name ?? user!.email?.split('@')[0] ?? 'You')
      : creatorName,
    email: isCreator ? user!.email! : creatorEmail,
    role: 'creator',
    isCurrentUser: isCreator,
    status: creatorAttemptInfo ? 'completed' : 'not_started',
    completedAt: creatorAttemptInfo?.submittedAt ?? null,
    // Creator doesn't go through the shared preferences flow
    showScoreToGroup: null,
    includeInRankings: null,
    percentage: null,
    score: null,
    totalMarks: null,
  })

  // Recipients
  for (const r of recipients ?? []) {
    const isCurrentUserMember = r.email === user!.email!
    const info = attemptByEmail.get(r.email)
    members.push({
      name: isCurrentUserMember
        ? (user!.user_metadata?.full_name ?? user!.email?.split('@')[0] ?? r.name)
        : r.name,
      email: r.email,
      role: 'member',
      isCurrentUser: isCurrentUserMember,
      status: info ? 'completed' : 'not_started',
      completedAt: info?.submittedAt ?? null,
      showScoreToGroup: info?.showScoreToGroup ?? null,
      includeInRankings: info?.includeInRankings ?? null,
      percentage: info?.percentage ?? null,
      score: info?.score ?? null,
      totalMarks: info?.totalMarks ?? null,
    })
  }

  // Build rankings — members who opted in, sorted by score desc
  const rankingMembers = members
    .filter((m) => m.role === 'member' && m.includeInRankings === true && m.percentage !== null)
    .sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))

  const locked = isExamLocked(exam.unlock_date)
  const daysToExam = daysUntil(exam.exam_date)
  const daysToUnlock = locked ? daysUntil(exam.unlock_date) : 0
  const completedCount = members.filter((m) => m.status === 'completed').length
  const totalCount = members.length

  const rankMedals = ['🥇', '🥈', '🥉']

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link
        href="/groups"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        My Groups
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600">
            {isCreator ? 'Created by you' : 'Member'}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{exam.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{exam.subject}</p>
      </div>

      {/* Lock status panel */}
      <Card
        className={cn(
          'border-0',
          locked ? 'bg-amber-50 ring-1 ring-amber-200' : 'bg-emerald-50 ring-1 ring-emerald-200',
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
              locked ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600',
            )}
          >
            {locked ? (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            )}
          </div>
          <div>
            {locked ? (
              <>
                <p className="font-semibold text-amber-900">Exam is locked</p>
                <p className="text-sm text-amber-700 mt-0.5">
                  Opens in {daysToUnlock} day{daysToUnlock !== 1 ? 's' : ''} ·{' '}
                  {new Date(exam.unlock_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-emerald-900">Exam is open</p>
                <p className="text-sm text-emerald-700 mt-0.5">
                  {daysToExam > 0
                    ? `${daysToExam} day${daysToExam !== 1 ? 's' : ''} until the real exam · `
                    : ''}
                  {new Date(exam.exam_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Members */}
      <Card padded={false}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
            <span className="text-sm text-slate-500">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            />
          </div>
        </CardHeader>

        <div className="divide-y divide-slate-100">
          {members.map((member) => {
            // A member's score is visible to the viewer if:
            // - It's the current user (always see own score)
            // - The member explicitly opted in to score sharing
            const canSeeScore = member.isCurrentUser || member.showScoreToGroup === true

            return (
              <div key={member.email} className="flex items-center gap-4 px-6 py-4">
                {/* Avatar */}
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                    member.isCurrentUser
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500',
                  )}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>

                {/* Name / email */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {member.name}
                      {member.isCurrentUser && (
                        <span className="ml-1.5 text-xs font-normal text-slate-400">(you)</span>
                      )}
                    </p>
                    {member.role === 'creator' && (
                      <span className="shrink-0 inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
                        Creator
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{member.email}</p>
                </div>

                {/* Score + status */}
                <div className="shrink-0 text-right space-y-1">
                  {member.status === 'completed' ? (
                    <>
                      {/* Score — only if viewer is allowed to see it */}
                      {canSeeScore && member.percentage !== null && (
                        <p className="text-sm font-semibold text-slate-800">
                          {member.percentage}%
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Completed
                      </span>
                      {member.completedAt && (
                        <p className="text-xs text-slate-400">
                          {new Date(member.completedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      Not started
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Group Rankings — only shown if at least one member opted in */}
      {rankingMembers.length > 0 && (
        <Card padded={false}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Group Rankings</CardTitle>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Only members who opted into rankings are shown. Scores are hidden unless the member chose to share them.
            </p>
          </CardHeader>
          <div className="divide-y divide-slate-100">
            {rankingMembers.map((member, i) => {
              const rank = i + 1
              const canSeeScore = member.isCurrentUser || member.showScoreToGroup === true
              const medal = rankMedals[i]

              return (
                <div key={member.email} className="flex items-center gap-4 px-6 py-4">
                  {/* Rank */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                    {medal ? (
                      <span className="text-xl">{medal}</span>
                    ) : (
                      <span className="text-sm font-bold text-slate-500">#{rank}</span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {member.name}
                      {member.isCurrentUser && (
                        <span className="ml-1.5 text-xs font-normal text-slate-400">(you)</span>
                      )}
                    </p>
                  </div>

                  {/* Score or hidden */}
                  <div className="shrink-0 text-right">
                    {canSeeScore && member.percentage !== null ? (
                      <p className="text-sm font-semibold text-slate-800">{member.percentage}%</p>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Score hidden</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* CTA for current user if not started and exam is open */}
      {!locked && members.find((m) => m.isCurrentUser && m.status === 'not_started') && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-indigo-900">You have not taken this exam yet</p>
            <p className="text-sm text-indigo-700 mt-0.5">The exam is open — start your attempt now.</p>
          </div>
          {isCreator ? (
            <Link href={`/exams/${examId}/take`} className="shrink-0">
              <Button size="sm">Start exam</Button>
            </Link>
          ) : (
            <Link href={`/exams/${examId}/shared`} className="shrink-0">
              <Button size="sm">Start exam</Button>
            </Link>
          )}
        </div>
      )}

      {/* CTA if current user completed */}
      {members.find((m) => m.isCurrentUser && m.status === 'completed') && (
        <div className="pb-2 flex justify-end">
          {isCreator ? (
            <Link href={`/exams/${examId}/results`}>
              <Button variant="outline" size="sm">View your results</Button>
            </Link>
          ) : (
            <Link href={`/exams/${examId}/shared`}>
              <Button variant="outline" size="sm">View your results</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
