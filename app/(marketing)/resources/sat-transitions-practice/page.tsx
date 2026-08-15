import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-transitions-practice'
const TITLE = 'SAT Transitions Practice: Questions, Rules & Strategies'
const DESCRIPTION =
  'How SAT Transitions questions work, the four logical relationships they test, common wrong-answer traps, and a repeatable solving strategy with original examples.'

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

export default function TransitionsArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-reading-writing" className="hover:text-brand-600">SAT Reading &amp; Writing</Link>
        <span className="mx-1.5">›</span>
        <span>Transitions</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Transitions questions appear consistently on the Digital SAT Reading &amp; Writing
        section. Each one presents a short passage with a blank where a transition word or
        phrase should go, and asks you to pick the option that best expresses the logical
        relationship between the surrounding sentences. They look simple, but the wrong-answer
        traps are systematic and well-disguised.
      </P>

      <H2>What the question tests</H2>
      <P>
        Every Transitions question is testing one thing: whether you can correctly identify
        the logical relationship between two pieces of information and then match that
        relationship to the right transition category. The vocabulary of the options is
        deliberately varied so that you cannot just memorize individual words — you have to
        understand what each option <em>does</em>.
      </P>
      <P>
        SAT Transitions questions fall into four core logical categories:
      </P>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="bg-slate-50 border border-slate-200">
              <th className="text-left p-3 font-semibold text-slate-700">Relationship</th>
              <th className="text-left p-3 font-semibold text-slate-700">What it signals</th>
              <th className="text-left p-3 font-semibold text-slate-700">Common examples</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Contrast</td>
              <td className="p-3 text-slate-600">The second sentence contradicts, limits, or complicates the first</td>
              <td className="p-3 text-slate-600">however, nevertheless, in contrast, yet, although, conversely</td>
            </tr>
            <tr className="border border-slate-200 bg-slate-50">
              <td className="p-3 font-medium text-slate-800">Cause / Effect</td>
              <td className="p-3 text-slate-600">The second sentence results from or explains the first</td>
              <td className="p-3 text-slate-600">therefore, consequently, as a result, thus, hence</td>
            </tr>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Addition / Elaboration</td>
              <td className="p-3 text-slate-600">The second sentence adds consistent information to the first</td>
              <td className="p-3 text-slate-600">furthermore, additionally, moreover, in addition, also</td>
            </tr>
            <tr className="border border-slate-200 bg-slate-50">
              <td className="p-3 font-medium text-slate-800">Illustration / Example</td>
              <td className="p-3 text-slate-600">The second sentence gives a specific example of a general claim</td>
              <td className="p-3 text-slate-600">for example, for instance, specifically, to illustrate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>How the question appears on the test</H2>
      <P>
        The typical question looks like this: a paragraph of two or three sentences, where the
        second sentence begins with an underlined blank, followed by four transition options.
        The surrounding context is complete — you have everything you need to determine the
        relationship. The question asks which choice most logically completes the text.
      </P>
      <P>
        A small number of Transitions questions involve transitions within a single sentence
        (between two clauses) rather than between sentences. The approach is identical:
        identify the logical relationship and match it to the right category.
      </P>

      <H2>The four common traps</H2>
      <P>
        <strong>Trap 1: Picking a transition that sounds formal and smart.</strong> Words like
        <em>consequently</em> and <em>moreover</em> sound authoritative. The test uses this tendency to
        distract you from checking whether the relationship is actually causal or additive.
        Always determine the relationship first, before reading the options.
      </P>
      <P>
        <strong>Trap 2: Assuming that negative events always mean contrast.</strong> If the
        first sentence describes something going wrong and the second explains why, the
        relationship is cause-effect, not contrast. Do not confuse negative content with a
        contrasting logical structure.
      </P>
      <P>
        <strong>Trap 3: Confusing addition with illustration.</strong> <em>Furthermore</em> adds
        parallel information; <em>for example</em> provides a specific case. If the second sentence
        lists a particular instance of something, you need an illustration word, not an
        addition word, even though both feel like they fit.
      </P>
      <P>
        <strong>Trap 4: Reading only the sentence with the blank.</strong> The correct
        transition depends on the relationship between the sentences, not on how a word
        reads within a single sentence. Always read at least two sentences.
      </P>

      <H2>A repeatable solving strategy</H2>
      <P>
        Step 1: Cover the answer choices. Read both sentences carefully.
      </P>
      <P>
        Step 2: In your own words, describe the relationship between them. Be specific —
        for example: the second sentence contradicts the first, or the second sentence
        explains why the first happened, or the second sentence adds a consistent detail.
      </P>
      <P>
        Step 3: Match your description to a transition category (contrast, cause-effect,
        addition, illustration). Now uncover the choices.
      </P>
      <P>
        Step 4: Eliminate any choice that belongs to the wrong category. If two choices
        are from the right category, read more carefully — one will fit the specific
        sentence pair better, often because of nuance in how strong or specific the
        relationship is.
      </P>
      <P>
        Step 5: Insert the chosen transition and read the two sentences aloud internally
        to confirm the relationship sounds right.
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          Early studies of deep-ocean ecosystems assumed that sunlight was essential for
          life, because photosynthesis drives most surface food chains. _______, researchers
          who explored hydrothermal vents in the 1970s discovered thriving communities of
          organisms sustained entirely by chemical energy rather than sunlight.
        </p>
        <div className="mt-4 space-y-1.5 text-[14px]">
          <p className="text-slate-600">(A) Consequently</p>
          <p className="text-slate-600">(B) For example</p>
          <p className="text-slate-600">(C) However</p>
          <p className="text-slate-600">(D) Furthermore</p>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            The first sentence states an assumption: sunlight is essential for life.
            The second sentence describes a discovery that contradicts that assumption.
            The relationship is <strong>contrast</strong>.
            (A) <em>Consequently</em> signals cause-effect. (B) <em>For example</em> signals illustration.
            (D) <em>Furthermore</em> signals addition. Only (C) <em>However</em> signals contrast.
            The answer is <strong>(C)</strong>.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        The most efficient Transitions practice is to work through questions under timed
        conditions, then review every wrong answer by identifying which category you
        chose and which category was correct. Most students make one of two systematic
        errors: they always over-choose contrast words, or they struggle to distinguish
        addition from illustration. Knowing your pattern lets you fix it.
      </P>
      <P>
        MockMate&apos;s Reading &amp; Writing Academy includes a dedicated Transitions lesson with
        worked examples, a diagnostic to identify your specific pattern, and targeted
        practice questions. The question bank also lets you filter by the Transitions skill
        to drill exclusively on this question type.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Transitions on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The R&amp;W Academy&apos;s Transitions lesson walks through each transition category,
          the traps, and the strategy — then gives you targeted practice with immediate feedback.
        </p>
        <Link
          href="/sat-reading-writing-academy"
          className="mt-3 inline-block rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Open R&amp;W Academy
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Related resources</h2>
        <div className="mt-4 flex flex-col gap-2 text-[15px]">
          <Link href="/resources/sat-reading-writing" className="text-brand-600 hover:underline">→ SAT Reading &amp; Writing: all domains and skills</Link>
          <Link href="/resources/sat-rhetorical-synthesis" className="text-brand-600 hover:underline">→ Rhetorical Synthesis: strategy and examples</Link>
          <Link href="/resources/sat-boundaries-grammar" className="text-brand-600 hover:underline">→ Boundaries: sentence boundary rules</Link>
          <Link href="/resources/sat-words-in-context-practice" className="text-brand-600 hover:underline">→ Words in Context: strategy</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
