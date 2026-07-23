'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SAT_PREMIUM_PLAN_CARDS, SAT_PREMIUM_CARD_FEATURES } from '@/lib/pricing'
import type { SatPremiumPlanKey } from '@/lib/stripe/sat-premium-plans'

export interface PremiumPlansProps {
  isMonthlySubscriber?: boolean
  cancelAtPeriodEnd?: boolean
  isPastDue?: boolean
  periodEndDate?: string | null
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('h-4 w-4 shrink-0', className)} fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5l4 4 7.5-8" />
    </svg>
  )
}

export function PremiumPlans({
  isMonthlySubscriber = false,
  cancelAtPeriodEnd = false,
  isPastDue = false,
  periodEndDate,
}: PremiumPlansProps = {}) {
  const [loadingKey, setLoadingKey] = useState<SatPremiumPlanKey | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout(planKey: SatPremiumPlanKey) {
    setLoadingKey(planKey)
    setError(null)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error ?? 'Failed to start checkout')
      }
      const { url } = (await res.json()) as { url?: string }
      if (url) {
        window.location.href = url
      } else {
        throw new Error('Could not start checkout. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoadingKey(null)
    }
  }

  async function handlePortal() {
    setPortalLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/create-portal-session', { method: 'POST' })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error ?? 'Failed to open billing portal')
      }
      const { url } = (await res.json()) as { url?: string }
      if (url) {
        window.location.href = url
      } else {
        throw new Error('Could not open billing portal. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setPortalLoading(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <p className="text-[11px] font-semibold text-amber-600 tracking-widest uppercase mb-2">SAT Premium</p>
        <h2 className="text-2xl font-bold text-slate-900">
          {isMonthlySubscriber ? 'Your plan' : 'Choose your plan'}
        </h2>
        <p className="text-[14px] text-slate-500 mt-2 max-w-xl mx-auto">
          Unlock SAT Forms 1–5, the 700+ question bank, both SAT Academies, and personalized score reports.
        </p>
      </div>

      {error && (
        <p role="alert" className="mx-auto max-w-md text-center text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-5">
          {error}
        </p>
      )}

      {isPastDue && (
        <div className="mx-auto max-w-md rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-6">
          <p className="text-[13px] font-semibold text-red-800">Payment past due</p>
          <p className="text-[12px] text-red-700 mt-0.5">
            We were unable to process your most recent payment. Click <strong>Current Plan</strong> below to update your payment method.
          </p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3 items-stretch">
        {SAT_PREMIUM_PLAN_CARDS.map(plan => {
          const isMonthly = plan.key === 'monthly'
          const isCurrentPlan = isMonthly && isMonthlySubscriber
          const isLoading = loadingKey === plan.key

          return (
            <div
              key={plan.key}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-shadow',
                isCurrentPlan
                  ? 'border-emerald-300 ring-2 ring-emerald-100'
                  : plan.featured
                  ? 'border-amber-300 ring-2 ring-amber-200'
                  : 'border-slate-200'
              )}
            >
              {isCurrentPlan ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow">
                  Current Plan
                </span>
              ) : plan.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1 text-[11px] font-bold text-white shadow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  {plan.badge}
                </span>
              ) : null}

              <h3 className="text-[16px] font-bold text-slate-900">{plan.title}</h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-[13px] font-medium text-slate-500">{plan.cadence}</span>
              </div>

              {isMonthly ? (
                <p className="mt-2 text-[12px] text-slate-500 leading-relaxed min-h-[2.5rem]">
                  Billed monthly and automatically renews. Cancel{' '}
                  <span className="underline underline-offset-2">any time</span>.
                </p>
              ) : (
                <p className="mt-2 text-[12px] text-slate-500 leading-relaxed min-h-[2.5rem]">{plan.supporting}</p>
              )}

              {isCurrentPlan ? (
                cancelAtPeriodEnd && periodEndDate ? (
                  <span className="mt-3 inline-flex self-start items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border bg-amber-50 text-amber-700 border-amber-200">
                    Access ends {periodEndDate}
                  </span>
                ) : (
                  <span className="mt-3 inline-flex self-start items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                    Active
                  </span>
                )
              ) : (
                <span
                  className={cn(
                    'mt-3 inline-flex self-start items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border',
                    plan.featured
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  )}
                >
                  {plan.savingsLabel}
                </span>
              )}

              <ul className="mt-5 space-y-2.5 flex-1">
                {SAT_PREMIUM_CARD_FEATURES.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckIcon className="text-emerald-500 mt-0.5" />
                    <span className="text-[12.5px] text-slate-700 leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

              {isCurrentPlan ? (
                <button
                  onClick={handlePortal}
                  disabled={portalLoading}
                  aria-busy={portalLoading}
                  className="mt-6 w-full rounded-xl py-2.5 text-[14px] font-bold transition-colors bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {portalLoading ? 'Opening billing…' : 'Current Plan'}
                </button>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.key)}
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className={cn(
                    'mt-6 w-full rounded-xl py-2.5 text-[14px] font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
                    plan.featured
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  )}
                >
                  {isLoading ? 'Opening checkout…' : plan.buttonLabel}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center space-y-1">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 7V5a3 3 0 00-6 0v2M4 7h8a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" />
          </svg>
          Secure checkout powered by Stripe. Enter any promotion code during checkout.
        </p>
        <p className="text-[11px] text-slate-400">
          Have questions?{' '}
          <Link href="mailto:ranvi.contact@gmail.com" className="text-amber-600 hover:underline">
            ranvi.contact@gmail.com
          </Link>
        </p>
      </div>
    </div>
  )
}
