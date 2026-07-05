/**
 * Deep validation of the MCAT Question Bank.
 *
 * Run with:
 *   npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/validate-mcat-qbank.ts
 *
 * Checks:
 *  - Question counts per section
 *  - Duplicate IDs
 *  - Missing required fields
 *  - correctAnswer not in A/B/C/D
 *  - Explanation letter mismatch (explanation says "Choice X" but correctAnswer differs)
 *  - Raw pipe-table characters in question/passageText (not in tableData)
 *  - tableData present but question/passageText still has a raw table
 *  - Table reference ("Table 1") without tableData
 *  - wrongAnswerExplanations missing entries for wrong choices
 *  - choices not exactly 4 entries with labels A,B,C,D
 *  - Invalid section / scientificSkill / difficulty / questionType values
 *  - Answer distribution (flag > 40%)
 *  - Discrete questions with passageText / passage questions without passageText
 *  - Markdown / LaTeX / HTML artifacts in any text field
 */

import { chemPhysQuestions } from '../lib/question-bank/mcat/chem-phys'
import { bioBiochemQuestions } from '../lib/question-bank/mcat/bio-biochem'
import { psychSocQuestions } from '../lib/question-bank/mcat/psych-soc'
import { carsQuestions } from '../lib/question-bank/mcat/cars'
import type { MCATQBQuestion, MCATQBSection } from '../lib/question-bank/mcat/types'

const SECTIONS: Record<MCATQBSection, MCATQBQuestion[]> = {
  'chem-phys': chemPhysQuestions,
  'bio-biochem': bioBiochemQuestions,
  'cars': carsQuestions,
  'psych-soc': psychSocQuestions,
}

const all: MCATQBQuestion[] = [
  ...chemPhysQuestions,
  ...bioBiochemQuestions,
  ...carsQuestions,
  ...psychSocQuestions,
]

const VALID_SECTIONS = new Set(['chem-phys', 'bio-biochem', 'cars', 'psych-soc'])
const VALID_SKILLS = new Set(['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'])
const VALID_DIFF = new Set(['easy', 'medium', 'hard'])
const VALID_TYPE = new Set(['passage', 'discrete'])
const LABELS = ['A', 'B', 'C', 'D']

const DISCIPLINES: Record<MCATQBSection, Set<string>> = {
  'chem-phys': new Set(['General Chemistry', 'Physics', 'Biochemistry', 'Organic Chemistry']),
  'bio-biochem': new Set(['Biology', 'Biochemistry', 'Organic Chemistry', 'General Chemistry']),
  'cars': new Set(['English', 'Social Sciences', 'Humanities']),
  'psych-soc': new Set(['Psychology', 'Sociology', 'Biology']),
}

const PIPE_TABLE_LINE = /^\s*\|/m
const TABLE_REF = /\bTable\s+\d/i

let errors = 0
let warnings = 0
const err = (id: string, msg: string) => { console.error(`  ERROR [${id}] ${msg}`); errors++ }
const warn = (id: string, msg: string) => { console.warn(`  WARN  [${id}] ${msg}`); warnings++ }

// ── Counts ────────────────────────────────────────────────────────────────────
console.log('=== Question counts ===')
for (const s of Object.keys(SECTIONS) as MCATQBSection[]) {
  console.log(`  ${s}: ${SECTIONS[s].length}`)
}
console.log(`  TOTAL: ${all.length}\n`)

// ── Duplicate IDs ─────────────────────────────────────────────────────────────
console.log('=== Structural checks ===')
const seen = new Set<string>()
for (const q of all) {
  if (seen.has(q.id)) err(q.id, 'duplicate ID')
  seen.add(q.id)
}

// ── Per-question checks ───────────────────────────────────────────────────────
function textFields(q: MCATQBQuestion): { name: string; value: string }[] {
  const f: { name: string; value: string }[] = [
    { name: 'question', value: q.question },
    { name: 'explanation', value: q.explanation },
    { name: 'teachingPoint', value: q.teachingPoint },
  ]
  if (q.passageText) f.push({ name: 'passageText', value: q.passageText })
  q.choices?.forEach(c => f.push({ name: `choice ${c.label}`, value: c.text }))
  for (const k of LABELS) {
    const v = q.wrongAnswerExplanations?.[k as 'A']
    if (v) f.push({ name: `wrongAns ${k}`, value: v })
  }
  return f
}

