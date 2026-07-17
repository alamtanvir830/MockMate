import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'
function isPremiumUser(user: { email?: string | null; user_metadata?: Record<string, unknown> }): boolean {
  return user.email === ADMIN_EMAIL || user.user_metadata?.sat_upgrade_unlocked === true
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!isPremiumUser(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data, error } = await supabase
      .from('sat_rw_diagnostic_attempts')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('diagnostic GET error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? null)
  } catch (err) {
    console.error('diagnostic GET error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
