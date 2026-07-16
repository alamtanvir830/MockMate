'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface VideoPlayerProps {
  src: string
  captionsSrc?: string
  videoId: string
  title: string
  initialProgress?: {
    lastPositionSeconds: number
    percentWatched: number
    completed: boolean
    playbackRate: number
  }
  onProgressUpdate?: (data: {
    lastPositionSeconds: number
    highestPositionSeconds: number
    percentWatched: number
    playbackRate: number
    completed: boolean
  }) => void
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2] as const

function formatTime(s: number): string {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function VideoPlayer({
  src,
  captionsSrc,
  videoId,
  title,
  initialProgress,
  onProgressUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const saveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const highestPositionRef = useRef(0)
  const lastSavedRef = useRef(-1)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [captionsOn, setCaptionsOn] = useState(() => {
    try { return localStorage.getItem('academy-captions') === 'true' } catch { return false }
  })
  const [speed, setSpeed] = useState<number>(initialProgress?.playbackRate ?? 1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [completed, setCompleted] = useState(initialProgress?.completed ?? false)
  const [resumed, setResumed] = useState(false)

  // Show controls briefly then hide during playback
  const bringUpControls = useCallback(() => {
    setShowControls(true)
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false)
    }, 3000)
  }, [])

  // Persist progress to parent / API
  const saveProgress = useCallback(() => {
    const video = videoRef.current
    if (!video || duration === 0) return
    const pos = video.currentTime
    if (Math.abs(pos - lastSavedRef.current) < 1) return
    lastSavedRef.current = pos

    const pct = Math.min(100, (pos / duration) * 100)
    const isNowCompleted = pct >= 90 || pos >= duration - 10
    if (isNowCompleted && !completed) setCompleted(true)

    onProgressUpdate?.({
      lastPositionSeconds: pos,
      highestPositionSeconds: Math.max(highestPositionRef.current, pos),
      percentWatched: Math.round(pct * 10) / 10,
      playbackRate: speed,
      completed: isNowCompleted || completed,
    })
  }, [duration, completed, speed, onProgressUpdate])

  // Initial setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoadedMeta = () => {
      setDuration(video.duration)
      video.playbackRate = speed

      // Resume near saved position, but not if already near end on a completed video
      const savedPos = initialProgress?.lastPositionSeconds ?? 0
      if (savedPos > 5) {
        const isNearEnd = initialProgress?.completed && savedPos >= video.duration - 15
        if (!isNearEnd) {
          video.currentTime = savedPos
          setResumed(true)
        }
      }
    }

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (video.currentTime > highestPositionRef.current) {
        highestPositionRef.current = video.currentTime
      }
    }

    const onPlay = () => setPlaying(true)
    const onPause = () => { setPlaying(false); saveProgress() }
    const onEnded = () => { setPlaying(false); saveProgress() }
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)

    video.addEventListener('loadedmetadata', onLoadedMeta)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [initialProgress, speed, saveProgress])

  // Periodic save every 15 seconds
  useEffect(() => {
    saveTimerRef.current = setInterval(saveProgress, 15000)
    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current)
      saveProgress() // save on unmount
    }
  }, [saveProgress])

  // Apply captions track visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    for (const track of Array.from(video.textTracks)) {
      track.mode = captionsOn ? 'showing' : 'hidden'
    }
    try { localStorage.setItem('academy-captions', String(captionsOn)) } catch { /* ignore */ }
  }, [captionsOn])

  // Keyboard shortcuts — only when not in a text field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (['input', 'textarea', 'select'].includes(tag)) return
      if ((e.target as HTMLElement)?.isContentEditable) return

      const video = videoRef.current
      if (!video) return

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          video.paused ? video.play() : video.pause()
          bringUpControls()
          break
        case 'ArrowLeft':
          e.preventDefault()
          video.currentTime = Math.max(0, video.currentTime - 5)
          bringUpControls()
          break
        case 'ArrowRight':
          e.preventDefault()
          video.currentTime = Math.min(video.duration, video.currentTime + 5)
          bringUpControls()
          break
        case 'm':
        case 'M':
          e.preventDefault()
          video.muted = !video.muted
          setMuted(video.muted)
          break
        case 'c':
        case 'C':
          e.preventDefault()
          setCaptionsOn(p => !p)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bringUpControls])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    video.paused ? video.play() : video.pause()
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Number(e.target.value)
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = v
      videoRef.current.muted = v === 0
    }
    setVolume(v)
    setMuted(v === 0)
  }

  function handleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    if (!video.muted && volume === 0) { video.volume = 0.5; setVolume(0.5) }
  }

  function handleSpeed(e: React.ChangeEvent<HTMLSelectElement>) {
    const s = Number(e.target.value)
    if (videoRef.current) videoRef.current.playbackRate = s
    setSpeed(s)
  }

  function toggleFullscreen() {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  function togglePip() {
    const video = videoRef.current
    if (!video) return
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {})
    } else {
      video.requestPictureInPicture?.().catch(() => {})
    }
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

  const hasPip =
    typeof document !== 'undefined' &&
    'pictureInPictureEnabled' in document &&
    document.pictureInPictureEnabled

  return (
    <div className="space-y-2">
      {/* Resume notice */}
      {resumed && (
        <p className="text-xs text-slate-500">
          Resuming from {formatTime(initialProgress?.lastPositionSeconds ?? 0)}
        </p>
      )}

      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden bg-slate-900 group"
        style={{ aspectRatio: '16/9' }}
        onMouseMove={bringUpControls}
        onMouseLeave={() => { if (playing) setShowControls(false) }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          aria-label={title}
          crossOrigin="anonymous"
        >
          {captionsSrc && (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang="en"
              label="English"
              default={captionsOn}
            />
          )}
        </video>

        {/* Click-to-play overlay */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlay}
          aria-hidden="true"
        />

        {/* Controls bar */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pt-8 pb-3 transition-opacity',
            reducedMotion.current ? '' : 'duration-200',
            showControls || !playing ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          {/* Seek bar */}
          <div className="relative mb-2 flex items-center">
            <div className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full pointer-events-none" style={{ width: `${progressPct}%`, height: '3px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek video"
              className="w-full h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Play/pause */}
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="text-white hover:text-emerald-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {playing ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span className="text-white text-xs tabular-nums select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Volume */}
            <button
              onClick={handleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="text-white hover:text-emerald-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {muted || volume === 0 ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              aria-label="Volume"
              className="w-16 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />

            {/* Speed */}
            <select
              value={speed}
              onChange={handleSpeed}
              aria-label="Playback speed"
              className="bg-black/60 text-white text-xs rounded px-1 py-0.5 border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
            >
              {SPEEDS.map(s => (
                <option key={s} value={s}>{s}x</option>
              ))}
            </select>

            {/* Captions */}
            {captionsSrc && (
              <button
                onClick={() => setCaptionsOn(p => !p)}
                aria-label={captionsOn ? 'Disable captions' : 'Enable captions'}
                aria-pressed={captionsOn}
                className={cn(
                  'text-xs font-bold px-1.5 py-0.5 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                  captionsOn ? 'bg-white text-black' : 'text-white/70 hover:text-white',
                )}
              >
                CC
              </button>
            )}

            {/* PiP */}
            {hasPip && (
              <button
                onClick={togglePip}
                aria-label="Picture in picture"
                className="text-white/70 hover:text-white transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V5h18v14.02z" />
                </svg>
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              className="text-white/70 hover:text-white transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {isFullscreen ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Completion badge */}
        {completed && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            Video completed
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      <p className="text-[11px] text-slate-400">
        Space: play/pause · ←/→: skip 5s · M: mute · C: captions · F: full screen
      </p>
    </div>
  )
}
