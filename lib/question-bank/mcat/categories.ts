import type { MCATQBQuestion, MCATQBSection } from './types'

export interface CategoryNode {
  id: string
  label: string
  count: number
  questionIds: string[]
  children: CategoryNode[]
}

const SECTION_LABELS: Record<MCATQBSection, string> = {
  'chem-phys': 'Chemical & Physical Foundations of Biological Systems',
  'cars': 'Critical Analysis & Reasoning Skills',
  'bio-biochem': 'Biological & Biochemical Foundations of Living Systems',
  'psych-soc': 'Psychological, Social & Biological Foundations of Behavior',
}

const SECTION_ORDER: MCATQBSection[] = ['chem-phys', 'cars', 'bio-biochem', 'psych-soc']

export function buildCategoryTree(questions: MCATQBQuestion[]): CategoryNode[] {
  const sectionMap = new Map<MCATQBSection, Map<string, Map<string, string[]>>>()

  for (const q of questions) {
    if (!sectionMap.has(q.section)) sectionMap.set(q.section, new Map())
    const discMap = sectionMap.get(q.section)!
    if (!discMap.has(q.discipline)) discMap.set(q.discipline, new Map())
    const catMap = discMap.get(q.discipline)!
    if (!catMap.has(q.contentCategory)) catMap.set(q.contentCategory, [])
    catMap.get(q.contentCategory)!.push(q.id)
  }

  return SECTION_ORDER.map(section => {
    const discMap = sectionMap.get(section) ?? new Map()
    const sectionQIds: string[] = []
    const discChildren: CategoryNode[] = []

    for (const [disc, catMap] of discMap) {
      const discQIds: string[] = []
      const catChildren: CategoryNode[] = []

      for (const [cat, qIds] of catMap) {
        catChildren.push({
          id: `${section}::${disc}::${cat}`,
          label: cat,
          count: qIds.length,
          questionIds: qIds,
          children: [],
        })
        discQIds.push(...qIds)
      }

      discChildren.push({
        id: `${section}::${disc}`,
        label: disc,
        count: discQIds.length,
        questionIds: discQIds,
        children: catChildren,
      })
      sectionQIds.push(...discQIds)
    }

    return {
      id: section,
      label: SECTION_LABELS[section],
      count: sectionQIds.length,
      questionIds: sectionQIds,
      children: discChildren,
    }
  })
}

export function getLeafIds(node: CategoryNode): string[] {
  if (node.children.length === 0) return [node.id]
  return node.children.flatMap(child => getLeafIds(child))
}

export function getSelectedQuestionIds(
  selectedLeafIds: Set<string>,
  tree: CategoryNode[]
): string[] {
  const ids: string[] = []
  for (const section of tree) {
    for (const disc of section.children) {
      for (const cat of disc.children) {
        if (selectedLeafIds.has(cat.id)) {
          ids.push(...cat.questionIds)
        }
      }
    }
  }
  return ids
}
