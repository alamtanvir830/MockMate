import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { buildSeoMetadata, SITE_URL } from '@/components/seo/seo-meta'

const SLUG = '/resources/sat-math'

export const metadata: Metadata = buildSeoMetadata({
  title: 'SAT Math: Skills, Strategies & Practice | MockMate',
  description:
    'Complete guide to Digital SAT Math. Covers all four domains — Algebra, Advanced Math, Problem-Solving & Data Analysis, and Geometry & Trigonometry — with targeted strategies for each skill area.',
  slug: SLUG,
})

type SkillEntry = { href: string; title: string; description: string }

const ALGEBRA_SKILLS: SkillEntry[] = [
  {
    href: '/resources/sat-algebra-practice',
    title: 'Algebra: Linear Equations & Functions',
    description:
      'SAT Algebra covers linear equations in one and two variables, linear functions, and linear inequalities. These questions test your ability to set up and solve equations from both abstract and word-problem contexts.',
  },
  {
    href: '/resources/sat-systems-of-equations',
    title: 'Systems of Equations',
    description:
      'Questions ask you to find the solution to a system of two linear equations, determine how many solutions exist, or interpret a system in a real-world context. Desmos can solve these graphically in seconds.',
  },
]

const ADVANCED_MATH_SKILLS: SkillEntry[] = [
  {
    href: '/resources/sat-quadratic-equations',
    title: 'Quadratic Equations',
    description:
      'Quadratic questions ask you to solve equations, find zeros, match graphs to equations, and identify key features like the vertex and axis of symmetry. Factoring, the quadratic formula, and Desmos are all useful here.',
  },
]

const PSDA_SKILLS: SkillEntry[] = []
const GEO_SKILLS: SkillEntry[] = []

const ALL_LINKED_SKILLS = [...ALGEBRA_SKILLS, ...ADVANCED_MATH_SKILLS]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SAT Math Skills Hub',
  url: `${SITE_URL}${SLUG}`,
  description:
    'A practical guide to all four Digital SAT Math domains with skill-specific strategy articles and resources.',
  hasPart: ALL_LINKED_SKILLS.map((s) => ({
    '@type': 'Article',
    headline: s.title,
    url: `${SITE_URL}${s.href}`,
  })),
}

function SkillCard({ skill }: { skill: SkillEntry }) {
  return (
    <Link
      href={skill.href}
      className="group rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-600">
        {skill.title}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
        {skill.description}
      </p>
      <span className="mt-2 inline-block text-sm font-medium text-brand-500">
        Study strategies →
      </span>
    </Link>
  )
}

