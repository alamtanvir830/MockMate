/**
 * Validates SAT Practice Test Form 1 question data.
 *
 * Checks:
 *  1. Question counts per module (27/27/27/22/22/22)
 *  2. Duplicate question IDs
 *  3. Missing required fields
 *  4. correctAnswer (MC) is one of the choice labels A/B/C/D
 *  5. Explanation letter matches correctAnswer ("Choice X is correct")
 *  6. wrongAnswerExplanations cover every non-correct choice
 *  7. Raw pipe-table characters in any text field
 *  8. Table/graph references in text without renderable graphData
 *  9. "underlined" reference without underlineTargets markup
 * 10. Answer distribution per module (flag > 40% or streak of 4+)
 *
 * Run: npx ts-node --project tsconfig.json scripts/validate-sat-form-1.ts
 */

import { rwModule1Questions } from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '../lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions } from '../lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '../lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '../lib/premade-exams/sat/math-module-2-hard'
import type {
  SATQuestion,
  RWQuestion,
  MathMCQuestion,
  MathGridInQuestion,
  ChoiceLabel,
} from '../lib/premade-exams/sat/types'

const modules: { name: string; expected: number; questions: SATQuestion[] }[] = [
  { name: 'rw-module-1', expected: 27, questions: rwModule1Questions },
  { name: 'rw-module-2-easy', expected: 27, questions: rwModule2EasyQuestions },
  { name: 'rw-module-2-hard', expected: 27, questions: rwModule2HardQuestions },
  { name: 'math-module-1', expected: 22, questions: mathModule1Questions },
  { name: 'math-module-2-easy', expected: 22, questions: mathModule2EasyQuestions },
  { name: 'math-module-2-hard', expected: 22, questions: mathModule2HardQuestions },
]

