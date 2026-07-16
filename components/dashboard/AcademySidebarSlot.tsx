'use client'

import { usePathname } from 'next/navigation'
import { AcademySidebar } from './AcademySidebar'

export function AcademySidebarSlot() {
  const pathname = usePathname()
  if (!pathname.startsWith('/sat-rw-academy')) return null
  return <AcademySidebar />
}
