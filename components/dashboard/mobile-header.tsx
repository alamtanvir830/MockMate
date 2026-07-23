'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/premade', label: 'Exam Forms (SAT)' },
  { href: '/sat-rw-academy', label: 'SAT R&W Academy' },
  { href: '/sat-math-academy', label: 'SAT Math Academy' },
  { href: '/question-bank', label: 'Question Bank' },
  { href: '/exams', label: 'Exam History' },
  { href: '/notes', label: 'Personal Notes' },
  { href: '/groups', label: 'My Groups' },
  { href: '/performance', label: 'Performance' },
  { href: '/exams/create', label: 'Create My Own Exam' },
  { href: '/billing', label: 'Get SAT Premium', premium: true },
  { href: '/settings', label: 'Settings' },
]

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

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
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Main navigation">
          {navItems.map(({ href, label, premium }) => {
            const isActive =
              href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
                  premium
                    ? isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                    : isActive
                    ? 'bg-indigo-50 text-indigo-700'
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
