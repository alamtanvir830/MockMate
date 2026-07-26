import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import SATExamTakerClient from './SATExamTakerClient'

// SAT Form 2 is currently unavailable.
// Admin only — all other users (including SAT Premium) see a locked message.
export default async function SATForm2Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (isAdmin) {
    return <SATExamTakerClient isAdmin={true} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-slate-700 mb-2">SAT Form 2 — Unavailable</h1>
        <p className="text-sm text-slate-500">SAT Form 2 is currently unavailable. Your saved progress has been preserved.</p>
      </div>
    </div>
  )
}
