/**
 * Audit SHSAT adaptive system.
 *
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-shsat-adaptive.ts
 */
export {}
import * as fs from 'fs'
import * as path from 'path'

const root = path.resolve(__dirname, '..')

function readFile(rel: string): string {
  return fs.readFileSync(path.join(root, rel), 'utf-8')
}

let passed = 0
let failed = 0

function check(desc: string, ok: boolean) {
  if (ok) { passed++; return }
  failed++
  console.error('  FAIL: ' + desc)
}

console.log('=== SHSAT Adaptive Audit ===\n')

// ── Metadata ──────────────────────────────────────────────────────────────────

const meta = readFile('lib/premade-exams/shsat-metadata.ts')

console.log('--- shsat-metadata.ts ---')

// All 34 RC question IDs covered
const rcIds = [
  'p1q1','p1q2','p1q3','p1q4','p1q5','p1q6','p1q7',
  'p2q1','p2q2','p2q3','p2q4','p2q5','p2q6','p2q7','p2q8','p2q9',
  'p3q1','p3q2','p3q3','p3q4','p3q5','p3q6','p3q7','p3q8','p3q9',
  'p4q1','p4q2','p4q3','p4q4','p4q5','p4q6','p4q7','p4q8','p4q9',
]
rcIds.forEach(id => check('RC meta entry for ' + id, meta.includes("'" + id + "'")))

// All 16 RevEdit question IDs covered
const reIds = ['re-a-q1','re-a-q2','re-a-q3','re-a-q4','re-a-q5','re-a-q6','re-a-q7','re-a-q8',
               're-b-q1','re-b-q2','re-b-q3','re-b-q4','re-b-q5','re-b-q6','re-b-q7','re-b-q8']
reIds.forEach(id => check('RevEdit meta entry for ' + id, meta.includes("'" + id + "'")))

// Math IDs (50Q — excludes q8-q13, q47)
const mathEasy   = ['math-q1','math-q2','math-q3','math-q4','math-q5','math-q6','math-q7']
const mathMedQ   = ['math-q14','math-q15','math-q16','math-q17','math-q18','math-q19','math-q20',
                    'math-q21','math-q22','math-q23','math-q24','math-q25','math-q26','math-q27',
                    'math-q28','math-q29','math-q30','math-q31','math-q32','math-q33']
const mathHardQ  = ['math-q34','math-q35','math-q36','math-q37','math-q38','math-q39','math-q40',
                    'math-q41','math-q42','math-q43','math-q44','math-q45','math-q46',
                    'math-q48','math-q49','math-q50','math-q51','math-q52','math-q53',
                    'math-q54','math-q55','math-q56','math-q57'];
[...mathEasy, ...mathMedQ, ...mathHardQ].forEach(id => check('Math meta entry for ' + id, meta.includes("'" + id + "'")))

// Math difficulty buckets are correct count
check('Math easy = 7 entries',   mathEasy.every(id => {
  const i = meta.indexOf("'" + id + "'")
  return i !== -1 && meta.slice(i, i + 120).includes("'easy'")
}))
check('Math medium = 20 entries', mathMedQ.every(id => {
  const i = meta.indexOf("'" + id + "'")
  return i !== -1 && meta.slice(i, i + 120).includes("'medium'")
}))
check('Math hard = 23 entries',   mathHardQ.every(id => {
  const i = meta.indexOf("'" + id + "'")
  return i !== -1 && meta.slice(i, i + 120).includes("'hard'")
}))

// Passage meta has all 4 passages
check("PASSAGE_META has 'passage-1'", meta.includes("'passage-1'"))
check("PASSAGE_META has 'passage-4'", meta.includes("'passage-4'"))

// ── Engine ────────────────────────────────────────────────────────────────────

const engine = readFile('lib/premade-exams/shsat-adaptive-engine.ts')

console.log('\n--- shsat-adaptive-engine.ts ---')

check('buildPool exported',            engine.includes('export function buildPool'))
check('createAdaptiveState exported',  engine.includes('export function createAdaptiveState'))
check('pickNext exported',             engine.includes('export function pickNext'))
check('computeDomainAccuracy exported',engine.includes('export function computeDomainAccuracy'))
check('AdaptivePool exported',         engine.includes('export interface AdaptivePool'))
check('AdaptiveState exported',        engine.includes('export interface AdaptiveState'))
check('PoolQuestion exported',         engine.includes('export interface PoolQuestion'))

