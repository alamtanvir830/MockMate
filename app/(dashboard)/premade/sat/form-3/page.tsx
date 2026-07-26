import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import { getForm3Promotion, resolveForm3Access } from '@/lib/premade-exams/sat/form3-promotion-access'
import SATExamTakerClient from './SATExamTakerClient'

export const dynamic = 'force-dynamic'

export default async function SATForm3Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)
  const { satUpgradeUnlocked } = await getEntitlements()

  // Fetch promotion row and in-progress state in parallel
  const [promotion, inProgressRow] = await Promise.all([
    getForm3Promotion(supabase),
    user
      ? supabase
          .from('sat_in_progress_attempts')
          .select('local_attempt_id')
          .eq('user_id', user.id)
          .eq('form_number', 3)
          .maybeSingle()
          .then(r => r.data)
      : Promise.resolve(null),
  ])

  const access = resolveForm3Access({
    user:          user ?? null,
    isAdmin,
    isPremium:     satUpgradeUnlocked,
    promotion,
    hasInProgress: !!inProgressRow,
  })

  if (!access.canStart && !access.canResume) {
    return (
      <UpgradeGate
        title="SAT Form 3 — Locked"
        description="Subscribe to SAT Premium to unlock SAT Forms 1–5, the 700+ question bank, and both SAT Academies."
      />
    )
  }

  return (
    <SATExamTakerClient
      isAdmin={isAdmin}
      promotionEndsAt={access.promotionEndsAt ?? undefined}
      canStartNew={access.canStart}
    />
  )
}
