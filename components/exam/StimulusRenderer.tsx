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

  if (!underlineTargets?.length) {
    return <span className={className}>{text}</span>
  }

  const parts = splitByTargets(text, underlineTargets)

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.underline ? (
          <span
            key={i}
            style={{
              textDecoration: 'underline',
              textDecorationThickness: '2px',
              textUnderlineOffset: '3px',
            }}
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  )
}
