import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getOrCreateFreeExamAccess, isFreeExamExpired, formatFreeExamCountdown } from '@/lib/premade-exams/sat/free-exam-access'
import { getEntitlements } from '@/lib/entitlements'
import SATExamTakerClient from './SATExamTakerClient'
import FreeExamExpiredScreen from '@/components/premade/FreeExamExpiredScreen'

export default async function SATForm2Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (user && !isAdmin) {
    const { satUpgradeUnlocked } = await getEntitlements()

    if (satUpgradeUnlocked) {
      return <SATExamTakerClient isAdmin={false} />
    }

    // Free user: completed check redirects to results (one-attempt rule)
    const { data: completed } = await supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .eq('exam_type', 'SAT')
      .eq('form_number', 2)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (completed?.local_attempt_id) {
      redirect(`/premade/sat/form-2/results/${completed.local_attempt_id}`)
    }

    // Access window check — auto-creates the row for new users
    const access = await getOrCreateFreeExamAccess(supabase, user)

    if (isFreeExamExpired(access)) {
      return <FreeExamExpiredScreen />
    }

    const countdown = formatFreeExamCountdown(access)
    return <SATExamTakerClient isAdmin={false} countdownText={countdown} />
  }

  return <SATExamTakerClient isAdmin={isAdmin} />
}
