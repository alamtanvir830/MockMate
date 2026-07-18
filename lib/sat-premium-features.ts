export interface SATFeature {
  id: string
  title: string
  description: string
}

export const SAT_PREMIUM_FEATURES: SATFeature[] = [
  {
    id: 'sat-forms',
    title: 'SAT Practice Test Forms 1, 2, 3, 4, and 5',
    description: 'Full-length computer-adaptive SAT practice exams with detailed score feedback.',
  },
  {
    id: 'rw-academy',
    title: 'Complete SAT R&W Academy',
    description:
      'Structured lessons, targeted drills, vocabulary training, mixed practice, timed capstones, and personalized review across all 11 Reading and Writing skills.',
  },
  {
    id: 'question-bank',
    title: 'SAT Question Bank Access',
    description:
      'Practice 700+ targeted Reading, Writing, and Math questions with personalized sets based on your weak areas.',
  },
  {
    id: 'score-reports',
    title: 'Personalized Score Reports',
    description:
      'Review your strengths, weaknesses, pacing, skill performance, and recommended next practice.',
  },
  {
    id: 'lifetime-access',
    title: 'Unlimited Lifetime Access',
    description:
      'Retake available SAT forms, use the Question Bank, and access academy content anytime with one payment and no subscription.',
  },
]
