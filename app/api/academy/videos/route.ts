import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/academy/videos?lessonSlug=boundaries
// Returns the single published video for a lesson, without storage URLs.
// A separate /progress route handles the signed URL.
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const lessonSlug = req.nextUrl.searchParams.get('lessonSlug')
    if (!lessonSlug) return NextResponse.json({ error: 'lessonSlug required' }, { status: 400 })

    const { data, error } = await supabase
      .from('sat_rw_lesson_videos')
      .select(
        'id, video_key, lesson_slug, skill_slug, subskill_slug, title, description, transcript, duration_seconds, script_version, video_version, published_at',
      )
      .eq('lesson_slug', lessonSlug)
      .eq('production_status', 'published')
      .eq('original_content_confirmed', true)
      .eq('accuracy_reviewed', true)
      .not('storage_path', 'is', null)
      .is('archived_at', null)
      .order('published_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      // No row = no published video for this lesson
      if (error.code === 'PGRST116') return NextResponse.json({ video: null })
      console.error('academy/videos GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      video: {
        id: data.id,
        videoKey: data.video_key,
        lessonSlug: data.lesson_slug,
        skillSlug: data.skill_slug,
        subskillSlug: data.subskill_slug,
        title: data.title,
        description: data.description,
        transcript: data.transcript,
        durationSeconds: data.duration_seconds,
        scriptVersion: data.script_version,
        videoVersion: data.video_version,
        publishedAt: data.published_at,
      },
    })
  } catch (err) {
    console.error('academy/videos GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
