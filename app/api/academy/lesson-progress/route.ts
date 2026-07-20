import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { hasSatPremium } from '@/lib/auth/server'

interface LessonProgressBody {
  skillSlug: string
  lessonSlug: string
  status: 'in_progress' | 'completed'
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as LessonProgressBody

    if (
      typeof body.skillSlug !== 'string' || !body.skillSlug ||
      typeof body.lessonSlug !== 'string' || !body.lessonSlug ||
      !['in_progress', 'completed'].includes(body.status)
    ) {
      return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
    }

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('sat_rw_academy_lesson_progress')
      .upsert(
        {
          user_id: user.id,
          user_email,
          user_name,
          skill_slug: body.skillSlug,
          lesson_slug: body.lessonSlug,
          status: body.status,
          completed_at: body.status === 'completed' ? now : null,
          last_opened_at: now,
          updated_at: now,
        },
        {
          onConflict: 'user_id,lesson_slug',
        },
      )
      .select('id')
      .single()

    if (error) {
      console.error('academy/lesson-progress upsert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('academy/lesson-progress error:', err)
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
      .from('sat_rw_academy_lesson_progress')
      .select('lesson_slug, skill_slug, status, completed_at')
      .eq('user_id', user.id)

    if (error) {
      console.error('academy/lesson-progress GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const result = (data ?? []).map((row) => ({
      lessonSlug: row.lesson_slug,
      skillSlug: row.skill_slug,
      status: row.status,
      completedAt: row.completed_at,
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error('academy/lesson-progress GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
