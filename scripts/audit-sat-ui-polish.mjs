#!/usr/bin/env node
// audit-sat-ui-polish.mjs
// Manual checklist audit for SAT exam UI polish.
// Since UI requires visual inspection, this script checks for code signals
// and produces a manual checklist with findings.

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const UI_FILES = {
  'SATExamTaker':      'components/premade/SATExamTaker.tsx',
  'Form1Client':       'app/(dashboard)/premade/sat/form-1/SATExamTakerClient.tsx',
  'Form1Results':      'app/(dashboard)/premade/sat/form-1/results/[attemptId]/SATForm1ResultsClient.tsx',
  'Form1ResultsPage':  'app/(dashboard)/premade/sat/form-1/results/[attemptId]/page.tsx',
  'SATFormsPage':      'app/(dashboard)/premade/sat/page.tsx',
  'SATDisclaimer':     'app/(marketing)/sat-disclaimer/page.tsx',
}

// ─── Code signals to check ────────────────────────────────────────────────────
const CHECKS = [
  // Exam mode — full screen / no sidebar
  { label: 'Full-screen / no-sidebar exam mode', pattern: /fixed|fullscreen|inset-0|overflow-hidden|z-50|z-\[/i, file: 'SATExamTaker', required: true },
  { label: 'Sidebar suppressed in exam', pattern: /hideSidebar|no.?sidebar|sidebarHidden|sidebar.*false/i, file: 'SATExamTaker', required: false },

  // Timer
  { label: 'Timer rendered in exam', pattern: /timer|timeLeft|countdown|minutes.*seconds/i, file: 'SATExamTaker', required: true },

  // Question number display
  { label: 'Question number displayed', pattern: /question\s*\d|questionNumber|currentQuestion\s*\+\s*1|of\s+27|of\s+22/i, file: 'SATExamTaker', required: true },

  // Mark for review
  { label: 'Mark for review feature', pattern: /markForReview|marked.*review|bookmark/i, file: 'SATExamTaker', required: true },

  // Navigation buttons
  { label: 'Next/Back navigation', pattern: /next|previous|back.*question|prev.*question/i, file: 'SATExamTaker', required: true },

  // Review screen
  { label: 'Review screen before submit', pattern: /review.*submit|reviewMode|preSubmit|confirm.*submit/i, file: 'SATExamTaker', required: true },

  // R&W passage split layout
  { label: 'R&W passage/question split layout', pattern: /md:grid|split|passage.*col|col.*passage|flex.*row|side.*by.*side/i, file: 'SATExamTaker', required: false },

  // Grid-in label
  { label: 'Grid-in answer label', pattern: /grid.in|grid_in|gridIn/i, file: 'SATExamTaker', required: true },

  // Results - score card
  { label: 'Score card on results', pattern: /score|totalScore|scaled|estimated/i, file: 'Form1Results', required: true },

  // Results - domain breakdown
  { label: 'Domain/skill breakdown on results', pattern: /domain|skill|breakdown|byDomain|skillScore/i, file: 'Form1Results', required: true },

  // Results - explanation cards
  { label: 'Explanation cards in review', pattern: /explanation|wrongAnswer|correct.*answer/i, file: 'Form1Results', required: true },

  // Legal copy
  { label: 'Disclaimer text present on SAT page', pattern: /not affiliated|independently created|trademark|mockmate.*not/i, file: 'SATFormsPage', required: false },
  { label: 'Disclaimer page exists', pattern: /disclaimer|not affiliated|trademark/i, file: 'SATDisclaimer', required: false },

  // Anti-patterns — things that should NOT appear
  { label: 'No raw markdown in UI (## headings)', pattern: />\s*#{2,}/i, file: 'SATExamTaker', required: false, invert: true },
  { label: 'No placeholder text', pattern: /lorem ipsum|placeholder text|todo.*content|FIXME/i, file: 'SATExamTaker', required: false, invert: true },
]

// ─── Vibe-code / AI signals in UI text ───────────────────────────────────────
const VIBE_SIGNALS = [
  'Let\'s get started!',
  'Good luck!',
  'You got this!',
  'Awesome!',
  'Amazing job',
  'Well done!',
  'Keep going!',
  'Almost there!',
  'Not bad!',
  'Great work!',
  'PLACEHOLDER',
  'TODO',
  'TBD',
  'Coming soon',
  'Under construction',
]

console.log('=== SAT UI Polish Audit ===\n')
console.log('NOTE: Full visual inspection required. This script checks code signals only.\n')

let passed = 0, failed = 0, warnings = 0

for (const [label, relPath] of Object.entries(UI_FILES)) {
  const abs = resolve(root, relPath)
  if (!existsSync(abs)) {
    console.log(`  SKIP: ${label} (${relPath}) — file not found`)
    continue
  }

  const content = readFileSync(abs, 'utf8')

  // Run checks for this file
  const fileChecks = CHECKS.filter(c => c.file === label)
  if (fileChecks.length === 0) continue

  console.log(`\n── ${label} (${relPath}) ──`)

  for (const check of fileChecks) {
    const found = check.pattern.test(content)
    if (check.invert) {
      // Should NOT be found
      if (found) {
        console.log(`  ❌ FOUND (should not exist): ${check.label}`)
        failed++
      } else {
        console.log(`  ✅ Clean: ${check.label}`)
        passed++
      }
    } else if (check.required) {
      if (found) {
        console.log(`  ✅ Found: ${check.label}`)
        passed++
      } else {
        console.log(`  ❌ MISSING (required): ${check.label}`)
        failed++
      }
    } else {
      if (found) {
        console.log(`  ✅ Found: ${check.label}`)
        passed++
      } else {
        console.log(`  ⚠️  Not found (optional): ${check.label}`)
        warnings++
      }
    }
  }

  // Vibe-code check
  const vibeFound = VIBE_SIGNALS.filter(s => content.includes(s))
  if (vibeFound.length > 0) {
    console.log(`  ⚠️  Vibe-coded phrases found: ${vibeFound.join(', ')}`)
    warnings++
  }

  // Line count as proxy for complexity
  const lines = content.split('\n').length
  console.log(`  ℹ️  File size: ${lines} lines`)
}

// ─── Manual inspection checklist ─────────────────────────────────────────────
console.log('\n\n─── Manual Visual Inspection Checklist ───')
console.log('(These require browser testing — cannot be automated)\n')

const manualChecks = [
  'Exam header is professional, not plain/raw',
  'R&W passage sits left, question+choices right (on ≥md screens)',
  'Choices are large, clearly readable cards (not radio + text)',
  'Timer counts down and is visible without scrolling',
  'Mark for review highlights question in navigator',
  'Question navigator shows marked/unanswered at a glance',
  'Review screen clearly separates: marked / unanswered / answered',
  'Submit confirmation dialog appears before submitting',
  'Results score card matches expected score range (400–1600)',
  'Section scores (RW and Math) are shown separately',
  'Domain breakdown is readable (not raw JSON)',
  'Wrong answer explanations appear in review mode',
  'Mobile: passage and question don\'t overflow horizontally',
  'No sidebar/nav visible during active exam',
  'Disclaimer is readable somewhere accessible to user',
  'Estimated score copy is used (not "official score")',
]

for (const check of manualChecks) {
  console.log(`  ☐ ${check}`)
}

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log(`\n\nAutomated checks: ${passed} passed, ${failed} failed, ${warnings} warnings`)
if (failed === 0) {
  console.log('✅ All automated UI checks passed')
} else {
  console.log(`❌ ${failed} automated UI check(s) failed — see above`)
}
