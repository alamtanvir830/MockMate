import type { Workspace } from '@/lib/workspace/workspace'

export interface ExamsViewConfig {
  title: string
  subtitle: string
  showNewExamButton: boolean
  showClassroomExams: boolean
  showSharedExams: boolean
  showSatExams: boolean
}

/**
 * Returns the display configuration for the /exams page based on the active
 * workspace. Purely cosmetic — does NOT gate access to any data.
 */
export function getExamsViewConfig(
  workspace: Workspace,
  classroomExamCount: number,
  satAttemptCount: number,
): ExamsViewConfig {
  if (workspace === 'classroom') {
    return {
      title: 'My Practice Exams',
      subtitle: `${classroomExamCount} exam${classroomExamCount !== 1 ? 's' : ''} total`,
      showNewExamButton: true,
      showClassroomExams: true,
      showSharedExams: true,
      showSatExams: false,
    }
  }

  return {
    title: 'SAT Exam History',
    subtitle: `${satAttemptCount} attempt${satAttemptCount !== 1 ? 's' : ''} total`,
    showNewExamButton: false,
    showClassroomExams: false,
    showSharedExams: false,
    showSatExams: true,
  }
}
