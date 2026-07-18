'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  ALGEBRA_SKILL_SLUGS, ADVANCED_MATH_SKILL_SLUGS,
  PSDA_SKILL_SLUGS, GEO_TRIG_SKILL_SLUGS,
  MATH_SKILL_DISPLAY_NAMES,
  type MathSkillSlug,
} from '@/lib/academy/math/skill-mapping'

// ── Lesson label maps ──────────────────────────────────────────────────────────

const ALGEBRA_LESSONS = ALGEBRA_SKILL_SLUGS.map(slug => ({
  slug, label: MATH_SKILL_DISPLAY_NAMES[slug],
}))

const ADVANCED_MATH_LESSONS = ADVANCED_MATH_SKILL_SLUGS.map(slug => ({
  slug, label: MATH_SKILL_DISPLAY_NAMES[slug],
}))

const PSDA_LESSONS = PSDA_SKILL_SLUGS.map(slug => ({
  slug, label: MATH_SKILL_DISPLAY_NAMES[slug],
}))

const GEO_TRIG_LESSONS = GEO_TRIG_SKILL_SLUGS.map(slug => ({
  slug, label: MATH_SKILL_DISPLAY_NAMES[slug],
}))

const ALL_ALGEBRA_SLUGS: readonly string[] = ALGEBRA_SKILL_SLUGS
const ALL_ADV_SLUGS: readonly string[] = ADVANCED_MATH_SKILL_SLUGS
const ALL_PSDA_SLUGS: readonly string[] = PSDA_SKILL_SLUGS
const ALL_GEO_SLUGS: readonly string[] = GEO_TRIG_SKILL_SLUGS

function lessonDomain(slug: string): 'algebra' | 'advanced-math' | 'psda' | 'geo' | null {
  if ((ALL_ALGEBRA_SLUGS as string[]).includes(slug)) return 'algebra'
  if ((ALL_ADV_SLUGS as string[]).includes(slug)) return 'advanced-math'
  if ((ALL_PSDA_SLUGS as string[]).includes(slug)) return 'psda'
  if ((ALL_GEO_SLUGS as string[]).includes(slug)) return 'geo'
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
  algebra: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
    </svg>
  ),
  advancedMath: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  psda: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-4.5c0-.621.504-1.125 1.125-1.125h2.25C17.496 7.5 18 8.004 18 8.625v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  geometry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  desmos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  sandbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  mixed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  capstone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  mastery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-indigo-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip flex items-center justify-center">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 z-50 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-100"
      >
        {label}
      </span>
    </div>
  )
}

// ── Shared nav content ─────────────────────────────────────────────────────────

interface NavContentProps {
  pathname: string
  collapsed: boolean
  isPremium?: boolean
  onNavigate?: () => void
  firstFocusRef?: React.RefObject<HTMLAnchorElement | null>
}

