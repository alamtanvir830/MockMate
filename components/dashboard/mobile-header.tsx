'use client'

import { useState } from 'react'
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

  return (
    <header className="md:hidden flex items-center justify-between h-14 border-b border-slate-200 bg-white px-4">
      <Logo />
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-14 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map(({ href, label, premium }) => {
              const isActive =
                href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    premium
                      ? isActive
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                      : isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  )}
                >
                  {premium && (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-amber-500 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  )}
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
