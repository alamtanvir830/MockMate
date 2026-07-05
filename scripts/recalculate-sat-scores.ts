/**
 * Recalculate stored SAT scores in Supabase using the corrected scoring tables.
 * Run: npx ts-node --compiler-options '{"module":"commonjs","moduleResolution":"node"}' -r dotenv/config scripts/recalculate-sat-scores.ts dotenv_config_path=.env.local
 */
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load .env.local manually since dotenv may not pick it up by default
function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '../.env.local')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

// ── Scoring tables (must match sat-score-conversion.ts exactly) ───────────────
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

function rescoreAttempt(rwRaw: number, rwHard: boolean, mathRaw: number, mathHard: boolean) {
  const rwClamped = Math.max(0, Math.min(rwRaw, 54))
  const mathClamped = Math.max(0, Math.min(mathRaw, 44))
  const rwScaled = roundSAT(rwTable[rwClamped][rwHard ? 2 : 1])
  const mathScaled = roundSAT(mathTable[mathClamped][mathHard ? 2 : 1])
  return { rwScaled, mathScaled, totalScore: rwScaled + mathScaled }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching SAT attempts from Supabase…')

  const { data: rows, error } = await supabase
    .from('standardized_exam_attempts')
    .select('id, rw_correct, math_correct, rw_m2_type, math_m2_type, rw_score, math_score, total_score, form_number')
    .eq('exam_type', 'SAT')

  if (error) {
    console.error('Fetch error:', error.message)
    process.exit(1)
  }

  if (!rows || rows.length === 0) {
    console.log('No SAT attempts found.')
    return
  }

  console.log(`Found ${rows.length} SAT attempt(s).\n`)

  let updated = 0
  let skipped = 0

  for (const row of rows) {
    const rwRaw: number = row.rw_correct ?? 0
    const mathRaw: number = row.math_correct ?? 0
    const rwHard = row.rw_m2_type === 'hard'
    const mathHard = row.math_m2_type === 'hard'

    const { rwScaled, mathScaled, totalScore } = rescoreAttempt(rwRaw, rwHard, mathRaw, mathHard)

    const oldRW: number = row.rw_score
    const oldMath: number = row.math_score
    const oldTotal: number = row.total_score

    if (rwScaled === oldRW && mathScaled === oldMath && totalScore === oldTotal) {
      skipped++
      continue
    }

    console.log(`[UPDATE] id=${row.id} form=${row.form_number}`)
    console.log(`  rw_raw=${rwRaw} (${rwHard ? 'hard' : 'easy'}) math_raw=${mathRaw} (${mathHard ? 'hard' : 'easy'})`)
    console.log(`  rw_score: ${oldRW} → ${rwScaled}`)
    console.log(`  math_score: ${oldMath} → ${mathScaled}`)
    console.log(`  total_score: ${oldTotal} → ${totalScore}`)

    const { error: updateError } = await supabase
      .from('standardized_exam_attempts')
      .update({ rw_score: rwScaled, math_score: mathScaled, total_score: totalScore })
      .eq('id', row.id)

    if (updateError) {
      console.error(`  ERROR updating ${row.id}:`, updateError.message)
    } else {
      updated++
    }
  }

  console.log(`\nDone. ${updated} updated, ${skipped} already correct.`)
}

main().catch(err => { console.error(err); process.exit(1) })
