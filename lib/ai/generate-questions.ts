import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratedQuestion {
  question_text: string
  options: string[] // 4 options for standard exams; 5 (A–E) for USMLE Step 1
  correct_answer: string
  // explanation_correct: why the correct answer is right (1-2 sentences)
  // explanation_incorrect: keyed by A/B/C/D/E (positions in options array), wrong options only
  explanation_correct?: string
  explanation_incorrect?: Record<string, string>
  // difficulty: only set when adaptive_mode is enabled (e.g. SHSAT adaptive)
  difficulty?: 'easy' | 'medium' | 'hard'
}

interface AdvancedCustomization {
  recall: string; understanding: string; application: string; multiStep: string
  styleShort: string; styleScenario: string; styleProblem: string; styleConceptual: string
  lenVeryShort: string; lenMedium: string; lenLong: string
  overallDifficulty: string
  distEasy: string; distMedium: string; distHard: string
  trickiness: string; trickinessPercent: string
  answerSimilarity: string
  answerChoiceCount: string
  questionSources: string[]
  repetition: string
  topicIntegration: string
  calcIntensity: string
  visuals: string[]
  professorStyle: string
  commonMistakes: string
  highYieldTopics: string
}

interface GenerateInput {
  title: string
  subject: string
  topics: string
  subtopics: string
  lectureContent: string
  format: string
  pastPaperStyle: string
  additionalNotes: string
  questionCount: number
  standardizedExam?: string
  usmleStyles?: string[]
  adaptiveMode?: boolean
  advancedCustomization?: AdvancedCustomization
}

// ─── Step 1 style type labels (used in distribution instructions) ──────────────

const STEP1_TYPE_LABELS = [
  'Classic Clinical Vignette',
  'Basic Science Vignette',
  'Mechanism-Based Reasoning',
  'Multi-Step Integration',
  'Lab / Pathology Interpretation',
  'Pharmacology-Focused Vignette',
] as const

// ─── Per-style writing instructions ───────────────────────────────────────────

const STEP1_STYLE_INSTRUCTIONS: Record<string, string> = {
  clinical_vignette: `
CLASSIC CLINICAL VIGNETTE
- Present a 4–7 sentence patient scenario: age, sex, chief complaint, relevant history, physical exam findings, and relevant labs or imaging
- The question asks for a diagnosis, most likely underlying pathology, or the next foundational scientific inference
- The answer must not be directly named in the stem — clues should converge toward it, not give it away
- Use realistic patient language and clinical detail`,

  basic_science_vignette: `
BASIC SCIENCE VIGNETTE
- May use a brief clinical hook, but the core answer must be a mechanism, cell type, enzyme, receptor, mutation, pathway, or histologic finding — NOT a clinical management decision
- Root the question firmly in one of: pathology, physiology, pharmacology, microbiology, immunology, biochemistry, embryology, anatomy, or histology
- The student must apply foundational science knowledge, not pattern-match to a disease name`,

  mechanism_based: `
MECHANISM-BASED REASONING
- Ask specifically for the UNDERLYING MECHANISM that explains a clinical finding, drug effect, disease manifestation, or lab result
- The stem describes a scenario; the question explicitly asks "why" or "by what mechanism"
- The correct answer names the cellular, molecular, or physiologic process — not the disease or drug name
- Wrong answers should be other plausible mechanisms that require conceptual elimination`,

  multi_step_integration: `
MULTI-STEP INTEGRATION
- Require the student to connect knowledge from 2 or more distinct domains
- Example pairings: pathology + physiology, pharmacology + biochemistry, immunology + histology, anatomy + clinical findings, microbiology + cell biology
- A single-domain recall answer should never be sufficient
- The stem should contain enough information for each reasoning step to be traceable`,

  lab_pathology: `
LAB / PATHOLOGY INTERPRETATION
- Present lab values, a biopsy or microscopy description, imaging findings, or a pattern of physiologic changes
- The student must interpret the pattern and link it to a diagnosis, mechanism, or physiologic consequence
- Do not simply ask to identify a normal value — the findings must require interpretation
- Wrong answers should represent adjacent or easily confused findings`,

  pharmacology_vignette: `
PHARMACOLOGY-FOCUSED VIGNETTE — MECHANISM PRIORITY
- The correct answer must be a MECHANISM OF ACTION, drug-target interaction, receptor subtype, enzyme inhibited, or biochemical pathway affected
- This is USMLE Step 1 pharmacology — NOT Step 2 prescribing or management
- Adverse effects and drug choice may appear as wrong answer choices but should NOT be what the correct answer tests
- The stem should describe the physiologic or clinical consequence that flows FROM the mechanism
- Example angle: "This drug's effect on [organ] is best explained by its action on which receptor/enzyme/pathway?"`,

  mixed_usmle: '', // handled separately via distribution
}

