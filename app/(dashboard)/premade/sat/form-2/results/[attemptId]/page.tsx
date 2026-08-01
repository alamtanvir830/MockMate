import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATForm2ResultsClient from './SATForm2ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm2ResultsPage({
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

  if (!isAdmin && !satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Premium required to view results"
        description="Subscribe to SAT Premium to access your SAT Form 2 results, detailed score breakdowns, and AI feedback."
      />
    )
  }

  const trialEligible = isAdmin
    ? false
    : (await getSatTrialEligibility(user.id)).eligible

  return (
    <SATForm2ResultsClient
      attemptId={attemptId}
      satUpgradeUnlocked={satUpgradeUnlocked}
      trialEligible={trialEligible}
    />
  )
}
