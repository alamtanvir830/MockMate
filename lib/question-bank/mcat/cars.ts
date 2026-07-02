import type { MCATQBQuestion } from './types'

export const carsQuestions: MCATQBQuestion[] = [
  // ── Passage 1: Moral Epistemology (Q001–Q006) ─────────────────────────────────
  {
    id: 'mcat-qb-cars-001',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'Which of the following best states the main argument of the passage?',
    choices: [
      { label: 'A', text: 'Moral relativism is ultimately incoherent because it cannot account for the possibility of moral progress' },
      { label: 'B', text: 'The appeal to scientific methods in ethics is limited because moral disagreement, unlike scientific disagreement, cannot in principle be resolved by shared observation' },
      { label: 'C', text: 'Moral realism is preferable to moral relativism because cross-cultural convergence demonstrates the existence of objective moral facts' },
      { label: 'D', text: 'Both moral relativism and moral realism face significant objections, suggesting that neither view can fully account for moral disagreement and apparent progress' },
    ],
    correctAnswer: 'D',
    explanation: 'Choice D is correct. The passage introduces the science-morality analogy, critiques it, introduces moral relativism (with its advantages), then presents objections to moral relativism, then introduces moral realism and a response, then immediately introduces an objection to that realist response. The passage deliberately presents objections to both positions, ending with a challenge to moral realism rather than endorsing either view. The author\'s purpose is balanced critical analysis, not advocacy for either camp.',
    wrongAnswerExplanations: {
      A: 'While the passage mentions that moral relativism "carries uncomfortable implications" including the problem of moral progress, the author does not conclude that relativism is "ultimately incoherent." The passage also presents objections to moral realism in the final paragraph, suggesting the author takes a more balanced, uncommitted stance.',
      B: 'This captures the argument of the second paragraph accurately, but it is not the main argument of the entire passage. The passage goes on to introduce relativism, objections to relativism, moral realism, and objections to moral realism — a much broader structure than the science analogy alone.',
      C: 'The passage describes the moral realist\'s argument from convergence, but immediately follows it with a challenge: how do we know convergence reflects moral truth rather than shared evolutionary or economic pressures? The author does not endorse moral realism or declare it preferable.',
    },
    teachingPoint: 'Main idea questions require reading the full arc of the passage, not just the opening or any single paragraph. When a passage presents multiple positions and objections to each without resolving them, the main point is typically that the issue remains open and both sides face challenges — not that one side wins.',
    relatedTopics: ['Main idea', 'Author purpose', 'Balanced argument structure', 'Moral philosophy passage'],
  },
  {
    id: 'mcat-qb-cars-002',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'According to the passage, the moral relativist\'s position differs from subjectivism in that the relativist:',
    choices: [
      { label: 'A', text: 'locates moral truth in community frameworks rather than individual preferences' },
      { label: 'B', text: 'accepts that some communities have superior moral frameworks based on historical outcomes' },
      { label: 'C', text: 'believes that moral facts can be discovered through cross-cultural observation' },
      { label: 'D', text: 'holds that scientific methods can, in principle, adjudicate between competing moral frameworks' },
    ],
    correctAnswer: 'A',
    explanation: 'Choice A is correct. The passage explicitly states: "The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed." The key distinction drawn is that relativism anchors moral truth to community frameworks, not to individual preferences. This is a direct comprehension question with a textual answer.',
    wrongAnswerExplanations: {
      B: 'This directly contradicts the passage. Relativism explicitly denies that any community framework can be judged superior: "there is no standpoint outside all frameworks from which some can be judged superior to others." Ranking communities by historical outcomes would require a neutral meta-framework, which relativism rejects.',
      C: 'Cross-cultural moral observation (convergence) is the basis of the moral realist\'s argument, not the relativist\'s position. The relativist holds that different communities have different frameworks with no neutral adjudicator, which is inconsistent with seeking cross-cultural moral facts.',
      D: 'The passage argues the opposite: scientific observation cannot settle moral disagreement, and the passage describes this as a limitation of treating ethics like science. Relativism does not claim scientific methods can adjudicate moral frameworks.',
    },
    teachingPoint: 'For "according to the passage" questions, the answer must be directly supported by specific text. Look for the explicit distinction the author draws. In this case, the passage uses the word "subjectivism" and directly contrasts it with relativism in the third paragraph.',
    relatedTopics: ['Textual evidence', 'Relativism vs subjectivism', 'Detail comprehension', 'Philosophy passage'],
  },
  {
    id: 'mcat-qb-cars-003',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 2',
    difficulty: 'hard',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'If a historian discovered that the near-universal condemnation of gratuitous cruelty arose independently in cultures with completely different power structures, economic systems, and evolutionary pressures, this finding would most directly:',
    choices: [
      { label: 'A', text: 'undermine the moral relativist\'s claim that no framework can judge another superior' },
      { label: 'B', text: 'strengthen the moral realist\'s argument by addressing the objection raised in the final paragraph' },
      { label: 'C', text: 'demonstrate that convergence is sufficient to establish moral truth without further argument' },
      { label: 'D', text: 'support the author\'s conclusion that moral realism is preferable to moral relativism' },
    ],
    correctAnswer: 'B',
    explanation: 'Choice B is correct. The final paragraph presents the moral realist\'s argument from convergence but immediately raises the objection: how do we know convergence reflects genuine moral truth rather than shared evolutionary, economic, or power-structure pressures? The historian\'s finding — that condemning cruelty arose in cultures with completely different power structures, economic conditions, and evolutionary pressures — directly addresses this objection by ruling out those confounding explanations. This strengthens the realist\'s case that the convergence tracks something real.',
    wrongAnswerExplanations: {
      A: 'The finding does not directly challenge moral relativism\'s claim that no framework is superior; it addresses why convergent moral views might be evidence of moral facts. The passage specifically presents this as a debate within moral realism vs relativism, but the historian\'s finding primarily strengthens the realist response to the specific objection, not attacks relativism\'s core claim.',
      C: 'The passage does not assert that convergence alone is sufficient to establish moral truth — only that it is "defeasible, fallible evidence." The historian\'s finding strengthens the case for realism but establishing sufficiency would require a stronger claim than the passage supports.',
      D: 'The author does not conclude that moral realism is preferable — the passage ends with a question mark, suggesting both positions face challenges. The finding would strengthen a realist argument within the debate described, but the author\'s overall stance remains uncommitted.',
    },
    teachingPoint: 'Application questions require understanding the specific logical structure of an argument and its objections. Here, the realist argument (convergence = evidence of moral truth) faces a specific objection (convergence may reflect non-moral causes). New evidence that rules out those non-moral causes strengthens the realist argument by answering the objection.',
    relatedTopics: ['Strengthen/weaken reasoning', 'Evidence and objections', 'Logical structure of arguments', 'CARS application'],
  },
  {
    id: 'mcat-qb-cars-004',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'The passage\'s discussion of the abolitionists in the fourth paragraph primarily serves to:',
    choices: [
      { label: 'A', text: 'illustrate why the scientific model of moral inquiry is superior to relativism' },
      { label: 'B', text: 'show that moral progress is compatible with a relativist framework if the dominant community evolves' },
      { label: 'C', text: 'demonstrate an uncomfortable consequence of moral relativism by applying it to a historical case' },
      { label: 'D', text: 'provide evidence that the moral realist\'s argument from convergence is sound' },
    ],
    correctAnswer: 'C',
    explanation: 'Choice C is correct. The fourth paragraph opens with "Critics of moral relativism, however, point out that the view carries uncomfortable implications." The abolitionist example then illustrates one such implication: under relativism, abolitionists were not recognizing a truth but merely expressing a minority framework that would be "mistaken" by dominant-framework standards. The example is a rhetorical device used by the passage\'s critics of relativism to show what the view implies — a consequence the critics find troubling.',
    wrongAnswerExplanations: {
      A: 'The abolitionist example is used to critique relativism, not to advocate for scientific methods in ethics. The scientific model was discussed in paragraphs one and two, and the abolitionist example appears in a different context entirely.',
      B: 'The passage explicitly says that under relativism, the abolitionists were "expressing a minority framework that was, by the standards of the dominant framework, mistaken." This is presented as a problem for relativism, not a defense. The passage does not suggest that relativism can accommodate moral progress through community evolution.',
      D: 'The abolitionist example is a critique of relativism, not an argument for moral realism. The realist\'s argument (convergence across cultures) appears in the fifth paragraph. The two arguments serve different purposes in the passage.',
    },
    teachingPoint: 'Paragraph function questions ask why a specific piece of evidence or example appears where it does. Always identify the context: what claim precedes the example? What claim follows? Here, the example follows "carries uncomfortable implications," telling you it is an illustration of a problematic consequence, not a standalone argument.',
    relatedTopics: ['Paragraph function', 'Rhetorical purpose', 'Historical examples in argumentation', 'CARS structure'],
  },
  {
    id: 'mcat-qb-cars-005',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 2',
    difficulty: 'hard',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'A moral philosopher argues: "The widespread cross-cultural endorsement of fairness norms in economic exchanges suggests these norms reflect an objective moral truth accessible to rational beings in any society." The author of the passage would most likely respond that this argument:',
    choices: [
      { label: 'A', text: 'is sound, because it demonstrates the kind of convergence that moral realists rely on' },
      { label: 'B', text: 'is vulnerable to the objection that such convergence might reflect evolutionary or economic pressures rather than moral facts' },
      { label: 'C', text: 'succeeds in refuting moral relativism because fairness norms cannot be derived from cultural frameworks alone' },
      { label: 'D', text: 'mischaracterizes the moral realist position by equating convergence with consensus rather than truth' },
    ],
    correctAnswer: 'B',
    explanation: 'Choice B is correct. The passage\'s final paragraph directly addresses this type of argument: convergence of moral views is evidence for the moral realist, but the passage raises the worry that convergence might reflect "shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth." The philosopher\'s fairness-norm argument is exactly the type of convergence argument the passage describes — and the passage says such arguments face the difficulty of distinguishing genuine moral convergence from convergence with non-moral causes. Economic exchanges and evolutionary pressures (reciprocal altruism) are precisely the non-moral sources that might explain fairness norms.',
    wrongAnswerExplanations: {
      A: 'The author does not endorse the convergence argument as sound; the passage ends by raising a serious objection to it. Describing it as "sound" would be the moral realist\'s view, not the passage author\'s measured, critical stance.',
      C: 'The passage does not conclude that convergence-based arguments succeed in refuting relativism. The passage presents both positions and both objections, leaving the question open. The author would not say any argument definitively succeeds in refuting relativism.',
      D: 'The passage does not distinguish between convergence and consensus in the way this choice suggests. The author\'s objection to the realist is about non-moral causes of convergence, not a definitional confusion between convergence and consensus.',
    },
    teachingPoint: 'Applying author logic to new scenarios requires identifying the author\'s key critical moves and applying them consistently. The passage\'s critical move against the realist position is: convergence ≠ moral truth because convergence may have non-moral explanations. Apply that same move to any new convergence argument.',
    relatedTopics: ['Author perspective', 'Applying logic to new scenarios', 'Inference', 'Evaluating arguments'],
  },
  {
    id: 'mcat-qb-cars-006',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Philosophy',
    contentCategory: 'Ethical reasoning',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'easy',
    questionType: 'passage',
    passageText: `There is a persistent temptation in moral philosophy to treat ethical propositions as if they were scientific ones — as claims whose truth can be settled by patient accumulation of evidence and the steady refinement of theory. This temptation is understandable. Science has proven extraordinarily successful at generating agreement across cultures and generations, and agreement, we often assume, is a marker of truth. If moral reasoning could produce similar convergence, we might feel more confident that our ethical judgments are tracking something real rather than merely reflecting the contingencies of upbringing and culture.

But the analogy between scientific and moral inquiry breaks down at a crucial juncture. In science, disagreement is typically resolvable in principle, even if not always in practice, by appeal to shared observation. The scientist who doubts that water boils at 100°C at sea level need only heat water and watch. Moral disagreement, however, is rarely settled by any analogous observation. The person who sincerely believes that breaking a promise is sometimes permissible and the person who holds it never is do not seem to be disagreeing about any observable fact; they seem to disagree about the very framework by which facts become morally relevant.

This has led some philosophers to embrace a robust form of moral relativism: the view that moral claims are true only relative to the normative framework of a particular community, and that there is no standpoint outside all frameworks from which some can be judged superior to others. The relativist does not say that morality is merely a matter of personal preference — that would be subjectivism. The relativist says, more precisely, that moral truth is community-indexed: what is right within the framework of society A need not be right within the framework of society B, and no neutral third framework exists to adjudicate between them.

Critics of moral relativism, however, point out that the view carries uncomfortable implications. If moral relativism is correct, then the abolitionists who condemned slavery in nineteenth-century America were not discovering a moral truth that their society had failed to recognize; they were merely expressing a minority framework that was, by the standards of the dominant framework, mistaken. Similarly, moral progress — the confidence we have that our current ethical views are in some ways better than those of earlier periods — becomes incoherent: one cannot improve toward a truth that does not exist outside a given framework.

The moral realist responds by arguing that convergence of moral views across independent cultures and historical periods is evidence — defeasible, fallible evidence — that those converging views are tracking something real. The near-universal condemnation of gratuitous cruelty, for instance, does not look like a parochial preference; it looks like the recognition of a moral fact. Yet this response faces its own difficulty: how do we distinguish genuine moral convergence from convergence driven by shared power structures, economic conditions, or evolutionary pressures that have nothing to do with moral truth?`,
    question: 'The author describes the moral realist\'s evidence from convergence as "defeasible, fallible." In using these terms, the author most likely intends to convey that:',
    choices: [
      { label: 'A', text: 'convergence cannot serve as evidence for moral facts under any circumstances' },
      { label: 'B', text: 'the realist\'s evidence is strong enough to definitively establish moral realism' },
      { label: 'C', text: 'the convergence evidence is suggestive but can be overridden by countervailing evidence or explanations' },
      { label: 'D', text: 'moral realists are wrong to cite convergence because the realist position is ultimately incoherent' },
    ],
    correctAnswer: 'C',
    explanation: 'Choice C is correct. "Defeasible" means capable of being overridden by countervailing evidence — it is not absolute proof but prima facie evidence that can be defeated. "Fallible" means subject to error. Together, these terms signal that the author treats convergence as genuine (but provisional) evidence for moral realism — evidence that can be undermined if an alternative explanation (like evolutionary pressure) accounts for the convergence. This is a nuanced, middle-ground characterization: evidence that matters but is not conclusive.',
    wrongAnswerExplanations: {
      A: '"Defeasible" does not mean useless or inadmissible as evidence — it means the evidence can be overridden, not that it should be ignored. The author explicitly calls it evidence, just qualified evidence.',
      B: 'The opposite of the intended meaning. Calling evidence "defeasible and fallible" is a way of qualifying its strength, not affirming its sufficiency. These terms introduce doubt, not certainty.',
      D: 'The passage does not conclude that moral realism is incoherent. That charge is leveled against moral relativism (in the form of the moral progress objection). The author ends the passage with an unanswered question about moral realism, not a declaration of incoherence.',
    },
    teachingPoint: 'Vocabulary-in-context questions ask about the author\'s intended meaning. "Defeasible" is a technical philosophical term meaning "capable of being defeated (overridden) by evidence." The author qualifies the convergence argument to show it is genuine but not conclusive evidence — a measured epistemic stance consistent with the balanced tone of the passage.',
    relatedTopics: ['Vocabulary in context', 'Author tone', 'Inference from word choice', 'Epistemology vocabulary'],
  },

  // ── Passage 2: Art Criticism and Authenticity (Q007–Q012) ─────────────────────
  {
    id: 'mcat-qb-cars-007',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'The author introduces the "attribution premium" in the final paragraph primarily to:',
    choices: [
      { label: 'A', text: 'provide economic evidence that the formal properties of art are ultimately more important than provenance' },
      { label: 'B', text: 'demonstrate that the intentionalist assumption has been vindicated by art market behavior' },
      { label: 'C', text: 'illustrate a tension between formalist theory and actual audience behavior regarding art' },
      { label: 'D', text: 'argue that authenticity has no genuine aesthetic significance and that art markets are irrational' },
    ],
    correctAnswer: 'C',
    explanation: 'Choice C is correct. The final paragraph introduces the attribution premium precisely to highlight the gap between formalist theory (attribution shouldn\'t matter) and how art audiences actually behave (attribution dramatically affects value). The author uses this as evidence of a tension or inconsistency — people say they care about formal properties but behave as if authenticity matters enormously. The paragraph serves to show that formalism may be theoretically compelling but doesn\'t describe how audiences actually respond to art.',
    wrongAnswerExplanations: {
      A: 'The attribution premium actually suggests the opposite of what this choice claims: audiences behave as if provenance (authenticity) matters more than or in addition to formal properties, not that formal properties are paramount.',
      B: 'The intentionalist assumption is about the creator\'s intended meaning, not about who created a work. Attribution to a canonical master reflects concern with authenticity and provenance, which is related to but distinct from intentionalism as described in paragraph one.',
      D: 'The author does not argue that art markets are irrational or that authenticity has no aesthetic significance. The final sentence suggests authenticity may have genuine aesthetic significance "that cannot be captured in purely formal terms" — the opposite of dismissing it.',
    },
    teachingPoint: 'When an author introduces new evidence or an example, ask: what position or claim does it support or complicate? The attribution premium complicates formalism (which predicts attribution shouldn\'t matter) by showing that actual behavior contradicts the theory. This is a classic rhetorical move: using observed behavior to challenge a theoretical prediction.',
    relatedTopics: ['Paragraph function', 'Evidence and argument', 'Theory vs observation', 'Art criticism passage'],
  },
  {
    id: 'mcat-qb-cars-008',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'easy',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'According to the passage, what distinguishes the formalist critique of intentionalism from Barthes\'s "death of the author" critique?',
    choices: [
      { label: 'A', text: 'Formalism denies that authorial intention affects aesthetic value; Barthes denies that meaning is determined by the author at all' },
      { label: 'B', text: 'Formalism applies only to music and poetry; Barthes applied his theory only to novels and literature' },
      { label: 'C', text: 'Formalism accepts that the author\'s identity matters for market value; Barthes denies any role for authorial identity' },
      { label: 'D', text: 'Formalism locates value in audience experience; Barthes locates value in the formal properties of the work' },
    ],
    correctAnswer: 'A',
    explanation: 'Choice A is correct. The passage states that formalists argue "aesthetic value resides not in...the creator\'s intentions, but in the formal properties of the work itself" — intention doesn\'t affect aesthetic value. Barthes goes further, arguing that authorial intention is "not merely insufficient to determine meaning — it is irrelevant to it" and that meaning is "constituted anew with each act of reading." Formalism redirects value from intention to formal properties; Barthes makes the stronger claim that the author has no privileged authority over meaning at all.',
    wrongAnswerExplanations: {
      B: 'The passage applies formalism to poems and symphonies and Barthes to novels, but the passage does not claim these are exclusive domains. Both theories are general aesthetic theories, not limited to specific art forms. The examples are illustrative.',
      C: 'Formalism says attribution is irrelevant to aesthetic value, not that identity matters for market value — in fact, the passage suggests formalism implies attribution SHOULD be irrelevant to market value, in tension with actual market behavior.',
      D: 'The passage never says formalism locates value in audience experience; it locates value in "the formal properties of the work itself." Barthes locates meaning in the reader and intertextual codes, not in formal properties.',
    },
    teachingPoint: 'When a passage distinguishes between multiple related theories, focus on the specific claims each theory makes, not just their general orientation. Here: formalism = value in formal properties (intention irrelevant to value); Barthes = author has no privileged authority over meaning (intention irrelevant to meaning).',
    relatedTopics: ['Comparing positions', 'Detail comprehension', 'Theory distinctions', 'Art criticism passage'],
  },
  {
    id: 'mcat-qb-cars-009',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 2',
    difficulty: 'hard',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'A musicologist argues that a computer-generated symphony, indistinguishable from a human composition, deserves the same aesthetic valuation as the human work because the formal properties are identical. Which of the theories discussed in the passage would most strongly support this view?',
    choices: [
      { label: 'A', text: 'Intentionalism, because the computer generates structures that approximate human intentions' },
      { label: 'B', text: 'Formalism, because aesthetic value resides in formal properties, which are the same regardless of origin' },
      { label: 'C', text: 'The "death of the author" view, because neither the computer nor the human composer has privileged authority over meaning' },
      { label: 'D', text: 'The authenticity view implied in the final paragraph, because causal origin cannot be separated from aesthetic value' },
    ],
    correctAnswer: 'B',
    explanation: 'Choice B is correct. Formalism explicitly holds that "aesthetic value resides not in the relationship between a work and its creator\'s intentions, but in the formal properties of the work itself." If a computer-generated symphony has identical formal properties to a human composition, formalism entails identical aesthetic value, regardless of who or what created it. The musicologist\'s argument maps perfectly onto the formalist position.',
    wrongAnswerExplanations: {
      A: 'Intentionalism requires intentions from an intentional agent (a human mind with goals and purposes). A computer generating music does not have intentions in the relevant sense, so intentionalism would likely not support equal valuation — it would either require human-like intention or would deny the computer\'s output the same aesthetic status.',
      C: 'The death-of-the-author view is about the irrelevance of authorial authority over meaning — it says meaning is reader-constituted. While this view might not care who composed the work, the question asks which theory most "strongly supports" equal valuation based on formal identity, and formalism is more directly relevant.',
      D: 'The authenticity view (final paragraph) holds that the causal connection to a canonized creator has aesthetic significance. A computer-generated piece lacks this causal connection to a human canonized master, so the authenticity view would work against equal valuation, not support it.',
    },
    teachingPoint: 'Application questions ask you to map a new scenario onto a theory described in the passage. The key is to identify the central claim of each theory and ask: which claim most directly implies the conclusion in the question? Formalism\'s core claim (value is in formal properties) directly implies equal value for formally identical works regardless of origin.',
    relatedTopics: ['Theory application', 'Applying passage logic', 'Formalism', 'Inference questions'],
  },
  {
    id: 'mcat-qb-cars-010',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'The passage implies that the author\'s own view on the aesthetics of authenticity is best described as:',
    choices: [
      { label: 'A', text: 'skeptical: authenticity is an irrational bias that should be corrected by proper formalist training' },
      { label: 'B', text: 'sympathetic: the intuition that authenticity has aesthetic significance may be genuine and not easily dismissed' },
      { label: 'C', text: 'dismissive: attributing aesthetic value to provenance confuses economic and aesthetic categories' },
      { label: 'D', text: 'committed: the author explicitly endorses the authenticity view over formalism and intentionalism' },
    ],
    correctAnswer: 'B',
    explanation: 'Choice B is correct. The final sentence says the persistence of the attribution premium "may reflect a deep and not easily dismissible intuition that authenticity...has aesthetic significance that cannot be captured in purely formal terms." The phrase "not easily dismissible" indicates the author takes this intuition seriously, and the phrase "may reflect" indicates careful, non-dogmatic consideration. This is a sympathetic but uncommitted stance toward the authenticity view.',
    wrongAnswerExplanations: {
      A: 'The passage does not characterize the attribution premium as an irrational bias or suggest it should be corrected. The author says the intuition behind it is "not easily dismissible," which suggests a degree of intellectual respect, not skeptical dismissal.',
      C: 'The passage never accuses audiences of confusing economic and aesthetic categories. The author acknowledges that market value and authenticity may both reflect genuine aesthetic concern rather than a category error.',
      D: 'The author uses hedged language throughout: "may reflect," "not easily dismissible," "suggests." This indicates careful agnosticism, not explicit endorsement. The author never says the authenticity view is correct, only that the intuition behind it deserves consideration.',
    },
    teachingPoint: 'Author tone questions require close attention to hedging language. "May reflect" and "not easily dismissible" are careful, non-committal phrases that signal the author is taking an idea seriously without endorsing it. Distinguish between "the author considers this view" (sympathetic without commitment) vs "the author endorses this view" (explicit commitment).',
    relatedTopics: ['Author tone', 'Inference from hedging language', 'Author\'s implicit position', 'Close reading'],
  },
  {
    id: 'mcat-qb-cars-011',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 2',
    difficulty: 'hard',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'Which of the following, if true, would most weaken the author\'s suggestion that the attribution premium reflects a genuine aesthetic intuition?',
    choices: [
      { label: 'A', text: 'Studies show that trained art critics rate formally identical paintings equally regardless of attribution' },
      { label: 'B', text: 'The attribution premium is larger for works by living artists than for historical masters' },
      { label: 'C', text: 'Art forgeries are sometimes preferred by critics to the originals in blind evaluations, but their market value drops dramatically once the forgery is discovered' },
      { label: 'D', text: 'Research shows that the attribution premium correlates with the perceived rarity of the attributed artist\'s work rather than with qualitative appreciation' },
    ],
    correctAnswer: 'D',
    explanation: 'Choice D is correct. The author suggests the attribution premium "may reflect a deep...intuition that authenticity...has aesthetic significance." If the premium actually correlates with perceived rarity (a purely economic scarcity effect) rather than qualitative aesthetic appreciation, then the premium is driven by market economics rather than genuine aesthetic intuition. This would undermine the author\'s suggestion that the premium reflects aesthetic rather than economic considerations.',
    wrongAnswerExplanations: {
      A: 'If trained critics rate formally identical works equally regardless of attribution, this actually supports formalism, but it concerns trained critics specifically — not general audiences. The passage discusses the behavior of "art audiences" broadly. Also, the passage\'s point about the attribution premium involves market value and broader critical esteem, not just expert panel ratings, so this evidence doesn\'t fully undermine the claim.',
      B: 'The attribution premium being larger for living artists doesn\'t clearly weaken the authenticity-as-aesthetic-significance argument; it might just reflect different market dynamics for contemporary vs historical art without addressing whether the premium reflects genuine aesthetic intuition.',
      C: 'This scenario actually supports the author\'s suggestion: if market value drops when forgery is discovered even though the object\'s formal properties are identical, this is consistent with audiences caring about authenticity in a way that goes beyond formal properties. This would strengthen, not weaken, the author\'s claim.',
    },
    teachingPoint: 'Weaken questions require finding evidence that specifically undermines the reasoning or claim. The claim here is that the attribution premium reflects genuine aesthetic intuition about authenticity. To weaken this, find evidence that the premium has a non-aesthetic explanation (e.g., scarcity, investment value, social signaling). Rarity/scarcity is the best alternative explanation.',
    relatedTopics: ['Strengthen/weaken reasoning', 'Evaluating evidence', 'Alternative explanations', 'Critical reasoning'],
  },
  {
    id: 'mcat-qb-cars-012',
    test: 'MCAT',
    section: 'cars',
    discipline: 'Arts and Humanities',
    contentCategory: 'Art criticism',
    foundationalConcept: 'CARS: Critical analysis and reasoning',
    scientificSkill: 'Skill 1',
    difficulty: 'medium',
    questionType: 'passage',
    passageText: `For much of the twentieth century, the prevailing theory of aesthetic value in the fine arts rested on what we might call the intentionalist assumption: that the meaning and value of a work of art are fundamentally determined by the intentions of its creator. On this view, to understand a painting is to understand what the painter meant to communicate; to evaluate a piece of music is to assess how well the composer realized her intended effect. The artwork, in this framework, is essentially a vehicle for the transmission of the artist's vision, and the critic's task is interpretive archaeology — excavating the intentions buried in the work.

The formalist tradition mounted a powerful challenge to this view. The formalists argued that aesthetic value resides not in the relationship between a work and its creator's intentions, but in the formal properties of the work itself — its internal structures, relationships, tensions, and resolutions. On the formalist account, a poem can be great even if the poet who wrote it was completely unconscious of why it works; a symphony can be sublime even if its composer was a mediocre and uninspired individual. Value, on this view, is in the object, not in the psychology of its producer.

The most radical challenge to intentionalism came from Roland Barthes's declaration of the "death of the author." Barthes argued that once a text is produced, the author ceases to have any privileged authority over its interpretation. The text enters a field of intertextual references, cultural codes, and reader-generated meanings that exceed and transform whatever the author intended. The meaning of a novel, on this view, is not found in the author's consciousness but is constituted anew with each act of reading. Authorial intention is not merely insufficient to determine meaning — it is irrelevant to it.

The authenticity debate in art markets has brought these questions out of the seminar room and into the courtroom. When a previously unknown painting is attributed to Vermeer, its market value increases by orders of magnitude — not because the physical properties of the paint or canvas have changed, but because its provenance has. Yet if formalism is correct, attribution should be irrelevant to aesthetic value: the painting is equally beautiful whether Vermeer painted it or an anonymous seventeenth-century Dutch master with identical technique. If the Barthesian view is correct, it is even less clear why we should care who painted it at all.

The persistence of the attribution premium — the dramatic increase in market and critical esteem that follows successful attribution to a canonical master — suggests that art audiences do not actually behave as formalists. They care about who made a thing, not just what it looks like. This may reflect a deep and not easily dismissible intuition that authenticity — the genuine causal connection between a canonized artist and the object in front of us — has aesthetic significance that cannot be captured in purely formal terms.`,
    question: 'The author uses the phrase "interpretive archaeology" to describe the intentionalist critic\'s task. This metaphor most likely implies that:',
    choices: [
      { label: 'A', text: 'critical interpretation is a destructive process that distorts the original artwork' },
      { label: 'B', text: 'artistic meaning is buried and hidden, requiring effortful excavation to uncover the creator\'s intentions' },
      { label: 'C', text: 'art from ancient civilizations is more amenable to intentionalist criticism than contemporary art' },
      { label: 'D', text: 'critics should study the historical context of artworks rather than their formal properties' },
    ],
    correctAnswer: 'B',
    explanation: 'Choice B is correct. "Archaeology" involves careful excavation to uncover buried artifacts. The metaphor "interpretive archaeology" maps onto the intentionalist critic\'s task: the artist\'s intentions are "buried" in the work, and the critic must carefully "excavate" (interpret) the work to recover them. The passage makes this explicit: "the critic\'s task is interpretive archaeology — excavating the intentions buried in the work." The parenthetical gloss ("excavating the intentions buried in the work") confirms this is the intended meaning.',
    wrongAnswerExplanations: {
      A: 'The metaphor does not imply destruction. Archaeology can be careful and preservation-oriented. The passage does not suggest intentionalist criticism distorts the work.',
      C: 'The metaphor says nothing about ancient vs contemporary art. The "archaeology" here is metaphorical (digging for intentions), not literally about ancient civilizations or the age of artworks.',
      D: 'Historical context study is one approach in art history but is not what the metaphor specifically implies. The metaphor focuses on recovering the creator\'s intentions specifically, not on historical context more broadly.',
    },
    teachingPoint: 'Metaphor questions require extracting the analogical relationship. What do archaeologists do? Excavate buried things. What does the author compare to archaeology? Criticism as excavating intentions. The passage even provides an explicit parenthetical gloss that confirms the intended meaning — always check if the author explains their own metaphors.',
    relatedTopics: ['Figurative language', 'Author\'s word choice', 'Metaphor and analogy', 'Close reading'],
  },
]
