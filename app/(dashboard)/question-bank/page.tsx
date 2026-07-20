import { createClient } from '@/lib/supabase/server'
import { getQBAccess } from '@/lib/question-bank/access'
import { SAT_PREMIUM_FEATURES } from '@/lib/sat-premium-features'
import Link from 'next/link'
import { QuestionBankClient } from './QuestionBankClient'

export default async function QuestionBankPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const access = getQBAccess(user)

  if (!access.hasPremiumAccess) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Question Bank</h1>
        <p className="text-slate-500 mb-8">
          Practice targeted questions by test, subject, skill, and difficulty.
        </p>

        {/* Premium lock — SAT QB */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <p className="text-[11px] font-semibold text-white/70 tracking-widest uppercase mb-2">SAT Premium</p>
            <h2 className="text-xl font-bold text-white">Unlock the SAT Question Bank</h2>
            <p className="text-amber-100 text-[13px] mt-2 leading-relaxed max-w-sm mx-auto">
              Practice the exact Reading, Writing, and Math skills holding back your score with 700+ targeted SAT-style questions.
            </p>
          </div>

          <div className="px-6 py-5">
            <ul className="space-y-3 mb-6">
              {SAT_PREMIUM_FEATURES.map((f) => (
                <li key={f.id} className="flex items-start gap-3">
                  <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5l4 4 7.5-8" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-medium text-slate-800">{f.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/billing"
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-[15px] py-3 rounded-xl transition-colors"
            >
              Start SAT Premium — $10/month
            </Link>
            <p className="text-center text-[11px] text-slate-400 mt-2">Billed monthly · Cancel anytime · Secure checkout via Stripe</p>
          </div>
        </div>

        {/* MCAT QB — still available */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/question-bank/mcat"
            className="relative rounded-xl border border-teal-200 bg-white p-6 hover:border-teal-400 hover:shadow-sm transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-teal-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">MCAT</h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Available</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Practice targeted MCAT questions by section, discipline, content area, and reasoning skill.</p>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-600 group-hover:text-teal-700">
              Open MCAT Question Bank
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>

          {/* SHSAT — coming soon */}
          <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-70">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-semibold text-slate-600">SHSAT</h2>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Coming soon</span>
            </div>
            <p className="text-sm text-slate-400">SHSAT practice questions across all scrambled paragraphs, logical reasoning, and math skills.</p>
          </div>
        </div>
      </div>
    )
  }

  // Premium users: render the full client-side QB landing
  return <QuestionBankClient />
}
