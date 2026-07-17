import { createClient } from '@/lib/supabase/server'
import { AcademyMobileMenu } from '@/components/dashboard/AcademySidebar'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export default async function AcademyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isPremium =
    user?.email === ADMIN_EMAIL ||
    user?.user_metadata?.sat_upgrade_unlocked === true

  return (
    <div>
      <AcademyMobileMenu isPremium={isPremium} />
      {children}
    </div>
  )
}
