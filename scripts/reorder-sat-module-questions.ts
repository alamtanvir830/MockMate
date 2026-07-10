/**
 * Reorders questions in all SAT Form 1–5 module files to avoid 3-in-a-row
 * same-skill clustering. Runs in place — rewrites each file with interleaved order.
 *
 * Run: npx tsx scripts/reorder-sat-module-questions.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const SAT_DIR = path.join(__dirname, '..', 'lib', 'premade-exams', 'sat')

const MODULE_FILES = [
  // Form 1
  'rw-module-1.ts',
  'rw-module-2-easy.ts',
  'rw-module-2-hard.ts',
  'math-module-1.ts',
  'math-module-2-easy.ts',
  'math-module-2-hard.ts',
  // Form 2
  'form-2-rw-module-1.ts',
  'form-2-rw-module-2-easy.ts',
  'form-2-rw-module-2-hard.ts',
  'form-2-math-module-1.ts',
  'form-2-math-module-2-easy.ts',
  'form-2-math-module-2-hard.ts',
  // Form 3
  'form-3-rw-module-1.ts',
  'form-3-rw-module-2-easy.ts',
  'form-3-rw-module-2-hard.ts',
  'form-3-math-module-1.ts',
  'form-3-math-module-2-easy.ts',
  'form-3-math-module-2-hard.ts',
  // Form 4
  'form-4-rw-module-1.ts',
  'form-4-rw-module-2-easy.ts',
  'form-4-rw-module-2-hard.ts',
  'form-4-math-module-1.ts',
  'form-4-math-module-2-easy.ts',
  'form-4-math-module-2-hard.ts',
  // Form 5
  'form-5-rw-module-1.ts',
  'form-5-rw-module-2-easy.ts',
  'form-5-rw-module-2-hard.ts',
  'form-5-math-module-1.ts',
  'form-5-math-module-2-easy.ts',
  'form-5-math-module-2-hard.ts',
]

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuestionBlock {
  text: string   // the full object text (  { ... },)
  skill: string
  domain: string
  id: string
  difficulty: string
}

// ── Parser ────────────────────────────────────────────────────────────────────

function parseFile(content: string): {
  preArray: string
  questions: QuestionBlock[]
  postArray: string
} {
  // Find the top-level array start "[\n"
  const arrayOpenIdx = content.indexOf('[\n')
  if (arrayOpenIdx === -1) throw new Error('No array found in file')

  // Find the matching closing "]" by tracking bracket depth
  let bracketDepth = 0
  let arrayCloseIdx = -1
  for (let i = arrayOpenIdx; i < content.length; i++) {
    if (content[i] === '[') bracketDepth++
    else if (content[i] === ']') {
      bracketDepth--
      if (bracketDepth === 0) { arrayCloseIdx = i; break }
    }
  }
  if (arrayCloseIdx === -1) throw new Error('Unclosed array')

  const preArray = content.slice(0, arrayOpenIdx + 2)  // "...[\n"
  const postArray = content.slice(arrayCloseIdx)         // "]...\n"
  // Prepend "\n" so the first question is found by the "\n  {" pattern
  const body = '\n' + content.slice(arrayOpenIdx + 2, arrayCloseIdx)

  // Extract question blocks via brace-depth tracking
  const questions: QuestionBlock[] = []
  let i = 0

  while (i < body.length) {
    // Find start of a top-level object: line starting with "  {" (exactly 2-space indent)
    const match = body.indexOf('\n  {', i)
    if (match === -1) break
    const blockStart = match + 1  // position of "  {"

    // Track brace depth to find matching "}"
    let depth = 0
    let j = blockStart
    while (j < body.length) {
      if (body[j] === '{') depth++
      else if (body[j] === '}') {
        depth--
        if (depth === 0) {
          j++  // include the closing "}"
          break
        }
      }
      j++
    }

    // Include trailing comma if present
    let blockEnd = j
    if (body[blockEnd] === ',') blockEnd++

    const blockText = body.slice(blockStart, blockEnd)

    // Extract metadata
    const skillMatch  = blockText.match(/\bskill\s*:\s*['"]([^'"]+)['"]/)
    const domainMatch = blockText.match(/\bdomain\s*:\s*['"]([^'"]+)['"]/)
    const idMatch     = blockText.match(/\bid\s*:\s*['"]([^'"]+)['"]/)
    const diffMatch   = blockText.match(/\bdifficulty\s*:\s*['"]([^'"]+)['"]/)

    if (idMatch) {
      questions.push({
        text: blockText,
        skill:      skillMatch?.[1]  ?? '(unknown)',
        domain:     domainMatch?.[1] ?? '(unknown)',
        id:         idMatch[1],
        difficulty: diffMatch?.[1]   ?? '(unknown)',
      })
    }
    i = blockEnd
  }

  return { preArray, questions, postArray }
}

// ── Interleaving algorithm ─────────────────────────────────────────────────────

function interleave(questions: QuestionBlock[]): QuestionBlock[] {
  // Tracks how recently each skill was used (lower = more recent)
  const placed: QuestionBlock[] = []
  const remaining = [...questions]

  while (remaining.length > 0) {
    const last1Skill  = placed.at(-1)?.skill
    const last2Skill  = placed.at(-2)?.skill
    const last1Domain = placed.at(-1)?.domain
    const last2Domain = placed.at(-2)?.domain
    const last3Domain = placed.at(-3)?.domain

    let bestIdx = -1
    let bestScore = -Infinity

    for (let i = 0; i < remaining.length; i++) {
      const q = remaining[i]

      // Hard constraint: avoid 3-in-a-row same skill
      if (q.skill === last1Skill && q.skill === last2Skill) continue

      // Hard constraint: avoid 4-in-a-row same domain
      if (q.domain === last1Domain && q.domain === last2Domain && q.domain === last3Domain) continue

      let score = 0

      // Strongly prefer different skill than last
      if (q.skill !== last1Skill) score += 10

      // Prefer different skill than last 2
      if (q.skill !== last2Skill) score += 4

      // Prefer different domain than last
      if (q.domain !== last1Domain) score += 3

      // Prefer different domain than last 2
      if (q.domain !== last2Domain) score += 1

      // Break ties: earlier in remaining wins (preserves relative ordering within type)
      score -= i * 0.01

      if (score > bestScore) {
        bestScore = score
        bestIdx = i
      }
    }

    if (bestIdx === -1) {
      // All remaining violate constraints; relax and just avoid 3-in-a-row skill
      for (let i = 0; i < remaining.length; i++) {
        const q = remaining[i]
        if (!(q.skill === last1Skill && q.skill === last2Skill)) {
          bestIdx = i
          break
        }
      }
      // Last resort: take first
      if (bestIdx === -1) bestIdx = 0
    }

    placed.push(remaining[bestIdx])
    remaining.splice(bestIdx, 1)
  }

  return placed
}

// ── Post-processing: fix remaining 3-in-a-row by swapping ────────────────────

function fixResidualViolations(questions: QuestionBlock[]): QuestionBlock[] {
  const result = [...questions]
  let changed = true
  let passes = 0

  function violationCount(arr: QuestionBlock[]): number {
    let n = 0
    for (let i = 2; i < arr.length; i++) {
      if (arr[i].skill === arr[i-1].skill && arr[i].skill === arr[i-2].skill) n++
    }
    for (let i = 3; i < arr.length; i++) {
      if (arr[i].domain === arr[i-1].domain && arr[i].domain === arr[i-2].domain && arr[i].domain === arr[i-3].domain) n++
    }
    return n
  }

  while (changed && passes < 40) {
    changed = false
    passes++
    const before = violationCount(result)
    if (before === 0) break

    // Find worst violation positions (skill 3-in-a-row or domain 4-in-a-row)
    for (let i = 2; i < result.length && !changed; i++) {
      const skillViolation = result[i].skill === result[i-1].skill && result[i].skill === result[i-2].skill
      const domainViolation = i >= 3 && result[i].domain === result[i-1].domain && result[i].domain === result[i-2].domain && result[i].domain === result[i-3].domain

      if (skillViolation || domainViolation) {
        for (let j = 0; j < result.length; j++) {
          if (j === i) continue
          const check = [...result]
          ;[check[i], check[j]] = [check[j], check[i]]
          if (violationCount(check) < before) {
            result[i] = check[i]
            result[j] = check[j]
            changed = true
            break
          }
        }
      }
    }
  }

  return result
}

// ── Violation checker ──────────────────────────────────────────────────────────

function countViolations(questions: QuestionBlock[]): number {
  let n = 0
  // Check 3-in-a-row same skill
  for (let i = 2; i < questions.length; i++) {
    if (
      questions[i].skill === questions[i-1].skill &&
      questions[i].skill === questions[i-2].skill
    ) n++
  }
  // Check 4-in-a-row same domain
  for (let i = 3; i < questions.length; i++) {
    if (
      questions[i].domain === questions[i-1].domain &&
      questions[i].domain === questions[i-2].domain &&
      questions[i].domain === questions[i-3].domain
    ) n++
  }
  return n
}

// ── Main ───────────────────────────────────────────────────────────────────────

const DIVIDER = '─'.repeat(64)
console.log('\n══════════════════════════════════════════════════════════════════')
console.log('  SAT Module Question Sequencing — Reorder Script')
console.log('══════════════════════════════════════════════════════════════════')

let totalFixed = 0
let totalAlreadyOk = 0
let totalErrors = 0

for (const filename of MODULE_FILES) {
  const filePath = path.join(SAT_DIR, filename)
  console.log(`\n${DIVIDER}`)
  console.log(`  ${filename}`)
  console.log(DIVIDER)

  let content: string
  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch (e) {
    console.log(`  ✗ File not found — skipping`)
    totalErrors++
    continue
  }

  let parsed: ReturnType<typeof parseFile>
  try {
    parsed = parseFile(content)
  } catch (e) {
    console.log(`  ✗ Parse error: ${e}`)
    totalErrors++
    continue
  }

  const { preArray, questions, postArray } = parsed
  console.log(`  · ${questions.length} questions found`)

  if (questions.length === 0) {
    console.log('  ✗ No questions parsed — skipping')
    totalErrors++
    continue
  }

  const beforeViolations = countViolations(questions)

  if (beforeViolations === 0) {
    console.log('  ✓ Already well-sequenced — no changes made')
    totalAlreadyOk++
    continue
  }

  console.log(`  · ${beforeViolations} 3-in-a-row violation(s) before reorder`)
  console.log(`  · Before: ${questions.map(q => q.skill.split(' ').at(-1)).join(' → ')}`)

  const interleaved = interleave(questions)
  const reordered = fixResidualViolations(interleaved)
  const afterViolations = countViolations(reordered)

  console.log(`  · After:  ${reordered.map(q => q.skill.split(' ').at(-1)).join(' → ')}`)
  console.log(`  · Violations after: ${afterViolations}`)

  // Rebuild file: preArray + "\n" + q1 + "\n\n" + q2 + "\n\n" + ... + "\n" + postArray
  const questionsText = reordered.map(q => q.text).join('\n\n')
  const newContent = preArray + questionsText + '\n' + postArray

  fs.writeFileSync(filePath, newContent, 'utf-8')
  console.log(`  ✓ Reordered and saved`)
  totalFixed++
}

console.log('\n══════════════════════════════════════════════════════════════════')
console.log('  Summary')
console.log('══════════════════════════════════════════════════════════════════')
console.log(`  Fixed     : ${totalFixed} files`)
console.log(`  Already OK: ${totalAlreadyOk} files`)
console.log(`  Errors    : ${totalErrors} files`)
console.log()

if (totalErrors > 0) {
  console.log('❌ Some files could not be processed.\n')
  process.exit(1)
} else {
  console.log('✅ Done. Run validate-sat-question-type-sequencing.ts to verify.\n')
}
