import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import SATExamTakerClient from './SATExamTakerClient'
import SATForm2LockedScreen from '@/components/premade/SATForm2LockedScreen'

// SAT Form 2 is locked for all non-admin users.
// Admin (ranvi.contact@gmail.com) retains full access.
// Historical results and in-progress data are preserved — only new/resumed activity is blocked.
export default async function SATForm2Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  // Admin bypass
  if (isAdmin) {
    return <SATExamTakerClient isAdmin={true} />
  }

  // Non-admin: check for in-progress attempt so we can show appropriate copy
  let hadInProgress = false
  if (user) {
    const { data } = await supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id')
      .eq('user_id', user.id)
      .eq('form_number', 2)
      .maybeSingle()
    hadInProgress = !!data
  }

  return <SATForm2LockedScreen hadInProgress={hadInProgress} />
}
