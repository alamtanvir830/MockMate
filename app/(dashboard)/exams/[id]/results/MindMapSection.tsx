'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { MindMapData } from '@/lib/ai/generate-mind-map'
import { MindMapSVG, downloadPNG } from '@/components/mind-map/MindMapRenderer'

// ─── Section component ─────────────────────────────────────────────────────────

type UIState = 'idle' | 'loading' | 'ready' | 'error'

interface Props {
  attemptId: string
  incorrectQuestions: Array<{
    question_text: string
    correct_answer: string
    explanation_correct: string | null
  }>
  /** Total questions loaded for this attempt (0 if data failed to load) */
  totalQuestions?: number
  /** True only when every question has a recorded answer */
  allAnswered?: boolean
  subject: string
  examTitle: string
  language?: string
}

export function MindMapSection({
  attemptId,
  incorrectQuestions,
  totalQuestions = 0,
  allAnswered    = false,
  subject,
  examTitle,
  language,
}: Props) {
  const [state,   setState]   = useState<UIState>('idle')
  const [mindMap, setMindMap] = useState<MindMapData | null>(null)
  const [errMsg,  setErrMsg]  = useState('')
  const [dlBusy,  setDlBusy]  = useState(false)
  const svgRef                = useRef<SVGSVGElement | null>(null)

  const sectionHeader = (
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            className="h-4 w-4 text-violet-500">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        </div>
        <div>
          <CardTitle>AI Mind Map</CardTitle>
          <CardDescription>Turn your missed concepts into a visual study map.</CardDescription>
        </div>
      </div>
    </CardHeader>
  )

  // Only show "perfect score" message when data actually loaded and all questions were right
  const perfectScore = totalQuestions > 0 && allAnswered && incorrectQuestions.length === 0
  if (perfectScore) {
    return (
      <Card>
        {sectionHeader}
        <p className="text-sm text-slate-500 mt-1">No missed concepts to map — great work!</p>
      </Card>
    )
  }

  async function handleGenerate() {
    setState('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/mind-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: incorrectQuestions.map(q => ({
            question_text:      q.question_text,
            correct_answer:     q.correct_answer,
            explanation_correct: q.explanation_correct,
          })),
          subject,
          examTitle,
          attemptId,
          language,
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? `Server error ${res.status}`)
      }
      const d = await res.json()
      setMindMap(d.mindMap)
      setState('ready')
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Failed to generate mind map.')
      setState('error')
    }
  }

  async function handleDownloadPNG() {
    if (!svgRef.current || !mindMap) return
    setDlBusy(true)
    try { await downloadPNG(svgRef.current, mindMap.title || examTitle) }
    catch { /* silently fail */ }
    finally { setDlBusy(false) }
  }

  return (
    <Card>
      {sectionHeader}

      {/* ── Idle ── */}
      {state === 'idle' && (
        <div className="mt-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M10 3v1m0 12v1M3 10H2m1.636-5.364L3 4.05M16.364 4.636l.636-.586M18 10h-1m-1.636 5.364.636.586M4.636 15.364 4 15.95M10 6a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            Generate mind map
          </button>
        </div>
      )}

      {/* ── Loading ── */}
      {state === 'loading' && (
        <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
          <svg className="h-5 w-5 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Analysing your missed concepts…
        </div>
      )}

      {/* ── Error ── */}
      {state === 'error' && (
        <div className="mt-2 space-y-3">
          <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
            {errMsg || 'Something went wrong. Please try again.'}
          </div>
          <button type="button" onClick={handleGenerate}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 underline underline-offset-2">
            Try again
          </button>
        </div>
      )}

      {/* ── Ready ── */}
      {state === 'ready' && mindMap && (
        <div className="mt-4 space-y-4">
          {/* Horizontally scrollable, vertically auto-sizing container */}
          <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 max-h-[680px]">
            <MindMapSVG data={mindMap} svgRef={svgRef} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={dlBusy}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v1.25A1.25 1.25 0 004.25 19h11.5A1.25 1.25 0 0017 17.75V16.5M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" />
              </svg>
              {dlBusy ? 'Downloading…' : 'Download PNG'}
            </button>

            <button type="button" onClick={handleGenerate}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Regenerate
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
