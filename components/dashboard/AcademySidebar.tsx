'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// ── Skill slug sets ────────────────────────────────────────────────────────────

const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
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
  { slug: 'cross-text-connections', label: 'Cross-Text Connections' },
]

function lessonCategory(slug: string): 'writing' | 'reading' | null {
  if (WRITING_SLUGS.includes(slug)) return 'writing'
  if (READING_SLUGS.includes(slug)) return 'reading'
  return null
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  diagnostic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  writing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  reading: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  vocabulary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  transitions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  mixed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  capstone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-4.5c0-.621.504-1.125 1.125-1.125h2.25C17.496 7.5 18 8.004 18 8.625v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  mastery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  glossary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-sky-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
}

// ── Tooltip wrapper for collapsed mode ────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip flex items-center justify-center">
      {children}
      <span
        role="tooltip"
        className="
          pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 z-50
          rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white whitespace-nowrap
          opacity-0 group-hover/tip:opacity-100 focus-within:opacity-100
          transition-opacity duration-100
        "
      >
        {label}
      </span>
    </div>
  )
}

// ── Shared sidebar nav content ─────────────────────────────────────────────────

interface NavContentProps {
  pathname: string
  collapsed: boolean
  isPremium?: boolean
  onNavigate?: () => void
  firstFocusRef?: React.RefObject<HTMLAnchorElement | null>
}

