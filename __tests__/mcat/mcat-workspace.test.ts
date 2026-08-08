import { describe, it, expect } from 'vitest'
import {
  getDefinitiveWorkspace,
  resolveWorkspace,
  isNavItemActive,
  MCAT_NAV_HREFS,
  SAT_NAV_HREFS,
  CLASSROOM_NAV_HREFS,
} from '@/lib/workspace/workspace'
import { getExamsViewConfig } from '@/lib/exams/exams-view'

// ── Group 1: MCAT definitive workspace classification ────────────────────────

describe('MCAT dashboard workspace classification', () => {
  it('test 1: /mcat/dashboard → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/mcat/dashboard')).toBe('mcat')
  })

  it('test 2: /mcat → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/mcat')).toBe('mcat')
  })

  it('test 3: /mcat/anything → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/mcat/some-sub-page')).toBe('mcat')
  })

  it('test 4: /premade/mcat → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/premade/mcat')).toBe('mcat')
  })

  it('test 5: /premade/mcat/form-1 → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/premade/mcat/form-1')).toBe('mcat')
  })

  it('test 6: /premade/mcat/form-1/results/abc → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/premade/mcat/form-1/results/abc-123')).toBe('mcat')
  })

  it('test 7: /question-bank/mcat → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('test 8: /question-bank/mcat/results → getDefinitiveWorkspace = mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat/results')).toBe('mcat')
  })
})

// ── Group 2: MCAT does not bleed into SAT or Classroom routes ────────────────

describe('MCAT classification does not affect SAT or Classroom routes', () => {
  it('test 9: /premade/sat → still sat (not mcat)', () => {
    expect(getDefinitiveWorkspace('/premade/sat')).toBe('sat')
  })

  it('test 10: /question-bank → still sat (not mcat)', () => {
    expect(getDefinitiveWorkspace('/question-bank')).toBe('sat')
  })

  it('test 11: /question-bank/sat → still sat (not mcat)', () => {
    expect(getDefinitiveWorkspace('/question-bank/sat')).toBe('sat')
  })

  it('test 12: /classroom/dashboard → still classroom (not mcat)', () => {
    expect(getDefinitiveWorkspace('/classroom/dashboard')).toBe('classroom')
  })

  it('test 13: /dashboard → still sat (not mcat)', () => {
    expect(getDefinitiveWorkspace('/dashboard')).toBe('sat')
  })
})

// ── Group 3: MCAT_NAV_HREFS content ──────────────────────────────────────────

describe('MCAT nav hrefs content', () => {
  it('test 14: MCAT_NAV_HREFS contains /mcat/dashboard', () => {
    expect(MCAT_NAV_HREFS).toContain('/mcat/dashboard')
  })

  it('test 15: MCAT_NAV_HREFS contains /premade/mcat', () => {
    expect(MCAT_NAV_HREFS).toContain('/premade/mcat')
  })

  it('test 16: MCAT_NAV_HREFS contains /question-bank/mcat', () => {
    expect(MCAT_NAV_HREFS).toContain('/question-bank/mcat')
  })

  it('test 17: MCAT_NAV_HREFS contains /exams (shared)', () => {
    expect(MCAT_NAV_HREFS).toContain('/exams')
  })

  it('test 18: MCAT_NAV_HREFS contains /notes (shared)', () => {
    expect(MCAT_NAV_HREFS).toContain('/notes')
  })

  it('test 19: MCAT_NAV_HREFS contains /settings (shared)', () => {
    expect(MCAT_NAV_HREFS).toContain('/settings')
  })

  it('test 20: MCAT_NAV_HREFS does not contain SAT-specific items', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/dashboard')
    expect(MCAT_NAV_HREFS).not.toContain('/premade/sat')
    expect(MCAT_NAV_HREFS).not.toContain('/sat-rw-academy')
    expect(MCAT_NAV_HREFS).not.toContain('/sat-math-academy')
    expect(MCAT_NAV_HREFS).not.toContain('/billing')
    expect(MCAT_NAV_HREFS).not.toContain('/performance')
  })

  it('test 21: MCAT_NAV_HREFS does not contain Classroom-specific items', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/classroom/dashboard')
    expect(MCAT_NAV_HREFS).not.toContain('/exams/create')
    expect(MCAT_NAV_HREFS).not.toContain('/groups')
  })
})

// ── Group 4: Shared routes preserve MCAT context ─────────────────────────────

describe('shared routes preserve MCAT workspace context', () => {
  it('test 22: /exams with stored=mcat → resolveWorkspace = mcat', () => {
    expect(resolveWorkspace('/exams', 'mcat')).toBe('mcat')
  })

  it('test 23: /notes with stored=mcat → resolveWorkspace = mcat', () => {
    expect(resolveWorkspace('/notes', 'mcat')).toBe('mcat')
  })

  it('test 24: /settings with stored=mcat → resolveWorkspace = mcat', () => {
    expect(resolveWorkspace('/settings', 'mcat')).toBe('mcat')
  })

  it('test 25: /question-bank/history with stored=mcat → resolveWorkspace = mcat', () => {
    expect(resolveWorkspace('/question-bank/history', 'mcat')).toBe('mcat')
  })

  it('test 26: /mcat/dashboard always resolves to mcat regardless of stored context', () => {
    expect(resolveWorkspace('/mcat/dashboard', 'sat')).toBe('mcat')
    expect(resolveWorkspace('/mcat/dashboard', 'classroom')).toBe('mcat')
    expect(resolveWorkspace('/mcat/dashboard', null)).toBe('mcat')
  })

  it('test 27: /premade/mcat always resolves to mcat regardless of stored context', () => {
    expect(resolveWorkspace('/premade/mcat', 'sat')).toBe('mcat')
    expect(resolveWorkspace('/premade/mcat', null)).toBe('mcat')
  })
})

