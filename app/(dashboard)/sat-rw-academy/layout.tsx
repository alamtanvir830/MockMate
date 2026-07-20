import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'
import { AcademyMobileMenu } from '@/components/dashboard/AcademySidebar'

export default async function AcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium = hasSatPremium(user)

  return (
    <div>
      <AcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
