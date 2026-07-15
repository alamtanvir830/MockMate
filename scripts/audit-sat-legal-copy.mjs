#!/usr/bin/env node
// audit-sat-legal-copy.mjs
// Scans source files for problematic legal copy and missing disclaimers.

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Patterns to FLAG as problematic ─────────────────────────────────────────
const FORBIDDEN_PHRASES = [
  { pattern: /official\s+SAT\s+question/gi,          label: 'Claims questions are official SAT' },
  { pattern: /real\s+SAT\s+question/gi,               label: 'Claims questions are real SAT' },
  { pattern: /college\s+board[\s-]approved/gi,        label: 'Claims College Board approval' },
  { pattern: /college\s+board[\s-]verified/gi,        label: 'Claims College Board verification' },
  { pattern: /endorsed\s+by\s+college\s+board/gi,    label: 'Claims College Board endorsement' },
  { pattern: /sponsored\s+by\s+college\s+board/gi,   label: 'Claims College Board sponsorship' },
  { pattern: /affiliated\s+with\s+college\s+board/gi,label: 'Claims College Board affiliation (without "not")' },
  { pattern: /exact\s+SAT/gi,                         label: 'Claims exact SAT reproduction' },
  { pattern: /bluebook\s+copy/gi,                     label: 'Claims Bluebook copy' },
  { pattern: /same\s+as\s+(the\s+)?SAT/gi,           label: 'Claims same as the SAT' },
  { pattern: /identical\s+to\s+(the\s+)?SAT/gi,       label: 'Claims identical to SAT' },
  { pattern: /actual\s+SAT\s+questions/gi,            label: 'Claims actual SAT questions' },
  { pattern: /copied\s+from\s+(the\s+)?SAT/gi,        label: 'Claims copied from SAT' },
]

// ─── Patterns to CHECK FOR PRESENCE of (should exist in key files) ──────────
const REQUIRED_DISCLAIMER_TEXT = 'not affiliated with'
const REQUIRED_INDEPENDENT_TEXT = 'independently created'

// ─── File extensions to scan ──────────────────────────────────────────────────
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.md', '.txt']

// ─── Directories to scan ──────────────────────────────────────────────────────
const SCAN_DIRS = [
  'app',
  'components',
  'lib/premade-exams/sat',
]

// ─── Files that MUST contain the disclaimer ───────────────────────────────────
const DISCLAIMER_REQUIRED_FILES = [
  'app/(dashboard)/premade/sat/page.tsx',
  'app/(marketing)/sat-disclaimer/page.tsx',
  'lib/premade-exams/sat/form-1.ts',
]

// ─── Skip node_modules / build artifacts ─────────────────────────────────────
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.claude'])

function* walkFiles(dir) {
  const abs = resolve(root, dir)
  if (!existsSync(abs)) return
  const entries = readdirSync(abs)
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(abs, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      yield* walkFiles(full.replace(root + '/', ''))
    } else if (SCAN_EXTENSIONS.some(ext => full.endsWith(ext))) {
      yield full.replace(root + '/', '')
    }
  }
}

let forbiddenCount = 0
let missingDisclaimerCount = 0
const findings = []

// ─── Scan all files ───────────────────────────────────────────────────────────
for (const dir of SCAN_DIRS) {
  for (const relPath of walkFiles(dir)) {
    const abs = resolve(root, relPath)
    let content
    try { content = readFileSync(abs, 'utf8') } catch { continue }

    for (const { pattern, label } of FORBIDDEN_PHRASES) {
      const matches = content.match(pattern)
      if (matches) {
        // Check it's not already negated ("not affiliated with College Board" is OK)
        for (const match of matches) {
          const idx = content.indexOf(match)
          const context = content.slice(Math.max(0, idx - 30), idx + match.length + 30)
          // Allow "not affiliated with college board" — that's the correct disclaimer
          if (label.includes('affiliation') && context.toLowerCase().includes('not affiliated')) continue
          findings.push({ level: 'ERROR', file: relPath, label, context: context.trim().replace(/\n/g, ' ').substring(0, 100) })
          forbiddenCount++
        }
      }
    }
  }
}

// ─── Check required disclaimer files ─────────────────────────────────────────
console.log('=== SAT Legal Copy Audit ===\n')

console.log('Checking required disclaimer files:')
for (const relPath of DISCLAIMER_REQUIRED_FILES) {
  const abs = resolve(root, relPath)
  if (!existsSync(abs)) {
    console.log(`  ❌ MISSING FILE: ${relPath}`)
    missingDisclaimerCount++
    continue
  }
  const content = readFileSync(abs, 'utf8').toLowerCase()
  const hasDisclaimer = content.includes(REQUIRED_DISCLAIMER_TEXT)
  const hasIndependent = content.includes(REQUIRED_INDEPENDENT_TEXT)
  const hasMockMate = content.includes('mockmate')

  if (!hasDisclaimer) {
    console.log(`  ⚠️  ${relPath}: Missing "not affiliated with" disclaimer`)
    missingDisclaimerCount++
  }
  if (!hasIndependent) {
    console.log(`  ⚠️  ${relPath}: Missing "independently created" language`)
  }
  if (!hasMockMate) {
    console.log(`  ⚠️  ${relPath}: MockMate brand name not found`)
  }
  if (hasDisclaimer && hasIndependent && hasMockMate) {
    console.log(`  ✅ ${relPath}: Disclaimer present`)
  }
}

// ─── Report forbidden phrases ─────────────────────────────────────────────────
if (findings.length > 0) {
  console.log(`\n\nForbidden phrases found (${forbiddenCount}):\n`)
  for (const f of findings) {
    console.log(`  ❌ [${f.file}]`)
    console.log(`     Issue: ${f.label}`)
    console.log(`     Context: "...${f.context}..."`)
    console.log()
  }
} else {
  console.log('\n\n✅ No forbidden legal phrases found in scanned files')
}

// ─── Summary ─────────────────────────────────────────────────────────────────
const totalIssues = forbiddenCount + missingDisclaimerCount
console.log(`\nSummary: ${forbiddenCount} forbidden phrase(s), ${missingDisclaimerCount} missing disclaimer(s)`)
if (totalIssues === 0) {
  console.log('✅ Legal copy audit passed')
} else {
  console.log('❌ Legal copy issues need attention')
}

console.log('\n─── Recommended disclaimer text ───')
console.log(`"MockMate is not affiliated with, endorsed by, or sponsored by College Board.`)
console.log(`SAT is a trademark registered by College Board, which is not affiliated with`)
console.log(`and does not endorse MockMate. All MockMate questions are independently`)
console.log(`created for practice purposes and are aligned to publicly available SAT`)
console.log(`structure and content domains."`)
