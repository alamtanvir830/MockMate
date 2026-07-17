// Maps SAT question `skill` strings → academy lesson slugs
// Returns null for skills without a direct academy lesson

const RW_SKILL_MAP: Record<string, string> = {
  'Words in Context':            'words-in-context',
  'Central Ideas and Details':   'central-ideas-details',
  'Text Structure and Purpose':  'text-structure-purpose',
  'Command of Evidence':         'command-of-evidence',
  'Command of Evidence - Textual': 'command-of-evidence',
  'Command of Evidence - Quantitative': 'quantitative-evidence',
  'Inferences':                  'inferences',
  'Cross-Text Connections':      'cross-text-connections',
  'Rhetorical Synthesis':        'rhetorical-synthesis',
  'Transitions':                 'transitions',
  'Boundaries':                  'boundaries',
  'Form, Structure, and Sense':  'form-structure-sense',
  'Form Structure and Sense':    'form-structure-sense',
}

export function rwSkillToAcademySlug(skill: string): string | null {
  return RW_SKILL_MAP[skill] ?? null
}

// All valid academy skill slugs (ordered by recommended learning path)
export const ACADEMY_SKILL_SLUGS = [
  'boundaries',
  'form-structure-sense',
  'transitions',
  'rhetorical-synthesis',
  'words-in-context',
  'central-ideas-details',
  'text-structure-purpose',
  'command-of-evidence',
  'quantitative-evidence',
  'inferences',
  'cross-text-connections',
] as const

export type AcademySkillSlug = typeof ACADEMY_SKILL_SLUGS[number]

export const SKILL_SECTION: Record<AcademySkillSlug, 'reading' | 'writing'> = {
  'boundaries':             'writing',
  'form-structure-sense':   'writing',
  'transitions':            'writing',
  'rhetorical-synthesis':   'writing',
  'words-in-context':       'reading',
  'central-ideas-details':  'reading',
  'text-structure-purpose': 'reading',
  'command-of-evidence':    'reading',
  'quantitative-evidence':  'reading',
  'inferences':             'reading',
  'cross-text-connections': 'reading',
}

export const SKILL_DISPLAY_NAMES: Record<string, string> = {
  'boundaries':             'Boundaries',
  'form-structure-sense':   'Form, Structure & Sense',
  'transitions':            'Transitions',
  'rhetorical-synthesis':   'Rhetorical Synthesis',
  'words-in-context':       'Words in Context',
  'central-ideas-details':  'Central Ideas & Details',
  'text-structure-purpose': 'Text Structure & Purpose',
  'command-of-evidence':    'Command of Evidence',
  'quantitative-evidence':  'Quantitative Evidence',
  'inferences':             'Inferences',
  'cross-text-connections': 'Cross-Text Connections',
}
