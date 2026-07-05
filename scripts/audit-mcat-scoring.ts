/**
 * MCAT scoring audit — verifies section and total score outputs.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-mcat-scoring.ts
 */
export {}

function convertSectionScore(correct: number, total: number): number {
  if (total === 0) return 118
  const pct = correct / total
  if (pct >= 0.90) return Math.round(131 + (pct - 0.90) / 0.10 * 1)
  else if (pct >= 0.75) return Math.round(129 + (pct - 0.75) / 0.15 * 2)
  else if (pct >= 0.50) return Math.round(125 + (pct - 0.50) / 0.25 * 4)
  else if (pct >= 0.25) return Math.round(120 + (pct - 0.25) / 0.25 * 5)
  else return Math.round(118 + (pct / 0.25) * 2)
}
function clamp(s: number) { return Math.min(132, Math.max(118, s)) }
function section(correct: number, total: number) { return clamp(convertSectionScore(correct, total)) }

let passed = 0
let failed = 0

function expect(desc: string, actual: number, expected: number, op: '==' | '<' | '<=' | '>=' | '>' = '==') {
  let ok: boolean
  switch (op) {
    case '<':  ok = actual < expected;  break
    case '<=': ok = actual <= expected; break
    case '>=': ok = actual >= expected; break
    case '>':  ok = actual > expected;  break
    default:   ok = actual === expected
  }
  if (ok) {
    passed++
  } else {
    failed++
    console.error(`  FAIL: ${desc} — got ${actual}, expected ${op} ${expected}`)
  }
}

console.log('=== MCAT Scoring Audit ===\n')

const CP  = 59  // Chem/Phys
const CAR = 53  // CARS
const BB  = 59  // Bio/Biochem
const PS  = 59  // Psych/Soc

// Boundary
console.log('--- Boundary values ---')
expect('0/59 Chem/Phys → 118',  section(0, CP), 118)
expect('59/59 Chem/Phys → 132', section(59, CP), 132)
expect('0/53 CARS → 118',        section(0, CAR), 118)
expect('53/53 CARS → 132',       section(53, CAR), 132)
expect('0/59 Bio/Biochem → 118', section(0, BB), 118)
expect('59/59 Bio/Biochem → 132',section(59, BB), 132)
expect('0/59 Psych/Soc → 118',   section(0, PS), 118)
expect('59/59 Psych/Soc → 132',  section(59, PS), 132)

// Total bounds
console.log('\n--- Total bounds ---')
const totalZero = section(0, CP) + section(0, CAR) + section(0, BB) + section(0, PS)
const totalPerfect = section(59, CP) + section(53, CAR) + section(59, BB) + section(59, PS)
expect('Total 0/230 → 472', totalZero, 472)
expect('Total perfect → 528', totalPerfect, 528)

// Mid-range checks (50% should be ~125, not 132)
console.log('\n--- Mid-range (should not be 132) ---')
expect('50% Chem/Phys < 132', section(30, CP), 131, '<')
expect('50% CARS < 132',       section(27, CAR), 131, '<')
expect('80% Chem/Phys < 132', section(47, CP), 131, '<')
expect('50% Chem/Phys ≥ 124', section(30, CP), 124, '>=')

// Monotonic check for each section
console.log('\n--- Monotonic ---')
for (let i = 1; i <= 59; i++) {
  if (section(i, CP) < section(i - 1, CP)) {
    failed++
    console.error(`  FAIL: Chem/Phys not monotonic at ${i}`)
  } else passed++
}
for (let i = 1; i <= 53; i++) {
  if (section(i, CAR) < section(i - 1, CAR)) {
    failed++
    console.error(`  FAIL: CARS not monotonic at ${i}`)
  } else passed++
}

// Each section uses its own denominator (CARS = 53, science = 59)
console.log('\n--- Denominator independence ---')
const carsAt50 = section(27, 53)   // 50% of CARS
const cpAt50   = section(30, 59)   // 50% of CP
// Both should be ~125 regardless of denominator
expect('CARS 50% ≈ 125', carsAt50, 125, '>=')
expect('CARS 50% ≈ 125', carsAt50, 126, '<=')
expect('CP 50% ≈ 125',   cpAt50, 125, '>=')
expect('CP 50% ≈ 125',   cpAt50, 126, '<=')

// CARS never uses CP's 59 denominator
const carsWrongDenom = section(27, 59)  // wrong denominator for CARS
// 27/59 ≈ 46%, which would give ~123–124, not 125
expect('CARS with wrong denom gives different result', carsWrongDenom === carsAt50 ? 0 : 1, 1)

console.log(`\nRESULT: ${passed} passed, ${failed} failed — ${failed === 0 ? 'PASS ✓' : 'FAIL ✗'}`)
if (failed > 0) process.exit(1)
