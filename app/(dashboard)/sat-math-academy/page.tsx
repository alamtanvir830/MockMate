import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { getFreshAuthUser } from '@/lib/entitlements'
import MathAcademyHome from './MathAcademyHome'

export const metadata = {
  title: 'SAT Math & Desmos Academy',
}

export default async function MathAcademyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const isPremium = hasSatPremium(await getFreshAuthUser(user))

  return <MathAcademyHome isPremium={isPremium} />
}
