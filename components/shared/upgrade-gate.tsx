'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FeatureItem {
  label: string
  subtext?: string
}

interface UpgradeGateProps {
  title?: string
  description?: string
  features?: (string | FeatureItem)[]
  compact?: boolean
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { label: 'SAT Practice Test Forms 1, 2, 3, 4, and 5', subtext: 'Full-length adaptive SAT practice exams with score feedback' },
  { label: 'Unlimited lifetime usage', subtext: 'Retake available SAT forms anytime after upgrading' },
  { label: 'SAT Question Bank access', subtext: '700+ targeted practice questions built from your weak areas' },
  { label: 'Personalized score reports', subtext: 'Review strengths, weaknesses, and recommended practice' },
]

export function UpgradeGate({
  title = 'Unlock Lifetime SAT Access',
  description = 'Unlock SAT Forms 1, 2, 3, 4, and 5 plus the SAT Question Bank with unlimited lifetime access for a one-time payment.',
  features = DEFAULT_FEATURES,
  compact = false,
}: UpgradeGateProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acknowledged, setAcknowledged] = useState(false)

  async function handleUnlock() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Failed to start checkout')
      }
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (compact) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-amber-900">{title}</p>
          <p className="text-[12px] text-amber-700 mt-0.5">{description}</p>
          {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            {loading ? 'Redirecting…' : 'Unlock SAT Access for $9.99'}
          </button>
          <p className="text-[10px] text-amber-500">Secure checkout powered by Stripe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <p className="text-[11px] font-semibold text-white/70 tracking-widest uppercase mb-2">SAT Premium</p>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-amber-100 text-[13px] mt-2 leading-relaxed">{description}</p>
        </div>

        {/* Features */}
        <div className="px-6 py-5">
          <ul className="space-y-4">
            {features.map((f, i) => {
              const label = typeof f === 'string' ? f : f.label
              const subtext = typeof f === 'string' ? undefined : f.subtext
              return (
                <li key={i} className="flex items-start gap-3">
                  <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5l4 4 7.5-8" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-medium text-slate-800">{label}</p>
                    {subtext && <p className="text-[11px] text-slate-400 mt-0.5">{subtext}</p>}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="px-6 pb-6 space-y-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-bold text-slate-900">$9.99</span>
            <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">One-time early access price</span>
          </div>
          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
          <label className="flex items-start gap-2.5 cursor-pointer rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={e => setAcknowledged(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-amber-500"
            />
            <span className="text-[11px] text-slate-600 leading-relaxed">
              I understand that MockMate is an independent SAT-style practice platform and is not affiliated with, endorsed by, or sponsored by College Board.
            </span>
          </label>
          <button
            onClick={handleUnlock}
            disabled={loading || !acknowledged}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[15px] py-3 rounded-xl transition-colors"
          >
            {loading ? 'Redirecting to Stripe…' : 'Unlock Lifetime SAT Access for $9.99'}
          </button>
          <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 7V5a3 3 0 00-6 0v2M4 7h8a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" />
            </svg>
            Secure checkout powered by Stripe.
          </p>
          <p className="text-center text-[11px] text-slate-400">
            Have questions?{' '}
            <Link href="mailto:ranvi.contact@gmail.com" className="text-amber-600 hover:underline">
              ranvi.contact@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
