'use client'

import type { SATGraphData, CoordinatePlaneData, ScatterPlotData, BarChartData, TableGraphData } from '@/lib/premade-exams/sat/types'
import type { QBGraphData } from '@/lib/question-bank/types'

type GraphData = SATGraphData | QBGraphData

// ─── Coordinate Plane ────────────────────────────────────────────────────────

const SVG_W = 320
const SVG_H = 280
const PAD_L = 44   // left  (y-axis labels)
const PAD_R = 20
const PAD_T = 20
const PAD_B = 36   // bottom (x-axis labels)
const PLOT_W = SVG_W - PAD_L - PAD_R
const PLOT_H = SVG_H - PAD_T - PAD_B

function toSvgX(mathX: number, xMin: number, xMax: number) {
  return PAD_L + ((mathX - xMin) / (xMax - xMin)) * PLOT_W
}
function toSvgY(mathY: number, yMin: number, yMax: number) {
  return PAD_T + ((yMax - mathY) / (yMax - yMin)) * PLOT_H
}

function CoordinatePlane({ d }: { d: CoordinatePlaneData }) {
  const { xMin, xMax, yMin, yMax, gridStep = 1, lines = [], points = [], xLabel, yLabel } = d

  const xTicks: number[] = []
  const yTicks: number[] = []
  for (let v = Math.ceil(xMin / gridStep) * gridStep; v <= xMax; v += gridStep) xTicks.push(+v.toFixed(6))
  for (let v = Math.ceil(yMin / gridStep) * gridStep; v <= yMax; v += gridStep) yTicks.push(+v.toFixed(6))

  const x0 = toSvgX(0, xMin, xMax)
  const y0 = toSvgY(0, yMin, yMax)

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-xs mx-auto block"
      aria-label="Coordinate plane graph"
    >
      {/* Grid lines */}
      {xTicks.map(v => (
        <line key={`gx${v}`}
          x1={toSvgX(v, xMin, xMax)} y1={PAD_T}
          x2={toSvgX(v, xMin, xMax)} y2={PAD_T + PLOT_H}
          stroke="#e2e8f0" strokeWidth="1"
        />
      ))}
      {yTicks.map(v => (
        <line key={`gy${v}`}
          x1={PAD_L} y1={toSvgY(v, yMin, yMax)}
          x2={PAD_L + PLOT_W} y2={toSvgY(v, yMin, yMax)}
          stroke="#e2e8f0" strokeWidth="1"
        />
      ))}

      {/* Axes */}
      <line x1={x0} y1={PAD_T} x2={x0} y2={PAD_T + PLOT_H} stroke="#475569" strokeWidth="1.5" />
      <line x1={PAD_L} y1={y0} x2={PAD_L + PLOT_W} y2={y0} stroke="#475569" strokeWidth="1.5" />

      {/* Arrowheads */}
      <polygon points={`${x0},${PAD_T - 5} ${x0 - 4},${PAD_T + 5} ${x0 + 4},${PAD_T + 5}`} fill="#475569" />
      <polygon points={`${PAD_L + PLOT_W + 5},${y0} ${PAD_L + PLOT_W - 5},${y0 - 4} ${PAD_L + PLOT_W - 5},${y0 + 4}`} fill="#475569" />

      {/* X-axis ticks + labels */}
      {xTicks.map(v => {
        if (v === 0) return null
        const sx = toSvgX(v, xMin, xMax)
        return (
          <g key={`tx${v}`}>
            <line x1={sx} y1={y0 - 3} x2={sx} y2={y0 + 3} stroke="#475569" strokeWidth="1" />
            <text x={sx} y={y0 + 14} textAnchor="middle" fontSize="9" fill="#64748b">{v}</text>
          </g>
        )
      })}

      {/* Y-axis ticks + labels */}
      {yTicks.map(v => {
        if (v === 0) return null
        const sy = toSvgY(v, yMin, yMax)
        return (
          <g key={`ty${v}`}>
            <line x1={x0 - 3} y1={sy} x2={x0 + 3} y2={sy} stroke="#475569" strokeWidth="1" />
            <text x={x0 - 7} y={sy + 3} textAnchor="end" fontSize="9" fill="#64748b">{v}</text>
          </g>
        )
      })}

      {/* Origin label */}
      <text x={x0 - 7} y={y0 + 14} textAnchor="end" fontSize="9" fill="#64748b">0</text>

      {/* Axis labels */}
      {xLabel && (
        <text x={PAD_L + PLOT_W} y={PAD_T + PLOT_H + 30} textAnchor="end" fontSize="10" fontStyle="italic" fill="#475569">{xLabel}</text>
      )}
      {yLabel && (
        <text x={x0 - 6} y={PAD_T - 8} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#475569">{yLabel}</text>
      )}

      {/* Lines */}
      {lines.map((line, li) => {
        const pts = line.points
          .map(([mx, my]) => `${toSvgX(mx, xMin, xMax)},${toSvgY(my, yMin, yMax)}`)
          .join(' ')
        return (
          <g key={li}>
            <polyline
              points={pts}
              fill="none"
              stroke={line.color ?? '#4f46e5'}
              strokeWidth="2"
              strokeDasharray={line.dashed ? '5,3' : undefined}
            />
            {line.label && (() => {
              const last = line.points[line.points.length - 1]
              return (
                <text
                  x={toSvgX(last[0], xMin, xMax) + 5}
                  y={toSvgY(last[1], yMin, yMax) - 5}
                  fontSize="10" fontStyle="italic" fill={line.color ?? '#4f46e5'}
                >
                  {line.label}
                </text>
              )
            })()}
          </g>
        )
      })}

      {/* Named points */}
      {points.map((pt, pi) => (
        <g key={pi}>
          <circle
            cx={toSvgX(pt.x, xMin, xMax)}
            cy={toSvgY(pt.y, yMin, yMax)}
            r="4"
            fill={pt.filled !== false ? '#4f46e5' : 'white'}
            stroke="#4f46e5"
            strokeWidth="1.5"
          />
          {pt.label && (
            <text
              x={toSvgX(pt.x, xMin, xMax) + 6}
              y={toSvgY(pt.y, yMin, yMax) - 6}
              fontSize="10" fill="#334155"
            >{pt.label}</text>
          )}
        </g>
      ))}
    </svg>
  )
}

