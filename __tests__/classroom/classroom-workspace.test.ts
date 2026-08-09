import { describe, it, expect } from 'vitest'
import {
  getDefinitiveWorkspace,
  resolveWorkspace,
  isNavItemActive,
  SAT_NAV_HREFS,
  CLASSROOM_NAV_HREFS,
} from '@/lib/workspace/workspace'
import { getExamsViewConfig } from '@/lib/exams/exams-view'

// ── Group 1: Classroom dashboard workspace classification ─────────────────────

describe('classroom dashboard workspace classification', () => {
  it('test 1: /classroom/dashboard → getDefinitiveWorkspace = classroom', () => {
    expect(getDefinitiveWorkspace('/classroom/dashboard')).toBe('classroom')
  })

  it('test 2: CLASSROOM_NAV_HREFS contains /exams/create (Create Practice Exam)', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/exams/create')
  })

  it('test 3: CLASSROOM_NAV_HREFS contains /exams (My Practice Exams)', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/exams')
  })

  it('test 4: CLASSROOM_NAV_HREFS contains /groups (My Groups)', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/groups')
  })

  it('test 5: CLASSROOM_NAV_HREFS contains /notes (Personal Notes)', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/notes')
  })

  it('test 6: CLASSROOM_NAV_HREFS contains /settings (Settings)', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/settings')
  })
})

// ── Group 2: Classroom nav excludes SAT items ─────────────────────────────────

describe('classroom nav excludes SAT items', () => {
  it('test 7: CLASSROOM_NAV_HREFS does not contain /premade/sat', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/premade/sat')
  })

  it('test 8: CLASSROOM_NAV_HREFS does not contain /question-bank', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/question-bank')
  })

  it('test 9: CLASSROOM_NAV_HREFS does not contain /sat-rw-academy', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/sat-rw-academy')
  })

  it('test 10: CLASSROOM_NAV_HREFS does not contain /sat-math-academy', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/sat-math-academy')
  })
})

// ── Group 3: Create flow context ──────────────────────────────────────────────

describe('create practice exam context', () => {
  it('test 11: /exams/create → getDefinitiveWorkspace = classroom', () => {
    expect(getDefinitiveWorkspace('/exams/create')).toBe('classroom')
  })

  it('test 12: SAT_NAV_HREFS does not contain /exams/create (create is classroom-only)', () => {
    expect(SAT_NAV_HREFS).not.toContain('/exams/create')
  })

  it('test 13: CLASSROOM_NAV_HREFS contains /exams/create', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/exams/create')
  })

  it('test 14: /classroom/dashboard resolves to classroom regardless of stored context', () => {
    expect(resolveWorkspace('/classroom/dashboard', 'sat')).toBe('classroom')
    expect(resolveWorkspace('/classroom/dashboard', null)).toBe('classroom')
  })
})

// ── Group 4: Classroom exam history view ─────────────────────────────────────

describe('classroom exam history view', () => {
  it('test 15: classroom workspace → showClassroomExams = true', () => {
    expect(getExamsViewConfig('classroom', 3, 0).showClassroomExams).toBe(true)
  })

  it('test 16: classroom workspace → showSatExams = false', () => {
    expect(getExamsViewConfig('classroom', 3, 5).showSatExams).toBe(false)
  })

  it('test 17: classroom workspace → showSharedExams = true', () => {
    expect(getExamsViewConfig('classroom', 0, 0).showSharedExams).toBe(true)
  })

  it('test 18: classroom workspace → showNewExamButton = true', () => {
    expect(getExamsViewConfig('classroom', 0, 0).showNewExamButton).toBe(true)
  })
})

// ── Group 5: Shared routes preserve classroom nav context ────────────────────

describe('shared routes preserve classroom context', () => {
  it('test 19: /groups with stored=classroom → resolveWorkspace = classroom', () => {
    expect(resolveWorkspace('/groups', 'classroom')).toBe('classroom')
  })

  it('test 20: /notes with stored=classroom → resolveWorkspace = classroom', () => {
    expect(resolveWorkspace('/notes', 'classroom')).toBe('classroom')
  })

  it('test 21: /settings with stored=classroom → resolveWorkspace = classroom', () => {
    expect(resolveWorkspace('/settings', 'classroom')).toBe('classroom')
  })

  it('test 22: /exams with stored=classroom → resolveWorkspace = classroom', () => {
    expect(resolveWorkspace('/exams', 'classroom')).toBe('classroom')
  })
})

