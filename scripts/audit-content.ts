/**
 * SAT + MCAT content quality audit script
 * Run: npx tsx --tsconfig tsconfig.json scripts/audit-content.ts
 */

// ── SAT Form 1 ────────────────────────────────────────────────────────────────
import { rwModule1Questions } from '../lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '../lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '../lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions } from '../lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '../lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '../lib/premade-exams/sat/math-module-2-hard'

// ── SAT Form 2 ────────────────────────────────────────────────────────────────
import { f2RwModule1Questions } from '../lib/premade-exams/sat/form-2-rw-module-1'
import { f2RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions } from '../lib/premade-exams/sat/form-2-rw-module-2-hard'
import { f2MathModule1Questions } from '../lib/premade-exams/sat/form-2-math-module-1'
import { f2MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-2-math-module-2-easy'
import { f2MathModule2HardQuestions } from '../lib/premade-exams/sat/form-2-math-module-2-hard'

// ── SAT Form 3 ────────────────────────────────────────────────────────────────
import { f3RwModule1Questions } from '../lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions } from '../lib/premade-exams/sat/form-3-rw-module-2-hard'
import { f3MathModule1Questions } from '../lib/premade-exams/sat/form-3-math-module-1'
import { f3MathModule2EasyQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-easy'
import { f3MathModule2HardQuestions } from '../lib/premade-exams/sat/form-3-math-module-2-hard'

// ── SAT QB ────────────────────────────────────────────────────────────────────
import { rwQuestions } from '../lib/question-bank/sat/rw-questions'
import { mathQuestions } from '../lib/question-bank/sat/math-questions'

// ── MCAT Form 1 ───────────────────────────────────────────────────────────────
import { chemPhysSection } from '../lib/premade-exams/mcat/form-1-chem-phys'
import { carsSection } from '../lib/premade-exams/mcat/form-1-cars'
import { bioBiochemSection } from '../lib/premade-exams/mcat/form-1-bio-biochem'
import { psychSocSection } from '../lib/premade-exams/mcat/form-1-psych-soc'

// ── MCAT QB ───────────────────────────────────────────────────────────────────
import { chemPhysQuestions } from '../lib/question-bank/mcat/chem-phys'
import { carsQuestions } from '../lib/question-bank/mcat/cars'
import { bioBiochemQuestions } from '../lib/question-bank/mcat/bio-biochem'
import { psychSocQuestions } from '../lib/question-bank/mcat/psych-soc'

import type { SATQuestion, RWQuestion, MathMCQuestion } from '../lib/premade-exams/sat/types'
import type { MCATQuestion, MCATSection as MCATSectionType } from '../lib/premade-exams/mcat/types'
import type { QBQuestion } from '../lib/question-bank/types'
import type { MCATQBQuestion } from '../lib/question-bank/mcat/types'

// ── Helpers ───────────────────────────────────────────────────────────────────

function first8(text: string): string {
  return text.trim().split(/\s+/).slice(0, 8).join(' ').toLowerCase()
}

function first12(text: string): string {
  return text.trim().split(/\s+/).slice(0, 12).join(' ').toLowerCase()
}

function countMap<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const m: Record<string, number> = {}
  for (const item of items) {
    const k = key(item)
    m[k] = (m[k] ?? 0) + 1
  }
  return m
}

function dupEntries(m: Record<string, number>, threshold = 2): [string, number][] {
  return Object.entries(m).filter(([, v]) => v >= threshold).sort((a, b) => b[1] - a[1])
}

function streak(arr: string[]): { val: string; len: number; start: number }[] {
  const streaks: { val: string; len: number; start: number }[] = []
  let cur = arr[0], len = 1, start = 0
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] === cur) {
      len++
    } else {
      if (len >= 4) streaks.push({ val: cur, len, start })
      cur = arr[i]
      len = 1
      start = i
    }
  }
  return streaks
}

function pct(n: number, total: number) {
  return total === 0 ? '0%' : `${Math.round((n / total) * 100)}%`
}

function header(title: string) {
  console.log('\n' + '═'.repeat(62))
  console.log(`  ${title}`)
  console.log('═'.repeat(62))
}

function section(title: string) {
  console.log(`\n── ${title}`)
}

