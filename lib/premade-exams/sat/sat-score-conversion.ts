// SAT Score Conversion — Form 1
// Converts raw section scores to scaled 200–800 scores using adaptive module caps.
//
// Adaptive structure:
//   RW:   Module 1 (27 Qs) + Module 2 Easy (27 Qs)  OR  Module 2 Hard (27 Qs)
//   Math: Module 1 (22 Qs) + Module 2 Easy (22 Qs)  OR  Module 2 Hard (22 Qs)
//
// Total questions seen per section: 54 RW, 44 Math
// Routing thresholds: RW ≥ 14/27 → Hard M2; Math ≥ 11/22 → Hard M2

// ── Raw score → scaled score tables ─────────────────────────────────────────
// Each entry: [rawScore, scaledScoreEasyPath, scaledScoreHardPath]
// For a given raw score, the scaled score depends on which second module was taken.

const rwConversionTable: [number, number, number][] = [
  [0,  200, 200],
  [1,  200, 210],
  [2,  200, 220],
  [3,  210, 230],
  [4,  220, 240],
  [5,  230, 250],
  [6,  240, 260],
  [7,  250, 270],
  [8,  260, 280],
  [9,  270, 295],
  [10, 280, 310],
  [11, 295, 325],
  [12, 310, 340],
  [13, 325, 355],
  [14, 340, 370],
  [15, 355, 385],
  [16, 370, 400],
  [17, 385, 415],
  [18, 400, 430],
  [19, 415, 445],
  [20, 430, 460],
  [21, 445, 475],
  [22, 460, 490],
  [23, 475, 510],
  [24, 490, 530],
  [25, 510, 550],
  [26, 530, 570],
  [27, 550, 590],
  [28, 570, 610],
  [29, 590, 630],
  [30, 610, 650],
  [31, 630, 670],
  [32, 650, 690],
  [33, 670, 710],
  [34, 690, 730],
  [35, 710, 750],
  [36, 730, 760],
  [37, 750, 770],
  [38, 760, 780],
  [39, 770, 790],
  [40, 780, 800],
  [41, 790, 800],
  [42, 800, 800],
  [43, 800, 800],
  [44, 800, 800],
  [45, 800, 800],
  [46, 800, 800],
  [47, 800, 800],
  [48, 800, 800],
  [49, 800, 800],
  [50, 800, 800],
  [51, 800, 800],
  [52, 800, 800],
  [53, 800, 800],
  [54, 800, 800],
]

const mathConversionTable: [number, number, number][] = [
  [0,  200, 200],
  [1,  200, 210],
  [2,  210, 225],
  [3,  220, 240],
  [4,  235, 255],
  [5,  250, 270],
  [6,  265, 290],
  [7,  280, 310],
  [8,  295, 330],
  [9,  315, 350],
  [10, 335, 370],
  [11, 355, 390],
  [12, 375, 410],
  [13, 395, 430],
  [14, 415, 455],
  [15, 435, 480],
  [16, 455, 505],
  [17, 475, 530],
  [18, 500, 555],
  [19, 525, 580],
  [20, 550, 605],
  [21, 575, 630],
  [22, 600, 655],
  [23, 625, 680],
  [24, 650, 705],
  [25, 675, 730],
  [26, 700, 755],
  [27, 720, 770],
  [28, 740, 785],
  [29, 760, 795],
  [30, 775, 800],
  [31, 790, 800],
  [32, 800, 800],
  [33, 800, 800],
  [34, 800, 800],
  [35, 800, 800],
  [36, 800, 800],
  [37, 800, 800],
  [38, 800, 800],
  [39, 800, 800],
  [40, 800, 800],
  [41, 800, 800],
  [42, 800, 800],
  [43, 800, 800],
  [44, 800, 800],
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

// Round SAT scores to nearest 10 (official SAT scoring convention)
export function roundSATScore(score: number): number {
  return Math.round(score / 10) * 10
}
