'use client'

import { useState, useRef, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { MindMapData, MindMapBranch } from '@/lib/ai/generate-mind-map'

// ─── Palette ─────────────────────────────────────────────────────────────────

const PALETTE = [
  { stroke: '#6366f1', fill: '#eef2ff' },
  { stroke: '#f59e0b', fill: '#fef3c7' },
  { stroke: '#10b981', fill: '#d1fae5' },
  { stroke: '#ef4444', fill: '#fee2e2' },
  { stroke: '#8b5cf6', fill: '#ede9fe' },
  { stroke: '#0ea5e9', fill: '#e0f2fe' },
  { stroke: '#f97316', fill: '#ffedd5' },
]

// ─── Layout constants ─────────────────────────────────────────────────────────

const SVG_W     = 960
const CX        = SVG_W / 2          // 480 — horizontal center

const CENTRAL_W = 200, CENTRAL_H = 54
const BRANCH_W  = 152, BRANCH_H  = 44
const CHILD_W   = 160, CHILD_H_BASE = 42
const LEAF_LINE = 19   // height per leaf line
const LEAF_PAD  = 8    // padding above/below leaf list within child node

const BR_X_R = CX + 252   // 732 — right branch column center x
const BR_X_L = CX - 252   // 228 — left branch column center x

const GAP_BR_CHILD  = 42  // branch bottom → first child top
const GAP_CHILD_CHILD = 10 // gap between consecutive children
const BRANCH_BLOCK_GAP = 38 // extra space after last child before next branch starts

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChildPos { x: number; y: number; h: number }
interface BranchPos {
  data: MindMapBranch
  side: 'L' | 'R'
  colorIdx: number
  bx: number; by: number
  children: ChildPos[]
}

// ─── Layout calculation ───────────────────────────────────────────────────────

function childNodeHeight(nLeaves: number): number {
  return CHILD_H_BASE + (nLeaves > 0 ? LEAF_PAD + nLeaves * LEAF_LINE + LEAF_PAD : 0)
}

function layoutSide(
  nodes: MindMapBranch[],
  bx: number,
  side: 'L' | 'R',
  startColor: number,
): { positions: BranchPos[]; totalH: number } {
  const positions: BranchPos[] = []
  let y = 0

  nodes.forEach((node, i) => {
    const colorIdx = (startColor + i) % PALETTE.length
    const by = y + BRANCH_H / 2

    // Build child positions
    const children: ChildPos[] = []
    let childTop = by + BRANCH_H / 2 + GAP_BR_CHILD

    ;(node.children ?? []).forEach(child => {
      const h = childNodeHeight(child.children?.length ?? 0)
      children.push({ x: bx, y: childTop + h / 2, h })
      childTop += h + GAP_CHILD_CHILD
    })

    // Total block height: branch + optional children section
    const childrenSection =
      children.length > 0
        ? GAP_BR_CHILD +
          children.reduce((s, c) => s + c.h + GAP_CHILD_CHILD, 0) -
          GAP_CHILD_CHILD
        : 0
    const blockH = BRANCH_H + childrenSection

    positions.push({ data: node, side, colorIdx, bx, by, children })
    y += blockH + BRANCH_BLOCK_GAP
  })

  const totalH = Math.max(0, y - BRANCH_BLOCK_GAP)
  return { positions, totalH }
}

function computeLayout(data: MindMapData) {
  const n = data.nodes.length
  // Right side gets the first ceil(n/2) nodes, left gets the rest
  const rightNodes = data.nodes.slice(0, Math.ceil(n / 2))
  const leftNodes  = data.nodes.slice(Math.ceil(n / 2))

  const right = layoutSide(rightNodes, BR_X_R, 'R', 0)
  const left  = layoutSide(leftNodes,  BR_X_L, 'L', rightNodes.length)

  const maxH   = Math.max(right.totalH, left.totalH, CENTRAL_H + 60)
  const PAD_V  = 60
  const svgH   = maxH + PAD_V * 2
  const centralY = svgH / 2

  // Vertically center each side
  function applyOffset(pos: BranchPos[], sideH: number): BranchPos[] {
    const dy = (maxH - sideH) / 2 + PAD_V
    return pos.map(p => ({
      ...p,
      by: p.by + dy,
      children: p.children.map(c => ({ ...c, y: c.y + dy })),
    }))
  }

  return {
    svgH,
    centralY,
    allBranches: [
      ...applyOffset(right.positions, right.totalH),
      ...applyOffset(left.positions,  left.totalH),
    ],
  }
}

// ─── Text truncation ──────────────────────────────────────────────────────────

function trunc(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

// ─── PNG export ───────────────────────────────────────────────────────────────

async function downloadPNG(svgEl: SVGSVGElement, title: string): Promise<void> {
  const vb   = svgEl.viewBox.baseVal
  const W    = vb.width
  const H    = vb.height
  const SCALE = 2

  const svgData = new XMLSerializer().serializeToString(svgEl)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const url     = URL.createObjectURL(svgBlob)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = W * SCALE
      canvas.height = H * SCALE
      const ctx = canvas.getContext('2d')!
      ctx.scale(SCALE, SCALE)
      ctx.drawImage(img, 0, 0, W, H)
      URL.revokeObjectURL(url)
      const a = document.createElement('a')
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-mind-map.png`
      a.href = canvas.toDataURL('image/png', 1.0)
      a.click()
      resolve()
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')) }
    img.src = url
  })
}

// ─── SVG Mind Map renderer ────────────────────────────────────────────────────

function MindMapSVG({
  data,
  svgRef,
}: {
  data: MindMapData
  svgRef: React.RefObject<SVGSVGElement | null>
}) {
  const { svgH, centralY, allBranches } = useMemo(() => computeLayout(data), [data])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${svgH}`}
      width={SVG_W}
      height={svgH}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', display: 'block' }}
    >
      {/* Solid white bg for export */}
      <rect width={SVG_W} height={svgH} fill="#ffffff" />
      {/* Subtle gradient background */}
      <defs>
        <radialGradient id="mm-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </radialGradient>
        <filter id="mm-shadow-lg">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.14" />
        </filter>
        <filter id="mm-shadow-sm">
          <feDropShadow dx="0" dy="1" stdDeviation="3" floodOpacity="0.09" />
        </filter>
      </defs>
      <rect width={SVG_W} height={svgH} fill="url(#mm-bg)" />

      {/* ── Curves (drawn first, behind nodes) ── */}
      {allBranches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]

        // Central → branch cubic bezier (horizontal approach)
        const cStartX = b.side === 'R' ? CX + CENTRAL_W / 2 : CX - CENTRAL_W / 2
        const cEndX   = b.side === 'R' ? b.bx - BRANCH_W / 2 : b.bx + BRANCH_W / 2
        const cMidX   = (cStartX + cEndX) / 2
        const centralCurve = `M ${cStartX} ${centralY} C ${cMidX} ${centralY} ${cMidX} ${b.by} ${cEndX} ${b.by}`

        return (
          <g key={`c${bi}`}>
            <path d={centralCurve} stroke={col.stroke} strokeWidth={2.5} fill="none"
              opacity={0.65} strokeLinecap="round" />
            {b.children.map((ch, ci) => {
              // Branch → child: short vertical/slight curve (same x column)
              const sy = b.by + BRANCH_H / 2
              const ey = ch.y - ch.h / 2
              const my = (sy + ey) / 2
              // Slight S-curve using side offset
              const ox = b.side === 'R' ? 14 : -14
              const childCurve = `M ${b.bx} ${sy} C ${b.bx + ox} ${my} ${ch.x - ox} ${my} ${ch.x} ${ey}`
              return (
                <path key={ci} d={childCurve} stroke={col.stroke} strokeWidth={1.5}
                  fill="none" opacity={0.45} strokeLinecap="round" />
              )
            })}
          </g>
        )
      })}

      {/* ── Branch + child nodes ── */}
      {allBranches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]

        return (
          <g key={`n${bi}`}>
            {/* Branch node */}
            <rect
              x={b.bx - BRANCH_W / 2} y={b.by - BRANCH_H / 2}
              width={BRANCH_W} height={BRANCH_H}
              rx={9} fill={col.stroke} filter="url(#mm-shadow-lg)"
            />
            <text x={b.bx} y={b.by + 5.5} textAnchor="middle"
              fill="white" fontSize={13} fontWeight="600" letterSpacing="-0.2">
              {trunc(b.data.label, 20)}
            </text>

            {/* Child nodes */}
            {b.children.map((ch, ci) => {
              const childData = b.data.children[ci]
              if (!childData) return null
              const leaves = childData.children ?? []
              const hasLeaves = leaves.length > 0

              return (
                <g key={ci}>
                  {/* Child rect */}
                  <rect
                    x={ch.x - CHILD_W / 2} y={ch.y - ch.h / 2}
                    width={CHILD_W} height={ch.h}
                    rx={7} fill="white"
                    stroke={col.stroke} strokeWidth={1.5}
                    filter="url(#mm-shadow-sm)"
                  />
                  {/* Child label */}
                  <text
                    x={ch.x}
                    y={ch.y - ch.h / 2 + CHILD_H_BASE / 2 + 5}
                    textAnchor="middle" fill="#1e293b"
                    fontSize={12} fontWeight="600">
                    {trunc(childData.label, 22)}
                  </text>
                  {/* Divider between label and leaves */}
                  {hasLeaves && (
                    <line
                      x1={ch.x - CHILD_W / 2 + 14}
                      y1={ch.y - ch.h / 2 + CHILD_H_BASE + 3}
                      x2={ch.x + CHILD_W / 2 - 14}
                      y2={ch.y - ch.h / 2 + CHILD_H_BASE + 3}
                      stroke={col.stroke} strokeWidth={0.8} opacity={0.35}
                    />
                  )}
                  {/* Leaf labels */}
                  {leaves.map((leaf, li) => (
                    <text
                      key={li}
                      x={ch.x}
                      y={ch.y - ch.h / 2 + CHILD_H_BASE + LEAF_PAD + li * LEAF_LINE + 12}
                      textAnchor="middle" fill={col.stroke}
                      fontSize={10.5} fontWeight="400">
                      {trunc(leaf, 28)}
                    </text>
                  ))}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* ── Central node (rendered last — always on top) ── */}
      <rect
        x={CX - CENTRAL_W / 2} y={centralY - CENTRAL_H / 2}
        width={CENTRAL_W} height={CENTRAL_H}
        rx={12} fill="#0f172a" filter="url(#mm-shadow-lg)"
      />
      <text x={CX} y={centralY + 6} textAnchor="middle"
        fill="white" fontSize={15} fontWeight="700" letterSpacing="-0.3">
        {trunc(data.title, 22)}
      </text>
    </svg>
  )
}

// ─── Section component ────────────────────────────────────────────────────────

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
  allAnswered = false,
  subject,
  examTitle,
  language,
}: Props) {
  const [state, setState]     = useState<UIState>('idle')
  const [mindMap, setMindMap] = useState<MindMapData | null>(null)
  const [errMsg, setErrMsg]   = useState('')
  const [dlBusy, setDlBusy]   = useState(false)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const sectionHeader = (
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
          {/* network/mind icon */}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            className="h-4 w-4 text-violet-500">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM17.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.25 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM17.25 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6.75v.75m0 9.75v.75M6.75 12h.75m9.75 0h.75M8.25 8.25l.53.53m6.44 6.44.53.53M15.75 8.25l-.53.53M8.78 14.72l-.53.53" />
          </svg>
        </div>
        <div>
          <CardTitle>AI Mind Map</CardTitle>
          <CardDescription>Turn your missed concepts into a visual study map.</CardDescription>
        </div>
      </div>
    </CardHeader>
  )

  // "No missed concepts" only when: all questions loaded AND all answered AND none wrong
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
            question_text: q.question_text,
            correct_answer: q.correct_answer,
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
    try {
      await downloadPNG(svgRef.current, mindMap.title || examTitle)
    } catch {
      // silently fail
    } finally {
      setDlBusy(false)
    }
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
            <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8}
              className="h-4 w-4">
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
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
          <button
            type="button"
            onClick={handleGenerate}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Ready ── */}
      {state === 'ready' && mindMap && (
        <div className="mt-4 space-y-4">
          {/* Scrollable SVG container */}
          <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-50">
            <MindMapSVG data={mindMap} svgRef={svgRef} />
          </div>

          {/* Export + regenerate */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={dlBusy}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8}
                className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v1.25A1.25 1.25 0 004.25 19h11.5A1.25 1.25 0 0017 17.75V16.5M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" />
              </svg>
              {dlBusy ? 'Downloading…' : 'Download PNG'}
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