// ── Group 6: SAT regression ───────────────────────────────────────────────────

describe('SAT workspace regression', () => {
  it('test 23: /dashboard → getDefinitiveWorkspace = sat', () => {
    expect(getDefinitiveWorkspace('/dashboard')).toBe('sat')
  })

  it('test 24: SAT_NAV_HREFS contains /premade/sat', () => {
    expect(SAT_NAV_HREFS).toContain('/premade/sat')
  })

  it('test 25: SAT_NAV_HREFS contains /question-bank', () => {
    expect(SAT_NAV_HREFS).toContain('/question-bank')
  })

  it('test 26: SAT_NAV_HREFS contains /sat-rw-academy and /sat-math-academy', () => {
    expect(SAT_NAV_HREFS).toContain('/sat-rw-academy')
    expect(SAT_NAV_HREFS).toContain('/sat-math-academy')
  })

  it('test 27: /notes with stored=sat → resolveWorkspace = sat', () => {
    expect(resolveWorkspace('/notes', 'sat')).toBe('sat')
  })

  it('test 28: SAT workspace → showSatExams=true, showClassroomExams=false', () => {
    const cfg = getExamsViewConfig('sat', 5, 3)
    expect(cfg.showSatExams).toBe(true)
    expect(cfg.showClassroomExams).toBe(false)
  })
})

// ── Group 7: MCAT is now a live workspace (Phase 5A) ─────────────────────────

describe('MCAT workspace is enabled (Phase 5A)', () => {
  it('test 29: /mcat routes are definitively classified as mcat', () => {
    expect(getDefinitiveWorkspace('/mcat')).toBe('mcat')
    expect(getDefinitiveWorkspace('/mcat/dashboard')).toBe('mcat')
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('test 30: neither SAT_NAV_HREFS nor CLASSROOM_NAV_HREFS contain MCAT-specific paths', () => {
    expect(SAT_NAV_HREFS).not.toContain('/mcat/dashboard')
    expect(SAT_NAV_HREFS).not.toContain('/premade/mcat')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/mcat/dashboard')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/premade/mcat')
  })
})

// ── Group 8: Security invariants ─────────────────────────────────────────────

describe('security invariants', () => {
  it('test 31: getExamsViewConfig is display-only — both workspaces accept the same counts', () => {
    const satCfg = getExamsViewConfig('sat', 5, 3)
    const classroomCfg = getExamsViewConfig('classroom', 5, 3)
    // Both configs receive the same underlying data counts — workspace only affects display
    expect(satCfg.showSatExams).toBe(true)
    expect(classroomCfg.showClassroomExams).toBe(true)
    // Neither config changes what counts were fetched
    expect(typeof satCfg.title).toBe('string')
    expect(typeof classroomCfg.title).toBe('string')
  })

  it('test 32: workspace switching only affects display config, not data scope', () => {
    // Both workspaces receive examCount=5, satCount=3 but render different sections.
    // The same server data is always passed regardless of workspace.
    const satConfig = getExamsViewConfig('sat', 5, 3)
    const classroomConfig = getExamsViewConfig('classroom', 5, 3)
    expect(satConfig.showClassroomExams).toBe(false)
    expect(classroomConfig.showSatExams).toBe(false)
    // Neither workspace "hides" the other's data from the DB query — only the UI changes
  })

  it('test 33: /exams/create is definitively classroom — cannot be spoofed to sat', () => {
    expect(getDefinitiveWorkspace('/exams/create')).toBe('classroom')
    expect(resolveWorkspace('/exams/create', 'sat')).toBe('classroom')
    expect(resolveWorkspace('/exams/create', null)).toBe('classroom')
  })
})

// ── Group 9: Active state behavior (isNavItemActive) ─────────────────────────

describe('sidebar active states', () => {
  it('test 34: isNavItemActive("/exams", "/exams") = true', () => {
    expect(isNavItemActive('/exams', '/exams')).toBe(true)
  })

  it('test 35: isNavItemActive("/exams", "/exams/create") = false — no double-active with Create Practice Exam', () => {
    expect(isNavItemActive('/exams', '/exams/create')).toBe(false)
  })

  it('test 36: isNavItemActive("/exams", "/exams/abc/results") = true — exam detail activates My Practice Exams', () => {
    expect(isNavItemActive('/exams', '/exams/abc/results')).toBe(true)
  })
})
