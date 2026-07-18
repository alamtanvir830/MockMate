'use client'

import { usePathname } from 'next/navigation'
import { MathAcademySidebar } from './MathAcademySidebar'

export function MathAcademySidebarSlot({ isPremium }: { isPremium: boolean }) {
  const pathname = usePathname()
  if (!pathname.startsWith('/sat-math-academy')) return null
  return <MathAcademySidebar isPremium={isPremium} />
}
