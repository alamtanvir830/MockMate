'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences',
]

const WRITING_LESSONS = [
  { slug: 'boundaries', label: 'Boundaries' },
  { slug: 'form-structure-sense', label: 'Form, Structure & Sense' },
  { slug: 'transitions', label: 'Transitions' },
  { slug: 'rhetorical-synthesis', label: 'Rhetorical Synthesis' },
]

const READING_LESSONS = [
  { slug: 'words-in-context', label: 'Words in Context' },
  { slug: 'central-ideas-details', label: 'Central Ideas & Details' },
  { slug: 'text-structure-purpose', label: 'Text Structure & Purpose' },
  { slug: 'command-of-evidence', label: 'Command of Evidence' },
  { slug: 'quantitative-evidence', label: 'Quantitative Evidence' },
  { slug: 'inferences', label: 'Inferences' },
]

function lessonCategory(slug: string): 'writing' | 'reading' | null {
  if (WRITING_SLUGS.includes(slug)) return 'writing'
  if (READING_SLUGS.includes(slug)) return 'reading'
  return null
}

// ── Shared nav content ─────────────────────────────────────────────────────────

interface NavContentProps {
  pathname: string
  onNavigate?: () => void
  firstFocusRef?: React.RefObject<HTMLAnchorElement | null>
}

function NavContent({ pathname, onNavigate, firstFocusRef }: NavContentProps) {
  const lessonMatch = pathname.match(/\/sat-rw-academy\/lesson\/([^/]+)/)
  const activeLesson = lessonMatch?.[1] ?? null
  const activeCategory = activeLesson ? lessonCategory(activeLesson) : null

  const isWritingRoute = pathname.startsWith('/sat-rw-academy/writing') || activeCategory === 'writing'
  const isReadingRoute = pathname.startsWith('/sat-rw-academy/reading') || activeCategory === 'reading'

  const [writingOpen, setWritingOpen] = useState(isWritingRoute)
  const [readingOpen, setReadingOpen] = useState(isReadingRoute)

  useEffect(() => {
    if (isWritingRoute) setWritingOpen(true)
    if (isReadingRoute) setReadingOpen(true)
  }, [isWritingRoute, isReadingRoute])

  function active(href: string, exact = false): boolean {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  const linkClass = (isActive: boolean) =>
    cn(
      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-emerald-50 text-emerald-700 font-semibold'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
    )

  const subLinkClass = (isActive: boolean) =>
    cn(
      'flex items-center gap-2 pl-7 pr-3 py-1.5 text-[13px] rounded-lg transition-colors',
      isActive
        ? 'text-emerald-700 font-medium bg-emerald-50/60'
        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50',
    )

  return (
    <nav aria-label="SAT R&W Academy course navigation" className="flex flex-col gap-0.5">
      {/* Course Home */}
      <Link
        href="/sat-rw-academy"
        ref={firstFocusRef as React.RefObject<HTMLAnchorElement>}
        aria-current={active('/sat-rw-academy', true) ? 'page' : undefined}
        onClick={onNavigate}
        className={linkClass(active('/sat-rw-academy', true))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        Course Home
      </Link>

      {/* Diagnostic */}
      <Link
        href="/sat-rw-academy/diagnostic"
        aria-current={active('/sat-rw-academy/diagnostic') ? 'page' : undefined}
        onClick={onNavigate}
        className={linkClass(active('/sat-rw-academy/diagnostic'))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
        R&W Diagnostic
      </Link>

      <div className="my-1 border-t border-slate-100" />

      {/* Writing Skills (expandable) */}
      <div>
        <button
          onClick={() => setWritingOpen(p => !p)}
          aria-expanded={writingOpen}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isWritingRoute
              ? 'bg-emerald-50 text-emerald-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          )}
        >
          <span className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Writing Skills
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn('h-3.5 w-3.5 shrink-0 transition-transform', writingOpen && 'rotate-180')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {writingOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {WRITING_LESSONS.map(l => {
              const isActive = pathname === `/sat-rw-academy/lesson/${l.slug}`
              return (
                <Link
                  key={l.slug}
                  href={`/sat-rw-academy/lesson/${l.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onNavigate}
                  className={subLinkClass(isActive)}
                >
                  <span className={cn('h-1 w-1 rounded-full shrink-0', isActive ? 'bg-emerald-500' : 'bg-slate-300')} />
                  {l.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Reading Skills (expandable) */}
      <div>
        <button
          onClick={() => setReadingOpen(p => !p)}
          aria-expanded={readingOpen}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isReadingRoute
              ? 'bg-emerald-50 text-emerald-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          )}
        >
          <span className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Reading Skills
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn('h-3.5 w-3.5 shrink-0 transition-transform', readingOpen && 'rotate-180')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {readingOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {READING_LESSONS.map(l => {
              const isActive = pathname === `/sat-rw-academy/lesson/${l.slug}`
              return (
                <Link
                  key={l.slug}
                  href={`/sat-rw-academy/lesson/${l.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onNavigate}
                  className={subLinkClass(isActive)}
                >
                  <span className={cn('h-1 w-1 rounded-full shrink-0', isActive ? 'bg-emerald-500' : 'bg-slate-300')} />
                  {l.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <div className="my-1 border-t border-slate-100" />

      {/* Tools */}
      {[
        {
          href: '/sat-rw-academy/vocabulary',
          label: 'Vocabulary Trainer',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          ),
        },
        {
          href: '/sat-rw-academy/transitions',
          label: 'Transition Trainer',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          ),
        },
        {
          href: '/sat-rw-academy/reading-speed',
          label: 'Reading Speed',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          ),
        },
        {
          href: '/sat-rw-academy/review',
          label: 'Review Queue',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ),
        },
        {
          href: '/sat-rw-academy/study-plan',
          label: 'Study Plan',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          ),
        },
      ].map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={active(href) ? 'page' : undefined}
          onClick={onNavigate}
          className={linkClass(active(href))}
        >
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  )
}

// ── Mobile drawer ──────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const firstRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => firstRef.current?.focus(), 50)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, handleKey])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="SAT R&W Academy course navigation"
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl"
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-100 text-emerald-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-slate-800">SAT R&W Academy</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close academy menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavContent pathname={pathname} onNavigate={onClose} firstFocusRef={firstRef} />
        </div>
      </div>
    </>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

export function AcademySidebar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white sticky top-0 h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex h-12 items-center gap-2 border-b border-slate-100 px-4">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-emerald-700 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </span>
          <span className="text-xs font-semibold text-slate-700 leading-tight">SAT R&W Academy</span>
        </div>
        {/* Nav */}
        <div className="flex-1 overflow-y-auto p-2">
          <NavContent pathname={pathname} />
        </div>
      </aside>

      {/* ── Mobile button ───────────────────────────────────────────────── */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          aria-label="Open academy navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          Academy Menu
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
