#!/usr/bin/env node
// audit-sat-grammar-quality.mjs
// Checks every Standard English Conventions question across Forms 1–5.

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const SEC_SKILLS = ['Boundaries', 'Form, Structure, and Sense']

// All RW module files across 5 forms
const RW_FILES = [
  'lib/premade-exams/sat/rw-module-1.ts',
  'lib/premade-exams/sat/rw-module-2-easy.ts',
  'lib/premade-exams/sat/rw-module-2-hard.ts',
  'lib/premade-exams/sat/form-2-rw-module-1.ts',
  'lib/premade-exams/sat/form-2-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-2-rw-module-2-hard.ts',
  'lib/premade-exams/sat/form-3-rw-module-1.ts',
  'lib/premade-exams/sat/form-3-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-3-rw-module-2-hard.ts',
  'lib/premade-exams/sat/form-4-rw-module-1.ts',
  'lib/premade-exams/sat/form-4-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-4-rw-module-2-hard.ts',
  'lib/premade-exams/sat/form-5-rw-module-1.ts',
  'lib/premade-exams/sat/form-5-rw-module-2-easy.ts',
  'lib/premade-exams/sat/form-5-rw-module-2-hard.ts',
]

// Expected late-module placement for SEC (questions 15–27)
const SEC_LATE_MODULE_THRESHOLD = 14 // 0-indexed ≥ 14 means Q15 onward

// Grammar-related red flag phrases in explanations (AI/vague)
const VAGUE_EXPLANATION_PATTERNS = [
  'sounds better',
  'is more natural',
  'flows better',
  'is awkward',
  'feels wrong',
  'is incorrect because it sounds',
]

// Phrases that suggest answer leakage (the correct punctuation/word is visible in the stimulus)
const LEAKAGE_SIGNALS = [
  'as shown in the passage',
  'the passage already shows',
  'look at the original text',
]

// AI-sounding question stems for SEC
const AI_SEC_STEMS = [
  'Which choice most effectively',
  'Which choice completes the text',
  'Which choice best',
]

let totalSEC = 0
let errors = 0, warnings = 0
const issues = []

function flag(level, file, id, msg) {
  issues.push({ level, file, id, msg })
  if (level === 'ERROR') errors++
  else warnings++
}

function extractBlocks(src) {
  // Extract question blocks using id as anchor
  const blocks = []
  const idRx = /id:\s*['"]([^'"]+)['"]/g
  let m
  const positions = []
  while ((m = idRx.exec(src)) !== null) {
    positions.push({ id: m[1], pos: m.index })
  }
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].pos
    const end = positions[i + 1]?.pos ?? src.length
    blocks.push({ id: positions[i].id, src: src.slice(start, end) })
  }
  return blocks
}

function extractField(blockSrc, field) {
  // Extract a template literal or quoted string field
  const backtickRx = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\``, 'm')
  const singleRx = new RegExp(`${field}:\\s*'([^']*)'`, 'm')
  const doubleRx = new RegExp(`${field}:\\s*"([^"]*)"`, 'm')
  const bt = backtickRx.exec(blockSrc)
  if (bt) return bt[1]
  const sq = singleRx.exec(blockSrc)
  if (sq) return sq[1]
  const dq = doubleRx.exec(blockSrc)
  if (dq) return dq[1]
  return null
}

