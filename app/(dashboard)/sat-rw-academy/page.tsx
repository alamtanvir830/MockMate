import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { AcademyHome } from './AcademyHome'

export default async function SatRwAcademyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium = hasSatPremium(user)

  return <AcademyHome isPremium={isPremium} />
}
