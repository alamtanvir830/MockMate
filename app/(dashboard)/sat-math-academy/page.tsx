import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MathAcademyHome from './MathAcademyHome'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export const metadata = {
  title: 'SAT Math & Desmos Academy',
}

export default async function MathAcademyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const isPremium =
    user.email === ADMIN_EMAIL ||
    user.user_metadata?.sat_upgrade_unlocked === true

  return <MathAcademyHome isPremium={isPremium} />
}
