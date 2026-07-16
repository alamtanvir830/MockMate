import type { AcademySkill } from '../types'
import { wordsInContext } from './words-in-context'
import { centralIdeasDetails } from './central-ideas-details'
import { textStructurePurpose } from './text-structure-purpose'
import { commandOfEvidence } from './command-of-evidence'
import { quantitativeEvidence } from './quantitative-evidence'
import { inferences } from './inferences'
import { crossTextConnections } from './cross-text-connections'

export const readingSkills: AcademySkill[] = [
  wordsInContext,
  centralIdeasDetails,
  textStructurePurpose,
  commandOfEvidence,
  quantitativeEvidence,
  inferences,
  crossTextConnections,
]

export {
  wordsInContext,
  centralIdeasDetails,
  textStructurePurpose,
  commandOfEvidence,
  quantitativeEvidence,
  inferences,
  crossTextConnections,
}
