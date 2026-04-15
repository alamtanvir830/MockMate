import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Card } from '@/components/ui/card'
import { isExamLocked, daysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'My Groups' }

export default async function GroupsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Groups where user is a recipient (shared with them)
  const { data: asRecipient } = await admin
    .from('exam_shared_recipients')
    .select('exam_id')
    .eq('email', user!.email!)

  // Groups where user is the creator (they shared with others)
  const { data: asCreator } = await admin
    .from('exam_shared_recipients')
    .select('exam_id')
    .eq('user_id', user!.id)

  const creatorExamIds = new Set((asCreator ?? []).map((r) => r.exam_id))
  const recipientExamIds = new Set((asRecipient ?? []).map((r) => r.exam_id))
  const allExamIds = [...new Set([...creatorExamIds, ...recipientExamIds])]

  // Empty state
  if (allExamIds.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Groups</h1>
          <p className="mt-1 text-sm text-slate-500">Shared exam groups you are part of</p>
        </div>
        <Card className="text-center py-14">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <p className="font-medium text-slate-700">You are not part of any shared exam groups yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            Groups appear here when you share an exam or are invited to one.
          </p>
        </Card>
      </div>
    )
  }

  // Fetch exam details
  const { data: exams } = await admin
    .from('exams')
    .select('id, title, subject, exam_date, unlock_date, status, user_id')
    .in('id', allExamIds)
    .order('created_at', { ascending: false })

  // Fetch all recipients for these exams (to show member names)
  const { data: allRecipients } = await admin
    .from('exam_shared_recipients')
    .select('exam_id, name, email')
    .in('exam_id', allExamIds)

  // Group recipients by exam_id
  const recipientsByExam = new Map<string, { name: string; email: string }[]>()
  for (const r of allRecipients ?? []) {
    if (!recipientsByExam.has(r.exam_id)) recipientsByExam.set(r.exam_id, [])
    recipientsByExam.get(r.exam_id)!.push({ name: r.name, email: r.email })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Groups</h1>
        <p className="mt-1 text-sm text-slate-500">
          {allExamIds.length} group{allExamIds.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3">
        {(exams ?? []).map((exam) => {
          const recipients = recipientsByExam.get(exam.id) ?? []
          const isCreator = creatorExamIds.has(exam.id)
          const locked = isExamLocked(exam.unlock_date)
          // +1 for creator
          const memberCount = recipients.length + 1
          // Other members from current user's perspective
          const otherMembers = isCreator
            ? recipients
            : recipients.filter((r) => r.email !== user!.email!)

          return (
            <Link key={exam.id} href={`/groups/${exam.id}`} className="block">
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-slate-900 truncate">{exam.title}</h2>
                      {/* Role badge */}
                      <span className={cn(
                        'shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border',
                        isCreator
                          ? 'bg-indigo-50 border-indigo-100 text-indigo-600'
                          : 'bg-slate-50 border-slate-200 text-slate-500',
                      )}>
                        {isCreator ? 'Created by you' : 'Member'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 mt-0.5">{exam.subject}</p>

                    {/* Other members */}
                    {otherMembers.length > 0 && (
                      <p className="mt-2 text-xs text-slate-400">
                        {otherMembers.length <= 3
                          ? otherMembers.map((m) => m.name).join(', ')
                          : `${otherMembers.slice(0, 3).map((m) => m.name).join(', ')} +${otherMembers.length - 3} more`}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-2">
                    {/* Lock status */}
                    <span className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                      locked
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                    )}>
                      {locked ? (
                        <>
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          Locked
                        </>
                      ) : (
                        <>
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          Open
                        </>
                      )}
                    </span>

                    {/* Member count */}
                    <span className="text-xs text-slate-400">
                      {memberCount} member{memberCount !== 1 ? 's' : ''}
                    </span>

                    {/* Unlock date */}
                    <span className="text-xs text-slate-400">
                      {locked
                        ? `Opens ${new Date(exam.unlock_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : `Exam ${new Date(exam.exam_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end">
                  <span className="text-xs font-medium text-indigo-600">View group →</span>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