for (const q of all) {
  // Required fields
  for (const field of ['id', 'test', 'section', 'discipline', 'contentCategory',
    'foundationalConcept', 'scientificSkill', 'difficulty', 'questionType',
    'question', 'correctAnswer', 'explanation', 'teachingPoint'] as const) {
    if (!q[field] || (typeof q[field] === 'string' && (q[field] as string).trim() === '')) {
      err(q.id, `missing/empty required field: ${field}`)
    }
  }
  if (!Array.isArray(q.relatedTopics)) err(q.id, 'relatedTopics not an array')

  // Enum validity
  if (!VALID_SECTIONS.has(q.section)) err(q.id, `invalid section: ${q.section}`)
  if (!VALID_SKILLS.has(q.scientificSkill)) err(q.id, `invalid scientificSkill: ${q.scientificSkill}`)
  if (!VALID_DIFF.has(q.difficulty)) err(q.id, `invalid difficulty: ${q.difficulty}`)
  if (!VALID_TYPE.has(q.questionType)) err(q.id, `invalid questionType: ${q.questionType}`)
  if (q.test !== 'MCAT') err(q.id, `invalid test: ${q.test}`)

  // Discipline matches section
  if (VALID_SECTIONS.has(q.section) && !DISCIPLINES[q.section].has(q.discipline)) {
    warn(q.id, `discipline "${q.discipline}" not in ${q.section} allowed list`)
  }

  // contentCategory format (should look like "4A: ..." or "1A: ..." for sciences)
  if (q.section !== 'cars' && !/^\d+[A-Z]:\s/.test(q.contentCategory)) {
    warn(q.id, `contentCategory "${q.contentCategory}" does not match "NX: Description" format`)
  }

  // Choices
  if (!Array.isArray(q.choices) || q.choices.length !== 4) {
    err(q.id, `choices length is ${q.choices?.length} (expected 4)`)
  } else {
    const labels = q.choices.map(c => c.label)
    if (JSON.stringify(labels) !== JSON.stringify(LABELS)) {
      err(q.id, `choice labels are ${labels.join(',')} (expected A,B,C,D)`)
    }
    q.choices.forEach(c => { if (!c.text || c.text.trim() === '') err(q.id, `choice ${c.label} empty`) })
    // Duplicate choice text
    const texts = q.choices.map(c => c.text.trim().toLowerCase())
    if (new Set(texts).size !== texts.length) err(q.id, 'duplicate choice text')
  }

  // correctAnswer valid
  if (!LABELS.includes(q.correctAnswer)) err(q.id, `correctAnswer "${q.correctAnswer}" invalid`)

  // Explanation letter mismatch: if it explicitly names a single "Choice X" / "Answer X" / "Option X"
  const named = [...q.explanation.matchAll(/\b(?:Choice|Answer|Option)\s+([A-D])\b/g)].map(m => m[1])
  if (named.length > 0 && !named.includes(q.correctAnswer)) {
    err(q.id, `explanation names Choice(s) ${[...new Set(named)].join(',')} but correctAnswer is ${q.correctAnswer}`)
  }

  // wrongAnswerExplanations coverage
  const wrongLabels = LABELS.filter(l => l !== q.correctAnswer)
  for (const l of wrongLabels) {
    const v = q.wrongAnswerExplanations?.[l as 'A']
    if (!v || v.trim() === '') err(q.id, `wrongAnswerExplanations missing ${l}`)
  }
  // wrongAnswerExplanations should NOT contain the correct answer key
  if (q.wrongAnswerExplanations?.[q.correctAnswer]) {
    warn(q.id, `wrongAnswerExplanations includes the correct answer key ${q.correctAnswer}`)
  }

  // passage/discrete consistency
  if (q.questionType === 'passage' && (!q.passageText || q.passageText.trim() === '')) {
    err(q.id, 'passage question without passageText')
  }
  if (q.questionType === 'discrete' && q.passageText && q.passageText.trim() !== '') {
    err(q.id, 'discrete question has passageText')
  }

  // CARS must be passage-based
  if (q.section === 'cars' && q.questionType !== 'passage') {
    err(q.id, 'CARS question is not passage-type')
  }

  // Raw table / markdown / latex / html across all text fields
  for (const { name, value } of textFields(q)) {
    if (PIPE_TABLE_LINE.test(value)) err(q.id, `${name} has raw pipe-table line`)
    else if (value.includes('|')) warn(q.id, `${name} contains a pipe character`)
    if (/\|\s*-{2,}/.test(value) || /\|-{3,}/.test(value)) err(q.id, `${name} has |---| separator`)
    if (/\*\*[^*\n]+\*\*/.test(value)) warn(q.id, `${name} has **bold** markdown`)
    if (/(^|[^*])\*[^*\n]+\*($|[^*])/.test(value)) warn(q.id, `${name} has *italic* markdown`)
    if (/__[^_\n]+__/.test(value)) warn(q.id, `${name} has __underline__ markdown`)
    if (/\\frac|\\\(|\\\)|\\left|\\right|\\text\{|\\cdot|\\times\b/.test(value)) warn(q.id, `${name} has unrendered LaTeX`)
    if (/<\/?[a-zA-Z]+>/.test(value)) warn(q.id, `${name} has HTML tag`)
    if (/`/.test(value)) warn(q.id, `${name} has stray backtick`)
    if (/ {2,}/.test(value)) warn(q.id, `${name} has double space`)
    if (/[ \t]+$/m.test(value)) warn(q.id, `${name} has trailing whitespace`)
  }

  // Table reference vs tableData
  const qAndPassage = q.question + '\n' + (q.passageText ?? '')
  if (TABLE_REF.test(qAndPassage) && !q.tableData) {
    warn(q.id, 'references "Table N" but has no tableData')
  }
  if (q.tableData) {
    if (!q.tableData.headers || q.tableData.headers.length === 0) err(q.id, 'tableData.headers empty')
    if (!q.tableData.rows || q.tableData.rows.length === 0) err(q.id, 'tableData.rows empty')
    const hLen = q.tableData.headers?.length ?? 0
    q.tableData.rows?.forEach((r, i) => {
      if (r.length !== hLen) err(q.id, `tableData row ${i} has ${r.length} cells (expected ${hLen})`)
    })
    if (PIPE_TABLE_LINE.test(q.question) || (q.passageText && PIPE_TABLE_LINE.test(q.passageText))) {
      err(q.id, 'has tableData AND raw pipe-table in question/passage')
    }
  }
}

// ── Answer distribution ───────────────────────────────────────────────────────
console.log('\n=== Answer distribution ===')
function dist(qs: MCATQBQuestion[]) {
  const c: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  qs.forEach(q => { if (LABELS.includes(q.correctAnswer)) c[q.correctAnswer]++ })
  return c
}
function fmt(label: string, qs: MCATQBQuestion[]) {
  const c = dist(qs)
  const n = qs.length || 1
  const pct = (x: number) => `${x} (${((x / n) * 100).toFixed(0)}%)`
  const flags = LABELS.filter(l => (c[l] / n) > 0.4)
  console.log(`  ${label.padEnd(12)} A:${pct(c.A)}  B:${pct(c.B)}  C:${pct(c.C)}  D:${pct(c.D)}${flags.length ? '  <<< >40%: ' + flags.join(',') : ''}`)
  if (flags.length) warnings++
}
for (const s of Object.keys(SECTIONS) as MCATQBSection[]) fmt(s, SECTIONS[s])
fmt('OVERALL', all)

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n=== SUMMARY ===`)
console.log(`  Errors:   ${errors}`)
console.log(`  Warnings: ${warnings}`)
if (errors > 0) {
  console.log('\nVALIDATION: FAIL')
  process.exit(1)
} else {
  console.log('\nVALIDATION: PASS')
}
