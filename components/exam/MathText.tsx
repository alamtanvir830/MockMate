import React from 'react'

/**
 * MathText — lightweight inline math formatter for SAT question content.
 *
 * The SAT question bank stores math as plain text (e.g. "(3/4)x", "5/13",
 * "(x + 3)/(x − 2)"). Rendering that raw makes fractions read as slashes,
 * which testers reported as confusing. This component upgrades slash-style
 * fractions to proper stacked fractions using pure HTML/CSS — no external
 * math-typesetting dependency required.
 *
 * It intentionally handles ONLY fractions. All other characters (Unicode
 * minus −, ≤, ≥, exponents, variables) are already stored correctly and pass
 * through untouched so the mathematical meaning is never altered.
 */

interface Props {
  text: string
  className?: string
}

// A fraction is:
//   numerator "/" denominator
// where each side is either a parenthesized group "( ... )" or a bare
// run of digits/letters/decimal point. This deliberately does NOT cross
// whitespace unless it is inside parentheses, so ordinary prose slashes
// (e.g. "and/or") with surrounding spaces are left alone.
const NUMBER_OR_VAR = '[A-Za-z0-9.]+'
const PAREN_GROUP = '\\([^()]*\\)'
const SIDE = `(?:${PAREN_GROUP}|${NUMBER_OR_VAR})`
const FRACTION_RE = new RegExp(`(${SIDE})/(${SIDE})`, 'g')

function stripOuterParens(s: string): string {
  if (s.length >= 2 && s.startsWith('(') && s.endsWith(')')) {
    return s.slice(1, -1)
  }
  return s
}

function Fraction({ numerator, denominator }: { numerator: string; denominator: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: '0 0.15em',
        lineHeight: 1.05,
        fontSize: '0.92em',
      }}
    >
      <span style={{ padding: '0 0.25em' }}>{numerator}</span>
      <span
        style={{
          display: 'block',
          width: '100%',
          borderTop: '1px solid currentColor',
          padding: '0 0.25em',
          textAlign: 'center',
        }}
      >
        {denominator}
      </span>
    </span>
  )
}

/**
 * Parse a single string into an array of React nodes, converting slash
 * fractions into stacked Fraction elements.
 */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0

  FRACTION_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = FRACTION_RE.exec(text)) !== null) {
    const [full, rawNum, rawDen] = match
    const start = match.index

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }
    nodes.push(
      <Fraction
        key={`frac-${key++}`}
        numerator={stripOuterParens(rawNum)}
        denominator={stripOuterParens(rawDen)}
      />
    )
    lastIndex = start + full.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length ? nodes : [text]
}

export function MathText({ text, className }: Props) {
  // Preserve intentional line breaks (systems of equations use "\n").
  const lines = text.split('\n')
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {renderInline(line)}
        </React.Fragment>
      ))}
    </span>
  )
}
