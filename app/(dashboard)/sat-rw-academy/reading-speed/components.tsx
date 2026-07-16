'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─── Types (exported) ─────────────────────────────────────────────────────────

export interface DailyStats {
  streak: number
  totalSessions: number
  highestWpm: number
  lastSession: { completedAt: string; wpm: number } | null
  todayComplete: boolean
}

export interface SessionResult {
  sourceWordCount: number
  completedWordCount: number
  completionPercentage: number
  startingWpm: number
  endingWpm: number
  highestWpm: number
  chunkSize: number
  durationSeconds: number
  pauseCount: number
  completed: boolean
  qualifiesForDailyPractice: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

export function splitIntoChunks(text: string, size: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (size === 1) return words
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(' '))
  }
  return chunks
}

// ─── ORP Word Display ─────────────────────────────────────────────────────────

export function OrpWord({ word }: { word: string }) {
  if (word.length <= 2) {
    return <span className="text-slate-900">{word}</span>
  }
  const pivot = Math.min(Math.floor(word.length / 2), Math.ceil(word.length * 0.4))
  const before = word.slice(0, pivot)
  const center = word[pivot]
  const after = word.slice(pivot + 1)
  return (
    <>
      <span className="text-slate-900">{before}</span>
      <span className="text-emerald-600 font-bold">{center}</span>
      <span className="text-slate-500">{after}</span>
    </>
  )
}

// ─── Stat tile ────────────────────────────────────────────────────────────────

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <p className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
    </div>
  )
}

// ─── Daily Stats Card ─────────────────────────────────────────────────────────

