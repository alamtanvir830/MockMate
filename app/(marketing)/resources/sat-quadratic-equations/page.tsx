import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-quadratic-equations'
const TITLE = 'SAT Quadratic Equations: Factoring, Formula & Desmos Strategy'
const DESCRIPTION =
  'How SAT Quadratic Equations questions work, when to factor vs. use the quadratic formula vs. Desmos, vertex form, parabola features, and worked original examples.'

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
    { name: 'Quadratic Equations' },
  ],
})

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-900">{children}</h2>
}

export default function QuadraticEquationsArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-math" className="hover:text-brand-600">SAT Math</Link>
        <span className="mx-1.5">›</span>
        <span>Quadratic Equations</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Quadratic equations are one of the central topics in the SAT&apos;s Advanced Math domain.
        Questions range from solving quadratics for their roots to identifying features of
        parabolas, writing equations from a graph, and working with the relationship between
        a quadratic&apos;s factored, standard, and vertex forms. The Digital SAT&apos;s built-in Desmos
        calculator changes how many of these questions should be approached — but knowing when
        to use it and when to factor by hand is a critical judgment skill.
      </P>

      <H2>What quadratic questions test</H2>
      <P>
        The Digital SAT tests quadratics across several question types:
      </P>
      <ul className="mt-4 ml-5 space-y-2 text-[15px] text-slate-700 list-disc">
        <li><strong>Solving for zeros/roots</strong> — find the values of x where f(x) = 0</li>
        <li><strong>Vertex identification</strong> — find the maximum or minimum of a parabola and its location</li>
        <li><strong>Form conversion</strong> — rewrite between standard (ax² + bx + c), factored ((x − r)(x − s)), and vertex (a(x − h)² + k) forms</li>
        <li><strong>Interpreting graphs</strong> — match an equation to a parabola based on roots, vertex, or direction of opening</li>
        <li><strong>Number of solutions</strong> — determine whether a quadratic has two, one, or no real solutions (using the discriminant: b² − 4ac)</li>
        <li><strong>Systems with quadratics</strong> — find the intersection of a line and a parabola</li>
      </ul>

      <H2>Three solving methods and when to use each</H2>
      <P>
        <strong>Factoring.</strong> The fastest method when the quadratic factors cleanly into
        integers. Look for two numbers that multiply to c (the constant term) and add to b
        (the coefficient of x). If those numbers do not exist as integers within a few seconds
        of inspection, factoring is not the right approach for that problem.
      </P>
      <P>
        <strong>Quadratic formula.</strong> Always works, regardless of whether the quadratic
        factors cleanly. For ax² + bx + c = 0, the solutions are x = (−b ± √(b² − 4ac)) / 2a.
        Use it when factoring does not produce integer factors quickly, or when the question
        involves the discriminant explicitly.
      </P>
      <P>
        <strong>Desmos.</strong> On the Digital SAT, graphing the quadratic in Desmos and
        reading the zeros directly is often the fastest method — especially for questions
        asking for roots, intersections, or vertex coordinates. The graph also immediately
        shows whether there are two, one, or zero real roots based on whether the parabola
        crosses, touches, or misses the x-axis.
      </P>

      <H2>Key facts about quadratic forms</H2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="bg-slate-50 border border-slate-200">
              <th className="text-left p-3 font-semibold text-slate-700">Form</th>
              <th className="text-left p-3 font-semibold text-slate-700">What it reveals directly</th>
              <th className="text-left p-3 font-semibold text-slate-700">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Standard: ax² + bx + c</td>
              <td className="p-3 text-slate-600">y-intercept (value of c), direction of opening (sign of a), discriminant</td>
              <td className="p-3 text-slate-600">2x² − 5x + 3</td>
            </tr>
            <tr className="border border-slate-200 bg-slate-50">
              <td className="p-3 font-medium text-slate-800">Factored: a(x − r)(x − s)</td>
              <td className="p-3 text-slate-600">Roots/zeros directly: x = r and x = s</td>
              <td className="p-3 text-slate-600">2(x − 1)(x − 1.5)</td>
            </tr>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Vertex: a(x − h)² + k</td>
              <td className="p-3 text-slate-600">Vertex directly: (h, k); maximum or minimum = k</td>
              <td className="p-3 text-slate-600">2(x − 1.25)² − 0.125</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Common traps</H2>
      <P>
        <strong>Forgetting ± in the quadratic formula.</strong> The ± produces two solutions —
        both must be considered. Questions that ask for the sum of solutions, or specify a
        condition that eliminates one solution, require finding both first.
      </P>
      <P>
        <strong>Sign errors when factoring.</strong> For (x − r)(x − s) = 0, the solutions
        are x = r and x = s — the signs of the roots are the opposite of the signs in the
        factored form. Students often flip these. Check: plug your answers back into the
        factored form to verify they produce 0.
      </P>
      <P>
        <strong>Confusing the vertex&apos;s x-coordinate with the axis of symmetry only.</strong>
        The axis of symmetry is x = h (or x = −b/2a in standard form), but the vertex is
        the full point (h, k). Questions asking for the minimum or maximum value want k,
        not h.
      </P>
      <P>
        <strong>Assuming the discriminant tells you the roots, not just the count.</strong>
        b² − 4ac positive → two real roots; zero → one real root; negative → no real
        solutions. It does not tell you what the roots are.
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          The function f(x) = x² − 7x + 10 has two real zeros. What is the positive
          difference between the zeros?
        </p>
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Solution (factoring)</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Find two numbers that multiply to 10 and add to −7: −2 and −5.<br />
            f(x) = (x − 2)(x − 5)<br />
            Zeros: x = 2 and x = 5<br />
            Positive difference: 5 − 2 = <strong>3</strong><br />
            <br />
            Desmos approach: graph y = x² − 7x + 10, read the zeros at x = 2 and x = 5,
            compute 5 − 2 = 3. Same result, no factoring required.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        Quadratics reward drilling: factoring patterns become automatic with repetition, and
        the quadratic formula becomes reliable only through practice under timed conditions.
        Separately, practice identifying which form of a quadratic equation is needed
        (standard → y-intercept, factored → zeros, vertex → max/min) without converting —
        this saves time on many questions.
      </P>
      <P>
        For Desmos: practice graphing quadratics and reading zeros, vertices, and
        intersections until the process is fluid. The Desmos approach is fastest when you
        are comfortable with the tool; it is slow if you are still learning to navigate it
        during the test.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice SAT Quadratics on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The Math Academy covers quadratic equations with Desmos-integrated lessons,
          form-conversion practice, and diagnostic questions to identify your specific gaps.
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
          <Link href="/resources/sat-systems-of-equations" className="text-brand-600 hover:underline">→ Systems of Equations: when lines and curves intersect</Link>
          <Link href="/resources/how-to-use-desmos-on-the-digital-sat" className="text-brand-600 hover:underline">→ How to use Desmos on the Digital SAT</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
