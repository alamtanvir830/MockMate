/**
 * SAT Math domain distribution audit.
 * Prints per-module and per-path domain counts and average difficulty.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-sat-math-balance.ts
 */
export {}
import * as fs from 'fs'
import * as path from 'path'

const root = path.resolve(__dirname, '..')

type Domain = 'Algebra' | 'Advanced Math' | 'Problem-Solving and Data Analysis' | 'Geometry and Trigonometry'
const DIFF_SCORE: Record<string, number> = { easy: 1, medium: 2, hard: 3 }

interface ModuleStat {
  label: string
  total: number
  domains: Record<Domain, number>
  avgDiff: number
}

function auditModule(label: string, relPath: string): ModuleStat {
  const src = fs.readFileSync(path.join(root, relPath), 'utf-8')
  const domains: Record<Domain, number> = {
    'Algebra': 0,
    'Advanced Math': 0,
    'Problem-Solving and Data Analysis': 0,
    'Geometry and Trigonometry': 0,
  }
  for (const m of src.matchAll(/domain:\s*'([^']+)'/g)) {
    const d = m[1] as Domain
    if (d in domains) domains[d]++
  }
  const diffs: number[] = []
  for (const m of src.matchAll(/difficulty:\s*'([^']+)'/g)) {
    diffs.push(DIFF_SCORE[m[1]] ?? 2)
  }
  const total = diffs.length
  const avgDiff = total ? diffs.reduce((a, b) => a + b, 0) / total : 0
  return { label, total, domains, avgDiff }
}

function printStat(s: ModuleStat) {
  const { label, total, domains, avgDiff } = s
  const geo = domains['Geometry and Trigonometry']
  const geoOk = geo >= 3 && geo <= 8
  const alg = domains['Algebra']
  const algOk = alg <= 8
  console.log(
    `  ${label.padEnd(14)} | total=${total}` +
    ` | Alg=${alg}${algOk ? '' : '⚠'}` +
    ` AdvMath=${domains['Advanced Math']}` +
    ` PSDA=${domains['Problem-Solving and Data Analysis']}` +
    ` Geo=${geo}${geoOk ? '' : '⚠'}` +
    ` | avgDiff=${avgDiff.toFixed(2)}`
  )
}

function printPath(label: string, m1: ModuleStat, m2: ModuleStat) {
  const combined: Record<Domain, number> = {
    'Algebra': m1.domains['Algebra'] + m2.domains['Algebra'],
    'Advanced Math': m1.domains['Advanced Math'] + m2.domains['Advanced Math'],
    'Problem-Solving and Data Analysis': m1.domains['Problem-Solving and Data Analysis'] + m2.domains['Problem-Solving and Data Analysis'],
    'Geometry and Trigonometry': m1.domains['Geometry and Trigonometry'] + m2.domains['Geometry and Trigonometry'],
  }
  const total = m1.total + m2.total
  const geo = combined['Geometry and Trigonometry']
  const alg = combined['Algebra']
  const geoOk = geo >= 5 && geo <= 10
  const algOk = alg >= 13 && alg <= 16
  console.log(
    `  ${label.padEnd(14)} | total=${total}` +
    ` | Alg=${alg}${algOk ? '' : '⚠'}` +
    ` AdvMath=${combined['Advanced Math']}` +
    ` PSDA=${combined['Problem-Solving and Data Analysis']}` +
    ` Geo=${geo}${geoOk ? '' : '⚠'}`
  )
}

// ── Form 1 ────────────────────────────────────────────────────────────────────
console.log('\n=== SAT Form 1 ===')
const f1m1  = auditModule('M1',         'lib/premade-exams/sat/math-module-1.ts')
const f1m2e = auditModule('M2 Easy',    'lib/premade-exams/sat/math-module-2-easy.ts')
const f1m2h = auditModule('M2 Hard',    'lib/premade-exams/sat/math-module-2-hard.ts')
printStat(f1m1); printStat(f1m2e); printStat(f1m2h)
console.log('  Paths:')
printPath('Easy path', f1m1, f1m2e)
printPath('Hard path', f1m1, f1m2h)

// ── Form 2 ────────────────────────────────────────────────────────────────────
console.log('\n=== SAT Form 2 ===')
const f2m1  = auditModule('M1',         'lib/premade-exams/sat/form-2-math-module-1.ts')
const f2m2e = auditModule('M2 Easy',    'lib/premade-exams/sat/form-2-math-module-2-easy.ts')
const f2m2h = auditModule('M2 Hard',    'lib/premade-exams/sat/form-2-math-module-2-hard.ts')
printStat(f2m1); printStat(f2m2e); printStat(f2m2h)
console.log('  Paths:')
printPath('Easy path', f2m1, f2m2e)
printPath('Hard path', f2m1, f2m2h)

// ── Form 3 ────────────────────────────────────────────────────────────────────
console.log('\n=== SAT Form 3 ===')
const f3m1  = auditModule('M1',         'lib/premade-exams/sat/form-3-math-module-1.ts')
const f3m2e = auditModule('M2 Easy',    'lib/premade-exams/sat/form-3-math-module-2-easy.ts')
const f3m2h = auditModule('M2 Hard',    'lib/premade-exams/sat/form-3-math-module-2-hard.ts')
printStat(f3m1); printStat(f3m2e); printStat(f3m2h)
console.log('  Paths:')
printPath('Easy path', f3m1, f3m2e)
printPath('Hard path', f3m1, f3m2h)

console.log('\n  ⚠ = outside target range (Alg: 6–8 per module / 13–16 per path; Geo: 3–8 per module / 5–10 per path)')
