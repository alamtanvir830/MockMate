/**
 * Checks that required SAT disclaimer copy appears on key pages.
 * Run: npx tsx scripts/validate-sat-disclaimers.ts
 */
import * as fs from 'fs'
import * as path from 'path'

const ROOT = path.join(__dirname, '..')

let failed = 0
const PASS = (msg: string) => console.log('  ✓', msg)
const FAIL = (msg: string) => { console.error('  ✗', msg); failed++ }

function read(rel: string): string {
  const abs = path.join(ROOT, rel)
  if (!fs.existsSync(abs)) { FAIL(`File not found: ${rel}`); return '' }
  return fs.readFileSync(abs, 'utf-8')
}

function check(content: string, pattern: RegExp | string, label: string) {
  const ok = typeof pattern === 'string'
    ? content.toLowerCase().includes(pattern.toLowerCase())
    : pattern.test(content)
  if (ok) PASS(label)
  else FAIL(label)
}

console.log('\n════════════════════════════════════════════')
console.log(' SAT Disclaimer Presence Validation')
console.log('════════════════════════════════════════════')

// ── SAT forms overview ────────────────────────────────────────────────────────
{
  console.log('\n── SAT Overview Page ──')
  const src = read('app/(dashboard)/premade/sat/page.tsx')
  check(src, /not affiliated/i, 'Affiliation disclaimer present')
  check(src, /sat-disclaimer/i, 'Link to /sat-disclaimer present')
  check(src, /college board/i, 'College Board® mentioned')
}

// ── SAT upgrade/billing page (UpgradeGate component) ─────────────────────────
{
  console.log('\n── UpgradeGate Component (billing/upgrade) ──')
  const src = read('components/shared/upgrade-gate.tsx')
  check(src, /not affiliated/i, 'Affiliation acknowledgment text present')
  check(src, /checkbox|type="checkbox"/i, 'Acknowledgment checkbox present')
  check(src, /acknowledged/i, 'Checkbox state (acknowledged) present')
  check(src, /disabled.*acknowledged|acknowledged.*disabled/i, 'Button disabled until acknowledged')
}

// ── SAT Form 1 start page (SATExamTaker checkboxes) ──────────────────────────
{
  console.log('\n── SAT Exam Start (SATExamTaker.tsx) ──')
  const src = read('components/premade/SATExamTaker.tsx')
  check(src, /not affiliated.*college board|college board.*not affiliated/i, 'Affiliation disclaimer in exam taker')
  check(src, /sat-disclaimer/i, 'Link to /sat-disclaimer present')
  check(src, /consentAge|consentTerms/i, 'Start-screen consent checkboxes present')
  check(src, /scores.*estimates|estimates.*scores/i, 'Score estimate disclaimer present')
  check(src, /not an official college board/i, 'Score disclaimer names College Board')
  // Confirm "authentic SAT" is gone from AI prompts
  const hasAuthenticSAT = /authentic SAT(?!-style)/i.test(src)
  if (!hasAuthenticSAT) PASS('No bare "authentic SAT" in AI prompt strings')
  else FAIL('"authentic SAT" (without -style) found in AI prompts — replace with "SAT-style practice"')
}

// ── SAT Question Bank page ────────────────────────────────────────────────────
{
  console.log('\n── SAT Question Bank Page ──')
  const src = read('app/(dashboard)/question-bank/sat/page.tsx')
  check(src, /not affiliated/i, 'Affiliation disclaimer present')
  check(src, /independently created|independent/i, 'Independent creation stated')
  check(src, /sat-disclaimer/i, 'Link to /sat-disclaimer present')
}

// ── SAT Disclaimer page ───────────────────────────────────────────────────────
{
  console.log('\n── SAT Disclaimer Page ──')
  const src = read('app/(marketing)/sat-disclaimer/page.tsx')
  check(src, /not affiliated/i, 'Not affiliated statement present')
  check(src, /SAT® is a registered trademark|registered trademark/i, 'Trademark statement present')
  check(src, /independently created|original content/i, 'Original content statement present')
  check(src, /estimates only/i, 'Score estimate disclaimer present')
}

// ── Terms page ────────────────────────────────────────────────────────────────
{
  console.log('\n── Terms Page ──')
  const src = read('app/(marketing)/terms/page.tsx')
  check(src, /not affiliated/i, 'Not affiliated in terms')
  check(src, /college board/i, 'College Board mentioned in terms')
  check(src, /estimates only/i, 'Score estimate disclaimer in terms')
}

// ── Marketing homepage ────────────────────────────────────────────────────────
{
  console.log('\n── Marketing Homepage ──')
  const src = read('app/(marketing)/page.tsx')
  check(src, /not affiliated/i, 'Not affiliated in homepage footer')
  check(src, /registered trademark/i, 'Registered trademark in homepage footer')
}

// ── Form 4 "adapted from" removed ────────────────────────────────────────────
{
  console.log('\n── Form 4 Content Safety ──')
  const files = [
    'lib/premade-exams/sat/form-4-rw-module-1.ts',
    'lib/premade-exams/sat/form-4-rw-module-2-easy.ts',
    'lib/premade-exams/sat/form-4-rw-module-2-hard.ts',
  ]
  for (const f of files) {
    const src = read(f)
    const hasAdaptedFrom = /adapted from/i.test(src)
    if (!hasAdaptedFrom) PASS(`No "adapted from" in ${path.basename(f)}`)
    else FAIL(`"adapted from" still present in ${path.basename(f)}`)
  }
}

// ── Result ────────────────────────────────────────────────────────────────────
console.log(`\n${failed === 0 ? '✅ All disclaimer checks passed.' : `❌ ${failed} check(s) failed.`}\n`)
process.exit(failed > 0 ? 1 : 0)
