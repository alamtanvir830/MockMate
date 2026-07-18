import { createClient } from '@/lib/supabase/server'
import { MathAcademyMobileMenu } from '@/components/dashboard/MathAcademySidebar'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export default async function MathAcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium =
    user?.email === ADMIN_EMAIL ||
    user?.user_metadata?.sat_upgrade_unlocked === true

  return (
    <div>
      <MathAcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
