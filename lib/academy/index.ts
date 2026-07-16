import type { AcademySkill } from './types'
import { readingSkills } from './reading'
import { writingSkills } from './writing'

export const allSkills: AcademySkill[] = [...readingSkills, ...writingSkills]

export function getSkill(slug: string): AcademySkill | undefined {
  return allSkills.find((s) => s.slug === slug)
}

export { readingSkills, writingSkills }
export type { AcademySkill }
