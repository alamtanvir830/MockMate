import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasSatPremium } from '@/lib/auth/server'

interface ProgressBody {
  skillSlug: string
  status: 'in_progress' | 'completed'
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as ProgressBody

    if (
      typeof body.skillSlug !== 'string' || !body.skillSlug ||
      !['in_progress', 'completed'].includes(body.status)
    ) {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const now = new Date().toISOString()

    const { error } = await supabase
      .from('sat_math_academy_lesson_progress')
      .upsert(
        {
          user_id: user.id,
          skill_slug: body.skillSlug,
          status: body.status,
          completed_at: body.status === 'completed' ? now : null,
          updated_at: now,
        },
        { onConflict: 'user_id,skill_slug' },
      )

    if (error) {
      console.error('math-lesson-progress upsert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('math-lesson-progress error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const { data, error } = await supabase
      .from('sat_math_academy_lesson_progress')
      .select('skill_slug, status, completed_at, updated_at')
      .eq('user_id', user.id)

    if (error) {
      console.error('math-lesson-progress GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('math-lesson-progress GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
