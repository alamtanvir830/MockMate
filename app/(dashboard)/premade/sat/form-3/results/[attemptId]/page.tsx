import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import SATForm3ResultsClient from './SATForm3ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm3ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  // Admin and Premium always have access
  if (isAdmin || satUpgradeUnlocked) {
    // Admins are never eligible for the trial; premium users already have access.
    const trialEligible = isAdmin
      ? false
      : (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm3ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  // Non-premium authenticated user: allow access to the results client.
  // save-attempt is fire-and-forget and can fail silently, so a genuine
  // completed attempt may exist only in localStorage with no DB row. The client
  // shows "Attempt not found" for missing localStorage data — no other user's
  // data is exposed. Premium content locks remain enforced via satUpgradeUnlocked=false.
  // skipCompletedExamCheck: the user is on a results page, so they have a completed
  // attempt; skip the redundant DB re-query in getSatTrialEligibility.
  const trialEligible = (await getSatTrialEligibility(user.id, { skipCompletedExamCheck: true })).eligible
  return (
    <SATForm3ResultsClient
      attemptId={attemptId}
      satUpgradeUnlocked={false}
      trialEligible={trialEligible}
    />
  )
}
