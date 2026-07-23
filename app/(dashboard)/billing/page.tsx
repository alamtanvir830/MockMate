import type { Metadata } from 'next'
import Link from 'next/link'
import { getEntitlements } from '@/lib/entitlements'
import { PremiumPlans } from '@/components/shared/premium-plans'
import { isLifetimePurchaseActive, isThreeMonthPurchaseActive } from '@/lib/pricing'

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
  const entitlements = await getEntitlements()
  const {
    satUpgradeUnlocked,
    isLegacyLifetime,
    satUpgradeUnlockedAt,
    satSubscriptionStatus,
    satSubscriptionPeriodEnd,
    satCancelAtPeriodEnd,
    satPurchaseExpiresAt,
  } = entitlements

  const isLifetimePurchase = isLifetimePurchaseActive(entitlements)
  const isThreeMonthActive = isThreeMonthPurchaseActive(entitlements)

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

  // ── Lifetime purchase (new one-time) ─────────────────────────────────────────
  if (isLifetimePurchase) {
    return (
      <div className="max-w-xl mx-auto mt-12 space-y-5">
        <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center">
          <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 mb-3">
            SAT Premium — Lifetime Access
          </span>
          <h1 className="text-xl font-bold text-slate-900">Lifetime SAT Premium — Active</h1>
          <p className="mt-3 text-[13px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            One-time payment. No expiration. You have permanent access to all SAT Practice Forms, the SAT Question Bank, and both SAT Academies.
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

  // ── 3-Month Access (new one-time) ────────────────────────────────────────────
  if (isThreeMonthActive) {
    const expiresDate = fmt(satPurchaseExpiresAt)
    return (
      <div className="max-w-xl mx-auto mt-12 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">SAT Premium</h1>
              <p className="text-[13px] text-slate-500 mt-1">3-Month Access</p>
            </div>
            <span className="shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
              Active
            </span>
          </div>

          {expiresDate && (
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 mb-5">
              <p className="text-[12px] text-slate-500">
                Access expires on <span className="font-semibold text-slate-700">{expiresDate}</span>
              </p>
              <p className="text-[12px] text-slate-500 mt-0.5">One-time payment. Does not renew.</p>
            </div>
          )}

          <div className="space-y-2.5">
            <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              View SAT Practice Forms
            </Link>
            <Link href="/question-bank/sat" className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
              SAT Question Bank
            </Link>
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

  // ── Monthly subscriber and free users — show three-plan pricing page ─────────
  const isMonthlySubscriber = !!(satUpgradeUnlocked && satSubscriptionStatus)
  const periodEndDate = isMonthlySubscriber ? fmt(satSubscriptionPeriodEnd) : null
  const isPastDue = satSubscriptionStatus === 'past_due'
  const isCanceling = satCancelAtPeriodEnd === true

  return (
    <div className="mt-12 pb-12">
      <PremiumPlans
        isMonthlySubscriber={isMonthlySubscriber}
        cancelAtPeriodEnd={isCanceling}
        isPastDue={isPastDue}
        periodEndDate={periodEndDate}
      />
    </div>
  )
}
