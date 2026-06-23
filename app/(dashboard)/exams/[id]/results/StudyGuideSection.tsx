'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { StudyGuide, MissedQuestion } from '@/lib/ai/generate-study-guide'

// ─── Inline markdown renderer ────────────────────────────────────────────────

function InlineText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-slate-900">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

function parseTableRow(line: string): string[] {
  return line
    .split('|')
    .map((c) => c.trim())
    .filter((_, i, arr) => i > 0 && i < arr.length - 1)
}

function isSeparatorRow(line: string): boolean {
  return /^\|[\s\-|:]+\|$/.test(line.trim())
}

function MarkdownContent({ md }: { md: string }) {
  const lines = md.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i++
      continue
    }

    // ## Subheading
    if (trimmed.startsWith('## ')) {
      nodes.push(
        <h4 key={i} className="mt-4 mb-1.5 text-sm font-semibold text-blue-700 uppercase tracking-wide">
          <InlineText text={trimmed.slice(3)} />
        </h4>,
      )
      i++
      continue
    }

    // Table — collect all consecutive table lines
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const nonSep = tableLines.filter((l) => !isSeparatorRow(l))
      if (nonSep.length >= 2) {
        const [headerLine, ...bodyLines] = nonSep
        const headers = parseTableRow(headerLine)
        nodes.push(
          <div key={`tbl-${i}`} className="my-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs font-semibold text-blue-800 uppercase tracking-wide whitespace-nowrap"
                    >
                      <InlineText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyLines.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {parseTableRow(row).map((cell, ci) => (
                      <td key={ci} className="border border-slate-200 px-3 py-2 text-slate-700 align-top">
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )
      }
      continue
    }

    // Bullet list — collect consecutive bullet lines
    if (trimmed.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      nodes.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1 pl-4">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Regular paragraph
    nodes.push(
      <p key={i} className="text-sm text-slate-700 leading-relaxed my-1.5">
        <InlineText text={trimmed} />
      </p>,
    )
    i++
  }

  return <div>{nodes}</div>
}

// ─── PDF export ──────────────────────────────────────────────────────────────

function buildPrintHTML(guide: StudyGuide, examTitle: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const renderInline = (text: string) =>
    text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  const renderMarkdown = (md: string): string => {
    const lines = md.split('\n')
    const out: string[] = []
    let i = 0
    while (i < lines.length) {
      const trimmed = lines[i].trim()
      if (!trimmed) { i++; continue }

      if (trimmed.startsWith('## ')) {
        out.push(`<h4 class="sub">${renderInline(escapeHtml(trimmed.slice(3)))}</h4>`)
        i++; continue
      }

      if (trimmed.startsWith('|')) {
        const tblLines: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tblLines.push(lines[i])
          i++
        }
        const nonSep = tblLines.filter(l => !/^\|[\s\-|:]+\|$/.test(l.trim()))
        if (nonSep.length >= 2) {
          const [hdr, ...rows] = nonSep
          const headers = hdr.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          out.push('<table><thead><tr>' + headers.map(h => `<th>${renderInline(escapeHtml(h))}</th>`).join('') + '</tr></thead><tbody>')
          rows.forEach(row => {
            const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            out.push('<tr>' + cells.map(c => `<td>${renderInline(escapeHtml(c))}</td>`).join('') + '</tr>')
          })
          out.push('</tbody></table>')
        }
        continue
      }

      if (trimmed.startsWith('- ')) {
        const items: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().slice(2))
          i++
        }
        out.push('<ul>' + items.map(it => `<li>${renderInline(escapeHtml(it))}</li>`).join('') + '</ul>')
        continue
      }

      out.push(`<p>${renderInline(escapeHtml(trimmed))}</p>`)
      i++
    }
    return out.join('\n')
  }

  const sectionsHtml = guide.sections
    .map(
      (s) => `
      <div class="section">
        <h3>${escapeHtml(s.heading)}</h3>
        <div class="section-body">${renderMarkdown(s.contentMarkdown)}</div>
      </div>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(guide.title)} — ${escapeHtml(examTitle)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, 'Times New Roman', serif; font-size: 13px; color: #1e293b; line-height: 1.65; padding: 40px 48px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 22px; color: #1d4ed8; font-weight: 700; margin-bottom: 4px; }
    .subtitle { font-size: 12px; color: #64748b; margin-bottom: 8px; }
    hr { border: none; border-top: 2px solid #1d4ed8; margin: 14px 0 20px; }
    .section { margin-bottom: 24px; }
    h3 { font-size: 14px; color: #1d4ed8; font-weight: 700; margin-bottom: 8px; padding-bottom: 3px; border-bottom: 1px solid #bfdbfe; }
    h4.sub { font-size: 11px; color: #1e40af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 4px; }
    p { margin: 5px 0; font-size: 13px; }
    ul { padding-left: 18px; margin: 6px 0; }
    li { margin: 3px 0; font-size: 13px; }
    strong { font-weight: 700; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
    th { background: #eff6ff; color: #1e3a8a; font-weight: 600; text-transform: uppercase; font-size: 10px; letter-spacing: 0.05em; padding: 6px 10px; border: 1px solid #bfdbfe; text-align: left; }
    td { padding: 6px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
    tr:nth-child(even) td { background: #f8fafc; }
    @media print { body { padding: 20px 30px; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(guide.title)}</h1>
  <p class="subtitle">${escapeHtml(guide.subtitle)}</p>
  <hr />
  ${sectionsHtml}
</body>
</html>`
}

