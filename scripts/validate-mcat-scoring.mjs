#!/usr/bin/env node
/**
 * validate-mcat-scoring.mjs
 *
 * Validates the MCAT scoring system defined in
 * lib/premade-exams/mcat/mcat-score-conversion.ts
 *
 * Checks:
 *  1. Boundary values: 0/N → 118, N/N → 132
 *  2. 50% raw maps to ~125 (MCAT average)
 *  3. 75% raw maps to ~129
 *  4. Monotonicity: score never decreases as correct answers increase
 *  5. Total score boundaries: 4×118=472 and 4×132=528
 *  6. Sanity: 50% doesn't accidentally produce 528
 *  7. Section totals: C/P=59, CARS=53, B/B=59, P/S=59
 */

// ─── Inline the scoring logic (exact copy from mcat-score-conversion.ts) ─────

function convertSectionScore(correct, total) {
  if (total === 0) return 118;
  const pct = correct / total;

  if (pct >= 0.90) {
    return Math.round(131 + (pct - 0.90) / 0.10 * 1);
  } else if (pct >= 0.75) {
    return Math.round(129 + (pct - 0.75) / 0.15 * 2);
  } else if (pct >= 0.50) {
    return Math.round(125 + (pct - 0.50) / 0.25 * 4);
  } else if (pct >= 0.25) {
    return Math.round(120 + (pct - 0.25) / 0.25 * 5);
  } else {
    return Math.round(118 + (pct / 0.25) * 2);
  }
}

function clampSectionScore(score) {
  return Math.min(132, Math.max(118, score));
}

function computeMCATScores(
  chemPhysCorrect, chemPhysTotal,
  carsCorrect, carsTotal,
  bioBiochemCorrect, bioBiochemTotal,
  psychSocCorrect, psychSocTotal,
) {
  const chemPhysScore   = clampSectionScore(convertSectionScore(chemPhysCorrect, chemPhysTotal));
  const carsScore       = clampSectionScore(convertSectionScore(carsCorrect, carsTotal));
  const bioBiochemScore = clampSectionScore(convertSectionScore(bioBiochemCorrect, bioBiochemTotal));
  const psychSocScore   = clampSectionScore(convertSectionScore(psychSocCorrect, psychSocTotal));
  const totalScore      = chemPhysScore + carsScore + bioBiochemScore + psychSocScore;
  return { chemPhysScore, carsScore, bioBiochemScore, psychSocScore, totalScore };
}

// ─── Test infrastructure ──────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function check(description, actual, expected, tolerance = 0) {
  const ok = Math.abs(actual - expected) <= tolerance;
  if (ok) {
    console.log(`  PASS  ${description}`);
    passed++;
  } else {
    console.log(`  FAIL  ${description}`);
    console.log(`        expected=${expected}${tolerance > 0 ? ` ±${tolerance}` : ''}, got=${actual}`);
    failed++;
  }
}

function checkTrue(description, condition) {
  if (condition) {
    console.log(`  PASS  ${description}`);
    passed++;
  } else {
    console.log(`  FAIL  ${description}`);
    failed++;
  }
}

// ─── Section totals used on the actual form ───────────────────────────────────

const TOTALS = {
  cpTotal: 59,
  carsTotal: 53,
  bbTotal: 59,
  psTotal: 59,
};

// ─── Test suite ───────────────────────────────────────────────────────────────

console.log('=== MCAT Scoring Validation ===\n');

// 1. Boundary values per section
console.log('1. Section boundary values');
for (const [label, total] of [
  ['C/P', TOTALS.cpTotal],
  ['CARS', TOTALS.carsTotal],
  ['B/B', TOTALS.bbTotal],
  ['P/S', TOTALS.psTotal],
]) {
  check(`${label}: 0/${total} → 118`, convertSectionScore(0, total), 118);
  check(`${label}: ${total}/${total} → 132`, convertSectionScore(total, total), 132);
}
console.log();

