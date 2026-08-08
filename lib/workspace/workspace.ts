export type Workspace = 'sat' | 'mcat' | 'classroom'

export const WORKSPACE_STORAGE_KEY = 'mockmate-workspace'

// Canonical href lists — consumed by tests and by the nav item arrays in sidebar/mobile-header
export const SAT_NAV_HREFS = [
  '/dashboard',
  '/premade/sat',
  '/sat-rw-academy',
  '/sat-math-academy',
  '/question-bank',
  '/exams',
  '/performance',
  '/groups',
  '/notes',
  '/billing',
  '/settings',
] as const

export const MCAT_NAV_HREFS = [
  '/mcat/dashboard',
  '/premade/mcat',
  '/question-bank/mcat',
  '/exams',
  '/groups',
  '/notes',
  '/settings',
] as const

export const CLASSROOM_NAV_HREFS = [
  '/classroom/dashboard',
  '/exams/create',
  '/exams',
  '/groups',
  '/notes',
  '/settings',
] as const

/**
 * Routes that definitively establish workspace from the URL alone.
 * Returns null for shared routes (/groups, /notes, /settings, /exams,
 * /question-bank/history) that can belong to any workspace.
 */
export function getDefinitiveWorkspace(pathname: string): Workspace | null {
  // Classroom-specific routes
  if (
    pathname.startsWith('/classroom') ||
    pathname.startsWith('/exams/create')
  ) {
    return 'classroom'
  }

  // MCAT-specific routes — checked before /question-bank SAT check
  if (
    pathname.startsWith('/mcat') ||
    pathname.startsWith('/premade/mcat') ||
    pathname.startsWith('/question-bank/mcat')
  ) {
    return 'mcat'
  }

  // SAT-specific routes
  if (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname.startsWith('/premade/sat') ||
    (pathname.startsWith('/question-bank') && !pathname.startsWith('/question-bank/history')) ||
    pathname.startsWith('/sat-rw-academy') ||
    pathname.startsWith('/sat-math-academy') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/performance')
  ) {
    return 'sat'
  }

  // Shared routes: /groups, /notes, /settings, /exams, /question-bank/history, /choose-study-path
  return null
}

/**
 * Resolves the active workspace from the current pathname and any previously
 * stored context. For definitive routes the URL wins. For shared routes the
 * stored context is preserved; when nothing is stored 'sat' is the safe default.
 */
export function resolveWorkspace(
  pathname: string,
  stored: Workspace | null,
): Workspace {
  const definitive = getDefinitiveWorkspace(pathname)
  if (definitive !== null) return definitive
  return stored ?? 'sat'
}

/**
 * Returns whether a nav item with the given href should be shown as active
 * for the current pathname. Extracted from sidebar/mobile-header so the
 * logic is testable and kept in sync.
 *
 * Key special cases:
 * - /exams: active on /exams and /exams/<id>/... but NOT /exams/create*
 * - /classroom/dashboard: active for all /classroom/* sub-routes
 * - /mcat/dashboard: active for all /mcat/* sub-routes
 * - /question-bank (SAT): active for /question-bank but NOT /question-bank/mcat
 * - /question-bank/mcat: active for /question-bank/mcat and sub-routes
 */
export function isNavItemActive(href: string, pathname: string, exact?: boolean): boolean {
  if (exact) return pathname === href

  if (href === '/sat-rw-academy') return pathname.startsWith('/sat-rw-academy')
  if (href === '/sat-math-academy') return pathname.startsWith('/sat-math-academy')
  if (href === '/premade/sat') return pathname.startsWith('/premade/sat')
  if (href === '/premade/mcat') return pathname.startsWith('/premade/mcat')
  if (href === '/classroom/dashboard') return pathname.startsWith('/classroom')
  if (href === '/mcat/dashboard') return pathname.startsWith('/mcat')
  if (href === '/question-bank/mcat') return pathname.startsWith('/question-bank/mcat')
  if (href === '/question-bank') {
    return pathname === '/question-bank' ||
      (pathname.startsWith('/question-bank/') && !pathname.startsWith('/question-bank/mcat'))
  }
  if (href === '/exams') {
    return pathname === '/exams' ||
      (pathname.startsWith('/exams/') && !pathname.startsWith('/exams/create'))
  }

  return pathname === href || pathname.startsWith(href + '/')
}
