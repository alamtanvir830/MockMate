/**
 * Validation script for the SAT Question Bank.
 *
 * Run:
 *   npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/validate-sat-qbank.ts
 *
 * Checks:
 *  - Total question counts
 *  - Duplicate IDs
 *  - Missing required fields
 *  - MC correctAnswer not in A/B/C/D
 *  - MC choices count / wrongAnswerExplanations presence
 *  - Explanation letter mismatch
 *  - Raw pipe-table / markdown / LaTeX / HTML artifacts in text fields
 *  - Table/graph references without graphData
 *  - Underlined-phrase references without underlineTargets
 *  - grid-in correctAnswer not in acceptableAnswers
 *  - Answer distribution (flag any letter > 40%)
 *  - Invalid domain / skill
 */

import { rwQuestions } from '../lib/question-bank/sat/rw-questions'
import { mathQuestions } from '../lib/question-bank/sat/math-questions'
import type { QBQuestion } from '../lib/question-bank/types'

// ── Canonical domain → skill map (from audit spec) ────────────────────────────
const VALID_SKILLS: Record<string, string[]> = {
  'Information and Ideas': ['Central Ideas and Details', 'Command of Evidence', 'Inferences'],
  'Craft and Structure': ['Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections'],
  'Expression of Ideas': ['Rhetorical Synthesis', 'Transitions'],
  'Standard English Conventions': ['Boundaries', 'Form, Structure, and Sense'],
  'Algebra': [
    'Linear equations in one variable',
    'Linear equations in two variables',
    'Linear functions',
    'Systems of two linear equations',
    'Linear inequalities',
  ],
  'Advanced Math': [
    'Equivalent expressions',
    'Nonlinear functions',
    'Quadratic equations',
    'Exponential functions',
    'Nonlinear equations in one variable',
  ],
  'Problem-Solving and Data Analysis': [
    'Ratios, rates, proportional relationships',
    'Percentages',
    'One-variable data',
    'Two-variable data',
    'Probability',
  ],
  'Geometry and Trigonometry': [
    'Area and volume',
    'Lines, angles, and triangles',
    'Right triangles and trigonometry',
    'Circles',
  ],
}

const REQUIRED_FIELDS: (keyof QBQuestion)[] = [
  'id',
  'section',
  'domain',
  'skill',
  'difficulty',
  'question',
  'correctAnswer',
  'explanation',
  'teachingPoint',
  'relatedSkills',
]

const TEXT_FIELDS: (keyof QBQuestion)[] = [
  'stimulus',
  'question',
  'explanation',
  'teachingPoint',
]

const issues: string[] = []
const warnings: string[] = []
const add = (list: string[], id: string, msg: string) => list.push(`[${id}] ${msg}`)

function textOf(q: QBQuestion): { field: string; value: string }[] {
  const out: { field: string; value: string }[] = []
  for (const f of TEXT_FIELDS) {
    const v = q[f]
    if (typeof v === 'string') out.push({ field: f as string, value: v })
  }
  q.choices?.forEach((c) => out.push({ field: `choices.${c.label}`, value: c.text }))
  if (q.wrongAnswerExplanations) {
    for (const [k, v] of Object.entries(q.wrongAnswerExplanations)) {
      if (typeof v === 'string') out.push({ field: `wrongAnswerExplanations.${k}`, value: v })
    }
  }
  return out
}

