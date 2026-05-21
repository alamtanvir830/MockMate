'use client'

import { useMemo } from 'react'
import type { MindMapData, MindMapBranch } from '@/lib/ai/generate-mind-map'

// ─── Colour palette (7 branch colours) ───────────────────────────────────────

export const PALETTE = [
  { stroke: '#6366f1', fill: '#eef2ff' },
  { stroke: '#10b981', fill: '#d1fae5' },
  { stroke: '#f59e0b', fill: '#fef3c7' },
  { stroke: '#ef4444', fill: '#fee2e2' },
  { stroke: '#8b5cf6', fill: '#ede9fe' },
  { stroke: '#0ea5e9', fill: '#e0f2fe' },
  { stroke: '#f97316', fill: '#ffedd5' },
]

// ─── Layout constants (left-to-right tree) ────────────────────────────────────

const SVG_W   = 960
const PAD_L   = 24
const PAD_V   = 44

const ROOT_W  = 168, ROOT_H = 50
const ROOT_CX = PAD_L + ROOT_W / 2                        // 108
const H_GAP   = 52

const BR_W    = 145, BR_H = 34
const BR_CX   = ROOT_CX + ROOT_W / 2 + H_GAP + BR_W / 2  // ≈317

const CH_W    = 140, CH_H = 28
const CH_CX   = BR_CX + BR_W / 2 + H_GAP + CH_W / 2      // ≈512

const LF_X    = CH_CX + CH_W / 2 + 44                     // ≈626
const LF_H    = 18
const LF_GAP  = 5

const CHILD_GAP  = 10
const BRANCH_GAP = 28

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
  by:       number
  blockTop: number
  blockH:   number
  children: ChildPos[]
}

// ─── Height helpers ───────────────────────────────────────────────────────────

function leafBlockH(n: number): number {
  return n > 0 ? n * LF_H + (n - 1) * LF_GAP : 0
}

function childBlockH(child: MindMapBranch['children'][0]): number {
  const n = child.children?.length ?? 0
  return Math.max(CH_H, leafBlockH(n))
}

function branchBlockH(node: MindMapBranch): number {
  const m = node.children?.length ?? 0
  if (m === 0) return BR_H
  const total = node.children.reduce((s, c) => s + childBlockH(c), 0) + (m - 1) * CHILD_GAP
  return Math.max(BR_H, total)
}

// ─── Layout engine ────────────────────────────────────────────────────────────