// ─── Compute even distribution across 6 Step 1 types ─────────────────────────

function computeMixedDistribution(n: number): Array<{ type: string; count: number }> {
  const base = Math.floor(n / 6)
  const remainder = n % 6
  return STEP1_TYPE_LABELS.map((label, i) => ({
    type: label,
    count: base + (i < remainder ? 1 : 0),
  })).filter((d) => d.count > 0)
}

// ─── Build USMLE section for the user prompt ──────────────────────────────────

function buildUsmleSection(styles: string[], questionCount: number): string {
  const isMixed =
    styles.includes('mixed_usmle') ||
    (styles.length === 0)

  if (isMixed) {
    const dist = computeMixedDistribution(questionCount)
    const distLines = dist
      .map((d) => `  • ${d.count} question${d.count !== 1 ? 's' : ''} — ${d.type}`)
      .join('\n')

    return `
═══════════════════════════════════════════════════════
USMLE STEP 1 — MIXED BLOCK REQUIREMENTS
═══════════════════════════════════════════════════════

You are generating a real NBME-style Step 1 question block. Follow these rules exactly.

CORE PHILOSOPHY
• Test foundational science through clinical application, not memorization or buzzword matching
• Every question must require REASONING — reading comprehension of the full stem must be necessary
• Questions must feel indistinguishable from an official NBME Step 1 exam

MANDATORY TYPE DISTRIBUTION (follow precisely)
Generate exactly ${questionCount} questions using this distribution:
${distLines}

QUESTION TYPE DEFINITIONS AND RULES

1. CLASSIC CLINICAL VIGNETTE
${STEP1_STYLE_INSTRUCTIONS.clinical_vignette}

2. BASIC SCIENCE VIGNETTE
${STEP1_STYLE_INSTRUCTIONS.basic_science_vignette}

3. MECHANISM-BASED REASONING
${STEP1_STYLE_INSTRUCTIONS.mechanism_based}

4. MULTI-STEP INTEGRATION
${STEP1_STYLE_INSTRUCTIONS.multi_step_integration}

5. LAB / PATHOLOGY INTERPRETATION
${STEP1_STYLE_INSTRUCTIONS.lab_pathology}

6. PHARMACOLOGY-FOCUSED VIGNETTE
${STEP1_STYLE_INSTRUCTIONS.pharmacology_vignette}

VARIETY REQUIREMENTS (strictly enforced)
• No two questions may have the same structure, template, or reasoning pattern
• Vary what is being tested: some questions ask for a diagnosis, some for a mechanism, some for a cell type or enzyme, some for a histologic finding, some for a physiologic consequence, some for a drug's molecular target
• Vary vignette length: some stems 3 sentences, most 4–6 sentences, some up to 8 sentences
• Vary disciplines across the block: do not cluster all pharmacology or all pathology together
• Vary difficulty: some require 1-step reasoning, most require 2 steps, some require 3-step cross-domain reasoning

PHARMACOLOGY RULE (applies to ALL pharmacology content in this block)
• Correct answers must always be the MECHANISM — receptor, enzyme, pathway, ion channel, transporter, second messenger
• Adverse effects and contraindications may appear only as WRONG answer choices
• Never write "What is the best treatment for..." — this is Step 1, not Step 2

DISTRACTOR QUALITY
• All 5 answer choices must be plausible for a well-prepared student
• Wrong answers must represent real conceptual alternatives, not obvious nonsense
• Distractors should test adjacent mechanisms, similar drug classes, related pathways, or common misconceptions
• Avoid "none of the above" and obviously irrelevant choices

VIGNETTE WRITING RULES
• Include patient age and sex in all clinical contexts
• Use specific findings: exact lab values, specific symptoms, named physical signs
• Do not name the diagnosis or drug being asked about within the stem
• The final sentence must be a direct, unambiguous question
• Avoid stems that can be answered without reading the full clinical context
`
  }

  // Specific styles selected (not mixed)
  const styleInstructions = styles
    .filter((s) => s !== 'mixed_usmle')
    .map((s) => STEP1_STYLE_INSTRUCTIONS[s] ?? '')
    .filter(Boolean)
    .join('\n')

  const styleNames = styles
    .filter((s) => s !== 'mixed_usmle')
    .map((s) => ({
      clinical_vignette: 'Classic Clinical Vignette',
      basic_science_vignette: 'Basic Science Vignette',
      mechanism_based: 'Mechanism-Based Reasoning',
      multi_step_integration: 'Multi-Step Integration',
      lab_pathology: 'Lab / Pathology Interpretation',
      pharmacology_vignette: 'Pharmacology-Focused Vignette',
    }[s] ?? s))
    .join(', ')

  return `
═══════════════════════════════════════════════════════
USMLE STEP 1 QUESTION REQUIREMENTS
═══════════════════════════════════════════════════════

STYLE(S) SELECTED: ${styleNames}

CORE PHILOSOPHY
• Test foundational science through clinical application, not memorization
• Every question must require REASONING — the full stem must be necessary to answer correctly
• Questions must feel indistinguishable from an official NBME Step 1 exam

STYLE INSTRUCTIONS
${styleInstructions}

VARIETY REQUIREMENTS
• Do not repeat the same question structure or template
• Vary what is being tested: diagnosis, mechanism, cell type, enzyme, receptor, histologic finding, physiologic consequence
• Vary vignette length and difficulty across the block
• Vary disciplines when possible

PHARMACOLOGY RULE
• Correct answers must always be the MECHANISM — receptor, enzyme, pathway, ion channel
• Adverse effects may appear only as wrong answer choices
• This is Step 1 pharmacology, not Step 2 prescribing

DISTRACTOR QUALITY
• All 5 answer choices must be plausible for a well-prepared student
• Wrong answers must represent real conceptual alternatives or adjacent mechanisms
• Avoid obviously wrong, irrelevant, or joke choices

VIGNETTE RULES
• Include patient age and sex in all clinical contexts
• Do not name the diagnosis being asked about in the stem
• Final sentence must be a direct unambiguous question
`
}

