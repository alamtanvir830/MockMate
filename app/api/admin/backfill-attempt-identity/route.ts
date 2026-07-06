import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/admin/backfill-attempt-identity
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Populates user_name and user_email on standardized_exam_attempts rows
// that are missing those fields.
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Load all rows missing user_name or user_email
  const { data: rows, error: fetchErr } = await supabase
    .from('standardized_exam_attempts')
    .select('id, user_id, user_name, user_email')
    .or('user_name.is.null,user_email.is.null')

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 })
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json({ updated: 0, message: 'All rows already have user_name and user_email.' })
  }

  // Collect unique user_ids
  const uniqueUserIds = [...new Set(rows.map(r => r.user_id as string))]

  // Fetch profiles for name
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', uniqueUserIds)

  const profileMap = new Map<string, string | null>(
    (profiles ?? []).map(p => [p.id as string, (p.full_name as string | null) ?? null])
  )

  // Fetch auth users for email + metadata fallback
  const authUserMap = new Map<string, { email?: string; user_metadata?: Record<string, unknown> }>()
  await Promise.all(
    uniqueUserIds.map(async (uid) => {
      try {
        const { data } = await supabase.auth.admin.getUserById(uid)
        if (data.user) {
          authUserMap.set(uid, {
            email: data.user.email,
            user_metadata: data.user.user_metadata,
          })
        }
      } catch { /* skip */ }
    })
  )

  let updated = 0
  const errors: string[] = []

  for (const row of rows) {
    if (row.user_name && row.user_email) continue

    const userId = row.user_id as string
    const authUser = authUserMap.get(userId)
    const email = authUser?.email ?? ''

    let name: string =
      profileMap.get(userId) ??
      (authUser?.user_metadata?.full_name as string | undefined) ??
      (authUser?.user_metadata?.name as string | undefined) ??
      (email ? email.split('@')[0] : 'Unknown') ??
      'Unknown'
    if (!name) name = 'Unknown'

    const patch: Record<string, string> = {}
    if (!row.user_name) patch.user_name = name
    if (!row.user_email) patch.user_email = email

    const { error: updateErr } = await supabase
      .from('standardized_exam_attempts')
      .update(patch)
      .eq('id', row.id)

    if (updateErr) {
      errors.push(`row ${row.id}: ${updateErr.message}`)
    } else {
      updated++
    }
  }

  return NextResponse.json({
    total: rows.length,
    updated,
    errors,
  })
}
