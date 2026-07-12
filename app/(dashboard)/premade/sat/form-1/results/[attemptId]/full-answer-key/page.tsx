import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import AnswerKeyPrint from './AnswerKeyPrint'

export default async function AnswerKeyPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = isMockMateAdmin(user)

  return <AnswerKeyPrint attemptId={attemptId} isAdmin={isAdmin} />
}
