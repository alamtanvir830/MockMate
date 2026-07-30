import type { ReactNode } from 'react'
import { SeoNav } from './SeoNav'
import { SeoFooter } from './SeoFooter'

export function SeoPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-800">
      <SeoNav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">{children}</main>
      <SeoFooter />
    </div>
  )
}

export default SeoPageLayout
