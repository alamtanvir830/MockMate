/**
 * Geometry diagram audit — verifies that each new geometry question
 * has a valid graphData entry with the expected diagram type and key fields.
 *
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' scripts/audit-geometry-diagrams.ts
 */
export {}
import * as fs from 'fs'
import * as path from 'path'

const root = path.resolve(__dirname, '..')

function readFile(rel: string): string {
  return fs.readFileSync(path.join(root, rel), 'utf-8')
}

let passed = 0
let failed = 0

function check(desc: string, ok: boolean) {
  if (ok) { passed++; return }
  failed++
  console.error(`  FAIL: ${desc}`)
}

console.log('=== Geometry Diagram Audit ===\n')

// ── Helper: verify a question block has a valid graphData ─────────────────────

function hasGraphData(src: string, questionId: string): boolean {
  const startIdx = src.indexOf(`id: '${questionId}'`)
  if (startIdx === -1) return false
  // Find the closing brace of this question object by scanning ahead
  const chunk = src.slice(startIdx, startIdx + 2000)
  return chunk.includes('graphData:')
}

function hasGeometryType(src: string, questionId: string): boolean {
  const startIdx = src.indexOf(`id: '${questionId}'`)
  if (startIdx === -1) return false
  const chunk = src.slice(startIdx, startIdx + 2000)
  return chunk.includes("type: 'geometry'")
}

function hasCoordinatePlaneType(src: string, questionId: string): boolean {
  const startIdx = src.indexOf(`id: '${questionId}'`)
  if (startIdx === -1) return false
  const chunk = src.slice(startIdx, startIdx + 2000)
  return chunk.includes("type: 'coordinate_plane'")
}

function hasKind(src: string, questionId: string, kind: string): boolean {
  const startIdx = src.indexOf(`id: '${questionId}'`)
  if (startIdx === -1) return false
  const chunk = src.slice(startIdx, startIdx + 2000)
  return chunk.includes(`kind: '${kind}'`)
}

// ── Form 2 Math Module 1 ───────────────────────────────────────────────────────

const f2m1 = readFile('lib/premade-exams/sat/form-2-math-module-1.ts')

console.log('--- Form 2 Math M1 ---')

// sat2-math-m1-001: Rectangle 12×5 → geometry with poly + labels
check('sat2-math-m1-001 has graphData',                    hasGraphData(f2m1, 'sat2-math-m1-001'))
check('sat2-math-m1-001 uses geometry type',               hasGeometryType(f2m1, 'sat2-math-m1-001'))
check('sat2-math-m1-001 has poly element',                 hasKind(f2m1, 'sat2-math-m1-001', 'poly'))
check('sat2-math-m1-001 has label element',                hasKind(f2m1, 'sat2-math-m1-001', 'label'))
check('sat2-math-m1-001 labels "12" dimension',            f2m1.slice(f2m1.indexOf("'sat2-math-m1-001'"), f2m1.indexOf("'sat2-math-m1-001'") + 2000).includes("text: '12'"))
check('sat2-math-m1-001 labels "5" dimension',             f2m1.slice(f2m1.indexOf("'sat2-math-m1-001'"), f2m1.indexOf("'sat2-math-m1-001'") + 2000).includes("text: '5'"))

// sat2-math-m1-018: Right triangle 3-4-5 → geometry with poly + right_angle
check('sat2-math-m1-018 has graphData',                    hasGraphData(f2m1, 'sat2-math-m1-018'))
check('sat2-math-m1-018 uses geometry type',               hasGeometryType(f2m1, 'sat2-math-m1-018'))
check('sat2-math-m1-018 has poly element',                 hasKind(f2m1, 'sat2-math-m1-018', 'poly'))
check('sat2-math-m1-018 has right_angle marker',           hasKind(f2m1, 'sat2-math-m1-018', 'right_angle'))
check('sat2-math-m1-018 labels "4" and "3"',
  f2m1.slice(f2m1.indexOf("'sat2-math-m1-018'"), f2m1.indexOf("'sat2-math-m1-018'") + 2000).includes("text: '4'") &&
  f2m1.slice(f2m1.indexOf("'sat2-math-m1-018'"), f2m1.indexOf("'sat2-math-m1-018'") + 2000).includes("text: '3'"))