export function DailyStatsCard({ stats, loading }: { stats: DailyStats | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/3 mb-3" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-700">Daily Practice</h2>
        {stats?.todayComplete ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Completed today
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-500">
            Not yet completed
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-xs text-slate-400 mb-0.5">Streak</p>
          <p className="text-base font-bold text-slate-800">
            {stats ? (stats.streak > 0 ? `${stats.streak} day${stats.streak !== 1 ? 's' : ''} 🔥` : '—') : '—'}
          </p>
          <p className="text-[10px] text-slate-400">{stats?.streak === 0 ? 'Start your streak' : 'keep it up'}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-xs text-slate-400 mb-0.5">Sessions</p>
          <p className="text-base font-bold text-slate-800">{stats?.totalSessions ?? '—'}</p>
          <p className="text-[10px] text-slate-400">completed</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-xs text-slate-400 mb-0.5">Best speed</p>
          <p className="text-base font-bold text-slate-800">{stats?.highestWpm ? `${stats.highestWpm} WPM` : '—'}</p>
          <p className="text-[10px] text-slate-400">personal best</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-xs text-slate-400 mb-0.5">Last session</p>
          <p className="text-base font-bold text-slate-800 truncate">
            {stats?.lastSession ? `${stats.lastSession.wpm} WPM` : '—'}
          </p>
          <p className="text-[10px] text-slate-400 truncate">
            {stats?.lastSession ? formatRelativeTime(stats.lastSession.completedAt) : 'No sessions yet'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Complete Card ────────────────────────────────────────────────────────────

export function CompleteCard({
  result,
  onReadAgain,
  onNewText,
}: {
  result: SessionResult
  onReadAgain: () => void
  onNewText: () => void
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900">Reading Complete ✓</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Stat label="Words read" value={`${result.completedWordCount}`} />
        <Stat label="Speed" value={`${result.endingWpm} WPM`} />
        <Stat label="Duration" value={formatDuration(result.durationSeconds)} />
        <Stat label="Chunk size" value={`${result.chunkSize} word${result.chunkSize !== 1 ? 's' : ''}`} />
        <Stat label="Completion" value={`${result.completionPercentage.toFixed(0)}%`} />
        <Stat label="Pauses" value={`${result.pauseCount}`} />
        <Stat label="Highest WPM" value={`${result.highestWpm}`} />
        <Stat label="Source words" value={`${result.sourceWordCount}`} />
      </div>

      {result.qualifiesForDailyPractice && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700 font-medium">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Counts toward today&apos;s daily practice!
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onReadAgain}
          className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
        >
          Read Again
        </button>
        <button
          onClick={onNewText}
          className="flex-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2.5 transition-colors"
        >
          Practice With New Text
        </button>
        <Link href="/dashboard" className="flex-1">
          <button className="w-full rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2.5 transition-colors">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}

// ─── Sample Passage ───────────────────────────────────────────────────────────

export const SAMPLE_PASSAGE = `The deep ocean remains one of the least explored regions on Earth. Covering more than half of the planet's surface, the abyssal zones begin at roughly 4,000 meters below sea level, where sunlight cannot penetrate and temperatures hover near freezing. Despite these harsh conditions, scientists have discovered extraordinary communities of organisms clustered around hydrothermal vents — fissures in the ocean floor that release superheated, mineral-rich water.

These vent ecosystems operate independently of photosynthesis. Instead of relying on sunlight, the organisms here depend on chemosynthesis, a process by which certain bacteria convert chemicals such as hydrogen sulfide into organic matter. Tube worms, clams, shrimp, and crabs have all evolved remarkable adaptations to thrive in this environment, some of which were entirely unknown to science before submersible exploration began in the 1970s.

The discovery of deep-sea vent communities reshaped our understanding of the conditions necessary for life. Before these findings, most biologists assumed that life required access to solar energy at some point in its food chain. The vents demonstrated that life can sustain itself on chemical energy alone, which has significant implications for the search for life beyond Earth. Several moons in our solar system, including Europa and Enceladus, are believed to harbor liquid water beneath icy surfaces, and scientists now consider them plausible candidates for hosting similar chemosynthetic ecosystems.`

// ─── Reading View ─────────────────────────────────────────────────────────────

interface ReadingViewProps {
  chunks: string[]
  currentIndex: number
  currentWpm: number
  chunkSize: number
  isPaused: boolean
  countdown: number | null
  wordsRead: number
  totalWords: number
  progress: number
  timeRemainingStr: string
  onAdjustWpm: (delta: number) => void
  onTogglePause: () => void
  onGoBack: () => void
  onGoForward: () => void
  onRestart: () => void
  onEndSession: () => void
}

export function ReadingView({
  chunks,
  currentIndex,
  currentWpm,
  chunkSize,
  isPaused,
  countdown,
  wordsRead,
  totalWords,
  progress,
  timeRemainingStr,
  onAdjustWpm,
  onTogglePause,
  onGoBack,
  onGoForward,
  onRestart,
  onEndSession,
}: ReadingViewProps) {
  const currentChunk = chunks[currentIndex] ?? ''

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAdjustWpm(-25)}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold"
          >−</button>
          <span className="text-sm font-bold text-slate-800 w-16 text-center">{currentWpm} WPM</span>
          <button
            onClick={() => onAdjustWpm(+25)}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold"
          >+</button>
        </div>
        <span className="text-xs text-slate-400 hidden sm:block">|</span>
        <span className="text-xs text-slate-500">{wordsRead} / {totalWords} words</span>
        <span className="text-xs text-slate-400 hidden sm:block">|</span>
        <span className="text-xs text-slate-500">{progress.toFixed(0)}%</span>
        <span className="text-xs text-slate-400 hidden sm:block">|</span>
        <span className="text-xs text-slate-500">{timeRemainingStr} left</span>
      </div>

      {/* Word display */}
      <div className="bg-white border border-slate-200 rounded-xl flex items-center justify-center" style={{ minHeight: '200px' }}>
        {countdown !== null ? (
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-2">Starting in</p>
            <p className="text-6xl font-bold text-emerald-600">{countdown}</p>
          </div>
        ) : (
          <div className="text-center px-8">
            <p
              className="font-bold text-slate-900 select-none"
              style={{ fontSize: chunkSize === 1 ? '3.5rem' : chunkSize === 2 ? '2.5rem' : '2rem', lineHeight: 1.2 }}
            >
              {chunkSize === 1
                ? <OrpWord word={currentChunk} />
                : <span>{currentChunk}</span>
              }
            </p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={onTogglePause}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
            isPaused
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-white',
          )}
        >
          {isPaused ? (
            <>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Resume
            </>
          ) : (
            <>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
              Pause
            </>
          )}
        </button>
        <button onClick={onGoBack} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors">
          ← Back
        </button>
        <button onClick={onGoForward} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors">
          Forward →
        </button>
        <button onClick={onRestart} className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors">
          Restart
        </button>
        <button onClick={onEndSession} className="rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition-colors">
          End Session
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        Space: pause · ← →: step · ↑ ↓: speed · R: restart · Esc: end
      </p>
    </div>
  )
}
