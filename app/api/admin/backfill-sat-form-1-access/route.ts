import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { SAT_FORM_1_FREE_ACCESS_MS } from '@/lib/premade-exams/sat/form1-access'

// POST /api/admin/backfill-sat-form-1-access
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Inserts a sat_form_1_access row for every auth user that doesn't already have one.
// New rows get 48 hours from the current time (they'll be fine-tuned on first dashboard visit).
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = Date.now()
  const accessExpiresAt = new Date(now + SAT_FORM_1_FREE_ACCESS_MS).toISOString()
  const accessStartedAt = new Date(now).toISOString()

  const { data: existingRows, error: existingErr } = await supabase
    .from('sat_form_1_access')
    .select('user_id')

  if (existingErr) {
    return NextResponse.json({ error: existingErr.message }, { status: 500 })
  }

  const coveredUserIds = new Set((existingRows ?? []).map((r: { user_id: string }) => r.user_id))

  const rowsToInsert: {
    user_id: string
    email: string | null
    access_started_at: string
    access_expires_at: string
    reason: string
  }[] = []

  let page = 1
  const perPage = 1000

  while (true) {
    const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers({ page, perPage })
    if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 })

    for (const u of users) {
      if (!coveredUserIds.has(u.id)) {
        rowsToInsert.push({
          user_id: u.id,
          email: u.email ?? null,
          access_started_at: accessStartedAt,
          access_expires_at: accessExpiresAt,
          reason: 'backfill_48h_window',
        })
      }
    }

    if (users.length < perPage) break
    page++
  }

  if (rowsToInsert.length === 0) {
    return NextResponse.json({ inserted: 0, message: 'All users already have an access row.' })
  }

  const { error: insertErr } = await supabase.from('sat_form_1_access').insert(rowsToInsert)
  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })

  return NextResponse.json({ inserted: rowsToInsert.length, access_expires_at: accessExpiresAt })
}
