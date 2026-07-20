import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data, error } = await supabase
      .from('sat_math_diagnostic_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('math-diagnostic GET error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? null)
  } catch (err) {
    console.error('math-diagnostic GET error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
