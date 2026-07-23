import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdminUser, hasSatPremium } from '@/lib/auth/server'
import { getEntitlements } from '@/lib/entitlements'
import { Sidebar } from '@/components/dashboard/sidebar'
import { MobileHeader } from '@/components/dashboard/mobile-header'
import { AcademySidebarSlot } from '@/components/dashboard/AcademySidebarSlot'
import { MathAcademySidebarSlot } from '@/components/dashboard/MathAcademySidebarSlot'
import SettingsClient, { ResendVerificationButton, SignOutButton } from './SettingsClient'

export const metadata: Metadata = { title: 'Settings — MockMate' }

function fmt(iso: string | null | undefined): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── Unauthenticated state ────────────────────────────────────────────────────

function UnauthenticatedState() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-7 w-7 text-slate-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Account Not Authenticated</h1>
        <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
          Your email has not been authenticated. Please sign in and verify your email before accessing your MockMate settings.
        </p>
        <div className="space-y-2.5">
          <Link
            href="/login"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Unverified email state ───────────────────────────────────────────────────

function UnverifiedEmailState({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-7 w-7 text-amber-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Email Not Verified</h1>
        <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
          Your email has not been authenticated. Please verify your email address before accessing your MockMate settings.
        </p>
        <div className="space-y-3 text-left">
          <ResendVerificationButton email={email} />
        </div>
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Return to Dashboard
          </Link>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}

// ─── Main settings page ───────────────────────────────────────────────────────

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Unauthenticated — no redirect; show auth-status screen
  if (!user) return <UnauthenticatedState />

  // Signed in but email not verified
  const isEmailVerified = !!user.email_confirmed_at
  if (!isEmailVerified) return <UnverifiedEmailState email={user.email ?? ''} />

  // Authenticated & verified — load trusted data via admin API
  const admin = createAdminClient()
  const { data: freshData } = await admin.auth.admin.getUserById(user.id)
  const meta = (freshData?.user?.user_metadata ?? user.user_metadata ?? {}) as Record<string, unknown>
  const freshUser = { email: user.email, user_metadata: meta }

  const isPremium = hasSatPremium(freshUser)
  const isAdmin = isAdminUser(freshUser)
  const fullName = (meta.full_name as string | undefined) ?? ''
  const memberSince = fmt(user.created_at)
  const entitlements = await getEntitlements()

  const cancelDate = fmt(entitlements.satSubscriptionPeriodEnd ?? undefined)
  const periodEndDate = fmt(entitlements.satSubscriptionPeriodEnd ?? undefined)
  const purchaseExpiryDate = fmt(entitlements.satPurchaseExpiresAt ?? undefined)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar userEmail={user.email} userFullName={fullName || undefined} />
      {/* These slots render nothing on /settings since the path doesn't match their prefixes */}
      <AcademySidebarSlot isPremium={isPremium} />
      <MathAcademySidebarSlot isPremium={isPremium} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
            <SettingsClient
              email={user.email ?? ''}
              isEmailVerified={isEmailVerified}
              fullName={fullName}
              memberSince={memberSince}
              isAdmin={isAdmin}
              entitlements={entitlements}
              cancelDate={cancelDate}
              periodEndDate={periodEndDate}
              purchaseExpiryDate={purchaseExpiryDate}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
