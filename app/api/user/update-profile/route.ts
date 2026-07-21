import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    if (!user.email_confirmed_at) {
      return NextResponse.json({ error: 'Email address must be verified.' }, { status: 403 })
    }

    const body = await req.json() as { fullName?: unknown }
    const rawName = typeof body.fullName === 'string' ? body.fullName.trim() : ''

    if (!rawName) {
      return NextResponse.json({ error: 'Full name cannot be empty.' }, { status: 400 })
    }
    if (rawName.length > 150) {
      return NextResponse.json({ error: 'Full name must be 150 characters or fewer.' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Update user_metadata for fast access
    const { error: metaError } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { full_name: rawName },
    })
    if (metaError) {
      console.error('[update-profile] metadata error:', metaError)
      return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 })
    }

    // Upsert profiles table if it has a full_name column
    await admin
      .from('profiles')
      .upsert({ id: user.id, full_name: rawName, updated_at: new Date().toISOString() }, { onConflict: 'id' })

    return NextResponse.json({ success: true, fullName: rawName })
  } catch (err) {
    console.error('[update-profile] error:', err)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}
