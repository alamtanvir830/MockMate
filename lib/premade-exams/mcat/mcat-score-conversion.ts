/**
 * MCAT estimated scaled score conversion.
 * Each section scores 118–132 (15-point range).
 * Total score: 472–528 (sum of four sections).
 *
 * This is a MockMate estimation — NOT an official AAMC score.
 * Official MCAT scoring uses equating across administrations.
 */

/**
 * Convert a raw section score to estimated 118–132 scaled score.
 * Uses a non-linear curve that reflects MCAT scoring patterns:
 * - A score of ~50% raw maps to roughly 125 (average)
 * - Perfect raw maps to 132
 * - Zero raw maps to 118
 */
export function convertSectionScore(correct: number, total: number): number {
  if (total === 0) return 118
  const pct = correct / total

  // Piecewise linear approximation of MCAT-style curve
  // 0%   → 118
  // 25%  → 120
  // 50%  → 125
  // 75%  → 129
  // 90%  → 131
  // 100% → 132

  if (pct >= 0.90) {
    return Math.round(131 + (pct - 0.90) / 0.10 * 1)
  } else if (pct >= 0.75) {
    return Math.round(129 + (pct - 0.75) / 0.15 * 2)
  } else if (pct >= 0.50) {
    return Math.round(125 + (pct - 0.50) / 0.25 * 4)
  } else if (pct >= 0.25) {
    return Math.round(120 + (pct - 0.25) / 0.25 * 5)
  } else {
    return Math.round(118 + (pct / 0.25) * 2)
  }
}

export function clampSectionScore(score: number): number {
  return Math.min(132, Math.max(118, score))
}

export function computeMCATScores(
  chemPhysCorrect: number, chemPhysTotal: number,
  carsCorrect: number, carsTotal: number,
  bioBiochemCorrect: number, bioBiochemTotal: number,
  psychSocCorrect: number, psychSocTotal: number,
): {
  chemPhysScore: number
  carsScore: number
  bioBiochemScore: number
  psychSocScore: number
  totalScore: number
} {
  const chemPhysScore  = clampSectionScore(convertSectionScore(chemPhysCorrect, chemPhysTotal))
  const carsScore      = clampSectionScore(convertSectionScore(carsCorrect, carsTotal))
  const bioBiochemScore = clampSectionScore(convertSectionScore(bioBiochemCorrect, bioBiochemTotal))
  const psychSocScore  = clampSectionScore(convertSectionScore(psychSocCorrect, psychSocTotal))
  const totalScore     = chemPhysScore + carsScore + bioBiochemScore + psychSocScore

  return { chemPhysScore, carsScore, bioBiochemScore, psychSocScore, totalScore }
}

export const MCAT_SCORE_DISCLAIMER =
  'This is a MockMate estimated MCAT score based on raw-score conversion. It is not an official AAMC score. Official MCAT scores use equating across multiple administrations and test forms.'

export const MCAT_PERCENTILE_GUIDE: { score: number; percentile: string }[] = [
  { score: 528, percentile: '100th' },
  { score: 524, percentile: '99th' },
  { score: 520, percentile: '97th' },
  { score: 516, percentile: '93rd' },
  { score: 511, percentile: '81st' },
  { score: 507, percentile: '64th' },
  { score: 504, percentile: '51st' },
  { score: 500, percentile: '37th' },
  { score: 496, percentile: '24th' },
  { score: 491, percentile: '11th' },
  { score: 485, percentile: '3rd' },
  { score: 472, percentile: '<1st' },
]

export function getApproximatePercentile(totalScore: number): string {
  for (const { score, percentile } of MCAT_PERCENTILE_GUIDE) {
    if (totalScore >= score) return percentile
  }
  return '<1st'
}
