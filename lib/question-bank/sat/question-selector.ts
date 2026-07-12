import type { QBQuestion, QBPracticeSetConfig, QBDomain, QBDifficulty, DomainAccuracy } from '../types'

// Shuffle an array deterministically (Fisher-Yates)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function selectQuestions(
  allQuestions: QBQuestion[],
  config: QBPracticeSetConfig,
  seenIds: Set<string> = new Set(),
): QBQuestion[] {
  let pool = allQuestions

  if (config.section) {
    pool = pool.filter(q => q.section === config.section)
  }

  if (config.domains?.length) {
    pool = pool.filter(q => config.domains!.includes(q.domain as QBDomain))
  }

  if (config.skills?.length) {
    pool = pool.filter(q => config.skills!.includes(q.skill))
  }

  if (config.difficulties?.length) {
    pool = pool.filter(q => config.difficulties!.includes(q.difficulty))
  }

  // Prefer unseen questions
  const unseen = pool.filter(q => !seenIds.has(q.id))
  const seen = pool.filter(q => seenIds.has(q.id))

  const shuffled = [...shuffle(unseen), ...shuffle(seen)]
  return shuffled.slice(0, config.count)
}

// Build a personalized set config from domain accuracy scores
export function buildPersonalizedConfig(
  accuracies: DomainAccuracy[],
  totalQuestions = 20,
): QBPracticeSetConfig {
  const domains: QBDomain[] = []
  const difficulties: QBDifficulty[] = []

  // Sort weakest first
  const sorted = [...accuracies].sort((a, b) => a.accuracy - b.accuracy)

  let questionsAllocated = 0

  for (const { domain, accuracy } of sorted) {
    let allocation = 0
    if (accuracy < 0.50) allocation = 8
    else if (accuracy < 0.65) allocation = 6
    else if (accuracy < 0.75) allocation = 4
    else if (accuracy < 0.85) allocation = 2
    else allocation = 0

    if (allocation > 0 && questionsAllocated < totalQuestions) {
      domains.push(domain as QBDomain)
      questionsAllocated += allocation
    }
  }

  // Pick difficulties based on overall performance
  const avgAccuracy = accuracies.reduce((sum, a) => sum + a.accuracy, 0) / (accuracies.length || 1)
  if (avgAccuracy < 0.55) {
    difficulties.push('easy', 'medium')
  } else if (avgAccuracy < 0.75) {
    difficulties.push('medium', 'hard')
  } else {
    difficulties.push('hard')
  }

  return {
    domains,
    difficulties,
    count: Math.min(totalQuestions, questionsAllocated || totalQuestions),
    mode: 'personalized',
  }
}

// Practice set persistence (localStorage)
const QB_RESULTS_KEY = 'mockmate_qb_results_v1'

export function saveQBResult(result: import('../types').QBPracticeSetResult): void {
  if (typeof window === 'undefined') return
  try {
    const all = loadAllQBResults()
    const filtered = all.filter(r => r.id !== result.id)
    localStorage.setItem(QB_RESULTS_KEY, JSON.stringify([result, ...filtered].slice(0, 50)))
  } catch { /* quota */ }
}

export function loadQBResult(id: string): import('../types').QBPracticeSetResult | null {
  if (typeof window === 'undefined') return null
  return loadAllQBResults().find(r => r.id === id) ?? null
}

export function loadAllQBResults(): import('../types').QBPracticeSetResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(QB_RESULTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function deleteQBResult(id: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(QB_RESULTS_KEY, JSON.stringify(loadAllQBResults().filter(r => r.id !== id)))
  } catch { /* quota */ }
}

// Track seen question IDs per user session
const QB_SEEN_KEY = 'mockmate_qb_seen_v1'

export function getSeenIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(QB_SEEN_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch { return new Set() }
}

export function markSeen(ids: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const existing = getSeenIds()
    ids.forEach(id => existing.add(id))
    // Keep last 500 seen IDs to avoid stale bloat
    const arr = [...existing].slice(-500)
    localStorage.setItem(QB_SEEN_KEY, JSON.stringify(arr))
  } catch { /* quota */ }
}
