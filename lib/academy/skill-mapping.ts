// Maps SAT question `skill` strings → academy lesson slugs
// Returns null for skills without a direct academy lesson (e.g. Cross-Text Connections)

const RW_SKILL_MAP: Record<string, string> = {
  'Words in Context':          'words-in-context',
  'Central Ideas and Details': 'central-ideas-details',
  'Text Structure and Purpose':'text-structure-purpose',
  'Command of Evidence':       'command-of-evidence',
  'Inferences':                'inferences',
  'Rhetorical Synthesis':      'rhetorical-synthesis',
  'Transitions':               'transitions',
  'Boundaries':                'boundaries',
  'Form, Structure, and Sense':'form-structure-sense',
  'Form Structure and Sense':  'form-structure-sense',
}

export function rwSkillToAcademySlug(skill: string): string | null {
  return RW_SKILL_MAP[skill] ?? null
}
