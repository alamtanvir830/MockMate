'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import { cn } from '@/lib/utils'
import {
  type Workspace,
  WORKSPACE_STORAGE_KEY,
  getDefinitiveWorkspace,
} from '@/lib/workspace/workspace'

interface MobileNavItem {
  href: string
  label: string
  premium?: boolean
  exact?: boolean
}

function useWorkspace(pathname: string): Workspace {
  const [workspace, setWorkspace] = useState<Workspace>(
    () => getDefinitiveWorkspace(pathname) ?? 'sat',
  )

  useEffect(() => {
    const definitive = getDefinitiveWorkspace(pathname)
    if (definitive !== null) {
      setWorkspace(definitive) // eslint-disable-line react-hooks/set-state-in-effect
      try { localStorage.setItem(WORKSPACE_STORAGE_KEY, definitive) } catch { /* ignore */ }
    } else {
      try {
        const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY)
        setWorkspace(stored === 'classroom' ? 'classroom' : 'sat')
      } catch {
        setWorkspace('sat')
      }
    }
  }, [pathname])

  return workspace
}

const SAT_NAV_ITEMS: MobileNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', exact: true },
  { href: '/premade/sat', label: 'SAT Exam Forms' },
  { href: '/sat-rw-academy', label: 'SAT R&W Academy' },
  { href: '/sat-math-academy', label: 'SAT Math Academy' },
  { href: '/question-bank', label: 'Question Bank' },
  { href: '/exams', label: 'Exam History' },
  { href: '/performance', label: 'Performance' },
  { href: '/notes', label: 'Personal Notes' },
  { href: '/billing', label: 'Get SAT Premium', premium: true },
  { href: '/settings', label: 'Settings' },
]

const CLASSROOM_NAV_ITEMS: MobileNavItem[] = [
  { href: '/classroom/dashboard', label: 'Classroom Dashboard', exact: true },
  { href: '/exams/create', label: 'Create Practice Exam' },
  { href: '/exams', label: 'My Practice Exams' },
  { href: '/groups', label: 'My Groups' },
  { href: '/notes', label: 'Personal Notes' },
  { href: '/settings', label: 'Settings' },
]

function getWorkspaceNavItems(workspace: Workspace): MobileNavItem[] {
  return workspace === 'classroom' ? CLASSROOM_NAV_ITEMS : SAT_NAV_ITEMS
}

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const workspace = useWorkspace(pathname)
  const navItems = getWorkspaceNavItems(workspace)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Scroll lock + focus management
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      openBtnRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  function close() {
    setOpen(false)
    openBtnRef.current?.focus()
  }

  return (
    <>
      <header className="md:hidden flex items-center justify-between h-14 shrink-0 border-b border-slate-200 bg-white px-4">
        <Logo />
        <button
          ref={openBtnRef}
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Slide-over drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl',
          'transition-transform duration-200 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Drawer header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <Logo />
          <button
            ref={closeBtnRef}
            onClick={close}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Main navigation">
          {/* Switch product */}
          <Link
            href="/choose-study-path"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Switch product
          </Link>
          <div className="my-1 border-t border-slate-100" />
          {navItems.map(({ href, label, premium, exact }) => {
            const isActive = exact
              ? pathname === href
              : href === '/premade/sat'
                ? pathname.startsWith('/premade/sat')
                : href === '/classroom/dashboard'
                  ? pathname.startsWith('/classroom')
                  : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                  premium
                    ? isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                    : isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                {premium && (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )}
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer links */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/terms" onClick={close} className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">Terms</Link>
            <Link href="/privacy" onClick={close} className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="/ai-disclosure" onClick={close} className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">AI Disclosure</Link>
            <Link href="/sat-disclaimer" onClick={close} className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors">SAT Disclaimer</Link>
          </div>
        </div>
      </div>
    </>
  )
}
