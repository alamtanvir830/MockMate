import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { isForm1Expired, formatCountdown } from '@/lib/premade-exams/sat/form1-access'
import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm1Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (user && !isAdmin) {
    const { satUpgradeUnlocked } = await getEntitlements()

    if (satUpgradeUnlocked) {
      return <SATExamTakerClient isAdmin={false} />
    }

    // Free user: completed attempts are always viewable → redirect to results
    const { data: completed } = await supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', 1)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (completed?.local_attempt_id) {
      redirect(`/premade/sat/form-1/results/${completed.local_attempt_id}`)
    }

    // Check for a legacy free-access window (pre-migration Form 1 access).
    // Do NOT create a new row — Form 1 is no longer free for new attempts.
    const { data: accessRow } = await supabase
      .from('sat_form_1_access')
      .select('user_id, email, access_started_at, access_expires_at, reason')
      .eq('user_id', user.id)
      .maybeSingle()

    if (accessRow && !isForm1Expired(accessRow)) {
      // Legacy window still open → allow in-progress attempt to complete
      const countdown = formatCountdown(accessRow)
      return <SATExamTakerClient isAdmin={false} countdownText={countdown} />
    }

    // No active legacy window → Form 1 is now Premium-only for new attempts
    return (
      <UpgradeGate
        title="SAT Form 1 requires SAT Premium"
        description="SAT Form 1 is now included in SAT Premium. Try the free SAT Form 2 instead, or subscribe to unlock all 5 forms, the 700+ question bank, and both SAT Academies."
      />
    )
  }

  return <SATExamTakerClient isAdmin={isAdmin} />
}
