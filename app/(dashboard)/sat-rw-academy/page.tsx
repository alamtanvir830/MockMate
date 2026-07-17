import { createClient } from '@/lib/supabase/server'
import { AcademyHome } from './AcademyHome'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export default async function SatRwAcademyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium =
    user?.email === ADMIN_EMAIL ||
    user?.user_metadata?.sat_upgrade_unlocked === true

  return <AcademyHome isPremium={isPremium} />
}
