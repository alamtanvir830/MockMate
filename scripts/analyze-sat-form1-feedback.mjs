#!/usr/bin/env node
/**
 * Score-weighted analysis of SAT Form 1 feedback.
 * Weights: 1400-1600=5, 1200-1390=4, 1000-1190=3, 800-990=2, 500-790=0.25, admin/test=0
 */

const WEIGHT_BANDS = [
  { min: 1400, max: 1600, w: 5 },
  { min: 1200, max: 1390, w: 4 },
  { min: 1000, max: 1190, w: 3 },
  { min:  800, max:  990, w: 2 },
  { min:  500, max:  790, w: 0.25 },
]
function weight(score) {
  for (const b of WEIGHT_BANDS) if (score >= b.min && score <= b.max) return b.w
  return 0
}

const FEEDBACK = [
  {
    name: 'Connor',       score: 1480, rw_path: 'hard', math_path: 'hard',
    rw_m1:   'felt very easy. I did not struggle.',
    rw_m2:   'very text heavy, especially with vocabulary. Huge blocks of text...messed with pacing.',
    math_m1: 'very easy. Would love to see more geometry and trigonometry.',
    math_m2: 'very simple. Made very easy through Desmos Regressions.',
  },
  {
    name: 'Sai',          score: 1410, rw_path: 'hard', math_path: 'hard',
    rw_m1:   'pacing was a bit slow but could get through all questions',
    rw_m2:   'pacing was slow and I had to guess on a couple of questions',
    math_m1: 'very easy and I finished with a lot of time left over',
    math_m2: 'still very easy and I finished with too much time left over. No overly complex math problems.',
  },
  {
    name: 'Ashvik',       score: 1410, rw_path: 'hard', math_path: 'hard',
    rw_m1:   'relatively easy and acted as a good baseline',
    rw_m2:   'felt much harder',
    math_m1: 'relatively challenging but with persistence I got through it',
    math_m2: 'challenging but I was able to get through it',
  },
  {
    name: 'Meghavarshini',score: 1350, rw_path: 'hard', math_path: 'hard',
    rw_m1:   'clear and accurate; easy to use',
    rw_m2:   'clear and accurate; easy to use',
    math_m1: '[calculator bug: cannot type, move, or save — TECH BUG NOT CONTENT]',
    math_m2: '[calculator bug: cannot type, move, or save — TECH BUG NOT CONTENT]',
  },
  {
    name: 'nn',           score: 1270, rw_path: 'hard', math_path: 'hard',
    rw_m1:   'pretty solid, could have been sharper',
    rw_m2:   'one of the questions was incorrect, it asked for a word that was not in the passage',
    math_m1: 'pretty light, too easy, needs polishing',
    math_m2: 'pretty hard, most questions challenging, close to SAT',
  },
  {
    name: 'Abhi',         score: 900,  rw_path: 'hard', math_path: 'easy',
    rw_m1:   'order inaccurate, but it was difficult [ORDER SINCE FIXED]',
    rw_m2:   'order inaccurate, but it was difficult [ORDER SINCE FIXED]',
    math_m1: 'difficult and looked very SAT style',
    math_m2: 'difficult and looked very SAT style [took easy path]',
  },
  {
    name: 'fariza',       score: 550,  rw_path: 'easy', math_path: 'easy',
    rw_m1:   'some questions were unclear because in the text there were already answers in grammar section',
    rw_m2:   'same grammar complaint — answers visible in passage text',
    math_m1: 'too easy, no need for calculator',
    math_m2: 'too easy [took easy path]',
  },
]

console.log('=== SAT Form 1 Score-Weighted Feedback Analysis ===\n')
console.log('User            Score  Weight  M2 Path')
console.log('─'.repeat(55))
for (const f of FEEDBACK) {
  const w = weight(f.score)
  console.log(`${f.name.padEnd(16)}${String(f.score).padStart(5)}  ${String(w).padStart(6)}  rw=${f.rw_path} math=${f.math_path}`)
}

// Weighted signal per issue
console.log('\n\n=== Weighted Issue Signals ===\n')

const issues = {
  'RW M1 too easy':             { supporters: ['Connor(5)', 'Sai(5)', 'Ashvik(5)'], totalW: 5+5+5, opponents: [] },
  'RW M2 text-heavy':           { supporters: ['Connor(5)', 'Sai(5)'],              totalW: 5+5,   opponents: ['Megha(4)', 'Ashvik(5)'] },
  'RW M2 word-not-in-passage':  { supporters: ['nn(4)'],                            totalW: 4,     opponents: [] },
  'RW grammar reveal in text':  { supporters: ['fariza(0.25)'],                     totalW: 0.25,  opponents: [] },
  'Math M1 too easy':           { supporters: ['Connor(5)', 'Sai(5)', 'nn(4)'],     totalW: 5+5+4, opponents: ['Ashvik(5)', 'Abhi(2)'] },
  'Math M2H too easy':          { supporters: ['Connor(5)', 'Sai(5)'],              totalW: 5+5,   opponents: ['nn(4)', 'Ashvik(5)'] },
  'Math M2H Desmos bypass':     { supporters: ['Connor(5)'],                        totalW: 5,     opponents: [] },
  'Math needs more Geo/Trig':   { supporters: ['Connor(5)'],                        totalW: 5,     opponents: [] },
}

for (const [issue, data] of Object.entries(issues)) {
  const priority = data.totalW >= 10 ? 'HIGH' : data.totalW >= 5 ? 'MED' : 'LOW'
  console.log(`[${priority}] ${issue}`)
  console.log(`       Support: ${data.supporters.join(', ')} → total weight ${data.totalW}`)
  if (data.opponents.length) console.log(`       Mixed: ${data.opponents.join(', ')} said opposite`)
  console.log()
}

console.log('=== Recommended Changes (evidence-required) ===\n')
console.log(`
1. [HIGH, w=14] Math M1 too easy  → Already addressed in previous session (upgraded 4-6 questions per form)
   Verify current state passes validate-sat-math-module1-difficulty.mjs

2. [HIGH, w=10] RW M2 text-heavy  → Audit RW Module 2 Hard for consecutive passages > 100 words
   Shorten 1-2 longest passages (cut 20-40 words each, preserve key detail for question)

3. [HIGH, w=10] Math M2H too easy + [MED, w=5] Desmos bypass
   Audit math-module-2-hard.ts for:
   - Data/scatter plot questions solvable by Desmos regression
   - Linear/exponential "find the equation" questions with data tables
   Replace with word-problem style or derive-from-context rather than plot-to-solve

4. [MED, w=5] Math needs more Geo/Trig → Check Form 1 Math M1 geometry count
   Target: ≥4 geometry questions in M1 (Connor explicitly requested this)

5. [MED, w=4] RW M2 word-not-in-passage bug → Find WiC question where answer word absent from passage
   All WiC questions must have the blank word present in the passage text itself

6. [LOW, w=0.25] RW grammar reveal → Low weight; note for review but do not break working content
`)

console.log('=== Score Context ===\n')
console.log('32 total Form 1 attempts | 17 completed with hard M2 paths')
console.log('High scorer profile (≥1400): Connor 1480, Sai 1410, Ashvik 1410 — consensus on Math M1/M2 too easy')
console.log('Mid scorer (1200-1390): Megha 1350, nn 1270 — mixed feedback, one bug report')
console.log('Low scorers took easy paths or scored <600 — not content experts, low weight\n')

console.log('NOTE: RW order complaints from Abhi pre-date the reorder commit (79efa44). Not actionable.')