// ─── SHSAT adaptive section ───────────────────────────────────────────────────

function buildShsatSection(questionCount: number): string {
  const easyCount = Math.round(questionCount / 3)
  const hardCount = Math.round(questionCount / 3)
  const mediumCount = questionCount - easyCount - hardCount

  return `
═══════════════════════════════════════════════════════
SHSAT (NYC SPECIALIZED HIGH SCHOOLS ADMISSIONS TEST) — 2026 ADAPTIVE FORMAT
═══════════════════════════════════════════════════════

You are generating a question bank for an adaptive SHSAT simulation. Questions will be served adaptively based on student performance, so you MUST tag every question with a difficulty level.

SUBJECT AREAS (blend both across the block)
• Mathematics: arithmetic, number properties, algebra, geometry, statistics, probability, word problems, data interpretation
• English Language Arts (ELA): reading comprehension, grammar, sentence revision, editing, vocabulary in context

DIFFICULTY DISTRIBUTION (strictly required)
Generate exactly ${questionCount} questions with this split:
  • ${easyCount} questions tagged "easy"   — single-concept, direct application, grade 6-7 level
  • ${mediumCount} questions tagged "medium" — 2-step reasoning or concept combination, solid grade 8 level
  • ${hardCount} questions tagged "hard"   — multi-step, complex word problems, or subtle language distinctions

DIFFICULTY DEFINITIONS
- easy:   One concept applied directly. A student with basic preparation can answer quickly.
- medium: Requires setting up a relationship or combining two ideas. Typical SHSAT range.
- hard:   Multi-step problem or nuanced distinction. Top-tier preparation needed.

QUESTION WRITING RULES
• All questions must have exactly 4 answer choices (A–D)
• Math questions: show all necessary information in the stem; no diagrams needed
• ELA questions: use a short passage (3-6 sentences) or standalone sentence for revision tasks
• Distractors must be plausible mistakes (calculation errors, common misconceptions, partial answers)
• Avoid trivial or joke answers
• Do not reference any real people, brands, or current events
• Language should be clear and age-appropriate for motivated 8th graders

ADAPTIVE TAG REQUIREMENT
Every question MUST include "difficulty": "easy" | "medium" | "hard" in the JSON output.
`
}

