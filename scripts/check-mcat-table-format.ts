/**
 * Validates MCAT question/passage text across both the pre-made exam data and
 * the question bank for raw markdown table syntax and structural integrity.
 *
 * Checks:
 *  1. Raw pipe-table lines (^\s*|) in passageText or question
 *  2. structured table present but passageText/question ALSO contains raw table
 *  3. "Table N" reference in text with no structured table nearby
 *  4. Structured table with empty headers or rows
 */

// ── QB questions ──────────────────────────────────────────────────────────────
import { chemPhysQuestions } from '../lib/question-bank/mcat/chem-phys'
import { bioBiochemQuestions } from '../lib/question-bank/mcat/bio-biochem'
import { psychSocQuestions } from '../lib/question-bank/mcat/psych-soc'
import { carsQuestions } from '../lib/question-bank/mcat/cars'

// ── Form 1 sections ───────────────────────────────────────────────────────────
import { chemPhysSection } from '../lib/premade-exams/mcat/form-1-chem-phys'
import { carsSection } from '../lib/premade-exams/mcat/form-1-cars'
import { bioBiochemSection } from '../lib/premade-exams/mcat/form-1-bio-biochem'
import { psychSocSection } from '../lib/premade-exams/mcat/form-1-psych-soc'
import type { MCATSection } from '../lib/premade-exams/mcat/types'

// ── Pipe-table detection ──────────────────────────────────────────────────────
const PIPE_TABLE_LINE = /^\s*\|/m
const TABLE_REF = /\bTable\s+\d/i

let issues = 0

function fail(id: string, field: string, msg: string) {
  console.error(`[${id}] ${field}: ${msg}`)
  issues++
}

// ── Check QB questions ────────────────────────────────────────────────────────
const qbQuestions = [
  ...chemPhysQuestions,
  ...bioBiochemQuestions,
  ...psychSocQuestions,
  ...carsQuestions,
]

for (const q of qbQuestions) {
  const texts: Array<[string, string]> = [
    ['question', q.question],
    ['passageText', q.passageText ?? ''],
  ]

  for (const [field, text] of texts) {
    if (!text) continue
    if (PIPE_TABLE_LINE.test(text)) {
      fail(q.id, field, 'contains raw markdown pipe-table line(s)')
    }
    if (TABLE_REF.test(text) && !q.tableData) {
      fail(q.id, field, `references "Table N" but tableData is missing`)
    }
    if (q.tableData && PIPE_TABLE_LINE.test(text)) {
      fail(q.id, field, 'structured tableData exists but raw table text also present (duplicate)')
    }
  }

  if (q.tableData) {
    if (!q.tableData.headers?.length) fail(q.id, 'tableData.headers', 'empty or missing')
    if (!q.tableData.rows?.length)    fail(q.id, 'tableData.rows', 'empty or missing')
  }
}

// ── Check Form 1 sections ─────────────────────────────────────────────────────
const form1Sections: MCATSection[] = [chemPhysSection, carsSection, bioBiochemSection, psychSocSection]

for (const section of form1Sections) {
  // Passages
  for (const p of section.passages) {
    const hasFigureTable = p.figures?.some(f => f.type === 'table') ?? false

    if (PIPE_TABLE_LINE.test(p.passageText)) {
      fail(p.id, 'passageText', 'contains raw markdown pipe-table line(s)')
    }
    if (TABLE_REF.test(p.passageText) && !hasFigureTable) {
      fail(p.id, 'passageText', `references "Table N" but no figure table exists`)
    }
    if (hasFigureTable && PIPE_TABLE_LINE.test(p.passageText)) {
      fail(p.id, 'passageText', 'figure table exists but raw table text also present (duplicate)')
    }

    for (const fig of p.figures ?? []) {
      if (fig.type === 'table') {
        if (!(fig as { headers: string[] }).headers?.length) {
          fail(p.id, `figure[table].headers`, 'empty or missing')
        }
        if (!(fig as { rows: string[][] }).rows?.length) {
          fail(p.id, `figure[table].rows`, 'empty or missing')
        }
      }
    }

    for (const q of p.questions) {
      if (PIPE_TABLE_LINE.test(q.question)) {
        fail(q.id, 'question', 'contains raw markdown pipe-table line(s)')
      }
    }
  }

  // Discrete questions
  for (const q of section.discreteQuestions) {
    if (PIPE_TABLE_LINE.test(q.question)) {
      fail(q.id, 'question', 'contains raw markdown pipe-table line(s)')
    }
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
const passageCount = form1Sections.reduce((n, s) => n + s.passages.length, 0)
const discreteCount = form1Sections.reduce((n, s) => n + s.discreteQuestions.length, 0)

if (issues === 0) {
  console.log(
    `✓ All ${qbQuestions.length} QB questions, ${passageCount} Form 1 passages, ` +
    `and ${discreteCount} discrete questions passed table format validation`
  )
} else {
  console.error(`\n${issues} issue(s) found`)
  process.exit(1)
}