check('pickNext: rolling window (2+ correct → up)',  engine.includes('correct >= 2'))
check('pickNext: rolling window (2+ wrong → down)',  engine.includes('wrong   >= 2') || engine.includes('wrong >= 2'))
check('pickNext: difficulty clamp (min easy)',        engine.includes('Math.max(idx - 1, 0)'))
check('pickNext: difficulty clamp (max hard)',        engine.includes('Math.min(idx + 1, 2)'))
check('pickNext: RC passes all passage questions',    engine.includes('chosen.questions'))
check('pickNext: seenPassageIds tracked',             engine.includes('seenPassageIds'))
check('pickNext: seenQuestionIds tracked',            engine.includes('seenQuestionIds'))
check('pickNext: sections RC→revdit_a→revdit_b→math',
  engine.includes("'revdit_a'") && engine.includes("'revdit_b'") && engine.includes("'math'"))
check('initial difficulty = medium',                 engine.includes("currentDifficulty: 'medium'"))
check('RevEdit A uses passages[0]',                  engine.includes("sub.passages[0]"))
check('revEditBQuestions from sub.questions',        engine.includes('revEditBQuestions'))
check('mathQuestions from sub.questions',            engine.includes('mathQuestions'))

// ── SHSATExamTaker component ──────────────────────────────────────────────────

const ui = readFile('components/premade/SHSATExamTaker.tsx')

console.log('\n--- SHSATExamTaker.tsx ---')

check('imports buildPool',               ui.includes('buildPool'))
check('imports createAdaptiveState',     ui.includes('createAdaptiveState'))
check('imports pickNext',                ui.includes('pickNext'))
check('imports QUESTION_META',           ui.includes('QUESTION_META'))
check('pool useMemo present',            ui.includes('const pool = useMemo'))
check('shownQuestions state present',    ui.includes('shownQuestions, setShownQuestions'))
check('adaptiveState state present',     ui.includes('adaptiveState, setAdaptiveState'))
check('lockedQuestionIds state present', ui.includes('lockedQuestionIds, setLockedQuestionIds'))
check('makeFlatBatch helper present',    ui.includes('function makeFlatBatch'))
check('ela_directions calls pickNext',   ui.includes("phase.tag === 'ela_directions'") && ui.includes('pickNext(adaptiveState'))
check('question phase calls pickNext',   (ui.match(/pickNext\(adaptiveState/g) ?? []).length >= 2)
check('questions locked after Next',     ui.includes('setLockedQuestionIds(prev => new Set'))
check('isLocked used in MCQ render',     ui.includes('isLocked'))
check('handleRetake resets shownQuestions',  ui.includes('setShownQuestions([])'))
check('handleRetake resets adaptiveState',   ui.includes('createAdaptiveState()'))
check('difficulty badge in breadcrumb',      ui.includes("meta.difficulty === 'easy'"))
check('ResultsScreen receives shownQuestions', ui.includes('flatQuestions={shownQuestions}'))
check('EndScreen receives shownQuestions',   (ui.match(/flatQuestions=\{shownQuestions\}/g) ?? []).length >= 2)
check('adaptive breakdown in results',       ui.includes('Adaptive Performance Breakdown'))
check('domain breakdown in results',         ui.includes('computeDomainAccuracy'))
check('difficulty breakdown in results',     ui.includes('computeDifficultyAccuracy'))
check('MockMate adaptive note in results',   ui.includes('MockMate adaptive SHSAT-style practice'))
check('passage question range only for RC',  ui.includes('subType') && ui.includes('reading_comprehension') && ui.includes('passageQStart}'))
check('RevEdit A shows single-Q reference',  ui.includes('This question refers to the following passage'))

// ── No regressions ────────────────────────────────────────────────────────────

check('Attention modal still present',           ui.includes('>Attention<'))
check('PassageIntroScreen still present',        ui.includes('PassageIntroScreen'))
check('match tiles-in-boxes still present',      ui.includes('removeTile') && ui.includes('placeTile'))
check('passageNumberMap still present',          ui.includes('passageNumberMap'))
check('No stale flatQuestions references remain',
  !ui.includes('flatQuestions[') || ui.includes('flatQuestions[phase'))  // only pattern remaining should be param names

console.log('\nRESULT: ' + passed + ' passed, ' + failed + ' failed — ' + (failed === 0 ? 'PASS ✓' : 'FAIL ✗'))
if (failed > 0) process.exit(1)
