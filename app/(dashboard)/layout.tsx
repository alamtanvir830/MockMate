import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
import { Sidebar } from '@/components/dashboard/sidebar'
import { MobileHeader } from '@/components/dashboard/mobile-header'
import { SyncSatAttempts } from '@/components/premade/SyncSatAttempts'
import { SyncQBHistory } from '@/components/question-bank/SyncQBHistory'
import { AcademySidebarSlot } from '@/components/dashboard/AcademySidebarSlot'
import { MathAcademySidebarSlot } from '@/components/dashboard/MathAcademySidebarSlot'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = user.user_metadata?.full_name as string | undefined
  const isPremium = hasSatPremium(user)

  return (
    <div className="flex h-dvh bg-slate-50 overflow-hidden">
      <Sidebar userEmail={user.email} userFullName={fullName} />
      <AcademySidebarSlot isPremium={isPremium} />
      <MathAcademySidebarSlot isPremium={isPremium} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          {/*
            All gradients live directly on the wrapper's CSS `background`.
            A CSS background is always as tall as its element, so the pearl-silver
            wave treatment covers the full scroll height with no cutoff.
            Percentage-based radial-gradient positions distribute the wave bands
            proportionally regardless of how much content is on the page.
          */}
          <div
            className="relative min-h-full"
            style={{
              background: [
                /* Depth bloom — upper left corner */
                'radial-gradient(ellipse 52% 28% at 0% 0%, rgba(220,228,240,0.38) 0%, transparent 100%)',
                /* White highlight glow — upper left */
                'radial-gradient(ellipse 46% 16% at 8% 5%, rgba(255,255,255,0.26) 0%, transparent 100%)',
                /* Wave band 1 — broad upper sweep */
                'radial-gradient(ellipse 90% 22% at 38% 12%, rgba(196,210,230,0.34) 0%, transparent 100%)',
                /* Wave band 2 — mid sweep, offset right */
                'radial-gradient(ellipse 86% 18% at 64% 36%, rgba(180,198,222,0.24) 0%, transparent 100%)',
                /* Wave band 3 — lower-mid sweep, offset left */
                'radial-gradient(ellipse 92% 20% at 30% 60%, rgba(190,206,228,0.22) 0%, transparent 100%)',
                /* Wave band 4 — near-bottom sweep, offset right */
                'radial-gradient(ellipse 80% 18% at 70% 82%, rgba(176,194,218,0.18) 0%, transparent 100%)',
                /* Depth bloom — lower right corner */
                'radial-gradient(ellipse 44% 22% at 100% 100%, rgba(200,214,230,0.24) 0%, transparent 100%)',
                /* Base gradient */
                'linear-gradient(150deg, #f4f7fa 0%, #eef1f6 50%, #e9edf4 100%)',
              ].join(', '),
            }}
          >
            <SyncSatAttempts />
            <SyncQBHistory />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
