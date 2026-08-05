import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import SATForm8ResultsClient from './SATForm8ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm8ResultsPage({
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

  if (isAdmin || satUpgradeUnlocked) {
    const trialEligible = isAdmin
      ? false
      : (await getSatTrialEligibility(user.id)).eligible
    return (
      <SATForm8ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  const trialEligible = (await getSatTrialEligibility(user.id)).eligible
  return (
    <SATForm8ResultsClient
      attemptId={attemptId}
      satUpgradeUnlocked={false}
      trialEligible={trialEligible}
    />
  )
}
