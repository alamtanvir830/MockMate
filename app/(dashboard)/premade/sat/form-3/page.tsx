import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getEntitlements } from '@/lib/entitlements'
import { redirect } from 'next/navigation'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'
import {
  getForm3Promotion,
  isPromotionWindowActive,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-promotion-access'

export const dynamic = 'force-dynamic'

export default async function SATForm3Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)

  // Admin bypasses all checks — still fetch promotion so the countdown shows
  if (isAdmin) {
    const promotion = await getForm3Promotion(supabase)
    const promotionEndsAt = promotion && isPromotionWindowActive(promotion) ? promotion.endsAt : null
    return <SATExamTakerClient isAdmin={true} promotionEndsAt={promotionEndsAt} />
  }

  const { satUpgradeUnlocked } = await getEntitlements()

  // Premium users get full access — still show countdown while promotion is live
  if (satUpgradeUnlocked) {
    const promotion = await getForm3Promotion(supabase)
    const promotionEndsAt = promotion && isPromotionWindowActive(promotion) ? promotion.endsAt : null
    return <SATExamTakerClient isAdmin={false} promotionEndsAt={promotionEndsAt} />
  }

  // Fetch promotion and in-progress state in parallel
  const [promotion, inProgressRow] = await Promise.all([
    getForm3Promotion(supabase),
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .eq('form_number', 3)
      .maybeSingle(),
  ])

  const hasInProgress = !!inProgressRow.data

  const access = resolveForm3Access({
    user,
    isAdmin: false,
    isPremium: false,
    promotion,
    hasInProgress,
  })

  if (access.canStart || access.canResume) {
    return (
      <SATExamTakerClient
        isAdmin={false}
        promotionEndsAt={access.promotionEndsAt}
      />
    )
  }

  // No access — show upgrade gate
  return (
    <UpgradeGate
      title="SAT Form 3 — Limited Time Access Ended"
      description="The free promotional window for SAT Form 3 has ended. Subscribe to SAT Premium to access all 5 SAT practice forms, the 700+ question bank, and both SAT Academies."
    />
  )
}
