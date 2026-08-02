import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import SATForm4ResultsClient from './SATForm4ResultsClient'
import { getSatTrialEligibility } from '@/lib/sat-trial/eligibility'

export const dynamic = 'force-dynamic'

export default async function SATForm4ResultsPage({
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
      <SATForm4ResultsClient
        attemptId={attemptId}
        satUpgradeUnlocked={satUpgradeUnlocked}
        trialEligible={trialEligible}
      />
    )
  }

  // Non-premium authenticated user: allow access to the results client.
  // The DB ownership check (completed_at IS NOT NULL) is the ideal gate, but
  // save-attempt is fire-and-forget and can fail silently, leaving a valid
  // attempt in localStorage with no corresponding DB row. The client will show
  // "Attempt not found" for data that isn't in localStorage, so there is no
  // risk of exposing another user's data. Premium content locks remain in force
  // via satUpgradeUnlocked=false.
  const trialEligible = (await getSatTrialEligibility(user.id)).eligible
  return (
    <SATForm4ResultsClient
      attemptId={attemptId}
      satUpgradeUnlocked={false}
      trialEligible={trialEligible}
    />
  )
}