function Domain({
  name,
  testCount,
  description,
  skills,
  comingSoon,
}: {
  name: string
  testCount: string
  description: string
  skills: SkillEntry[]
  comingSoon?: string[]
}) {
  return (
    <section className="mt-12">
      <div className="flex items-baseline gap-3">
        <h2 className="text-xl font-bold text-slate-900">{name}</h2>
        <span className="text-sm text-slate-400">{testCount}</span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{description}</p>
      {skills.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <SkillCard key={s.href} skill={s} />
          ))}
        </div>
      )}
      {comingSoon && comingSoon.length > 0 && (
        <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">Skills covered in the Math Academy:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {comingSoon.map((s) => (
              <li key={s} className="rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs text-slate-500">{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default function SatMathHub() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <span>SAT Math</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        SAT Math
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The Digital SAT Math section contains 44 questions across two adaptive modules.
        About 70% of questions are multiple-choice; the remaining 30% are
        student-produced response (grid-in). A built-in Desmos graphing calculator is
        available for every question. Knowing which questions to solve by hand and which
        to graph saves significant time.
      </p>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">
          Practice with MockMate&apos;s SAT Math Academy
        </p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          MockMate&apos;s Math Academy covers all four domains across 15 skill areas, with
          Desmos-integrated lessons, diagnostics, and targeted practice questions.
          The built-in Desmos practice mirrors the actual testing environment.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/sat-math-desmos-academy"
            className="inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Go to Math Academy
          </Link>
          <Link
            href="/resources/how-to-use-desmos-on-the-digital-sat"
            className="inline-block rounded-lg border border-brand-300 text-brand-700 hover:bg-brand-50 text-sm font-semibold px-4 py-2 transition-colors"
          >
            Desmos strategy guide
          </Link>
        </div>
      </div>

      <Domain
        name="Algebra"
        testCount="~35% of Math section"
        description="Algebra is the largest domain on the SAT Math section. Questions cover linear equations in one and two variables, linear functions (y = mx + b), systems of two linear equations, and linear inequalities. Many questions present real-world scenarios requiring you to construct and solve the equation yourself."
        skills={ALGEBRA_SKILLS}
        comingSoon={['Linear Inequalities', 'Linear Functions', 'Linear Equations (2 vars)']}
      />

      <Domain
        name="Advanced Math"
        testCount="~35% of Math section"
        description="Advanced Math questions involve nonlinear expressions and equations. You will factor and expand polynomials, solve quadratic equations, work with exponential functions, and simplify rational and radical expressions. These questions require algebraic fluency but Desmos can often verify your work or suggest the answer."
        skills={ADVANCED_MATH_SKILLS}
        comingSoon={['Exponential Functions', 'Polynomial Expressions', 'Radical & Rational Equations', 'Equivalent Expressions']}
      />

      <Domain
        name="Problem-Solving & Data Analysis"
        testCount="~15% of Math section"
        description="This domain covers quantitative reasoning: ratios, rates, unit conversions, percentages, proportional relationships, one- and two-variable data, probability, and evaluating statistical claims. Many questions include tables, charts, or scatterplots."
        skills={PSDA_SKILLS}
        comingSoon={['Ratios & Rates', 'Percentages', 'One-Variable Data', 'Two-Variable Data', 'Probability', 'Statistical Claims']}
      />

      <Domain
        name="Geometry & Trigonometry"
        testCount="~15% of Math section"
        description="Geometry questions cover area and volume formulas, properties of lines and angles, right triangle trigonometry, and circle theorems. Trigonometry questions focus on sin, cos, tan definitions and complementary angle relationships. A reference sheet with key formulas is provided during the test."
        skills={GEO_SKILLS}
        comingSoon={['Area & Volume', 'Lines, Angles & Triangles', 'Right Triangle Trig', 'Circles']}
      />

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Calculator strategy</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          The Desmos graphing calculator is available for every Math question on the Digital SAT.
          This changes the approach to many questions — especially those involving systems of
          equations, quadratics, and graphical interpretations. However, Desmos is not always
          faster than hand calculation: for simple arithmetic or equation solving, the time
          spent typing into Desmos can exceed the time to solve directly.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          The best practice is to become fluent in both approaches and develop judgment about
          which to use on any given question.
        </p>
        <Link
          href="/resources/how-to-use-desmos-on-the-digital-sat"
          className="mt-3 inline-block text-brand-600 hover:underline text-[15px]"
        >
          Read: How to use Desmos on the Digital SAT →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Where to go next</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/sat-math-desmos-academy" className="text-brand-600 hover:underline">→ MockMate Math Academy — lessons for all 15 skills</Link>
          <Link href="/resources/how-to-use-desmos-on-the-digital-sat" className="text-brand-600 hover:underline">→ How to use Desmos on the Digital SAT</Link>
          <Link href="/resources/how-digital-sat-adaptive-modules-work" className="text-brand-600 hover:underline">→ How Digital SAT adaptive modules work</Link>
          <Link href="/resources" className="text-brand-600 hover:underline">→ All SAT resources</Link>
          <Link href="/sat-practice-test" className="text-brand-600 hover:underline">→ Take a free full-length SAT practice test</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
