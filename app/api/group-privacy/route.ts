import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { attemptId: string; showScore: boolean; includeInRankings: boolean }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body.attemptId !== 'string' || !body.attemptId) {
    return NextResponse.json({ error: 'attemptId required' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Verify the attempt belongs to this user before updating
  const { data: existing } = await admin
    .from('exam_attempts')
    .select('id')
    .eq('id', body.attemptId)
    .eq('user_id', user.id)
    .single()

  if (!existing) {
    return NextResponse.json({ error: 'Attempt not found' }, { status: 404 })
  }

  const { error } = await admin
    .from('exam_attempts')
    .update({
      show_score_to_group: body.showScore,
      include_in_rankings: body.includeInRankings,
    })
    .eq('id', body.attemptId)

  if (error) {
    console.error('[group-privacy] update failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
