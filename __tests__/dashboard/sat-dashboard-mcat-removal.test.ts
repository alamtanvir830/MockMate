import { describe, it, expect } from 'vitest'
import type { QBHistoryEntry, QBHistoryTest } from '@/lib/question-bank/history'
import { getDefinitiveWorkspace, resolveWorkspace } from '@/lib/workspace/workspace'
import { getExamsViewConfig } from '@/lib/exams/exams-view'

// ── Group 1: QB history entry type has test discriminator ────────────────────

describe('QBHistoryEntry test discriminator', () => {
  it('QBHistoryTest is SAT or MCAT', () => {
    const sat: QBHistoryTest = 'SAT'
    const mcat: QBHistoryTest = 'MCAT'
    expect(sat).toBe('SAT')
    expect(mcat).toBe('MCAT')
  })

  it('filtering entries by test=SAT excludes MCAT entries', () => {
    const mockEntries: QBHistoryEntry[] = [
      { id: 'qb-1', test: 'SAT', title: 'SAT R&W', subtitle: 'R&W', mode: 'Browse', totalQuestions: 10, correctCount: 8, accuracy: 80, completedAt: '2026-01-01T00:00:00Z', reviewUrl: '/question-bank/history/qb-1' },
      { id: 'mcat-qb-1', test: 'MCAT', title: 'MCAT Psych/Soc', subtitle: 'Psych/Soc', mode: 'Browse', totalQuestions: 10, correctCount: 7, accuracy: 70, completedAt: '2026-01-02T00:00:00Z', reviewUrl: '/question-bank/history/mcat-qb-1' },
      { id: 'qb-2', test: 'SAT', title: 'SAT Math', subtitle: 'Math', mode: 'Browse', totalQuestions: 15, correctCount: 12, accuracy: 80, completedAt: '2026-01-03T00:00:00Z', reviewUrl: '/question-bank/history/qb-2' },
      { id: 'mcat-qb-2', test: 'MCAT', title: 'MCAT Chem/Phys', subtitle: 'Chem/Phys', mode: 'Browse', totalQuestions: 10, correctCount: 6, accuracy: 60, completedAt: '2026-01-04T00:00:00Z', reviewUrl: '/question-bank/history/mcat-qb-2' },
    ]

    const satOnly = mockEntries.filter(e => e.test === 'SAT')
    expect(satOnly).toHaveLength(2)
    expect(satOnly.every(e => e.test === 'SAT')).toBe(true)
    expect(satOnly.some(e => e.test === 'MCAT')).toBe(false)
  })

  it('filtering entries by test=SAT preserves all SAT entries', () => {
    const mockEntries: QBHistoryEntry[] = [
      { id: 'qb-1', test: 'SAT', title: 'SAT R&W', subtitle: 'R&W', mode: 'Browse', totalQuestions: 10, correctCount: 8, accuracy: 80, completedAt: '2026-01-01T00:00:00Z', reviewUrl: '/question-bank/history/qb-1' },
      { id: 'mcat-qb-1', test: 'MCAT', title: 'MCAT Psych/Soc', subtitle: 'Psych/Soc', mode: 'Browse', totalQuestions: 10, correctCount: 7, accuracy: 70, completedAt: '2026-01-02T00:00:00Z', reviewUrl: '/question-bank/history/mcat-qb-1' },
    ]
    const satOnly = mockEntries.filter(e => e.test === 'SAT')
    expect(satOnly).toHaveLength(1)
    expect(satOnly[0].id).toBe('qb-1')
    expect(satOnly[0].title).toBe('SAT R&W')
  })

  it('MCAT entries are not deleted — original array is unchanged after filtering', () => {
    const mockEntries: QBHistoryEntry[] = [
      { id: 'qb-1', test: 'SAT', title: 'SAT R&W', subtitle: 'R&W', mode: 'Browse', totalQuestions: 10, correctCount: 8, accuracy: 80, completedAt: '2026-01-01T00:00:00Z', reviewUrl: '/question-bank/history/qb-1' },
      { id: 'mcat-qb-1', test: 'MCAT', title: 'MCAT Psych/Soc', subtitle: 'Psych/Soc', mode: 'Browse', totalQuestions: 10, correctCount: 7, accuracy: 70, completedAt: '2026-01-02T00:00:00Z', reviewUrl: '/question-bank/history/mcat-qb-1' },
    ]
    const satOnly = mockEntries.filter(e => e.test === 'SAT')
    // Original array untouched — display filtering only
    expect(mockEntries).toHaveLength(2)
    expect(mockEntries.find(e => e.id === 'mcat-qb-1')).toBeDefined()
    expect(satOnly).toHaveLength(1)
  })

  it('no-filter mode returns all entries (non-SAT contexts like MCAT QB can show mixed history)', () => {
    const mockEntries: QBHistoryEntry[] = [
      { id: 'qb-1', test: 'SAT', title: 'SAT R&W', subtitle: '', mode: 'Browse', totalQuestions: 10, correctCount: 8, accuracy: 80, completedAt: '2026-01-01T00:00:00Z', reviewUrl: '' },
      { id: 'mcat-qb-1', test: 'MCAT', title: 'MCAT Psych/Soc', subtitle: '', mode: 'Browse', totalQuestions: 10, correctCount: 7, accuracy: 70, completedAt: '2026-01-02T00:00:00Z', reviewUrl: '' },
    ]
    const noFilter = mockEntries.filter(() => true)
    expect(noFilter).toHaveLength(2)
  })
})

// ── Group 2: SAT dashboard workspace regression ───────────────────────────────

describe('SAT dashboard workspace regression', () => {
  it('/dashboard remains definitively SAT', () => {
    expect(getDefinitiveWorkspace('/dashboard')).toBe('sat')
  })

  it('/dashboard ignores stored=mcat', () => {
    expect(resolveWorkspace('/dashboard', 'mcat')).toBe('sat')
  })

  it('SAT workspace shows SAT exams, not MCAT', () => {
    const cfg = getExamsViewConfig('sat', 0, 3, 2)
    expect(cfg.showSatExams).toBe(true)
    expect(cfg.showMcatExams).toBe(false)
  })
})

// ── Group 3: MCAT workspace unchanged ────────────────────────────────────────

describe('MCAT workspace unchanged', () => {
  it('/mcat/dashboard remains definitively mcat', () => {
    expect(getDefinitiveWorkspace('/mcat/dashboard')).toBe('mcat')
  })

  it('/premade/mcat remains definitively mcat', () => {
    expect(getDefinitiveWorkspace('/premade/mcat')).toBe('mcat')
  })

  it('/question-bank/mcat remains definitively mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('MCAT workspace shows MCAT exams, not SAT', () => {
    const cfg = getExamsViewConfig('mcat', 0, 3, 2)
    expect(cfg.showMcatExams).toBe(true)
    expect(cfg.showSatExams).toBe(false)
  })
})
