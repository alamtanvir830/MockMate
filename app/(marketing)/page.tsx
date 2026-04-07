import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'

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
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
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
        <section className="relative overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-10">
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

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              practice under real pressure
            </div>

            <h1 className="mx-auto max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08]">
              stop wishing for{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                one more day
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-slate-500 leading-relaxed">
              take the exam before the real exam, get the score instantly and
              have it sent to three friends for accountability, and get an
              automatically generated progress report that shows exactly what
              to work on.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                >
                  take your first mock exam
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  see how it works
                </Button>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              No credit card required · Cancel anytime
            </p>
          </div>

          {/* Flow diagram */}
          <div className="mt-6 flex justify-center px-4 sm:px-6 lg:px-8">
            <Image
              src="/flow.png"
              alt="How MockMate works"
              width={1200}
              height={420}
              className="w-full max-w-[1200px] h-auto"
            />
          </div>
        </section>

        {/* Value proposition strip */}
        <section style={{ backgroundColor: '#F5FBF8' }} className="border-y border-emerald-100 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              You tell us exactly what style of exam you are preparing for, upload your
              lectures, notes, and old exam formats, and MockMate creates a realistic
              practice exam that matches what you are actually likely to see.
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
                from your materials to a marked mock
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

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                simple pricing
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Start with one free mock. Upgrade when you need more.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
              {/* Free */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Free</p>
                <p className="mt-4 text-4xl font-bold text-slate-900">£0</p>
                <p className="mt-1 text-sm text-slate-500">Forever free</p>
                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                  {[
                    '1 mock exam per month',
                    'Instant scoring',
                    'Basic topic breakdown',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button variant="outline" className="w-full">Get started</Button>
                </Link>
              </div>

              {/* Pro */}
              <div className="relative rounded-2xl p-8 text-white shadow-xl" style={{ backgroundColor: '#059669' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-semibold text-amber-900">
                  Most popular
                </div>
                <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#a7f3d0' }}>Pro</p>
                <p className="mt-4 text-4xl font-bold">£12</p>
                <p className="mt-1 text-sm" style={{ color: '#a7f3d0' }}>per month</p>
                <ul className="mt-8 space-y-3 text-sm" style={{ color: '#d1fae5' }}>
                  {[
                    'Unlimited mock exams',
                    'Full topic-by-topic breakdown',
                    'Accountability emails to 3 friends',
                    'Exam-style matching from your materials',
                    'Progress reports across attempts',
                    'Priority support',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0" style={{ color: '#6ee7b7' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-8">
                  <Button className="w-full bg-white hover:bg-emerald-50" style={{ color: '#059669' }}>
                    Start free trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              your real exam is coming.{' '}
              <span style={{ color: '#34d399' }}>
                don&apos;t let the first full test be the real one.
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              build a realistic mock exam from your actual materials, get scored
              instantly, and know exactly what to fix before test day.
            </p>
            <Link href="/signup" className="inline-block mt-8">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">
                take your first mock exam
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo className="[&_span]:text-white" />
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MockMate. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: 'Exam-matched questions',
    description:
      'You describe the format and share your materials. MockMate builds questions that match what your lecturer actually tests, not generic textbook problems.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Instant scoring',
    description:
      'Submit your answers and get a score immediately. No waiting, no manual marking — you see exactly how you did the moment you finish.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Weak-topic breakdown',
    description:
      'After every mock, you get a topic-by-topic breakdown showing exactly where marks were lost and what to prioritise before the real exam.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: 'Accountability emails',
    description:
      'Add up to 3 friends. The moment you finish a mock, your score is automatically emailed to them. No deleting results, no hiding from a bad day.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: 'Built from your materials',
    description:
      'Upload lecture slides, notes, and old exam formats. MockMate uses your actual content to generate questions — not scraped internet data.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: 'Timed exam conditions',
    description:
      'Set a time limit and work through questions under real pressure. Build the habit of finishing on time before it actually counts.',
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
    title: 'Set your exam date and subject',
    description:
      'Tell MockMate when your exam is and what you are studying. The countdown starts immediately.',
  },
  {
    number: '2',
    title: 'Upload your materials',
    description:
      'Add your lecture notes, past papers, and a description of the exam format. The more context you give, the more accurate the mock.',
  },
  {
    number: '3',
    title: 'Take a realistic mock exam',
    description:
      'MockMate generates a practice exam built from your materials. Sit it under timed conditions like the real thing.',
  },
  {
    number: '4',
    title: 'Get scored and hold yourself accountable',
    description:
      'Receive your score instantly with a full topic breakdown. Your three accountability friends are emailed your result automatically.',
  },
]