// ── Assemble datasets ─────────────────────────────────────────────────────────

const SAT_FORM1_ALL: SATQuestion[] = [
  ...rwModule1Questions, ...rwModule2EasyQuestions, ...rwModule2HardQuestions,
  ...mathModule1Questions, ...mathModule2EasyQuestions, ...mathModule2HardQuestions,
]
const SAT_FORM2_ALL: SATQuestion[] = [
  ...f2RwModule1Questions, ...f2RwModule2EasyQuestions, ...f2RwModule2HardQuestions,
  ...f2MathModule1Questions, ...f2MathModule2EasyQuestions, ...f2MathModule2HardQuestions,
]
const SAT_FORM3_ALL: SATQuestion[] = [
  ...f3RwModule1Questions, ...f3RwModule2EasyQuestions, ...f3RwModule2HardQuestions,
  ...f3MathModule1Questions, ...f3MathModule2EasyQuestions, ...f3MathModule2HardQuestions,
]
const ALL_SAT_PREMADE = [...SAT_FORM1_ALL, ...SAT_FORM2_ALL, ...SAT_FORM3_ALL]

function flattenMCAT(sec: MCATSectionType): MCATQuestion[] {
  return sec.passages.flatMap(p => p.questions)
}
const MCAT_FORM1_CHEM  = flattenMCAT(chemPhysSection)
const MCAT_FORM1_CARS  = flattenMCAT(carsSection)
const MCAT_FORM1_BIO   = flattenMCAT(bioBiochemSection)
const MCAT_FORM1_PSYCH = flattenMCAT(psychSocSection)
const MCAT_FORM1_ALL: MCATQuestion[] = [
  ...MCAT_FORM1_CHEM, ...MCAT_FORM1_CARS, ...MCAT_FORM1_BIO, ...MCAT_FORM1_PSYCH,
]

const SAT_QB_ALL: QBQuestion[] = [...rwQuestions, ...mathQuestions]
const MCAT_QB_ALL: MCATQBQuestion[] = [
  ...chemPhysQuestions, ...carsQuestions, ...bioBiochemQuestions, ...psychSocQuestions,
]

// ═══════════════════════════════════════════════════════════════
// SAT FORM 1
// ═══════════════════════════════════════════════════════════════

header('SAT FORM 1 — FULL AUDIT')

const f1rw = [...rwModule1Questions, ...rwModule2EasyQuestions, ...rwModule2HardQuestions]
const f1math = [...mathModule1Questions, ...mathModule2EasyQuestions, ...mathModule2HardQuestions]

section(`Total: ${SAT_FORM1_ALL.length}  (R&W: ${f1rw.length}, Math: ${f1math.length})`)

section('Answer distribution')
const f1mcAnswers = SAT_FORM1_ALL
  .filter(q => 'correctAnswer' in q && typeof (q as RWQuestion).correctAnswer === 'string' && (q as RWQuestion).correctAnswer.length === 1)
  .map(q => (q as RWQuestion).correctAnswer)
const f1aDist = countMap(f1mcAnswers, x => x)
;['A','B','C','D'].forEach(l => {
  const n = f1aDist[l] ?? 0
  console.log(`  ${l}: ${n.toString().padStart(3)}  (${pct(n, f1mcAnswers.length)})`)
})
const f1Streaks = streak(f1mcAnswers)
if (f1Streaks.length) {
  console.log('  ⚠️  STREAKS OF 4+:')
  f1Streaks.forEach(s => console.log(`    "${s.val}" ×${s.len} at position ${s.start + 1}`))
} else {
  console.log('  ✓ No streaks of 4+')
}

section('R&W skill distribution')
const f1rwSkills = countMap(f1rw as RWQuestion[], q => q.skill)
Object.entries(f1rwSkills).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

section('Math domain distribution')
const f1mathDomains = countMap(f1math as MathMCQuestion[], q => q.domain)
Object.entries(f1mathDomains).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

section('Math skill distribution (all)')
const f1mathSkills = countMap(f1math as MathMCQuestion[], q => q.skill)
Object.entries(f1mathSkills).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

