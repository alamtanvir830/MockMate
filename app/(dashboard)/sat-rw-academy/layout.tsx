import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { getFreshAuthUser } from '@/lib/entitlements'
import { AcademyMobileMenu } from '@/components/dashboard/AcademySidebar'

export default async function AcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium = hasSatPremium(await getFreshAuthUser(user))

  return (
    <div>
      <AcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
