import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { getOrCreateForm1Access, isForm1Expired, formatCountdown } from '@/lib/premade-exams/sat/form1-access'
import SATExamTakerClient from './SATExamTakerClient'
import Form1ExpiredScreen from '@/components/premade/Form1ExpiredScreen'

export default async function SATForm1Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (user && !isAdmin) {
    // Completed check takes priority — redirect to their results
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

    // Access window check — auto-creates the row for new users
    const access = await getOrCreateForm1Access(supabase, user)

    if (isForm1Expired(access)) {
      return <Form1ExpiredScreen />
    }

    const countdown = formatCountdown(access)
    return <SATExamTakerClient isAdmin={false} countdownText={countdown} />
  }

  return <SATExamTakerClient isAdmin={isAdmin} />
}
