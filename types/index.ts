export type ExamStatus = 'draft' | 'ready' | 'in_progress' | 'completed'

export type ExamFormat =
  | 'multiple_choice'
  | 'short_answer'
  | 'essay'
  | 'mixed'

export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'canceled'
export type SubscriptionTier = 'free' | 'pro' | 'premium'

export const PLAN_LIMITS: Record<SubscriptionTier, number> = {
  free: 1,
  pro: 3,
  premium: Infinity,
}

export const PLAN_LABELS: Record<SubscriptionTier, string> = {
  free: 'Free',
  pro: 'Pro',
  premium: 'Premium',
}

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: SubscriptionStatus
  subscription_tier: SubscriptionTier
  created_at: string
}

export interface Exam {
  id: string
  user_id: string
  title: string
  subject: string
  exam_date: string
  unlock_days_before: number
  unlock_date: string
  status: ExamStatus
  created_at: string
  spec?: ExamSpec
  attempt?: ExamAttempt
}

export interface ExamSpec {
  id: string
  exam_id: string
  topics: string[]
  subtopics: string[]
  lecture_content: string
  format: ExamFormat
  past_paper_style: string
  additional_notes: string
}

export interface ExamQuestion {
  id: string
  exam_id: string
  question_text: string
  question_type: 'multiple_choice' | 'short_answer' | 'essay'
  options: string[] | null
  correct_answer: string
  marks: number
  order: number
}

export interface ExamAttempt {
  id: string
  exam_id: string
  user_id: string
  started_at: string
  completed_at: string | null
  score: number | null
  total_marks: number
}

export interface ExamResponse {
  id: string
  attempt_id: string
  question_id: string
  user_answer: string
  is_correct: boolean | null
  marks_awarded: number
}

export interface AIFeedback {
  id: string
  attempt_id: string
  overall_summary: string
  score_percentage: number
  weak_topics: { topic: string; feedback: string }[]
  strong_topics: { topic: string; feedback: string }[]
  recommendations: string[]
}

export interface AccountabilityFriend {
  id: string
  user_id: string
  name: string
  email: string
}

export interface CreateExamFormData {
  title: string
  subject: string
  exam_date: string
  topics: string
  subtopics: string
  lecture_content: string
  format: ExamFormat
  past_paper_style: string
  additional_notes: string
  accountability_friends: { name: string; email: string }[]
}
