// Math Academy skill slugs, domain memberships, and display names.
// Single source of truth for all Math Academy lesson routes and metadata.

export const MATH_DOMAINS = [
  'algebra',
  'advanced-math',
  'problem-solving-data-analysis',
  'geometry-trigonometry',
] as const

export type MathDomainSlug = typeof MATH_DOMAINS[number]

export const MATH_DOMAIN_DISPLAY: Record<MathDomainSlug, string> = {
  'algebra': 'Algebra',
  'advanced-math': 'Advanced Math',
  'problem-solving-data-analysis': 'Problem-Solving & Data Analysis',
  'geometry-trigonometry': 'Geometry & Trigonometry',
}

export const MATH_DOMAIN_BADGE_CLASS: Record<MathDomainSlug, string> = {
  'algebra': 'bg-blue-50 text-blue-700 border-blue-200',
  'advanced-math': 'bg-purple-50 text-purple-700 border-purple-200',
  'problem-solving-data-analysis': 'bg-green-50 text-green-700 border-green-200',
  'geometry-trigonometry': 'bg-orange-50 text-orange-700 border-orange-200',
}

// All valid Math Academy skill slugs
export const ALGEBRA_SKILL_SLUGS = [
  'linear-equations',
  'linear-equations-two-variables',
  'linear-functions',
  'systems-of-equations',
  'linear-inequalities',
] as const

export const ADVANCED_MATH_SKILL_SLUGS = [
  'equivalent-expressions',
  'quadratic-equations',
  'exponential-functions',
  'polynomial-expressions',
  'radical-rational-equations',
  'nonlinear-equations-systems',
] as const

export const PSDA_SKILL_SLUGS = [
  'ratios-rates-units',
  'percentages',
  'one-variable-data',
  'two-variable-data',
  'probability',
  'statistical-claims',
] as const

export const GEO_TRIG_SKILL_SLUGS = [
  'area-volume',
  'lines-angles-triangles',
  'right-triangles-trig',
  'circles',
] as const

export const MATH_SKILL_SLUGS = [
  ...ALGEBRA_SKILL_SLUGS,
  ...ADVANCED_MATH_SKILL_SLUGS,
  ...PSDA_SKILL_SLUGS,
  ...GEO_TRIG_SKILL_SLUGS,
] as const

export type MathSkillSlug = typeof MATH_SKILL_SLUGS[number]

export const MATH_SKILL_DOMAIN: Record<MathSkillSlug, MathDomainSlug> = {
  'linear-equations':                'algebra',
  'linear-equations-two-variables':  'algebra',
  'linear-functions':                'algebra',
  'systems-of-equations':            'algebra',
  'linear-inequalities':             'algebra',
  'equivalent-expressions':          'advanced-math',
  'quadratic-equations':             'advanced-math',
  'exponential-functions':           'advanced-math',
  'polynomial-expressions':          'advanced-math',
  'radical-rational-equations':      'advanced-math',
  'nonlinear-equations-systems':     'advanced-math',
  'ratios-rates-units':              'problem-solving-data-analysis',
  'percentages':                     'problem-solving-data-analysis',
  'one-variable-data':               'problem-solving-data-analysis',
  'two-variable-data':               'problem-solving-data-analysis',
  'probability':                     'problem-solving-data-analysis',
  'statistical-claims':              'problem-solving-data-analysis',
  'area-volume':                     'geometry-trigonometry',
  'lines-angles-triangles':          'geometry-trigonometry',
  'right-triangles-trig':            'geometry-trigonometry',
  'circles':                         'geometry-trigonometry',
}

export const MATH_SKILL_DISPLAY_NAMES: Record<MathSkillSlug, string> = {
  'linear-equations':                'Linear Equations',
  'linear-equations-two-variables':  'Linear Equations in Two Variables',
  'linear-functions':                'Linear Functions',
  'systems-of-equations':            'Systems of Equations',
  'linear-inequalities':             'Linear Inequalities',
  'equivalent-expressions':          'Equivalent Expressions',
  'quadratic-equations':             'Quadratic Equations & Functions',
  'exponential-functions':           'Exponential Functions',
  'polynomial-expressions':          'Polynomial Expressions',
  'radical-rational-equations':      'Radical & Rational Equations',
  'nonlinear-equations-systems':     'Nonlinear Equations & Systems',
  'ratios-rates-units':              'Ratios, Rates & Units',
  'percentages':                     'Percentages',
  'one-variable-data':               'One-Variable Data',
  'two-variable-data':               'Two-Variable Data & Models',
  'probability':                     'Probability',
  'statistical-claims':              'Statistical Claims & Inference',
  'area-volume':                     'Area & Volume',
  'lines-angles-triangles':          'Lines, Angles & Triangles',
  'right-triangles-trig':            'Right Triangles & Trigonometry',
  'circles':                         'Circles',
}

// Maps question-bank skill strings to Math Academy lesson slugs
const QB_SKILL_MAP: Record<string, MathSkillSlug> = {
  'Linear equations in one variable':                         'linear-equations',
  'Linear equations in two variables':                        'linear-equations-two-variables',
  'Linear functions':                                         'linear-functions',
  'Systems of two linear equations in two variables':         'systems-of-equations',
  'Linear inequalities in one or two variables':              'linear-inequalities',
  'Equivalent expressions':                                   'equivalent-expressions',
  'Nonlinear equations in one variable and systems':          'nonlinear-equations-systems',
  'Nonlinear functions':                                      'quadratic-equations',
  'Quadratic equations':                                      'quadratic-equations',
  'Exponential functions':                                    'exponential-functions',
  'Polynomial expressions':                                   'polynomial-expressions',
  'Radicals and rational exponents':                          'radical-rational-equations',
  'Ratios, rates, proportional relationships, and units':     'ratios-rates-units',
  'Ratios, rates, and proportional relationships':            'ratios-rates-units',
  'Percentages':                                              'percentages',
  'One-variable data: distributions and measures of center':  'one-variable-data',
  'One-variable data':                                        'one-variable-data',
  'Two-variable data: models and scatterplots':               'two-variable-data',
  'Two-variable data':                                        'two-variable-data',
  'Probability and conditional probability':                  'probability',
  'Probability':                                              'probability',
  'Inference from sample statistics and margin of error':     'statistical-claims',
  'Evaluating statistical claims':                            'statistical-claims',
  'Area and volume':                                          'area-volume',
  'Lines, angles, and triangles':                             'lines-angles-triangles',
  'Right triangles and trigonometry':                         'right-triangles-trig',
  'Circles':                                                  'circles',
}

export function mathSkillToAcademySlug(skill: string): MathSkillSlug | null {
  return QB_SKILL_MAP[skill] ?? null
}
