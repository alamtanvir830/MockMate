export type TransitionCategory =
  | 'addition' | 'contrast' | 'cause-effect' | 'example'
  | 'concession' | 'sequence' | 'clarification' | 'emphasis' | 'summary'

export interface CategoryInfo {
  slug: TransitionCategory
  label: string
  description: string
  signalWords: string[]
  testTip: string
  commonMistake: string
}

export const categories: CategoryInfo[] = [
  {
    slug: 'addition',
    label: 'Addition',
    description: 'The second idea continues or adds to the first. Both ideas point in the same direction.',
    signalWords: ['furthermore', 'moreover', 'in addition', 'additionally', 'also', 'besides'],
    testTip: 'Both sentences support the same point. If they agree and build on each other, use an addition word.',
    commonMistake: 'Choosing "furthermore" when the second idea contradicts the first.',
  },
  {
    slug: 'contrast',
    label: 'Contrast',
    description: 'The second idea opposes or contradicts the first.',
    signalWords: ['however', 'nevertheless', 'in contrast', 'on the other hand', 'yet', 'conversely'],
    testTip: 'Ask: Does the second sentence surprise you given the first? If so, it\'s likely contrast.',
    commonMistake: 'Confusing "however" (contrast) with "therefore" (cause-effect).',
  },
  {
    slug: 'cause-effect',
    label: 'Cause & Effect',
    description: 'The second idea results from or is caused by the first.',
    signalWords: ['therefore', 'thus', 'as a result', 'consequently', 'hence', 'for this reason'],
    testTip: 'Ask: Is the first sentence the cause and the second the effect? Then use a cause-effect word.',
    commonMistake: 'Using "therefore" when no logical cause is stated in the first sentence.',
  },
  {
    slug: 'example',
    label: 'Example',
    description: 'The second idea gives a specific instance or illustration of the general claim in the first.',
    signalWords: ['for example', 'for instance', 'specifically', 'to illustrate', 'namely', 'in particular'],
    testTip: 'The second sentence should be a specific case of a broader statement in the first.',
    commonMistake: 'Choosing "for example" when the second idea is a consequence, not an illustration.',
  },
  {
    slug: 'concession',
    label: 'Concession',
    description: 'The writer acknowledges a counterpoint before maintaining the main argument.',
    signalWords: ['although', 'even though', 'while', 'granted', 'admittedly', 'despite this'],
    testTip: 'Concession admits one thing is true while arguing something stronger. "Although X, Y."',
    commonMistake: 'Confusing concession with simple contrast. "However" is flat contradiction; "although" admits a point before pivoting.',
  },
  {
    slug: 'sequence',
    label: 'Sequence',
    description: 'The second idea follows the first in time, order, or procedure.',
    signalWords: ['first', 'next', 'then', 'finally', 'subsequently', 'afterward', 'initially'],
    testTip: 'Sequence is about time or steps. Ask: Does one thing happen before or after the other?',
    commonMistake: 'Using "then" when the relationship is cause-effect rather than time-order.',
  },
  {
    slug: 'clarification',
    label: 'Clarification',
    description: 'The second idea restates or defines the first idea more precisely.',
    signalWords: ['in other words', 'that is', 'more specifically', 'to put it differently', 'to clarify', 'namely'],
    testTip: 'Both sentences express the same idea; the second is clearer or more specific.',
    commonMistake: 'Confusing clarification with addition. Clarification re-explains; addition adds new information.',
  },
  {
    slug: 'emphasis',
    label: 'Emphasis',
    description: 'The second idea reinforces or stresses the importance or truth of the first.',
    signalWords: ['indeed', 'in fact', 'notably', 'above all', 'especially', 'significantly', 'crucially'],
    testTip: '"In fact" and "indeed" emphasize that something is true and important.',
    commonMistake: 'Confusing emphasis with addition. "Indeed" confirms and stresses; "furthermore" adds a separate point.',
  },
  {
    slug: 'summary',
    label: 'Summary',
    description: 'The second idea draws a conclusion or sums up the preceding ideas.',
    signalWords: ['in summary', 'in conclusion', 'overall', 'to sum up', 'ultimately', 'in short', 'in brief'],
    testTip: 'Summary words signal wrapping up. The second sentence should capture the main takeaway.',
    commonMistake: 'Using "in conclusion" when the second sentence introduces new information rather than wrapping up.',
  },
]
