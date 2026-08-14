import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getQBAccess } from '@/lib/question-bank/access'
import { SAT_PREMIUM_FEATURES } from '@/lib/sat-premium-features'
import Link from 'next/link'

export default async function QuestionBankPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const access = getQBAccess(user)

  // Premium and admin users go directly to the SAT Question Bank.
  // /question-bank is definitively SAT workspace; no multi-product chooser needed.
  if (access.hasPremiumAccess) {
    redirect('/question-bank/sat')
  }

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
            Practice the exact Reading, Writing, and Math skills holding back your score with 1,000+ targeted SAT-style questions.
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
            Start SAT Premium — $9.99/month
          </Link>
          <p className="text-center text-[11px] text-slate-400 mt-2">Billed monthly · Cancel anytime · Secure checkout via Stripe</p>
        </div>
      </div>
    </div>
  )
}
