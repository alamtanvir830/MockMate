import type { Metadata } from 'next'
import Link from 'next/link'
import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import { ManageSubscriptionButton } from '@/components/billing/ManageSubscriptionButton'

export const metadata: Metadata = { title: 'Billing' }

function fmt(iso: string | undefined) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BillingPage() {
  const {
    satUpgradeUnlocked,
    isLegacyLifetime,
    satUpgradeUnlockedAt,
    satSubscriptionStatus,
    satSubscriptionPeriodEnd,
    satCancelAtPeriodEnd,
    stripeCustomerId,
  } = await getEntitlements()

  // ── Legacy lifetime ──────────────────────────────────────────────────────────
  if (isLegacyLifetime) {
    const unlockedDate = fmt(satUpgradeUnlockedAt)
    return (
      <div className="max-w-xl mx-auto mt-12 space-y-5">
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-emerald-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 mb-3">
            Legacy Lifetime Access
          </span>
          <h1 className="text-xl font-bold text-slate-900">Lifetime SAT Access — Active</h1>
          {unlockedDate && (
            <p className="text-[12px] text-slate-400 mt-1">Unlocked on {unlockedDate}</p>
          )}
          <p className="mt-3 text-[13px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            You have permanent access to all SAT Practice Forms, the SAT Question Bank, and both SAT Academies. No monthly charge applies to your account.
          </p>
          <div className="mt-6 space-y-2.5">
            <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              View SAT Practice Forms
            </Link>
            <Link href="/question-bank/sat" className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              SAT Question Bank
            </Link>
          </div>
          <p className="mt-6 text-[11px] text-slate-400">
            Questions?{' '}
            <Link href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">
              ranvi.contact@gmail.com
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // ── Active subscription ──────────────────────────────────────────────────────
  if (satUpgradeUnlocked && satSubscriptionStatus) {
    const periodEndDate = fmt(satSubscriptionPeriodEnd)
    const isPastDue = satSubscriptionStatus === 'past_due'
    const isCanceling = satCancelAtPeriodEnd === true

    return (
      <div className="max-w-xl mx-auto mt-12 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">SAT Premium</h1>
              <p className="text-[13px] text-slate-500 mt-1">Monthly Subscription</p>
            </div>
            <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border ${
              isPastDue
                ? 'bg-red-50 text-red-700 border-red-200'
                : isCanceling
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {isPastDue ? 'Payment Past Due' : isCanceling ? 'Cancels at period end' : 'Active'}
            </span>
          </div>

          {isPastDue && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-5">
              <p className="text-[13px] font-semibold text-red-800">Payment failed</p>
              <p className="text-[12px] text-red-700 mt-0.5">
                We were unable to process your most recent payment. Please update your payment method to keep access.
              </p>
            </div>
          )}

          {isCanceling && periodEndDate && !isPastDue && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-5">
              <p className="text-[13px] font-semibold text-amber-800">Subscription scheduled to cancel</p>
              <p className="text-[12px] text-amber-700 mt-0.5">
                Your SAT Premium access will end on {periodEndDate}. You can reactivate anytime before then.
              </p>
            </div>
          )}

          {!isPastDue && !isCanceling && periodEndDate && (
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 mb-5">
              <p className="text-[12px] text-slate-500">
                Next billing date: <span className="font-semibold text-slate-700">{periodEndDate}</span>
              </p>
            </div>
          )}

          <div className="space-y-2.5">
            <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              View SAT Practice Forms
            </Link>
            <Link href="/question-bank/sat" className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              SAT Question Bank
            </Link>
            {stripeCustomerId && <ManageSubscriptionButton />}
          </div>

          <p className="mt-6 text-[11px] text-slate-400 text-center">
            Questions?{' '}
            <Link href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">
              ranvi.contact@gmail.com
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // ── No access — show upgrade gate ────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto mt-12">
      <UpgradeGate />
    </div>
  )
}

