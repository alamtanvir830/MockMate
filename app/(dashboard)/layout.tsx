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
              {/*
                Single SVG spanning 2400px height (4 × 600px sections).
                Section 1 (y 0–600): exact original approved artwork.
                Sections 2–4 (y 600–2400): same gradient IDs, color palette, and
                curve language; each section begins filling immediately at its
                top boundary so there is no uncovered gap or seam.
                preserveAspectRatio="none" keeps all vertical positions exact;
                only the horizontal scale changes with viewport width.
              */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 2400"
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2400px' }}
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

                {/* ── Section 1: y 0–600 — EXACT ORIGINAL ARTWORK ─────────── */}
                <path
                  d="M0,140 C200,50 460,210 720,130 C920,68 1060,175 1200,110 L1200,600 L0,600 Z"
                  fill="url(#dwg1)"
                />
                <path
                  d="M0,270 C240,185 530,320 800,250 C980,202 1100,295 1200,235 L1200,600 L0,600 Z"
                  fill="url(#dwg2)"
                />
                <path
                  d="M0,400 C220,345 500,420 780,365 C970,326 1100,388 1200,355 L1200,600 L0,600 Z"
                  fill="#b0bece"
                  fillOpacity="0.13"
                />
                <ellipse cx="150"  cy="110" rx="440" ry="210" fill="#ffffff" fillOpacity="0.24" />
                <ellipse cx="1100" cy="480" rx="290" ry="220" fill="#ccd8e8" fillOpacity="0.14" />

                {/* ── Section 2: y 600–1200 ────────────────────────────────── */}
                {/* Paths begin at the section boundary and arc upward so coverage
                    is continuous from y=600 with no uncovered gap. */}
                <path
                  d="M0,600 C200,510 460,560 720,525 C920,500 1060,555 1200,535 L1200,1200 L0,1200 Z"
                  fill="url(#dwg1)"
                />
                <path
                  d="M0,600 C240,530 530,575 800,548 C980,530 1100,568 1200,555 L1200,1200 L0,1200 Z"
                  fill="url(#dwg2)"
                />
                <path
                  d="M0,600 C220,568 500,590 780,572 C970,562 1100,582 1200,575 L1200,1200 L0,1200 Z"
                  fill="#b0bece"
                  fillOpacity="0.11"
                />
                <ellipse cx="150"  cy="710"  rx="440" ry="210" fill="#ffffff" fillOpacity="0.20" />
                <ellipse cx="1100" cy="1080" rx="290" ry="220" fill="#ccd8e8" fillOpacity="0.12" />

                {/* ── Section 3: y 1200–1800 ───────────────────────────────── */}
                <path
                  d="M0,1200 C200,1110 460,1160 720,1125 C920,1100 1060,1155 1200,1135 L1200,1800 L0,1800 Z"
                  fill="url(#dwg1)"
                />
                <path
                  d="M0,1200 C240,1130 530,1175 800,1148 C980,1130 1100,1168 1200,1155 L1200,1800 L0,1800 Z"
                  fill="url(#dwg2)"
                />
                <path
                  d="M0,1200 C220,1168 500,1190 780,1172 C970,1162 1100,1182 1200,1175 L1200,1800 L0,1800 Z"
                  fill="#b0bece"
                  fillOpacity="0.09"
                />
                <ellipse cx="150"  cy="1310" rx="440" ry="210" fill="#ffffff" fillOpacity="0.16" />
                <ellipse cx="1100" cy="1680" rx="290" ry="220" fill="#ccd8e8" fillOpacity="0.10" />

                {/* ── Section 4: y 1800–2400 ───────────────────────────────── */}
                <path
                  d="M0,1800 C200,1710 460,1760 720,1725 C920,1700 1060,1755 1200,1735 L1200,2400 L0,2400 Z"
                  fill="url(#dwg1)"
                />
                <path
                  d="M0,1800 C240,1730 530,1775 800,1748 C980,1730 1100,1768 1200,1755 L1200,2400 L0,2400 Z"
                  fill="url(#dwg2)"
                />
                <path
                  d="M0,1800 C220,1768 500,1790 780,1772 C970,1762 1100,1782 1200,1775 L1200,2400 L0,2400 Z"
                  fill="#b0bece"
                  fillOpacity="0.07"
                />
                <ellipse cx="150"  cy="1910" rx="440" ry="210" fill="#ffffff" fillOpacity="0.12" />
                <ellipse cx="1100" cy="2280" rx="290" ry="220" fill="#ccd8e8" fillOpacity="0.08" />
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
