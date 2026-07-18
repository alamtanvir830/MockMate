import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getQBAccess } from '@/lib/question-bank/access'
import { PersonalizedPracticeClient } from './PersonalizedPracticeClient'

export default async function PersonalizedPracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const access = getQBAccess(user)

  if (!access.hasPremiumAccess) {
    redirect('/question-bank?locked=1')
  }

  return <PersonalizedPracticeClient />
}
