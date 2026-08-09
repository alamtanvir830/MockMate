import { describe, it, expect } from 'vitest'
import { getExamsViewConfig } from '@/lib/exams/exams-view'

// ── SAT workspace — title and section visibility ──────────────────────────────

describe('getExamsViewConfig — SAT workspace: title and visibility', () => {
  it('test 1: SAT workspace → title is "SAT Exam History"', () => {
    const cfg = getExamsViewConfig('sat', 0, 0)
    expect(cfg.title).toBe('SAT Exam History')
  })

  it('test 2: SAT workspace → showSatExams is true', () => {
    const cfg = getExamsViewConfig('sat', 0, 0)
    expect(cfg.showSatExams).toBe(true)
  })

  it('test 3: SAT workspace → showClassroomExams is false', () => {
    const cfg = getExamsViewConfig('sat', 5, 3)
    expect(cfg.showClassroomExams).toBe(false)
  })

  it('test 4: SAT workspace → showSharedExams is false', () => {
    const cfg = getExamsViewConfig('sat', 5, 3)
    expect(cfg.showSharedExams).toBe(false)
  })

  it('test 5: SAT workspace → showNewExamButton is false', () => {
    const cfg = getExamsViewConfig('sat', 0, 0)
    expect(cfg.showNewExamButton).toBe(false)
  })
})

// ── SAT workspace — subtitle grammar ─────────────────────────────────────────

describe('getExamsViewConfig — SAT workspace: subtitle grammar', () => {
  it('test 6: SAT, 0 attempts → "0 attempts total"', () => {
    expect(getExamsViewConfig('sat', 0, 0).subtitle).toBe('0 attempts total')
  })

  it('test 7: SAT, 1 attempt → "1 attempt total" (singular, no "s")', () => {
    expect(getExamsViewConfig('sat', 0, 1).subtitle).toBe('1 attempt total')
  })

  it('test 8: SAT, 2 attempts → "2 attempts total"', () => {
    expect(getExamsViewConfig('sat', 0, 2).subtitle).toBe('2 attempts total')
  })

  it('test 9: SAT, 10 attempts → "10 attempts total"', () => {
    expect(getExamsViewConfig('sat', 0, 10).subtitle).toBe('10 attempts total')
  })

  it('test 10: SAT: classroomExamCount is ignored — classroomCount=99, satCount=3 → "3 attempts total"', () => {
    expect(getExamsViewConfig('sat', 99, 3).subtitle).toBe('3 attempts total')
  })
})

// ── Classroom workspace — title and section visibility ────────────────────────

describe('getExamsViewConfig — Classroom workspace: title and visibility', () => {
  it('test 11: Classroom workspace → title is "My Practice Exams"', () => {
    const cfg = getExamsViewConfig('classroom', 0, 0)
    expect(cfg.title).toBe('My Practice Exams')
  })

  it('test 12: Classroom workspace → showSatExams is false', () => {
    const cfg = getExamsViewConfig('classroom', 5, 3)
    expect(cfg.showSatExams).toBe(false)
  })

  it('test 13: Classroom workspace → showClassroomExams is true', () => {
    const cfg = getExamsViewConfig('classroom', 0, 0)
    expect(cfg.showClassroomExams).toBe(true)
  })

  it('test 14: Classroom workspace → showSharedExams is true', () => {
    const cfg = getExamsViewConfig('classroom', 0, 0)
    expect(cfg.showSharedExams).toBe(true)
  })

  it('test 15: Classroom workspace → showNewExamButton is true', () => {
    const cfg = getExamsViewConfig('classroom', 0, 0)
    expect(cfg.showNewExamButton).toBe(true)
  })
})

// ── Classroom workspace — subtitle grammar ────────────────────────────────────

describe('getExamsViewConfig — Classroom workspace: subtitle grammar', () => {
  it('test 16: Classroom, 0 exams → "0 exams total"', () => {
    expect(getExamsViewConfig('classroom', 0, 0).subtitle).toBe('0 exams total')
  })

  it('test 17: Classroom, 1 exam → "1 exam total" (singular, no "s")', () => {
    expect(getExamsViewConfig('classroom', 1, 0).subtitle).toBe('1 exam total')
  })

  it('test 18: Classroom, 2 exams → "2 exams total"', () => {
    expect(getExamsViewConfig('classroom', 2, 0).subtitle).toBe('2 exams total')
  })

  it('test 19: Classroom, 10 exams → "10 exams total"', () => {
    expect(getExamsViewConfig('classroom', 10, 0).subtitle).toBe('10 exams total')
  })

  it('test 20: Classroom: satAttemptCount is ignored — classroomCount=5, satCount=99 → "5 exams total"', () => {
    expect(getExamsViewConfig('classroom', 5, 99).subtitle).toBe('5 exams total')
  })
})

