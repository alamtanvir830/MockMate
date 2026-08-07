import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export const dynamic = 'force-dynamic'

export default async function SATForm2Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (isAdmin) {
    return <SATExamTakerClient isAdmin={true} />
  }

  if (user) {
    const { satUpgradeUnlocked } = await getEntitlements()
    if (satUpgradeUnlocked) {
      return <SATExamTakerClient isAdmin={false} />
    }
  }

  return (
    <UpgradeGate
      title="SAT Form 2 requires SAT Premium"
      description="Subscribe to SAT Premium to unlock all 5 SAT practice forms, the 1,000+ question bank, and both SAT Academies."
    />
  )
}
