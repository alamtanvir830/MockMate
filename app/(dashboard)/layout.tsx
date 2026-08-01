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
          {/* Wrapper provides the background and ensures it spans the full scroll height */}
          <div
            className="relative min-h-full"
            style={{
              background: 'linear-gradient(150deg, #f4f7fa 0%, #eef1f6 50%, #e9edf4 100%)',
            }}
          >
            {/* ── Pearl-silver wave layer — z-index 0, pointer-events none ── */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <svg
                className="absolute w-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMin slice"
                viewBox="0 0 1200 600"
                style={{ top: 0, left: 0, height: '600px' }}
              >
                <defs>
                  <linearGradient id="dwg1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#c4d2e6" stopOpacity="0.36" />
                    <stop offset="50%"  stopColor="#ccd8ea" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#bccce0" stopOpacity="0.16" />
                  </linearGradient>
                  <linearGradient id="dwg2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#b4c4d8" stopOpacity="0.24" />
                    <stop offset="60%"  stopColor="#beccde" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#aebece" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                {/* Wave 1 — broad upper sweep */}
                <path
                  d="M0,140 C200,50 460,210 720,130 C920,68 1060,175 1200,110 L1200,600 L0,600 Z"
                  fill="url(#dwg1)"
                />
                {/* Wave 2 — mid flow */}
                <path
                  d="M0,270 C240,185 530,320 800,250 C980,202 1100,295 1200,235 L1200,600 L0,600 Z"
                  fill="url(#dwg2)"
                />
                {/* Wave 3 — lower subtle band */}
                <path
                  d="M0,400 C220,345 500,420 780,365 C970,326 1100,388 1200,355 L1200,600 L0,600 Z"
                  fill="#b0bece"
                  fillOpacity="0.13"
                />
                {/* White highlight glow — upper left */}
                <ellipse cx="150" cy="110" rx="440" ry="210" fill="#ffffff" fillOpacity="0.24" />
                {/* Tonal accent — lower right */}
                <ellipse cx="1100" cy="480" rx="290" ry="220" fill="#ccd8e8" fillOpacity="0.14" />
              </svg>

              {/* Blurred radial depth — upper left */}
              <div
                style={{
                  position: 'absolute',
                  top: '-60px',
                  left: '-60px',
                  width: '500px',
                  height: '400px',
                  background:
                    'radial-gradient(ellipse at 40% 40%, rgba(220,228,240,0.38) 0%, transparent 70%)',
                  filter: 'blur(28px)',
                  borderRadius: '50%',
                }}
              />
              {/* Blurred radial depth — lower right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  right: '-40px',
                  width: '400px',
                  height: '320px',
                  background:
                    'radial-gradient(ellipse at 60% 60%, rgba(200,214,230,0.26) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  borderRadius: '50%',
                }}
              />
            </div>

            {/* Content — z-index 1, above the wave layer */}
            <div className="relative" style={{ zIndex: 1 }}>
              <SyncSatAttempts />
              <SyncQBHistory />
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
