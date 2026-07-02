import type { MCATSection } from './types'

export const chemPhysSection: MCATSection = {
  id: 'chem-phys',
  title: 'Chemical and Physical Foundations of Biological Systems',
  abbreviation: 'Chem/Phys',
  questionCount: 59,
  seededCount: 20,
  timeMinutes: 95,
  breakAfterMinutes: 10,
  breakType: 'short',
  passages: [
    {
      id: 'cp-p1',
      sectionId: 'chem-phys',
      title: 'Passage 1',
      passageText: `The carbonate buffer system is the primary extracellular buffer in human blood, maintaining plasma pH near 7.4. This system consists of carbonic acid (H₂CO₃) and bicarbonate (HCO₃⁻), described by the equilibrium:

H₂CO₃ ⇌ H⁺ + HCO₃⁻     pKₐ = 6.1

Because dissolved CO₂ rapidly equilibrates with H₂CO₃ (via carbonic anhydrase), the effective pKₐ for the CO₂/HCO₃⁻ pair is often cited as 6.1. The Henderson-Hasselbalch equation describes the pH of this system:

pH = pKₐ + log([HCO₃⁻] / [CO₂])

Normal plasma values are [HCO₃⁻] ≈ 24 mM and [CO₂] ≈ 1.2 mM.

A researcher titrated a solution containing 0.10 M H₂CO₃ with 1.0 M NaOH. The resulting titration curve showed two distinct inflection points near pH 6.1 and pH 10.3, corresponding to the two ionization steps of carbonic acid.

At the half-equivalence points, the buffer capacity is maximal because the concentrations of acid and conjugate base are equal. The buffer capacity diminishes as the ratio of acid to base deviates from 1:1. A buffer resists pH changes most effectively within ±1 pH unit of its pKₐ.

Table 1 shows the pH measured after adding NaOH to the carbonate solution.

| Volume NaOH added (mL) | pH   |
|------------------------|------|
| 0                      | 3.7  |
| 5                      | 5.4  |
| 10                     | 6.1  |
| 15                     | 6.8  |
| 20                     | 8.4  |
| 25                     | 10.3 |
| 30                     | 11.9 |`,
      figures: [
        {
          type: 'table',
          title: 'Table 1: Titration of 0.10 M H₂CO₃ with 1.0 M NaOH',
          headers: ['Volume NaOH added (mL)', 'pH'],
          rows: [
            ['0', '3.7'], ['5', '5.4'], ['10', '6.1'],
            ['15', '6.8'], ['20', '8.4'], ['25', '10.3'], ['30', '11.9'],
          ],
        },
      ],
      questions: [
        {
          id: 'mcat1-cp-001',
          sectionId: 'chem-phys',
          passageId: 'cp-p1',
          questionType: 'passage',
          discipline: 'General Chemistry',
          contentCategory: 'Intermolecular forces and properties of solutions',
          foundationalConcept: 'FC 5: The principles that govern chemical interactions and reactions.',
          scientificSkill: 'Skill 1',
          difficulty: 'medium',
          question: 'Using the Henderson-Hasselbalch equation, what is the pH of normal blood plasma given [HCO₃⁻] = 24 mM and [CO₂] = 1.2 mM?',
          choices: [
            { label: 'A', text: '6.1' },
            { label: 'B', text: '7.1' },
            { label: 'C', text: '7.4' },
            { label: 'D', text: '8.1' },
          ],
          correctAnswer: 'C',
          explanation: 'pH = pKₐ + log([HCO₃⁻]/[CO₂]) = 6.1 + log(24/1.2) = 6.1 + log(20) = 6.1 + 1.30 = 7.4. This matches the normal blood pH.',
          wrongAnswerExplanations: {
            A: '6.1 is the pKₐ itself, not the solution pH. The pH differs from pKₐ when the ratio of base to acid is not 1:1.',
            B: '7.1 results from using log(10) = 1, which would require [HCO₃⁻]/[CO₂] = 10:1, not the 20:1 ratio given.',
            D: '8.1 would require a ratio of [HCO₃⁻]/[CO₂] ≈ 100:1, far above physiological values.',
          },
          teachingPoint: 'The Henderson-Hasselbalch equation: pH = pKₐ + log([A⁻]/[HA]). For blood: pH = 6.1 + log(24/1.2) = 6.1 + 1.3 = 7.4.',
          relatedTopics: ['buffer systems', 'Henderson-Hasselbalch', 'blood pH regulation', 'carbonate system'],
        },
        {
          id: 'mcat1-cp-002',
          sectionId: 'chem-phys',
          passageId: 'cp-p1',
          questionType: 'passage',
          discipline: 'General Chemistry',
          contentCategory: 'Acid-base equilibria',
          foundationalConcept: 'FC 5',
          scientificSkill: 'Skill 4',
          difficulty: 'medium',
          question: 'According to Table 1, at which volume of NaOH added does the first equivalence point occur?',
          choices: [
            { label: 'A', text: '5 mL' },
            { label: 'B', text: '10 mL' },
            { label: 'C', text: '20 mL' },
            { label: 'D', text: '25 mL' },
          ],
          correctAnswer: 'C',
          explanation: 'The first equivalence point occurs at pH ~8.4 (at 20 mL), midway between the two pKₐ values (6.1 and 10.3). At this point, all H₂CO₃ has been converted to HCO₃⁻. The half-equivalence point is at 10 mL (pH = pKₐ₁ = 6.1).',
          wrongAnswerExplanations: {
            A: '5 mL is before the half-equivalence point. The solution is still primarily H₂CO₃.',
            B: '10 mL is the first half-equivalence point (pH = pKₐ₁ = 6.1), where [H₂CO₃] = [HCO₃⁻], not the equivalence point.',
            D: '25 mL is the second half-equivalence point (pH = pKₐ₂ = 10.3), where [HCO₃⁻] = [CO₃²⁻].',
          },
          teachingPoint: 'In a diprotic acid titration, the first equivalence point occurs when all HA has been converted to A⁻. The half-equivalence point (pH = pKₐ) precedes it at half the equivalence volume.',
          relatedTopics: ['titration', 'equivalence point', 'diprotic acids', 'polyprotic acid titration'],
        },
        {
          id: 'mcat1-cp-003',
          sectionId: 'chem-phys',
          passageId: 'cp-p1',
          questionType: 'passage',
          discipline: 'General Chemistry',
          contentCategory: 'Acid-base equilibria',
          foundationalConcept: 'FC 5',
          scientificSkill: 'Skill 2',
          difficulty: 'medium',
          question: 'A patient with emphysema retains CO₂ due to impaired ventilation. How will this affect blood pH and [HCO₃⁻] initially?',
          choices: [
            { label: 'A', text: 'pH decreases; [HCO₃⁻] decreases' },
            { label: 'B', text: 'pH decreases; [HCO₃⁻] increases' },
            { label: 'C', text: 'pH increases; [HCO₃⁻] decreases' },
            { label: 'D', text: 'pH increases; [HCO₃⁻] increases' },
          ],
          correctAnswer: 'B',
          explanation: 'Retained CO₂ drives CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. This produces more H⁺ (lowering pH) and more HCO₃⁻ (raising [HCO₃⁻]). This is respiratory acidosis with compensatory bicarbonate rise.',
          wrongAnswerExplanations: {
            A: 'While pH does decrease, [HCO₃⁻] increases as CO₂ dissociates to form both H⁺ and HCO₃⁻.',
            C: 'Retained CO₂ increases H⁺, so pH decreases, not increases.',
            D: 'pH cannot increase when CO₂ is being retained — excess CO₂ drives the reaction toward acid production.',
          },
          teachingPoint: 'Respiratory acidosis from CO₂ retention: ↑CO₂ → ↑H₂CO₃ → ↑H⁺ + ↑HCO₃⁻. pH falls, [HCO₃⁻] rises acutely.',
          relatedTopics: ['respiratory acidosis', 'CO₂ retention', 'buffer equilibrium', 'carbonate system'],
        },
        {
          id: 'mcat1-cp-004',
          sectionId: 'chem-phys',
          passageId: 'cp-p1',
          questionType: 'passage',
          discipline: 'General Chemistry',
          contentCategory: 'Acid-base equilibria',
          foundationalConcept: 'FC 5',
          scientificSkill: 'Skill 2',
          difficulty: 'hard',
          question: 'The carbonate buffer system in blood operates at pH 7.4, which is more than 1 unit above its pKₐ of 6.1. Why is this system still physiologically effective despite being outside its ideal buffering range?',
          choices: [
            { label: 'A', text: 'The lungs can rapidly adjust [CO₂] by changing ventilation rate, making the system an open buffer.' },
            { label: 'B', text: 'At pH 7.4, [H₂CO₃] greatly exceeds [HCO₃⁻], providing a large reservoir of acid to neutralize bases.' },
            { label: 'C', text: 'The kidneys continuously produce H₂CO₃ to maintain the buffer ratio.' },
            { label: 'D', text: 'A second pKₐ at 10.3 provides additional buffering capacity near pH 7.4.' },
          ],
          correctAnswer: 'A',
          explanation: 'Although pH 7.4 is >1 unit from pKₐ 6.1, the respiratory system can rapidly adjust [CO₂] (and thus [H₂CO₃]). This makes the carbonate system an open system — unlike a closed buffer, [CO₂] is regulated, not fixed. This respiratory regulation dramatically expands effective buffering range.',
          wrongAnswerExplanations: {
            B: 'At pH 7.4, [HCO₃⁻] >> [H₂CO₃] (ratio ~20:1), so H₂CO₃ is the minor species, not the major one.',
            C: 'The kidneys regulate [HCO₃⁻], not [H₂CO₃]. H₂CO₃ arises from CO₂ hydration.',
            D: 'The second pKₐ (10.3) is even further from pH 7.4, providing no meaningful buffering at physiological pH.',
          },
          teachingPoint: 'The carbonate buffer is an open system: ventilation adjusts [CO₂] rapidly. This allows effective buffering even far from pKₐ — a key physiological feature.',
          relatedTopics: ['open buffer system', 'respiratory compensation', 'physiological buffering', 'ventilation and pH'],
        },
        {
          id: 'mcat1-cp-005',
          sectionId: 'chem-phys',
          passageId: 'cp-p1',
          questionType: 'passage',
          discipline: 'General Chemistry',
          contentCategory: 'Acid-base equilibria',
          foundationalConcept: 'FC 5',
          scientificSkill: 'Skill 2',
          difficulty: 'easy',
          question: 'At which pH from Table 1 is the buffer capacity of the carbonate system greatest for the first ionization step?',
          choices: [
            { label: 'A', text: '3.7' },
            { label: 'B', text: '6.1' },
            { label: 'C', text: '7.4' },
            { label: 'D', text: '10.3' },
          ],
          correctAnswer: 'B',
          explanation: 'Buffer capacity is maximal at pH = pKₐ, where [HA] = [A⁻]. For the first ionization of H₂CO₃, pKₐ₁ = 6.1, so maximum buffer capacity for this step occurs at pH 6.1 (10 mL NaOH added in Table 1).',
          wrongAnswerExplanations: {
            A: '3.7 is the initial pH with no buffer base present. Buffer capacity is low because [HCO₃⁻] ≈ 0.',
            C: '7.4 is physiological blood pH but is not near pKₐ₁ = 6.1, so buffer capacity for this step is reduced.',
            D: '10.3 is the pKₐ₂ — this is where the second ionization step has maximum buffer capacity.',
          },
          teachingPoint: 'Maximum buffer capacity occurs at pH = pKₐ where [acid] = [conjugate base]. For H₂CO₃, pKₐ₁ = 6.1.',
          relatedTopics: ['buffer capacity', 'pKₐ', 'half-equivalence point', 'acid-base'],
        },
      ],
    },
    {
      id: 'cp-p2',
      sectionId: 'chem-phys',
      title: 'Passage 2',
      passageText: `Enzyme kinetics can be described by the Michaelis-Menten model, where reaction velocity (v) depends on substrate concentration [S]:

v = Vmax[S] / (Km + [S])

Here Vmax is the maximum velocity and Km is the Michaelis constant — the substrate concentration at which v = Vmax/2. A low Km indicates high affinity between enzyme and substrate.

Inhibitors alter enzyme kinetics predictably. A competitive inhibitor binds the active site reversibly, competing with substrate. A noncompetitive inhibitor binds an allosteric site, reducing enzyme efficiency regardless of [S].

Researchers studied an enzyme catalyzing the first committed step of a biosynthetic pathway. They measured v at various [S] with and without two inhibitors (I₁ and I₂). They generated Lineweaver-Burk (double-reciprocal) plots: 1/v vs. 1/[S].

Results:
- No inhibitor: x-intercept = -0.5 mM⁻¹, y-intercept = 0.02 (µmol/min)⁻¹
- Inhibitor I₁: x-intercept = -0.25 mM⁻¹, y-intercept = 0.02 (µmol/min)⁻¹
- Inhibitor I₂: x-intercept = -0.5 mM⁻¹, y-intercept = 0.04 (µmol/min)⁻¹

On a Lineweaver-Burk plot, the y-intercept = 1/Vmax and the x-intercept = -1/Km. The slope = Km/Vmax.`,
      questions: [
        {
          id: 'mcat1-cp-006',
          sectionId: 'chem-phys',
          passageId: 'cp-p2',
          questionType: 'passage',
          discipline: 'Biochemistry',
          contentCategory: 'Enzyme structure and function',
          foundationalConcept: 'FC 1: Biomolecules have unique properties that determine how they contribute to the structure and function of cells.',
          scientificSkill: 'Skill 4',
          difficulty: 'medium',
          question: 'What is the Km of the uninhibited enzyme based on the Lineweaver-Burk data in the passage?',
          choices: [
            { label: 'A', text: '0.5 mM' },
            { label: 'B', text: '2 mM' },
            { label: 'C', text: '4 mM' },
            { label: 'D', text: '50 mM' },
          ],
          correctAnswer: 'B',
          explanation: 'On a Lineweaver-Burk plot, x-intercept = -1/Km. With x-intercept = -0.5 mM⁻¹, Km = 1/0.5 = 2 mM.',
          wrongAnswerExplanations: {
            A: '0.5 mM is the x-intercept value itself (in mM⁻¹), not Km. Km = 1/(|x-intercept|).',
            C: '4 mM would come from -1/Km = -0.25, which describes the inhibited enzyme I₁.',
            D: '50 mM is not derivable from the data. This appears to confuse y-intercept (0.02) with Km calculation.',
          },
          teachingPoint: 'Lineweaver-Burk: x-intercept = -1/Km, y-intercept = 1/Vmax. Km = -1/(x-intercept).',
          relatedTopics: ['Michaelis-Menten kinetics', 'Lineweaver-Burk plot', 'Km', 'enzyme affinity'],
        },
        {
          id: 'mcat1-cp-007',
          sectionId: 'chem-phys',
          passageId: 'cp-p2',
          questionType: 'passage',
          discipline: 'Biochemistry',
          contentCategory: 'Enzyme structure and function',
          foundationalConcept: 'FC 1',
          scientificSkill: 'Skill 4',
          difficulty: 'medium',
          question: 'Based on the Lineweaver-Burk data, which type of inhibition does I₁ represent?',
          choices: [
            { label: 'A', text: 'Competitive inhibition, because Km increases and Vmax is unchanged' },
            { label: 'B', text: 'Noncompetitive inhibition, because Km is unchanged and Vmax decreases' },
            { label: 'C', text: 'Competitive inhibition, because Vmax increases and Km decreases' },
            { label: 'D', text: 'Uncompetitive inhibition, because both Km and Vmax decrease proportionally' },
          ],
          correctAnswer: 'A',
          explanation: 'I₁ has the same y-intercept as the uninhibited enzyme (1/Vmax = 0.02 → Vmax unchanged), but a different x-intercept (-0.25 vs. -0.5), indicating Km increases from 2 mM to 4 mM. Unchanged Vmax + increased Km = competitive inhibition.',
          wrongAnswerExplanations: {
            B: 'This describes noncompetitive inhibition (I₂), not I₁. I₁ changes the x-intercept, not the y-intercept.',
            C: 'Competitive inhibitors always increase apparent Km (they compete with substrate). Vmax stays the same, not increases.',
            D: 'Uncompetitive inhibition decreases both Km and Vmax proportionally, shifting the LB line parallel. I₁ shows different x-intercepts, not the same slope.',
          },
          teachingPoint: 'Competitive: same y-intercept (Vmax unchanged), different x-intercept (Km increases). Noncompetitive: same x-intercept (Km unchanged), different y-intercept (Vmax decreases).',
          relatedTopics: ['competitive inhibition', 'noncompetitive inhibition', 'Lineweaver-Burk', 'enzyme kinetics'],
        },
        {
          id: 'mcat1-cp-008',
          sectionId: 'chem-phys',
          passageId: 'cp-p2',
          questionType: 'passage',
          discipline: 'Biochemistry',
          contentCategory: 'Enzyme structure and function',
          foundationalConcept: 'FC 1',
          scientificSkill: 'Skill 1',
          difficulty: 'easy',
          question: 'What effect does increasing substrate concentration to very high levels have on a competitive inhibitor\'s effect on reaction velocity?',
          choices: [
            { label: 'A', text: 'The inhibitor\'s effect is amplified because more substrate-inhibitor collisions occur' },
            { label: 'B', text: 'The inhibitor\'s effect is overcome and Vmax approaches the uninhibited value' },
            { label: 'C', text: 'Vmax is permanently reduced regardless of substrate concentration' },
            { label: 'D', text: 'The enzyme becomes permanently inactivated' },
          ],
          correctAnswer: 'B',
          explanation: 'Competitive inhibitors bind reversibly and compete with substrate for the active site. At very high [S], substrate outcompetes the inhibitor, and the reaction approaches uninhibited Vmax. This is the defining feature of competitive (reversible) inhibition.',
          wrongAnswerExplanations: {
            A: 'High [S] outcompetes the inhibitor rather than amplifying its effect. The inhibitor is displaced, not promoted.',
            C: 'Permanent Vmax reduction describes noncompetitive inhibition, not competitive. Competitive inhibition is overcome by excess substrate.',
            D: 'Permanent inactivation describes irreversible (suicide) inhibitors, not competitive inhibitors.',
          },
          teachingPoint: 'Competitive inhibition is reversible and overcome by excess substrate. Vmax is unchanged; only Km (apparent) increases.',
          relatedTopics: ['competitive inhibition', 'reversibility', 'Vmax', 'active site'],
        },
        {
          id: 'mcat1-cp-009',
          sectionId: 'chem-phys',
          passageId: 'cp-p2',
          questionType: 'passage',
          discipline: 'Biochemistry',
          contentCategory: 'Enzyme structure and function',
          foundationalConcept: 'FC 1',
          scientificSkill: 'Skill 2',
          difficulty: 'hard',
          question: 'The enzyme studied is the first committed step of a biosynthetic pathway. If the end product of this pathway acts as inhibitor I₂ (noncompetitive), what regulatory strategy does this represent?',
          choices: [
            { label: 'A', text: 'Substrate-level regulation' },
            { label: 'B', text: 'Allosteric feedback inhibition' },
            { label: 'C', text: 'Competitive product inhibition' },
            { label: 'D', text: 'Covalent enzyme modification' },
          ],
          correctAnswer: 'B',
          explanation: 'When the end product of a pathway inhibits an early (first committed) enzyme at an allosteric (non-active) site, this is feedback inhibition — a classic form of allosteric regulation. Noncompetitive inhibition fits the allosteric model (binds site other than active site).',
          wrongAnswerExplanations: {
            A: 'Substrate-level regulation involves the substrate itself altering the enzyme, not the downstream product.',
            C: 'Competitive product inhibition would involve the product binding the active site, increasing apparent Km. I₂ is noncompetitive (allosteric site).',
            D: 'Covalent modification (e.g., phosphorylation) involves chemical changes to the enzyme — not described here.',
          },
          teachingPoint: 'Allosteric feedback inhibition: pathway end product inhibits first committed enzyme at an allosteric site. Prevents overproduction of product. Often appears as noncompetitive inhibition kinetically.',
          relatedTopics: ['allosteric regulation', 'feedback inhibition', 'first committed step', 'biosynthetic pathway control'],
        },
        {
          id: 'mcat1-cp-010',
          sectionId: 'chem-phys',
          passageId: 'cp-p2',
          questionType: 'passage',
          discipline: 'Biochemistry',
          contentCategory: 'Enzyme structure and function',
          foundationalConcept: 'FC 1',
          scientificSkill: 'Skill 3',
          difficulty: 'hard',
          question: 'To confirm that I₁ is competitive rather than mixed, what experimental result would be most informative?',
          choices: [
            { label: 'A', text: 'Show that increasing [I₁] decreases Vmax' },
            { label: 'B', text: 'Show that at saturating [S], v approaches the same Vmax as the uninhibited enzyme' },
            { label: 'C', text: 'Show that I₁ does not bind the active site using X-ray crystallography' },
            { label: 'D', text: 'Show that the reaction still proceeds in the presence of I₁ at low [S]' },
          ],
          correctAnswer: 'B',
          explanation: 'The hallmark of pure competitive inhibition (vs. mixed) is that saturating [S] completely overcomes inhibition, restoring Vmax to the uninhibited value. If Vmax is unchanged at high [S], inhibition is purely competitive.',
          wrongAnswerExplanations: {
            A: 'If increasing [I₁] decreases Vmax, this would suggest mixed or noncompetitive inhibition, not pure competitive.',
            C: 'Crystallography showing non-active site binding would suggest allosteric/noncompetitive inhibition — contradicting competitive classification.',
            D: 'Activity at low [S] would occur with any reversible inhibitor. This does not distinguish competitive from mixed inhibition.',
          },
          teachingPoint: 'To confirm competitive inhibition: demonstrate that Vmax is unchanged at saturating substrate. The inhibitor is outcompeted by substrate, so v → Vmax.',
          relatedTopics: ['competitive vs. mixed inhibition', 'experimental design', 'Vmax determination', 'inhibition characterization'],
        },
      ],
    },
    {
      id: 'cp-p3',
      sectionId: 'chem-phys',
      title: 'Passage 3',
      passageText: `Blood flow through vessels follows principles of fluid dynamics. For laminar flow, the Hagen-Poiseuille equation describes volumetric flow rate (Q):

Q = (πr⁴ΔP) / (8ηL)

where r is vessel radius, ΔP is the pressure difference, η is blood viscosity, and L is vessel length. Resistance to flow (R) is therefore:

R = 8ηL / (πr⁴)

During atherosclerosis, plaques narrow the arterial lumen, reducing r. Because Q ∝ r⁴, small reductions in radius cause dramatic drops in flow. In a stenotic vessel, Bernoulli's principle governs local pressure:

P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂

For horizontal vessels (h₁ = h₂): P₁ + ½ρv₁² = P₂ + ½ρv₂²

Thus, at a stenosis where cross-sectional area decreases, blood velocity increases and local pressure falls. This creates the pressure gradient that can cause plaque rupture.

Clinicians use the ankle-brachial index (ABI) to assess peripheral artery disease. A normal ABI is 1.0–1.4. An ABI < 0.9 indicates significant stenosis.

Experiment: In an in vitro model, a tube of inner radius 3 mm was reduced to 1.5 mm at a 2 cm stenosis. Pressure drop across the stenosis was 20 mmHg at baseline flow of 60 mL/min.`,
      questions: [
        {
          id: 'mcat1-cp-011',
          sectionId: 'chem-phys',
          passageId: 'cp-p3',
          questionType: 'passage',
          discipline: 'Physics',
          contentCategory: 'Fluid statics and dynamics',
          foundationalConcept: 'FC 4: Complex living organisms transport materials, sense their environment, process signals, and respond to changes using processes understood in terms of physical principles.',
          scientificSkill: 'Skill 1',
          difficulty: 'medium',
          question: 'If the radius of an artery decreases from 3 mm to 1.5 mm due to plaque, by what factor does resistance to blood flow change?',
          choices: [
            { label: 'A', text: '2-fold increase' },
            { label: 'B', text: '4-fold increase' },
            { label: 'C', text: '8-fold increase' },
            { label: 'D', text: '16-fold increase' },
          ],
          correctAnswer: 'D',
          explanation: 'Resistance R ∝ 1/r⁴. When r decreases from 3 to 1.5 mm (factor of 2), R increases by 2⁴ = 16-fold. The r⁴ dependence makes even small radius reductions catastrophic for flow.',
          wrongAnswerExplanations: {
            A: '2-fold would apply if R ∝ 1/r (linear). Poiseuille\'s law has an r⁴ dependence.',
            B: '4-fold would apply if R ∝ 1/r². The actual exponent is 4, not 2.',
            C: '8-fold is not derived from Poiseuille\'s law. R ∝ 1/r⁴, so halving r gives 2⁴ = 16-fold increase.',
          },
          teachingPoint: 'Poiseuille: R = 8ηL/πr⁴, so R ∝ r⁻⁴. Halving radius increases resistance 16-fold. This is why even 50% stenosis severely reduces blood flow.',
          relatedTopics: ['Hagen-Poiseuille equation', 'vascular resistance', 'atherosclerosis', 'r⁴ dependence'],
        },
        {
          id: 'mcat1-cp-012',
          sectionId: 'chem-phys',
          passageId: 'cp-p3',
          questionType: 'passage',
          discipline: 'Physics',
          contentCategory: 'Fluid statics and dynamics',
          foundationalConcept: 'FC 4',
          scientificSkill: 'Skill 1',
          difficulty: 'medium',
          question: 'At the stenotic narrowing in the experiment, blood velocity increases. According to Bernoulli\'s principle, what happens to local blood pressure at the stenosis?',
          choices: [
            { label: 'A', text: 'Increases, because more blood passes per unit time' },
            { label: 'B', text: 'Decreases, because kinetic energy increases at the expense of pressure energy' },
            { label: 'C', text: 'Remains unchanged, because total blood volume is conserved' },
            { label: 'D', text: 'Increases, because the vessel wall exerts inward force on the blood' },
          ],
          correctAnswer: 'B',
          explanation: 'Bernoulli\'s principle: P + ½ρv² = constant (for horizontal flow). As v increases at the stenosis, ½ρv² increases, so P must decrease to conserve the sum. Pressure drops at the narrowing.',
          wrongAnswerExplanations: {
            A: 'More flow through the stenosis does not raise pressure — it raises velocity. Bernoulli shows the inverse relationship between velocity and pressure.',
            C: 'Volume conservation (continuity) explains why velocity increases, but Bernoulli\'s principle shows that pressure is not conserved — kinetic and potential energy exchange.',
            D: 'Vessel wall forces are not part of the Bernoulli analysis of ideal fluid flow, and inward wall force would not raise luminal pressure.',
          },
          teachingPoint: 'Bernoulli\'s principle: faster flow → lower pressure. At a stenosis: velocity↑ → pressure↓. This low pressure can cause vessel collapse or plaque rupture.',
          relatedTopics: ['Bernoulli\'s principle', 'fluid dynamics', 'stenosis', 'venturi effect'],
        },
        {
          id: 'mcat1-cp-013',
          sectionId: 'chem-phys',
          passageId: 'cp-p3',
          questionType: 'passage',
          discipline: 'Physics',
          contentCategory: 'Fluid statics and dynamics',
          foundationalConcept: 'FC 4',
          scientificSkill: 'Skill 4',
          difficulty: 'hard',
          question: 'In the experiment, when the tube radius was reduced to 1.5 mm (half of 3 mm), the pressure drop across the stenosis was 20 mmHg at 60 mL/min. If the stenosis is treated and radius restored to 3 mm, what would the new pressure drop be at the same flow rate, assuming laminar flow?',
          choices: [
            { label: 'A', text: '1.25 mmHg' },
            { label: 'B', text: '5 mmHg' },
            { label: 'C', text: '10 mmHg' },
            { label: 'D', text: '40 mmHg' },
          ],
          correctAnswer: 'A',
          explanation: 'ΔP = QR and R ∝ 1/r⁴. Doubling r reduces R by 2⁴ = 16. New ΔP = 20/16 = 1.25 mmHg. Restoring radius dramatically reduces the pressure gradient needed to drive flow.',
          wrongAnswerExplanations: {
            B: '5 mmHg would be 20/4, implying R ∝ 1/r², not 1/r⁴.',
            C: '10 mmHg would be 20/2, implying R ∝ 1/r. Poiseuille gives r⁴ dependence.',
            D: '40 mmHg would be doubling — this would apply if radius halving increased ΔP proportionally, but the question asks about doubling radius (which reduces R).',
          },
          teachingPoint: 'ΔP = Q × R. With R ∝ r⁻⁴, doubling r decreases R by 16×. So ΔP decreases 16-fold: 20/16 = 1.25 mmHg.',
          relatedTopics: ['Poiseuille\'s law', 'pressure drop', 'flow resistance', 'stenosis reversal'],
        },
        {
          id: 'mcat1-cp-014',
          sectionId: 'chem-phys',
          passageId: 'cp-p3',
          questionType: 'passage',
          discipline: 'Biology',
          contentCategory: 'Circulatory system',
          foundationalConcept: 'FC 4',
          scientificSkill: 'Skill 2',
          difficulty: 'easy',
          question: 'A patient has an ABI of 0.7. Which of the following best explains this finding based on passage information?',
          choices: [
            { label: 'A', text: 'Elevated blood pressure in the arm relative to the ankle' },
            { label: 'B', text: 'Significant peripheral arterial stenosis reducing ankle blood pressure' },
            { label: 'C', text: 'Increased cardiac output leading to higher brachial pressure' },
            { label: 'D', text: 'Vasodilation of peripheral arteries increasing ankle pressure' },
          ],
          correctAnswer: 'B',
          explanation: 'ABI = ankle pressure / brachial pressure. Normal ABI is 1.0–1.4. An ABI of 0.7 (<0.9) indicates ankle pressure is significantly lower than brachial pressure, consistent with peripheral arterial stenosis reducing blood flow (and pressure) to the ankle.',
          wrongAnswerExplanations: {
            A: 'ABI < 1.0 means ankle pressure < brachial pressure, so brachial pressure is higher — but this is because ankle pressure is low due to stenosis, not because arm pressure is artificially elevated.',
            C: 'Increased cardiac output would raise pressure throughout the body, including the ankle. This would not lower ABI.',
            D: 'Vasodilation would increase ankle pressure, raising (not lowering) ABI toward or above 1.0.',
          },
          teachingPoint: 'ABI < 0.9 indicates peripheral arterial disease. Stenosis reduces blood pressure distal to the obstruction → low ankle pressure → low ABI.',
          relatedTopics: ['ankle-brachial index', 'peripheral artery disease', 'blood pressure measurement', 'stenosis'],
        },
        {
          id: 'mcat1-cp-015',
          sectionId: 'chem-phys',
          passageId: 'cp-p3',
          questionType: 'passage',
          discipline: 'Physics',
          contentCategory: 'Fluid statics and dynamics',
          foundationalConcept: 'FC 4',
          scientificSkill: 'Skill 2',
          difficulty: 'medium',
          question: 'Turbulent flow occurs when the Reynolds number exceeds ~2000 in blood vessels. Compared to laminar flow, turbulent flow would most likely produce what clinical finding?',
          choices: [
            { label: 'A', text: 'Silent, smooth blood flow with no auscultatory findings' },
            { label: 'B', text: 'An audible bruit caused by chaotic pressure fluctuations' },
            { label: 'C', text: 'Decreased resistance to flow due to turbulent mixing' },
            { label: 'D', text: 'Increased oxygen delivery due to enhanced red cell mixing' },
          ],
          correctAnswer: 'B',
          explanation: 'Turbulent flow causes chaotic, swirling fluid motion with random pressure fluctuations. This generates vibrations audible as a bruit (vascular murmur) on auscultation. Bruits over arteries indicate turbulent flow, often from stenosis or arteriovenous malformations.',
          wrongAnswerExplanations: {
            A: 'Silent flow describes laminar flow. Turbulent flow is not silent — it generates audible sounds.',
            C: 'Turbulent flow increases resistance compared to laminar flow. The Hagen-Poiseuille equation applies only to laminar flow; turbulence dissipates more energy.',
            D: 'While mixing occurs, the primary clinical effect of turbulence is increased flow resistance and audible bruits, not enhanced oxygen delivery.',
          },
          teachingPoint: 'Turbulent flow produces audible bruits (vascular murmurs). It increases resistance compared to laminar flow and occurs at high Reynolds numbers, often near stenoses.',
          relatedTopics: ['Reynolds number', 'turbulent flow', 'bruit', 'laminar vs. turbulent flow'],
        },
      ],
    },
  ],
  discreteQuestions: [
    {
      id: 'mcat1-cp-016',
      sectionId: 'chem-phys',
      passageId: null,
      questionType: 'discrete',
      discipline: 'General Chemistry',
      contentCategory: 'Thermodynamics and thermochemistry',
      foundationalConcept: 'FC 5',
      scientificSkill: 'Skill 1',
      difficulty: 'medium',
      question: 'A biochemical reaction has ΔH = -40 kJ/mol and ΔS = -100 J/mol·K at 310 K (physiological temperature). What is ΔG, and will this reaction proceed spontaneously?',
      choices: [
        { label: 'A', text: 'ΔG = -71 kJ/mol; spontaneous' },
        { label: 'B', text: 'ΔG = -9 kJ/mol; spontaneous' },
        { label: 'C', text: 'ΔG = +9 kJ/mol; non-spontaneous' },
        { label: 'D', text: 'ΔG = +71 kJ/mol; non-spontaneous' },
      ],
      correctAnswer: 'B',
      explanation: 'ΔG = ΔH − TΔS. ΔS = −100 J/mol·K, so TΔS = (310)(−100) = −31,000 J/mol. ΔG = −40,000 − (−31,000) = −40,000 + 31,000 = −9,000 J/mol = −9 kJ/mol. Negative ΔG → spontaneous.',
      wrongAnswerExplanations: {
        A: '−71 kJ/mol comes from ΔG = ΔH + TΔS (wrong sign on TΔS). The formula is ΔH − TΔS.',
        C: '+9 kJ/mol comes from treating ΔS as positive (+100 J/mol·K) instead of negative. Sign errors in ΔS are common.',
        D: '+71 kJ/mol comes from both using the wrong formula (ΔH + TΔS) and a sign error on ΔS.',
      },
      teachingPoint: 'ΔG = ΔH − TΔS. Here: ΔG = −40 − (310)(−0.1) = −40 + 31 = −9 kJ/mol. Negative ΔG = spontaneous. When ΔH < 0 and ΔS < 0, spontaneity depends on temperature.',
      relatedTopics: ['Gibbs free energy', 'thermodynamics', 'spontaneity', 'enthalpy', 'entropy'],
    },
    {
      id: 'mcat1-cp-017',
      sectionId: 'chem-phys',
      passageId: null,
      questionType: 'discrete',
      discipline: 'General Chemistry',
      contentCategory: 'Atomic and nuclear structure',
      foundationalConcept: 'FC 4',
      scientificSkill: 'Skill 1',
      difficulty: 'easy',
      question: 'A radioactive isotope has a half-life of 6 hours. Starting with 80 mg, how much remains after 24 hours?',
      choices: [
        { label: 'A', text: '2.5 mg' },
        { label: 'B', text: '5 mg' },
        { label: 'C', text: '10 mg' },
        { label: 'D', text: '20 mg' },
      ],
      correctAnswer: 'B',
      explanation: '24 hours / 6 hours per half-life = 4 half-lives. Amount remaining = 80 × (1/2)⁴ = 80/16 = 5 mg.',
      wrongAnswerExplanations: {
        A: '2.5 mg would be 5 half-lives (80/32). 24 hours = 4 half-lives with t₁/₂ = 6 h.',
        C: '10 mg would be 3 half-lives (80/8). This assumes 24/6 = 3, but 24/6 = 4.',
        D: '20 mg would be 2 half-lives (80/4). 24 hours / 6 = 4 half-lives, not 2.',
      },
      teachingPoint: 'Number of half-lives = total time / half-life = 24/6 = 4. Amount = initial × (½)ⁿ = 80 × (½)⁴ = 80/16 = 5 mg.',
      relatedTopics: ['radioactive decay', 'half-life', 'nuclear chemistry', 'exponential decay'],
    },
    {
      id: 'mcat1-cp-018',
      sectionId: 'chem-phys',
      passageId: null,
      questionType: 'discrete',
      discipline: 'Organic Chemistry',
      contentCategory: 'Carbonyl chemistry',
      foundationalConcept: 'FC 5',
      scientificSkill: 'Skill 1',
      difficulty: 'medium',
      question: 'During fatty acid synthesis, malonyl-CoA undergoes decarboxylative condensation with acetyl-CoA to extend the chain by two carbons. The CO₂ released comes from which functional group?',
      choices: [
        { label: 'A', text: 'Thioester of acetyl-CoA' },
        { label: 'B', text: 'Carboxylate group of malonyl-CoA' },
        { label: 'C', text: 'Beta-keto group produced after condensation' },
        { label: 'D', text: 'Phosphate group of CoA' },
      ],
      correctAnswer: 'B',
      explanation: 'Malonyl-CoA (HOOC-CH₂-CO-SCoA) contains a carboxylate group that is lost as CO₂ during the decarboxylative Claisen condensation. The decarboxylation drives the thermodynamically unfavorable condensation forward. The CO₂ comes from the C1 carboxylate of malonyl-CoA.',
      wrongAnswerExplanations: {
        A: 'The thioester of acetyl-CoA is the electrophile attacked by the malonyl carbanion. It contributes carbons to the product, not the CO₂.',
        C: 'The beta-keto group forms after condensation and is reduced in subsequent steps. It does not release CO₂ during chain extension.',
        D: 'CoA contains a pantetheine-phosphate-adenosine structure. The phosphate is not involved in CO₂ release during condensation.',
      },
      teachingPoint: 'In fatty acid synthesis, malonyl-CoA\'s free carboxylate (C1) is lost as CO₂ during decarboxylative condensation. This CO₂ release provides thermodynamic driving force for chain extension.',
      relatedTopics: ['fatty acid synthesis', 'malonyl-CoA', 'decarboxylation', 'Claisen condensation', 'FAS enzyme'],
    },
    {
      id: 'mcat1-cp-019',
      sectionId: 'chem-phys',
      passageId: null,
      questionType: 'discrete',
      discipline: 'Physics',
      contentCategory: 'Atomic structure and spectra',
      foundationalConcept: 'FC 4',
      scientificSkill: 'Skill 1',
      difficulty: 'easy',
      question: 'An electron in a hydrogen atom transitions from n=3 to n=1. How does the energy and wavelength of the emitted photon compare to a transition from n=2 to n=1?',
      choices: [
        { label: 'A', text: 'Higher energy, shorter wavelength' },
        { label: 'B', text: 'Higher energy, longer wavelength' },
        { label: 'C', text: 'Lower energy, shorter wavelength' },
        { label: 'D', text: 'Lower energy, longer wavelength' },
      ],
      correctAnswer: 'A',
      explanation: 'The n=3→1 transition spans a larger energy gap than n=2→1. More energy released → higher energy photon. Since E = hc/λ, higher E corresponds to shorter λ. The n=3→1 transition emits UV light (Lyman series); n=2→1 emits lower-energy UV.',
      wrongAnswerExplanations: {
        B: 'Higher energy photons have shorter, not longer, wavelengths. E = hc/λ: E and λ are inversely proportional.',
        C: 'n=3→1 spans a larger gap than n=2→1, so more energy is released — not less.',
        D: 'Both premises are wrong: n=3→1 releases more energy (not less) with a shorter wavelength (not longer).',
      },
      teachingPoint: 'Larger energy gap → higher energy photon → shorter wavelength. E = hf = hc/λ. The n=3→1 jump is larger than n=2→1, so the emitted photon is more energetic and has a shorter wavelength.',
      relatedTopics: ['Bohr model', 'atomic emission', 'energy levels', 'photon wavelength', 'Lyman series'],
    },
    {
      id: 'mcat1-cp-020',
      sectionId: 'chem-phys',
      passageId: null,
      questionType: 'discrete',
      discipline: 'General Chemistry',
      contentCategory: 'Electrochemistry',
      foundationalConcept: 'FC 5',
      scientificSkill: 'Skill 1',
      difficulty: 'medium',
      question: 'A galvanic cell is constructed with Zn²⁺/Zn (E° = -0.76 V) and Cu²⁺/Cu (E° = +0.34 V) half-cells. What is the standard cell potential (E°cell) and which metal is oxidized?',
      choices: [
        { label: 'A', text: 'E°cell = +1.10 V; Zn is oxidized' },
        { label: 'B', text: 'E°cell = +1.10 V; Cu is oxidized' },
        { label: 'C', text: 'E°cell = -1.10 V; Zn is oxidized' },
        { label: 'D', text: 'E°cell = -0.42 V; Cu is oxidized' },
      ],
      correctAnswer: 'A',
      explanation: 'E°cell = E°cathode − E°anode. The more positive half-cell (Cu²⁺/Cu, +0.34 V) is the cathode (reduction). Zn/Zn²⁺ (−0.76 V) is the anode (oxidation). E°cell = 0.34 − (−0.76) = +1.10 V. Positive E°cell confirms spontaneous galvanic cell. Zn is oxidized.',
      wrongAnswerExplanations: {
        B: 'Cu is not oxidized — Cu²⁺ is reduced at the cathode. The stronger reducing agent (more negative E°) is oxidized: that is Zn.',
        C: 'A negative E°cell would mean a non-spontaneous reaction. Zn anode and Cu cathode gives a positive (spontaneous) cell.',
        D: '-0.42 V would come from adding E° values with wrong signs. E°cell = E°cathode − E°anode = 0.34 − (−0.76) = +1.10 V.',
      },
      teachingPoint: 'E°cell = E°cathode − E°anode. Reduction occurs at cathode (higher E°). Oxidation at anode (lower E°). Zn (-0.76 V) is oxidized; Cu²⁺ (+0.34 V) is reduced. E°cell = 0.34 - (-0.76) = +1.10 V.',
      relatedTopics: ['galvanic cell', 'standard reduction potential', 'electrochemistry', 'anode', 'cathode'],
    },
  ],
}
