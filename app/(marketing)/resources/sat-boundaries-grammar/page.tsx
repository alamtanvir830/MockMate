import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoPageLayout } from '@/components/seo/SeoPageLayout'
import { JsonLd } from '@/components/seo/JsonLd'
import { IndependenceCallout } from '@/components/seo/IndependenceCallout'
import { ArticleByline } from '@/components/seo/ArticleByline'
import { buildSeoMetadata } from '@/components/seo/seo-meta'
import { buildArticleJsonLd } from '@/components/seo/article-jsonld'

const SLUG = '/resources/sat-boundaries-grammar'
const TITLE = 'SAT Boundaries: Sentence Boundary Rules & Practice'
const DESCRIPTION =
  'How SAT Boundaries questions work, the rules for periods, semicolons, commas, and colons between clauses, and a systematic elimination strategy with worked examples.'

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

export default function BoundariesArticle() {
  return (
    <SeoPageLayout>
      <JsonLd data={jsonLd} />

      <div className="text-sm text-slate-500 mb-4">
        <Link href="/resources" className="hover:text-brand-600">Resources</Link>
        <span className="mx-1.5">›</span>
        <Link href="/resources/sat-reading-writing" className="hover:text-brand-600">SAT Reading &amp; Writing</Link>
        <span className="mx-1.5">›</span>
        <span>Boundaries</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {TITLE}
      </h1>
      <ArticleByline />

      <P>
        Boundaries is one of the most rule-based question types on the SAT Reading &amp;
        Writing section. Each question presents a sentence or pair of sentences with a
        blank (sometimes underlined) where punctuation should go, and asks which
        punctuation option correctly joins or separates the clauses. Unlike questions that
        require reading comprehension, Boundaries questions can be answered almost entirely
        by classifying the clauses on either side of the blank.
      </P>

      <H2>The core framework: independent vs. dependent</H2>
      <P>
        Every Boundaries decision starts with the same question: is each clause on either
        side of the punctuation an independent clause or a dependent clause?
      </P>
      <P>
        An <strong>independent clause</strong> is a complete thought that can stand alone
        as a sentence — it has a subject and a verb and expresses a complete idea.
        A <strong>dependent clause</strong> cannot stand alone; it is subordinated to
        another clause by a word like <em>because</em>, <em>although</em>, <em>when</em>, <em>which</em>, or <em>that</em>.
      </P>

      <H2>The punctuation rules</H2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="bg-slate-50 border border-slate-200">
              <th className="text-left p-3 font-semibold text-slate-700">Punctuation</th>
              <th className="text-left p-3 font-semibold text-slate-700">When correct</th>
              <th className="text-left p-3 font-semibold text-slate-700">What it cannot do</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Period (.)</td>
              <td className="p-3 text-slate-600">Separates two independent clauses into two complete sentences</td>
              <td className="p-3 text-slate-600">Cannot separate an independent clause from a dependent one</td>
            </tr>
            <tr className="border border-slate-200 bg-slate-50">
              <td className="p-3 font-medium text-slate-800">Semicolon (;)</td>
              <td className="p-3 text-slate-600">Connects two independent clauses (equivalent to a period with softer separation)</td>
              <td className="p-3 text-slate-600">Cannot connect an independent clause to a dependent one</td>
            </tr>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">Comma (,)</td>
              <td className="p-3 text-slate-600">Many uses: with coordinating conjunctions (FANBOYS), after introductory phrases, before/after interrupters</td>
              <td className="p-3 text-slate-600">A comma alone cannot join two independent clauses (comma splice)</td>
            </tr>
            <tr className="border border-slate-200 bg-slate-50">
              <td className="p-3 font-medium text-slate-800">Colon (:)</td>
              <td className="p-3 text-slate-600">Follows an independent clause to introduce an explanation, list, or elaboration</td>
              <td className="p-3 text-slate-600">Cannot follow a dependent clause or an incomplete thought</td>
            </tr>
            <tr className="border border-slate-200">
              <td className="p-3 font-medium text-slate-800">No punctuation</td>
              <td className="p-3 text-slate-600">Correct when a dependent clause flows directly into an independent clause with no natural pause</td>
              <td className="p-3 text-slate-600">Cannot leave two independent clauses with nothing between them (fused sentence)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>The comma splice: the most tested error</H2>
      <P>
        A comma splice occurs when a comma alone is used to join two independent clauses.
        It is the single most common wrong answer in Boundaries questions. The test presents
        a comma splice as a tempting option because the sentence reads smoothly — the content
        makes sense and the comma feels natural. But a comma alone cannot join two independent
        clauses. If both clauses can stand alone as sentences, a period or semicolon is needed,
        or a coordinating conjunction (for, and, nor, but, or, yet, so) must accompany the
        comma.
      </P>

      <H2>Solving strategy</H2>
      <P>
        Step 1: Identify the clause on each side of the blank. Determine whether each is
        independent (IC) or dependent (DC).
      </P>
      <P>
        Step 2: Use the pattern to narrow the choices:
      </P>
      <ul className="mt-3 ml-5 space-y-1.5 text-[15px] text-slate-700 list-disc">
        <li><strong>IC + IC:</strong> period, semicolon, or comma + coordinating conjunction</li>
        <li><strong>IC + DC</strong> or <strong>DC + IC:</strong> comma (sometimes) or no punctuation — never a period or semicolon</li>
        <li><strong>IC : explanation/list:</strong> colon</li>
      </ul>
      <P>
        Step 3: Among the remaining candidates, check for comma splices and eliminate them.
        Confirm the correct answer by reading the full sentence with the punctuation inserted.
      </P>

      <H2>Original worked example</H2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-700">Practice question (original)</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-800 italic">
          The city had invested heavily in its transit infrastructure _______ ridership
          did not increase significantly during the first year of operation.
        </p>
        <div className="mt-3 space-y-1.5 text-[14px]">
          <p className="text-slate-600">(A) [no punctuation]</p>
          <p className="text-slate-600">(B) , but</p>
          <p className="text-slate-600">(C) , and</p>
          <p className="text-slate-600">(D) ;</p>
        </div>
        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">Explanation</p>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Both clauses are independent — each can stand alone as a sentence. This is IC + IC.
            (A) creates a fused sentence — incorrect.
            (C) a comma with <em>and</em> would suggest the clauses are parallel or that one follows
            logically from the other — the relationship here is contrast (investing heavily
            without resulting ridership gains), so <em>and</em> is semantically wrong.
            (D) the semicolon alone is grammatically correct (IC;IC), but it omits the
            contrasting relationship.
            (B) a comma with <em>but</em> correctly handles IC + IC with a coordinating conjunction
            AND expresses the contrasting relationship. The answer is <strong>(B)</strong>.
          </p>
        </div>
      </div>

      <H2>Practice and study recommendations</H2>
      <P>
        Boundaries questions are among the most learnable on the SAT because the rules
        are fixed and finite. The most efficient study approach is to memorize the
        IC/DC classification framework, then practice identifying clause types until it
        is automatic. Once you can quickly classify clauses, you can eliminate most wrong
        answers in under 20 seconds.
      </P>
      <P>
        MockMate&apos;s Reading &amp; Writing Academy includes a Boundaries lesson with the
        full punctuation framework, classification practice, and targeted question sets.
        The SAT question bank lets you filter by Boundaries to drill this skill in isolation.
      </P>

      <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
        <p className="text-sm font-semibold text-brand-800">Practice Boundaries on MockMate</p>
        <p className="mt-1 text-[14px] text-brand-700 leading-relaxed">
          The R&amp;W Academy covers the full punctuation framework with clause classification
          practice and immediate diagnostic feedback on your specific errors.
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
          <Link href="/resources/sat-transitions-practice" className="text-brand-600 hover:underline">→ Transitions: picking the right logical connector</Link>
          <Link href="/resources/sat-rhetorical-synthesis" className="text-brand-600 hover:underline">→ Rhetorical Synthesis: strategy</Link>
          <Link href="/sat-question-bank" className="text-brand-600 hover:underline">→ SAT Question Bank — filter by skill</Link>
        </div>
      </section>

      <IndependenceCallout />
    </SeoPageLayout>
  )
}
