/**
 * Validates that SAT answer review/explanation pages have visual rendering
 * and reports coverage of graphData across all question files.
 *
 * Run: npx tsx scripts/validate-sat-review-visuals.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// ── Helpers ────────────────────────────────────────────────────────────────────

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }
const INFO = (msg: string) => console.log('  ·', msg)

const ROOT = path.join(__dirname, '..')

function readFile(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf-8')
}

function countMatches(content: string, pattern: RegExp): number {
  return (content.match(pattern) ?? []).length
}

const DIVIDER = '─'.repeat(64)
const HEADER  = '═'.repeat(64)

console.log('\n' + HEADER)
console.log('  SAT Review Pages — Visual Rendering Audit')
console.log(HEADER)

// ── 1. SATExamTaker.tsx — main premade exam results ────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  SATExamTaker.tsx (premade exam results / answer key)')
console.log(DIVIDER)
{
  const src = readFile('components/premade/SATExamTaker.tsx')

  if (/qGraphData && <SATGraph/.test(src)) {
    PASS('graphData renders in answer-key section (qGraphData && <SATGraph)')
  } else {
    FAIL('Missing: qGraphData && <SATGraph in results section')
  }

  if (/StimulusRenderer/.test(src) && /stimulus/.test(src)) {
    PASS('StimulusRenderer renders passage text in answer-key section')
  } else {
    FAIL('Missing: StimulusRenderer usage in SATExamTaker.tsx')
  }

  const graphCount = countMatches(src, /graphData/g)
  INFO(`graphData references in file: ${graphCount}`)
}

// ── 2. QB practice page — live practice session ────────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  QB practice page (live question-bank practice session)')
console.log(DIVIDER)
{
  const src = readFile('app/(dashboard)/question-bank/sat/practice/page.tsx')

  if (/currentQ\.graphData && /.test(src) && /SATGraph/.test(src)) {
    PASS('graphData renders during QB practice (currentQ.graphData && <SATGraph)')
  } else {
    FAIL('Missing: currentQ.graphData && <SATGraph in QB practice page')
  }

  if (/StimulusRenderer/.test(src) && /stimulus/.test(src)) {
    PASS('StimulusRenderer renders stimulus in QB practice page')
  } else {
    FAIL('Missing: StimulusRenderer in QB practice page')
  }
}

// ── 3. QB results page — missed questions review ───────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  QB results page (missed questions review)')
console.log(DIVIDER)
{
  const src = readFile('app/(dashboard)/question-bank/sat/results/page.tsx')

  if (/q\.graphData && /.test(src) && /SATGraph/.test(src)) {
    PASS('graphData renders in QB missed-questions review (q.graphData && <SATGraph)')
  } else {
    FAIL('Missing: q.graphData && <SATGraph in QB results page')
  }

  if (/StimulusRenderer/.test(src) && /stimulus/.test(src)) {
    PASS('StimulusRenderer renders stimulus in QB results page')
  } else {
    FAIL('Missing: StimulusRenderer in QB results page')
  }
}

// ── 4. SATGraph.tsx — accepts both type families ───────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  SATGraph.tsx — type compatibility')
console.log(DIVIDER)
{
  const src = readFile('components/exam/SATGraph.tsx')

  if (/QBGraphData/.test(src)) {
    PASS('SATGraph imports QBGraphData (QB questions can render)')
  } else {
    FAIL('SATGraph does not import QBGraphData — QB visuals may be broken')
  }

  if (/SATGraphData/.test(src)) {
    PASS('SATGraph imports SATGraphData (premade exam questions can render)')
  } else {
    FAIL('SATGraph does not import SATGraphData — premade visuals may be broken')
  }

  if (/SATGraphData.*QBGraphData|QBGraphData.*SATGraphData/.test(src)) {
    PASS('SATGraph accepts union type (SATGraphData | QBGraphData)')
  } else {
    FAIL('SATGraph may not accept union type — check GraphData type alias')
  }
}

// ── 5. Premade exam question coverage ─────────────────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  Premade exam questions — graphData coverage')
console.log(DIVIDER)
{
  const satDir = path.join(ROOT, 'lib', 'premade-exams', 'sat')
  const files = fs.readdirSync(satDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'attempt-store.ts' && f !== 'scoring.ts' && f !== 'adaptive-routing.ts')

  let totalGraphData = 0
  const fileStats: { file: string; count: number }[] = []

  for (const file of files.sort()) {
    const src = fs.readFileSync(path.join(satDir, file), 'utf-8')
    const count = countMatches(src, /graphData\s*:/g)
    if (count > 0) {
      totalGraphData += count
      fileStats.push({ file, count })
    }
  }

  INFO(`Premade exam files with graphData: ${fileStats.length}`)
  for (const { file, count } of fileStats) {
    INFO(`  ${file}: ${count} question(s) with graphData`)
  }
  INFO(`Total premade questions with graphData: ${totalGraphData}`)
  if (totalGraphData > 0) {
    PASS(`${totalGraphData} premade questions have graphData — will render on review`)
  }
}

// ── 6. QB question coverage ────────────────────────────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  Question Bank questions — graphData coverage')
console.log(DIVIDER)
{
  const qbDir = path.join(ROOT, 'lib', 'question-bank', 'sat')
  const files = fs.readdirSync(qbDir).filter(f => f.endsWith('.ts') && f !== 'question-selector.ts')

  let totalGraphData = 0
  const fileStats: { file: string; count: number }[] = []

  for (const file of files.sort()) {
    const src = fs.readFileSync(path.join(qbDir, file), 'utf-8')
    const count = countMatches(src, /graphData\s*:/g)
    if (count > 0) {
      totalGraphData += count
      fileStats.push({ file, count })
    }
  }

  INFO(`QB files with graphData: ${fileStats.length}`)
  for (const { file, count } of fileStats) {
    INFO(`  ${file}: ${count} question(s) with graphData`)
  }
  INFO(`Total QB questions with graphData: ${totalGraphData}`)
  if (totalGraphData > 0) {
    PASS(`${totalGraphData} QB questions have graphData — will render on review`)
  }
}

// ── 7. Form results pages delegate to SATExamTaker ────────────────────────────

console.log(`\n${DIVIDER}`)
console.log('  Form results pages — SATExamTaker delegation')
console.log(DIVIDER)
{
  const resultPages = [
    'app/(dashboard)/premade/sat/form-1/results/[attemptId]/SATForm1ResultsClient.tsx',
    'app/(dashboard)/premade/sat/form-2/results/[attemptId]/page.tsx',
    'app/(dashboard)/premade/sat/form-3/results/[attemptId]/page.tsx',
    'app/(dashboard)/premade/sat/form-4/results/[attemptId]/page.tsx',
    'app/(dashboard)/premade/sat/form-5/results/[attemptId]/page.tsx',
  ]

  let allDelegate = true
  for (const page of resultPages) {
    const src = readFile(page)
    if (/SATExamTaker/.test(src)) {
      INFO(`${path.basename(path.dirname(page))}/${path.basename(page)} → SATExamTaker ✓`)
    } else {
      FAIL(`${page} does not use SATExamTaker — visuals may be missing`)
      allDelegate = false
    }
  }
  if (allDelegate) {
    PASS('All 5 form results pages delegate to SATExamTaker (visual rendering inherited)')
  }
}

// ── Summary ────────────────────────────────────────────────────────────────────

console.log(`\n${HEADER}`)
console.log('  Summary')
console.log(HEADER)
console.log(`  Checks failed: ${failed}`)
console.log()

if (failed === 0) {
  console.log('✅ All visual rendering checks passed — SAT review pages show visuals.\n')
} else {
  console.log(`❌ ${failed} check(s) failed — fix missing visual rendering before shipping.\n`)
}

process.exit(failed > 0 ? 1 : 0)
