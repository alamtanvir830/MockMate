import { NextRequest, NextResponse } from 'next/server'
import { getUserIdByEmail, grantSATPremiumManual } from '@/lib/entitlements'

// POST /api/admin/grant-sat-premium
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
// Body: { "email": "user@example.com" }
//
// Grants SAT Premium (lifetime access) to the user with the given email.
// Does NOT grant admin privileges — only SAT Premium entitlement.
export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { email?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const source = body.source === 'founder_grant' ? 'founder_grant' : 'manual_grant'

  const userId = await getUserIdByEmail(email)
  if (!userId) {
    return NextResponse.json(
      { error: `No user found with email: ${email}. User must sign up first.` },
      { status: 404 }
    )
  }

  await grantSATPremiumManual(userId, source)

  return NextResponse.json({
    success: true,
    email,
    userId,
    source,
    grantedAt: new Date().toISOString(),
    note: 'SAT Premium granted. This user was NOT given admin privileges.',
  })
}
