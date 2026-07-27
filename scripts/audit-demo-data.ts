/**
 * MockMate — Demo Data Audit Script
 *
 * Scans the codebase for demo/seed/fake references and classifies them.
 * Does NOT delete or modify anything.
 *
 * Usage:
 *   npx tsx scripts/audit-demo-data.ts
 */

import { readdirSync, readFileSync, statSync } from 'fs'
import { join, extname, relative } from 'path'

const ROOT = join(import.meta.dirname ?? process.cwd(), '..')

const SEARCH_TERMS: Array<{ term: string; isCritical: boolean }> = [
  { term: 'seedDemoExam',           isCritical: true },
  { term: 'seedDemoGroupExam',      isCritical: true },
  { term: 'demo_created',           isCritical: true },
  { term: 'demo_group_created',     isCritical: true },
  { term: 'Biology Demo Exam',      isCritical: false },
  { term: 'Physics Group Demo Exam',isCritical: false },
  { term: 'DEMO_EXAM_TITLES',       isCritical: false },
  { term: 'DEMO_QUESTIONS',         isCritical: false },
  { term: 'demo-bob-',              isCritical: true },
  { term: 'demo-john-',             isCritical: true },
  { term: 'demo-timothy-',          isCritical: true },
  { term: 'mockmate-demo.invalid',  isCritical: true },
  { term: 'ALLOW_DEMO_SEEDING',     isCritical: false },
  { term: 'createOrGetFakeDemoUser',isCritical: true },
  { term: 'John Doe',               isCritical: false },
  { term: 'Jane Doe',               isCritical: false },
]

const SKIP_DIRS = new Set([
  'node_modules', '.next', '.git', '.claude', 'dist', 'build', '.vercel',
])

// Files that are allowed to reference demo terms (the disabled seed file,
// cleanup scripts, and this audit script itself).
const EXCLUDED_FROM_CRITICAL = new Set([
  'lib/demo/seed-demo-exam.ts',
  'scripts/audit-demo-data.ts',
  'supabase/sql/cleanup-demo-profiles.sql',
  'app/api/admin/cleanup-demo-profiles/route.ts',
])

const ALLOWED_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.mjs', '.json', '.sql',
])

interface Match {
  file: string
  line: number
  term: string
  isCritical: boolean
  snippet: string
}

function walkFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...walkFiles(full))
    } else if (ALLOWED_EXTENSIONS.has(extname(entry))) {
      results.push(full)
    }
  }
  return results
}

const allFiles = walkFiles(ROOT)
const matches: Match[] = []

for (const file of allFiles) {
  const rel = relative(ROOT, file)
  const content = readFileSync(file, 'utf-8')
  const lines = content.split('\n')
  const isExcluded = EXCLUDED_FROM_CRITICAL.has(rel)
  for (let i = 0; i < lines.length; i++) {
    for (const { term, isCritical } of SEARCH_TERMS) {
      if (lines[i].includes(term)) {
        matches.push({
          file: rel,
          line: i + 1,
          term,
          // Downgrade critical to info for infrastructure files (seed file, scripts, SQL)
          isCritical: isCritical && !isExcluded,
          snippet: lines[i].trim().slice(0, 120),
        })
      }
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────

const critical = matches.filter((m) => m.isCritical)
const nonCritical = matches.filter((m) => !m.isCritical)

console.log('='.repeat(70))
console.log('MockMate — Demo Data Audit')
console.log('='.repeat(70))
console.log()

if (critical.length === 0) {
  console.log('✓ No critical demo-creation references found in codebase.')
} else {
  console.log(`✗ CRITICAL — ${critical.length} reference(s) that may create demo data:`)
  console.log()
  for (const m of critical) {
    console.log(`  [CRITICAL] ${m.file}:${m.line}`)
    console.log(`             term: "${m.term}"`)
    console.log(`             code: ${m.snippet}`)
    console.log()
  }
}

if (nonCritical.length > 0) {
  console.log(`ℹ  ${nonCritical.length} informational reference(s) (not creation logic):`)
  console.log()
  for (const m of nonCritical) {
    console.log(`  [info] ${m.file}:${m.line}  — "${m.term}"`)
  }
}

console.log()
console.log('='.repeat(70))
console.log('SUMMARY')
console.log('='.repeat(70))
console.log(`  Critical (may create demo data): ${critical.length}`)
console.log(`  Informational (strings/guards):  ${nonCritical.length}`)
console.log(`  Files scanned:                   ${allFiles.length}`)
console.log()

if (critical.length > 0) {
  console.log('ACTION REQUIRED: Review the critical references above.')
  process.exit(1)
} else {
  console.log('No active demo-creation paths detected. Safe to proceed.')
  process.exit(0)
}
