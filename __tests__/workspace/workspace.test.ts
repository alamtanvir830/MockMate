import { describe, it, expect } from 'vitest'
import {
  getDefinitiveWorkspace,
  resolveWorkspace,
} from '@/lib/workspace/workspace'

// ── getDefinitiveWorkspace ────────────────────────────────────────────────────

describe('getDefinitiveWorkspace — SAT routes', () => {
  it('test 1: /dashboard → sat', () => {
    expect(getDefinitiveWorkspace('/dashboard')).toBe('sat')
  })

  it('test 2: /premade/sat → sat', () => {
    expect(getDefinitiveWorkspace('/premade/sat')).toBe('sat')
  })

  it('test 3: /premade/sat/form-7 → sat', () => {
    expect(getDefinitiveWorkspace('/premade/sat/form-7')).toBe('sat')
  })

  it('test 4: /question-bank → sat', () => {
    expect(getDefinitiveWorkspace('/question-bank')).toBe('sat')
  })

  it('test 5: /sat-rw-academy → sat', () => {
    expect(getDefinitiveWorkspace('/sat-rw-academy')).toBe('sat')
  })

  it('test 6: /sat-math-academy → sat', () => {
    expect(getDefinitiveWorkspace('/sat-math-academy')).toBe('sat')
  })

  it('test 7: /sat-rw-academy/lesson/vocabulary → sat', () => {
    expect(getDefinitiveWorkspace('/sat-rw-academy/lesson/vocabulary')).toBe('sat')
  })

  it('test 8: /sat-math-academy/diagnostic → sat', () => {
    expect(getDefinitiveWorkspace('/sat-math-academy/diagnostic')).toBe('sat')
  })
})

describe('getDefinitiveWorkspace — Classroom routes', () => {
  it('test 9: /classroom/dashboard → classroom', () => {
    expect(getDefinitiveWorkspace('/classroom/dashboard')).toBe('classroom')
  })

  it('test 10: /exams/create → classroom', () => {
    expect(getDefinitiveWorkspace('/exams/create')).toBe('classroom')
  })

  it('test 11: /classroom/anything → classroom', () => {
    expect(getDefinitiveWorkspace('/classroom/anything')).toBe('classroom')
  })
})

describe('getDefinitiveWorkspace — shared routes return null', () => {
  it('test 12: /groups → null (shared)', () => {
    expect(getDefinitiveWorkspace('/groups')).toBeNull()
  })

  it('test 13: /notes → null (shared)', () => {
    expect(getDefinitiveWorkspace('/notes')).toBeNull()
  })

  it('test 14: /settings → null (shared)', () => {
    expect(getDefinitiveWorkspace('/settings')).toBeNull()
  })

  it('test 15: /exams → null (shared)', () => {
    expect(getDefinitiveWorkspace('/exams')).toBeNull()
  })

  it('test 16: /choose-study-path → null (chooser is workspace-neutral)', () => {
    expect(getDefinitiveWorkspace('/choose-study-path')).toBeNull()
  })
})

// ── resolveWorkspace — shared routes preserve context ────────────────────────

describe('resolveWorkspace — shared routes preserve stored workspace', () => {
  it('test 17: SAT → /groups preserves sat', () => {
    expect(resolveWorkspace('/groups', 'sat')).toBe('sat')
  })

  it('test 18: Classroom → /groups preserves classroom', () => {
    expect(resolveWorkspace('/groups', 'classroom')).toBe('classroom')
  })

  it('test 19: SAT → /notes preserves sat', () => {
    expect(resolveWorkspace('/notes', 'sat')).toBe('sat')
  })

  it('test 20: Classroom → /notes preserves classroom', () => {
    expect(resolveWorkspace('/notes', 'classroom')).toBe('classroom')
  })

  it('test 21: SAT → /settings preserves sat', () => {
    expect(resolveWorkspace('/settings', 'sat')).toBe('sat')
  })

  it('test 22: Classroom → /settings preserves classroom', () => {
    expect(resolveWorkspace('/settings', 'classroom')).toBe('classroom')
  })

  it('test 23: SAT → /exams preserves sat', () => {
    expect(resolveWorkspace('/exams', 'sat')).toBe('sat')
  })

  it('test 24: Classroom → /exams preserves classroom', () => {
    expect(resolveWorkspace('/exams', 'classroom')).toBe('classroom')
  })

  it('test 25: shared route with no stored context defaults to sat', () => {
    expect(resolveWorkspace('/groups', null)).toBe('sat')
    expect(resolveWorkspace('/notes', null)).toBe('sat')
    expect(resolveWorkspace('/settings', null)).toBe('sat')
    expect(resolveWorkspace('/exams', null)).toBe('sat')
  })
})

describe('resolveWorkspace — definitive routes always win', () => {
  it('test 26: /dashboard always sat regardless of stored context', () => {
    expect(resolveWorkspace('/dashboard', 'classroom')).toBe('sat')
    expect(resolveWorkspace('/dashboard', 'sat')).toBe('sat')
    expect(resolveWorkspace('/dashboard', null)).toBe('sat')
  })

  it('test 27: /classroom/dashboard always classroom regardless of stored context', () => {
    expect(resolveWorkspace('/classroom/dashboard', 'sat')).toBe('classroom')
    expect(resolveWorkspace('/classroom/dashboard', 'classroom')).toBe('classroom')
    expect(resolveWorkspace('/classroom/dashboard', null)).toBe('classroom')
  })
})

// ── Nav content checks (pure array inspection) ───────────────────────────────

import {
  SAT_NAV_HREFS,
  CLASSROOM_NAV_HREFS,
} from '@/lib/workspace/workspace'

describe('SAT nav items', () => {
  it('test 28: SAT Exam Forms href is /premade/sat (not /premade)', () => {
    expect(SAT_NAV_HREFS).toContain('/premade/sat')
    expect(SAT_NAV_HREFS).not.toContain('/premade')
  })

  it('test 29: SAT nav contains expected direct destinations', () => {
    expect(SAT_NAV_HREFS).toContain('/question-bank')
    expect(SAT_NAV_HREFS).toContain('/sat-rw-academy')
    expect(SAT_NAV_HREFS).toContain('/sat-math-academy')
    expect(SAT_NAV_HREFS).toContain('/dashboard')
  })
})

describe('Classroom nav items', () => {
  it('test 30: Classroom nav contains no SAT-specific items', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/premade/sat')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/premade')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/question-bank')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/sat-rw-academy')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/sat-math-academy')
    expect(CLASSROOM_NAV_HREFS).not.toContain('/billing')
  })
})