// ─── Difficulty tagging instruction (appended when adaptive mode active) ──────

function buildDifficultyTaggingSection(questionCount: number): string {
  const easyCount = Math.round(questionCount / 3)
  const hardCount = Math.round(questionCount / 3)
  const mediumCount = questionCount - easyCount - hardCount

  return `
ADAPTIVE DIFFICULTY TAGGING (REQUIRED)
Every question MUST include a "difficulty" field set to exactly "easy", "medium", or "hard".
Distribute across the block:
  • ~${easyCount} questions: "easy"   — single concept, direct application
  • ~${mediumCount} questions: "medium" — 1-2 reasoning steps or concept combination
  • ~${hardCount} questions: "hard"   — multi-step, cross-domain, or nuanced distinctions
Do NOT cluster all easy or all hard questions together — interleave the difficulties.
`
}

// ─── Advanced customization prompt builder ────────────────────────────────────

function buildAdvancedSection(adv: AdvancedCustomization): string {
  const lines: string[] = []

  const pctLine = (label: string, pairs: [string, string][]) => {
    const filled = pairs.filter(([, v]) => v.trim())
    if (filled.length === 0) return
    lines.push(`${label}: ${filled.map(([k, v]) => `${v}% ${k}`).join(', ')}`)
  }

  pctLine('Thinking level distribution', [
    ['Recall/Knowledge', adv.recall],
    ['Understanding/Comprehension', adv.understanding],
    ['Application', adv.application],
    ['Multi-step/Synthesis', adv.multiStep],
  ])

  pctLine('Question style distribution', [
    ['Short/Direct', adv.styleShort],
    ['Scenario-based', adv.styleScenario],
    ['Problem-solving', adv.styleProblem],
    ['Conceptual', adv.styleConceptual],
  ])

  pctLine('Question length distribution', [
    ['Very short (≤30 words)', adv.lenVeryShort],
    ['Medium (31–80 words)', adv.lenMedium],
    ['Long (80+ words)', adv.lenLong],
  ])

  if (adv.overallDifficulty) {
    lines.push(`Overall difficulty target: ${adv.overallDifficulty}`)
  }

  pctLine('Difficulty distribution', [
    ['Easy', adv.distEasy],
    ['Medium', adv.distMedium],
    ['Hard', adv.distHard],
  ])

  if (adv.trickiness) {
    const tp = adv.trickinessPercent ? ` (approximately ${adv.trickinessPercent}% of questions)` : ''
    lines.push(`Trickiness level: ${adv.trickiness}${tp}`)
  }

  if (adv.answerSimilarity) {
    lines.push(`Answer choice similarity: ${adv.answerSimilarity}`)
  }

  if (adv.answerChoiceCount) {
    lines.push(`Answer choices per question: ${adv.answerChoiceCount}`)
  }

  if (adv.questionSources.length > 0) {
    lines.push(`Preferred question sources: ${adv.questionSources.join(', ')}`)
  }

  if (adv.repetition) {
    lines.push(`Topic repetition tolerance: ${adv.repetition}`)
  }

  if (adv.topicIntegration) {
    lines.push(`Topic integration: ${adv.topicIntegration}`)
  }

  if (adv.calcIntensity) {
    lines.push(`Calculation intensity: ${adv.calcIntensity}`)
  }

  if (adv.visuals.length > 0) {
    lines.push(`Include visual elements: ${adv.visuals.join(', ')} (describe in question text since output is text-only)`)
  }

  if (adv.professorStyle.trim()) {
    lines.push(`Professor/exam style notes: ${adv.professorStyle.trim()}`)
  }

  if (adv.commonMistakes.trim()) {
    lines.push(`Common student mistakes to test for: ${adv.commonMistakes.trim()}`)
  }

  if (adv.highYieldTopics.trim()) {
    lines.push(`High-yield / most important topics: ${adv.highYieldTopics.trim()}`)
  }

  if (lines.length === 0) return ''

  return `
═══════════════════════════════════════════════════════
ADVANCED CUSTOMIZATION (follow these instructions carefully)
═══════════════════════════════════════════════════════
${lines.map((l) => `• ${l}`).join('\n')}
`
}

