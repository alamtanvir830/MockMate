'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function PaymentSuccessPage() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setUnlocked(false); return }
      // Force a fresh session refresh so metadata is up-to-date
      supabase.auth.refreshSession().then(({ data: { user: refreshed } }) => {
        setUnlocked(refreshed?.user_metadata?.sat_upgrade_unlocked === true)
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {unlocked === null && (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Confirming your payment…
          </div>
        )}

        {unlocked === false && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Payment received</h1>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              Unlocking your access now. Refresh in a few seconds if the buttons below do not work yet.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors mb-3"
            >
              Refresh
            </button>
            <Link href="/dashboard" className="text-[12px] text-slate-400 hover:text-slate-600 underline">
              Go to dashboard
            </Link>
          </div>
        )}

        {unlocked === true && (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-7 w-7 text-emerald-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Payment successful!</h1>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              Your MockMate SAT Upgrade is now unlocked. You have access to Form 2, Form 3, and unlimited Question Bank practice.
            </p>
            <div className="space-y-2.5">
              <Link
                href="/premade/sat/form-2"
                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
              >
                Go to SAT Form 2
              </Link>
              <Link
                href="/premade/sat/form-3"
                className="block w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
              >
                Go to SAT Form 3
              </Link>
              <Link
                href="/question-bank/sat"
                className="block w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors text-center"
              >
                Go to Question Bank
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
