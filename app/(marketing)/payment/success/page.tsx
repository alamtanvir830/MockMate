'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type AccessState = 'pending' | 'confirmed' | 'waiting'

function hasPremiumAccess(metadata: Record<string, unknown>): boolean {
  if (metadata.sat_upgrade_unlocked === true) return true
  const status = metadata.sat_subscription_status as string | undefined
  return status === 'active' || status === 'past_due' || status === 'trialing'
}

export default function PaymentSuccessPage() {
  const [state, setState] = useState<AccessState>('pending')

  useEffect(() => {
    const supabase = createClient()

    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setState('waiting'); return }

      const { data: { user: refreshed } } = await supabase.auth.refreshSession()
      if (refreshed && hasPremiumAccess(refreshed.user_metadata ?? {})) {
        setState('confirmed')
        return
      }
      setState('waiting')
    }

    checkAccess()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {state === 'pending' && (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Checking subscription status…
          </div>
        )}

        {state === 'waiting' && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Welcome to SAT Premium</h1>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              Your monthly subscription is being confirmed. Premium access will appear after Stripe verifies your payment — this usually takes a few seconds.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors mb-3"
            >
              Refresh Access
            </button>
            <Link href="/dashboard" className="text-[12px] text-slate-400 hover:text-slate-600 underline">
              Go to dashboard
            </Link>
          </div>
        )}

        {state === 'confirmed' && (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-emerald-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">You&apos;re subscribed!</h1>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              SAT Premium is active. You now have access to SAT Forms 1–5, the 700+ question bank, and both SAT Academies.
            </p>
            <div className="space-y-2.5">
              <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
                View SAT Practice Forms
              </Link>
              <Link href="/question-bank/sat" className="block w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center">
                SAT Question Bank
              </Link>
              <Link href="/billing" className="block text-center text-[12px] text-slate-400 hover:text-slate-600 mt-2">
                View billing details
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