// Markdown / LaTeX / HTML artifacts. Note: '_______' blanks are legitimate.
function scanArtifacts(q: QBQuestion) {
  for (const { field, value } of textOf(q)) {
    // Pipe table = a markdown table row (trimmed line both starts and ends with '|'
    // and has an interior separator) or a |---| separator row. Absolute-value bars
    // like |2x-5| ≥ 7 or |expression| ≥ k are NOT tables.
    const hasTableRow = value.split('\n').some((raw) => {
      const ln = raw.trim()
      return ln.startsWith('|') && ln.endsWith('|') && (ln.match(/\|/g) ?? []).length >= 3
    })
    if (hasTableRow || /\|\s*:?-{2,}\s*:?\|/.test(value)) add(issues, q.id, `raw pipe table in ${field}`)
    if (/\*\*(?!_)/.test(value.replace(/_{3,}/g, ''))) add(issues, q.id, `markdown bold in ${field}`)
    if (/__[A-Za-z]/.test(value)) add(issues, q.id, `markdown underline in ${field}`)
    if (/\\frac|\\sqrt|\\times|\\\(|\\\)/.test(value)) add(issues, q.id, `unrendered LaTeX in ${field}`)
    if (/<\/?u>/.test(value)) add(issues, q.id, `<u> tag in ${field}`)
    if (/&amp;|&lt;|&gt;/.test(value)) add(issues, q.id, `raw HTML entity in ${field}`)
    if (/`/.test(value)) add(issues, q.id, `stray backtick in ${field}`)
    if (/ {2,}/.test(value)) add(warnings, q.id, `double space in ${field}`)
    if (/\s$/.test(value)) add(warnings, q.id, `trailing space in ${field}`)
  }
}

const LETTER_WORDS: Record<string, RegExp> = {
  A: /\bchoice\s+a\b|\boption\s+a\b/i,
  B: /\bchoice\s+b\b|\boption\s+b\b/i,
  C: /\bchoice\s+c\b|\boption\s+c\b/i,
  D: /\bchoice\s+d\b|\boption\s+d\b/i,
}

function validate(questions: QBQuestion[], label: string) {
  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  let mcCount = 0

  for (const q of questions) {
    // required fields
    for (const f of REQUIRED_FIELDS) {
      const v = q[f]
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
        add(issues, q.id, `missing required field: ${String(f)}`)
      }
    }

    // domain / skill
    const validSkills = VALID_SKILLS[q.domain]
    if (!validSkills) add(issues, q.id, `invalid domain: "${q.domain}"`)
    else if (!validSkills.includes(q.skill)) add(issues, q.id, `skill "${q.skill}" not valid for domain "${q.domain}"`)

    scanArtifacts(q)

    // graph/table reference without data.
    // "the graph of y = ..." / "the graph of f" names an equation, not a figure,
    // and is answerable algebraically, so it is excluded.
    const refText = `${q.stimulus ?? ''} ${q.question}`
    const namesFigure = /\b(the table|the chart|the scatterplot|Figure \d|Table \d)\b/i.test(refText) ||
      (/\bthe graph\b/i.test(refText) && !/\bthe graph of\b/i.test(refText))
    if (namesFigure && !q.graphData) {
      add(issues, q.id, `references a table/graph but has no graphData`)
    }

    // underlined phrase without targets
    if (/\bunderlined\b/i.test(refText) && (!q.underlineTargets || q.underlineTargets.length === 0)) {
      add(issues, q.id, `references "underlined" text but has no underlineTargets`)
    }

    if (q.questionType === 'multiple_choice') {
      mcCount++
      if (!q.choices || q.choices.length !== 4) add(issues, q.id, `expected 4 choices, found ${q.choices?.length ?? 0}`)
      const labels = (q.choices ?? []).map((c) => c.label)
      if (new Set(labels).size !== labels.length) add(issues, q.id, `duplicate choice labels`)
      const texts = (q.choices ?? []).map((c) => c.text.trim().toLowerCase())
      if (new Set(texts).size !== texts.length) add(issues, q.id, `duplicate choice texts`)
      if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) add(issues, q.id, `MC correctAnswer "${q.correctAnswer}" not A/B/C/D`)
      else dist[q.correctAnswer]++
      if (!q.wrongAnswerExplanations) add(warnings, q.id, `MC missing wrongAnswerExplanations`)
      else {
        for (const k of Object.keys(q.wrongAnswerExplanations)) {
          if (k === q.correctAnswer) add(issues, q.id, `wrongAnswerExplanations includes the correct answer (${k})`)
          if (!labels.includes(k as 'A' | 'B' | 'C' | 'D')) add(issues, q.id, `wrongAnswerExplanations key ${k} has no matching choice`)
        }
      }
      // explanation letter mismatch: only when it explicitly asserts a letter is THE correct/right answer
      const m = q.explanation.match(/\b(?:choice|option)\s+([ABCD])\s+is\s+(?:the\s+)?(?:correct|right|best answer)\b/i)
      if (m && m[1].toUpperCase() !== q.correctAnswer) {
        add(warnings, q.id, `explanation asserts wrong letter is correct (${m[1].toUpperCase()} vs correct ${q.correctAnswer})`)
      }
    } else if (q.questionType === 'grid_in') {
      if (!q.acceptableAnswers || q.acceptableAnswers.length === 0) {
        add(issues, q.id, `grid_in missing acceptableAnswers`)
      } else {
        const norm = (s: string) => s.replace(/\s/g, '').toLowerCase()
        if (!q.acceptableAnswers.map(norm).includes(norm(q.correctAnswer))) {
          add(issues, q.id, `grid_in correctAnswer "${q.correctAnswer}" not in acceptableAnswers`)
        }
      }
    }
  }

  // distribution
  const pct = (n: number) => ((n / mcCount) * 100).toFixed(1)
  console.log(`\n${label}: ${questions.length} questions (${mcCount} MC)`)
  console.log(`  Answer distribution: A=${dist.A} (${pct(dist.A)}%)  B=${dist.B} (${pct(dist.B)}%)  C=${dist.C} (${pct(dist.C)}%)  D=${dist.D} (${pct(dist.D)}%)`)
  for (const letter of ['A', 'B', 'C', 'D']) {
    if (dist[letter] / mcCount > 0.4) console.log(`  ⚠️  ${letter} exceeds 40% of MC answers`)
  }
  return dist
}

// duplicate IDs across both files
const all = [...rwQuestions, ...mathQuestions]
const seen = new Map<string, number>()
for (const q of all) seen.set(q.id, (seen.get(q.id) ?? 0) + 1)
for (const [id, count] of seen) if (count > 1) add(issues, id, `duplicate id (${count}x)`)

console.log('════════════════════════════════════════════════════════')
console.log('  SAT QUESTION BANK VALIDATION')
console.log('════════════════════════════════════════════════════════')
console.log(`TOTAL: ${rwQuestions.length} RW + ${mathQuestions.length} Math = ${all.length}`)

validate(rwQuestions, 'READING & WRITING')
validate(mathQuestions, 'MATH')

console.log('\n──────────────────────────────────────────────────────')
if (issues.length === 0) {
  console.log(`✅ NO BLOCKING ISSUES`)
} else {
  console.log(`❌ ${issues.length} ISSUE(S):`)
  for (const i of issues) console.log('  - ' + i)
}
if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} WARNING(S):`)
  for (const w of warnings) console.log('  - ' + w)
}
console.log('──────────────────────────────────────────────────────')

process.exit(issues.length > 0 ? 1 : 0)
