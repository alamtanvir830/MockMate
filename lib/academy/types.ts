export type Difficulty = 'easy' | 'medium' | 'hard'
export type AnswerLabel = 'A' | 'B' | 'C' | 'D'
export type SkillLevel = 'foundation' | 'sat-application' | 'advanced' | 'challenge'

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
  | 'knowledge_check'

export type Domain =
  | 'information-and-ideas'
  | 'craft-and-structure'
  | 'expression-of-ideas'
  | 'standard-english-conventions'

export interface DomainInfo {
  slug: Domain
  title: string
  abbreviation: string
  skills: string[]
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

export interface DesmosGuidance {
  recommendation: 'recommended' | 'optional' | 'not_recommended'
  entry: string
  note: string
}

export interface GuidedExample {
  id: string
  level?: SkillLevel
  subskill?: string
  hints?: string[]           // broad → specific; last hint should not give away the answer
  stimulus?: string
  question: string
  steps: GuidedStep[]
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
  coachTakeaway?: string     // rule to remember + trap to avoid + fastest test-day method
  desmos?: DesmosGuidance
}

export interface DrillQuestion {
  id: string
  skillSlug: string
  subskill?: string
  level?: SkillLevel
  difficulty: Difficulty
  errorCategory?: string     // e.g. 'clause-identification', 'comma-splice', 'conjunctive-adverb'
  stimulus?: string
  question: string
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
  wrongAnswerExplanations: Partial<Record<AnswerLabel, string>>
  teachingPoint: string
  contentVersion?: number
}

export interface CommonTrap {
  title: string
  description: string
  avoidance: string
  miniExample?: string       // one-line example showing the trap in context
  category?: 'clause' | 'punctuation' | 'connecting-word' | 'meaning'
}

export interface KnowledgeCheck {
  id: string
  afterSection: 'overview' | 'strategy' | 'traps'
  question: string
  choices: AcademyChoice[]
  correctAnswer: AnswerLabel
  explanation: string
}

export interface RuleTableRow {
  situation: string
  valid: string
  example: string
  invalid: string
}

export interface AcademySkill {
  slug: string
  title: string
  section: 'reading' | 'writing'
  domain?: Domain
  objective?: string          // one-sentence "By the end of this lesson, you will be able to…"
  estimatedMinutes?: number   // typical completion time for the full lesson
  subskills?: string[]        // internal subskill names for this skill
  overview: {
    whatItTests: string
    howItAppears: string
    whyStudentsMissIt: string
    whatToLookFor: string
    skillAnatomy?: string[]   // components the student must identify (bullet list)
    quickCheckQuestion?: {    // one-minute orientation example (does not count toward mastery)
      stimulus?: string
      question: string
      choices: AcademyChoice[]
      correctAnswer: AnswerLabel
      explanation: string
    }
  }
  strategy: {
    intro?: string            // 1–2 sentence framing of the method
    steps: string[]
    ruleTable?: RuleTableRow[]
    timeSavingTip: string
    whenNotToOverthink: string
    tryItQuestion?: {         // supported question immediately after the method
      stimulus?: string
      question: string
      choices: AcademyChoice[]
      correctAnswer: AnswerLabel
      explanation: string
    }
  }
  commonTraps: CommonTrap[]
  guidedExamples: GuidedExample[]
  drillQuestions: DrillQuestion[]
  masteryQuestions?: DrillQuestion[]  // separate pool for the Mastery assessment tab
  knowledgeChecks?: KnowledgeCheck[]
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
