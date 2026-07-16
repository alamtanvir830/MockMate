export type VideoProductionStatus =
  | 'script_draft'
  | 'script_reviewed'
  | 'narration_ready'
  | 'rendered'
  | 'accuracy_review'
  | 'published'
  | 'archived'

export interface LessonVideoMeta {
  id: string
  videoKey: string
  lessonSlug: string
  skillSlug: string
  subskillSlug: string | null
  title: string
  description: string | null
  transcript: string
  durationSeconds: number | null
  scriptVersion: number
  videoVersion: number
  productionStatus: VideoProductionStatus
  originalContentConfirmed: boolean
  accuracyReviewed: boolean
  publishedAt: string | null
}

export interface VideoProgress {
  id?: string
  videoId: string
  lastPositionSeconds: number
  highestPositionSeconds: number
  percentWatched: number
  playbackRate: number
  completed: boolean
  completedAt: string | null
  lastWatchedAt: string
}

export interface VideoCheckQuestion {
  id: string
  videoKey: string
  skillSlug: string
  subskillSlug: string
  difficulty: 'easy' | 'medium' | 'hard'
  stimulus?: string
  question: string
  choices: { label: 'A' | 'B' | 'C' | 'D'; text: string }[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  wrongAnswerExplanations: Partial<Record<'A' | 'B' | 'C' | 'D', string>>
  teachingPoint: string
}

export interface VideoScene {
  id: string
  startSeconds: number
  durationSeconds: number
  narration: string
  onScreenLines: string[]
  highlights?: string[]
  annotations?: string[]
}

export interface VideoConfig {
  videoKey: string
  lessonSlug: string
  skillSlug: string
  subskillSlug: string
  title: string
  description: string
  estimatedDurationSeconds: number
  scriptVersion: number
  videoVersion: number
  narrationProvider: string
  narrationVoiceId: string
  captionsPath: string
  transcriptPath: string
  storyboardPath: string
  scenes: VideoScene[]
  originalContentConfirmed: boolean
}
