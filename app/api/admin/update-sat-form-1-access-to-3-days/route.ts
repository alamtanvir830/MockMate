import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { SAT_FORM_1_FREE_ACCESS_MS } from '@/lib/premade-exams/sat/form1-access'

// POST /api/admin/update-sat-form-1-access-to-3-days
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Scans all sat_form_1_access rows. For any user whose access_expires_at is more
// than 48 hours in the future, reduces it to now + 48 hours.
// Expired rows and rows already within 48 hours are left untouched.
// Completed users retain results access regardless (expiry only gates starting the exam).
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = Date.now()
  const fortyEightFromNow = new Date(now + SAT_FORM_1_FREE_ACCESS_MS).toISOString()

  // Fetch all rows
  const { data: rows, error: fetchErr } = await supabase
    .from('sat_form_1_access')
    .select('user_id, access_expires_at')

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

  const allRows = (rows ?? []) as { user_id: string; access_expires_at: string }[]

  let shortened = 0
  let keptWithinWindow = 0
  let alreadyExpired = 0
  const errors: string[] = []

  for (const row of allRows) {
    const expiresTs = new Date(row.access_expires_at).getTime()

    if (expiresTs <= now) {
      alreadyExpired++
      continue
    }

    if (expiresTs <= now + SAT_FORM_1_FREE_ACCESS_MS) {
      keptWithinWindow++
      continue
    }

    // More than 48 hours remaining → reduce
    const { error: updateErr } = await supabase
      .from('sat_form_1_access')
      .update({ access_expires_at: fortyEightFromNow, reason: 'reduced_to_48h_window' })
      .eq('user_id', row.user_id)

    if (updateErr) {
      errors.push(`${row.user_id}: ${updateErr.message}`)
    } else {
      shortened++
    }
  }

  return NextResponse.json({
    total_scanned: allRows.length,
    shortened,
    kept_within_48h_window: keptWithinWindow,
    already_expired: alreadyExpired,
    new_expiry: fortyEightFromNow,
    errors: errors.length > 0 ? errors : undefined,
  })
}
