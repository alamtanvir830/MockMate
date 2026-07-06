/**
 * SHSAT form audit — verifies structure, question counts, and content quality.
 *
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-shsat-forms.ts
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

console.log('=== SHSAT Form Audit ===\n')

// ── Form 1 ────────────────────────────────────────────────────────────────────

const f1 = readFile('lib/premade-exams/shsat-form-1.ts')

console.log('--- Form 1 ---')

const f1Total = (f1.match(/id: '(?:p\dq|re-[ab]-q|math-q)\d+'/g) ?? []).length
check('Form 1 total questions = 100 (got ' + f1Total + ')', f1Total === 100)

const f1RCQ   = (f1.match(/id: 'p[1-9]q\d+'/g) ?? []).length
const f1ReAQ  = (f1.match(/id: 're-a-q\d+'/g) ?? []).length
const f1ReBQ  = (f1.match(/id: 're-b-q\d+'/g) ?? []).length
const f1MathQ = (f1.match(/id: 'math-q\d+'/g) ?? []).length
check('Form 1 ELA = 50 (RC=' + f1RCQ + '+RevA=' + f1ReAQ + '+RevB=' + f1ReBQ + ')', f1RCQ + f1ReAQ + f1ReBQ === 50)
check('Form 1 Math = 50 (got ' + f1MathQ + ')', f1MathQ === 50)

const f1P1Q = (f1.match(/id: 'p1q\d+'/g) ?? []).length
check('Form 1 Passage 1 has 7 questions (got ' + f1P1Q + ')', f1P1Q === 7)

const p1q4Block = f1.slice(f1.indexOf("id: 'p1q4'"), f1.indexOf("id: 'p1q4'") + 900)
check('Form 1 p1q4 is multi_select',       p1q4Block.includes("type: 'multi_select'"))
check('Form 1 p1q4 has selectCount: 2',    p1q4Block.includes('selectCount: 2'))
check('Form 1 p1q4 has correct_answers',   p1q4Block.includes('correct_answers:'))

const p1q7Block = f1.slice(f1.indexOf("id: 'p1q7'"), f1.indexOf("id: 'p1q7'") + 1200)
check('Form 1 p1q7 is match type',                     p1q7Block.includes("type: 'match'"))
check('Form 1 p1q7 has 5 items',                       (p1q7Block.match(/\{ id: '[1-5]',/g) ?? []).length >= 5)
check('Form 1 p1q7 has 2 categories (natural/human)',  p1q7Block.includes("id: 'natural'") && p1q7Block.includes("id: 'human'"))
check('Form 1 p1q7 correct_matches has 5 entries',     (p1q7Block.match(/'[1-5]': '(?:natural|human)'/g) ?? []).length === 5)

check("Form 1 Passage 1 titled 'Snowy Mountains'",  f1.includes("title: 'Snowy Mountains'"))
check('Form 1 poem has numbered lines (num: 22)',    f1.includes('num: 22,'))

check("Form 1 no math-q8 (trivial)",        !f1.includes("id: 'math-q8'"))
check("Form 1 no math-q9 (trivial)",        !f1.includes("id: 'math-q9'"))
check("Form 1 no math-q10 (trivial grid)",  !f1.includes("id: 'math-q10'"))
check("Form 1 no math-q47 (duplicate)",     !f1.includes("id: 'math-q47'"))

check('Form 1 RevEdit A has 8 questions (re-a-q8 exists)',  f1.includes("id: 're-a-q8'"))
check('Form 1 RevEdit B has 8 questions (re-b-q8 exists)',  f1.includes("id: 're-b-q8'"))

const f1IDs  = [...f1.matchAll(/id: '([^']+)'/g)].map(m => m[1])
const f1Dups = f1IDs.filter((id, i) => f1IDs.indexOf(id) !== i)
  .filter(id => /^(p\dq|re-[ab]-q|math-q)/.test(id))
check('Form 1 no duplicate question IDs (found: ' + ([...new Set(f1Dups)].slice(0, 3).join(', ') || 'none') + ')',
  f1Dups.length === 0)

check('Form 1 no placeholder TODO text',        !f1.toLowerCase().includes('todo'))
check('Form 1 no placeholder question text',    !f1.toLowerCase().includes('placeholder question'))

// ── Form 2 ────────────────────────────────────────────────────────────────────

const f2 = readFile('lib/premade-exams/shsat-form-2.ts')

console.log('\n--- Form 2 ---')

const f2MCQ   = (f2.match(/type: 'mcq'/g) ?? []).length
const f2Multi = (f2.match(/type: 'multi_select'/g) ?? []).length
const f2Match = (f2.match(/type: 'match'/g) ?? []).length
const f2Grid  = (f2.match(/type: 'grid_in'/g) ?? []).length
const f2Total = f2MCQ + f2Multi + f2Match + f2Grid
check('Form 2 total questions = 100 (got ' + f2Total + ')', f2Total === 100)

const f2RCQ   = (f2.match(/id: 'p[1-9]q\d+'/g) ?? []).length
const f2ReAQ  = (f2.match(/id: 're-a-q\d+'/g) ?? []).length
const f2ReBQ  = (f2.match(/id: 're-b-q\d+'/g) ?? []).length
const f2MathQ = (f2.match(/id: 'math-q\d+'/g) ?? []).length
check('Form 2 ELA = 50 (RC=' + f2RCQ + '+RevA=' + f2ReAQ + '+RevB=' + f2ReBQ + ')', f2RCQ + f2ReAQ + f2ReBQ === 50)
check('Form 2 Math = 50 (got ' + f2MathQ + ')', f2MathQ === 50)

const f2P1Q = (f2.match(/id: 'p1q\d+'/g) ?? []).length
check('Form 2 Passage 1 has 7 questions (got ' + f2P1Q + ')', f2P1Q === 7)

check("Form 2 no math-q8 (trivial)",             !f2.includes("id: 'math-q8'"))
check("Form 2 no math-q10 (trivial grid)",        !f2.includes("id: 'math-q10'"))
check("Form 2 no math-q47 (duplicate)",           !f2.includes("id: 'math-q47'"))
check("Form 2 passages 5 and 6 removed",          !f2.includes("id: 'p5q1'") && !f2.includes("id: 'p6q1'"))
check('Form 2 RevEdit A has 8 questions',          f2.includes("id: 're-a-q8'"))
check('Form 2 RevEdit B has 8 questions',          f2.includes("id: 're-b-q8'"))

const f2IDs  = [...f2.matchAll(/id: '([^']+)'/g)].map(m => m[1])
const f2Dups = f2IDs.filter((id, i) => f2IDs.indexOf(id) !== i)
  .filter(id => /^(p\dq|re-[ab]-q|math-q)/.test(id))
check('Form 2 no duplicate question IDs (found: ' + ([...new Set(f2Dups)].slice(0, 3).join(', ') || 'none') + ')',
  f2Dups.length === 0)

// ── SHSATExamTaker UI ─────────────────────────────────────────────────────────

const ui = readFile('components/premade/SHSATExamTaker.tsx')

console.log('\n--- SHSATExamTaker UI ---')

check('Attention modal state (showAttentionModal)',        ui.includes('showAttentionModal'))
check('Attention modal renders Attention heading',          ui.includes('>Attention<'))
check('Attention modal has OK dismiss button',             ui.includes('setShowAttentionModal(false)'))
check('handleNext checks multi_select completeness',       ui.includes("curQ.type === 'multi_select'"))
check('handleNext checks match completeness',              ui.includes("curQ.type === 'match'"))
check('Breadcrumb shows passage number for RC',            ui.includes('passageNumberMap[fq.passageId]'))
check('passageNumberMap useMemo present',                  ui.includes('passageNumberMap'))
check('Match rendering: removeTile function',              ui.includes('removeTile'))
check('Match rendering: place tile buttons',               ui.includes('placeTile'))
check('Match: category boxes render placed tiles',         ui.includes('Available'))

console.log('\nRESULT: ' + passed + ' passed, ' + failed + ' failed — ' + (failed === 0 ? 'PASS ✓' : 'FAIL ✗'))
if (failed > 0) process.exit(1)