export function computeLayout(data: MindMapData): {
  svgH: number
  rootCY: number
  branches: BranchPos[]
} {
  const nodes = data.nodes ?? []
  const blockHeights = nodes.map(branchBlockH)
  const totalBlockH =
    blockHeights.reduce((s, h) => s + h, 0) + Math.max(0, nodes.length - 1) * BRANCH_GAP

  const svgH   = totalBlockH + 2 * PAD_V
  const rootCY = svgH / 2

  const branches: BranchPos[] = []
  let curY = PAD_V

  nodes.forEach((node, ni) => {
    const bh       = blockHeights[ni]
    const colorIdx = ni % PALETTE.length
    const m        = node.children?.length ?? 0

    const children: ChildPos[] = []
    if (m > 0) {
      const childrenTotalH =
        node.children.reduce((s, c) => s + childBlockH(c), 0) + (m - 1) * CHILD_GAP
      let childY = curY + (bh - childrenTotalH) / 2

      node.children.forEach((child) => {
        const cbh     = childBlockH(child)
        const childCY = childY + cbh / 2
        const n = child.children?.length ?? 0
        const leaves: LeafPos[] = []
        if (n > 0) {
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

    const by =
      m > 0
        ? children[0].cy + (children[children.length - 1].cy - children[0].cy) / 2
        : curY + bh / 2

    branches.push({ data: node, colorIdx, by, blockTop: curY, blockH: bh, children })
    curY += bh + BRANCH_GAP
  })

  return { svgH, rootCY, branches }
}

// ─── PNG export ───────────────────────────────────────────────────────────────

export async function downloadPNG(svgEl: SVGSVGElement, title: string): Promise<void> {
  const vb    = svgEl.viewBox.baseVal
  const SCALE = 2
  const svg   = new XMLSerializer().serializeToString(svgEl)
  const blob  = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url   = URL.createObjectURL(blob)

  return new Promise((resolve, reject) => {
    const img    = new Image()
    img.onload   = () => {
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
    img.src     = url
  })
}

// ─── SVG renderer ─────────────────────────────────────────────────────────────

export function MindMapSVG({
  data,
  svgRef,
}: {
  data:   MindMapData
  svgRef: React.RefObject<SVGSVGElement | null>
}) {
  const { svgH, rootCY, branches } = useMemo(() => computeLayout(data), [data])

  const ROOT_R = ROOT_CX + ROOT_W / 2
  const BR_L   = BR_CX   - BR_W  / 2
  const BR_R   = BR_CX   + BR_W  / 2
  const CH_L   = CH_CX   - CH_W  / 2
  const CH_R   = CH_CX   + CH_W  / 2
  const MID_RB = (ROOT_R  + BR_L) / 2
  const MID_BC = (BR_R    + CH_L) / 2

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${svgH}`}
      width={SVG_W}
      height={svgH}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif', display: 'block' }}
    >
      <rect width={SVG_W} height={svgH} fill="#ffffff" />
      <rect width={SVG_W} height={svgH} fill="#f8fafc" />

      <defs>
        <filter id="mm-sh-root">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodOpacity="0.18" />
        </filter>
        <filter id="mm-sh-node">
          <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodOpacity="0.10" />
        </filter>
      </defs>

      {branches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]
        const rootToBranch = `M ${ROOT_R} ${rootCY} C ${MID_RB} ${rootCY} ${MID_RB} ${b.by} ${BR_L} ${b.by}`
        return (
          <g key={`curve-${bi}`}>
            <path d={rootToBranch} stroke={col.stroke} strokeWidth={2}
              fill="none" opacity={0.5} strokeLinecap="round" />
            {b.children.map((ch, ci) => {
              const branchToChild = `M ${BR_R} ${b.by} C ${MID_BC} ${b.by} ${MID_BC} ${ch.cy} ${CH_L} ${ch.cy}`
              return (
                <g key={`curve-ch-${ci}`}>
                  <path d={branchToChild} stroke={col.stroke} strokeWidth={1.5}
                    fill="none" opacity={0.35} strokeLinecap="round" />
                  {ch.leaves.map((lf, li) => (
                    <line key={li} x1={CH_R + 6} y1={lf.y} x2={LF_X - 4} y2={lf.y}
                      stroke={col.stroke} strokeWidth={1} opacity={0.25} />
                  ))}
                </g>
              )
            })}
          </g>
        )
      })}

      {branches.map((b, bi) => {
        const col = PALETTE[b.colorIdx]
        return (
          <g key={`node-${bi}`}>
            <rect x={BR_CX - BR_W / 2} y={b.by - BR_H / 2} width={BR_W} height={BR_H}
              rx={8} fill={col.fill} stroke={col.stroke} strokeWidth={1.5}
              filter="url(#mm-sh-node)" />
            <text x={BR_CX} y={b.by + 5} textAnchor="middle" fill={col.stroke}
              fontSize={12.5} fontWeight="700">
              {trunc(b.data.label, 18)}
            </text>
            {b.children.map((ch, ci) => {
              const childData = b.data.children[ci]
              if (!childData) return null
              return (
                <g key={`ch-${ci}`}>
                  <rect x={CH_CX - CH_W / 2} y={ch.cy - CH_H / 2} width={CH_W} height={CH_H}
                    rx={6} fill="white" stroke={col.stroke} strokeWidth={1}
                    filter="url(#mm-sh-node)" />
                  <text x={CH_CX} y={ch.cy + 4.5} textAnchor="middle" fill="#334155"
                    fontSize={11} fontWeight="600">
                    {trunc(childData.label, 20)}
                  </text>
                  {ch.leaves.map((lf, li) => {
                    const leafText = childData.children?.[li]
                    if (!leafText) return null
                    return (
                      <g key={li}>
                        <circle cx={LF_X + 5} cy={lf.y} r={2.5} fill={col.stroke} opacity={0.65} />
                        <text x={LF_X + 14} y={lf.y + 4} fill="#475569" fontSize={10.5} fontWeight="400">
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

      <rect x={ROOT_CX - ROOT_W / 2} y={rootCY - ROOT_H / 2} width={ROOT_W} height={ROOT_H}
        rx={10} fill="#0f172a" filter="url(#mm-sh-root)" />
      <text x={ROOT_CX} y={rootCY - 5} textAnchor="middle" fill="white"
        fontSize={13} fontWeight="700" letterSpacing="-0.2">
        {trunc(data.title, 16)}
      </text>
      <text x={ROOT_CX} y={rootCY + 12} textAnchor="middle" fill="#94a3b8"
        fontSize={9.5} fontWeight="400">
        Mind Map
      </text>
    </svg>
  )
}