section('Difficulty distribution')
const f1diff = countMap(SAT_FORM1_ALL, q => (q as RWQuestion).difficulty)
Object.entries(f1diff).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, SAT_FORM1_ALL.length)})`)
)

section('Repeated question stem prefixes (8 words, ≥3)')
const f1stemMap = countMap(SAT_FORM1_ALL, q => first8(q.question))
const f1dupStems = dupEntries(f1stemMap, 3)
if (f1dupStems.length) f1dupStems.forEach(([k, v]) => console.log(`  ×${v}  "${k}…"`))
else console.log('  ✓ None repeated 3+')

section('Math questions with graphData')
const f1withGraph = f1math.filter(q => 'graphData' in q && (q as MathMCQuestion).graphData)
console.log(`  ${f1withGraph.length}/${f1math.length} math questions have graphData`)

section('R&W "underlined" questions without underlineTargets')
const f1underlineQ = (f1rw as RWQuestion[]).filter(q => q.question.toLowerCase().includes('underlined'))
const f1underlineMissing = f1underlineQ.filter(q => !q.underlineTargets?.length)
if (f1underlineMissing.length) {
  f1underlineMissing.forEach(q => console.log(`  ⚠️  ${q.id}: missing underlineTargets`))
} else {
  console.log(`  ✓ All ${f1underlineQ.length} "underlined" questions have underlineTargets`)
}

// ═══════════════════════════════════════════════════════════════
// SAT FORMS 2 & 3
// ═══════════════════════════════════════════════════════════════

header('SAT FORMS 2 & 3 — QUICK AUDIT')

for (const [label, form] of [['Form 2', SAT_FORM2_ALL], ['Form 3', SAT_FORM3_ALL]] as [string, SATQuestion[]][]) {
  section(`${label}: ${form.length} total`)
  const mcAns = form
    .filter(q => 'correctAnswer' in q && typeof (q as RWQuestion).correctAnswer === 'string' && (q as RWQuestion).correctAnswer.length === 1)
    .map(q => (q as RWQuestion).correctAnswer)
  const dist = countMap(mcAns, x => x)
  console.log('  Answer dist: ' + ['A','B','C','D'].map(l => `${l}:${(dist[l]??0).toString().padStart(3)}`).join('  '))
  const s = streak(mcAns)
  if (s.length) console.log(`  ⚠️  Streaks: ${s.map(x => `"${x.val}"×${x.len}@pos${x.start+1}`).join(', ')}`)
  else console.log('  ✓ No streaks of 4+')

  const rwQs = form.filter(q => q.section === 'reading-writing') as RWQuestion[]
  const mathQs = form.filter(q => q.section === 'math') as MathMCQuestion[]
  const rwSkillsD = countMap(rwQs, q => q.skill)
  const mathDomsD = countMap(mathQs, q => q.domain)
  console.log('  R&W skills: ' + Object.entries(rwSkillsD).map(([k, v]) => `${k}:${v}`).join('  '))
  console.log('  Math domains: ' + Object.entries(mathDomsD).map(([k, v]) => `${k.split(' ')[0]}:${v}`).join('  '))
}

// ═══════════════════════════════════════════════════════════════
// CROSS-FORM DUPLICATE CHECK
// ═══════════════════════════════════════════════════════════════

header('CROSS-FORM DUPLICATE / NEAR-DUPLICATE CHECK')

section('Duplicate IDs across all SAT premade forms')
const allSatIds = ALL_SAT_PREMADE.map(q => q.id)
const idCounts = countMap(allSatIds, x => x)
const dupIds = dupEntries(idCounts, 2)
if (dupIds.length) dupIds.forEach(([k, v]) => console.log(`  ⚠️  ID "${k}" appears ${v} times`))
else console.log('  ✓ No duplicate IDs across forms')

section('Near-duplicate stems across all SAT premade (first 12 words, 2+ matches)')
const allSatStemMap: Record<string, string[]> = {}
for (const q of ALL_SAT_PREMADE) {
  const k = first12(q.question)
  if (!allSatStemMap[k]) allSatStemMap[k] = []
  allSatStemMap[k].push(q.id)
}
const nearDups = Object.entries(allSatStemMap).filter(([, ids]) => ids.length >= 2)
if (nearDups.length) nearDups.forEach(([k, ids]) => console.log(`  ⚠️  "${k}…" → ${ids.join(', ')}`))
else console.log('  ✓ No near-duplicate stems found')

// ═══════════════════════════════════════════════════════════════
// SAT QB AUDIT
// ═══════════════════════════════════════════════════════════════

header('SAT QUESTION BANK AUDIT')

section(`Total: ${SAT_QB_ALL.length}`)

const qbSkills = countMap(SAT_QB_ALL, q => q.skill)
section('Skill distribution')
Object.entries(qbSkills).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

const qbDomains = countMap(SAT_QB_ALL, q => q.domain)
section('Domain distribution')
Object.entries(qbDomains).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

const qbDiff = countMap(SAT_QB_ALL, q => q.difficulty)
section('Difficulty distribution')
Object.entries(qbDiff).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, SAT_QB_ALL.length)})`)
)