// ── Mutual exclusion invariants ───────────────────────────────────────────────

describe('getExamsViewConfig — mutual exclusion invariants', () => {
  it('test 21: SAT workspace: showSatExams and showClassroomExams are never both true', () => {
    const cfg = getExamsViewConfig('sat', 5, 5)
    expect(cfg.showSatExams && cfg.showClassroomExams).toBe(false)
  })

  it('test 22: Classroom workspace: showSatExams and showClassroomExams are never both true', () => {
    const cfg = getExamsViewConfig('classroom', 5, 5)
    expect(cfg.showSatExams && cfg.showClassroomExams).toBe(false)
  })

  it('test 23: SAT workspace: exactly one of showSatExams / showClassroomExams is true', () => {
    const cfg = getExamsViewConfig('sat', 0, 0)
    expect(cfg.showSatExams !== cfg.showClassroomExams).toBe(true)
  })

  it('test 24: Classroom workspace: exactly one of showSatExams / showClassroomExams is true', () => {
    const cfg = getExamsViewConfig('classroom', 0, 0)
    expect(cfg.showSatExams !== cfg.showClassroomExams).toBe(true)
  })

  it('test 25: showSharedExams is only true for classroom workspace', () => {
    expect(getExamsViewConfig('sat', 0, 0).showSharedExams).toBe(false)
    expect(getExamsViewConfig('classroom', 0, 0).showSharedExams).toBe(true)
  })

  it('test 26: showNewExamButton is only true for classroom workspace', () => {
    expect(getExamsViewConfig('sat', 10, 10).showNewExamButton).toBe(false)
    expect(getExamsViewConfig('classroom', 10, 10).showNewExamButton).toBe(true)
  })
})

// ── Subtitle grammar at scale ─────────────────────────────────────────────────

describe('getExamsViewConfig — subtitle grammar at scale', () => {
  it('test 27: SAT, 100 attempts → "100 attempts total"', () => {
    expect(getExamsViewConfig('sat', 0, 100).subtitle).toBe('100 attempts total')
  })

  it('test 28: SAT, 1000 attempts → "1000 attempts total"', () => {
    expect(getExamsViewConfig('sat', 0, 1000).subtitle).toBe('1000 attempts total')
  })

  it('test 29: Classroom, 100 exams → "100 exams total"', () => {
    expect(getExamsViewConfig('classroom', 100, 0).subtitle).toBe('100 exams total')
  })

  it('test 30: Classroom, 1000 exams → "1000 exams total"', () => {
    expect(getExamsViewConfig('classroom', 1000, 0).subtitle).toBe('1000 exams total')
  })
})

// ── Subtitle keyword isolation ────────────────────────────────────────────────

describe('getExamsViewConfig — subtitle keyword isolation', () => {
  it('test 31: SAT subtitle mentions "attempt" not "exam"', () => {
    const { subtitle } = getExamsViewConfig('sat', 0, 3)
    expect(subtitle).toContain('attempt')
    expect(subtitle).not.toContain('exam')
  })

  it('test 32: Classroom subtitle mentions "exam" not "attempt"', () => {
    const { subtitle } = getExamsViewConfig('classroom', 3, 0)
    expect(subtitle).toContain('exam')
    expect(subtitle).not.toContain('attempt')
  })

  it('test 33: SAT subtitle always ends with "total"', () => {
    expect(getExamsViewConfig('sat', 0, 0).subtitle).toMatch(/total$/)
    expect(getExamsViewConfig('sat', 0, 5).subtitle).toMatch(/total$/)
  })

  it('test 34: Classroom subtitle always ends with "total"', () => {
    expect(getExamsViewConfig('classroom', 0, 0).subtitle).toMatch(/total$/)
    expect(getExamsViewConfig('classroom', 5, 0).subtitle).toMatch(/total$/)
  })
})
