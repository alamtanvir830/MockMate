import type { MCATQBQuestion, MCATQBSection, MCATQBDifficulty, MCATQBSkill, MCATQBPracticeSetResult } from './types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export interface MCATQBConfig {
  section?: MCATQBSection
  disciplines?: string[]
  difficulties?: MCATQBDifficulty[]
  skills?: MCATQBSkill[]
  count: number
}

export function selectMCATQuestions(
  all: MCATQBQuestion[],
  config: MCATQBConfig,
  seenIds: Set<string> = new Set(),
): MCATQBQuestion[] {
  let pool = all

  if (config.section) pool = pool.filter(q => q.section === config.section)
  if (config.disciplines?.length) pool = pool.filter(q => config.disciplines!.includes(q.discipline))
  if (config.difficulties?.length) pool = pool.filter(q => config.difficulties!.includes(q.difficulty))
  if (config.skills?.length) pool = pool.filter(q => config.skills!.includes(q.scientificSkill))

  const unseen = pool.filter(q => !seenIds.has(q.id))
  const seen = pool.filter(q => seenIds.has(q.id))
  const shuffled = [...shuffle(unseen), ...shuffle(seen)]
  return shuffled.slice(0, config.count)
}

const MCAT_QB_RESULTS_KEY = 'mockmate_mcat_qb_results_v1'
const MCAT_QB_SEEN_KEY = 'mockmate_mcat_qb_seen_v1'

export function saveMCATQBResult(result: MCATQBPracticeSetResult): void {
  if (typeof window === 'undefined') return
  try {
    const all = loadAllMCATQBResults()
    const filtered = all.filter(r => r.id !== result.id)
    localStorage.setItem(MCAT_QB_RESULTS_KEY, JSON.stringify([result, ...filtered].slice(0, 50)))
  } catch { /* quota */ }
}

export function loadMCATQBResult(id: string): MCATQBPracticeSetResult | null {
  if (typeof window === 'undefined') return null
  return loadAllMCATQBResults().find(r => r.id === id) ?? null
}

export function loadAllMCATQBResults(): MCATQBPracticeSetResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(MCAT_QB_RESULTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function deleteMCATQBResult(id: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MCAT_QB_RESULTS_KEY, JSON.stringify(loadAllMCATQBResults().filter(r => r.id !== id)))
  } catch { /* quota */ }
}

export function getMCATSeenIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(MCAT_QB_SEEN_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch { return new Set() }
}

export function markMCATSeen(ids: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const existing = getMCATSeenIds()
    ids.forEach(id => existing.add(id))
    localStorage.setItem(MCAT_QB_SEEN_KEY, JSON.stringify([...existing].slice(-500)))
  } catch { /* quota */ }
}
