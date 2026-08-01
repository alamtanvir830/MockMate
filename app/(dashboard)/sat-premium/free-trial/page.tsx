import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/auth/server'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'
import { SATTrialOffer } from '@/components/sat-trial/SATTrialOffer'
import Link from 'next/link'

export default async function SATFreeTrialPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/sat-premium/free-trial')
  if (isAdminUser(user)) redirect('/dashboard')

  const eligibility = await getSatTrialEligibility(user.id)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-[24px] font-bold text-slate-900">Unlock SAT Premium Free</h1>
          <p className="text-[14px] text-slate-500 mt-1">7 days of full access — no charge if you cancel before the trial ends.</p>
        </div>

        {eligibility.eligible ? (
          <SATTrialOffer />
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            {eligibility.reason === 'already_premium' && (
              <>
                <p className="text-[14px] font-semibold text-slate-900 mb-2">You already have SAT Premium</p>
                <p className="text-[12px] text-slate-500 mb-4">Your account already has full access.</p>
                <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] py-2.5 rounded-xl text-center transition-colors">
                  View SAT Practice Forms
                </Link>
              </>
            )}
            {eligibility.reason === 'trial_already_claimed' && (
              <>
                <p className="text-[14px] font-semibold text-slate-900 mb-2">Trial Already Claimed</p>
                <p className="text-[12px] text-slate-500 mb-4">You&apos;ve already used your free trial. Upgrade to keep full access.</p>
                <Link href="/billing" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] py-2.5 rounded-xl text-center transition-colors">
                  View Plans
                </Link>
              </>
            )}
            {eligibility.reason === 'no_completed_exam' && (
              <>
                <p className="text-[14px] font-semibold text-slate-900 mb-2">Complete a Free SAT Exam First</p>
                <p className="text-[12px] text-slate-500 mb-4">Take a free practice exam to unlock this offer. The trial is designed for students who&apos;ve already practiced.</p>
                <Link href="/premade/sat" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] py-2.5 rounded-xl text-center transition-colors">
                  Take a Free SAT Practice Exam
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