// ── Form 3 Math Module 1 ───────────────────────────────────────────────────────

const f3m1 = readFile('lib/premade-exams/sat/form-3-math-module-1.ts')

console.log('\n--- Form 3 Math M1 ---')

// sat-f3-math-m1-q01: Similar triangles — no diagram expected (text-only is clear)
check('sat-f3-math-m1-q01 exists in source',               f3m1.includes("'sat-f3-math-m1-q01'"))

// sat-f3-math-m1-q19: Right triangle 6-?-10 → geometry with poly + right_angle
check('sat-f3-math-m1-q19 has graphData',                  hasGraphData(f3m1, 'sat-f3-math-m1-q19'))
check('sat-f3-math-m1-q19 uses geometry type',             hasGeometryType(f3m1, 'sat-f3-math-m1-q19'))
check('sat-f3-math-m1-q19 has right_angle marker',         hasKind(f3m1, 'sat-f3-math-m1-q19', 'right_angle'))
check('sat-f3-math-m1-q19 labels "6" and "10"',
  f3m1.slice(f3m1.indexOf("'sat-f3-math-m1-q19'"), f3m1.indexOf("'sat-f3-math-m1-q19'") + 2000).includes("text: '6'") &&
  f3m1.slice(f3m1.indexOf("'sat-f3-math-m1-q19'"), f3m1.indexOf("'sat-f3-math-m1-q19'") + 2000).includes("text: '10'"))

// ── Form 3 Math Module 2 Easy ─────────────────────────────────────────────────

const f3m2e = readFile('lib/premade-exams/sat/form-3-math-module-2-easy.ts')

console.log('\n--- Form 3 Math M2 Easy ---')

// sat-f3-math-m2e-q01: Supplementary angles → geometry with seg + arc
check('sat-f3-math-m2e-q01 has graphData',                 hasGraphData(f3m2e, 'sat-f3-math-m2e-q01'))
check('sat-f3-math-m2e-q01 uses geometry type',            hasGeometryType(f3m2e, 'sat-f3-math-m2e-q01'))
check('sat-f3-math-m2e-q01 has seg element (line)',        hasKind(f3m2e, 'sat-f3-math-m2e-q01', 'seg'))
check('sat-f3-math-m2e-q01 has arc element (angle)',       hasKind(f3m2e, 'sat-f3-math-m2e-q01', 'arc'))
check('sat-f3-math-m2e-q01 arc labels "65°"',              f3m2e.slice(f3m2e.indexOf("'sat-f3-math-m2e-q01'"), f3m2e.indexOf("'sat-f3-math-m2e-q01'") + 2000).includes("label: '65°'"))

// sat-f3-math-m2e-q21: Coordinate distance A(0,0) B(6,8) → coordinate_plane
check('sat-f3-math-m2e-q21 has graphData',                 hasGraphData(f3m2e, 'sat-f3-math-m2e-q21'))
check('sat-f3-math-m2e-q21 uses coordinate_plane type',    hasCoordinatePlaneType(f3m2e, 'sat-f3-math-m2e-q21'))
check('sat-f3-math-m2e-q21 has point A at (0,0)',          f3m2e.slice(f3m2e.indexOf("'sat-f3-math-m2e-q21'"), f3m2e.indexOf("'sat-f3-math-m2e-q21'") + 2000).includes('x: 0, y: 0'))
check('sat-f3-math-m2e-q21 has point B at (6,8)',          f3m2e.slice(f3m2e.indexOf("'sat-f3-math-m2e-q21'"), f3m2e.indexOf("'sat-f3-math-m2e-q21'") + 2000).includes('x: 6, y: 8'))
check('sat-f3-math-m2e-q21 has connecting line',           f3m2e.slice(f3m2e.indexOf("'sat-f3-math-m2e-q21'"), f3m2e.indexOf("'sat-f3-math-m2e-q21'") + 2000).includes('lines:'))

