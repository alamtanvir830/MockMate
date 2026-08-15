import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-systems-of-equations'
const TITLE = 'SAT Systems of Equations: Strategy, Examples & Desmos'
const DESCRIPTION =
  'How SAT Systems of Equations questions work, when to use substitution vs. elimination vs. Desmos, how to determine the number of solutions, and worked original examples.'

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
  breadcrumbs: [
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: 'SAT Math', href: '/resources/sat-math' },
    { name: 'Systems of Equations' },
  ],
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function SystemsOfEquationsArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-math" className="hover:text-brand-600">SAT Math</Link>
        <span className="mx-1.5">›</span>
        <span>Systems of Equations</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Systems of equations questions are a reliable part of the Digital SAT&apos;s Algebra
        domain. They appear in several forms: find the solution (x, y) to a system of two
        linear equations, determine how many solutions a system has, find the value of an
        expression involving both variables, or interpret a system&apos;s meaning in a
        real-world context. The three solving methods — substitution, elimination, and
        Desmos — each have situations where they are fastest.
      </P>

      <H2>What question types appear</H2>
      <P>
        <strong>Find the solution.</strong> The most straightforward type: two linear
        equations are given and you need to find the x-value, y-value, or a combination
        like x + y. The question may ask for just one variable, which is a cue to solve
        efficiently without finding both.
      </P>
      <P>
        <strong>Number of solutions.</strong> Questions ask how many solutions a system has —
        one, none, or infinitely many. This requires comparing the lines&apos; slopes and
        y-intercepts, not solving for the intersection. One solution: different slopes.
        No solution: same slope, different y-intercepts (parallel lines). Infinitely many:
        same slope, same y-intercept (identical lines).
      </P>
      <P>
        <strong>Value of an expression.</strong> Some questions ask for the value of
        something like 3x − 2y. These can often be solved without finding x and y
        individually — adding or subtracting the original equations may directly produce
        the expression you need.
      </P>
      <P>
        <strong>Word problem systems.</strong> Two relationships are described in words and
        you must write the system, then solve. The setup step is often where errors occur.
      </P>

      <H2>Substitution</H2>
      <P>
        Substitution works best when one equation is already solved for one variable, or
        when it is easy to isolate one variable. Solve one equation for x (or y), substitute
        that expression into the second equation, then solve for the remaining variable.
        Back-substitute to find the first variable.
      </P>
      <P>
        It is reliable and straightforward, but slower when neither equation can be
        easily solved for one variable without creating messy fractions.
      </P>

      <H2>Elimination</H2>
      <P>
        Elimination works best when the coefficients of one variable are equal (or easily
        made equal by multiplication) in both equations. Multiply one or both equations
        by constants so that the coefficients of one variable are equal and opposite, then
        add the equations to cancel that variable.
      </P>
      <P>
        Elimination is particularly fast when the question asks only for x + y or x − y —
        you can sometimes read the answer directly after adding or subtracting the equations
        without solving for individual variables.
      </P>

      <H2>Desmos: the fastest method for intersections</H2>
      <P>
        On the Digital SAT, you can type both equations into Desmos and click the intersection
        point — Desmos gives you the exact (x, y) values. This is almost always faster than
        either algebraic method when the question asks for the solution to the system.
      </P>
      <P>
        When to use Desmos: any question asking for the intersection point of two lines
        (or a line and a curve). When not to use Desmos: number-of-solutions questions
        (these are faster by comparing slopes) or expression-value questions (faster
        by algebraically combining the equations).
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          3x + 2y = 20<br />
          x − y = 1<br />
          <br />
          What is the value of x + y?
        </p>
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Solution</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            From equation 2: x = y + 1. Substitute into equation 1:<br />
            3(y + 1) + 2y = 20<br />
            3y + 3 + 2y = 20<br />
            5y = 17 → y = 17/5 = 3.4<br />
            x = 3.4 + 1 = 4.4<br />
            x + y = 4.4 + 3.4 = <strong>7.8</strong><br />
            <br />
            Alternative — elimination approach to get x + y directly:<br />
            Try adding the equations: (3x + 2y) + (x − y) = 20 + 1 → 4x + y = 21.
            That gives one expression but not x + y directly, so substitution
            is more direct here.<br />
            <br />
            Desmos approach: enter both equations, click intersection → x ≈ 4.4,
            y ≈ 3.4, sum = 7.8.
          </p>
        </div>
      </div>

      <H2>Number-of-solutions questions</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Original example</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          For what value of k does the system below have no solution?<br />
          4x + 6y = 12<br />
          2x + 3y = k
        </p>
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Rewrite equation 1 in slope-intercept form: y = 2 − (2/3)x. Slope = −2/3.
            Rewrite equation 2: y = k/3 − (2/3)x. Slope = −2/3 also — the slopes are
            equal, so the lines are parallel.<br />
            For no solution: parallel lines with different y-intercepts. Equation 1 has
            y-intercept = 2; equation 2 has y-intercept = k/3. For no solution, k/3 ≠ 2,
            so k ≠ 6. Any value of k other than 6 gives no solution. If k = 6, the
            equations are identical (infinitely many solutions).
          </p>
        </div>
      </div>

      <H2>Practice recommendations</H2>
      <P>
        Systems of equations questions are highly learnable because the question types are
        limited and each has a clear approach. The most efficient practice includes:
        drilling substitution and elimination until they are automatic, practicing Desmos
        intersection clicks until the motion is fluent, and doing a set of number-of-solution
        questions until slope comparison is immediate.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Systems of Equations on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The Math Academy&apos;s Systems of Equations lesson covers all question types with
          Desmos-integrated practice and immediate feedback.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/sat-math-desmos-academy"
            className="inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Open Math Academy
          </Link>
          <Link
            href="/resources/how-to-use-desmos-on-the-digital-sat"
            className="inline-block rounded-lg border border-brand-300 text-brand-700 hover:bg-brand-50 text-sm font-semibold px-4 py-2 transition-colors"
          >
            Desmos guide
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Related resources</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/resources/sat-math" className="text-brand-600 hover:underline">→ SAT Math: all domains and skills</Link>
          <Link href="/resources/sat-algebra-practice" className="text-brand-600 hover:underline">→ SAT Algebra: linear equations and functions</Link>
          <Link href="/resources/sat-quadratic-equations" className="text-brand-600 hover:underline">→ Quadratic Equations: factoring, formula, and Desmos</Link>
          <Link href="/resources/how-to-use-desmos-on-the-digital-sat" className="text-brand-600 hover:underline">→ How to use Desmos on the Digital SAT</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
