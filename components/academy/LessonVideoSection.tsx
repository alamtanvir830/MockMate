'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { VideoPlayer } from './VideoPlayer'
import { VideoTranscript } from './VideoTranscript'
import { VideoCheckQuestions } from './VideoCheckQuestions'
import { getVideoCheckQuestions } from '@/lib/academy/videos/registry'
import type { LessonVideoMeta, VideoProgress } from '@/lib/academy/videos/types'

interface VideoResources {
  videoUrl: string | null
  captionsUrl: string | null
  durationSeconds: number | null
  progress: VideoProgress | null
}

interface Props {
  lessonSlug: string
}

export function LessonVideoSection({ lessonSlug }: Props) {
  const [video, setVideo] = useState<LessonVideoMeta | null | undefined>(undefined)
  const [resources, setResources] = useState<VideoResources | null>(null)
  const [loadError, setLoadError] = useState(false)
  const saveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load video metadata
  useEffect(() => {
    fetch(`/api/academy/videos?lessonSlug=${encodeURIComponent(lessonSlug)}`)
      .then(r => r.json())
      .then(({ video: v }) => setVideo(v ?? null))
      .catch(() => setVideo(null))
  }, [lessonSlug])

  // Load resources (signed URLs + progress) once we know a video exists
  useEffect(() => {
    if (!video?.id) return
    fetch(`/api/academy/videos/progress?videoId=${encodeURIComponent(video.id)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setLoadError(true); return }
        setResources({
          videoUrl: data.videoUrl,
          captionsUrl: data.captionsUrl,
          durationSeconds: data.durationSeconds,
          progress: data.progress,
        })
      })
      .catch(() => setLoadError(true))
  }, [video?.id])

  const handleProgressUpdate = useCallback((data: {
    lastPositionSeconds: number
    highestPositionSeconds: number
    percentWatched: number
    playbackRate: number
    completed: boolean
  }) => {
    if (!video?.id) return
    if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current)
    saveDebounceRef.current = setTimeout(() => {
      fetch('/api/academy/videos/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: video.id, ...data }),
      }).catch(() => { /* non-blocking */ })
    }, 500)
  }, [video?.id])

  // Not yet fetched
  if (video === undefined) return null

  // No published video for this lesson
  if (video === null) return null

  // Error loading resources
  if (loadError) return null

  // Waiting for signed URLs
  if (resources === null) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Video Lesson</h2>
        <div className="w-full bg-slate-100 rounded-xl animate-pulse" style={{ aspectRatio: '16/9' }} />
      </div>
    )
  }

  // No video URL yet (uploaded to storage but signed URL failed)
  if (!resources.videoUrl) return null

  const checkQuestions = getVideoCheckQuestions(video.videoKey)

  const initialProgress = resources.progress
    ? {
        lastPositionSeconds: resources.progress.lastPositionSeconds,
        percentWatched: resources.progress.percentWatched,
        completed: resources.progress.completed,
        playbackRate: resources.progress.playbackRate,
      }
    : undefined

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">Video Lesson</h2>
        <p className="text-sm text-slate-500 mt-0.5">{video.title}</p>
      </div>

      {/* Player */}
      <VideoPlayer
        src={resources.videoUrl}
        captionsSrc={resources.captionsUrl ?? undefined}
        videoId={video.id}
        title={video.title}
        initialProgress={initialProgress}
        onProgressUpdate={handleProgressUpdate}
      />

      {/* Transcript */}
      {video.transcript && <VideoTranscript transcript={video.transcript} />}

      {/* Check Your Understanding */}
      {checkQuestions.length > 0 && (
        <VideoCheckQuestions questions={checkQuestions} videoKey={video.videoKey} />
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-4">
        MockMate is not affiliated with, endorsed by, or sponsored by College Board.
        SAT is a trademark registered by College Board, which is not affiliated with
        and does not endorse MockMate. All MockMate questions and instructional materials
        are independently created for practice purposes.
      </p>
    </div>
  )
}
