import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const metadata: Metadata = {
  title: 'Classroom — MockMate',
  robots: { index: false, follow: false },
}

const ICON_EXAMS = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ICON_GROUPS = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

const ICON_NOTES = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
)

const ICON_SETTINGS = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default async function ClassroomDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()

  // Lightweight counts — HEAD-only queries, no row data fetched
  const [{ count: examCount }, { data: sharedRows }] = await Promise.all([
    supabase
      .from('exams')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user!.id),
    admin
      .from('exam_shared_recipients')
      .select('exam_id')
      .eq('user_id', user!.id),
  ])

  const groupCount = new Set((sharedRows ?? []).map((r) => r.exam_id)).size

  const cards = [
    {
      href: '/exams',
      label: 'My Practice Exams',
      icon: ICON_EXAMS,
      stat: examCount != null ? `${examCount} exam${examCount !== 1 ? 's' : ''}` : null,
    },
    {
      href: '/groups',
      label: 'My Groups',
      icon: ICON_GROUPS,
      stat: groupCount > 0 ? `${groupCount} group${groupCount !== 1 ? 's' : ''}` : null,
    },
    {
      href: '/notes',
      label: 'Personal Notes',
      icon: ICON_NOTES,
      stat: null,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: ICON_SETTINGS,
      stat: null,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-8">

      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: '#EBF5FE' }}
          aria-hidden="true"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6" style={{ color: '#44A5F0' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Classroom Practice</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, take, and review practice exams for your classes.
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <Link
        href="/exams/create"
        className="
          flex items-center justify-center gap-2.5
          w-full rounded-xl px-6 py-4
          text-base font-semibold text-white
          transition-opacity hover:opacity-90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#44A5F0]
        "
        style={{ background: '#44A5F0' }}
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create a Practice Exam
      </Link>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map(({ href, label, icon, stat }) => (
          <Link
            key={href}
            href={href}
            className="
              flex items-center gap-3 rounded-xl border border-slate-200 bg-white
              px-5 py-4 transition-shadow hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44A5F0] focus-visible:ring-offset-1
            "
          >
            <span className="shrink-0 text-slate-400" aria-hidden="true">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{label}</p>
              {stat && (
                <p className="text-xs text-slate-400 mt-0.5">{stat}</p>
              )}
            </div>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