// ─── Scatter Plot ─────────────────────────────────────────────────────────────

function ScatterPlot({ d }: { d: ScatterPlotData | (QBGraphData & { type: 'scatter' }) }) {
  const rawPoints = (d as ScatterPlotData).points ?? []
  const allX = rawPoints.map(([x]) => x)
  const allY = rawPoints.map(([, y]) => y)
  const xMin = d.xMin ?? (allX.length ? Math.floor(Math.min(...allX)) - 1 : 0)
  const xMax = d.xMax ?? (allX.length ? Math.ceil(Math.max(...allX)) + 1 : 10)
  const yMin = d.yMin ?? (allY.length ? Math.floor(Math.min(...allY)) - 1 : 0)
  const yMax = d.yMax ?? (allY.length ? Math.ceil(Math.max(...allY)) + 1 : 10)

  const trendLine = d.trendLine
  const trendPts = trendLine
    ? [[xMin, trendLine.slope * xMin + trendLine.intercept], [xMax, trendLine.slope * xMax + trendLine.intercept]] as [number,number][]
    : null

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-xs mx-auto block" aria-label="Scatter plot">
      {/* Border box */}
      <rect x={PAD_L} y={PAD_T} width={PLOT_W} height={PLOT_H} fill="none" stroke="#cbd5e1" strokeWidth="1" />

      {/* Grid */}
      {[0.25, 0.5, 0.75].map(f => (
        <g key={f}>
          <line x1={PAD_L + PLOT_W * f} y1={PAD_T} x2={PAD_L + PLOT_W * f} y2={PAD_T + PLOT_H} stroke="#f1f5f9" strokeWidth="1" />
          <line x1={PAD_L} y1={PAD_T + PLOT_H * f} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H * f} stroke="#f1f5f9" strokeWidth="1" />
        </g>
      ))}

      {/* Trend line */}
      {trendPts && (
        <line
          x1={toSvgX(trendPts[0][0], xMin, xMax)} y1={toSvgY(trendPts[0][1], yMin, yMax)}
          x2={toSvgX(trendPts[1][0], xMin, xMax)} y2={toSvgY(trendPts[1][1], yMin, yMax)}
          stroke={trendLine?.color ?? '#ef4444'} strokeWidth="1.5" strokeDasharray="4,3"
        />
      )}

      {/* Data points */}
      {rawPoints.map(([x, y], i) => (
        <circle key={i}
          cx={toSvgX(x, xMin, xMax)} cy={toSvgY(y, yMin, yMax)}
          r="4" fill="#4f46e5" opacity="0.8"
        />
      ))}

      {/* X-axis labels */}
      {[xMin, (xMin + xMax) / 2, xMax].map(v => (
        <text key={v} x={toSvgX(v, xMin, xMax)} y={PAD_T + PLOT_H + 14} textAnchor="middle" fontSize="9" fill="#64748b">
          {Math.round(v * 10) / 10}
        </text>
      ))}

      {/* Y-axis labels */}
      {[yMin, (yMin + yMax) / 2, yMax].map(v => (
        <text key={v} x={PAD_L - 5} y={toSvgY(v, yMin, yMax) + 3} textAnchor="end" fontSize="9" fill="#64748b">
          {Math.round(v * 10) / 10}
        </text>
      ))}

      {/* Axis labels */}
      {d.xLabel && (
        <text x={PAD_L + PLOT_W / 2} y={SVG_H - 2} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#475569">{d.xLabel}</text>
      )}
      {d.yLabel && (
        <text
          x={10} y={PAD_T + PLOT_H / 2}
          textAnchor="middle" fontSize="10" fontStyle="italic" fill="#475569"
          transform={`rotate(-90, 10, ${PAD_T + PLOT_H / 2})`}
        >{d.yLabel}</text>
      )}

      {/* Title */}
      {d.title && (
        <text x={SVG_W / 2} y={PAD_T - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{d.title}</text>
      )}
    </svg>
  )
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ d }: { d: BarChartData | (QBGraphData & { type: 'bar' }) }) {
  const labels = d.labels ?? []
  const values = (d as BarChartData).values ?? (d as QBGraphData & { type: 'bar' }).datasets?.[0]?.values ?? []
  const maxVal = Math.max(...values, 1)
  const barW = Math.min(40, (PLOT_W - 10) / (labels.length || 1) - 6)

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-xs mx-auto block" aria-label="Bar chart">
      {/* Y-axis */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="#475569" strokeWidth="1.5" />
      {/* X-axis */}
      <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="#475569" strokeWidth="1.5" />

      {values.map((val, i) => {
        const barH = (val / maxVal) * PLOT_H
        const x = PAD_L + 10 + i * ((PLOT_W - 10) / labels.length) + ((PLOT_W - 10) / labels.length - barW) / 2
        const y = PAD_T + PLOT_H - barH
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill="#818cf8" rx="2" />
            <text x={x + barW / 2} y={PAD_T + PLOT_H + 14} textAnchor="middle" fontSize="9" fill="#64748b">{labels[i]}</text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="#334155">{val}</text>
          </g>
        )
      })}

      {d.title && (
        <text x={SVG_W / 2} y={PAD_T - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{d.title}</text>
      )}
    </svg>
  )
}

