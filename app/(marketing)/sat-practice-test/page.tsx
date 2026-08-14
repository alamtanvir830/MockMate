import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/sat-practice-test'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Practice Tests: 10 Full-Length Digital SAT Exams | MockMate',
  description:
    'Take a free full-length Digital SAT practice test, then prepare with 10 SAT-style exams, detailed score reports, domain breakdowns, and worked explanations.',
  slug: SLUG,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Digital SAT Practice Tests',
    url: `${SITE_URL}${SLUG}`,
    description:
      'Take full-length, module-adaptive Digital SAT practice tests and receive an instant estimated score with detailed domain and skill results.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MockMate Digital SAT Practice Tests',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}${SLUG}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free 48-hour access to SAT Forms 1, 2, and 3 for new users.',
    },
  },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

export default function SatPracticeTestPage() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Digital SAT Practice Tests
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        MockMate offers 10 full-length, module-adaptive Digital SAT-style practice tests.
        Each exam recreates the timing, structure, and adaptive routing of the real
        Digital SAT — then delivers an instant estimated score with a full domain and
        skill breakdown.
      </p>

      <div className="mt-6">
        <Link
          href="/signup?next=/premade/sat"
          className="inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Start a Free SAT Practice Test
        </Link>
      </div>

      <Section title="Full-Length Digital SAT Practice">
        <p>
          Each of MockMate&apos;s 10 practice forms contains 98 questions — 54 Reading
          and Writing and 44 Math — and runs 134 minutes. The Math modules include an
          on-screen Desmos graphing calculator, matching what students encounter on test
          day. Module difficulty adapts based on your first-module performance.
        </p>
      </Section>

      <Section title="10 SAT Practice Exams">
        <p>
          MockMate currently offers Forms 1 through 10, each independently developed to
          reflect the Digital SAT&apos;s question types, passage styles, and skill
          distribution. New users receive 48-hour free access to Forms 1, 2, and 3,
          enough to complete a full practice test before subscribing.
        </p>
        <p>
          <Link href="/pricing" className="font-medium text-emerald-600 hover:text-emerald-700">
            Compare plans →
          </Link>
        </p>
      </Section>

      <Section title="Reading and Writing Modules">
        <p>
          Two Reading and Writing modules, 27 questions each, 32 minutes each. Together
          they cover all four R&amp;W domains: Information and Ideas, Craft and
          Structure, Expression of Ideas, and Standard English Conventions.
        </p>
      </Section>

      <Section title="Math Modules">
        <p>
          Two Math modules, 22 questions each, 35 minutes each. Together they cover all
          four Math domains: Algebra, Advanced Math, Problem-Solving and Data Analysis,
          and Geometry and Trigonometry. Desmos is available throughout both Math modules.
        </p>
      </Section>

      <Section title="How Module-Adaptive Routing Works">
        <p>
          Everyone starts with the same first module (M1). Your performance on M1
          determines whether your second module (M2) follows the harder or the easier
          branch. Reaching the harder branch is what makes the highest score ranges
          available, so the first module carries more weight than its question count
          alone suggests. MockMate simulates this routing so you experience the same
          adaptive pressure as the real exam.
        </p>
      </Section>

      <Section title="Test Timing">
        <ul className="ml-5 list-disc space-y-1">
          <li>Reading and Writing Module 1: 27 questions · 32 minutes</li>
          <li>Reading and Writing Module 2: 27 questions · 32 minutes</li>
          <li>Math Module 1: 22 questions · 35 minutes</li>
          <li>Math Module 2: 22 questions · 35 minutes</li>
          <li>Total: 98 questions · 134 minutes</li>
        </ul>
      </Section>

      <Section title="Instant Score Report After Each Test">
        <p>
          The moment you submit, you receive an estimated total on the 400–1600 scale
          plus separate Reading and Writing and Math section scores. The report then
          breaks down performance by domain and by individual skill — showing exactly
          where points were lost and where preparation is already strong.
        </p>
        <p>
          <Link href="/sat-score-reports" className="font-medium text-emerald-600 hover:text-emerald-700">
            See how score reports work →
          </Link>
        </p>
      </Section>

      <Section title="Autosave and Resume">
        <p>
          Answers are saved automatically as you go. If your browser closes or your
          connection drops mid-test, you can return and resume the in-progress attempt
          without losing work.
        </p>
      </Section>

      <Section title="Why Take Full-Length Practice Tests?">
        <p>
          Full-length practice builds the endurance and pacing awareness that timed
          question drills cannot replicate. Students who practice under real time
          pressure learn how to pace each module, how fatigue affects accuracy late in
          the test, and whether their current strategy holds up across 134 minutes of
          continuous work.
        </p>
        <p>
          Full-length tests also reveal weak domains far more reliably than short drills.
          A score report after a complete form shows which domains cost the most points
          across real exam conditions — that data then drives focused question-bank
          practice in exactly the right areas.
        </p>
      </Section>

      <Section title="What to Do After a Practice Test">
        <p>
          After submitting and reviewing your score report:
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Read every explanation — not just the questions you got wrong.</li>
          <li>Identify the 2–3 domains where you lost the most points.</li>
          <li>Target those skills in the question bank with focused practice sets.</li>
          <li>Study relevant Academy lessons to reinforce the underlying concepts.</li>
          <li>Take another full-length form to confirm improvement.</li>
        </ol>
        <p>
          <Link href="/sat-question-bank" className="font-medium text-emerald-600 hover:text-emerald-700">
            Practice targeted skills in the SAT Question Bank →
          </Link>
        </p>
        <p>
          <Link href="/sat-reading-writing-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
            Study Reading and Writing skills →
          </Link>
        </p>
        <p>
          <Link href="/sat-math-desmos-academy" className="font-medium text-emerald-600 hover:text-emerald-700">
            Study Math and Desmos skills →
          </Link>
        </p>
      </Section>

      <Section title="Frequently Asked Questions">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800">Where can I take a free Digital SAT practice test?</h3>
            <p className="mt-1">
              Create a free MockMate account and you get 48-hour access to Forms 1, 2,
              and 3 — enough to complete one full practice test at no cost.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">How long is a Digital SAT practice test?</h3>
            <p className="mt-1">
              134 minutes total: 64 minutes of Reading and Writing across two modules,
              and 70 minutes of Math across two modules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">How many questions are on a Digital SAT practice test?</h3>
            <p className="mt-1">
              98 questions total — 54 Reading and Writing questions and 44 Math questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Is the Digital SAT adaptive?</h3>
            <p className="mt-1">
              Yes. The Digital SAT is module-adaptive: your performance on Module 1
              determines whether you receive the harder or easier Module 2. MockMate
              simulates this routing so practice feels like the real test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">How should I review an SAT practice test?</h3>
            <p className="mt-1">
              Read every explanation — not just wrong answers. Categorize mistakes by
              skill and domain. Then use the question bank to drill the skills that
              cost you the most points before your next full-length test.
            </p>
          </div>
        </div>
      </Section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
