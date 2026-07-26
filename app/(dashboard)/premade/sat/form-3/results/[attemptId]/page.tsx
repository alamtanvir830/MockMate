import { createClient } from '@/lib/supabase/server'
import { getEntitlements } from '@/lib/entitlements'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import {
  getForm3Promotion,
  resolveForm3Access,
} from '@/lib/premade-exams/sat/form3-promotion-access'
import SATForm3ResultsClient from './SATForm3ResultsClient'

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
    return <SATForm3ResultsClient attemptId={attemptId} satUpgradeUnlocked={satUpgradeUnlocked} />
  }

  // Non-premium: check if they have a completed Form 3 attempt (promotional access)
  // Any user who completed the exam via the promotion may view their results
  const { data: completedAttempt } = await supabase
    .from('standardized_exam_attempts')
    .select('local_attempt_id')
    .eq('user_id', user.id)
    .eq('exam_type', 'SAT')
    .eq('form_number', 3)
    .eq('local_attempt_id', attemptId)
    .not('completed_at', 'is', null)
    .maybeSingle()

  if (completedAttempt) {
    // They completed this specific attempt — allow result access
    return <SATForm3ResultsClient attemptId={attemptId} satUpgradeUnlocked={false} />
  }

  // Check promotion access for in-progress context
  const [promotion, inProgressRow] = await Promise.all([
    getForm3Promotion(supabase),
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .eq('form_number', 3)
      .maybeSingle(),
  ])

  const access = resolveForm3Access({
    user,
    isAdmin: false,
    isPremium: false,
    promotion,
    hasInProgress: !!inProgressRow.data,
  })

  if (access.canStart || access.canResume) {
    return <SATForm3ResultsClient attemptId={attemptId} satUpgradeUnlocked={false} />
  }

  // No access — redirect to Form 3 landing which will show the upgrade gate
  redirect('/premade/sat/form-3')
}