// ─── Main generation function ─────────────────────────────────────────────────

export async function generateQuestions(
  input: GenerateInput,
): Promise<GeneratedQuestion[]> {
  const isUSMLE1 = input.standardizedExam === 'usmle_step1'
  const isSHSAT = input.standardizedExam === 'shsat'
  const isAdaptive = !!(input.adaptiveMode)
  const resolvedUSMLEStyles =
    input.usmleStyles && input.usmleStyles.length > 0
      ? input.usmleStyles
      : ['mixed_usmle']

  const contextParts = [
    `Title: ${input.title}`,
    `Subject: ${input.subject}`,
    input.topics ? `Topics: ${input.topics}` : null,
    input.subtopics ? `Subtopics: ${input.subtopics}` : null,
    input.lectureContent ? `Lecture content / notes:\n${input.lectureContent}` : null,
    input.pastPaperStyle ? `Past paper style: ${input.pastPaperStyle}` : null,
    input.additionalNotes ? `Additional notes: ${input.additionalNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const usmleSection = isUSMLE1
    ? buildUsmleSection(resolvedUSMLEStyles, input.questionCount)
    : isSHSAT
    ? buildShsatSection(input.questionCount)
    : isAdaptive
    ? buildDifficultyTaggingSection(input.questionCount)
    : ''

  const advancedSection = input.advancedCustomization
    ? buildAdvancedSection(input.advancedCustomization)
    : ''

  // Use gpt-4o for Step 1 (meaningfully better vignette quality and distractor realism)
  const model = isUSMLE1 ? 'gpt-4o' : 'gpt-4o-mini'

  const systemMessage = isUSMLE1
    ? `You are a senior USMLE Step 1 question writer with 15 years of NBME exam development experience. \
You write clinically accurate, vignette-based questions that test foundational science through application and reasoning. \
Your questions are indistinguishable from official NBME Step 1 items. \
You never write simple recall questions. Every question has 5 plausible answer choices. \
You vary question type, discipline, vignette length, and difficulty systematically across every block you write. \
Always return valid JSON.`
    : isSHSAT
    ? 'You are an expert SHSAT question writer creating adaptive exam questions for NYC 8th graders. \
You write clear, rigorous math and ELA questions at the appropriate difficulty level. \
Every question must include a difficulty tag ("easy", "medium", or "hard"). Always return valid JSON.'
    : 'You are an expert exam question generator. You generate accurate, well-written multiple-choice questions based on provided exam material. Always return valid JSON.'

  const optionCount = isUSMLE1 ? 5 : 4
  const optionLetters = ['A', 'B', 'C', 'D', 'E'].slice(0, optionCount)
  const exampleOptions = isUSMLE1
    ? `["option A text", "option B text", "option C text", "option D text", "option E text"]`
    : `["option A text", "option B text", "option C text", "option D text"]`
  const exampleIncorrect = isUSMLE1
    ? `"B": "...", "C": "...", "D": "...", "E": "..."`
    : `"B": "...", "C": "...", "D": "..."`
  const needsDifficulty = isSHSAT || isAdaptive
  const difficultyField = needsDifficulty ? `\n      "difficulty": "medium",` : ''

  const explanationRules = isUSMLE1
    ? `
Notes for Step 1 explanations:
- explanation_correct: Explain the MECHANISM or foundational concept — not just the answer name. \
For pharmacology: explain the receptor/enzyme/pathway. For pathophysiology: explain the cellular/molecular process. \
For diagnosis: explain the key discriminating finding or pathophysiologic chain. 1-2 sentences.
- explanation_incorrect: For each wrong answer, explain WHY it is conceptually incorrect — not just "this is wrong." \
Explain what that choice would be consistent with instead, or where the reasoning breaks down. 1-2 sentences per choice.
- Keys B/C/D/E correspond to positions 1–4 in the options array (A=index 0). Omit the key for whichever position is correct.`
    : `
Notes for explanations:
- explanation_correct: explain the mechanism or concept — do not just restate the answer
- explanation_incorrect: include only the WRONG options. Keys A/B/C/D correspond to positions in the options array (A=index 0). Omit the key for whichever letter is the correct answer.
- Keep each explanation 1-2 sentences, concise and high-yield`

  const response = await openai.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    temperature: isUSMLE1 ? 0.85 : 0.7,
    messages: [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: `Generate exactly ${input.questionCount} multiple-choice exam questions based on the following exam details:

${contextParts}
${usmleSection}${advancedSection}
General rules:
- Each question must be directly relevant to the topics and content provided
- Each question must have exactly ${optionCount} answer options
- Exactly one option must be correct
- The correct_answer must be the exact string of one of the ${optionCount} options
- Questions should vary in difficulty
- Do not number the questions or options

Return a JSON object in this exact format:
{
  "questions": [
    {
      "question_text": "...",
      "options": ${exampleOptions},
      "correct_answer": "option A text",${difficultyField}
      "explanation_correct": "...",
      "explanation_incorrect": {
        ${exampleIncorrect}
      }
    }
  ]
}
${explanationRules}`,
      },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('OpenAI returned an empty response')

  let parsed: { questions: GeneratedQuestion[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI returned invalid JSON')
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('OpenAI returned no questions')
  }

  // Validate each question — accept 4 or 5 options
  const validated: GeneratedQuestion[] = []
  for (const q of parsed.questions) {
    if (
      typeof q.question_text !== 'string' ||
      !Array.isArray(q.options) ||
      q.options.length < 4 ||
      q.options.length > 5 ||
      typeof q.correct_answer !== 'string' ||
      !q.options.includes(q.correct_answer)
    ) {
      throw new Error(
        `OpenAI returned a malformed question: "${q.question_text ?? 'unknown'}"`,
      )
    }
    validated.push({
      question_text: q.question_text,
      options: q.options as string[],
      correct_answer: q.correct_answer,
      explanation_correct:
        typeof q.explanation_correct === 'string' && q.explanation_correct.trim()
          ? q.explanation_correct.trim()
          : undefined,
      explanation_incorrect:
        q.explanation_incorrect &&
        typeof q.explanation_incorrect === 'object' &&
        !Array.isArray(q.explanation_incorrect)
          ? (q.explanation_incorrect as Record<string, string>)
          : undefined,
      difficulty:
        q.difficulty === 'easy' || q.difficulty === 'medium' || q.difficulty === 'hard'
          ? q.difficulty
          : undefined,
    })
  }

  return validated
}
