export type Workspace = 'sat' | 'classroom'

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
  '/notes',
  '/billing',
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
 * Returns null for shared routes (/groups, /notes, /settings, /exams)
 * that can belong to either workspace.
 */
export function getDefinitiveWorkspace(pathname: string): Workspace | null {
  // Classroom-specific routes
  if (
    pathname.startsWith('/classroom') ||
    pathname.startsWith('/exams/create')
  ) {
    return 'classroom'
  }

  // SAT-specific routes
  if (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname.startsWith('/premade/sat') ||
    pathname.startsWith('/question-bank') ||
    pathname.startsWith('/sat-rw-academy') ||
    pathname.startsWith('/sat-math-academy') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/performance')
  ) {
    return 'sat'
  }

  // Shared routes: /groups, /notes, /settings, /exams, /choose-study-path, etc.
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
 *   (prevents "My Practice Exams" and "Create Practice Exam" being active together)
 * - /classroom/dashboard: active for all /classroom/* sub-routes
 * - /premade/sat, /sat-rw-academy, /sat-math-academy: prefix match
 */
export function isNavItemActive(href: string, pathname: string, exact?: boolean): boolean {
  if (exact) return pathname === href

  if (href === '/sat-rw-academy') return pathname.startsWith('/sat-rw-academy')
  if (href === '/sat-math-academy') return pathname.startsWith('/sat-math-academy')
  if (href === '/premade/sat') return pathname.startsWith('/premade/sat')
  if (href === '/classroom/dashboard') return pathname.startsWith('/classroom')
  if (href === '/exams') {
    return pathname === '/exams' ||
      (pathname.startsWith('/exams/') && !pathname.startsWith('/exams/create'))
  }

  return pathname === href || pathname.startsWith(href + '/')
}