// ── Group 5: isNavItemActive — MCAT nav items ────────────────────────────────

describe('isNavItemActive — MCAT nav items', () => {
  it('test 28: /mcat/dashboard active on /mcat/dashboard', () => {
    expect(isNavItemActive('/mcat/dashboard', '/mcat/dashboard', true)).toBe(true)
  })

  it('test 29: /mcat/dashboard active for /mcat/* sub-routes (exact=false)', () => {
    expect(isNavItemActive('/mcat/dashboard', '/mcat/dashboard')).toBe(true)
    expect(isNavItemActive('/mcat/dashboard', '/mcat/some-sub-page')).toBe(true)
  })

  it('test 30: /premade/mcat active for /premade/mcat and sub-routes', () => {
    expect(isNavItemActive('/premade/mcat', '/premade/mcat')).toBe(true)
    expect(isNavItemActive('/premade/mcat', '/premade/mcat/form-1')).toBe(true)
    expect(isNavItemActive('/premade/mcat', '/premade/mcat/form-1/results/abc')).toBe(true)
  })

  it('test 31: /premade/mcat NOT active on /premade/sat', () => {
    expect(isNavItemActive('/premade/mcat', '/premade/sat')).toBe(false)
  })

  it('test 32: /premade/sat NOT active on /premade/mcat', () => {
    expect(isNavItemActive('/premade/sat', '/premade/mcat')).toBe(false)
  })

  it('test 33: /question-bank/mcat active for /question-bank/mcat and sub-routes', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/mcat')).toBe(true)
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/mcat/results')).toBe(true)
  })

  it('test 34: /question-bank (SAT) NOT active on /question-bank/mcat', () => {
    expect(isNavItemActive('/question-bank', '/question-bank/mcat')).toBe(false)
  })

  it('test 35: /question-bank (SAT) active on /question-bank and /question-bank/sat', () => {
    expect(isNavItemActive('/question-bank', '/question-bank')).toBe(true)
    expect(isNavItemActive('/question-bank', '/question-bank/sat')).toBe(true)
    expect(isNavItemActive('/question-bank', '/question-bank/sat/results')).toBe(true)
  })
})

// ── Group 6: getExamsViewConfig — MCAT workspace ─────────────────────────────

describe('getExamsViewConfig — MCAT workspace', () => {
  it('test 36: MCAT workspace → title is "MCAT Exam History"', () => {
    const cfg = getExamsViewConfig('mcat', 0, 0, 0)
    expect(cfg.title).toBe('MCAT Exam History')
  })

  it('test 37: MCAT workspace → showMcatExams is true', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 3).showMcatExams).toBe(true)
  })

  it('test 38: MCAT workspace → showSatExams is false', () => {
    expect(getExamsViewConfig('mcat', 0, 5, 3).showSatExams).toBe(false)
  })

  it('test 39: MCAT workspace → showClassroomExams is false', () => {
    expect(getExamsViewConfig('mcat', 5, 0, 3).showClassroomExams).toBe(false)
  })

  it('test 40: MCAT workspace → showNewExamButton is false', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 0).showNewExamButton).toBe(false)
  })

  it('test 41: MCAT workspace → showSharedExams is false', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 0).showSharedExams).toBe(false)
  })

  it('test 42: MCAT, 0 attempts → "0 attempts total"', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 0).subtitle).toBe('0 attempts total')
  })

  it('test 43: MCAT, 1 attempt → "1 attempt total" (singular)', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 1).subtitle).toBe('1 attempt total')
  })

  it('test 44: MCAT, 3 attempts → "3 attempts total"', () => {
    expect(getExamsViewConfig('mcat', 0, 0, 3).subtitle).toBe('3 attempts total')
  })

  it('test 45: SAT workspace → showMcatExams is false', () => {
    expect(getExamsViewConfig('sat', 0, 5).showMcatExams).toBe(false)
  })

  it('test 46: Classroom workspace → showMcatExams is false', () => {
    expect(getExamsViewConfig('classroom', 5, 0).showMcatExams).toBe(false)
  })
})

// ── Group 7: Security invariants ─────────────────────────────────────────────

describe('MCAT security invariants', () => {
  it('test 47: MCAT workspace classification is from URL, not stored context — stored=sat does not prevent mcat classification', () => {
    expect(resolveWorkspace('/mcat/dashboard', 'sat')).toBe('mcat')
    expect(resolveWorkspace('/premade/mcat', 'sat')).toBe('mcat')
    expect(resolveWorkspace('/question-bank/mcat', 'sat')).toBe('mcat')
  })

  it('test 48: MCAT workspace is display-only — getExamsViewConfig receives same underlying counts regardless of workspace', () => {
    const mcatCfg = getExamsViewConfig('mcat', 5, 3, 2)
    const satCfg = getExamsViewConfig('sat', 5, 3, 2)
    const classroomCfg = getExamsViewConfig('classroom', 5, 3, 2)
    // Only display flags differ — none gating the data itself
    expect(typeof mcatCfg.title).toBe('string')
    expect(typeof satCfg.title).toBe('string')
    expect(typeof classroomCfg.title).toBe('string')
    expect(mcatCfg.showMcatExams).toBe(true)
    expect(satCfg.showMcatExams).toBe(false)
    expect(classroomCfg.showMcatExams).toBe(false)
  })
})
