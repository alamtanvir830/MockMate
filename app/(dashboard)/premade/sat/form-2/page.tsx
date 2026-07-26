import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import SATExamTakerClient from './SATExamTakerClient'
import { UpgradeGate } from '@/components/shared/upgrade-gate'

// SAT Form 2 requires SAT Premium (or admin).
// Admin (ranvi.contact@gmail.com): full access.
// SAT Premium subscribers / purchasers: full access.
// Everyone else: SAT Premium upgrade gate.
export default async function SATForm2Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (isAdmin) {
    return <SATExamTakerClient isAdmin={true} />
  }

  const { satUpgradeUnlocked } = await getEntitlements()

  if (satUpgradeUnlocked) {
    return <SATExamTakerClient isAdmin={false} />
  }

  return (
    <UpgradeGate
      title="SAT Form 2 — SAT Premium Required"
      description="Subscribe to SAT Premium to unlock SAT Forms 1–5, the 700+ question bank, and both SAT Academies."
    />
  )
}
