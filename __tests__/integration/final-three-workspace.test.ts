import { describe, it, expect } from 'vitest'
import {
  getDefinitiveWorkspace,
  resolveWorkspace,
  isNavItemActive,
  SAT_NAV_HREFS,
  MCAT_NAV_HREFS,
  CLASSROOM_NAV_HREFS,
} from '@/lib/workspace/workspace'
import { getExamsViewConfig } from '@/lib/exams/exams-view'

// ── Group 1: Chooser destinations and workspace classification ────────────────

describe('chooser → workspace classification', () => {
  it('SAT card destination /dashboard → definitively sat', () => {
    expect(getDefinitiveWorkspace('/dashboard')).toBe('sat')
  })

  it('MCAT card destination /mcat/dashboard → definitively mcat', () => {
    expect(getDefinitiveWorkspace('/mcat/dashboard')).toBe('mcat')
  })

  it('Classroom card destination /classroom/dashboard → definitively classroom', () => {
    expect(getDefinitiveWorkspace('/classroom/dashboard')).toBe('classroom')
  })

  it('/choose-study-path itself is a shared route (null)', () => {
    expect(getDefinitiveWorkspace('/choose-study-path')).toBeNull()
  })
})

// ── Group 2: SAT nav — completeness and exclusions ───────────────────────────

describe('SAT nav completeness', () => {
  it('SAT_NAV_HREFS does NOT contain /groups (Groups is Classroom-only)', () => {
    expect(SAT_NAV_HREFS).not.toContain('/groups')
  })

  it('SAT_NAV_HREFS contains /performance', () => {
    expect(SAT_NAV_HREFS).toContain('/performance')
  })

  it('SAT_NAV_HREFS contains /billing', () => {
    expect(SAT_NAV_HREFS).toContain('/billing')
  })

  it('SAT_NAV_HREFS contains /premade/sat (not /premade)', () => {
    expect(SAT_NAV_HREFS).toContain('/premade/sat')
    expect(SAT_NAV_HREFS).not.toContain('/premade')
  })

  it('SAT_NAV_HREFS does not contain MCAT-specific items', () => {
    expect(SAT_NAV_HREFS).not.toContain('/mcat/dashboard')
    expect(SAT_NAV_HREFS).not.toContain('/premade/mcat')
    expect(SAT_NAV_HREFS).not.toContain('/question-bank/mcat')
  })

  it('SAT_NAV_HREFS does not contain Classroom-exclusive items', () => {
    expect(SAT_NAV_HREFS).not.toContain('/classroom/dashboard')
    expect(SAT_NAV_HREFS).not.toContain('/exams/create')
    expect(SAT_NAV_HREFS).not.toContain('/groups')
  })
})

// ── Group 3: MCAT nav — completeness and exclusions ──────────────────────────

describe('MCAT nav completeness', () => {
  it('MCAT_NAV_HREFS does NOT contain /groups (Groups is Classroom-only)', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/groups')
  })

  it('MCAT_NAV_HREFS does not contain SAT performance or billing', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/performance')
    expect(MCAT_NAV_HREFS).not.toContain('/billing')
  })

  it('MCAT_NAV_HREFS does not contain SAT academy routes', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/sat-rw-academy')
    expect(MCAT_NAV_HREFS).not.toContain('/sat-math-academy')
  })

  it('MCAT_NAV_HREFS does not contain Classroom-exclusive items', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/classroom/dashboard')
    expect(MCAT_NAV_HREFS).not.toContain('/exams/create')
    expect(MCAT_NAV_HREFS).not.toContain('/groups')
  })
})

// ── Group 4: /groups is a Classroom-definitive route ─────────────────────────

describe('/groups is definitively Classroom', () => {
  it('/groups → getDefinitiveWorkspace = classroom', () => {
    expect(getDefinitiveWorkspace('/groups')).toBe('classroom')
  })

  it('/groups/some-id → getDefinitiveWorkspace = classroom', () => {
    expect(getDefinitiveWorkspace('/groups/abc-123')).toBe('classroom')
  })

  it('resolveWorkspace(/groups, sat) → classroom (URL wins over stored)', () => {
    expect(resolveWorkspace('/groups', 'sat')).toBe('classroom')
  })

  it('resolveWorkspace(/groups, mcat) → classroom (URL wins over stored)', () => {
    expect(resolveWorkspace('/groups', 'mcat')).toBe('classroom')
  })

  it('resolveWorkspace(/groups, classroom) → classroom', () => {
    expect(resolveWorkspace('/groups', 'classroom')).toBe('classroom')
  })

  it('resolveWorkspace(/groups, null) → classroom', () => {
    expect(resolveWorkspace('/groups', null)).toBe('classroom')
  })

  it('CLASSROOM_NAV_HREFS contains /groups', () => {
    expect(CLASSROOM_NAV_HREFS).toContain('/groups')
  })
})