function countChoices(blockSrc) {
  return (blockSrc.match(/label:\s*['"][ABCD]['"]/g) || []).length
}

function getSkill(blockSrc) {
  const m = blockSrc.match(/skill:\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

function getDifficulty(blockSrc) {
  const m = blockSrc.match(/difficulty:\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

function getCorrectAnswer(blockSrc) {
  const m = blockSrc.match(/correctAnswer:\s*['"]([ABCD])['"]/)
  return m ? m[1] : null
}

function getExplanation(blockSrc) {
  return extractField(blockSrc, 'explanation')
}

function getStimulus(blockSrc) {
  return extractField(blockSrc, 'stimulus')
}

function getQuestion(blockSrc) {
  return extractField(blockSrc, 'question')
}

for (const relPath of RW_FILES) {
  const absPath = resolve(root, relPath)
  const shortPath = relPath.replace('lib/premade-exams/sat/', '')
  if (!existsSync(absPath)) {
    console.warn(`  SKIP: ${relPath} not found`)
    continue
  }
  const src = readFileSync(absPath, 'utf8')
  const blocks = extractBlocks(src)

  for (let idx = 0; idx < blocks.length; idx++) {
    const { id, src: blockSrc } = blocks[idx]
    const skill = getSkill(blockSrc)
    if (!SEC_SKILLS.includes(skill)) continue
    totalSEC++

    const question = getQuestion(blockSrc) ?? ''
    const explanation = getExplanation(blockSrc) ?? ''
    const stimulus = getStimulus(blockSrc) ?? ''
    const correctAnswer = getCorrectAnswer(blockSrc)
    const choiceCount = countChoices(blockSrc)
    const difficulty = getDifficulty(blockSrc)

    // ── 1. Choice count ──
    if (choiceCount !== 4) {
      flag('ERROR', shortPath, id, `${choiceCount} answer choices (expected 4)`)
    }

    // ── 2. Missing correct answer ──
    if (!correctAnswer) {
      flag('ERROR', shortPath, id, 'Missing correctAnswer')
    }

    // ── 3. Explanation quality ──
    if (!explanation || explanation.length < 40) {
      flag('ERROR', shortPath, id, 'Explanation too short or missing')
    } else {
      // Check for vague/AI explanations
      for (const pattern of VAGUE_EXPLANATION_PATTERNS) {
        if (explanation.toLowerCase().includes(pattern)) {
          flag('WARN', shortPath, id, `Vague explanation phrase: "${pattern}"`)
        }
      }
      // Check explanation mentions a grammar rule
      const grammarRuleWords = ['comma', 'semicolon', 'colon', 'period', 'clause', 'independent', 'dependent',
        'subject', 'verb', 'modifier', 'parallel', 'conjunction', 'pronoun', 'apostrophe', 'dash', 'splice', 'fragment',
        'tense', 'agreement', 'punctuation', 'sentence', 'coordinating', 'subordinating']
      const hasRuleWord = grammarRuleWords.some(w => explanation.toLowerCase().includes(w))
      if (!hasRuleWord) {
        flag('WARN', shortPath, id, 'Explanation does not mention specific grammar rule or punctuation')
      }
    }

    // ── 4. Question stem check ──
    if (!question || question.length < 10) {
      flag('ERROR', shortPath, id, 'Question stem too short or missing')
    }

    // ── 5. Leakage check: answer visible in stimulus ──
    if (stimulus && question) {
      for (const sig of LEAKAGE_SIGNALS) {
        if (explanation.toLowerCase().includes(sig)) {
          flag('WARN', shortPath, id, `Possible answer leakage signal in explanation: "${sig}"`)
        }
      }
    }

    // ── 6. Placement: SEC should be in later half of module ──
    if (idx < SEC_LATE_MODULE_THRESHOLD) {
      flag('WARN', shortPath, id, `SEC question at position ${idx + 1} — should appear at Q15+ (currently Q${idx + 1})`)
    }

    // ── 7. Grammar rule tag check: Boundaries vs Form/Structure/Sense ──
    if (skill === 'Boundaries') {
      // Boundaries = punctuation between clauses (commas, semicolons, periods, colons, dashes)
      const boundaryWords = ['comma', 'semicolon', 'period', 'dash', 'colon', 'splice', 'run-on', 'fragment', 'independent clause']
      const hasBoundary = boundaryWords.some(w => (question + explanation).toLowerCase().includes(w))
      if (!hasBoundary) {
        flag('WARN', shortPath, id, 'Tagged as Boundaries but explanation lacks boundary-specific grammar terms')
      }
    }
    if (skill === 'Form, Structure, and Sense') {
      // FSS = verb form/tense, pronoun reference, subject-verb agreement, modifier placement
      const fssWords = ['verb', 'tense', 'subject', 'agreement', 'pronoun', 'modifier', 'parallel', 'form', 'singular', 'plural']
      const hasFSS = fssWords.some(w => (question + explanation).toLowerCase().includes(w))
      if (!hasFSS) {
        flag('WARN', shortPath, id, 'Tagged as Form, Structure, and Sense but explanation lacks FSS-specific grammar terms')
      }
    }
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────
console.log('=== SAT Grammar/Conventions Quality Audit ===\n')
console.log(`Total SEC questions found: ${totalSEC}\n`)

const byFile = {}
for (const issue of issues) {
  if (!byFile[issue.file]) byFile[issue.file] = []
  byFile[issue.file].push(issue)
}

for (const [file, fileIssues] of Object.entries(byFile)) {
  console.log(`\n${file}:`)
  for (const i of fileIssues) {
    const prefix = i.level === 'ERROR' ? '  ❌' : '  ⚠️ '
    console.log(`${prefix} [${i.id}] ${i.msg}`)
  }
}

if (issues.length === 0) {
  console.log('✅ All SEC questions pass grammar quality checks\n')
}

console.log(`\nSummary: ${errors} error(s), ${warnings} warning(s) across ${totalSEC} SEC questions`)
