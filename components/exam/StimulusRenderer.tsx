import React from 'react'

// ── Markdown-style table renderer ─────────────────────────────────────────────
// Detects pipe-delimited table content within a stimulus paragraph and renders
// it as a proper HTML <table> rather than raw ASCII characters. Handles both
// standard markdown tables (with |---|---| separator rows) and simple
// pipe-separated tabular data without separator rows.

function isTableBlock(text: string): boolean {
  const lines = text.split('\n').filter(l => l.trim().length > 0)
  if (lines.length < 2) return false
  // A block is a table if at least half the non-empty lines contain a pipe character
  const pipeLines = lines.filter(l => l.includes('|'))
  return pipeLines.length >= Math.ceil(lines.length / 2)
}

function isSeparatorRow(line: string): boolean {
  // |---|---|---| or similar
  return /^\s*\|[\s\-|:]+\|\s*$/.test(line) || /^[\s\-|:]+$/.test(line)
}

function parseTableRow(line: string): string[] {
  // Strip leading/trailing pipes then split on |
  const stripped = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
  return stripped.split('|').map(cell => cell.trim())
}

function TableBlock({ text }: { text: string }) {
  const lines = text.split('\n').filter(l => l.trim().length > 0)
  const dataLines = lines.filter(l => !isSeparatorRow(l))
  if (dataLines.length === 0) return <span>{text}</span>
  const [headerLine, ...bodyLines] = dataLines
  const headers = parseTableRow(headerLine)
  const rows = bodyLines.map(parseTableRow)

  return (
    <div className="overflow-x-auto my-2" role="table" aria-label="Data table">
      <table className="min-w-full text-[12px] border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border border-slate-300 bg-slate-100 px-3 py-1.5 text-left font-semibold text-slate-800 whitespace-nowrap"
                scope="col"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-slate-300 px-3 py-1.5 text-slate-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface Part {
  text: string
  underline: boolean
}

function splitByTargets(text: string, targets: string[]): Part[] {
  let parts: Part[] = [{ text, underline: false }]

  for (const target of targets) {
    const next: Part[] = []
    for (const part of parts) {
      if (part.underline) {
        next.push(part)
        continue
      }
      const idx = part.text.indexOf(target)
      if (idx === -1) {
        next.push(part)
        continue
      }
      const before = part.text.slice(0, idx)
      const after = part.text.slice(idx + target.length)
      if (before) next.push({ text: before, underline: false })
      next.push({ text: target, underline: true })
      if (after) next.push({ text: after, underline: false })
    }
    parts = next
  }

  return parts
}

const UNDERLINE_STYLE: React.CSSProperties = {
  textDecoration: 'underline',
  textDecorationThickness: '2px',
  textUnderlineOffset: '3px',
}

// Matches "Text 1:" or "Text 2:" at the very start of a paragraph
const TEXT_LABEL_RE = /^(Text [12]:)\s*/

interface Props {
  text: string
  underlineTargets?: string[]
  className?: string
}

export function StimulusRenderer({ text, underlineTargets, className }: Props) {
  if (process.env.NODE_ENV === 'development' && !underlineTargets?.length) {
    const lower = text.toLowerCase()
    if (
      lower.includes('underlined phrase') ||
      lower.includes('underlined sentence') ||
      lower.includes('underlined word') ||
      lower.includes('underlined portion') ||
      lower.includes('underlined claim') ||
      lower.includes('underlined text')
    ) {
      console.warn('[StimulusRenderer] Question references "underlined" but no underlineTargets provided:', text.slice(0, 100))
    }
  }

  // Split on two-or-more consecutive newlines to get paragraphs.
  // Single-newlines within a paragraph are preserved as-is (rare in SAT stimuli).
  const paragraphs = text.split(/\n\n+/)

  if (paragraphs.length === 1) {
    // ── Single-paragraph stimulus ── keep original inline rendering
    if (!underlineTargets?.length) {
      return <span className={className}>{text}</span>
    }
    const parts = splitByTargets(text, underlineTargets)
    return (
      <span className={className}>
        {parts.map((part, i) =>
          part.underline ? (
            <span key={i} style={UNDERLINE_STYLE}>{part.text}</span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </span>
    )
  }

  // ── Multi-paragraph stimulus (e.g. paired-text with Text 1 / Text 2) ──
  return (
    <div className={className}>
      {paragraphs.map((para, idx) => {
        const paragraphClass = idx > 0 ? 'mt-3' : undefined

        // Render pipe-delimited content as a proper HTML table
        if (isTableBlock(para)) {
          return <div key={idx} className={paragraphClass}><TableBlock text={para} /></div>
        }

        // Detect and bold "Text 1:" / "Text 2:" prefix for paired-text passages
        const labelMatch = para.match(TEXT_LABEL_RE)
        const label = labelMatch?.[1] ?? null
        const body = labelMatch ? para.slice(labelMatch[0].length) : para

        if (!underlineTargets?.length) {
          return (
            <p key={idx} className={paragraphClass}>
              {label && <><strong>{label}</strong>{' '}</>}
              {body}
            </p>
          )
        }

        // Apply underline splitting to the body text (label is never underlined)
        const parts = splitByTargets(body, underlineTargets)
        return (
          <p key={idx} className={paragraphClass}>
            {label && <><strong>{label}</strong>{' '}</>}
            {parts.map((part, i) =>
              part.underline ? (
                <span key={i} style={UNDERLINE_STYLE}>{part.text}</span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </p>
        )
      })}
    </div>
  )
}
