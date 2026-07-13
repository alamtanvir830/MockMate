import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/admin/backfill-qbank-practice-set-identities
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// For rows missing user_name or user_email, fills them from auth.users + profiles.
// Does not overwrite values that are already set.
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Rows where at least one identity field is missing
  const { data: rows, error: fetchErr } = await supabase
    .from('question_bank_practice_sets')
    .select('id, user_id, user_name, user_email')
    .or('user_email.is.null,user_name.is.null')

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

  const allRows = (rows ?? []) as {
    id: string
    user_id: string
    user_name: string | null
    user_email: string | null
  }[]

  if (allRows.length === 0) {
    return NextResponse.json({ total_scanned: 0, updated: 0, skipped: 0 })
  }

  // Resolve identity once per unique user_id
  const uniqueUserIds = [...new Set(allRows.map(r => r.user_id))]
  const identityMap = new Map<string, { user_name: string; user_email: string }>()

  for (const userId of uniqueUserIds) {
    try {
      const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
      if (error || !user) continue

      const email = (user.email ?? '').toLowerCase().trim()

      let name: string | null = null
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .maybeSingle()

      name = (profile as { full_name?: string | null } | null)?.full_name?.trim() ?? null

      if (!name) {
        const meta = user.user_metadata as Record<string, unknown> | undefined
        name = ((meta?.full_name ?? meta?.name) as string | undefined)?.trim() ?? null
      }

      if (!name) name = email ? email.split('@')[0] : 'Unknown'

      identityMap.set(userId, { user_name: name ?? 'Unknown', user_email: email })
    } catch { /* skip */ }
  }

  let updated = 0
  let skipped = 0
  const errors: string[] = []

  for (const row of allRows) {
    const identity = identityMap.get(row.user_id)
    if (!identity) { skipped++; continue }

    // Only fill missing fields — do not overwrite existing values
    const newName  = row.user_name  ?? identity.user_name
    const newEmail = row.user_email ?? identity.user_email

    if (newName === row.user_name && newEmail === row.user_email) {
      skipped++
      continue
    }

    const { error: updateErr } = await supabase
      .from('question_bank_practice_sets')
      .update({ user_name: newName, user_email: newEmail })
      .eq('id', row.id)

    if (updateErr) {
      errors.push(`${row.id}: ${updateErr.message}`)
    } else {
      updated++
    }
  }

  return NextResponse.json({
    total_scanned: allRows.length,
    updated,
    skipped,
    ...(errors.length > 0 ? { errors } : {}),
  })
}
