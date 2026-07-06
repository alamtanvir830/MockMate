import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import SATForm1ResultsClient from './SATForm1ResultsClient'

export default async function SATForm1ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  return (
    <SATForm1ResultsClient
      attemptId={attemptId}
      isAdmin={isAdmin}
      satUpgradeUnlocked={satUpgradeUnlocked}
    />
  )
}