function NavContent({ pathname, collapsed, isPremium = true, onNavigate, firstFocusRef }: NavContentProps) {
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

  function active(href: string, exact = false) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  const linkBase = cn(
    'flex items-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
  )
  const activeCls = 'bg-emerald-50 text-emerald-700 font-semibold'
  const inactiveCls = 'text-sky-800 hover:bg-sky-100 hover:text-sky-900'

  // ── Collapsed mode ───────────────────────────────────────────────────────────
  if (collapsed) {
    const items = [
      { href: '/sat-rw-academy', label: 'Course Home', icon: ICONS.home, exact: true, protected: false },
      { href: '/sat-rw-academy/diagnostic', label: 'R&W Diagnostic', icon: ICONS.diagnostic, protected: true },
      { href: '/sat-rw-academy/writing', label: 'Writing Skills', icon: ICONS.writing, forceActive: isWritingRoute, protected: true },
      { href: '/sat-rw-academy/reading', label: 'Reading Skills', icon: ICONS.reading, forceActive: isReadingRoute, protected: true },
      { href: '/sat-rw-academy/vocabulary', label: 'Vocabulary Trainer', icon: ICONS.vocabulary, protected: true },
      { href: '/sat-rw-academy/transitions', label: 'Transition Trainer', icon: ICONS.transitions, protected: true },
      { href: '/sat-rw-academy/reading-speed', label: 'Reading Speed', icon: ICONS.speed, protected: true },
      { href: '/sat-rw-academy/review', label: 'Review Queue', icon: ICONS.review, protected: true },
      { href: '/sat-rw-academy/mixed-practice', label: 'Mixed Practice', icon: ICONS.mixed, protected: true },
      { href: '/sat-rw-academy/capstones', label: 'R&W Capstones', icon: ICONS.capstone, protected: true },
      { href: '/sat-rw-academy/mastery-check', label: 'Mastery Check', icon: ICONS.mastery, protected: true },
      { href: '/sat-rw-academy/glossary', label: 'R&W Glossary', icon: ICONS.glossary, protected: true },
      { href: '/sat-rw-academy/study-plan', label: 'Study Plan', icon: ICONS.plan, protected: true },
    ]

    return (
      <nav aria-label="SAT R&W Academy course navigation" className="flex flex-col gap-0.5">
        {items.map(({ href, label, icon, exact, forceActive, protected: isProtected }) => {
          const locked = isProtected && !isPremium
          const dest = locked ? '/billing' : href
          const tooltipLabel = locked ? `${label} — SAT Premium required` : label
          const isActive = locked ? false : (forceActive ?? active(href, exact))
          return (
            <Tooltip key={href} label={tooltipLabel}>
              <Link
                href={dest}
                aria-label={tooltipLabel}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
                className={cn(
                  linkBase,
                  'h-10 w-10 justify-center relative',
                  isActive ? activeCls : inactiveCls,
                  locked && 'opacity-60',
                )}
              >
                {icon}
                {locked && (
                  <span className="absolute -top-0.5 -right-0.5">{ICONS.lock}</span>
                )}
              </Link>
            </Tooltip>
          )
        })}
      </nav>
    )
  }

  // ── Expanded mode ────────────────────────────────────────────────────────────
  const expandedLink = (href: string, label: string, icon: React.ReactNode, exact = false, forceActive?: boolean, isProtected = true) => {
    const locked = isProtected && !isPremium
    const dest = locked ? '/billing' : href
    const isActive = locked ? false : (forceActive ?? active(href, exact))
    return (
      <Link
        href={dest}
        aria-label={locked ? `${label} — SAT Premium required` : label}
        aria-current={isActive ? 'page' : undefined}
        onClick={onNavigate}
        className={cn(
          linkBase, 'gap-2.5 px-3 py-2 text-sm font-medium',
          isActive ? activeCls : inactiveCls,
          locked && 'opacity-60',
        )}
        ref={href === '/sat-rw-academy' ? firstFocusRef as React.RefObject<HTMLAnchorElement> : undefined}
      >
        {icon}
        <span className="flex-1 min-w-0 truncate">{label}</span>
        {locked && ICONS.lock}
      </Link>
    )
  }

  const subLink = (slug: string, label: string) => {
    const locked = !isPremium
    const href = `/sat-rw-academy/lesson/${slug}`
    const dest = locked ? '/billing' : href
    const isActive = !locked && pathname === href
    return (
      <Link
        key={slug}
        href={dest}
        aria-label={locked ? `${label} — SAT Premium required` : label}
        aria-current={isActive ? 'page' : undefined}
        onClick={onNavigate}
        className={cn(
          'flex items-center gap-2 rounded-lg py-1.5 pl-10 pr-3 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
          isActive ? 'text-emerald-700 font-medium bg-emerald-50/60' : 'text-sky-700 hover:text-sky-900 hover:bg-sky-100',
          locked && 'opacity-60',
        )}
      >
        <span className={cn('h-1 w-1 rounded-full shrink-0', isActive ? 'bg-emerald-500' : 'bg-sky-300')} />
        <span className="flex-1 min-w-0 truncate">{label}</span>
        {locked && ICONS.lock}
      </Link>
    )
  }

  return (
    <nav aria-label="SAT R&W Academy course navigation" className="flex flex-col gap-0.5">

      {expandedLink('/sat-rw-academy', 'Course Home', ICONS.home, true, undefined, false)}
      {expandedLink('/sat-rw-academy/diagnostic', 'R&W Diagnostic', ICONS.diagnostic)}

      <div className="my-1 border-t border-sky-200/70" />

      {/* Writing Skills */}
      <div>
        {isPremium ? (
          <button
            onClick={() => setWritingOpen(p => !p)}
            aria-expanded={writingOpen}
            className={cn(
              'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
              isWritingRoute ? activeCls : inactiveCls,
            )}
          >
            <span className="flex items-center gap-2.5">{ICONS.writing}<span>Writing Skills</span></span>
            <span className={cn('transition-transform', writingOpen && 'rotate-180')}>{ICONS.chevronDown}</span>
          </button>
        ) : (
          <Link
            href="/billing"
            aria-label="Writing Skills — SAT Premium required"
            className={cn('flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors opacity-60', inactiveCls)}
          >
            <span className="flex items-center gap-2.5">{ICONS.writing}<span>Writing Skills</span></span>
            {ICONS.lock}
          </Link>
        )}
        {isPremium && writingOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {WRITING_LESSONS.map(l => subLink(l.slug, l.label))}
          </div>
        )}
      </div>

      {/* Reading Skills */}
      <div>
        {isPremium ? (
          <button
            onClick={() => setReadingOpen(p => !p)}
            aria-expanded={readingOpen}
            className={cn(
              'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
              isReadingRoute ? activeCls : inactiveCls,
            )}
          >
            <span className="flex items-center gap-2.5">{ICONS.reading}<span>Reading Skills</span></span>
            <span className={cn('transition-transform', readingOpen && 'rotate-180')}>{ICONS.chevronDown}</span>
          </button>
        ) : (
          <Link
            href="/billing"
            aria-label="Reading Skills — SAT Premium required"
            className={cn('flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors opacity-60', inactiveCls)}
          >
            <span className="flex items-center gap-2.5">{ICONS.reading}<span>Reading Skills</span></span>
            {ICONS.lock}
          </Link>
        )}
        {isPremium && readingOpen && (
          <div className="mt-0.5 flex flex-col gap-0.5">
            {READING_LESSONS.map(l => subLink(l.slug, l.label))}
          </div>
        )}
      </div>

      <div className="my-1 border-t border-sky-200/70" />

      {expandedLink('/sat-rw-academy/vocabulary', 'Vocabulary Trainer', ICONS.vocabulary)}
      {expandedLink('/sat-rw-academy/transitions', 'Transition Trainer', ICONS.transitions)}
      {expandedLink('/sat-rw-academy/reading-speed', 'Reading Speed', ICONS.speed)}
      {expandedLink('/sat-rw-academy/review', 'Review Queue', ICONS.review)}

      <div className="my-1 border-t border-sky-200/70" />

      {expandedLink('/sat-rw-academy/mixed-practice', 'Mixed Practice', ICONS.mixed)}
      {expandedLink('/sat-rw-academy/capstones', 'R&W Capstones', ICONS.capstone)}
      {expandedLink('/sat-rw-academy/mastery-check', 'Mastery Check', ICONS.mastery)}
      {expandedLink('/sat-rw-academy/glossary', 'R&W Glossary', ICONS.glossary)}
      {expandedLink('/sat-rw-academy/study-plan', 'Study Plan', ICONS.plan)}
    </nav>
  )
}

