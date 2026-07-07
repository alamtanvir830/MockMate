import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { SAT_FORM1_LAUNCH_AT } from '@/lib/premade-exams/sat/form1-access'

// POST /api/admin/backfill-sat-form-1-access
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Inserts a sat_form_1_access row for every auth user that doesn't already have one.
// Existing users receive 10 days from the feature launch date.
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000
  const launchTs = new Date(SAT_FORM1_LAUNCH_AT).getTime()
  const accessExpiresAt = new Date(launchTs + TEN_DAYS_MS).toISOString()

  // Fetch all existing access rows to know which users are already covered
  const { data: existingRows, error: existingErr } = await supabase
    .from('sat_form_1_access')
    .select('user_id')

  if (existingErr) {
    return NextResponse.json({ error: existingErr.message }, { status: 500 })
  }

  const coveredUserIds = new Set((existingRows ?? []).map((r: { user_id: string }) => r.user_id))

  // Page through all auth users and collect those without a row
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
    const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    })

    if (listErr) {
      return NextResponse.json({ error: listErr.message }, { status: 500 })
    }

    for (const u of users) {
      if (!coveredUserIds.has(u.id)) {
        rowsToInsert.push({
          user_id: u.id,
          email: u.email ?? null,
          access_started_at: SAT_FORM1_LAUNCH_AT,
          access_expires_at: accessExpiresAt,
          reason: 'existing_user_grace_period',
        })
      }
    }

    if (users.length < perPage) break
    page++
  }

  if (rowsToInsert.length === 0) {
    return NextResponse.json({ inserted: 0, message: 'All users already have an access row.' })
  }

  const { error: insertErr } = await supabase
    .from('sat_form_1_access')
    .insert(rowsToInsert)

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 })
  }

  return NextResponse.json({
    inserted: rowsToInsert.length,
    access_expires_at: accessExpiresAt,
  })
}
