export type Difficulty = 'easy' | 'medium' | 'hard'
export type AnswerLabel = 'A' | 'B' | 'C' | 'D'

export type PracticeMode =
  | 'diagnostic'
  | 'guided_practice'
  | 'targeted_drill'
  | 'cumulative_review'
  | 'recognition_check'
  | 'question_type_recognition'
  | 'mixed_practice'
  | 'capstone'
  | 'mastery_check'
  | 'vocabulary'
  | 'transition_trainer'

export type Domain =
  | 'information-and-ideas'
  | 'craft-and-structure'
  | 'expression-of-ideas'
  | 'standard-english-conventions'

export interface DomainInfo {
  slug: Domain
  title: string
  abbreviation: string
  skills: string[]  // skill slugs
}

export const DOMAINS: DomainInfo[] = [
  {
    slug: 'information-and-ideas',
    title: 'Information and Ideas',
    abbreviation: 'INF',
    skills: ['central-ideas-details', 'inferences', 'command-of-evidence'],
  },
  {
    slug: 'craft-and-structure',
    title: 'Craft and Structure',
    abbreviation: 'CAS',
    skills: ['words-in-context', 'text-structure-purpose', 'cross-text-connections'],
  },
  {
    slug: 'expression-of-ideas',
    title: 'Expression of Ideas',
    abbreviation: 'EOI',
    skills: ['transitions', 'rhetorical-synthesis'],
  },
  {
    slug: 'standard-english-conventions',
    title: 'Standard English Conventions',
    abbreviation: 'SEC',
    skills: ['boundaries', 'form-structure-sense'],
  },
]

export function getDomainForSkill(skillSlug: string): Domain | null {
  for (const d of DOMAINS) {
    if (d.skills.includes(skillSlug)) return d.slug
  }
  // quantitative-evidence is a subskill of command-of-evidence
  if (skillSlug === 'quantitative-evidence') return 'information-and-ideas'
  return null
}

export interface AcademyChoice {
  label: AnswerLabel
  text: string
}

export interface GuidedStep {
  instruction: string
  content: string
}

export interface GuidedExample {
  id: string
  stimulus?: string
  question: string
  steps: GuidedStep[]
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
}

export interface DrillQuestion {
  id: string
  skillSlug: string
  subskill?: string
  difficulty: Difficulty
  stimulus?: string
  question: string
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
  teachingPoint: string
  contentVersion?: number  // defaults to 1
}

export interface CommonTrap {
  title: string
  description: string
  avoidance: string
}

export interface AcademySkill {
  slug: string
  title: string
  section: 'reading' | 'writing'
  domain?: Domain
  overview: {
    whatItTests: string
    howItAppears: string
    whyStudentsMissIt: string
    whatToLookFor: string
  }
  strategy: {
    steps: string[]
    timeSavingTip: string
    whenNotToOverthink: string
  }
  commonTraps: CommonTrap[]
  guidedExamples: GuidedExample[]  // at least 3; target 5
  drillQuestions: DrillQuestion[]  // at least 10
}

export interface MixedPracticeQuestion extends DrillQuestion {
  skillTitle: string
  domainSlug: Domain | null
  domainTitle: string | null
}

export interface ContentReport {
  contentType: string
  contentId: string
  contentVersion: number
  route?: string
  issueCategory: string
  description: string
}
