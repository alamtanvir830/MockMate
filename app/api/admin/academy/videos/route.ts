import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

async function requireAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthenticated', status: 401, user: null }
  if (user.email !== ADMIN_EMAIL) return { error: 'Forbidden', status: 403, user: null }
  return { error: null, status: 200, user }
}

// GET /api/admin/academy/videos?status=published
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error, status } = await requireAdmin(supabase)
    if (error) return NextResponse.json({ error }, { status })

    const statusFilter = req.nextUrl.searchParams.get('status')

    let query = supabase
      .from('sat_rw_lesson_videos')
      .select('*')
      .order('created_at', { ascending: false })

    if (statusFilter) {
      query = query.eq('production_status', statusFilter)
    }

    const { data, error: dbError } = await query

    if (dbError) {
      console.error('admin/academy/videos GET error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ videos: data ?? [] })
  } catch (err) {
    console.error('admin/academy/videos GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

interface CreateVideoBody {
  videoKey: string
  lessonSlug: string
  skillSlug: string
  subskillSlug?: string
  title: string
  description?: string
  transcript: string
  narrationProvider?: string
  narrationVoiceId?: string
  durationSeconds?: number
}

// POST /api/admin/academy/videos  — create a new video record
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error, status } = await requireAdmin(supabase)
    if (error) return NextResponse.json({ error }, { status })

    const body = await req.json() as CreateVideoBody

    if (!body.videoKey || !body.lessonSlug || !body.skillSlug || !body.title) {
      return NextResponse.json({ error: 'videoKey, lessonSlug, skillSlug, title are required' }, { status: 400 })
    }

    const { data, error: dbError } = await supabase
      .from('sat_rw_lesson_videos')
      .insert({
        video_key: body.videoKey,
        lesson_slug: body.lessonSlug,
        skill_slug: body.skillSlug,
        subskill_slug: body.subskillSlug ?? null,
        title: body.title,
        description: body.description ?? null,
        transcript: body.transcript ?? '',
        narration_provider: body.narrationProvider ?? null,
        narration_voice_id: body.narrationVoiceId ?? null,
        duration_seconds: body.durationSeconds ?? null,
        production_status: 'script_draft',
        original_content_confirmed: false,
        accuracy_reviewed: false,
      })
      .select('id, video_key')
      .single()

    if (dbError) {
      console.error('admin/academy/videos POST error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id, videoKey: data.video_key })
  } catch (err) {
    console.error('admin/academy/videos POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
