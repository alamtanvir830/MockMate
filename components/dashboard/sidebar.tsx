'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import { cn } from '@/lib/utils'
import { logout } from '@/app/actions/auth'

interface SidebarProps {
  userEmail?: string
  userFullName?: string
  subscriptionTier?: string
}

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  premium?: boolean
  exact?: boolean
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    exact: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    href: '/premade',
    label: 'Exam Forms (SAT)',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: '/sat-rw-academy',
    label: 'SAT R&W Academy',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    href: '/sat-math-academy',
    label: 'SAT Math Academy',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
      </svg>
    ),
  },
  {
    href: '/question-bank',
    label: 'Question Bank',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    href: '/exams',
    label: 'Exam History',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/notes',
    label: 'Personal Notes',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    href: '/groups',
    label: 'My Groups',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    href: '/performance',
    label: 'Performance',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    href: '/exams/create',
    label: 'Create My Own Exam',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/billing',
    label: 'Get SAT Premium',
    premium: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const SIGN_OUT_ICON = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
)

const CHEVRON_LEFT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const CHEVRON_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

// CSS-only tooltip — appears to the right, z-50, no JS needed.
// Works because the aside has no overflow:hidden or overflow:auto — tooltips escape freely.
function NavTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip w-full flex justify-center">
      {children}
      <span
        role="tooltip"
        className="
          pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50
          rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-white whitespace-nowrap
          opacity-0 group-hover/tip:opacity-100 focus-within:opacity-100
          transition-opacity duration-100
        "
      >
        {label}
      </span>
    </div>
  )
}

export function Sidebar({ userEmail, userFullName, subscriptionTier = 'free' }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const displayName = userFullName ?? userEmail?.split('@')[0] ?? 'Account'
  const initials = displayName.charAt(0).toUpperCase()

  // Read saved preference — guard for SSR
  useEffect(() => {
    try {
      if (localStorage.getItem('mockmate-main-sidebar-collapsed') === 'true') {
        setCollapsed(true)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem('mockmate-main-sidebar-collapsed', String(next)) } catch { /* ignore */ }
      return next
    })
  }

  return (
    <aside
      className={cn(
        // Base — no overflow set so tooltips escape freely
        'hidden md:flex flex-col shrink-0 border-r border-slate-200 bg-white',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-60',
      )}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className={cn(
        'flex h-16 shrink-0 items-center border-b border-slate-100',
        collapsed ? 'justify-between px-3' : 'justify-between pl-5 pr-3',
      )}>
        <Logo iconOnly={collapsed} />
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand main navigation' : 'Collapse main navigation'}
          aria-expanded={!collapsed}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          {collapsed ? CHEVRON_RIGHT : CHEVRON_LEFT}
        </button>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={cn(
          'flex-1 py-4',
          collapsed ? 'flex flex-col items-center gap-0.5 px-2' : 'px-3 space-y-0.5',
        )}
      >
        {navItems.map(({ href, label, icon, premium, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(href + '/')
          // Academy routes: active on any nested path
          const effectiveActive =
            href === '/sat-rw-academy' ? pathname.startsWith('/sat-rw-academy') :
            href === '/sat-math-academy' ? pathname.startsWith('/sat-math-academy') :
            isActive

          if (collapsed) {
            return (
              <NavTooltip key={href} label={label}>
                <Link
                  href={href}
                  aria-label={label}
                  aria-current={effectiveActive ? 'page' : undefined}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2',
                    premium
                      ? effectiveActive
                        ? 'bg-amber-50 text-amber-600 focus-visible:ring-amber-400'
                        : 'text-amber-500 hover:bg-amber-50 hover:text-amber-700 focus-visible:ring-amber-400'
                      : effectiveActive
                        ? 'bg-indigo-50 text-indigo-600 focus-visible:ring-indigo-400'
                        : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-indigo-400',
                  )}
                >
                  {icon}
                </Link>
              </NavTooltip>
            )
          }

          // Expanded — premium item
          if (premium) {
            return (
              <Link
                key={href}
                href={href}
                aria-current={effectiveActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  effectiveActive
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700',
                )}
              >
                <span className="text-amber-500">{icon}</span>
                {label}
              </Link>
            )
          }

          // Expanded — normal item
          return (
            <Link
              key={href}
              href={href}
              aria-current={effectiveActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                effectiveActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              <span className={cn('shrink-0', effectiveActive ? 'text-indigo-600' : 'text-slate-400')}>
                {icon}
              </span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* ── Admin link (admin email only) ─────────────────────────────────── */}
      {userEmail === 'ranvi.contact@gmail.com' && (
        <div className={cn('pb-1', collapsed ? 'flex flex-col items-center px-2' : 'px-3')}>
          {collapsed ? (
            <NavTooltip label="Content Reports">
              <Link
                href="/admin/sat-rw-academy/content-reports"
                aria-label="Content Reports"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </Link>
            </NavTooltip>
          ) : (
            <Link
              href="/admin/sat-rw-academy/content-reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0 text-rose-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Content Reports
            </Link>
          )}
        </div>
      )}

      {/* ── Legal links (expanded only) ────────────────────────────────────── */}
      {!collapsed && (
        <div className="px-4 pb-2 flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/terms" className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">Terms</Link>
          <Link href="/privacy" className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">Privacy</Link>
          <Link href="/ai-disclosure" className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">AI Disclosure</Link>
          <Link href="/sat-disclaimer" className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">SAT Disclaimer</Link>
        </div>
      )}

      {/* ── Footer / user area ────────────────────────────────────────────── */}
      <div className={cn(
        'border-t border-slate-100',
        collapsed ? 'py-2 flex flex-col items-center gap-1 px-2' : 'p-3 space-y-0.5',
      )}>
        {collapsed ? (
          <>
            {/* Avatar tooltip — shows name but not plan (avoid exposing private detail) */}
            <NavTooltip label={displayName}>
              <div
                aria-label={`Signed in as ${displayName}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-50 transition-colors cursor-default"
              >
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-xs shrink-0">
                  {initials}
                </div>
              </div>
            </NavTooltip>

            {/* Sign out — icon only with tooltip */}
            <NavTooltip label="Sign out">
              <form action={logout}>
                <button
                  type="submit"
                  aria-label="Sign out"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {SIGN_OUT_ICON}
                </button>
              </form>
            </NavTooltip>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-xs shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{displayName}</p>
                <p className="text-xs text-slate-400 truncate capitalize">{subscriptionTier} plan</p>
              </div>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Sign out
              </button>
            </form>
          </>
        )}
      </div>
    </aside>
  )
}
