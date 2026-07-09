/**
 * Scans SAT content files for risky legal/trademark terms.
 * Run: npx tsx scripts/audit-sat-legal-originality.ts
 *
 * This script cannot prove copyright safety, but it catches obvious risky language.
 */
import * as fs from 'fs'
import * as path from 'path'

// ── Risky phrases to flag ─────────────────────────────────────────────────────
const RISKY_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /college\s*board/gi,         label: 'College Board reference' },
  { pattern: /bluebook/gi,                label: 'Bluebook reference' },
  { pattern: /official\s+sat/gi,          label: '"official SAT"' },
  { pattern: /official\s+practice/gi,     label: '"official practice"' },
  { pattern: /real\s+sat\s+questions?/gi, label: '"real SAT questions"' },
  { pattern: /actual\s+sat\s+questions?/gi, label: '"actual SAT questions"' },
  { pattern: /exact\s+sat/gi,             label: '"exact SAT"' },
  { pattern: /authentic\s+sat(?!-style)/gi, label: '"authentic SAT" (not "SAT-style")' },
  { pattern: /adapted\s+from/gi,          label: '"adapted from" (implies real source)' },
  { pattern: /copied\s+from/gi,           label: '"copied from"' },
  { pattern: /guaranteed\s+sat/gi,        label: '"guaranteed SAT"' },
  { pattern: /college\s+board[-\s]style/gi, label: '"College Board-style"' },
  { pattern: /affiliated\s+with.*college\s*board/gi, label: 'affiliation claim' },
]

// ── File targets ──────────────────────────────────────────────────────────────
const SAT_CONTENT_DIRS = [
  'lib/premade-exams/sat',
  'lib/question-bank/sat',
]

const SAT_UI_DIRS = [
  'app/(dashboard)/premade/sat',
  'app/(dashboard)/question-bank/sat',
  'app/(marketing)/sat-disclaimer',
  'app/(marketing)/payment',
  'app/(dashboard)/billing',
  'components/premade',
  'components/shared',
]

const ROOT = path.join(__dirname, '..')

function findFiles(dir: string, ext = '.ts'): string[] {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  const entries = fs.readdirSync(abs, { withFileTypes: true })
  const files: string[] = []
  for (const e of entries) {
    const full = path.join(abs, e.name)
    if (e.isDirectory()) files.push(...findFiles(path.join(dir, e.name), ext))
    else if (e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.tsx'))) files.push(full)
  }
  return files
}

function countQuestions(content: string): number {
  return (content.match(/^\s+id:\s+['"`]/gm) ?? []).length
}

// ── Scan ──────────────────────────────────────────────────────────────────────
let totalContentFiles = 0
let totalUIFiles = 0
let totalQuestionsScanned = 0
let riskyHits = 0

const DIVIDER = '─'.repeat(60)

console.log('\n' + '═'.repeat(60))
console.log(' SAT Legal & Originality Audit')
console.log('═'.repeat(60))

function scanFiles(dirs: string[], label: string) {
  const files: string[] = []
  for (const d of dirs) files.push(...findFiles(d))

  console.log(`\n── ${label} (${files.length} files) ──`)

  for (const file of files) {
    const rel = path.relative(ROOT, file)
    const content = fs.readFileSync(file, 'utf-8')
    const lines = content.split('\n')
    const qCount = countQuestions(content)

    if (label.includes('Content')) {
      totalContentFiles++
      totalQuestionsScanned += qCount
    } else {
      totalUIFiles++
    }

    const fileHits: string[] = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      for (const { pattern, label: pLabel } of RISKY_PATTERNS) {
        pattern.lastIndex = 0
        if (pattern.test(line)) {
          fileHits.push(`  L${i + 1}: [${pLabel}] ${line.trim().slice(0, 120)}`)
          riskyHits++
        }
      }
    }

    if (fileHits.length > 0) {
      console.log(`\n  ${rel} (${qCount} questions)`)
      for (const h of fileHits) console.log(h)
    }
  }
}

scanFiles(SAT_CONTENT_DIRS, 'Content Files')
scanFiles(SAT_UI_DIRS, 'UI / Marketing Files')

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\n' + DIVIDER)
console.log(' AUDIT SUMMARY')
console.log(DIVIDER)
console.log(`  Content files scanned : ${totalContentFiles}`)
console.log(`  UI files scanned      : ${totalUIFiles}`)
console.log(`  Questions scanned     : ${totalQuestionsScanned}`)
console.log(`  Risky phrase hits     : ${riskyHits}`)
console.log(DIVIDER)

if (riskyHits === 0) {
  console.log('\n✅ No risky legal phrases found in SAT content files.\n')
} else {
  console.log('\n⚠️  Review the hits above. Occurrences in UI disclaimer/legal')
  console.log('   copy are expected (quoting the trademark to disclaim it).')
  console.log('   Hits inside question/stimulus/explanation fields need action.\n')
}