function NavContent({ pathname, collapsed, isPremium = true, onNavigate, firstFocusRef }: NavContentProps) {
  const lessonMatch = pathname.match(/\/sat-math-academy\/lesson\/([^/]+)/)
  const activeLessonSlug = lessonMatch?.[1] ?? null
  const activeDomain = activeLessonSlug ? lessonDomain(activeLessonSlug) : null

  const isAlgebraRoute  = pathname.startsWith('/sat-math-academy/lesson/') && activeDomain === 'algebra'
  const isAdvRoute      = pathname.startsWith('/sat-math-academy/lesson/') && activeDomain === 'advanced-math'
  const isPsdaRoute     = pathname.startsWith('/sat-math-academy/lesson/') && activeDomain === 'psda'
  const isGeoRoute      = pathname.startsWith('/sat-math-academy/lesson/') && activeDomain === 'geo'

  const [algebraOpen, setAlgebraOpen]   = useState(isAlgebraRoute)
  const [advOpen, setAdvOpen]           = useState(isAdvRoute)
  const [psdaOpen, setPsdaOpen]         = useState(isPsdaRoute)
  const [geoOpen, setGeoOpen]           = useState(isGeoRoute)

  useEffect(() => {
    if (isAlgebraRoute) setAlgebraOpen(true)
    if (isAdvRoute)     setAdvOpen(true)
    if (isPsdaRoute)    setPsdaOpen(true)
    if (isGeoRoute)     setGeoOpen(true)
  }, [isAlgebraRoute, isAdvRoute, isPsdaRoute, isGeoRoute])

  function active(href: string, exact = false) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  const linkBase = cn(
    'flex items-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
  )
  const activeCls  = 'bg-indigo-50 text-indigo-700 font-semibold'
  const inactiveCls = 'text-indigo-800 hover:bg-indigo-100 hover:text-indigo-900'

  // ── Collapsed mode ──────────────────────────────────────────────────────────
  if (collapsed) {
    const items = [
      { href: '/sat-math-academy', label: 'Course Home', icon: ICONS.home, exact: true, protected: false },
      { href: '/sat-math-academy/diagnostic', label: 'Math Diagnostic', icon: ICONS.diagnostic, protected: true },
      { href: '/sat-math-academy/lesson/linear-equations', label: 'Algebra', icon: ICONS.algebra, forceActive: isAlgebraRoute, protected: true },
      { href: '/sat-math-academy/lesson/equivalent-expressions', label: 'Advanced Math', icon: ICONS.advancedMath, forceActive: isAdvRoute, protected: true },
      { href: '/sat-math-academy/lesson/ratios-rates-units', label: 'Problem-Solving & Data Analysis', icon: ICONS.psda, forceActive: isPsdaRoute, protected: true },
      { href: '/sat-math-academy/lesson/area-volume', label: 'Geometry & Trigonometry', icon: ICONS.geometry, forceActive: isGeoRoute, protected: true },
      { href: '/sat-math-academy/desmos-mastery', label: 'Desmos Mastery', icon: ICONS.desmos, protected: true },
      { href: '/sat-math-academy/desmos-sandbox', label: 'Desmos Sandbox', icon: ICONS.sandbox, protected: true },
      { href: '/sat-math-academy/review', label: 'Review Queue', icon: ICONS.review, protected: true },
      { href: '/sat-math-academy/mixed-practice', label: 'Mixed Practice', icon: ICONS.mixed, protected: true },
      { href: '/sat-math-academy/capstones', label: 'Math Capstones', icon: ICONS.capstone, protected: true },
      { href: '/sat-math-academy/mastery-check', label: 'Mastery Check', icon: ICONS.mastery, protected: true },
    ]

    return (
      <nav aria-label="SAT Math & Desmos Academy navigation" className="flex flex-col gap-0.5">
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
                className={cn(linkBase, 'h-10 w-10 justify-center relative', isActive ? activeCls : inactiveCls, locked && 'opacity-60')}
              >
                {icon}
                {locked && <span className="absolute -top-0.5 -right-0.5">{ICONS.lock}</span>}
              </Link>
            </Tooltip>
          )
        })}
      </nav>
    )
  }

  // ── Expanded mode ───────────────────────────────────────────────────────────
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
        className={cn(linkBase, 'gap-2.5 px-3 py-2 text-sm font-medium', isActive ? activeCls : inactiveCls, locked && 'opacity-60')}
        ref={href === '/sat-math-academy' ? firstFocusRef as React.RefObject<HTMLAnchorElement> : undefined}
      >
        {icon}
        <span className="flex-1 min-w-0 truncate">{label}</span>
        {locked && ICONS.lock}
      </Link>
    )
  }

  const subLink = (slug: string, label: string) => {
    const locked = !isPremium
    const href = `/sat-math-academy/lesson/${slug}`
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
          'flex items-center gap-2 rounded-lg py-1.5 pl-10 pr-3 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
          isActive ? 'text-indigo-700 font-medium bg-indigo-50/60' : 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100',
          locked && 'opacity-60',
        )}
      >
        <span className={cn('h-1 w-1 rounded-full shrink-0', isActive ? 'bg-indigo-500' : 'bg-indigo-300')} />
        <span className="flex-1 min-w-0 truncate">{label}</span>
        {locked && ICONS.lock}
      </Link>
    )
  }

  const domainSection = (
    label: string,
    icon: React.ReactNode,
    open: boolean,
    setOpen: (v: boolean) => void,
    isActiveRoute: boolean,
    lessons: { slug: MathSkillSlug; label: string }[],
  ) => (
    <div>
      {isPremium ? (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
            isActiveRoute ? activeCls : inactiveCls,
          )}
        >
          <span className="flex items-center gap-2.5">{icon}<span>{label}</span></span>
          <span className={cn('transition-transform', open && 'rotate-180')}>{ICONS.chevronDown}</span>
        </button>
      ) : (
        <Link
          href="/billing"
          aria-label={`${label} — SAT Premium required`}
          className={cn('flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors opacity-60', inactiveCls)}
        >
          <span className="flex items-center gap-2.5">{icon}<span>{label}</span></span>
          {ICONS.lock}
        </Link>
      )}
      {isPremium && open && (
        <div className="mt-0.5 flex flex-col gap-0.5">
          {lessons.map(l => subLink(l.slug, l.label))}
        </div>
      )}
    </div>
  )

  return (
    <nav aria-label="SAT Math & Desmos Academy navigation" className="flex flex-col gap-0.5">
      {expandedLink('/sat-math-academy', 'Course Home', ICONS.home, true, undefined, false)}
      {expandedLink('/sat-math-academy/diagnostic', 'Math Diagnostic', ICONS.diagnostic)}

      <div className="my-1 border-t border-indigo-200/70" />

      {domainSection('Algebra', ICONS.algebra, algebraOpen, setAlgebraOpen, isAlgebraRoute, ALGEBRA_LESSONS)}
      {domainSection('Advanced Math', ICONS.advancedMath, advOpen, setAdvOpen, isAdvRoute, ADVANCED_MATH_LESSONS)}
      {domainSection('Problem-Solving & Data Analysis', ICONS.psda, psdaOpen, setPsdaOpen, isPsdaRoute, PSDA_LESSONS)}
      {domainSection('Geometry & Trigonometry', ICONS.geometry, geoOpen, setGeoOpen, isGeoRoute, GEO_TRIG_LESSONS)}

      <div className="my-1 border-t border-indigo-200/70" />

      {expandedLink('/sat-math-academy/desmos-mastery', 'Desmos Mastery', ICONS.desmos)}
      {expandedLink('/sat-math-academy/desmos-sandbox', 'Desmos Sandbox', ICONS.sandbox)}
      {expandedLink('/sat-math-academy/review', 'Review Queue', ICONS.review)}

      <div className="my-1 border-t border-indigo-200/70" />

      {expandedLink('/sat-math-academy/mixed-practice', 'Mixed Practice', ICONS.mixed)}
      {expandedLink('/sat-math-academy/capstones', 'Math Capstones', ICONS.capstone)}
      {expandedLink('/sat-math-academy/mastery-check', 'Mastery Check', ICONS.mastery)}
    </nav>
  )
}

