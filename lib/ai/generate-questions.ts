import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratedQuestion {
  question_text: string
  options: [string, string, string, string]
  correct_answer: string
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
}

const USMLE_STYLE_DESCRIPTIONS: Record<string, string> = {
  clinical_vignette:
    'Classic clinical vignette: Present a patient scenario with age, sex, chief complaint, physical exam findings, and relevant labs/imaging. The question requires clinical reasoning to identify a diagnosis, mechanism, or next best step.',
  basic_science_vignette:
    'Basic science vignette: Present a scenario (patient or experimental) requiring applied knowledge of basic sciences — anatomy, physiology, biochemistry, microbiology, or pathology.',
  mechanism_based:
    'Mechanism-based reasoning: Focus on the underlying cellular, molecular, or physiological mechanism. The stem may include a patient scenario; the correct answer requires understanding the "why."',
  multi_step_integration:
    'Multi-step integration: Require integrating knowledge across two or more systems, pathways, or concepts. A single-step recall answer should never be correct.',
  lab_pathology:
    'Lab / pathology interpretation: Present lab values, biopsy findings, or pathology descriptions in text. The student must interpret and link findings to a diagnosis, prognosis, or mechanism.',
  pharmacology_vignette:
    'Pharmacology-focused vignette: Center the question on a drug mechanism, side effect, contraindication, drug-drug interaction, or pharmacokinetics, embedded in a clinical scenario.',
  mixed_usmle:
    'Mixed USMLE Step 1 style: Use a variety of vignette types — clinical, basic science, mechanism, lab/path, pharmacology — mimicking the real Step 1 exam distribution.',
}

export async function generateQuestions(
  input: GenerateInput,
): Promise<GeneratedQuestion[]> {
  const isUSMLE1 = input.standardizedExam === 'usmle_step1'
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

  let usmleSection = ''
  if (isUSMLE1) {
    const styleDescriptions = resolvedUSMLEStyles
      .map((s) => USMLE_STYLE_DESCRIPTIONS[s] ?? USMLE_STYLE_DESCRIPTIONS.mixed_usmle)
    const styleList = resolvedUSMLEStyles
      .map((s) => {
        const opt = {
          clinical_vignette: 'Classic clinical vignette',
          basic_science_vignette: 'Basic science vignette',
          mechanism_based: 'Mechanism-based reasoning',
          multi_step_integration: 'Multi-step integration',
          lab_pathology: 'Lab / pathology interpretation',
          pharmacology_vignette: 'Pharmacology-focused vignette',
          mixed_usmle: 'Mixed USMLE Step 1 style',
        }[s] ?? s
        return opt
      })
      .join(', ')

    const blendInstruction =
      resolvedUSMLEStyles.length > 1
        ? `Generate questions in the following styles: ${styleList}. Combine these elements naturally within each question — a single question may incorporate multiple styles simultaneously.`
        : `Generate questions in the following style: ${styleList}.`

    usmleSection = `
USMLE Step 1 Question Style Requirements:
- This exam targets USMLE Step 1 / NBME-style questions.
- ${blendInstruction}
${styleDescriptions.map((d) => `  • ${d}`).join('\n')}
- All questions must be vignette-based (3–6 sentence stem presenting a patient or scientific scenario), not direct recall questions.
- All four answer choices must be plausible — avoid obviously wrong distractors.
- The correct answer must require integration or application, not simple memorization.
- Distractors should represent common misconceptions or partial knowledge, mirroring real NBME choices.
- Never ask "What is X?" directly — always embed the concept in a scenario or reasoning chain.
`
  }

  const systemMessage = isUSMLE1
    ? 'You are an expert USMLE Step 1 question writer trained on NBME-style vignettes. You write clinically accurate, scenario-based questions with plausible distractors that test reasoning and integration, not memorization. Always return valid JSON.'
    : 'You are an expert exam question generator. You generate accurate, well-written multiple-choice questions based on provided exam material. Always return valid JSON.'

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: `Generate exactly ${input.questionCount} multiple-choice exam questions based on the following exam details:

${contextParts}
${usmleSection}
Rules:
- Each question must be directly relevant to the topics and content provided
- Each question must have exactly 4 answer options
- Exactly one option must be correct
- The correct_answer must be the exact string of one of the 4 options
- Questions should vary in difficulty
- Do not number the questions or options

Return a JSON object in this exact format:
{
  "questions": [
    {
      "question_text": "...",
      "options": ["option A", "option B", "option C", "option D"],
      "correct_answer": "option A"
    }
  ]
}`,
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

  // Validate each question
  const validated: GeneratedQuestion[] = []
  for (const q of parsed.questions) {
    if (
      typeof q.question_text !== 'string' ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correct_answer !== 'string' ||
      !q.options.includes(q.correct_answer)
    ) {
      throw new Error(
        `OpenAI returned a malformed question: "${q.question_text ?? 'unknown'}"`,
      )
    }
    validated.push({
      question_text: q.question_text,
      options: q.options as [string, string, string, string],
      correct_answer: q.correct_answer,
    })
  }

  return validated
}
