'use client'

import { usePathname } from 'next/navigation'
import { AcademySidebar } from './AcademySidebar'

export function AcademySidebarSlot({ isPremium = true }: { isPremium?: boolean }) {
  const pathname = usePathname()
  if (!pathname.startsWith('/sat-rw-academy')) return null
  return <AcademySidebar isPremium={isPremium} />
}