// 2. 50% raw → ~125
console.log('2. 50% raw maps to 125');
for (const [label, total] of [
  ['C/P', TOTALS.cpTotal],
  ['CARS', TOTALS.carsTotal],
  ['B/B', TOTALS.bbTotal],
  ['P/S', TOTALS.psTotal],
]) {
  const half = Math.round(total / 2);
  const score = convertSectionScore(half, total);
  check(`${label}: ${half}/${total} (~50%) → 125 ±1`, score, 125, 1);
}
console.log();

// 3. 75% raw → ~129
console.log('3. 75% raw maps to 129');
for (const [label, total] of [
  ['C/P', TOTALS.cpTotal],
  ['CARS', TOTALS.carsTotal],
  ['B/B', TOTALS.bbTotal],
  ['P/S', TOTALS.psTotal],
]) {
  const seventyfive = Math.round(total * 0.75);
  const score = convertSectionScore(seventyfive, total);
  check(`${label}: ${seventyfive}/${total} (~75%) → 129 ±1`, score, 129, 1);
}
console.log();

// 4. Monotonicity — score never decreases as correct answers increase
console.log('4. Monotonicity (score never decreases as correct count rises)');
for (const [label, total] of [
  ['C/P', TOTALS.cpTotal],
  ['CARS', TOTALS.carsTotal],
  ['B/B', TOTALS.bbTotal],
  ['P/S', TOTALS.psTotal],
]) {
  let monotonic = true;
  let prev = convertSectionScore(0, total);
  for (let c = 1; c <= total; c++) {
    const cur = convertSectionScore(c, total);
    if (cur < prev) {
      monotonic = false;
      console.log(`  FAIL  ${label} monotonicity broken at c=${c}: ${cur} < ${prev}`);
      failed++;
      break;
    }
    prev = cur;
  }
  if (monotonic) {
    console.log(`  PASS  ${label} (${total} points): monotonically non-decreasing`);
    passed++;
  }
}
console.log();

// 5. Total score boundaries
console.log('5. Total score boundaries');
const minScore = computeMCATScores(0, TOTALS.cpTotal, 0, TOTALS.carsTotal, 0, TOTALS.bbTotal, 0, TOTALS.psTotal);
check('0+0+0+0 correct → total 472', minScore.totalScore, 472);

const maxScore = computeMCATScores(
  TOTALS.cpTotal, TOTALS.cpTotal,
  TOTALS.carsTotal, TOTALS.carsTotal,
  TOTALS.bbTotal, TOTALS.bbTotal,
  TOTALS.psTotal, TOTALS.psTotal,
);
check('All correct → total 528', maxScore.totalScore, 528);
console.log();

// 6. Sanity: 50% total doesn't produce perfect 528
console.log('6. Sanity: ~50% overall does not produce 528');
const halfScore = computeMCATScores(
  Math.round(TOTALS.cpTotal / 2), TOTALS.cpTotal,
  Math.round(TOTALS.carsTotal / 2), TOTALS.carsTotal,
  Math.round(TOTALS.bbTotal / 2), TOTALS.bbTotal,
  Math.round(TOTALS.psTotal / 2), TOTALS.psTotal,
);
checkTrue('50% overall total < 528', halfScore.totalScore < 528);
console.log(`        (50% total = ${halfScore.totalScore})`);
console.log();

// 7. All section scores stay within [118, 132]
console.log('7. Section scores clamped within [118, 132]');
for (const [label, total] of [
  ['C/P', TOTALS.cpTotal],
  ['CARS', TOTALS.carsTotal],
  ['B/B', TOTALS.bbTotal],
  ['P/S', TOTALS.psTotal],
]) {
  let allInRange = true;
  for (let c = 0; c <= total; c++) {
    const s = clampSectionScore(convertSectionScore(c, total));
    if (s < 118 || s > 132) {
      allInRange = false;
      console.log(`  FAIL  ${label}: score=${s} out of range at c=${c}/${total}`);
      failed++;
      break;
    }
  }
  if (allInRange) {
    console.log(`  PASS  ${label}: all scores in [118, 132]`);
    passed++;
  }
}
console.log();

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('--- Summary ---');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Result: ${failed === 0 ? 'PASS' : 'FAIL'}`);

process.exit(failed === 0 ? 0 : 1);