section('Repeated stem prefixes (8 words, ≥3)')
const qbStems = dupEntries(countMap(SAT_QB_ALL, q => first8(q.question)), 3)
if (qbStems.length) qbStems.forEach(([k, v]) => console.log(`  ×${v}  "${k}…"`))
else console.log('  ✓ None')

section('Missing wrongAnswerExplanations')
const qbMissingWAE = SAT_QB_ALL.filter(q =>
  q.questionType !== 'grid_in' && (!q.wrongAnswerExplanations || Object.keys(q.wrongAnswerExplanations).length === 0)
)
if (qbMissingWAE.length) {
  console.log(`  ⚠️  ${qbMissingWAE.length} questions: ${qbMissingWAE.map(q => q.id).join(', ')}`)
} else console.log('  ✓ All QB MC questions have wrongAnswerExplanations')

// ═══════════════════════════════════════════════════════════════
// MCAT FORM 1
// ═══════════════════════════════════════════════════════════════

header('MCAT FORM 1 — FULL AUDIT')

section(`Total: ${MCAT_FORM1_ALL.length}  (Chem/Phys: ${MCAT_FORM1_CHEM.length}, CARS: ${MCAT_FORM1_CARS.length}, Bio/Biochem: ${MCAT_FORM1_BIO.length}, Psych/Soc: ${MCAT_FORM1_PSYCH.length})`)

section('Answer distribution')
const mf1Ans = MCAT_FORM1_ALL.map(q => q.correctAnswer)
const mf1ADist = countMap(mf1Ans, x => x)
;['A','B','C','D'].forEach(l => {
  const n = mf1ADist[l] ?? 0
  console.log(`  ${l}: ${n.toString().padStart(3)}  (${pct(n, mf1Ans.length)})`)
})
const mf1Streaks = streak(mf1Ans)
if (mf1Streaks.length) {
  console.log('  ⚠️  STREAKS OF 4+:')
  mf1Streaks.forEach(s => console.log(`    "${s.val}" ×${s.len} at position ${s.start + 1}`))
} else {
  console.log('  ✓ No streaks of 4+')
}

section('Discipline distribution')
const mf1Disc = countMap(MCAT_FORM1_ALL, q => q.discipline)
Object.entries(mf1Disc).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

section('Scientific skill distribution')
const mf1Skills = countMap(MCAT_FORM1_ALL, q => q.scientificSkill)
Object.entries(mf1Skills).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, MCAT_FORM1_ALL.length)})`)
)

section('Difficulty distribution')
const mf1Diff = countMap(MCAT_FORM1_ALL, q => q.difficulty)
Object.entries(mf1Diff).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, MCAT_FORM1_ALL.length)})`)
)

