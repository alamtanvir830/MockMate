const reviews = [
  {
    quote: 'The math section felt challenging and very close to SAT-style questions.',
    name: 'J. N.',
    label: 'SAT Form 1',
  },
  {
    quote: 'Both Reading & Writing modules were clear, accurate, and easy to use.',
    name: 'M. D.',
    label: 'SAT Form 1',
  },
  {
    quote: 'The second module felt much harder and adapted based on my first results.',
    name: 'A. P.',
    label: 'SAT Form 1',
  },
  {
    quote: 'Accurate to my test experience — matched the pacing and time pressure well.',
    name: 'P. S.',
    label: 'SAT Form 1',
  },
  {
    quote: 'The questions looked very SAT-style and gave me realistic, rigorous practice.',
    name: 'A. S.',
    label: 'SAT Form 1',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/** Compact card for the hero right column */
function HeroCard({ quote, name, label }: { quote: string; name: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Stars />
      <p className="mt-2 text-[13px] text-slate-700 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-100">
        <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[11px] font-semibold select-none">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-semibold text-slate-800 leading-none">{name}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Compact vertical stack of 3 review cards — used inside the hero right column.
 * On mobile the hero collapses to one column, so this renders below the copy.
 */
export function HeroReviewsPanel() {
  return (
    <div className="w-full">
      {/* Compact heading */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-1">
          Student Feedback
        </p>
        <p className="text-sm font-semibold text-slate-700">
          Reviewed by students and high scorers
        </p>
      </div>

      {/* Three stacked cards */}
      <div className="flex flex-col gap-3">
        {reviews.slice(0, 3).map((r) => (
          <HeroCard key={r.name} {...r} />
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        Names anonymized. Feedback from SAT Form 1 submissions.
      </p>
    </div>
  )
}

/** Full-width section with 3-column grid (desktop) / carousel (mobile). Not used on home page. */
function ReviewCard({ quote, name, label }: { quote: string; name: string; label: string }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow h-full">
      <div>
        <svg className="h-5 w-5 text-emerald-400 mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      </div>
      <div className="mt-4 flex items-center gap-2.5 pt-4 border-t border-slate-100">
        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-semibold select-none">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">{name}</p>
          <p className="text-[11px] text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  )
}

export function StudentReviews() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
            Student Feedback
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Reviewed by students and high scorers
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Feedback from students who completed MockMate&apos;s SAT practice experience.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>

        <div className="md:hidden -mx-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 pb-4">
          {reviews.map((r) => (
            <div key={r.name} className="snap-center shrink-0 w-[78vw] max-w-[300px]">
              <ReviewCard {...r} />
            </div>
          ))}
          <div className="shrink-0 w-4" aria-hidden />
        </div>

        <p className="mt-8 text-center text-[11px] text-slate-400">
          Names anonymized. Feedback collected from SAT Form 1 module submissions.
        </p>
      </div>
    </section>
  )
}
