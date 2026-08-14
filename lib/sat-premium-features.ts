export interface SATFeature {
  id: string
  title: string
  description: string
}

export const SAT_PREMIUM_FEATURES: SATFeature[] = [
  {
    id: 'sat-forms',
    title: '10 Full-Length SAT Practice Exams',
    description: 'Practice with 10 full-length computer-adaptive SAT exams with detailed score feedback.',
  },
  {
    id: 'rw-academy',
    title: 'Complete SAT R&W Academy',
    description:
      'Structured lessons, targeted drills, vocabulary training, mixed practice, timed capstones, and personalized review across all 11 Reading and Writing skills.',
  },
  {
    id: 'math-academy',
    title: 'Complete SAT Math & Desmos Academy',
    description:
      'Guided lessons, drills, Desmos practice, mixed sets, and capstones across every Math domain tested on the SAT.',
  },
  {
    id: 'question-bank',
    title: '1,000+ SAT Question Bank Questions',
    description:
      'Practice 1,000+ targeted Reading, Writing, and Math questions with personalized sets based on your weak areas.',
  },
  {
    id: 'score-reports',
    title: 'Personalized Score Reports',
    description:
      'Review your strengths, weaknesses, pacing, skill performance, and recommended next practice.',
  },
  {
    id: 'subscription-access',
    title: 'Full Access While Subscribed',
    description:
      'Use available SAT forms, the Question Bank, and both SAT Academies throughout your active subscription.',
  },
]