const LABELS: ChoiceLabel[] = ['A', 'B', 'C', 'D']
// A markdown table row: a line with 2+ pipes AND surrounding spaces around a pipe,
// e.g. "Year | Value | Extra". Absolute-value bars like |2x − 1| have no spaces
// around the inner content the same way and only one pipe pair, so exclude those.
const PIPE_TABLE = /^\s*\S[^\n]*\s\|\s[^\n]*\s\|\s/m
const TABLE_REF = /\b(the table|Table\s+\d)\b/i
const GRAPH_REF = /\b(the (chart|scatter ?plot)|Figure\s+\d)\b/i // "the graph of f(x)" is self-contained, not a rendered figure
const UNDERLINE_REF = /underlined (word|phrase|sentence|portion|claim|text)/i
// Markdown/LaTeX/HTML artifacts. Note: SAT blanks use runs of underscores
// (e.g. "_______"), so only flag "__word__" style paired underline emphasis.
const MARKDOWN = /(\*\*[^\n*]+\*\*|\\frac|\\\(|\\\)|<u>|<\/u>|&amp;|&lt;|&gt;|```)/

let issues = 0
const fail = (m: string) => { console.error('  ✗ ' + m); issues++ }

// ── 1. Counts + 2. duplicate IDs ────────────────────────────────────────────
const allIds = new Set<string>()
for (const mod of modules) {
  if (mod.questions.length !== mod.expected) {
    fail(`${mod.name}: expected ${mod.expected} questions, found ${mod.questions.length}`)
  }
  for (const q of mod.questions) {
    if (allIds.has(q.id)) fail(`Duplicate question id: ${q.id}`)
    allIds.add(q.id)
  }
}

// ── Per-question checks ─────────────────────────────────────────────────────
function textFields(q: SATQuestion): string[] {
  const fields: (string | undefined)[] = [
    (q as { stimulus?: string }).stimulus,
    q.question,
    (q as { explanation?: string }).explanation,
  ]
  const choices = (q as { choices?: { text: string }[] }).choices
  if (choices) for (const c of choices) fields.push(c.text)
  const wae = (q as { wrongAnswerExplanations?: Record<string, string> }).wrongAnswerExplanations
  if (wae) for (const k of Object.keys(wae)) fields.push(wae[k])
  return fields.filter((f): f is string => typeof f === 'string')
}

for (const mod of modules) {
  for (const q of mod.questions) {
    const id = q.id

    // 3. required fields
    if (!q.id || !q.section || !q.moduleId || !q.domain || !(q as { skill?: string }).skill ||
        !q.difficulty || !q.question || !(q as { explanation?: string }).explanation) {
      fail(`${id}: missing a required field`)
    }

    const isRW = q.section === 'reading-writing'
    const isMC = isRW || (q as MathMCQuestion | MathGridInQuestion).type === 'multiple_choice'

    if (isMC) {
      const mc = q as RWQuestion | MathMCQuestion
      if (!mc.choices || mc.choices.length !== 4) fail(`${id}: expected 4 choices`)
      // 4. correctAnswer in labels
      if (!LABELS.includes(mc.correctAnswer)) {
        fail(`${id}: correctAnswer "${mc.correctAnswer}" is not A/B/C/D`)
      }
      // 5. explanation letter matches
      const m = mc.explanation.match(/Choice\s+([A-D])\s+is correct/i)
      if (m && m[1].toUpperCase() !== mc.correctAnswer) {
        fail(`${id}: explanation says "Choice ${m[1]} is correct" but correctAnswer is ${mc.correctAnswer}`)
      }
      // 6. wrong-answer explanations cover every non-correct choice
      const wae = mc.wrongAnswerExplanations ?? {}
      for (const label of LABELS) {
        if (label === mc.correctAnswer) continue
        if (!wae[label]) fail(`${id}: missing wrongAnswerExplanation for choice ${label}`)
      }
    } else {
      const gi = q as MathGridInQuestion
      if (!gi.correctAnswer) fail(`${id}: grid-in missing correctAnswer`)
      if (!gi.acceptableAnswers?.length) fail(`${id}: grid-in missing acceptableAnswers`)
      else if (!gi.acceptableAnswers.includes(gi.correctAnswer)) {
        fail(`${id}: grid-in correctAnswer "${gi.correctAnswer}" not in acceptableAnswers`)
      }
    }

    // 7. raw pipe tables in any text field
    for (const t of textFields(q)) {
      if (PIPE_TABLE.test(t)) fail(`${id}: raw pipe-table text detected in a field`)
      if (MARKDOWN.test(t)) fail(`${id}: unrendered markdown/latex/html artifact in a field`)
    }

    // 8. table/graph reference without renderable data
    const graphData = (q as { graphData?: unknown }).graphData
    const stim = (q as { stimulus?: string }).stimulus ?? ''
    const refText = stim + ' ' + q.question
    if ((TABLE_REF.test(refText) || GRAPH_REF.test(refText)) && !graphData) {
      fail(`${id}: references a table/graph but has no graphData`)
    }

    // 9. underlined reference without underlineTargets
    if (isRW) {
      const rw = q as RWQuestion
      if (UNDERLINE_REF.test(rw.question) && !(rw.underlineTargets && rw.underlineTargets.length)) {
        fail(`${id}: references an "underlined" phrase but has no underlineTargets`)
      }
      // and every underline target must actually occur in the stimulus
      for (const t of rw.underlineTargets ?? []) {
        if (!rw.stimulus.includes(t)) fail(`${id}: underlineTarget "${t}" not found in stimulus`)
      }
    }
  }
}

// ── 10. answer distribution per module (MC only) ────────────────────────────
console.log('\nAnswer distribution (MC only):')
for (const mod of modules) {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  const seq: string[] = []
  for (const q of mod.questions) {
    const isMC = q.section === 'reading-writing' || (q as MathMCQuestion).type === 'multiple_choice'
    if (!isMC) continue
    const ca = (q as RWQuestion | MathMCQuestion).correctAnswer
    counts[ca]++
    seq.push(ca)
  }
  const total = seq.length
  console.log(`  ${mod.name}: A=${counts.A} B=${counts.B} C=${counts.C} D=${counts.D} (n=${total})`)
  for (const label of LABELS) {
    if (total > 0 && counts[label] / total > 0.4) {
      fail(`${mod.name}: choice ${label} exceeds 40% (${counts[label]}/${total})`)
    }
  }
  // streak of 4+
  let run = 1
  for (let i = 1; i < seq.length; i++) {
    run = seq[i] === seq[i - 1] ? run + 1 : 1
    if (run >= 4) { fail(`${mod.name}: streak of 4+ identical answers ending at index ${i}`); break }
  }
}

// ── Result ──────────────────────────────────────────────────────────────────
console.log()
if (issues === 0) {
  console.log('✓ SAT Form 1 validation PASSED — no issues found.')
  process.exit(0)
} else {
  console.error(`✗ SAT Form 1 validation FAILED — ${issues} issue(s).`)
  process.exit(1)
}