// ─── Data Table ───────────────────────────────────────────────────────────────

function DataTable({ d }: { d: TableGraphData | (QBGraphData & { type: 'table' }) }) {
  return (
    <div className="overflow-x-auto">
      {d.title && <p className="text-[11px] text-slate-500 font-semibold mb-1.5 text-center">{d.title}</p>}
      <table className="text-[12px] border-collapse w-full">
        {d.headers && (
          <thead>
            <tr className="border-b-2 border-slate-300">
              {d.headers.map((h, i) => (
                <th key={i} className="text-left py-1.5 px-2 font-semibold text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {d.rows?.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-100">
              {row.map((cell, ci) => (
                <td key={ci} className="py-1.5 px-2 text-slate-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface SATGraphProps {
  data: GraphData
  className?: string
}

export function SATGraph({ data, className }: SATGraphProps) {
  const wrapper = (children: React.ReactNode) => (
    <div className={className ?? 'my-3 p-3 bg-white border border-slate-200 rounded-lg'}>
      {children}
    </div>
  )

  switch (data.type) {
    case 'coordinate_plane':
      return wrapper(<CoordinatePlane d={data as CoordinatePlaneData} />)
    case 'scatter':
      return wrapper(<ScatterPlot d={data as ScatterPlotData} />)
    case 'bar':
      return wrapper(<BarChart d={data as BarChartData} />)
    case 'table':
      return wrapper(<DataTable d={data as TableGraphData} />)
    default:
      return null
  }
}
