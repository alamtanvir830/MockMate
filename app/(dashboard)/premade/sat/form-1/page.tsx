import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm1Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAdmin = isMockMateAdmin(user)

  if (user && !isAdmin) {
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
  }

  return <SATExamTakerClient isAdmin={isAdmin} />
}
