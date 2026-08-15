import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-algebra-practice'
const TITLE = 'SAT Algebra Practice: Linear Equations, Functions & Strategies'
const DESCRIPTION =
  'How SAT Algebra questions work, the five skill areas tested, common traps in linear equations and functions, and a strategy for translating word problems into equations.'

export const metadata: Metadata = buildSeoMetadata({
  title: `${TITLE} | MockMate`,
  description: DESCRIPTION,
  slug: SLUG,
})

const jsonLd = buildArticleJsonLd({
  headline: TITLE,
  description: DESCRIPTION,
  slug: SLUG,
  datePublished: '2026-08-15',
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function AlgebraArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-math" className="hover:text-brand-600">SAT Math</Link>
        <span className="mx-1.5">›</span>
        <span>Algebra</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Algebra is the largest domain on the SAT Math section, accounting for roughly 35% of
        all Math questions. It covers linear relationships: equations with one variable,
        equations with two variables, linear functions, systems of linear equations, and
        linear inequalities. Most students who struggle on Algebra questions do so not
        because they cannot solve equations, but because they have trouble translating
        word problems into equations or recognizing which algebraic form applies to a
        given situation.
      </P>

      <H2>What Algebra questions test</H2>
      <P>
        The five Algebra skill areas on the Digital SAT are:
      </P>
      <ul className="mt-4 ml-5 space-y-2 text-[15px] text-slate-700 list-disc">
        <li><strong>Linear equations in one variable</strong> — solve for a single unknown; interpret what the solution means in context</li>
        <li><strong>Linear equations in two variables</strong> — find ordered pairs, interpret slope and y-intercept in real-world contexts</li>
        <li><strong>Linear functions</strong> — work with f(x) notation, understand rate of change, interpret function values</li>
        <li><strong>Systems of two linear equations</strong> — find the intersection point, determine the number of solutions</li>
        <li><strong>Linear inequalities</strong> — solve and graph; interpret solution sets in context</li>
      </ul>

      <H2>The most tested Algebra concepts</H2>
      <P>
        <strong>Slope and y-intercept in context.</strong> The Digital SAT frequently
        presents linear relationships as real-world models — for instance, a plumber who
        charges a flat fee plus an hourly rate — and asks you to interpret what the slope or y-intercept
        represents. The slope is always the rate of change (per unit); the y-intercept is
        always the starting value (when the independent variable is zero). Confusing the
        two is the most common error.
      </P>
      <P>
        <strong>Setting up equations from word problems.</strong> Many Algebra questions
        describe a situation in words and require you to write the equation before solving
        it. The key is identifying which quantity is changing (the variable) and which
        quantities are fixed (the constants). Students who rush to solve often skip the
        setup and work with the wrong equation.
      </P>
      <P>
        <strong>Equivalent forms of linear equations.</strong> Questions may give a linear
        equation in one form (slope-intercept, point-slope, or standard form) and ask
        about a property that is easiest to read from a different form. Knowing how to
        convert between forms quickly is a practical time-saver.
      </P>

      <H2>Common traps</H2>
      <P>
        <strong>Sign errors when isolating variables.</strong> Moving terms across an equals
        sign requires flipping the sign. Errors here are more common under time pressure and
        when a variable has a negative coefficient. Checking your answer by substituting
        back into the original equation catches most sign errors.
      </P>
      <P>
        <strong>Misidentifying slope vs. y-intercept in word problems.</strong> In y = mx + b
        word problems, students sometimes assign the hourly rate to b and the flat fee to m,
        which inverts the meaning. Always ask: what is the rate of change? That is m.
        What is the value when x = 0? That is b.
      </P>
      <P>
        <strong>Forgetting to solve for the right variable.</strong> Some questions ask for
        the value of an expression like 3x + 2 rather than x itself. Solving for x and then
        forgetting to apply the expression is a common, avoidable error.
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          A landscaping company charges a fixed scheduling fee of $40 plus $25 per hour
          of work. If a customer&apos;s total bill was $165, how many hours did the company
          work for the customer?
        </p>
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Solution</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Set up the equation: Total = 40 + 25h, where h is hours.<br />
            165 = 40 + 25h<br />
            125 = 25h<br />
            h = 5<br />
            <br />
            The company worked <strong>5 hours</strong>.<br />
            <br />
            Check: 40 + 25(5) = 40 + 125 = 165. ✓
          </p>
        </div>
      </div>

      <H2>Using Desmos for Algebra questions</H2>
      <P>
        Desmos is useful for Algebra questions involving two variables or graphical
        interpretation. If a question asks where two lines intersect, graphing both
        equations and clicking the intersection is faster and more reliable than solving
        algebraically for many students. However, for simple one-variable equations
        like the example above, solving by hand is faster than typing into Desmos.
      </P>
      <P>
        The rule of thumb: use Desmos when you have two equations, a graph-reading question,
        or an inequality where visualizing the solution region helps. Solve by hand for
        single-variable equations.
      </P>

      <H2>Practice and study recommendations</H2>
      <P>
        Algebra errors tend to cluster around two areas: equation setup (for word problems)
        and sign/arithmetic errors (for computation). The most efficient practice targets
        these specifically: do word problems with the explicit goal of writing the equation
        before solving, and always check your answers by substitution.
      </P>
      <P>
        MockMate&apos;s Math Academy covers all five Algebra skill areas with diagnostic questions,
        worked lessons, and a Desmos-integrated practice environment that mirrors the actual
        testing interface.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice SAT Algebra on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The Math Academy includes lessons on linear equations, functions, and systems —
          all with a built-in Desmos environment and immediate feedback.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/sat-math-desmos-academy"
            className="inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Open Math Academy
          </Link>
          <Link
            href="/sat-question-bank"
            className="inline-block rounded-lg border border-brand-300 text-brand-700 hover:bg-brand-50 text-sm font-semibold px-4 py-2 transition-colors"
          >
            Question Bank
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Related resources</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/resources/sat-math" className="text-brand-600 hover:underline">→ SAT Math: all domains and skills</Link>
          <Link href="/resources/sat-systems-of-equations" className="text-brand-600 hover:underline">→ Systems of Equations: strategy and Desmos approach</Link>
          <Link href="/resources/sat-quadratic-equations" className="text-brand-600 hover:underline">→ Quadratic Equations: factoring, formula, and Desmos</Link>
          <Link href="/resources/how-to-use-desmos-on-the-digital-sat" className="text-brand-600 hover:underline">→ How to use Desmos on the Digital SAT</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
