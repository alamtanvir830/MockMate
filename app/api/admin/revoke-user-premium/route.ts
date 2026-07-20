import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revokeSATPremium } from '@/lib/entitlements'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

// POST /api/admin/revoke-user-premium
// Body: { targetEmail: string }
// Requires: authenticated as ADMIN_EMAIL, or Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Revokes SAT Premium access for the specified user.
// Does NOT delete the account, historical attempts, or payment records.
export async function POST(req: NextRequest) {
  // Accept either an authenticated admin session or the service-role key as bearer token.
  const authHeader = req.headers.get('authorization') ?? ''
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  let callerEmail: string | null = null

  if (bearerToken && serviceRoleKey && bearerToken === serviceRoleKey) {
    // Direct service-role invocation (e.g., internal script)
    callerEmail = ADMIN_EMAIL
  } else {
    // Session-based: must be admin
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (user.email !== ADMIN_EMAIL) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    callerEmail = user.email
  }

  let body: { targetEmail?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { targetEmail } = body
  if (!targetEmail || typeof targetEmail !== 'string') {
    return NextResponse.json({ error: 'targetEmail is required' }, { status: 400 })
  }

  // Prevent admins from accidentally revoking themselves
  if (targetEmail === ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Cannot revoke admin user' }, { status: 400 })
  }

  // Look up the user by email via the admin client
  const admin = createAdminClient()
  const { data: { users }, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 })
  if (listErr) {
    console.error('[revoke-premium] listUsers error', listErr.message)
    return NextResponse.json({ error: 'Failed to look up users' }, { status: 500 })
  }

  const target = users.find(u => u.email === targetEmail)
  if (!target) {
    // Don't leak whether the user exists; return a vague error
    return NextResponse.json({ error: 'User not found or no premium to revoke' }, { status: 404 })
  }

  const hadPremium = target.user_metadata?.sat_upgrade_unlocked === true
  if (!hadPremium) {
    return NextResponse.json({
      message: 'User already has no active premium — no changes made',
      targetEmail,
      hadPremium: false,
    })
  }

  await revokeSATPremium(target.id, 'manual_access_revocation')

  console.log(`[revoke-premium] SAT Premium revoked for ${targetEmail} (${target.id}) by ${callerEmail}`)

  return NextResponse.json({
    message: 'SAT Premium access revoked',
    targetEmail,
    targetUserId: target.id,
    revokedAt: new Date().toISOString(),
    revokedBy: callerEmail,
  })
}
