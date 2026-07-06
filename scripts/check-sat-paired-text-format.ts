/**
 * SAT paired-text formatting validator.
 * Scans SAT pre-made exam and question-bank files for stimuli that contain
 * "Text 1:" and "Text 2:" and verifies they are separated by a blank line (\n\n).
 *
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/check-sat-paired-text-format.ts
 */
export {}
import * as fs from 'fs'
import * as path from 'path'

const root = path.resolve(__dirname, '..')

const FILES = [
  // Form 1
  'lib/premade-exams/sat/rw-module-1.ts',
  'lib/premade-exams/sat/rw-module-2-easy.ts',
  'lib/premade-exams/sat/rw-module-2-hard.ts',
  // Form 2
  'lib/premade-exams/sat/form-2-rw-module-1.ts',
  'lib/premade-exams/sat/form-2-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-2-rw-module-2-hard.ts',
  // Form 3
  'lib/premade-exams/sat/form-3-rw-module-1.ts',
  'lib/premade-exams/sat/form-3-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-3-rw-module-2-hard.ts',
  // Question bank
  'lib/question-bank/sat/rw-questions.ts',
]

let passed = 0
let warnings = 0

for (const rel of FILES) {
  const filePath = path.join(root, rel)
  const src = fs.readFileSync(filePath, 'utf-8')
  const shortName = rel.split('/').pop()!

  // Extract all stimulus string values from the source file.
  // Handles both template literals (backtick) and single/double-quoted strings.
  // After extracting, unescape \n so we can check actual newline content.
  const stimuli: string[] = []

  // Template literals (may contain real newlines)
  for (const m of src.matchAll(/stimulus:\s*`([\s\S]*?)`/g)) {
    stimuli.push(m[1])
  }
  // Single-quoted strings (contain \n as escape sequence)
  for (const m of src.matchAll(/stimulus:\s*'((?:[^'\\]|\\[\s\S])*)'/g)) {
    // Unescape \n → real newline for analysis
    stimuli.push(m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'"))
  }
  // Double-quoted strings
  for (const m of src.matchAll(/stimulus:\s*"((?:[^"\\]|\\[\s\S])*)"/g)) {
    stimuli.push(m[1].replace(/\\n/g, '\n'))
  }

  for (const stim of stimuli) {
    if (!stim.includes('Text 1:') || !stim.includes('Text 2:')) continue

    const t2pos = stim.indexOf('Text 2:')

    // Must have \n\n immediately before "Text 2:"
    const before2 = stim.slice(Math.max(0, t2pos - 2), t2pos)
    if (before2 !== '\n\n') {
      warnings++
      const charsShown = JSON.stringify(stim.slice(Math.max(0, t2pos - 20), t2pos + 20))
      console.error(`  WARN [${shortName}]: "Text 2:" not preceded by blank line — context: ${charsShown}`)
    } else {
      passed++
    }

    // Check that splitting on \n\n produces exactly 2 paragraphs (or more for nested)
    const paragraphs = stim.split(/\n\n+/)
    if (paragraphs.length < 2) {
      warnings++
      console.error(`  WARN [${shortName}]: paired-text stimulus has ${paragraphs.length} paragraph(s) — expected ≥ 2`)
    }

    // The renderer bolds "Text 1:" and "Text 2:" — verify these are the starts of paragraphs
    for (const para of paragraphs) {
      if (para.includes('Text 2:') && !para.startsWith('Text 2:') && !para.startsWith('Text 1:')) {
        warnings++
        console.error(`  WARN [${shortName}]: "Text 2:" appears mid-paragraph — may not render as separate block`)
      }
    }
  }
}

if (warnings === 0) {
  console.log(`All paired-text stimuli are correctly formatted (${passed} checked). PASS ✓`)
} else {
  console.log(`\n${passed} passed, ${warnings} issues found. FIX REQUIRED ✗`)
  process.exit(1)
}
