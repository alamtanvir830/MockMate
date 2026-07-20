import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { MathAcademyMobileMenu } from '@/components/dashboard/MathAcademySidebar'

export default async function MathAcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium = hasSatPremium(user)

  return (
    <div>
      <MathAcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
