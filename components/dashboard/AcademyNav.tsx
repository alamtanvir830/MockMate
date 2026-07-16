'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navTabs = [
  { label: 'Overview', href: '/sat-rw-academy' },
  { label: 'Reading Skills', href: '/sat-rw-academy/reading' },
  { label: 'Writing Skills', href: '/sat-rw-academy/writing' },
  { label: 'Vocabulary', href: '/sat-rw-academy/vocabulary' },
  { label: 'Transitions', href: '/sat-rw-academy/transitions' },
  { label: 'Reading Speed', href: '/sat-rw-academy/reading-speed' },
  { label: 'Review Queue', href: '/sat-rw-academy/review' },
  { label: 'Study Plan', href: '/sat-rw-academy/study-plan' },
]

export function AcademyNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/sat-rw-academy') {
      return pathname === '/sat-rw-academy'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="flex gap-1.5 min-w-max pb-1">
        {navTabs.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
              isActive(href)
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100',
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
