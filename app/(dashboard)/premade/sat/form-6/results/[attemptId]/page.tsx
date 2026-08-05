import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import SATForm6ResultsClient from './SATForm6ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm6ResultsPage({
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
    const trialEligible = isAdmin
      ? false
      : (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm6ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  // Non-premium: allow results client (shows "Attempt not found" if no localStorage data;
  // premium content locks remain enforced via satUpgradeUnlocked=false).
  const trialEligible = (await getSatTrialEligibility(user.id)).eligible
  return (
    <SATForm6ResultsClient
      attemptId={attemptId}
      satUpgradeUnlocked={false}
      trialEligible={trialEligible}
    />
  )
}