section('Question type (passage vs discrete)')
const mf1QType = countMap(MCAT_FORM1_ALL, q => q.questionType)
Object.entries(mf1QType).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, MCAT_FORM1_ALL.length)})`)
)

section('Repeated stem prefixes (8 words, ≥3)')
const mf1DupStems = dupEntries(countMap(MCAT_FORM1_ALL, q => first8(q.question)), 3)
if (mf1DupStems.length) mf1DupStems.forEach(([k, v]) => console.log(`  ×${v}  "${k}…"`))
else console.log('  ✓ None')

section('Passage titles — all 4 sections')
const allPassages = [
  ...chemPhysSection.passages,
  ...carsSection.passages,
  ...bioBiochemSection.passages,
  ...psychSocSection.passages,
]
console.log(`  Total passages: ${allPassages.length}`)
allPassages.forEach(p => console.log(`  [${p.sectionId ?? p.id.split('-')[0]}]  ${p.title}`))

section('Foundational concept coverage')
const mf1FC = countMap(MCAT_FORM1_ALL, q => q.foundationalConcept)
Object.entries(mf1FC).sort().forEach(([k, v]) =>
  console.log(`  FC${k}: ${v}`)
)

section('Missing wrongAnswerExplanations (< 3)')
const mf1MissingWAE = MCAT_FORM1_ALL.filter(q =>
  !q.wrongAnswerExplanations || Object.keys(q.wrongAnswerExplanations).length < 3
)
if (mf1MissingWAE.length) {
  console.log(`  ⚠️  ${mf1MissingWAE.length} questions:`)
  mf1MissingWAE.slice(0, 15).forEach(q =>
    console.log(`    ${q.id} has ${Object.keys(q.wrongAnswerExplanations ?? {}).length} WAE`)
  )
} else console.log('  ✓ All MCAT Form 1 questions have 3 wrongAnswerExplanations')

// ═══════════════════════════════════════════════════════════════
// MCAT QB AUDIT
// ═══════════════════════════════════════════════════════════════

header('MCAT QUESTION BANK AUDIT')

section(`Total: ${MCAT_QB_ALL.length}  (CP:${chemPhysQuestions.length} CARS:${carsQuestions.length} BB:${bioBiochemQuestions.length} PS:${psychSocQuestions.length})`)

const mqbDisc = countMap(MCAT_QB_ALL, q => q.discipline)
section('Discipline distribution (all)')
Object.entries(mqbDisc).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

const mqbSkills = countMap(MCAT_QB_ALL, q => q.scientificSkill)
section('Scientific skill distribution')
Object.entries(mqbSkills).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, MCAT_QB_ALL.length)})`)
)

