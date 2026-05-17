'use client'

import { useState, useRef, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { MindMapData, MindMapBranch } from '@/lib/ai/generate-mind-map'

// ─── Colour palette (7 branch colours) ────────────────────────────────────────

const PALETTE = [
  { stroke: '#6366f1', fill: '#eef2ff' },  // indigo
  { stroke: '#10b981', fill: '#d1fae5' },  // emerald
  { stroke: '#f59e0b', fill: '#fef3c7' },  // amber
  { stroke: '#ef4444', fill: '#fee2e2' },  // red
  { stroke: '#8b5cf6', fill: '#ede9fe' },  // violet
  { stroke: '#0ea5e9', fill: '#e0f2fe' },  // sky
  { stroke: '#f97316', fill: '#ffedd5' },  // orange
]

// ─── Layout constants (left-to-right tree) ────────────────────────────────────

const SVG_W    = 960   // fixed canvas width
const PAD_L    = 24    // left padding
const PAD_R    = 24    // right padding
const PAD_V    = 44    // top/bottom padding

// Column centres & sizes
const ROOT_W   = 168, ROOT_H   = 50
const ROOT_CX  = PAD_L + ROOT_W / 2                        // 108

const H_GAP    = 52    // gap between right edge of parent and left edge of child

const BR_W     = 145, BR_H = 34
const BR_CX    = ROOT_CX + ROOT_W / 2 + H_GAP + BR_W / 2  // 108+84+52+72.5 ≈ 317

const CH_W     = 140, CH_H = 28
const CH_CX    = BR_CX + BR_W / 2 + H_GAP + CH_W / 2      // 317+72.5+52+70 ≈ 512

const LF_X     = CH_CX + CH_W / 2 + 44                     // left edge of leaf text ≈ 626
const LF_H     = 18   // line height for each leaf
const LF_GAP   = 5    // gap between consecutive leaf lines

const CHILD_GAP    = 10 // gap between consecutive child blocks within a branch
const BRANCH_GAP   = 28 // extra gap between branch blocks

// ─── Text truncation ──────────────────────────────────────────────────────────

function trunc(s: string, max: number): string {
  if (!s) return ''
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

// ─── Layout types ─────────────────────────────────────────────────────────────

interface LeafPos  { y: number }
interface ChildPos { cy: number; leaves: LeafPos[] }
interface BranchPos {
  data:     MindMapBranch
  colorIdx: number
  by:       number   // branch node centre Y
  blockTop: number   // top of this branch's vertical block
  blockH:   number   // total height of this branch's block
  children: ChildPos[]
}

// ─── Height helpers ───────────────────────────────────────────────────────────

function leafBlockH(n: number): number {
  return n > 0 ? n * LF_H + (n - 1) * LF_GAP : 0
}

function childBlockH(child: MindMapBranch['children'][0]): number {
  const n = child.children?.length ?? 0
  // Block must be tall enough to hold either the child rect or the leaf stack,
  // whichever is larger — so that centering leaves around the child rect CY
  // never causes them to bleed outside the allocated block.
  return Math.max(CH_H, leafBlockH(n))
}

function branchBlockH(node: MindMapBranch): number {
  const m = node.children?.length ?? 0
  if (m === 0) return BR_H
  const total = node.children.reduce((s, c) => s + childBlockH(c), 0) + (m - 1) * CHILD_GAP
  return Math.max(BR_H, total)
}

// ─── Layout engine ────────────────────────────────────────────────────────────

function computeLayout(data: MindMapData): {
  svgH: number
  rootCY: number
  branches: BranchPos[]
} {
  const nodes = data.nodes ?? []
  const blockHeights = nodes.map(branchBlockH)
  const totalBlockH  =
    blockHeights.reduce((s, h) => s + h, 0) +
    Math.max(0, nodes.length - 1) * BRANCH_GAP

  const svgH  = totalBlockH + 2 * PAD_V
  const rootCY = svgH / 2

  const branches: BranchPos[] = []
  let curY = PAD_V

  nodes.forEach((node, ni) => {
    const bh       = blockHeights[ni]
    const colorIdx = ni % PALETTE.length
    const m        = node.children?.length ?? 0

    // Position children centred within the branch block
    const children: ChildPos[] = []
    if (m > 0) {
      const childrenTotalH =
        node.children.reduce((s, c) => s + childBlockH(c), 0) + (m - 1) * CHILD_GAP
      let childY = curY + (bh - childrenTotalH) / 2

      node.children.forEach(child => {
        const cbh     = childBlockH(child)
        // Child rect is centred within its allocated block (not just at the top)
        const childCY = childY + cbh / 2

        const n = child.children?.length ?? 0
        const leaves: LeafPos[] = []
        if (n > 0) {
          // Centre the entire leaf stack around the child rect's centre Y
          const leafGroupH = leafBlockH(n)
          const lfTop      = childCY - leafGroupH / 2
          for (let li = 0; li < n; li++) {
            leaves.push({ y: lfTop + li * (LF_H + LF_GAP) + LF_H / 2 })
          }
        }

        children.push({ cy: childCY, leaves })
        childY += cbh + CHILD_GAP
      })
    }

    // Branch node centre: middle of block (or middle of children span)
    const by = m > 0
      ? children[0].cy + (children[children.length - 1].cy - children[0].cy) / 2
      : curY + bh / 2

    branches.push({ data: node, colorIdx, by, blockTop: curY, blockH: bh, children })
    curY += bh + BRANCH_GAP
  })

  return { svgH, rootCY, branches }
}

// ─── PNG export ───────────────────────────────────────────────────────────────

async function downloadPNG(svgEl: SVGSVGElement, title: string): Promise<void> {
  const vb    = svgEl.viewBox.baseVal
  const SCALE = 2
  const svg   = new XMLSerializer().serializeToString(svgEl)
  const blob  = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url   = URL.createObjectURL(blob)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas  = document.createElement('canvas')
      canvas.width  = vb.width  * SCALE
      canvas.height = vb.height * SCALE
      const ctx = canvas.getContext('2d')!
      ctx.scale(SCALE, SCALE)
      ctx.drawImage(img, 0, 0, vb.width, vb.height)
      URL.revokeObjectURL(url)
      const a    = document.createElement('a')
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-mind-map.png`
      a.href     = canvas.toDataURL('image/png', 1.0)
      a.click()
      resolve()
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')) }
    img.src = url
  })
}

// ─── SVG renderer ─────────────────────────────────────────────────────────────

function MindMapSVG({
  data,
  svgRef,
}: {
  data:   MindMapData
  svgRef: React.RefObject<SVGSVGElement | null>
}) {
  const { svgH, rootCY, branches } = useMemo(() => computeLayout(data), [data])

  // Midpoint X between root right edge and branch left edge
  const ROOT_R  = ROOT_CX + ROOT_W / 2
  const BR_L    = BR_CX   - BR_W  / 2
  const BR_R    = BR_CX   + BR_W  / 2
  const CH_L    = CH_CX   - CH_W  / 2
  const CH_R    = CH_CX   + CH_W  / 2
  const MID_RB  = (ROOT_R  + BR_L) / 2   // midpoint root→branch
  const MID_BC  = (BR_R    + CH_L) / 2   // midpoint branch→child

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${svgH}`}
      width={SVG_W}
      height={svgH}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', display: 'block' }}
    >
      {/* White background for PNG export */}
      <rect width={SVG_W} height={svgH} fill="#ffffff" />
      {/* Subtle off-white canvas */}
      <rect width={SVG_W} height={svgH} fill="#f8fafc" />

      <defs>
        <filter id="mm-sh-root">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodOpacity="0.18" />
        </filter>
        <filter id="mm-sh-node">
          <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* ── Curves: drawn before nodes so they go behind ── */}
      {branches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]

        // Root → branch: S-curve anchored at root CY
        const rootToBranch = `M ${ROOT_R} ${rootCY} C ${MID_RB} ${rootCY} ${MID_RB} ${b.by} ${BR_L} ${b.by}`

        return (
          <g key={`curve-${bi}`}>
            <path d={rootToBranch} stroke={col.stroke} strokeWidth={2}
              fill="none" opacity={0.5} strokeLinecap="round" />

            {b.children.map((ch, ci) => {
              // Branch → child: S-curve anchored at branch CY
              const branchToChild = `M ${BR_R} ${b.by} C ${MID_BC} ${b.by} ${MID_BC} ${ch.cy} ${CH_L} ${ch.cy}`

              return (
                <g key={`curve-ch-${ci}`}>
                  <path d={branchToChild} stroke={col.stroke} strokeWidth={1.5}
                    fill="none" opacity={0.35} strokeLinecap="round" />

                  {/* Child → each leaf: short horizontal tick */}
                  {ch.leaves.map((lf, li) => (
                    <line key={li}
                      x1={CH_R + 6} y1={lf.y} x2={LF_X - 4} y2={lf.y}
                      stroke={col.stroke} strokeWidth={1} opacity={0.25} />
                  ))}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* ── Branch and child nodes ── */}
      {branches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]

        return (
          <g key={`node-${bi}`}>
            {/* Branch node */}
            <rect
              x={BR_CX - BR_W / 2} y={b.by - BR_H / 2}
              width={BR_W} height={BR_H}
              rx={8} fill={col.fill}
              stroke={col.stroke} strokeWidth={1.5}
              filter="url(#mm-sh-node)"
            />
            <text
              x={BR_CX} y={b.by + 5}
              textAnchor="middle" fill={col.stroke}
              fontSize={12.5} fontWeight="700"
            >
              {trunc(b.data.label, 18)}
            </text>

            {/* Children */}
            {b.children.map((ch, ci) => {
              const childData = b.data.children[ci]
              if (!childData) return null

              return (
                <g key={`ch-${ci}`}>
                  {/* Child rect */}
                  <rect
                    x={CH_CX - CH_W / 2} y={ch.cy - CH_H / 2}
                    width={CH_W} height={CH_H}
                    rx={6} fill="white"
                    stroke={col.stroke} strokeWidth={1}
                    filter="url(#mm-sh-node)"
                  />
                  <text
                    x={CH_CX} y={ch.cy + 4.5}
                    textAnchor="middle" fill="#334155"
                    fontSize={11} fontWeight="600"
                  >
                    {trunc(childData.label, 20)}
                  </text>

                  {/* Leaf text */}
                  {ch.leaves.map((lf, li) => {
                    const leafText = childData.children?.[li]
                    if (!leafText) return null
                    return (
                      <g key={li}>
                        {/* Bullet */}
                        <circle cx={LF_X + 5} cy={lf.y} r={2.5} fill={col.stroke} opacity={0.65} />
                        {/* Label */}
                        <text
                          x={LF_X + 14} y={lf.y + 4}
                          fill="#475569" fontSize={10.5} fontWeight="400"
                        >
                          {trunc(leafText, 30)}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* ── Root node (rendered last so it sits on top of curves) ── */}
      <rect
        x={ROOT_CX - ROOT_W / 2} y={rootCY - ROOT_H / 2}
        width={ROOT_W} height={ROOT_H}
        rx={10} fill="#0f172a"
        filter="url(#mm-sh-root)"
      />
      <text
        x={ROOT_CX} y={rootCY - 5}
        textAnchor="middle" fill="white"
        fontSize={13} fontWeight="700" letterSpacing="-0.2"
      >
        {trunc(data.title, 16)}
      </text>
      <text
        x={ROOT_CX} y={rootCY + 12}
        textAnchor="middle" fill="#94a3b8"
        fontSize={9.5} fontWeight="400"
      >
        Mind Map
      </text>
    </svg>
  )
}

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
  const svgRef = useRef<SVGSVGElement | null>(null)

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
