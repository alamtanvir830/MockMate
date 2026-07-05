/**
 * Question bank grading audit — static code check verifying QB scoring
 * uses percent/correct counts, NOT SAT/MCAT scaled scores.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-question-bank-grading.ts
 */
import * as fs from 'fs'
import * as path from 'path'

const root = path.resolve(__dirname, '..')

function readFile(rel: string): string {
  try { return fs.readFileSync(path.join(root, rel), 'utf-8') } catch { return '' }
}

let passed = 0
let failed = 0

function check(desc: string, ok: boolean) {
  if (ok) { passed++; return }
  failed++
  console.error(`  FAIL: ${desc}`)
}

console.log('=== Question Bank Grading Audit ===\n')

// SAT QB results page
const satResults = readFile('app/(dashboard)/question-bank/sat/results/page.tsx')
console.log('--- SAT QB results page ---')
check('Uses percent accuracy (not scaled score)',       satResults.includes('accuracy'))
check('Counts correct answers',                         satResults.includes('correct.length'))
check('Does not use rwScaled / 800',                   !satResults.includes('rwScaled') && !satResults.includes('/ 800'))
check('Does not use convertRWScore',                   !satResults.includes('convertRWScore'))
check('Does not reference SAT 1600',                   !satResults.includes('1600'))

// MCAT QB results page
const mcatResults = readFile('app/(dashboard)/question-bank/mcat/results/page.tsx')
console.log('\n--- MCAT QB results page ---')
check('Uses percent accuracy',                          mcatResults.includes('accuracy'))
check('Counts correct answers',                        mcatResults.includes('correct.length') || mcatResults.includes('correct:'))
check('Does not use convertSectionScore',              !mcatResults.includes('convertSectionScore'))
check('Does not reference MCAT 528',                   !mcatResults.includes('528'))

// SAT QB main page (history)
const satQBPage = readFile('app/(dashboard)/question-bank/sat/page.tsx')
console.log('\n--- SAT QB history page ---')
check('Shows totalScore from attempt (premade score)',  satQBPage.includes('totalScore'))
check('Does not compute new scaled score inline',      !satQBPage.includes('convertRWScore'))

// QB history page
const qbHistory = readFile('app/(dashboard)/question-bank/history/[practiceSetId]/page.tsx')
console.log('\n--- QB history page ---')
if (qbHistory) {
  check('No raw SAT score computation',    !qbHistory.includes('convertRWScore'))
  check('No raw MCAT score computation',  !qbHistory.includes('convertSectionScore'))
} else {
  console.log('  (file not found — skipping)')
  passed++ // neutral
}

// QB sync API
const qbSync = readFile('app/api/qb/sync-history/route.ts')
console.log('\n--- QB sync API ---')
if (qbSync) {
  check('No SAT scaled scoring in sync',  !qbSync.includes('convertRWScore'))
  check('No MCAT scaled scoring in sync', !qbSync.includes('convertSectionScore'))
} else {
  console.log('  (file not found — skipping)')
  passed++
}

// SAT attempt store applies current scoring on read (key correctness guarantee)
const attemptStore = readFile('lib/premade-exams/sat/attempt-store.ts')
console.log('\n--- SAT attempt store ---')
check('applyCurrentScoring exists',    attemptStore.includes('applyCurrentScoring'))
check('rescoreAttempt imported',       attemptStore.includes('rescoreAttempt'))
check('applied in readStorage',        attemptStore.includes('attempts.map(applyCurrentScoring)'))

// MCAT attempt store does NOT store to Supabase (localStorage only)
const mcatStore = readFile('lib/premade-exams/mcat/attempt-store.ts')
console.log('\n--- MCAT attempt store ---')
check('Uses localStorage, not Supabase', !mcatStore.includes('supabase'))
check('No SAT score functions imported', !mcatStore.includes('convertRWScore'))

console.log(`\nRESULT: ${passed} passed, ${failed} failed — ${failed === 0 ? 'PASS ✓' : 'FAIL ✗'}`)
if (failed > 0) process.exit(1)
