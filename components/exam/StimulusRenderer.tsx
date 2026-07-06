import React from 'react'

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
        // Detect and bold "Text 1:" / "Text 2:" prefix for paired-text passages
        const labelMatch = para.match(TEXT_LABEL_RE)
        const label = labelMatch?.[1] ?? null
        const body = labelMatch ? para.slice(labelMatch[0].length) : para

        const paragraphClass = idx > 0 ? 'mt-3' : undefined

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
