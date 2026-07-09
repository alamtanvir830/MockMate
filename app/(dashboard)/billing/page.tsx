import type { Metadata } from 'next'
import Link from 'next/link'
import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'

export const metadata: Metadata = { title: 'Billing' }

export default async function BillingPage() {
  const { satUpgradeUnlocked, satUpgradeUnlockedAt, stripeCustomerId } = await getEntitlements()

  if (satUpgradeUnlocked) {
    const unlockedDate = satUpgradeUnlockedAt
      ? new Date(satUpgradeUnlockedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : null

    return (
      <div className="max-w-xl mx-auto mt-12 space-y-5">
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-emerald-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Lifetime SAT Access — Active</h1>
          {unlockedDate && (
            <p className="text-[12px] text-slate-400 mt-1">Unlocked on {unlockedDate}</p>
          )}
          <p className="mt-3 text-[13px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            You have unlimited lifetime access to SAT Forms 1, 2, 3, 4, and 5 plus the SAT Question Bank.
          </p>
          <div className="mt-6 space-y-2.5">
            <Link
              href="/premade/sat"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
            >
              View SAT Practice Forms
            </Link>
            <Link
              href="/question-bank/sat"
              className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
            >
              SAT Question Bank
            </Link>
          </div>
          {stripeCustomerId && (
            <p className="mt-6 text-[11px] text-slate-400">
              Questions?{' '}
              <Link href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">
                ranvi.contact@gmail.com
              </Link>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-12">
      <UpgradeGate />
    </div>
  )
}
