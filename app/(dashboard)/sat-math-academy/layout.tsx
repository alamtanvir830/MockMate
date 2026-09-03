import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { getFreshAuthUser } from '@/lib/entitlements'
import { MathAcademyMobileMenu } from '@/components/dashboard/MathAcademySidebar'

export default async function MathAcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium = hasSatPremium(await getFreshAuthUser(user))

  return (
    <div>
      <MathAcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
