import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import { redirect } from 'next/navigation'
import SATExamTakerClient from './SATExamTakerClient'

export const dynamic = 'force-dynamic'

// SAT Form 3 is free for all authenticated users.
export default async function SATForm3Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = isMockMateAdmin(user)

  return (
    <SATExamTakerClient
      isAdmin={isAdmin}
    />
  )
}
