import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMockMateAdmin } from '@/lib/auth/admin'
import AnswerKeyContent from './AnswerKeyContent'

export default async function PrintAnswerKeyPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/premade/sat/form-1/answer-key/${attemptId}`)
  }

  const isAdmin = isMockMateAdmin(user)

  return <AnswerKeyContent attemptId={attemptId} isAdmin={isAdmin} />
}
