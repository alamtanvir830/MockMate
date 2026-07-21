import { createAdminClient } from '@/lib/supabase/admin'
import { type Testimonial, TestimonialCarouselClient } from './TestimonialCarouselClient'

// ── Candidate testimonials ──────────────────────────────────────────────────
// Scores are looked up at render time from standardized_exam_attempts using
// the service role key (bypasses RLS). Only candidates with a verified
// completed Form 1 total_score are displayed. Order: highest score first.
const CANDIDATES: Array<{ userId: string; initials: string; quote: string }> = [
  {
    userId: '7b01c42c-2641-49e8-8b8a-27782ac3de67',
    initials: 'A. Z.',
    quote:
      'The reading passages felt very clear and accurate to what I expected. The second module was more challenging, but the questions remained fair and well structured.',
  },
  {
    userId: 'b40d8a27-4e2c-43be-8bf5-1de3c16013f5',
    initials: 'P. S.',
    quote:
      'The exam felt accurate to my SAT experience, including the pacing and the amount of time I had left when I finished.',
  },
  {
    userId: '55d236e2-8243-4468-9782-0900f31ea5f1',
    initials: 'A. P.',
    quote:
      'The first module gave me a good baseline, and the second module felt much harder based on my performance. The Math questions were challenging but manageable with persistence.',
  },
  {
    userId: '2a714de3-4bb5-4ccc-b99b-89619d219c0f',
    initials: 'M. D.',
    quote: 'Both Reading and Writing modules were clear, accurate, and easy to use.',
  },
  {
    userId: '14f6ff28-3bcc-4bf5-9f6b-ab8f048f9fc4',
    initials: 'A. S.',
    quote: 'The Math questions were difficult and looked very similar to SAT-style questions.',
  },
  {
    userId: 'b25820d1-c139-491a-88f5-cb54240ee327',
    initials: 'A. F.',
    quote:
      'The first Reading and Writing module felt straightforward and similar to a real SAT. The second module was noticeably more difficult and tested my pacing.',
  },
  {
    userId: 'd5c09c69-ebcb-4c4a-a283-c80608cb276c',
    initials: 'J. W.',
    quote: 'The second Math module was challenging, and the questions felt very close to SAT-style questions.',
  },
  {
    userId: '0f6a0673-1e14-4fa7-bcf7-2dee5cfa82f2',
    initials: 'I. B.',
    quote:
      'The second Reading and Writing module was very challenging, and the Math module also required careful reasoning.',
  },
  {
    userId: 'd63f251a-f36a-4cd9-a4cd-eaf8f2733c59',
    initials: 'A. G.',
    quote:
      'The first module felt similar to an SAT module, and the beginning of the second Math module closely matched the style of the actual test.',
  },
  {
    userId: 'c862a117-c201-4721-b2a9-1d27eb6a8b2a',
    initials: 'M. O.',
    quote: 'The exam felt accurate to the Bluebook practice experience, and the adaptive structure was familiar.',
  },
]

interface AttemptRow {
  user_id: string
  total_score: number
}

async function fetchVerifiedTestimonials(): Promise<Testimonial[]> {
  try {
    const admin = createAdminClient()
    const userIds = CANDIDATES.map((c) => c.userId)

    const { data, error } = await admin
      .from('standardized_exam_attempts')
      .select('user_id, total_score')
      .in('user_id', userIds)
      .eq('form_number', 1)
      .eq('exam_type', 'SAT')
      .not('total_score', 'is', null)

    if (error || !data) return []

    const rows = data as unknown as AttemptRow[]

    // Keep highest score per user in case of multiple Form 1 attempts
    const scoreMap: Record<string, number> = {}
    for (const row of rows) {
      if (scoreMap[row.user_id] === undefined || row.total_score > scoreMap[row.user_id]) {
        scoreMap[row.user_id] = row.total_score
      }
    }

    return CANDIDATES.filter((c) => scoreMap[c.userId] !== undefined)
      .map((c) => ({ initials: c.initials, score: scoreMap[c.userId], quote: c.quote }))
      .sort((a, b) => b.score - a.score)
  } catch {
    // Service role key unavailable (local dev without SUPABASE_SERVICE_ROLE_KEY)
    return []
  }
}

function StaticCard({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[13px] text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-100">
        <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[11px] font-semibold select-none">
          {t.initials.charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-semibold text-slate-800 leading-none">{t.initials}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">{t.score} scorer</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Compact testimonial panel for the hero right column.
 * Score lookup happens server-side via the admin client — no private
 * data is transmitted to the browser. Cards without a verified score
 * are silently omitted.
 */
export async function HeroReviewsPanel() {
  const testimonials = await fetchVerifiedTestimonials()

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

      {testimonials.length >= 7 ? (
        <TestimonialCarouselClient testimonials={testimonials} />
      ) : testimonials.length > 0 ? (
        <div className="flex flex-col gap-3">
          {testimonials.slice(0, 3).map((t) => (
            <StaticCard key={t.initials} t={t} />
          ))}
        </div>
      ) : null}

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