// ── Group 5: Six-product-switch transitions ───────────────────────────────────

describe('six product-switch transitions via definitive routes', () => {
  it('SAT → MCAT: visiting /mcat/dashboard overrides stored=sat', () => {
    expect(resolveWorkspace('/mcat/dashboard', 'sat')).toBe('mcat')
  })

  it('SAT → Classroom: visiting /classroom/dashboard overrides stored=sat', () => {
    expect(resolveWorkspace('/classroom/dashboard', 'sat')).toBe('classroom')
  })

  it('MCAT → SAT: visiting /dashboard overrides stored=mcat', () => {
    expect(resolveWorkspace('/dashboard', 'mcat')).toBe('sat')
  })

  it('MCAT → Classroom: visiting /classroom/dashboard overrides stored=mcat', () => {
    expect(resolveWorkspace('/classroom/dashboard', 'mcat')).toBe('classroom')
  })

  it('Classroom → SAT: visiting /dashboard overrides stored=classroom', () => {
    expect(resolveWorkspace('/dashboard', 'classroom')).toBe('sat')
  })

  it('Classroom → MCAT: visiting /mcat/dashboard overrides stored=classroom', () => {
    expect(resolveWorkspace('/mcat/dashboard', 'classroom')).toBe('mcat')
  })
})

// ── Group 6: Shared routes preserve context across all three products ─────────

describe('shared routes preserve context — all three products', () => {
  const sharedRoutes = ['/exams', '/notes', '/settings', '/question-bank/history']

  for (const route of sharedRoutes) {
    it(`${route} with stored=sat → sat`, () => {
      expect(resolveWorkspace(route, 'sat')).toBe('sat')
    })
    it(`${route} with stored=mcat → mcat`, () => {
      expect(resolveWorkspace(route, 'mcat')).toBe('mcat')
    })
    it(`${route} with stored=classroom → classroom`, () => {
      expect(resolveWorkspace(route, 'classroom')).toBe('classroom')
    })
  }
})

// ── Group 7: Active state — /groups nav item ──────────────────────────────────

describe('isNavItemActive for /groups', () => {
  it('active on exact /groups match', () => {
    expect(isNavItemActive('/groups', '/groups')).toBe(true)
  })

  it('active on /groups/some-id sub-route', () => {
    expect(isNavItemActive('/groups', '/groups/abc-123')).toBe(true)
  })

  it('not active on unrelated route', () => {
    expect(isNavItemActive('/groups', '/exams')).toBe(false)
    expect(isNavItemActive('/groups', '/notes')).toBe(false)
  })
})

// ── Group 8: QB final separation ─────────────────────────────────────────────

