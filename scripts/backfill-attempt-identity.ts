/**
 * Backfill user_name and user_email on standardized_exam_attempts rows that are missing them.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' -r dotenv/config scripts/backfill-attempt-identity.ts dotenv_config_path=.env.local
 */
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '../.env.local')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function run() {
  console.log('Fetching rows needing backfill…')

  const { data: rows, error: fetchErr } = await supabase
    .from('standardized_exam_attempts')
    .select('id, user_id, user_name, user_email')
    .or('user_name.is.null,user_email.is.null')

  if (fetchErr) {
    console.error('Fetch error:', fetchErr.message)
    process.exit(1)
  }

  const total = rows?.length ?? 0
  console.log(`Total rows needing backfill: ${total}`)

  if (total === 0) {
    console.log('Nothing to do — all rows already have user_name and user_email.')
    return
  }

  // Also grab rows where user_name = 'Unknown' so we can upgrade them if better data is now available
  const { data: unknownRows } = await supabase
    .from('standardized_exam_attempts')
    .select('id, user_id, user_name, user_email')
    .eq('user_name', 'Unknown')

  const allRows = [
    ...(rows ?? []),
    ...(unknownRows ?? []).filter(r => !(rows ?? []).find((x: { id: string }) => x.id === r.id)),
  ]

  console.log(`Total rows to process (incl. "Unknown" upgrades): ${allRows.length}`)

  // Collect unique user_ids
  const uniqueUserIds = [...new Set(allRows.map((r: { user_id: string }) => r.user_id as string))]
  console.log(`Unique users: ${uniqueUserIds.length}`)

  // Fetch profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', uniqueUserIds)

  const profileMap = new Map<string, string | null>(
    (profiles ?? []).map((p: { id: string; full_name: string | null }) => [p.id, p.full_name ?? null])
  )
  console.log(`Profiles found: ${profileMap.size}`)

  // Fetch auth users
  const authUserMap = new Map<string, { email?: string; user_metadata?: Record<string, unknown> }>()
  let authFetchErrors = 0

  for (const uid of uniqueUserIds) {
    try {
      const { data, error } = await supabase.auth.admin.getUserById(uid)
      if (error || !data.user) { authFetchErrors++; continue }
      authUserMap.set(uid, {
        email: data.user.email,
        user_metadata: data.user.user_metadata ?? {},
      })
    } catch {
      authFetchErrors++
    }
  }
  console.log(`Auth users fetched: ${authUserMap.size} (fetch errors: ${authFetchErrors})`)

  let updated = 0
  let skipped = 0
  const errors: string[] = []

  for (const row of allRows) {
    const userId = row.user_id as string
    const authUser = authUserMap.get(userId)
    const email = (authUser?.email ?? row.user_email ?? '') as string

    const name: string =
      profileMap.get(userId) ??
      (authUser?.user_metadata?.full_name as string | undefined) ??
      (authUser?.user_metadata?.name as string | undefined) ??
      (email ? email.split('@')[0] : 'Unknown') ??
      'Unknown'

    const resolvedName = name || 'Unknown'

    // Build patch — only update fields that are null, empty, or "Unknown" and we have better data
    const patch: Record<string, string> = {}

    if (!row.user_email && email) {
      patch.user_email = email
    }

    if (!row.user_name || row.user_name === 'Unknown') {
      if (resolvedName !== 'Unknown' || !row.user_name) {
        patch.user_name = resolvedName
      }
    }

    if (Object.keys(patch).length === 0) {
      skipped++
      continue
    }

    const { error: updateErr } = await supabase
      .from('standardized_exam_attempts')
      .update(patch)
      .eq('id', row.id)

    if (updateErr) {
      errors.push(`row ${row.id}: ${updateErr.message}`)
    } else {
      updated++
      const name_val = patch.user_name ?? row.user_name
      const email_val = patch.user_email ?? row.user_email
      console.log(`  ✓ ${row.id} → name="${name_val}" email="${email_val}"`)
    }
  }

  console.log('\n─── Backfill complete ───')
  console.log(`Total scanned:    ${allRows.length}`)
  console.log(`Updated:          ${updated}`)
  console.log(`Skipped:          ${skipped}`)
  console.log(`Errors:           ${errors.length}`)
  if (errors.length > 0) {
    console.log('Error details:')
    errors.forEach(e => console.log(' ', e))
  }

  // Verify: count remaining nulls
  const { count: remaining } = await supabase
    .from('standardized_exam_attempts')
    .select('*', { count: 'exact', head: true })
    .or('user_name.is.null,user_email.is.null')

  console.log(`Rows still missing user_name/email: ${remaining ?? 'unknown'}`)
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
