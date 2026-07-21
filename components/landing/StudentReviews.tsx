import { createAdminClient } from '@/lib/supabase/admin'
import { type Testimonial, TestimonialCarouselClient } from './TestimonialCarouselClient'

// ── Candidate testimonials ──────────────────────────────────────────────────
// Scores are resolved at render time from standardized_exam_attempts keyed
// on local_attempt_id (UNIQUE per attempt — avoids ambiguity when a user
// has multiple Form 1 attempts). The ≥1400 filter runs server-side before
// any data reaches the browser.
const CANDIDATES: Array<{
  userId: string
  localAttemptId: string
  initials: string
  quote: string
}> = [
  {
    userId: 'f7d8a9ed-0e53-4248-95b1-a76256b964c9',
    localAttemptId: '1784225475832-l7ldrf1',
    initials: 'A. Z.',
    quote:
      'The reading passages felt very clear and accurate to what I expected. The second module was more challenging, but the questions remained fair and well structured.',
  },
  {
    userId: '3c96cd40-5e4b-447c-a547-c6cf5f3d0f85',
    localAttemptId: '1784151507773-sh90btx',
    initials: 'P. S.',
    quote:
      'The exam felt accurate to my SAT experience, including the pacing and the amount of time I had left when I finished.',
  },
  {
    userId: '3ae6e3b1-44f8-4d74-a256-24330a40674b',
    localAttemptId: '1783959942500-2mrnbnj',
    initials: 'A. P.',
    quote:
      'The first module gave me a good baseline, and the second module felt much harder based on my performance. The Math questions were challenging but manageable with persistence.',
  },
  {
    userId: '665edc95-91fe-4c94-bd0b-0f52f729939f',
    localAttemptId: '1784049184503-tt98n93',
    initials: 'M. D.',
    quote: 'Both Reading and Writing modules were clear, accurate, and easy to use.',
  },
  {
    userId: '14f6ff28-3bcc-4bf5-9f6b-ab8f048f9fc4',
    localAttemptId: '1784035095518-4mjqolq',
    initials: 'A. S.',
    quote: 'The Math questions were difficult and looked very similar to SAT-style questions.',
  },
  {
    userId: 'b25820d1-c139-491a-88f5-cb54240ee327',
    localAttemptId: '1784477455858-szmooe5',
    initials: 'A. F.',
    quote:
      'The first Reading and Writing module felt straightforward and similar to a real SAT. The second module was noticeably more difficult and tested my pacing.',
  },
  {
    userId: '0f6a0673-1e14-4fa7-bcf7-2dee5cfa82f2',
    localAttemptId: '1784108389680-afuasu3',
    initials: 'I. B.',
    quote:
      'The second Reading and Writing module was very challenging, and the Math module also required careful reasoning.',
  },
  {
    userId: 'ba4c72ff-370c-4e5b-aa80-55b1871b674c',
    localAttemptId: '1784338486186-mivlwtb',
    initials: 'A. G.',
    quote:
      'The first module felt similar to an SAT module, and the beginning of the second Math module closely matched the style of the actual test.',
  },
  {
    userId: 'c98c4ac9-f7ad-40ad-b850-1e0af05db7e1',
    localAttemptId: '1783983613655-zj4bw44',
    initials: 'J. W.',
    quote: 'The second Math module was challenging, and the questions felt very close to SAT-style questions.',
  },
  {
    userId: '20794f77-ba46-4c84-8226-c4bf7a80369d',
    localAttemptId: '1784285739265-91aq5s0',
    initials: 'A. A.',
    quote: 'The exam felt accurate to the Bluebook practice experience, and the adaptive structure felt familiar.',
  },
]

interface AttemptRow {
  local_attempt_id: string
  total_score: number
}

async function fetchVerifiedTestimonials(): Promise<Testimonial[]> {
  try {
    const admin = createAdminClient()
    const localAttemptIds = CANDIDATES.map((c) => c.localAttemptId)

    // Query by local_attempt_id (UNIQUE per attempt) so we get the exact
    // score for the specific Form 1 attempt each candidate submitted.
    // The ≥1400 filter runs here on the trusted server, not in the browser.
    const { data, error } = await admin
      .from('standardized_exam_attempts')
      .select('local_attempt_id, total_score')
      .in('local_attempt_id', localAttemptIds)
      .not('total_score', 'is', null)
      .gte('total_score', 1400)

    if (error || !data) return []

    const rows = data as unknown as AttemptRow[]

    const scoreMap: Record<string, number> = {}
    for (const row of rows) {
      scoreMap[row.local_attempt_id] = row.total_score
    }

    return CANDIDATES.filter((c) => scoreMap[c.localAttemptId] !== undefined)
      .map((c) => ({ initials: c.initials, score: scoreMap[c.localAttemptId], quote: c.quote }))
      .sort((a, b) => b.score - a.score)
  } catch {
    // Service role key unavailable (local dev) — show nothing
    return []
  }
}

/**
 * Compact testimonial panel for the hero right column.
 * All score resolution and 1400+ filtering happens server-side.
 * Only {quote, initials, score} reach the browser — no emails, user IDs,
 * or raw DB records are transmitted.
 */
export async function HeroReviewsPanel() {
  const testimonials = await fetchVerifiedTestimonials()

  // 5 seconds of scroll per card; minimum 35 s so slow scrollers still read cards
  const durationSeconds = Math.max(35, testimonials.length * 5)

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-1">
          Student Feedback
        </p>
        <p className="text-sm font-semibold text-slate-700">
          Reviewed by high scorers and former test takers
        </p>
      </div>

      {testimonials.length > 0 && (
        <TestimonialCarouselClient
          testimonials={testimonials}
          durationSeconds={durationSeconds}
        />
      )}

      {testimonials.length > 0 && (
        <p className="mt-3 text-[11px] text-slate-400">
          Names anonymized. Feedback from SAT Form 1 submissions.
        </p>
      )}
    </div>
  )
}

/** Full-width standalone testimonials section (not currently used on home page). */
export function StudentReviews() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
            Student Feedback
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Reviewed by high scorers and former test takers
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Feedback from students who completed MockMate&apos;s SAT practice experience.
          </p>
        </div>
      </div>
    </section>
  )
}
