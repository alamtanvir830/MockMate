import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/admin/cleanup-demo-profiles
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
// Body:
//   { "dryRun": true }                                              — list candidates only
//   { "dryRun": false, "confirm": "DELETE_DEMO_PROFILES_ONLY" }    — backup + delete
//
// NEVER deletes auth.users. Only public.profiles rows that match demo indicators
// and have no Stripe records and are not ranvi.contact@gmail.com.

const PROTECTED_EMAILS = new Set(['ranvi.contact@gmail.com'])

const DEMO_INDICATORS = [
  '@mockmate-demo.invalid',
  'demo',
  '@example.',
  '@test.',
  'fake',
  'seed',
]

function isDemoEmail(email: string): boolean {
  const lower = email.toLowerCase()
  return DEMO_INDICATORS.some((s) => lower.includes(s))
}

function isDemoName(name: string | null): boolean {
  if (!name) return false
  const lower = name.toLowerCase()
  return ['demo', 'test', 'sample'].some((s) => lower.includes(s))
}

function isProtected(row: {
  email: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: string | null
}): boolean {
  if (PROTECTED_EMAILS.has(row.email.toLowerCase())) return true
  if (row.email.toLowerCase().match(/\+.*@gmail\.com/)) return true  // Gmail alias
  if (row.stripe_customer_id) return true
  if (row.stripe_subscription_id) return true
  if (row.subscription_status && row.subscription_status !== '') return true
  return false
}

export async function POST(req: NextRequest) {
  // Auth check — service role key only
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { dryRun?: boolean; confirm?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const dryRun = body.dryRun !== false  // default to true
  const confirmed = body.confirm === 'DELETE_DEMO_PROFILES_ONLY'

  if (!dryRun && !confirmed) {
    return NextResponse.json(
      { error: 'Set confirm: "DELETE_DEMO_PROFILES_ONLY" to execute a real delete.' },
      { status: 400 },
    )
  }

  const admin = createAdminClient()

  // Fetch all profiles (paginate in chunks to avoid memory issues on large tables)
  const PAGE = 1000
  let offset = 0
  const allProfiles: Array<{
    id: string
    email: string
    full_name: string | null
    stripe_customer_id: string | null
    stripe_subscription_id: string | null
    subscription_status: string | null
    subscription_tier: string | null
    created_at: string
  }> = []

  while (true) {
    const { data, error } = await admin
      .from('profiles')
      .select('id, email, full_name, stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier, created_at')
      .range(offset, offset + PAGE - 1)
      .order('created_at', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!data || data.length === 0) break
    allProfiles.push(...data)
    if (data.length < PAGE) break
    offset += PAGE
  }

  const candidates: typeof allProfiles = []
  const skippedAdmin: typeof allProfiles = []
  const skippedPaid: typeof allProfiles = []
  const skippedRealUser: typeof allProfiles = []

  for (const row of allProfiles) {
    const matchesDemo = isDemoEmail(row.email) || isDemoName(row.full_name)
    if (!matchesDemo) continue

    if (PROTECTED_EMAILS.has(row.email.toLowerCase())) {
      skippedAdmin.push(row)
      continue
    }
    if (isProtected(row)) {
      skippedPaid.push(row)
      continue
    }
    candidates.push(row)
  }

  if (dryRun) {
    return NextResponse.json({
      mode: 'dry-run',
      candidate_count: candidates.length,
      candidates: candidates.map((r) => ({
        id: r.id,
        email: r.email,
        full_name: r.full_name,
        created_at: r.created_at,
        subscription_status: r.subscription_status,
        subscription_tier: r.subscription_tier,
      })),
      skipped_admins: skippedAdmin.map((r) => r.email),
      skipped_paid_users: skippedPaid.map((r) => r.email),
      note: 'auth.users was NOT touched. Run with dryRun:false + confirm to execute.',
    })
  }

  // ── REAL DELETE (dryRun=false + confirmed) ─────────────────────────────────
  const ids = candidates.map((r) => r.id)

  if (ids.length === 0) {
    return NextResponse.json({ mode: 'delete', deleted_count: 0, message: 'No demo candidates found.' })
  }

  // Backup first
  let backupCreated = false
  try {
    const backupRows = candidates.map((r) => ({
      id: r.id,
      email: r.email,
      full_name: r.full_name,
      stripe_customer_id: r.stripe_customer_id,
      stripe_subscription_id: r.stripe_subscription_id,
      subscription_status: r.subscription_status,
      subscription_tier: r.subscription_tier,
      created_at: r.created_at,
      deleted_at: new Date().toISOString(),
      delete_reason: 'demo-profile-cleanup',
    }))

    // Insert backup rows. Ignore if backup table doesn't exist — admin must
    // create it via the SQL file before running a live delete.
    const { error: backupErr } = await admin
      .from('deleted_demo_profiles_backup')
      .insert(backupRows)

    backupCreated = !backupErr
    if (backupErr) {
      console.warn('[cleanup-demo-profiles] backup insert failed:', backupErr.message)
    }
  } catch (e) {
    console.warn('[cleanup-demo-profiles] backup step threw:', e)
  }

  // Delete from public.profiles only
  const { error: deleteErr, count } = await admin
    .from('profiles')
    .delete({ count: 'exact' })
    .in('id', ids)

  if (deleteErr) {
    return NextResponse.json({ error: deleteErr.message }, { status: 500 })
  }

  return NextResponse.json({
    mode: 'delete',
    deleted_count: count ?? ids.length,
    backup_created: backupCreated,
    skipped_admins: skippedAdmin.map((r) => r.email),
    skipped_paid_users: skippedPaid.map((r) => r.email),
    note: 'Only public.profiles rows were deleted. auth.users was NOT touched.',
  })
}