section('Difficulty distribution')
const mqbDiff = countMap(MCAT_QB_ALL, q => q.difficulty)
Object.entries(mqbDiff).sort().forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}  (${pct(v, MCAT_QB_ALL.length)})`)
)

section('Repeated stem prefixes (8 words, ≥3)')
const mqbDupStems = dupEntries(countMap(MCAT_QB_ALL, q => first8(q.question)), 3)
if (mqbDupStems.length) mqbDupStems.forEach(([k, v]) => console.log(`  ×${v}  "${k}…"`))
else console.log('  ✓ None')

section('Missing wrongAnswerExplanations (< 3)')
const mqbMissingWAE = MCAT_QB_ALL.filter(q =>
  !q.wrongAnswerExplanations || Object.keys(q.wrongAnswerExplanations).length < 3
)
if (mqbMissingWAE.length) {
  console.log(`  ⚠️  ${mqbMissingWAE.length} questions`)
  mqbMissingWAE.slice(0, 10).forEach(q =>
    console.log(`    ${q.id}: ${Object.keys(q.wrongAnswerExplanations ?? {}).length} WAE`)
  )
} else console.log('  ✓ All MCAT QB questions have 3 wrongAnswerExplanations')

// ═══════════════════════════════════════════════════════════════
// TEMPLATE PATTERN CHECK
// ═══════════════════════════════════════════════════════════════

header('TEMPLATE / OVERUSED WORDING CHECK')

const TEMPLATES = [
  'which of the following best',
  'the passage most strongly suggests',
  'which finding would most directly support',
  'which of the following, if true',
  'the most likely explanation',
  'which result would support',
  'researchers conducted a study',
  'a researcher studies',
  'according to the passage',
  'which of the following is most consistent',
  'which of the following would most likely',
  'which of the following best explains',
]

function checkTemplates(label: string, questions: { question: string }[]) {
  section(`${label} (${questions.length} questions)`)
  let any = false
  for (const t of TEMPLATES) {
    const n = questions.filter(q => q.question.toLowerCase().includes(t)).length
    if (n >= 4) { console.log(`  ⚠️  "${t}" — ×${n}`); any = true }
    else if (n >= 2) { console.log(`  ·  "${t}" — ×${n}`); any = true }
  }
  if (!any) console.log('  ✓ No overused templates detected')
}

checkTemplates('SAT Form 1', SAT_FORM1_ALL)
checkTemplates('SAT Form 2', SAT_FORM2_ALL)
checkTemplates('SAT Form 3', SAT_FORM3_ALL)
checkTemplates('SAT QB', SAT_QB_ALL)
checkTemplates('MCAT Form 1', MCAT_FORM1_ALL)
checkTemplates('MCAT QB', MCAT_QB_ALL)

// ═══════════════════════════════════════════════════════════════
// EXPLANATION OPENING DIVERSITY
// ═══════════════════════════════════════════════════════════════

header('EXPLANATION OPENING DIVERSITY')

function checkExpOpenings(label: string, questions: { explanation: string }[]) {
  section(`${label}`)
  const openings = countMap(questions, q => first8(q.explanation))
  const dups = dupEntries(openings, 4)
  if (dups.length) dups.slice(0, 10).forEach(([k, v]) => console.log(`  ×${v}  "${k}…"`))
  else console.log('  ✓ Good variety')
}

checkExpOpenings('SAT Form 1', SAT_FORM1_ALL.filter(q => 'explanation' in q) as RWQuestion[])
checkExpOpenings('MCAT Form 1', MCAT_FORM1_ALL)
checkExpOpenings('SAT QB', SAT_QB_ALL)
checkExpOpenings('MCAT QB', MCAT_QB_ALL)

// ═══════════════════════════════════════════════════════════════
// CARS TOPIC DIVERSITY
// ═══════════════════════════════════════════════════════════════

header('MCAT CARS — TOPIC DIVERSITY')

section('Form 1 CARS passages')
carsSection.passages.forEach(p => console.log(`  · ${p.title}`))

section('QB CARS discipline distribution')
const carsDisc = countMap(carsQuestions, q => q.discipline)
Object.entries(carsDisc).sort((a, b) => b[1] - a[1]).forEach(([k, v]) =>
  console.log(`  ${v.toString().padStart(3)}  ${k}`)
)

// ═══════════════════════════════════════════════════════════════
// ANSWER-KEY MISMATCH HEURISTIC
// ═══════════════════════════════════════════════════════════════

header('ANSWER-KEY MISMATCH CHECK (heuristic)')

function checkMismatch(label: string, questions: { id: string; correctAnswer: string; explanation: string }[]) {
  section(label)
  let n = 0
  for (const q of questions) {
    if (q.correctAnswer.length !== 1) continue
    const exp = q.explanation.toLowerCase()
    for (const wl of ['A','B','C','D'].filter(l => l !== q.correctAnswer)) {
      const pat = new RegExp(`(choice |answer )${wl.toLowerCase()}\\s+is correct|correct answer is\\s+${wl.toLowerCase()}`)
      if (pat.test(exp)) {
        console.log(`  ⚠️  ${q.id}: key=${q.correctAnswer} but explanation references ${wl} as correct`)
        n++
      }
    }
  }
  if (n === 0) console.log('  ✓ No mismatches detected')
}

checkMismatch('SAT Form 1', SAT_FORM1_ALL.filter(q => 'correctAnswer' in q) as RWQuestion[])
checkMismatch('MCAT Form 1', MCAT_FORM1_ALL)
checkMismatch('SAT QB', SAT_QB_ALL.filter(q => q.questionType !== 'grid_in') as QBQuestion[])
checkMismatch('MCAT QB', MCAT_QB_ALL)

// ═══════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════

header('AUDIT COMPLETE — SUMMARY')
console.log(`
  SAT Form 1:   ${SAT_FORM1_ALL.length} questions
  SAT Form 2:   ${SAT_FORM2_ALL.length} questions
  SAT Form 3:   ${SAT_FORM3_ALL.length} questions
  SAT QB:       ${SAT_QB_ALL.length} questions
  MCAT Form 1:  ${MCAT_FORM1_ALL.length} questions
  MCAT QB:      ${MCAT_QB_ALL.length} questions
  Total:        ${SAT_FORM1_ALL.length + SAT_FORM2_ALL.length + SAT_FORM3_ALL.length + SAT_QB_ALL.length + MCAT_FORM1_ALL.length + MCAT_QB_ALL.length}
`)
