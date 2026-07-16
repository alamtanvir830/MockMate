import type { VideoCheckQuestion } from './types'
import { boundariesCompleteSentencesQuestions } from './check-questions/boundaries-complete-sentences'

// Maps videoKey → check questions shown after the video
const CHECK_QUESTIONS: Record<string, VideoCheckQuestion[]> = {
  'boundaries-complete-sentences': boundariesCompleteSentencesQuestions,
}

export function getVideoCheckQuestions(videoKey: string): VideoCheckQuestion[] {
  return CHECK_QUESTIONS[videoKey] ?? []
}