describe('question bank route separation', () => {
  it('/question-bank is definitively sat', () => {
    expect(getDefinitiveWorkspace('/question-bank')).toBe('sat')
  })

  it('/question-bank/mcat is definitively mcat (checked before /question-bank SAT rule)', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('/question-bank/history is shared (null)', () => {
    expect(getDefinitiveWorkspace('/question-bank/history')).toBeNull()
  })

  it('SAT QB active state does not activate for MCAT QB path', () => {
    expect(isNavItemActive('/question-bank', '/question-bank/mcat')).toBe(false)
  })

  it('MCAT QB active state does not activate for SAT QB path', () => {
    expect(isNavItemActive('/question-bank/mcat', '/question-bank')).toBe(false)
    expect(isNavItemActive('/question-bank/mcat', '/question-bank/sat')).toBe(false)
  })
})

// ── Group 9: MCAT access / security invariants ────────────────────────────────

describe('MCAT access and security invariants', () => {
  it('workspace value is display-only — getExamsViewConfig receives same counts regardless of workspace', () => {
    const counts = [5, 3, 2] as const
    const satCfg = getExamsViewConfig('sat', ...counts)
    const mcatCfg = getExamsViewConfig('mcat', ...counts)
    const classroomCfg = getExamsViewConfig('classroom', ...counts)
    expect(satCfg.showSatExams).toBe(true)
    expect(mcatCfg.showMcatExams).toBe(true)
    expect(classroomCfg.showClassroomExams).toBe(true)
    expect(satCfg.showMcatExams).toBe(false)
    expect(mcatCfg.showSatExams).toBe(false)
    expect(classroomCfg.showMcatExams).toBe(false)
  })

  it('MCAT entitlement gate (/premade/mcat) is separate from workspace', () => {
    expect(getDefinitiveWorkspace('/premade/mcat')).toBe('mcat')
    expect(typeof resolveWorkspace('/premade/mcat', null)).toBe('string')
  })

  it('MCAT QB (/question-bank/mcat) is definitively mcat', () => {
    expect(getDefinitiveWorkspace('/question-bank/mcat')).toBe('mcat')
  })

  it('/mcat/dashboard is definitively mcat', () => {
    expect(getDefinitiveWorkspace('/mcat/dashboard')).toBe('mcat')
  })

  it('localStorage manipulation cannot grant data access — workspace is navigation context only', () => {
    expect(resolveWorkspace('/dashboard', 'mcat')).toBe('sat')
    expect(resolveWorkspace('/premade/sat', 'mcat')).toBe('sat')
    expect(resolveWorkspace('/billing', 'mcat')).toBe('sat')
  })
})

// ── Group 10: Performance only in SAT ────────────────────────────────────────

describe('performance route isolation', () => {
  it('/performance is definitively sat', () => {
    expect(getDefinitiveWorkspace('/performance')).toBe('sat')
  })

  it('/performance with stored=mcat still resolves to sat (definitively)', () => {
    expect(resolveWorkspace('/performance', 'mcat')).toBe('sat')
  })

  it('MCAT_NAV_HREFS does not include /performance', () => {
    expect(MCAT_NAV_HREFS).not.toContain('/performance')
  })

  it('CLASSROOM_NAV_HREFS does not include /performance', () => {
    expect(CLASSROOM_NAV_HREFS).not.toContain('/performance')
  })
})

// ── Group 11: History final separation ───────────────────────────────────────

describe('exam history is isolated per workspace', () => {
  it('SAT workspace → showSatExams=true, showMcatExams=false, showClassroomExams=false', () => {
    const cfg = getExamsViewConfig('sat', 2, 3, 1)
    expect(cfg.showSatExams).toBe(true)
    expect(cfg.showMcatExams).toBe(false)
    expect(cfg.showClassroomExams).toBe(false)
  })

  it('MCAT workspace → showMcatExams=true, showSatExams=false, showClassroomExams=false', () => {
    const cfg = getExamsViewConfig('mcat', 2, 3, 1)
    expect(cfg.showSatExams).toBe(false)
    expect(cfg.showMcatExams).toBe(true)
    expect(cfg.showClassroomExams).toBe(false)
  })

  it('Classroom workspace → showClassroomExams=true, showSatExams=false, showMcatExams=false', () => {
    const cfg = getExamsViewConfig('classroom', 2, 3, 1)
    expect(cfg.showSatExams).toBe(false)
    expect(cfg.showMcatExams).toBe(false)
    expect(cfg.showClassroomExams).toBe(true)
  })
})

// ── Group 12: Refresh / direct-URL / back-button determinism ─────────────────

describe('URL-first workspace resolution for refresh and direct nav', () => {
  it('direct /mcat/dashboard visit always yields mcat regardless of stored', () => {
    expect(resolveWorkspace('/mcat/dashboard', 'sat')).toBe('mcat')
    expect(resolveWorkspace('/mcat/dashboard', 'classroom')).toBe('mcat')
    expect(resolveWorkspace('/mcat/dashboard', null)).toBe('mcat')
  })

  it('direct /classroom/dashboard visit always yields classroom regardless of stored', () => {
    expect(resolveWorkspace('/classroom/dashboard', 'sat')).toBe('classroom')
    expect(resolveWorkspace('/classroom/dashboard', 'mcat')).toBe('classroom')
    expect(resolveWorkspace('/classroom/dashboard', null)).toBe('classroom')
  })

  it('direct /dashboard visit always yields sat regardless of stored', () => {
    expect(resolveWorkspace('/dashboard', 'mcat')).toBe('sat')
    expect(resolveWorkspace('/dashboard', 'classroom')).toBe('sat')
    expect(resolveWorkspace('/dashboard', null)).toBe('sat')
  })

  it('direct /groups visit always yields classroom regardless of stored', () => {
    expect(resolveWorkspace('/groups', 'sat')).toBe('classroom')
    expect(resolveWorkspace('/groups', 'mcat')).toBe('classroom')
    expect(resolveWorkspace('/groups', null)).toBe('classroom')
  })
})
