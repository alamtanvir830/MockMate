// Deterministic personalized lesson recommendations for SAT Results pages.
// Derives 3–4 lessons per academy from a student's missed questions and weakest skills.
// No runtime AI calls, no external API calls, no randomness.

import {
  rwSkillToAcademySlug,
  ACADEMY_SKILL_SLUGS,
  SKILL_DISPLAY_NAMES,
} from '@/lib/academy/skill-mapping'
import {
  mathSkillToAcademySlug,
  MATH_SKILL_SLUGS,
  MATH_SKILL_DISPLAY_NAMES,
} from '@/lib/academy/math/skill-mapping'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WeakSkillInput {
  skill: string
  section: 'rw' | 'math'
  missCount: number
  totalCount: number
}

export interface LessonRecommendation {
  slug: string
  title: string
  href: string
  missCount: number
}

// ── Fallback lesson pools ─────────────────────────────────────────────────────
// Used when a student has no misses in a section (perfect score) or when skill
// metadata is insufficient to produce 3+ recommendations.

const RW_FALLBACK_SLUGS = [
  'words-in-context',
  'central-ideas-details',
  'command-of-evidence',
  'inferences',
  'boundaries',
  'transitions',
  'rhetorical-synthesis',
  'text-structure-purpose',
  'cross-text-connections',
  'form-structure-sense',
  'quantitative-evidence',
] as const

const MATH_FALLBACK_SLUGS = [
  'linear-equations',
  'systems-of-equations',
  'quadratic-equations',
  'linear-functions',
  'ratios-rates-units',
  'one-variable-data',
  'exponential-functions',
  'right-triangles-trig',
  'probability',
  'circles',
  'area-volume',
] as const

// ── Core recommendation algorithm ─────────────────────────────────────────────

/**
 * Returns 3–4 Reading & Writing lesson recommendations sorted by weakness.
 *
 * Algorithm:
 * 1. Filter weak skills to R&W section.
 * 2. Map each to its academy slug. Skip unmapped skills.
 * 3. Deduplicate (some question skill strings map to the same lesson).
 * 4. Rank: highest missCount first; ties broken by ACADEMY_SKILL_SLUGS curriculum order.
 * 5. If fewer than 3 unique lessons result, fill from RW_FALLBACK_SLUGS.
 * 6. Return top 4 (or 3 if curriculum has fewer).
 */
export function getRWRecommendations(weakSkills: WeakSkillInput[]): LessonRecommendation[] {
  const rwWeak = weakSkills.filter(s => s.section === 'rw')

  const seen = new Set<string>()
  const ranked: LessonRecommendation[] = []

  for (const ws of rwWeak) {
    const slug = rwSkillToAcademySlug(ws.skill)
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    ranked.push({
      slug,
      title: SKILL_DISPLAY_NAMES[slug] ?? slug,
      href: `/sat-rw-academy/lesson/${slug}`,
      missCount: ws.missCount,
    })
  }

  // Sort: missCount desc, then curriculum order as tie-breaker
  ranked.sort((a, b) => {
    if (b.missCount !== a.missCount) return b.missCount - a.missCount
    const ai = ACADEMY_SKILL_SLUGS.indexOf(a.slug as typeof ACADEMY_SKILL_SLUGS[number])
    const bi = ACADEMY_SKILL_SLUGS.indexOf(b.slug as typeof ACADEMY_SKILL_SLUGS[number])
    return ai - bi
  })

  // Fill to at least 3 from fallback pool (foundational lessons first)
  for (const fallbackSlug of RW_FALLBACK_SLUGS) {
    if (ranked.length >= 4) break
    if (seen.has(fallbackSlug)) continue
    seen.add(fallbackSlug)
    ranked.push({
      slug: fallbackSlug,
      title: SKILL_DISPLAY_NAMES[fallbackSlug] ?? fallbackSlug,
      href: `/sat-rw-academy/lesson/${fallbackSlug}`,
      missCount: 0,
    })
  }

  return ranked.slice(0, 4)
}

/**
 * Returns 3–4 Math & Desmos lesson recommendations sorted by weakness.
 *
 * Algorithm mirrors getRWRecommendations but uses the Math skill mapping.
 */
export function getMathRecommendations(weakSkills: WeakSkillInput[]): LessonRecommendation[] {
  const mathWeak = weakSkills.filter(s => s.section === 'math')

  const seen = new Set<string>()
  const ranked: LessonRecommendation[] = []

  for (const ws of mathWeak) {
    const slug = mathSkillToAcademySlug(ws.skill)
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    ranked.push({
      slug,
      title: MATH_SKILL_DISPLAY_NAMES[slug] ?? slug,
      href: `/sat-math-academy/lesson/${slug}`,
      missCount: ws.missCount,
    })
  }

  ranked.sort((a, b) => {
    if (b.missCount !== a.missCount) return b.missCount - a.missCount
    const ai = MATH_SKILL_SLUGS.indexOf(a.slug as typeof MATH_SKILL_SLUGS[number])
    const bi = MATH_SKILL_SLUGS.indexOf(b.slug as typeof MATH_SKILL_SLUGS[number])
    return ai - bi
  })

  for (const fallbackSlug of MATH_FALLBACK_SLUGS) {
    if (ranked.length >= 4) break
    if (seen.has(fallbackSlug)) continue
    seen.add(fallbackSlug)
    ranked.push({
      slug: fallbackSlug,
      title: MATH_SKILL_DISPLAY_NAMES[fallbackSlug] ?? fallbackSlug,
      href: `/sat-math-academy/lesson/${fallbackSlug}`,
      missCount: 0,
    })
  }

  return ranked.slice(0, 4)
}

/**
 * Convenience wrapper returning recommendations for both sections.
 *
 * Version-compatibility note: weakSkills should be derived from the attempt's
 * resolved form questions (the same form object used to render results), not
 * from the current live question set. This ensures historical V1 attempts
 * generate recommendations from their original question metadata rather than
 * V2 question metadata.
 */
export function getRecommendedAcademyLessons(
  weakSkills: WeakSkillInput[],
  section: 'rw' | 'math' | 'both',
): { rw: LessonRecommendation[]; math: LessonRecommendation[] } {
  return {
    rw:   section !== 'math' ? getRWRecommendations(weakSkills)   : [],
    math: section !== 'rw'   ? getMathRecommendations(weakSkills) : [],
  }
}