// ── Desktop sidebar ────────────────────────────────────────────────────────────

export function AcademySidebar({ isPremium = true }: { isPremium?: boolean }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('academy-sidebar-collapsed')
      if (saved === 'true') setCollapsed(true)
    } catch {
      // ignore storage errors
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem('academy-sidebar-collapsed', String(next)) } catch { /* ignore */ }
      return next
    })
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col shrink-0',
        'border-r border-sky-200 bg-sky-50',
        'overflow-y-auto overflow-x-visible',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-[60px]' : 'w-56',
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex h-12 shrink-0 items-center border-b border-sky-200',
        collapsed ? 'justify-center px-1' : 'justify-between px-3',
      )}>
        {!collapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 truncate">
            R&W Academy
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand academy navigation' : 'Collapse academy navigation'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Expand' : 'Collapse'}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sky-500 hover:bg-sky-100 hover:text-sky-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {collapsed ? ICONS.chevronRight : ICONS.chevronLeft}
        </button>
      </div>

      {/* Nav */}
      <div className={cn(
        'flex-1 overflow-y-auto overflow-x-visible py-2',
        collapsed ? 'flex flex-col items-center px-1 gap-0.5' : 'px-2',
      )}>
        <NavContent pathname={pathname} collapsed={collapsed} isPremium={isPremium} />
      </div>
    </aside>
  )
}

// ── Mobile drawer ──────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose, isPremium = true }: { open: boolean; onClose: () => void; isPremium?: boolean }) {
  const pathname = usePathname()
  const firstRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => firstRef.current?.focus(), 50)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(id); document.body.style.overflow = '' }
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
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="SAT R&W Academy course navigation"
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sky-50 shadow-xl"
      >
        <div className="flex h-14 items-center justify-between border-b border-sky-200 px-4">
          <span className="text-sm font-semibold text-sky-800">SAT R&W Academy</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-sky-400 hover:bg-sky-100 hover:text-sky-600 transition-colors"
            aria-label="Close academy menu"
          >
            {ICONS.close}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavContent pathname={pathname} collapsed={false} isPremium={isPremium} onNavigate={onClose} firstFocusRef={firstRef} />
        </div>
      </div>
    </>
  )
}

// ── Mobile menu button (used in academy layout) ────────────────────────────────

export function AcademyMobileMenu({ isPremium = true }: { isPremium?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3.5 py-2 text-sm font-medium text-sky-800 hover:bg-sky-100 transition-colors"
          aria-label="Open academy navigation menu"
        >
          {ICONS.menu}
          Academy Menu
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} isPremium={isPremium} />
    </>
  )
}
