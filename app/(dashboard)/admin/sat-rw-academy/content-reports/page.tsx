import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { AdminReportsClient } from './AdminReportsClient'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export default async function AdminContentReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { user_email } = await resolveUserIdentity(supabase, user)
  if (user_email !== ADMIN_EMAIL) redirect('/sat-rw-academy')

  return <AdminReportsClient />
}
