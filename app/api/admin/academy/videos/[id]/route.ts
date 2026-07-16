import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

async function requireAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthenticated', status: 401 }
  if (user.email !== ADMIN_EMAIL) return { error: 'Forbidden', status: 403 }
  return { error: null, status: 200 }
}

type PatchAction =
  | 'mark_script_reviewed'
  | 'mark_narration_ready'
  | 'mark_rendered'
  | 'mark_accuracy_reviewed'
  | 'publish'
  | 'unpublish'
  | 'archive'
  | 'confirm_original_content'
  | 'update_metadata'

interface PatchBody {
  action: PatchAction
  storagePath?: string
  captionsStoragePath?: string
  thumbnailStoragePath?: string
  transcript?: string
  durationSeconds?: number
  scriptVersion?: number
  videoVersion?: number
  title?: string
  description?: string
}

// PATCH /api/admin/academy/videos/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient()
    const { error: authError, status: authStatus } = await requireAdmin(supabase)
    if (authError) return NextResponse.json({ error: authError }, { status: authStatus })

    const { id } = await params
    const body = await req.json() as PatchBody

    const now = new Date().toISOString()
    let updates: Record<string, unknown> = { updated_at: now }

    switch (body.action) {
      case 'mark_script_reviewed':
        updates.production_status = 'script_reviewed'
        break

      case 'mark_narration_ready':
        updates.production_status = 'narration_ready'
        break

      case 'mark_rendered':
        if (!body.storagePath) {
          return NextResponse.json({ error: 'storagePath required for mark_rendered' }, { status: 400 })
        }
        updates.production_status = 'rendered'
        updates.storage_path = body.storagePath
        if (body.captionsStoragePath) updates.captions_storage_path = body.captionsStoragePath
        if (body.thumbnailStoragePath) updates.thumbnail_storage_path = body.thumbnailStoragePath
        if (body.durationSeconds) updates.duration_seconds = body.durationSeconds
        break

      case 'mark_accuracy_reviewed':
        updates.production_status = 'accuracy_review'
        updates.accuracy_reviewed = true
        break

      case 'confirm_original_content':
        updates.original_content_confirmed = true
        break

      case 'publish': {
        // Validate before publishing
        const { data: video, error: fetchError } = await supabase
          .from('sat_rw_lesson_videos')
          .select('storage_path, captions_storage_path, transcript, duration_seconds, accuracy_reviewed, original_content_confirmed')
          .eq('id', id)
          .single()

        if (fetchError || !video) {
          return NextResponse.json({ error: 'Video not found' }, { status: 404 })
        }

        const validationErrors: string[] = []
        if (!video.storage_path) validationErrors.push('Video file not uploaded (storage_path is null)')
        if (!video.captions_storage_path) validationErrors.push('Captions not uploaded (captions_storage_path is null)')
        if (!video.transcript?.trim()) validationErrors.push('Transcript is empty')
        if (!video.accuracy_reviewed) validationErrors.push('Accuracy review not completed')
        if (!video.original_content_confirmed) validationErrors.push('Original content not confirmed')

        if (validationErrors.length > 0) {
          return NextResponse.json({ error: 'Cannot publish', validationErrors }, { status: 422 })
        }

        updates.production_status = 'published'
        updates.published_at = now
        break
      }

      case 'unpublish':
        updates.production_status = 'accuracy_review'
        updates.published_at = null
        break

      case 'archive':
        updates.production_status = 'archived'
        updates.archived_at = now
        break

      case 'update_metadata':
        if (body.storagePath !== undefined) updates.storage_path = body.storagePath
        if (body.captionsStoragePath !== undefined) updates.captions_storage_path = body.captionsStoragePath
        if (body.thumbnailStoragePath !== undefined) updates.thumbnail_storage_path = body.thumbnailStoragePath
        if (body.transcript !== undefined) updates.transcript = body.transcript
        if (body.durationSeconds !== undefined) updates.duration_seconds = body.durationSeconds
        if (body.scriptVersion !== undefined) updates.script_version = body.scriptVersion
        if (body.videoVersion !== undefined) updates.video_version = body.videoVersion
        if (body.title !== undefined) updates.title = body.title
        if (body.description !== undefined) updates.description = body.description
        break

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    const { data, error: updateError } = await supabase
      .from('sat_rw_lesson_videos')
      .update(updates)
      .eq('id', id)
      .select('id, production_status, published_at')
      .single()

    if (updateError) {
      console.error('admin/academy/videos PATCH error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id, productionStatus: data.production_status, publishedAt: data.published_at })
  } catch (err) {
    console.error('admin/academy/videos PATCH error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
