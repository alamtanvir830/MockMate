'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  type DailyStats,
  type SessionResult,
  SAMPLE_PASSAGE,
  splitIntoChunks,
  DailyStatsCard,
  CompleteCard,
  ReadingView,
} from './components'

type Phase = 'setup' | 'reading' | 'complete'

export default function ReadingSpeedPage() {
  // Setup state
  const [text, setText] = useState('')
  const [wpm, setWpm] = useState(300)
  const [chunkSize, setChunkSize] = useState(1)
  const [countdownSecs, setCountdownSecs] = useState(3)

  // Reading state
  const [phase, setPhase] = useState<Phase>('setup')
  const [chunks, setChunks] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [pauseCount, setPauseCount] = useState(0)
  const [startingWpm, setStartingWpm] = useState(300)
  const [currentWpm, setCurrentWpm] = useState(300)
  const [highestWpm, setHighestWpm] = useState(300)
  const [startTime, setStartTime] = useState<number>(0)

  // Complete state
  const [result, setResult] = useState<SessionResult | null>(null)

  // Daily stats
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  // Refs (avoid stale closures in timers)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const chunksRef = useRef<string[]>([])
  const wpmRef = useRef(300)
  const isPausedRef = useRef(false)
  const highestWpmRef = useRef(300)
  const currentIndexRef = useRef(0)
  const startTimeRef = useRef<number>(0)
  const pauseCountRef = useRef(0)
  const chunkSizeRef = useRef(1)
  const startingWpmRef = useRef(300)

  // Keep refs in sync with state
  useEffect(() => { wpmRef.current = currentWpm }, [currentWpm])
  useEffect(() => { isPausedRef.current = isPaused }, [isPaused])
  useEffect(() => { highestWpmRef.current = highestWpm }, [highestWpm])
  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])
  useEffect(() => { startTimeRef.current = startTime }, [startTime])
  useEffect(() => { pauseCountRef.current = pauseCount }, [pauseCount])
  useEffect(() => { chunkSizeRef.current = chunkSize }, [chunkSize])
  useEffect(() => { startingWpmRef.current = startingWpm }, [startingWpm])

  useEffect(() => {
    fetchDailyStats()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer()
      clearCountdown()
    }
  }, [])

  async function fetchDailyStats() {
    setStatsLoading(true)
    try {
      const res = await fetch('/api/reading-speed/sessions')
      if (res.ok) {
        const data = await res.json() as DailyStats
        setDailyStats(data)
      }
    } catch {
      // silently fail
    } finally {
      setStatsLoading(false)
    }
  }

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function clearCountdown() {
    if (countdownRef.current) {
      clearTimeout(countdownRef.current)
      countdownRef.current = null
    }
  }

  function startAdvancing(fromIndex: number) {
    clearTimer()
    const theChunks = chunksRef.current

    function advance() {
      if (isPausedRef.current) return
      setCurrentIndex(prev => {
        const next = prev + 1
        if (next >= theChunks.length) {
          clearTimer()
          timerRef.current = setTimeout(() => handleCompleteSession(), 0)
          return prev
        }
        const chunk = theChunks[next]
        const wordCount = Math.max(1, chunk.split(/\s+/).length)
        const baseMs = (60 / wpmRef.current) * 1000 * wordCount
        const lastChar = chunk[chunk.length - 1] ?? ''
        let delay = baseMs
        if (/,$/.test(lastChar)) delay = baseMs * 1.4
        else if (/[;:]$/.test(lastChar)) delay = baseMs * 1.6
        else if (/[.!?]$/.test(lastChar)) delay = baseMs * 2.0

        timerRef.current = setTimeout(advance, delay)
        currentIndexRef.current = next

        if (wpmRef.current > highestWpmRef.current) {
          highestWpmRef.current = wpmRef.current
          setHighestWpm(wpmRef.current)
        }
        return next
      })
    }

    const firstChunk = theChunks[fromIndex] ?? ''
    const wordCount = Math.max(1, firstChunk.split(/\s+/).length)
    const baseMs = (60 / wpmRef.current) * 1000 * wordCount
    const lastChar = firstChunk[firstChunk.length - 1] ?? ''
    let firstDelay = baseMs
    if (/,$/.test(lastChar)) firstDelay = baseMs * 1.4
    else if (/[;:]$/.test(lastChar)) firstDelay = baseMs * 1.6
    else if (/[.!?]$/.test(lastChar)) firstDelay = baseMs * 2.0

    timerRef.current = setTimeout(advance, firstDelay)
  }

  function handleCompleteSession() {
    const durationSecs = Math.round((Date.now() - startTimeRef.current) / 1000)
    const idx = currentIndexRef.current
    const theChunks = chunksRef.current
    const wordsRead = theChunks.slice(0, idx + 1).join(' ').split(/\s+/).filter(Boolean).length
    const totalWords = theChunks.join(' ').split(/\s+/).filter(Boolean).length
    const pct = totalWords > 0 ? Math.min(100, (wordsRead / totalWords) * 100) : 0
    const qualifies = totalWords >= 100 && pct >= 90 && durationSecs >= 20

    const sessionResult: SessionResult = {
      sourceWordCount: totalWords,
      completedWordCount: wordsRead,
      completionPercentage: parseFloat(pct.toFixed(2)),
      startingWpm: startingWpmRef.current,
      endingWpm: wpmRef.current,
      highestWpm: highestWpmRef.current,
      chunkSize: chunkSizeRef.current,
      durationSeconds: durationSecs,
      pauseCount: pauseCountRef.current,
      completed: idx >= theChunks.length - 1,
      qualifiesForDailyPractice: qualifies,
    }

    setResult(sessionResult)
    setPhase('complete')
    saveSession(sessionResult)
  }

  async function saveSession(sessionResult: SessionResult) {
    try {
      const today = new Date().toISOString().split('T')[0]
      await fetch('/api/reading-speed/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sessionResult, clientLocalDate: today }),
      })
      await fetchDailyStats()
    } catch {
      // silently fail
    }
  }

  function startReading() {
    const theChunks = splitIntoChunks(text, chunkSize)
    setChunks(theChunks)
    chunksRef.current = theChunks
    setCurrentIndex(0)
    currentIndexRef.current = 0
    setIsPaused(false)
    isPausedRef.current = false
    setPauseCount(0)
    pauseCountRef.current = 0
    setStartingWpm(wpm)
    startingWpmRef.current = wpm
    setCurrentWpm(wpm)
    wpmRef.current = wpm
    setHighestWpm(wpm)
    highestWpmRef.current = wpm

    if (countdownSecs > 0) {
      setCountdown(countdownSecs)
      setPhase('reading')
      let remaining = countdownSecs
      function tick() {
        remaining -= 1
        if (remaining <= 0) {
          setCountdown(null)
          const now = Date.now()
          setStartTime(now)
          startTimeRef.current = now
          startAdvancing(0)
        } else {
          setCountdown(remaining)
          countdownRef.current = setTimeout(tick, 1000)
        }
      }
      countdownRef.current = setTimeout(tick, 1000)
    } else {
      setCountdown(null)
      setPhase('reading')
      const now = Date.now()
      setStartTime(now)
      startTimeRef.current = now
      startAdvancing(0)
    }
  }

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const next = !prev
      isPausedRef.current = next
      if (next) {
        clearTimer()
        setPauseCount(c => {
          pauseCountRef.current = c + 1
          return c + 1
        })
      } else {
        startAdvancing(currentIndexRef.current)
      }
      return next
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const goBack = useCallback(() => {
    clearTimer()
    setCurrentIndex(prev => {
      const next = Math.max(0, prev - 1)
      currentIndexRef.current = next
      if (!isPausedRef.current) startAdvancing(next)
      return next
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const goForward = useCallback(() => {
    clearTimer()
    const len = chunksRef.current.length
    setCurrentIndex(prev => {
      const next = Math.min(len - 1, prev + 1)
      currentIndexRef.current = next
      if (!isPausedRef.current) startAdvancing(next)
      return next
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const adjustWpm = useCallback((delta: number) => {
    setCurrentWpm(prev => {
      const next = Math.min(1000, Math.max(100, prev + delta))
      wpmRef.current = next
      if (!isPausedRef.current) {
        clearTimer()
        startAdvancing(currentIndexRef.current)
      }
      return next
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const restart = useCallback(() => {
    clearTimer()
    clearCountdown()
    setCurrentIndex(0)
    currentIndexRef.current = 0
    setIsPaused(false)
    isPausedRef.current = false
    startAdvancing(0)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const endSession = useCallback(() => {
    clearTimer()
    clearCountdown()
    handleCompleteSession()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    if (phase !== 'reading') return
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      switch (e.key) {
        case ' ': e.preventDefault(); togglePause(); break
        case 'ArrowLeft': e.preventDefault(); goBack(); break
        case 'ArrowRight': e.preventDefault(); goForward(); break
        case 'ArrowUp': e.preventDefault(); adjustWpm(+25); break
        case 'ArrowDown': e.preventDefault(); adjustWpm(-25); break
        case 'r': case 'R': restart(); break
        case 'Escape': endSession(); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, togglePause, goBack, goForward, adjustWpm, restart, endSession])

  // Text stats (setup phase)
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : []
  const wordCount = words.length
  const charCount = text.length
  const estMinAtWpm = wpm > 0 ? wordCount / wpm : 0
  const normalReadMin = wpm > 0 ? wordCount / 200 : 0

  // Reading progress
  const progress = chunks.length > 0 ? ((currentIndex + 1) / chunks.length) * 100 : 0
  const wordsRead = chunks.slice(0, currentIndex + 1).join(' ').split(/\s+/).filter(Boolean).length
  const totalWords = chunks.join(' ').split(/\s+/).filter(Boolean).length
  const wordsRemaining = Math.max(0, totalWords - wordsRead)
  const timeRemainingMs = currentWpm > 0 ? (wordsRemaining / currentWpm) * 60000 : 0
  const timeRemainingStr = timeRemainingMs < 60000
    ? `${Math.ceil(timeRemainingMs / 1000)}s`
    : `${Math.ceil(timeRemainingMs / 60000)}m`

  // ─── Complete phase ──────────────────────────────────────────────────────────

  if (phase === 'complete' && result) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reading Speed</h1>
          <p className="text-sm text-slate-500 mt-1">Session complete</p>
        </div>
        <DailyStatsCard stats={dailyStats} loading={statsLoading} />
        <CompleteCard
          result={result}
          onReadAgain={() => {
            setCurrentIndex(0)
            currentIndexRef.current = 0
            setIsPaused(false)
            isPausedRef.current = false
            setPauseCount(0)
            pauseCountRef.current = 0
            setCurrentWpm(startingWpm)
            wpmRef.current = startingWpm
            setHighestWpm(startingWpm)
            highestWpmRef.current = startingWpm
            const now = Date.now()
            setStartTime(now)
            startTimeRef.current = now
            setPhase('reading')
            startAdvancing(0)
          }}
          onNewText={() => {
            clearTimer()
            setPhase('setup')
          }}
        />
      </div>
    )
  }

  // ─── Reading phase ───────────────────────────────────────────────────────────

  if (phase === 'reading') {
    return (
      <ReadingView
        chunks={chunks}
        currentIndex={currentIndex}
        currentWpm={currentWpm}
        chunkSize={chunkSize}
        isPaused={isPaused}
        countdown={countdown}
        wordsRead={wordsRead}
        totalWords={totalWords}
        progress={progress}
        timeRemainingStr={timeRemainingStr}
        onAdjustWpm={adjustWpm}
        onTogglePause={togglePause}
        onGoBack={goBack}
        onGoForward={goForward}
        onRestart={restart}
        onEndSession={endSession}
      />
    )
  }

  // ─── Setup phase ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reading Speed</h1>
        <p className="text-sm text-slate-500 mt-1">
          Paste any passage and train yourself to process text at a faster pace, one word at a time.
        </p>
      </div>

      <DailyStatsCard stats={dailyStats} loading={statsLoading} />

      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div>
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste a passage, article, chapter, or practice text here..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            {wordCount} words · {charCount} characters
            {wordCount > 0 && ` · Est. ${estMinAtWpm < 1 ? `${Math.round(estMinAtWpm * 60)}s` : `${estMinAtWpm.toFixed(1)} min`} at ${wpm} WPM · Normal reading: ${normalReadMin < 1 ? `${Math.round(normalReadMin * 60)}s` : `${normalReadMin.toFixed(1)} min`}`}
          </p>
        </div>

        {/* Controls row */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Words per minute</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={100}
                max={1000}
                step={25}
                value={wpm}
                onChange={e => setWpm(Number(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <input
                type="number"
                min={100}
                max={1000}
                step={25}
                value={wpm}
                onChange={e => setWpm(Math.min(1000, Math.max(100, Number(e.target.value))))}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm text-center font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Words shown at once</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setChunkSize(n)}
                  className={cn(
                    'flex-1 rounded-lg border py-1.5 text-sm font-semibold transition-colors',
                    chunkSize === n
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Start countdown</label>
            <select
              value={countdownSecs}
              onChange={e => setCountdownSecs(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={0}>Off</option>
              <option value={3}>3s</option>
              <option value={5}>5s</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={startReading}
            disabled={wordCount < 5}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Start Reading
          </button>
          <button
            onClick={() => setText(SAMPLE_PASSAGE)}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-5 py-2.5 transition-colors"
          >
            Use Sample Passage
          </button>
        </div>
      </div>
    </div>
  )
}
