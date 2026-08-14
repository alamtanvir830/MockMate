import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/digital-sat-prep'

export const metadata: Metadata = buildSeoMetadata({
  title: 'Digital SAT Prep: Practice Tests, Question Bank & Courses | MockMate',
  description:
    'Prepare for the Digital SAT with adaptive SAT-style practice tests, targeted questions, Reading and Writing lessons, Math and Desmos lessons, and detailed score reports.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Digital SAT Prep',
    alternateName: 'Digital SAT Preparation',
    description:
      'Prepare for the Digital SAT with adaptive SAT-style practice tests, targeted questions, Reading and Writing lessons, Math and Desmos lessons, and detailed score reports.',
    url: `${SITE_URL}${SLUG}`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MockMate',
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    email: 'ranvi@mockmateapp.com',
  },
]

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

export default function DigitalSatPrepPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Everything You Need to Prepare for the Digital SAT
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        MockMate combines full-length adaptive SAT-style practice tests, a 1,000+ question
        bank, focused Reading and Writing and Math courses, and detailed score reports
        into one connected study workflow — so every practice session moves you toward a
        higher score.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/signup?next=/premade/sat"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Start Free Practice Test
        </Link>
        <Link
          href="/pricing"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View Pricing
        </Link>
      </div>

      <Section title="Full-Length SAT-Style Practice">
        <p>
          MockMate includes 10 full-length adaptive SAT-style forms (Forms 1 through 10).
          Each form contains 98 questions and runs 134 minutes across two Reading and
          Writing modules and two Math modules — the same structure you meet on test day.
          Forms are module-adaptive, so they respond to how you perform rather than
          serving the same fixed set of questions to everyone.
        </p>
      </Section>

      <Section title="Module-Adaptive Routing">
        <p>
          Each section has two modules. Everyone starts with the same first module (M1).
          Your performance on M1 then routes you to either an easier or a harder second
          module (M2). This mirrors how the Digital SAT adapts and means a strong first
          module unlocks the harder, higher-ceiling questions that let you demonstrate a
          top score. MockMate simulates this routing so your practice feels like the real
          adaptive exam.
        </p>
      </Section>

      <Section title="SAT Question Bank">
        <p>
          Beyond full forms, MockMate offers a 1,000+ question bank organized by domain,
          skill, and difficulty. Instead of random drills, you practice targeted sets —
          for example, only Words in Context at a medium difficulty — so your time goes
          straight to the skills that need work. Every question includes a worked
          explanation.
        </p>
      </Section>

      <Section title="Reading and Writing Academy">
        <p>
          The Reading and Writing Academy covers all 11 R&W skills across four domains:
          Information and Ideas, Craft and Structure, Expression of Ideas, and Standard
          English Conventions. Lessons pair strategy with SAT-style examples, then connect
          directly to matching question sets.
        </p>
        <p>
          <Link href="/sat-reading-writing-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
            Explore the Reading and Writing Academy →
          </Link>
        </p>
      </Section>

      <Section title="Math and Desmos Academy">
        <p>
          The Math and Desmos Academy covers 21 Math skills spanning Algebra, Advanced
          Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry — plus
          dedicated Desmos training and a sandbox to build calculator fluency before test
          day.
        </p>
        <p>
          <Link href="/sat-math-desmos-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
            Explore the Math and Desmos Academy →
          </Link>
        </p>
      </Section>

      <Section title="Score Reports">
        <p>
          After each form you get an estimated total on the 400–1600 scale, separate
          Reading and Writing and Math section scores, a domain-level breakdown, and a
          skill-level breakdown. The report shows exactly which areas are strengths and
          which need targeted practice.
        </p>
        <p>
          <Link href="/sat-score-reports" className="font-medium text-emerald-600 hover:text-emerald-700">
            See how score reports work →
          </Link>
        </p>
      </Section>

      <Section title="Suggested Study Workflow">
        <ol className="ml-5 list-decimal space-y-1">
          <li><strong>Test</strong> — take a full-length adaptive SAT-style form.</li>
          <li><strong>Review</strong> — read every explanation and categorize your mistakes.</li>
          <li><strong>Target weak skills</strong> — find your 2–3 weakest domains in the report.</li>
          <li><strong>Learn</strong> — study those skills in the R&W or Math Academy and practice matching question sets.</li>
          <li><strong>Retest</strong> — take another form to confirm improvement.</li>
        </ol>
        <p>
          <Link href="/how-mockmate-works" className="font-medium text-emerald-600 hover:text-emerald-700">
            See the full MockMate study cycle →
          </Link>
        </p>
      </Section>

      <Section title="Who MockMate Is For">
        <p>
          MockMate is built for self-studying students who want structure without a
          tutor, students supplementing tutoring with more practice, and budget-conscious
          families who want rigorous prep without the cost of traditional courses.
        </p>
      </Section>

      <Section title="Pricing and Free Access">
        <p>
          New users get 48-hour free access to Forms 1, 2, and 3 so you can take a full
          practice test before paying anything. Paid plans start at $9.99/month, with a
          3-month plan at $24.99 and lifetime access at $29.99. Every plan includes all
          10 SAT Practice Exams, the 1,000+ question bank, both academies, and
          personalized score reports.
        </p>
        <p>
          <Link href="/pricing" className="font-medium text-emerald-600 hover:text-emerald-700">
            Compare plans →
          </Link>
        </p>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
