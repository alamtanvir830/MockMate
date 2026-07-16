import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { createClient as createServiceClient } from '@supabase/supabase-js'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

const VALID_STATUSES = ['open', 'reviewing', 'confirmed', 'corrected', 'rejected', 'archived']

// PATCH /api/academy/content-reports/[id] — admin only
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { user_email } = await resolveUserIdentity(supabase, user)
    if (user_email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    if (!id) return NextResponse.json({ error: 'Missing report ID' }, { status: 400 })

    const body = await req.json()
    const { status, adminNotes, resolutionSummary } = body

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (status) updates.status = status
    if (typeof adminNotes === 'string') updates.admin_notes = adminNotes.trim()
    if (typeof resolutionSummary === 'string') updates.resolution_summary = resolutionSummary.trim()
    if (status === 'corrected' || status === 'rejected' || status === 'archived') {
      updates.resolved_at = new Date().toISOString()
    }

    // Use service-role client to bypass RLS for admin writes
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { error } = await serviceClient
      .from('sat_rw_content_reports')
      .update(updates)
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PATCH /api/academy/content-reports/[id]:', err)
    return NextResponse.json({ error: 'Failed to update report.' }, { status: 500 })
  }
}
