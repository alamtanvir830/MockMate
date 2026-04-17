import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(request: Request) {
  // ── 1. Auth ──────────────────────────────────────────────────────────────
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) {
    console.error('[group-privacy] auth error:', authError)
    return NextResponse.json({ error: 'Auth error', detail: authError.message }, { status: 401 })
  }
  if (!user) {
    console.error('[group-privacy] no user in session')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let body: { attemptId: string; showScore: boolean; includeInRankings: boolean }
  try {
    body = await request.json()
  } catch (e) {
    console.error('[group-privacy] invalid JSON:', e)
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body.attemptId !== 'string' || !body.attemptId) {
    console.error('[group-privacy] missing or invalid attemptId in body:', body)
    return NextResponse.json({ error: 'attemptId required' }, { status: 400 })
  }

  const admin = createAdminClient()

  // ── 3. Update — ownership check is folded into the WHERE clause ───────────
  // Using a single UPDATE + .select() avoids a redundant SELECT and eliminates
  // the .single() PGRST116 failure mode that was silently causing 404 responses.
  const { data: updated, error: updateError } = await admin
    .from('exam_attempts')
    .update({
      show_score_to_group: body.showScore,
      include_in_rankings: body.includeInRankings,
    })
    .eq('id', body.attemptId)
    .eq('user_id', user.id)   // ownership guard — no separate SELECT needed
    .select('id')
    .maybeSingle()

  if (updateError) {
    const msg = updateError.message ?? ''
    const isColumnMissing =
      msg.includes('show_score_to_group') ||
      msg.includes('include_in_rankings') ||
      msg.includes('column') ||
      msg.includes('does not exist')

    if (isColumnMissing) {
      // The DB migration to add these columns has not been run yet.
      // Return a clear, actionable error rather than a generic 500.
      console.error(
        '[group-privacy] preference columns missing from exam_attempts — run the migration to add show_score_to_group and include_in_rankings:',
        updateError,
      )
      return NextResponse.json(
        {
          error: 'columns_missing',
          detail:
            'The show_score_to_group and include_in_rankings columns do not exist on exam_attempts. Run the DB migration to enable this feature.',
        },
        { status: 503 },
      )
    }

    console.error('[group-privacy] update failed — user:', user.id, 'attemptId:', body.attemptId, 'error:', updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  if (!updated) {
    // UPDATE matched 0 rows: attempt doesn't exist or belongs to a different user
    console.error(
      '[group-privacy] ownership check failed — no row matched attemptId:',
      body.attemptId,
      'user_id:',
      user.id,
    )
    return NextResponse.json(
      { error: 'Attempt not found or not owned by current user' },
      { status: 404 },
    )
  }

  return NextResponse.json({ ok: true })
}
