import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import MathAcademyHome from './MathAcademyHome'

export const metadata = {
  title: 'SAT Math & Desmos Academy',
}

export default async function MathAcademyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const isPremium = hasSatPremium(user)

  return <MathAcademyHome isPremium={isPremium} />
}
