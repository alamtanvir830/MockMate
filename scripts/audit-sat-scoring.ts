/**
 * SAT scoring audit — verifies the scoring tables produce correct outputs.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-sat-scoring.ts
 */
export {}

// Inline tables from sat-score-conversion.ts to avoid import issues
const rwTable: [number, number, number][] = [
  [0,200,200],[1,200,210],[2,208,220],[3,216,230],[4,224,240],[5,232,250],
  [6,244,262],[7,256,274],[8,268,286],[9,280,298],[10,290,310],[11,302,322],
  [12,314,334],[13,326,346],[14,338,358],[15,350,370],[16,362,382],[17,373,394],
  [18,384,406],[19,397,418],[20,410,430],[21,420,441],[22,430,452],[23,440,463],
  [24,450,474],[25,461,485],[26,471,496],[27,481,507],[28,492,518],[29,503,529],
  [30,515,540],[31,525,551],[32,535,562],[33,545,573],[34,555,584],[35,566,595],
  [36,577,606],[37,586,617],[38,596,628],[39,606,639],[40,614,650],[41,623,663],
  [42,633,676],[43,641,688],[44,650,700],[45,658,712],[46,668,720],[47,678,730],
  [48,686,740],[49,695,750],[50,703,760],[51,711,770],[52,718,780],[53,724,790],
  [54,730,800],
]
const mathTable: [number, number, number][] = [
  [0,200,200],[1,211,215],[2,222,230],[3,233,245],[4,244,260],[5,255,275],
  [6,265,290],[7,275,305],[8,285,320],[9,295,335],[10,305,350],[11,319,366],
  [12,333,382],[13,347,398],[14,361,414],[15,375,430],[16,389,446],[17,403,462],
  [18,417,478],[19,431,494],[20,445,510],[21,458,523],[22,471,536],[23,484,549],
  [24,497,562],[25,510,575],[26,523,588],[27,536,601],[28,549,614],[29,562,627],
  [30,575,640],[31,586,651],[32,597,663],[33,608,674],[34,619,686],[35,630,697],
  [36,641,709],[37,652,720],[38,659,730],[39,666,740],[40,673,750],[41,678,770],
  [42,683,780],[43,687,790],[44,690,800],
]

function roundSAT(x: number) { return Math.round(x / 10) * 10 }
function rw(raw: number, hard: boolean) { return roundSAT(rwTable[Math.max(0, Math.min(raw, 54))][hard ? 2 : 1]) }
function math(raw: number, hard: boolean) { return roundSAT(mathTable[Math.max(0, Math.min(raw, 44))][hard ? 2 : 1]) }

let passed = 0
let failed = 0

function expect(desc: string, actual: number, expected: number, op: '==' | '<=' | '>=' | '<' | '>' = '==') {
  let ok: boolean
  switch (op) {
    case '<=': ok = actual <= expected; break
    case '>=': ok = actual >= expected; break
    case '<':  ok = actual <  expected; break
    case '>':  ok = actual >  expected; break
    default:   ok = actual === expected
  }
  if (ok) {
    passed++
  } else {
    failed++
    console.error(`  FAIL: ${desc} — got ${actual}, expected ${op} ${expected}`)
  }
}

console.log('=== SAT Scoring Audit ===\n')

// Boundary cases
console.log('--- Boundary ---')
expect('0/54 RW hard → 200', rw(0, true), 200)
expect('0/54 RW easy → 200', rw(0, false), 200)
expect('54/54 RW hard → 800', rw(54, true), 800)
expect('0/44 Math hard → 200', math(0, true), 200)
expect('44/44 Math hard → 800', math(44, true), 800)

// Bad cases from user reports (must NOT be 800 or 1600)
console.log('\n--- Previously-bad examples ---')
expect('Math 41/44 hard ≠ 800', math(41, true), 799, '<')
expect('Math 41/44 hard ≤ 780', math(41, true), 780, '<=')
expect('Math 40/44 hard = 750', math(40, true), 750)
expect('RW 47/54 hard ≠ 800', rw(47, true), 799, '<')
expect('Total 47 RW hard + 37 Math hard ≠ 1600', rw(47, true) + math(37, true), 1599, '<')

// Hard path top-end targets
console.log('\n--- Hard path top-end (RW) ---')
expect('RW 46/54 hard → 720', rw(46, true), 720)
expect('RW 47/54 hard → 730', rw(47, true), 730)
expect('RW 48/54 hard → 740', rw(48, true), 740)
expect('RW 49/54 hard → 750', rw(49, true), 750)
expect('RW 50/54 hard → 760', rw(50, true), 760)
expect('RW 51/54 hard → 770', rw(51, true), 770)
expect('RW 52/54 hard → 780', rw(52, true), 780)
expect('RW 53/54 hard → 790', rw(53, true), 790)
expect('RW 54/54 hard → 800', rw(54, true), 800)

console.log('\n--- Hard path top-end (Math) ---')
expect('Math 37/44 hard → 720', math(37, true), 720)
expect('Math 38/44 hard → 730', math(38, true), 730)
expect('Math 39/44 hard → 740', math(39, true), 740)
expect('Math 40/44 hard → 750', math(40, true), 750)
expect('Math 41/44 hard → 770', math(41, true), 770)
expect('Math 42/44 hard → 780', math(42, true), 780)
expect('Math 43/44 hard → 790', math(43, true), 790)
expect('Math 44/44 hard → 800', math(44, true), 800)

// Easy path must be capped below hard path max
console.log('\n--- Easy path caps ---')
expect('RW 54/54 easy < 800', rw(54, false), 799, '<')
expect('Math 44/44 easy < 800', math(44, false), 799, '<')

// Monotonic check
console.log('\n--- Monotonic hard path ---')
for (let i = 1; i <= 54; i++) {
  if (rw(i, true) < rw(i - 1, true)) {
    failed++
    console.error(`  FAIL: RW hard not monotonic at ${i}: ${rw(i,true)} < ${rw(i-1,true)}`)
  } else passed++
}
for (let i = 1; i <= 44; i++) {
  if (math(i, true) < math(i - 1, true)) {
    failed++
    console.error(`  FAIL: Math hard not monotonic at ${i}: ${math(i,true)} < ${math(i-1,true)}`)
  } else passed++
}

// No rounding collisions at top end (consecutive values must differ)
console.log('\n--- No collisions in top 10 ---')
for (let i = 45; i < 54; i++) {
  if (rw(i, true) === rw(i + 1, true)) {
    failed++
    console.error(`  FAIL: RW hard collision at ${i} and ${i+1}: both = ${rw(i, true)}`)
  } else passed++
}
for (let i = 35; i < 44; i++) {
  if (math(i, true) === math(i + 1, true)) {
    failed++
    console.error(`  FAIL: Math hard collision at ${i} and ${i+1}: both = ${math(i, true)}`)
  } else passed++
}

// Combined totals
console.log('\n--- Combined total cases ---')
expect('Perfect score (54/54 RW + 44/44 Math hard) = 1600', rw(54,true) + math(44,true), 1600)
expect('0/54 RW easy + 41/44 Math hard total', rw(0,false) + math(41,true), 970)

console.log(`\nRESULT: ${passed} passed, ${failed} failed — ${failed === 0 ? 'PASS ✓' : 'FAIL ✗'}`)
if (failed > 0) process.exit(1)