function downloadPDF(guide: StudyGuide, examTitle: string) {
  const html = buildPrintHTML(guide, examTitle)
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.onload = () => {
    win.focus()
    win.print()
  }
}

// ─── Copy to clipboard ───────────────────────────────────────────────────────

function buildPlainText(guide: StudyGuide): string {
  const lines: string[] = [guide.title, guide.subtitle, '']
  for (const section of guide.sections) {
    lines.push(section.heading)
    lines.push(section.contentMarkdown.replace(/\*\*/g, ''))
    lines.push('')
  }
  return lines.join('\n')
}

// ─── Section component ────────────────────────────────────────────────────────

type UIState = 'idle' | 'loading' | 'ready' | 'error'

interface Props {
  attemptId: string
  incorrectQuestions: MissedQuestion[]
  totalQuestions: number
  allAnswered: boolean
  subject: string
  examTitle: string
  language?: string
}

export function StudyGuideSection({
  attemptId,
  incorrectQuestions,
  totalQuestions,
  allAnswered,
  subject,
  examTitle,
  language,
}: Props) {
  const [state, setState] = useState<UIState>('idle')
  const [guide, setGuide] = useState<StudyGuide | null>(null)
  const [errMsg, setErrMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const sectionHeader = (
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <div>
          <CardTitle>Condensed Study Guide</CardTitle>
          <CardDescription>Create a focused study guide from the topics you missed.</CardDescription>
        </div>
      </div>
    </CardHeader>
  )

  // Perfect score or no missed questions
  const perfectScore = totalQuestions > 0 && allAnswered && incorrectQuestions.length === 0
  if (perfectScore) {
    return (
      <Card>
        {sectionHeader}
        <p className="text-sm text-slate-500 mt-1">
          No missed topics to review — great work!
        </p>
      </Card>
    )
  }

  // Don't render at all if exam not completed / no missed items
  if (incorrectQuestions.length === 0) return null

  async function handleGenerate() {
    setState('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/study-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: incorrectQuestions,
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
      setGuide(d.guide)
      setState('ready')
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Failed to generate study guide.')
      setState('error')
    }
  }

  async function handleCopy() {
    if (!guide) return
    try {
      await navigator.clipboard.writeText(buildPlainText(guide))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
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
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Generate study guide
          </button>
        </div>
      )}

      {/* ── Loading ── */}
      {state === 'loading' && (
        <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
          <svg className="h-5 w-5 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Building your condensed study guide…
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
            className="text-sm font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Ready ── */}
      {state === 'ready' && guide && (
        <div className="mt-4 space-y-4">
          {/* Document card */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Document header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-xl font-bold text-blue-700 leading-tight">{guide.title}</h2>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{guide.subtitle}</p>
              <div className="mt-3 h-0.5 bg-blue-600 rounded-full" />
            </div>

            {/* Sections */}
            <div className="px-6 pb-6 space-y-6">
              {guide.sections.map((section, si) => (
                <div key={si}>
                  <h3 className="text-sm font-bold text-blue-700 pb-1.5 border-b border-blue-100 mb-3">
                    {section.heading}
                  </h3>
                  <MarkdownContent md={section.contentMarkdown} />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => downloadPDF(guide, examTitle)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
            >
              <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v1.25A1.25 1.25 0 004.25 19h11.5A1.25 1.25 0 0017 17.75V16.5M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" />
              </svg>
              Download PDF
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <svg fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy study guide
                </>
              )}
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
