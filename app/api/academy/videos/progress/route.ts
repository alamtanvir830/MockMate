import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'

// GET /api/academy/videos/progress?videoId=<uuid>
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const videoId = req.nextUrl.searchParams.get('videoId')
    if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 })

    // Also generate signed URLs for the video and captions
    const { data: videoMeta, error: metaError } = await supabase
      .from('sat_rw_lesson_videos')
      .select('id, storage_path, captions_storage_path, duration_seconds')
      .eq('id', videoId)
      .eq('production_status', 'published')
      .eq('original_content_confirmed', true)
      .eq('accuracy_reviewed', true)
      .is('archived_at', null)
      .single()

    if (metaError || !videoMeta) {
      return NextResponse.json({ error: 'Video not found or not published' }, { status: 404 })
    }

    // Generate signed URLs (1 hour expiry)
    const bucket = process.env.ACADEMY_VIDEO_STORAGE_BUCKET ?? 'sat-rw-academy-videos'
    let videoUrl: string | null = null
    let captionsUrl: string | null = null

    if (videoMeta.storage_path) {
      const { data: signed } = await supabase.storage
        .from(bucket)
        .createSignedUrl(videoMeta.storage_path, 3600)
      videoUrl = signed?.signedUrl ?? null
    }

    if (videoMeta.captions_storage_path) {
      const { data: signedCaptions } = await supabase.storage
        .from(bucket)
        .createSignedUrl(videoMeta.captions_storage_path, 3600)
      captionsUrl = signedCaptions?.signedUrl ?? null
    }

    // Fetch existing progress for this user + video
    const { data: progress } = await supabase
      .from('sat_rw_video_progress')
      .select(
        'id, last_position_seconds, highest_position_seconds, percent_watched, playback_rate, completed, completed_at, last_watched_at',
      )
      .eq('user_id', user.id)
      .eq('video_id', videoId)
      .single()

    return NextResponse.json({
      videoUrl,
      captionsUrl,
      durationSeconds: videoMeta.duration_seconds,
      progress: progress
        ? {
            id: progress.id,
            videoId,
            lastPositionSeconds: Number(progress.last_position_seconds),
            highestPositionSeconds: Number(progress.highest_position_seconds),
            percentWatched: Number(progress.percent_watched),
            playbackRate: Number(progress.playback_rate),
            completed: progress.completed,
            completedAt: progress.completed_at,
            lastWatchedAt: progress.last_watched_at,
          }
        : null,
    })
  } catch (err) {
    console.error('academy/videos/progress GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

interface ProgressBody {
  videoId: string
  lastPositionSeconds: number
  highestPositionSeconds: number
  percentWatched: number
  playbackRate: number
  completed: boolean
}

// POST /api/academy/videos/progress
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as ProgressBody

    if (
      typeof body.videoId !== 'string' || !body.videoId ||
      typeof body.lastPositionSeconds !== 'number' ||
      typeof body.highestPositionSeconds !== 'number' ||
      typeof body.percentWatched !== 'number' ||
      typeof body.playbackRate !== 'number' ||
      typeof body.completed !== 'boolean'
    ) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    // Verify the video is published and belongs to a real lesson
    const { data: videoMeta, error: metaError } = await supabase
      .from('sat_rw_lesson_videos')
      .select('id, duration_seconds')
      .eq('id', body.videoId)
      .eq('production_status', 'published')
      .single()

    if (metaError || !videoMeta) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // Anti-cheat: don't accept completed=true unless percent_watched >= 88
    const isCompleted = body.completed && body.percentWatched >= 88

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const now = new Date().toISOString()

    const { error } = await supabase
      .from('sat_rw_video_progress')
      .upsert(
        {
          user_id: user.id,
          user_email,
          user_name,
          video_id: body.videoId,
          last_position_seconds: body.lastPositionSeconds,
          highest_position_seconds: body.highestPositionSeconds,
          percent_watched: Math.min(100, Math.max(0, body.percentWatched)),
          playback_rate: body.playbackRate,
          completed: isCompleted,
          completed_at: isCompleted ? now : null,
          last_watched_at: now,
          updated_at: now,
        },
        { onConflict: 'user_id,video_id' },
      )

    if (error) {
      console.error('academy/videos/progress POST error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, completed: isCompleted })
  } catch (err) {
    console.error('academy/videos/progress POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
