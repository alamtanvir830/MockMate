import { algebraSkills } from './algebra'
import { advancedMathSkills } from './advanced-math'
import { psdaSkills } from './psda'
import { geometrySkills } from './geometry'
import type { MathAcademySkill } from './types'

export type { MathAcademySkill }
export * from './types'

export const allMathSkills: MathAcademySkill[] = [
  ...algebraSkills,
  ...advancedMathSkills,
  ...psdaSkills,
  ...geometrySkills,
]

export function getMathSkill(slug: string): MathAcademySkill | undefined {
  return allMathSkills.find(s => s.slug === slug)
}