// ── Desktop sidebar ────────────────────────────────────────────────────────────

export function MathAcademySidebar({ isPremium = true }: { isPremium?: boolean }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('math-academy-sidebar-collapsed')
      if (saved === 'true') setCollapsed(true)
    } catch { /* ignore */ }
  }, [])

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem('math-academy-sidebar-collapsed', String(next)) } catch { /* ignore */ }
      return next
    })
  }

  return (
    <aside className={cn(
      'hidden md:flex flex-col shrink-0',
      'border-r border-indigo-200 bg-indigo-50',
      'overflow-y-auto overflow-x-visible',
      'transition-[width] duration-200 ease-in-out',
      collapsed ? 'w-[60px]' : 'w-56',
    )}>
      <div className={cn(
        'flex h-12 shrink-0 items-center border-b border-indigo-200',
        collapsed ? 'justify-center px-1' : 'justify-between px-3',
      )}>
        {!collapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 truncate">
            Math Academy
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand academy navigation' : 'Collapse academy navigation'}
          aria-expanded={!collapsed}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          {collapsed ? ICONS.chevronRight : ICONS.chevronLeft}
        </button>
      </div>
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
        aria-label="SAT Math & Desmos Academy navigation"
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-indigo-50 shadow-xl"
      >
        <div className="flex h-14 items-center justify-between border-b border-indigo-200 px-4">
          <span className="text-sm font-semibold text-indigo-800">SAT Math & Desmos Academy</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
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

// ── Mobile menu button (used in Math Academy layout) ──────────────────────────

export function MathAcademyMobileMenu({ isPremium = true }: { isPremium?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100 transition-colors"
          aria-label="Open Math Academy navigation menu"
        >
          {ICONS.menu}
          Math Academy Menu
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} isPremium={isPremium} />
    </>
  )
}
