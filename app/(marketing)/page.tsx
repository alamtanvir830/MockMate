import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { HeroReviewsPanel } from '@/components/landing/StudentReviews'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                How it works
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign in
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Get started free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-6 sm:pt-24 sm:pb-8">
          {/* Gradient blob */}
          <div aria-hidden className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                background: 'linear-gradient(135deg, #6ee7b7, #10b981)',
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Split hero: left copy, right review cards */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-14">
              {/* Left: copy */}
              <div className="lg:w-[52%] text-center lg:text-left">
                {/* Eyebrow */}
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-5">
                  <span className="h-px w-6 bg-emerald-400 hidden lg:block" />
                  MockMate
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                  Your standardized exam hub for{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    affordable test prep.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Take realistic SAT, MCAT, and SHSAT-style practice exams with high-quality questions reviewed by students, former test takers, and high scorers.
                </p>

                {/* Pricing value line */}
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  SAT Premium is a one-time $9.99 payment — up to 96% cheaper than major test prep options.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                    >
                      Start Free SAT Form 1
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 hover:border-emerald-400">
                      View SAT Premium
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: student review cards */}
              <div className="lg:w-[48%] mt-10 lg:mt-0">
                <HeroReviewsPanel />
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-y border-slate-100 bg-slate-50 py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {badges.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <span className="text-emerald-500">{icon}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How MockMate works — illustration */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex justify-center">
            <Image
              src="/flow.png"
              alt="How MockMate works — practice exam, instant score report, and targeted Q-Bank drilling"
              width={1200}
              height={420}
              className="w-full h-auto object-contain"
              style={{ maxWidth: '960px' }}
            />
          </div>
        </section>

        {/* Value proposition strip */}
        <section style={{ backgroundColor: '#F5FBF8' }} className="border-y border-emerald-100 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Practice with full SAT-style exams, review your score report, then drill your weakest areas with personalized question sets from the 700+ question Q-Bank.
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                built around your actual exam
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
                MockMate adapts to your syllabus, your exam style, and your weakest
                topics — not a generic question bank.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    {icon}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ backgroundColor: '#F5FBF8' }} className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                from practice to a higher score
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Four steps from setup to a detailed score report.
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-5 hidden h-0.5 w-3/4 -translate-x-1/2 bg-emerald-100 lg:block"
              />
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map(({ number, title, description }) => (
                  <div key={number} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                      {number}
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              your SAT test day is coming.{' '}
              <span style={{ color: '#34d399' }}>
                don&apos;t let the first full test be the real one.
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Practice with 5 full-length SAT-style forms, get instant score feedback, and drill your weak areas with personalized question sets — all before test day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">
                  Start Free SAT Form 1
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-white bg-transparent">
                  View SAT Premium — $9.99
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo className="[&_span]:text-white" />
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MockMate. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="/ai-disclosure" className="hover:text-slate-300 transition-colors">AI Disclosure</Link>
              <Link href="/sat-disclaimer" className="hover:text-slate-300 transition-colors">SAT Disclaimer</Link>
              <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
              <a href="mailto:ranvi.contact@gmail.com" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            MockMate is an independent educational technology service and is not affiliated with, endorsed by, or sponsored by College Board®. SAT® is a registered trademark of College Board, which is not involved in the production of, and does not endorse, this product. Practice exam scores are estimates generated by a proprietary scoring algorithm and do not represent official SAT scores. AI-generated feedback is provided for educational guidance only and may be incomplete or inaccurate. Users must be at least 13 years old to use MockMate. By using this service you agree to our{' '}
            <Link href="/terms" className="underline hover:text-slate-400">Terms of Service</Link>,{' '}
            <Link href="/privacy" className="underline hover:text-slate-400">Privacy Policy</Link>,{' '}
            <Link href="/ai-disclosure" className="underline hover:text-slate-400">AI Disclosure</Link>, and{' '}
            <Link href="/sat-disclaimer" className="underline hover:text-slate-400">SAT Disclaimer</Link>.
          </p>
        </div>
      </footer>
    </div>
  )
}

const badges = [
  {
    label: '700+ SAT Question Bank',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: 'SAT Forms 1–5',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: 'One-time $9.99 SAT Premium',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Student-reviewed questions',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Independent SAT-style practice',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Full-length SAT-style exams',
    description:
      'Five complete SAT-style forms with adaptive module routing — the same structure as test day. Get a 400–1600 estimated score the moment you finish.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Instant score & breakdown',
    description:
      'Submit your answers and get a scaled score immediately — broken down by section, domain, and skill so you know exactly where to focus next.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: '700+ question Q-Bank',
    description:
      'Filter by domain, skill, and difficulty. Build targeted sets that drill your weakest areas — all independently created SAT-style questions.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: 'Adaptive difficulty routing',
    description:
      'Module 2 difficulty adjusts based on your Module 1 performance — just like the real digital SAT. Practice under the same pressure you\'ll face test day.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'MCAT & SHSAT prep',
    description:
      'Beyond SAT: practice full-length MCAT-style exams and SHSAT-style problems — all under one roof without switching platforms.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: 'Timed, test-day conditions',
    description:
      'Strict per-module timers, no pausing, no going back between sections — the same rules as test day so focus and pacing become habit.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '1',
    title: 'Create a free account',
    description:
      'Sign up in under 30 seconds. No credit card required to start SAT Form 1.',
  },
  {
    number: '2',
    title: 'Take a full-length practice exam',
    description:
      'Sit a complete SAT-style form under timed, test-day conditions with adaptive module routing.',
  },
  {
    number: '3',
    title: 'Review your score report',
    description:
      'See your estimated 400–1600 score with a full domain-by-domain breakdown immediately after submission.',
  },
  {
    number: '4',
    title: 'Drill your weak areas',
    description:
      'Use the 700+ question Q-Bank to target exactly the skills and domains where you lost the most points.',
  },
]
