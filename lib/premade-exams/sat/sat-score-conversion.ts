// MockMate Estimated SAT Score Conversion
// Converts raw section scores to estimated scaled 200–800 scores.
// These are NOT official College Board scores — they are MockMate estimates
// intended to give a rough sense of performance relative to the 200–800 scale.
//
// Adaptive structure:
//   RW:   Module 1 (27 Qs) + Module 2 Easy (27 Qs)  OR  Module 2 Hard (27 Qs)
//   Math: Module 1 (22 Qs) + Module 2 Easy (22 Qs)  OR  Module 2 Hard (22 Qs)
//
// Total questions per section: 54 RW, 44 Math
// Routing thresholds: RW ≥ 14/27 → Hard M2; Math ≥ 11/22 → Hard M2
//
// Hard path: allows scores up to 800, requires near-perfect for 800
// Easy path: caps lower (~730 RW, ~690 Math) — harder questions are valued more

// ── Raw score → scaled score tables ──────────────────────────────────────────
// [rawScore, scaledEasyPath, scaledHardPath]
// Hard path: 800 only at 53–54/54 RW, 43–44/44 Math
// Hard 47/54 RW ≈ 740; Hard 37/44 Math ≈ 720

const rwConversionTable: [number, number, number][] = [
  [0,  200, 200],
  [1,  200, 210],
  [2,  208, 220],
  [3,  216, 230],
  [4,  224, 240],
  [5,  232, 250],
  [6,  244, 262],
  [7,  256, 274],
  [8,  268, 286],
  [9,  280, 298],
  [10, 290, 310],
  [11, 302, 322],
  [12, 314, 334],
  [13, 326, 346],
  [14, 338, 358],
  [15, 350, 370],
  [16, 362, 382],
  [17, 373, 394],
  [18, 384, 406],
  [19, 397, 418],
  [20, 410, 430],
  [21, 420, 441],
  [22, 430, 452],
  [23, 440, 463],
  [24, 450, 474],
  [25, 461, 485],
  [26, 471, 496],
  [27, 481, 507],
  [28, 492, 518],
  [29, 503, 529],
  [30, 515, 540],
  [31, 525, 551],
  [32, 535, 562],
  [33, 545, 573],
  [34, 555, 584],
  [35, 566, 595],
  [36, 577, 606],
  [37, 586, 617],
  [38, 596, 628],
  [39, 606, 639],
  [40, 614, 650],
  [41, 623, 663],
  [42, 633, 676],
  [43, 641, 688],
  [44, 650, 700],
  [45, 658, 712],
  [46, 668, 726],
  [47, 678, 740],
  [48, 686, 749],
  [49, 695, 758],
  [50, 703, 768],
  [51, 711, 776],
  [52, 718, 784],
  [53, 724, 792],
  [54, 730, 800],
]

const mathConversionTable: [number, number, number][] = [
  [0,  200, 200],
  [1,  211, 215],
  [2,  222, 230],
  [3,  233, 245],
  [4,  244, 260],
  [5,  255, 275],
  [6,  265, 290],
  [7,  275, 305],
  [8,  285, 320],
  [9,  295, 335],
  [10, 305, 350],
  [11, 319, 366],
  [12, 333, 382],
  [13, 347, 398],
  [14, 361, 414],
  [15, 375, 430],
  [16, 389, 446],
  [17, 403, 462],
  [18, 417, 478],
  [19, 431, 494],
  [20, 445, 510],
  [21, 458, 523],
  [22, 471, 536],
  [23, 484, 549],
  [24, 497, 562],
  [25, 510, 575],
  [26, 523, 588],
  [27, 536, 601],
  [28, 549, 614],
  [29, 562, 627],
  [30, 575, 640],
  [31, 586, 651],
  [32, 597, 663],
  [33, 608, 674],
  [34, 619, 686],
  [35, 630, 697],
  [36, 641, 709],
  [37, 652, 720],
  [38, 659, 732],
  [39, 666, 744],
  [40, 673, 756],
  [41, 678, 767],
  [42, 683, 778],
  [43, 687, 789],
  [44, 690, 800],
]

export function convertRWScore(rawScore: number, usedHardModule: boolean): number {
  const clamped = Math.max(0, Math.min(rawScore, 54))
  const row = rwConversionTable[clamped] ?? rwConversionTable[rwConversionTable.length - 1]
  return usedHardModule ? row[2] : row[1]
}

export function convertMathScore(rawScore: number, usedHardModule: boolean): number {
  const clamped = Math.max(0, Math.min(rawScore, 44))
  const row = mathConversionTable[clamped] ?? mathConversionTable[mathConversionTable.length - 1]
  return usedHardModule ? row[2] : row[1]
}

export function convertTotalScore(rwScaled: number, mathScaled: number): number {
  return rwScaled + mathScaled
}

// Round SAT scores to nearest 10
export function roundSATScore(score: number): number {
  return Math.round(score / 10) * 10
}

// Recompute scaled scores from raw attempt data. Used to fix stored attempts
// that were computed with an older scoring table.
export function rescoreAttempt(
  rwRaw: number,
  rwHard: boolean,
  mathRaw: number,
  mathHard: boolean,
): { rwScaled: number; mathScaled: number; totalScore: number } {
  const rwScaled = roundSATScore(convertRWScore(rwRaw, rwHard))
  const mathScaled = roundSATScore(convertMathScore(mathRaw, mathHard))
  return { rwScaled, mathScaled, totalScore: rwScaled + mathScaled }
}