// ── Form 3 Math Module 2 Hard ─────────────────────────────────────────────────

const f3m2h = readFile('lib/premade-exams/sat/form-3-math-module-2-hard.ts')

console.log('\n--- Form 3 Math M2 Hard ---')

// sat-f3-math-m2h-q01: Circle (x-3)²+(y+2)²=25 → geometry with circle + axes
check('sat-f3-math-m2h-q01 has graphData',                 hasGraphData(f3m2h, 'sat-f3-math-m2h-q01'))
check('sat-f3-math-m2h-q01 uses geometry type',            hasGeometryType(f3m2h, 'sat-f3-math-m2h-q01'))
check('sat-f3-math-m2h-q01 has circle element',            hasKind(f3m2h, 'sat-f3-math-m2h-q01', 'circle'))
check('sat-f3-math-m2h-q01 circle at cx=3, cy=-2',
  f3m2h.slice(f3m2h.indexOf("'sat-f3-math-m2h-q01'"), f3m2h.indexOf("'sat-f3-math-m2h-q01'") + 2000).includes('cx: 3, cy: -2'))
check('sat-f3-math-m2h-q01 circle radius r=5',
  f3m2h.slice(f3m2h.indexOf("'sat-f3-math-m2h-q01'"), f3m2h.indexOf("'sat-f3-math-m2h-q01'") + 2000).includes('r: 5'))
check('sat-f3-math-m2h-q01 has center point labeled',      hasKind(f3m2h, 'sat-f3-math-m2h-q01', 'point'))
check('sat-f3-math-m2h-q01 has axes (seg elements)',       hasKind(f3m2h, 'sat-f3-math-m2h-q01', 'seg'))

// ── Verify GeometryFigureData exported from types ──────────────────────────────

const types = readFile('lib/premade-exams/sat/types.ts')

console.log('\n--- Type definitions ---')
check('GeometryElement type is exported',    types.includes('export type GeometryElement'))
check('GeometryFigureData is exported',      types.includes('export interface GeometryFigureData'))
check("SATGraphData includes 'geometry'",    types.includes('| GeometryFigureData'))
check('GeometryFigureData has viewBox',      types.includes('viewBox:'))
check('All 7 element kinds defined',
  ['poly', 'right_angle', 'arc', 'circle', 'label', 'point', 'seg'].every(k => types.includes(`kind: '${k}'`)))

// ── Verify SATGraph renders geometry type ────────────────────────────────────

const graph = readFile('components/exam/SATGraph.tsx')

console.log('\n--- SATGraph renderer ---')
check("SATGraph imports GeometryFigureData",      graph.includes('GeometryFigureData'))
check("SATGraph has 'geometry' case in switch",   graph.includes("case 'geometry':"))
check("SATGraph renders GeometryFigure",           graph.includes('GeometryFigure'))
check("Geometry renderer handles all 7 kinds",
  ['poly', 'right_angle', 'arc', 'circle', 'label', 'point', 'seg'].every(k => graph.includes(`case '${k}'`)))
check("right_angle renders SVG polygon",          graph.includes('right_angle') && graph.includes('strokeWidth="1.4"'))
check("arc uses cross-product for sweep dir",     graph.includes('sweepFlag'))
check("circle uses ellipse for correct scaling",  graph.includes('<ellipse'))

console.log(`\nRESULT: ${passed} passed, ${failed} failed — ${failed === 0 ? 'PASS ✓' : 'FAIL ✗'}`)
if (failed > 0) process.exit(1)
