import type { MCATPassage } from '../types'

// Form 3 C/P — Passages 1–5
// IDs: mcat3-cp-001 through mcat3-cp-024 (5 passages × ~5q average = 24 questions)

export const chemPhysPassages3_01to05: MCATPassage[] = [
  // ─── C/P Passage 1: Electrochemical Cells ────────────────────────────────────
  {
    id: 'f3-cp-p1',
    sectionId: 'chem-phys',
    title: 'Electrochemical Cells and the Nernst Equation',
    passageText: `Electrochemical cells convert chemical energy to electrical energy (galvanic cells) or vice versa (electrolytic cells). The electromotive force (EMF) of a galvanic cell is determined by the standard reduction potentials of its half-reactions: E°cell = E°cathode − E°anode. The cathode undergoes reduction; the anode undergoes oxidation.

Under non-standard conditions, the Nernst equation relates the actual cell potential (E) to the standard cell potential (E°) and the reaction quotient (Q):

E = E° − (RT/nF) × ln(Q)

At 25°C, using log base 10: E = E° − (0.0592/n) × log(Q)

where n is the number of moles of electrons transferred and F is the Faraday constant (96,485 C/mol).

A researcher constructs a galvanic cell with a zinc anode (Zn²⁺/Zn, E° = −0.76 V) and a copper cathode (Cu²⁺/Cu, E° = +0.34 V). The cell operates at 25°C.

At equilibrium, the cell potential equals zero. The relationship between E°cell and the equilibrium constant K is:

E°cell = (RT/nF) × ln(K) = (0.0592/n) × log(K)

Electrolytic cells require an applied external voltage exceeding the cell's decomposition potential to drive a thermodynamically unfavorable reaction. The minimum external voltage required equals the magnitude of the cell potential for the reverse reaction.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-001',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p1',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'easy',
        question: 'What is the standard cell potential (E°cell) for the zinc-copper galvanic cell described?',
        choices: [
          { label: 'A', text: '−1.10 V' },
          { label: 'B', text: '+0.42 V' },
          { label: 'C', text: '+1.10 V' },
          { label: 'D', text: '+0.76 V' },
        ],
        correctAnswer: 'C',
        explanation: 'E°cell = E°cathode − E°anode = (+0.34 V) − (−0.76 V) = +1.10 V. The copper half-cell is the cathode (more positive reduction potential, undergoes reduction). The zinc half-cell is the anode (more negative reduction potential, undergoes oxidation). C is correct. A inverts the sign. B and D are calculation errors.',
        wrongAnswerExplanations: {
          A: '−1.10 V would result from subtracting in the wrong order (E°anode − E°cathode). The cathode always has the higher reduction potential in a spontaneous galvanic cell.',
          B: '0.42 V is not a valid combination of these two potentials. Double-check: +0.34 − (−0.76) = +0.34 + 0.76 = +1.10 V.',
          D: '0.76 V is simply the magnitude of the zinc reduction potential, not E°cell.',
        },
        teachingPoint: 'E°cell = E°cathode − E°anode. Always subtract the anode from the cathode (both written as reduction potentials). Positive E°cell → spontaneous reaction → negative ΔG°. Mnemonic: "Red Cat, An Ox" — cathode = reduction, anode = oxidation.',
        relatedTopics: ['galvanic cell', 'E°cell', 'standard reduction potential', 'cathode/anode'],
      },
      {
        id: 'mcat3-cp-002',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p1',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'For the zinc-copper cell, if [Zn²⁺] = 0.01 M and [Cu²⁺] = 1.0 M, how does the actual cell potential compare to E°cell? (n = 2)',
        choices: [
          { label: 'A', text: 'E < E°cell because Q > 1' },
          { label: 'B', text: 'E < E°cell because Q < 1' },
          { label: 'C', text: 'E = E°cell because Q = 1' },
          { label: 'D', text: 'E > E°cell because Q < 1' },
        ],
        correctAnswer: 'D',
        explanation: 'The overall cell reaction is: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Q = [Zn²⁺]/[Cu²⁺] = 0.01/1.0 = 0.01. Q < 1. Nernst: E = E° − (0.0592/2) × log(0.01) = 1.10 − (0.0296) × (−2) = 1.10 + 0.059 ≈ 1.16 V. Since Q < 1, log(Q) < 0, so −log(Q) > 0, meaning E > E°. D is correct. When Q < 1, reactant concentrations are high relative to products → reaction is more favorable → E > E°.',
        wrongAnswerExplanations: {
          A: 'Q = 0.01 < 1, not > 1. When Q > 1, E < E°. Here Q < 1, so E > E°.',
          C: 'Q = 0.01/1.0 = 0.01 ≠ 1. Only when [Zn²⁺] = [Cu²⁺] would Q = 1 and E = E°.',
          B: 'Correct that Q < 1, but the conclusion is wrong. When Q < 1, log(Q) is negative, making the Nernst correction positive, so E > E°, not E < E°.',
          
        },
        teachingPoint: 'Nernst logic: E = E° − (0.0592/n) × log(Q). If Q < 1 → log(Q) < 0 → the subtracted term is negative → E > E°. More reactant relative to product → more driving force → higher potential. If Q > 1 → E < E°.',
        relatedTopics: ['Nernst equation', 'reaction quotient', 'cell potential', 'concentration effect'],
      },
      {
        id: 'mcat3-cp-003',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p1',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'In the zinc-copper galvanic cell, which species undergoes oxidation and at which electrode?',
        choices: [
          { label: 'A', text: 'Copper is oxidized at the cathode' },
          { label: 'B', text: 'Copper is oxidized at the anode' },
          { label: 'C', text: 'Zinc is oxidized at the anode' },
          { label: 'D', text: 'Zinc is reduced at the anode' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage states the zinc anode (E° = −0.76 V) and copper cathode (E° = +0.34 V). The anode is where oxidation occurs (Zn → Zn²⁺ + 2e⁻). The cathode is where reduction occurs (Cu²⁺ + 2e⁻ → Cu). C is correct. A reverses the electrode identities and the half-reaction type. C is partially correct about copper but wrong about the electrode. D has the wrong half-reaction for zinc.',
        wrongAnswerExplanations: {
          A: 'Copper is reduced (Cu²⁺ + 2e⁻ → Cu) at the cathode, not oxidized. The cathode undergoes reduction.',
          D: 'Zinc undergoes oxidation (Zn → Zn²⁺ + 2e⁻) at the anode, not reduction. "Oxidation at anode" is the correct statement.',
          B: 'Copper is the cathode material; the cathode is where reduction occurs. Copper metal is the product of reduction of Cu²⁺, not the species oxidized.',
        },
        teachingPoint: 'Anode = oxidation (A-O-X: Anode Oxidation). Cathode = reduction. In a galvanic cell (spontaneous), the species with the more negative standard reduction potential is oxidized at the anode. Here: zinc (−0.76 V) is oxidized; copper (+0.34 V) is reduced.',
        relatedTopics: ['anode', 'cathode', 'oxidation', 'reduction', 'galvanic cell'],
      },
      {
        id: 'mcat3-cp-004',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p1',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'If E°cell for the zinc-copper cell is +1.10 V and n = 2, what is the equilibrium constant K at 25°C? (log₁₀ conversion: log K = nE°/0.0592)',
        choices: [
          { label: 'A', text: 'K ≈ 10^37' },
          { label: 'B', text: 'K ≈ 10^18' },
          { label: 'C', text: 'K ≈ 10^−37' },
          { label: 'D', text: 'K ≈ 10^74' },
        ],
        correctAnswer: 'A',
        explanation: 'log K = nE°/0.0592 = (2 × 1.10)/0.0592 = 2.20/0.0592 ≈ 37.2. K ≈ 10^37. A is correct. B (10^18) would require nE° = 0.0592 × 18 ≈ 1.07, which is not 2.20. D (10^74) would double-count n. C is for a non-spontaneous cell (negative E°).',
        wrongAnswerExplanations: {
          B: 'log K = 37, not 18. A value of 18 would result from using n = 1 or from a smaller E°.',
          C: '10^−37 would result from a negative E°cell (non-spontaneous reaction). Here E° is positive (+1.10 V), so K >> 1.',
          D: '10^74 would result from log K = 74, which would require nE°/0.0592 = 74 → nE° = 4.38 V, far exceeding the actual value of 2.20 V.',
        },
        teachingPoint: 'K from E°: log K = nE°cell/0.0592 at 25°C. Step 1: nE° = 2 × 1.10 = 2.20. Step 2: log K = 2.20/0.0592 ≈ 37. K = 10^37. This huge K means the reaction essentially goes to completion — consistent with copper and zinc being far apart on the activity series.',
        relatedTopics: ['equilibrium constant', 'standard cell potential', 'E° to K conversion'],
      },
      {
        id: 'mcat3-cp-005',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p1',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'An electrolytic cell is constructed using the reverse of the zinc-copper reaction (Cu(s) + Zn²⁺ → Cu²⁺ + Zn). What minimum external voltage must be applied to drive this reaction, and what occurs at the anode of the electrolytic cell?',
        choices: [
          { label: 'A', text: 'Minimum voltage = 1.10 V; copper is oxidized at the anode' },
          { label: 'B', text: 'Minimum voltage = 0.76 V; zinc is reduced at the anode' },
          { label: 'C', text: 'Minimum voltage = 1.10 V; zinc is oxidized at the anode' },
          { label: 'D', text: 'Minimum voltage = 0.34 V; copper is reduced at the cathode' },
        ],
        correctAnswer: 'A',
        explanation: 'In an electrolytic cell, the minimum external voltage (decomposition potential) equals the magnitude of the unfavorable cell potential. For the reverse reaction: E°cell(reverse) = −E°cell(forward) = −1.10 V, so minimum voltage = 1.10 V. In this electrolytic cell, the reverse reaction is Cu(s) + Zn²⁺ → Cu²⁺ + Zn(s). Copper is oxidized (Cu → Cu²⁺ + 2e⁻) at the anode. Zinc²⁺ is reduced (Zn²⁺ + 2e⁻ → Zn) at the cathode. A is correct. The anode is still where oxidation occurs in electrolytic cells.',
        wrongAnswerExplanations: {
          B: '0.76 V is just the zinc reduction potential, not the full cell potential. The minimum voltage must equal the full unfavorable E°cell = 1.10 V. Also, the anode is where oxidation occurs, and zinc is reduced (not oxidized) at the cathode.',
          C: 'Correct voltage (1.10 V), but wrong anode species. In the reverse reaction, copper is oxidized (not zinc). Zinc is the product being reduced at the cathode.',
          D: '0.34 V is the copper reduction potential, not the full cell potential. The answer also describes cathode behavior, not anode behavior.',
        },
        teachingPoint: 'Electrolytic cells: anode = oxidation, cathode = reduction (same as galvanic). Minimum required voltage = magnitude of the reverse cell potential. For an electrolytic cell running the reverse Zn-Cu reaction: Cu → Cu²⁺ at anode, Zn²⁺ → Zn at cathode, requires ≥ 1.10 V applied externally.',
        relatedTopics: ['electrolytic cell', 'decomposition potential', 'applied voltage', 'electrolysis'],
      },
    ],
  },

  // ─── C/P Passage 2: Acid-Base Equilibria ─────────────────────────────────────
  {
    id: 'f3-cp-p2',
    sectionId: 'chem-phys',
    title: 'Polyprotic Acids and Buffer Chemistry',
    passageText: `Polyprotic acids donate more than one proton sequentially, with successive pKa values (pKa1 < pKa2 < pKa3) because removing each subsequent proton becomes progressively more difficult — the molecule is already negatively charged, making proton removal energetically less favorable.

Phosphoric acid (H₃PO₄) is a triprotic acid with pKa1 = 2.15, pKa2 = 7.20, and pKa3 = 12.35. At physiological pH (~7.4), the dominant species are H₂PO₄⁻ and HPO₄²⁻ — the second dissociation governs the physiological buffer system. The ratio of [HPO₄²⁻]/[H₂PO₄⁻] at pH 7.4 is calculated by the Henderson-Hasselbalch equation:

pH = pKa + log([A⁻]/[HA])
7.4 = 7.20 + log([HPO₄²⁻]/[H₂PO₄⁻])
log([HPO₄²⁻]/[H₂PO₄⁻]) = +0.20
[HPO₄²⁻]/[H₂PO₄⁻] ≈ 1.58

Buffer capacity is highest when pH = pKa (ratio = 1:1), declining as pH deviates from pKa. Physiological buffers maintain blood pH within 7.35–7.45. A pH below 7.35 = acidosis; above 7.45 = alkalosis.

A patient presents with a blood pH of 7.25, PaCO₂ = 55 mmHg (normal: 35–45 mmHg), and HCO₃⁻ = 25 mEq/L (normal). This pattern is consistent with respiratory acidosis — elevated CO₂ drives the carbonic acid equilibrium:

CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-006',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p2',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Acid-base chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'At physiological pH (7.4), which phosphate species predominates, and why does pKa2 govern the physiological phosphate buffer?',
        choices: [
          { label: 'A', text: 'H₃PO₄ predominates because pKa1 is closest to 7.4' },
          { label: 'B', text: 'PO₄³⁻ predominates because pKa3 = 12.35 and the pH is well above pKa1' },
          { label: 'C', text: 'HPO₄²⁻ predominates in a ratio of ~1.58:1 with H₂PO₄⁻ because pKa2 = 7.20 is closest to pH 7.4' },
          { label: 'D', text: 'H₂PO₄⁻ predominates in a 1:1 ratio with H₃PO₄ because the pH is near pKa1' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage states that at pH 7.4, the dominant species are H₂PO₄⁻ and HPO₄²⁻ (the second acid-base pair), with [HPO₄²⁻]/[H₂PO₄⁻] ≈ 1.58. pKa2 = 7.20 is closest to pH 7.4, making this the effective buffer. A buffer system is most effective within ±1 pH unit of its pKa. pKa2 (7.20) is within 0.20 pH units of 7.4 — ideal. C is correct. A is incorrect (pKa1 = 2.15 is far from 7.4). B is incorrect (pKa3 = 12.35 governs PO₄³⁻ formation at pH near 12). D is incorrect (pKa1 governs H₃PO₄/H₂PO₄⁻ at pH ~2).',
        wrongAnswerExplanations: {
          A: 'At pH 7.4, which is 5.25 units above pKa1 = 2.15, H₃PO₄ is almost entirely deprotonated. The Henderson-Hasselbalch equation would give log([H₂PO₄⁻]/[H₃PO₄]) = 7.4 − 2.15 = +5.25 → ratio ≈ 10^5. H₃PO₄ is negligible.',
          D: 'The 1:1 ratio of H₂PO₄⁻/H₃PO₄ occurs at pH = pKa1 = 2.15, not pH 7.4. This pair is not the relevant buffer at physiological pH.',
          B: 'At pH 7.4, which is 4.95 units below pKa3 = 12.35, PO₄³⁻ is essentially absent. log([PO₄³⁻]/[HPO₄²⁻]) = 7.4 − 12.35 = −4.95 → PO₄³⁻ is ~10^−5 of HPO₄²⁻.',
        },
        teachingPoint: 'Buffer selection rule: effective buffer range = pKa ± 1 pH unit. For the phosphate system at pH 7.4, pKa2 = 7.20 is within 0.20 units → excellent buffer. pKa1 (2.15) and pKa3 (12.35) are far from 7.4 → those equilibria are not effective at physiological pH.',
        relatedTopics: ['Henderson-Hasselbalch', 'polyprotic acid', 'buffer range', 'phosphate buffer', 'pKa selection'],
      },
      {
        id: 'mcat3-cp-007',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p2',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Acid-base chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'The patient in the passage has blood pH 7.25, PaCO₂ = 55 mmHg, and normal HCO₃⁻. Which diagnosis is correct, and what compensatory mechanism will activate?',
        choices: [
          { label: 'A', text: 'Metabolic acidosis; compensation by increasing HCO₃⁻ reabsorption in the kidney' },
          { label: 'B', text: 'Metabolic alkalosis; compensation by renal excretion of HCO₃⁻' },
          { label: 'C', text: 'Respiratory alkalosis; compensation by increasing ventilation rate' },
          { label: 'D', text: 'Respiratory acidosis; compensation by increasing renal HCO₃⁻ retention and H⁺ excretion' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage states: pH 7.25 (acidosis), PaCO₂ = 55 mmHg (elevated, normal 35–45 mmHg), HCO₃⁻ = normal. Elevated CO₂ with normal HCO₃⁻ and acidosis = respiratory acidosis (primary defect is CO₂ retention, not metabolic). Renal compensation: the kidney retains HCO₃⁻ and excretes H⁺ → raises HCO₃⁻ → partially corrects the pH. D is correct. A (metabolic acidosis) would show low HCO₃⁻, not elevated CO₂. C (respiratory alkalosis) would show low CO₂, not elevated, and pH > 7.45. B (metabolic alkalosis) would show high HCO₃⁻ and pH > 7.45.',
        wrongAnswerExplanations: {
          A: 'Metabolic acidosis has low HCO₃⁻ (bicarbonate is consumed buffering the acid load) and may have low PaCO₂ (respiratory compensation — hyperventilation). This patient has normal HCO₃⁻ and elevated PaCO₂.',
          C: 'Respiratory alkalosis requires both alkalosis (pH > 7.45) and low PaCO₂. This patient has acidosis (pH 7.25) and elevated PaCO₂ — the opposite.',
          B: 'Metabolic alkalosis would show high HCO₃⁻ (the primary defect) and pH > 7.45. This patient has normal HCO₃⁻ and acidosis.',
          
        },
        teachingPoint: 'Acid-base algorithm: (1) pH < 7.35 = acidosis; (2) PaCO₂ = 55 (elevated) → respiratory cause; (3) HCO₃⁻ = normal → no metabolic component yet → respiratory acidosis. Compensation: kidney retains HCO₃⁻ and excretes H⁺ (slow, hours to days). Mnemonic: ROME — Respiratory Opposite (acidosis: pH↓ + PaCO₂↑); Metabolic Equal (acidosis: pH↓ + HCO₃⁻↓).',
        relatedTopics: ['acid-base disturbances', 'respiratory acidosis', 'CO₂ retention', 'renal compensation', 'Henderson-Hasselbalch'],
      },
      {
        id: 'mcat3-cp-008',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p2',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Acid-base chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Why do polyprotic acids have successively increasing pKa values (pKa1 < pKa2 < pKa3)?',
        choices: [
          { label: 'A', text: 'Each successive deprotonation requires removing a proton from an increasingly negatively charged ion, requiring more energy' },
          { label: 'B', text: 'Each proton is more strongly hydrogen-bonded to water than the previous' },
          { label: 'C', text: 'The molecular weight increases with each deprotonation, making dissociation harder' },
          { label: 'D', text: 'Entropy decreases with each deprotonation, making each successive dissociation less favorable' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage explains: "removing each subsequent proton becomes progressively more difficult — the molecule is already negatively charged, making proton removal energetically less favorable." Each dissociation leaves behind a more negatively charged conjugate base. Removing a proton (H⁺, positively charged) from an already negatively charged molecule requires overcoming greater electrostatic attraction. Higher energy barrier = lower Ka = higher pKa. A is correct. B inverts — it is the release of H⁺ from the acid that matters, not H⁺ binding to water. C is wrong — MW does not change between dissociation steps (you lose one proton). D mixes up thermodynamic factors — while entropy does change, the dominant explanation given in the passage is the electrostatic (charge) argument.',
        wrongAnswerExplanations: {
          C: 'Molecular weight decreases slightly (by 1 Da per proton lost) with each deprotonation, not increases. MW change is negligible and unrelated to the pKa trend.',
          D: 'Entropy of dissociation (creating two ions from one) is roughly similar for each dissociation step and does not account for the trend. The dominant factor is electrostatic repulsion between the increasingly negative anion and the departing proton.',
          B: 'Hydrogen bonding to water is relevant to solvation, not the reason pKa values increase. The key is the increasing negative charge on the molecule as protons are removed.',
        },
        teachingPoint: 'Increasing pKa in polyprotic acids: each successive conjugate base is more negative → harder to remove the next proton (same charge repels). H₃PO₄ (neutral) → easiest to lose first H⁺. H₂PO₄⁻ (1−) → harder. HPO₄²⁻ (2−) → hardest. Electrostatic charge accumulation is the key concept.',
        relatedTopics: ['polyprotic acid', 'pKa trend', 'electrostatics', 'acid strength', 'dissociation energy'],
      },
      {
        id: 'mcat3-cp-009',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p2',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Acid-base chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'At what pH does the phosphate buffer described have maximum buffering capacity?',
        choices: [
          { label: 'A', text: 'pH 2.15' },
          { label: 'B', text: 'pH 12.35' },
          { label: 'C', text: 'pH 7.40' },
          { label: 'D', text: 'pH 7.20' },
        ],
        correctAnswer: 'D',
        explanation: 'Buffer capacity is maximum when pH = pKa, because at this point [HA] = [A⁻] (ratio = 1:1) and the buffer can equally absorb added acid or base. For the second dissociation, pKa2 = 7.20 is where [H₂PO₄⁻] = [HPO₄²⁻]. D is correct. The passage asks about the physiological buffer system, which is governed by pKa2. pKa1 (A) and pKa3 (B) are maximum buffer capacity points for the first and third dissociations respectively. C (7.40) is physiological pH but is not the pKa (where maximum capacity occurs).',
        wrongAnswerExplanations: {
          A: 'pKa1 = 2.15 is where the first dissociation has maximum buffering capacity ([H₃PO₄] = [H₂PO₄⁻]). This is not relevant at physiological pH.',
          C: 'pH 7.40 is physiological blood pH, not pKa2. Maximum buffer capacity is at pH = pKa, not at physiological pH (which is close but not equal to pKa2 = 7.20).',
          B: 'pKa3 = 12.35 is where [HPO₄²⁻] = [PO₄³⁻] for the third dissociation. Not relevant at physiological pH.',
          
        },
        teachingPoint: 'Maximum buffer capacity = pH = pKa = [HA]:[A⁻] = 1:1. Buffer effective range = pKa ± 1 pH unit. Phosphate buffer pKa2 = 7.20 → maximum capacity at pH 7.20 → effective between pH 6.20 and 8.20 → perfect for physiological buffering.',
        relatedTopics: ['buffer capacity', 'pKa', 'Henderson-Hasselbalch', '1:1 ratio'],
      },
      {
        id: 'mcat3-cp-010',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p2',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Acid-base chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 4',
        difficulty: 'hard',
        question: 'A patient with emphysema has chronically elevated PaCO₂ = 60 mmHg and blood pH = 7.36 (near normal). What explains the near-normal pH despite high CO₂?',
        choices: [
          { label: 'A', text: 'The lungs have increased CO₂ elimination through hyperventilation' },
          { label: 'B', text: 'Elevated CO₂ directly inhibits carbonic anhydrase, reducing H₂CO₃ formation' },
          { label: 'C', text: 'The phosphate buffer has neutralized the excess H⁺ from carbonic acid dissociation' },
          { label: 'D', text: 'Renal compensation has elevated plasma HCO₃⁻, restoring the HCO₃⁻/CO₂ ratio and pH toward normal' },
        ],
        correctAnswer: 'D',
        explanation: 'In chronic respiratory acidosis (emphysema with chronically elevated CO₂), the kidney compensates by retaining HCO₃⁻ (reabsorption) and excreting H⁺. Over days to weeks, plasma HCO₃⁻ rises substantially above normal. The Henderson-Hasselbalch equation for the bicarbonate buffer: pH = 6.1 + log([HCO₃⁻]/0.03×PaCO₂). With elevated CO₂ (denominator increases) and elevated HCO₃⁻ (numerator increases), the ratio can be restored to near normal, and pH returns toward normal. This is fully compensated respiratory acidosis. D is correct. A is wrong — patients with emphysema cannot hyperventilate effectively (their disease prevents it). C (phosphate buffer) is a minor contributor and cannot fully restore pH. B inverts — elevated CO₂ does not inhibit carbonic anhydrase; it actually drives more carbonic acid formation.',
        wrongAnswerExplanations: {
          A: 'Emphysema is an obstructive lung disease that impairs the ability to exhale CO₂. These patients cannot hyperventilate to lower CO₂ — their disease prevents it. Hyperventilation is a respiratory compensation for metabolic acidosis, not available here.',
          C: 'Phosphate is a minor blood buffer (bicarbonate dominates). Even if phosphate buffered some H⁺, it cannot fully restore pH over weeks — only the kidney can achieve full compensation by systematically raising HCO₃⁻.',
          B: 'Elevated CO₂ does not inhibit carbonic anhydrase. Carbonic anhydrase catalyzes CO₂ + H₂O ⇌ H₂CO₃ and functions in both directions. Elevated CO₂ drives the equilibrium toward H₂CO₃ and H⁺ formation, worsening (not correcting) the acidosis.',
          
        },
        teachingPoint: 'Compensated respiratory acidosis: CO₂↑ → acute acidosis. Kidney: H⁺ excretion ↑ + HCO₃⁻ retention ↑ over days. HCO₃⁻ rises to match CO₂ elevation → ratio HCO₃⁻/CO₂ restored → pH normalizes. Distinguish acute (uncompensated: pH↓, HCO₃⁻ normal) from chronic (compensated: pH near normal, HCO₃⁻ elevated).',
        relatedTopics: ['compensated respiratory acidosis', 'renal compensation', 'emphysema', 'Henderson-Hasselbalch', 'bicarbonate buffer'],
      },
    ],
  },

  // ─── C/P Passage 3: Waves and Sound ─────────────────────────────────────────
  {
    id: 'f3-cp-p3',
    sectionId: 'chem-phys',
    title: 'Doppler Effect and Sound Intensity',
    passageText: `Sound is a longitudinal mechanical wave that propagates through a medium via compression and rarefaction. Wave speed in air at room temperature is approximately 343 m/s and increases with temperature: v = 331 + 0.6T (m/s, T in °C). Sound intensity is the power transmitted per unit area: I = P/A (W/m²).

The Doppler effect describes the apparent change in frequency when source and observer move relative to each other:

f_obs = f_source × [(v + v_obs)/(v − v_source)]

where v is wave speed in the medium, v_obs is observer velocity (+ toward source), and v_source is source velocity (+ away from observer).

Sound intensity level (SIL) is measured in decibels: SIL = 10 × log₁₀(I/I₀), where I₀ = 10⁻¹² W/m² (threshold of hearing). Each 10-dB increase represents a 10-fold increase in intensity. A 3-dB increase ≈ doubling of intensity.

An ambulance with a siren frequency of 700 Hz travels at 30 m/s toward a stationary observer. The speed of sound is 343 m/s.

For a point source radiating uniformly in all directions, intensity falls off with the inverse square law: I ∝ 1/r², where r is distance from the source. Doubling the distance reduces intensity by a factor of 4 (reduces SIL by ~6 dB).`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-011',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p3',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Waves and sound',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'What frequency does the stationary observer hear as the ambulance approaches (f_source = 700 Hz, v_source = 30 m/s, v = 343 m/s, observer stationary)?',
        choices: [
          { label: 'A', text: 'Approximately 643 Hz' },
          { label: 'B', text: 'Approximately 763 Hz' },
          { label: 'C', text: 'Approximately 700 Hz' },
          { label: 'D', text: 'Approximately 840 Hz' },
        ],
        correctAnswer: 'B',
        explanation: 'Doppler for approaching source, stationary observer: f_obs = f_source × v/(v − v_source) = 700 × 343/(343 − 30) = 700 × 343/313 ≈ 700 × 1.096 ≈ 767 Hz. Closest answer is B (763 Hz). When the source approaches, the observer hears a higher frequency (the wavefronts are compressed). A (643 Hz) would occur if the source were receding. C would occur with no relative motion. D (840 Hz) is too high.',
        wrongAnswerExplanations: {
          A: 'f ≈ 643 Hz would result from the ambulance receding (f_obs = 700 × 343/373 ≈ 644 Hz). An approaching source raises perceived frequency.',
          C: 'No Doppler shift occurs only when there is no relative motion between source and observer. The ambulance is moving at 30 m/s.',
          D: '840 Hz is too high. This might result from an error in the formula (e.g., dividing by v_source alone rather than v − v_source).',
        },
        teachingPoint: 'Doppler: source approaching → denominator decreases (v − v_source) → f_obs > f_source (higher pitch). Source receding → denominator increases (v + v_source) → f_obs < f_source (lower pitch). Observer approaching → numerator increases (v + v_obs) → f_obs > f_source. Quick check: approaching = compression = higher pitch.',
        relatedTopics: ['Doppler effect', 'frequency shift', 'sound waves', 'moving source'],
      },
      {
        id: 'mcat3-cp-012',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p3',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Waves and sound',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'easy',
        question: 'An observer is initially 10 m from a point sound source (80 dB). The observer moves to 20 m. What is the new sound intensity level?',
        choices: [
          { label: 'A', text: '40 dB' },
          { label: 'B', text: '70 dB' },
          { label: 'C', text: '74 dB' },
          { label: 'D', text: '60 dB' },
        ],
        correctAnswer: 'C',
        explanation: 'Inverse square law: doubling distance → intensity decreases by factor of 4. The passage states: "doubling the distance reduces intensity by a factor of 4 (reduces SIL by ~6 dB)." Starting at 80 dB, moving from 10 m to 20 m (distance doubled): new SIL = 80 − 6 = 74 dB. C is correct. A (40 dB) would result from a 40 dB reduction, which would require a 10,000-fold decrease in intensity — wrong. B (70 dB) would be a 10-fold intensity decrease = 10 dB drop. D (60 dB) would require a 20 dB drop = 100-fold intensity decrease.',
        wrongAnswerExplanations: {
          A: '40 dB would require a 10,000-fold intensity reduction (40 dB drop). Doubling the distance gives only a 4-fold intensity reduction, which is ~6 dB.',
          B: '70 dB would be a 10 dB reduction, which corresponds to a 10-fold intensity decrease. Doubling distance gives a 4-fold decrease (~6 dB), not a 10-fold decrease.',
          D: '60 dB would be a 20 dB reduction, requiring a 100-fold intensity decrease. Doubling distance only reduces intensity by 4-fold.',
        },
        teachingPoint: 'Inverse square + decibel: double distance → I decreases 4× → ΔdB = 10 × log(1/4) = 10 × (−0.602) ≈ −6 dB. Each doubling of distance = −6 dB. Tripling distance: I ∝ 1/r² → ratio = 1/9 → ΔdB = 10 × log(1/9) = −9.5 dB.',
        relatedTopics: ['inverse square law', 'decibels', 'sound intensity level', 'distance effects'],
      },
      {
        id: 'mcat3-cp-013',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p3',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Waves and sound',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Which of the following correctly describes the physical motion of air molecules in a sound wave?',
        choices: [
          { label: 'A', text: 'Longitudinal — air molecules oscillate parallel to the direction of wave propagation via compression and rarefaction' },
          { label: 'B', text: 'Transverse — air molecules oscillate perpendicular to the direction of wave propagation' },
          { label: 'C', text: 'Circular — air molecules travel in circular paths following the wave' },
          { label: 'D', text: 'Transverse — air molecules move in a sinusoidal pattern at 90° to wave direction' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage defines sound as "a longitudinal mechanical wave that propagates through a medium via compression and rarefaction." In a longitudinal wave, particle displacement is parallel to wave propagation direction (both along the same axis). Compressions (regions of high pressure/density) and rarefactions (low pressure/density) propagate in the direction of travel. A is correct. A and D describe transverse waves (light, seismic S-waves). C (circular) describes surface water waves, not sound.',
        wrongAnswerExplanations: {
          C: 'Circular motion describes surface water waves (a hybrid of transverse and longitudinal), not sound waves.',
          D: 'Same as A — describes transverse motion. The "sinusoidal pattern" is the wave shape in position-pressure graphs, but actual molecular motion is back-and-forth along the propagation axis.',
          B: 'Transverse waves have perpendicular displacement. Sound is longitudinal. Examples of transverse waves: light (EM), seismic S-waves, waves on strings.',
        },
        teachingPoint: 'Sound = longitudinal wave: molecules compress and rarefy along the propagation direction. Key distinction: longitudinal (sound) vs. transverse (light, EM, seismic S-waves). You can transmit longitudinal waves through solids, liquids, AND gases. Transverse EM waves need no medium.',
        relatedTopics: ['longitudinal wave', 'compression', 'rarefaction', 'wave types', 'sound propagation'],
      },
      {
        id: 'mcat3-cp-014',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p3',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Waves and sound',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'What is the sound intensity level of a sound with intensity I = 10⁻⁶ W/m² (I₀ = 10⁻¹² W/m²)?',
        choices: [
          { label: 'A', text: '60 dB' },
          { label: 'B', text: '6 dB' },
          { label: 'C', text: '120 dB' },
          { label: 'D', text: '10⁻⁶ dB' },
        ],
        correctAnswer: 'A',
        explanation: 'SIL = 10 × log₁₀(I/I₀) = 10 × log₁₀(10⁻⁶/10⁻¹²) = 10 × log₁₀(10⁶) = 10 × 6 = 60 dB. A is correct. B (6 dB) fails to multiply by 10. C (120 dB) would require I/I₀ = 10¹² → I = 10⁰ = 1 W/m². D is nonsensical (intensity in W/m² ≠ dB).',
        wrongAnswerExplanations: {
          B: '6 is log₁₀(10⁶), but dB = 10 × log, not just log. Must multiply by 10: 10 × 6 = 60 dB.',
          C: '120 dB corresponds to I = 1 W/m² (threshold of pain). This intensity (10⁻⁶ W/m²) is the intensity of a normal conversation, ≈ 60 dB.',
          D: 'The unit of SIL is decibels (dB), not W/m². The question asks for SIL, not intensity.',
        },
        teachingPoint: 'Decibel shortcuts: I = 10⁻⁶ W/m² = 10^(−6). I₀ = 10⁻¹². I/I₀ = 10^(−6+12) = 10^6. SIL = 10 × log₁₀(10^6) = 60 dB. Common reference: 60 dB ≈ normal conversation; 85 dB = damage risk; 120 dB ≈ threshold of pain.',
        relatedTopics: ['decibels', 'sound intensity level', 'logarithmic scale', 'SIL formula'],
      },
    ],
  },

  // ─── C/P Passage 4: Thermodynamics ───────────────────────────────────────────
  {
    id: 'f3-cp-p4',
    sectionId: 'chem-phys',
    title: 'Gibbs Free Energy and Reaction Spontaneity',
    passageText: `The Gibbs free energy (G) determines whether a chemical reaction is thermodynamically spontaneous: ΔG = ΔH − TΔS. A negative ΔG indicates a spontaneous process (under constant temperature and pressure). The sign of ΔG depends on the temperature and the signs of ΔH and ΔS.

The standard Gibbs free energy change is related to the equilibrium constant K and the cell potential:
ΔG° = −nFE°cell = −RT ln K

Under non-standard conditions: ΔG = ΔG° + RT ln Q

At equilibrium, ΔG = 0 and Q = K, consistent with ΔG° = −RT ln K.

An enzyme-catalyzed reaction has ΔH° = −150 kJ/mol and ΔS° = −300 J/mol·K. A second reaction in the same pathway has ΔH° = +80 kJ/mol and ΔS° = +250 J/mol·K.

Table 1: Temperature Dependence of Spontaneity
────────────────────────────────────
ΔH    | ΔS    | Spontaneous?
────────────────────────────────────
−     | +     | Always (ΔG < 0 at all T)
−     | −     | At low T (TΔS < ΔH)
+     | +     | At high T (TΔS > ΔH)
+     | −     | Never (ΔG > 0 at all T)
────────────────────────────────────`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-015',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p4',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'For the first reaction (ΔH° = −150 kJ/mol, ΔS° = −300 J/mol·K), at what temperature does the reaction change from spontaneous to non-spontaneous?',
        choices: [
          { label: 'A', text: '500 K' },
          { label: 'B', text: '0.5 K' },
          { label: 'C', text: '200 K' },
          { label: 'D', text: '300 K' },
        ],
        correctAnswer: 'A',
        explanation: 'The crossover temperature is where ΔG = 0: ΔH = TΔS → T = ΔH/ΔS. Using consistent units: ΔH = −150,000 J/mol, ΔS = −300 J/mol·K. T = −150,000/−300 = 500 K. Below 500 K: TΔS (negative, smaller magnitude) < ΔH (negative) → ΔG = ΔH − TΔS < 0 (spontaneous). Above 500 K: |TΔS| > |ΔH| → ΔG > 0 (non-spontaneous). A is correct. B (0.5 K) divides without unit conversion. C (200 K) and D (300 K) are arithmetic errors.',
        wrongAnswerExplanations: {
          B: '0.5 K would result from failing to convert kJ to J (using −150/−300 = 0.5 without recognizing the units are kJ vs J/K). Always convert to consistent units: T = 150,000 J/300 J·K = 500 K.',
          C: '200 K would result from using ΔH = −60 kJ (wrong) or some other arithmetic error.',
          D: '300 K would result from a calculation error. T = 150,000/300 = 500 K, not 300 K.',
        },
        teachingPoint: 'Crossover temperature: when ΔH and ΔS have the same sign, there is a temperature where ΔG switches sign. T_crossover = ΔH/ΔS (in J, not kJ!). For (−, −): spontaneous at T < T_crossover; non-spontaneous at T > T_crossover. Always check unit consistency: ΔH in J/mol, ΔS in J/mol·K → T in K.',
        relatedTopics: ['Gibbs free energy', 'crossover temperature', 'ΔH ΔS temperature dependence', 'spontaneity'],
      },
      {
        id: 'mcat3-cp-016',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p4',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'For the second reaction (ΔH° = +80 kJ/mol, ΔS° = +250 J/mol·K), at which temperature range is the reaction spontaneous?',
        choices: [
          { label: 'A', text: 'At all temperatures' },
          { label: 'B', text: 'At no temperatures' },
          { label: 'C', text: 'At low temperatures (T < 320 K)' },
          { label: 'D', text: 'At high temperatures (T > 320 K)' },
        ],
        correctAnswer: 'D',
        explanation: 'Table 1 in the passage: ΔH = + and ΔS = + → "At high T (TΔS > ΔH)." Crossover T = ΔH/ΔS = 80,000/250 = 320 K. Above 320 K: TΔS > ΔH → ΔG = ΔH − TΔS < 0 (spontaneous). Below 320 K: ΔG > 0 (non-spontaneous). D is correct. The table directly maps this case. A describes (−,+). B describes (+,−). C inverses the correct range.',
        wrongAnswerExplanations: {
          A: 'Always spontaneous (all T) corresponds to ΔH = − and ΔS = + (both terms favor spontaneity at all temperatures). Here ΔH = + is unfavorable, so spontaneity requires sufficiently high T to overcome it.',
          B: 'Never spontaneous corresponds to ΔH = + and ΔS = − (both disfavor spontaneity). Here ΔS = + (favorable), allowing spontaneity at high temperatures.',
          C: 'At low temperatures, TΔS is small, leaving ΔG ≈ ΔH = +80 kJ (non-spontaneous). The reaction becomes spontaneous only when TΔS exceeds ΔH, which requires high temperature.',
        },
        teachingPoint: 'Table: (+,+) = high-temperature spontaneous. Classic example: vaporization of water at 100°C — endothermic (ΔH > 0) but entropy-driven (ΔS > 0 because gas phase has more disorder). Below boiling point: non-spontaneous (stays liquid). Above boiling point: spontaneous.',
        relatedTopics: ['Gibbs free energy', 'enthalpy', 'entropy', 'temperature dependence', 'spontaneity table'],
      },
      {
        id: 'mcat3-cp-017',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p4',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'If ΔG° = −25 kJ/mol for a reaction at 25°C, what is the value of the equilibrium constant K? (R = 8.314 J/mol·K)',
        choices: [
          { label: 'A', text: 'K ≈ 2.5 × 10⁴' },
          { label: 'B', text: 'K ≈ 2.5 × 10⁻⁴' },
          { label: 'C', text: 'K ≈ 4.0' },
          { label: 'D', text: 'K ≈ 2.5 × 10⁻⁵' },
        ],
        correctAnswer: 'A',
        explanation: 'ΔG° = −RT ln K → ln K = −ΔG°/RT = −(−25,000)/(8.314 × 298) = 25,000/2477.6 ≈ 10.09. K = e^10.09 ≈ 2.4 × 10⁴. A is correct (≈ 2.5 × 10⁴). A negative ΔG° means the reaction favors products at equilibrium → K > 1, which rules out B and D. C (K = 4) is too small for ΔG° = −25 kJ/mol.',
        wrongAnswerExplanations: {
          B: 'K = 2.5 × 10⁻⁴ would correspond to a positive ΔG° (unfavorable reaction favoring reactants). Here ΔG° = −25 kJ/mol (negative) → K >> 1.',
          C: 'K ≈ 4 would correspond to ΔG° = −RT ln(4) = −8.314 × 298 × ln(4) ≈ −3.4 kJ/mol. A much smaller magnitude than −25 kJ/mol.',
          D: 'K = 2.5 × 10⁻⁵ corresponds to a large positive ΔG° (strongly disfavored). Negative ΔG° → K > 1, not K << 1.',
        },
        teachingPoint: 'ΔG° to K: ΔG° = −RT ln K. Negative ΔG° → positive ln K → K > 1 (products favored). Calculation: ln K = 25,000/(8.314 × 298) ≈ 10.1. K = e^10.1 ≈ 24,000. Per 10 kJ/mol of ΔG°: at 25°C, ΔG° = −10 kJ/mol → K ≈ 57. ΔG° = −20 kJ/mol → K ≈ 3,000. ΔG° = −30 kJ/mol → K ≈ 160,000.',
        relatedTopics: ['ΔG° to K', 'equilibrium constant', 'Gibbs free energy', 'thermodynamics'],
      },
      {
        id: 'mcat3-cp-018',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p4',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'An enzyme reduces the activation energy of a reaction but does not change ΔG°. What does this imply about the enzyme\'s effect on K?',
        choices: [
          { label: 'A', text: 'K is unchanged because K depends on ΔG°, not activation energy' },
          { label: 'B', text: 'K increases because activation energy and K are directly related' },
          { label: 'C', text: 'K decreases because faster forward reaction shifts equilibrium toward products' },
          { label: 'D', text: 'K increases because the enzyme stabilizes the transition state' },
        ],
        correctAnswer: 'A',
        explanation: 'The passage states ΔG° = −RT ln K. Since the enzyme does not change ΔG° (it only lowers activation energy), K is also unchanged. An enzyme increases both the forward and reverse reaction rates equally (it lowers the energy barrier in both directions), so the equilibrium position (K) does not shift. A is correct. B is wrong — activation energy and K are not directly related. C is wrong — faster forward and reverse rates do not shift K. D is wrong — transition state stabilization lowers activation energy but this does not change the relative energies of reactants and products (ΔG°), so K is unchanged.',
        wrongAnswerExplanations: {
          C: 'Enzymes increase both forward and reverse rates equally. Equilibrium is established faster, but the equilibrium constant (the ratio of rate constants kf/kr) is unchanged.',
          D: 'Stabilizing the transition state (lowering Ea) does not change the energy of reactants or products, so ΔG° and K are unaffected.',
          B: 'Activation energy and K are completely independent. K is determined by ΔG° (the energy difference between reactants and products), while activation energy is the barrier height (related to transition state energy). An enzyme lowers the barrier without changing the endpoint energies.',
        },
        teachingPoint: 'Enzyme does NOT change: ΔG, ΔH, ΔS, K, equilibrium concentrations. Enzyme DOES change: Ea (activation energy), reaction rate (kcat), time to reach equilibrium. K = kf/kr — enzyme increases both kf and kr proportionally, so the ratio K is unchanged.',
        relatedTopics: ['enzyme', 'activation energy', 'equilibrium constant', 'catalysis', 'ΔG'],
      },
      {
        id: 'mcat3-cp-019',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p4',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 4',
        difficulty: 'hard',
        question: 'At a given moment, Q = 100 for a reaction with K = 10. What is the sign of ΔG, and which direction does the reaction proceed?',
        choices: [
          { label: 'A', text: 'ΔG < 0; reaction proceeds forward (toward products)' },
          { label: 'B', text: 'ΔG = 0; the reaction is at equilibrium' },
          { label: 'C', text: 'ΔG > 0; reaction proceeds in reverse (toward reactants)' },
          { label: 'D', text: 'ΔG < 0; reaction proceeds in reverse (toward reactants)' },
        ],
        correctAnswer: 'C',
        explanation: 'ΔG = ΔG° + RT ln Q. Since K = 10: ΔG° = −RT ln(10) < 0. ΔG = −RT ln(10) + RT ln(100) = RT × [ln(100) − ln(10)] = RT × ln(10) > 0. Since Q > K (100 > 10), the reaction quotient exceeds the equilibrium constant — there are too many products relative to equilibrium. The reaction proceeds in reverse to reach equilibrium. ΔG > 0 when Q > K (thermodynamically unfavorable direction = reverse). C is correct. A would apply when Q < K. B would apply when Q = K. D has ΔG sign wrong for reverse direction — reverse reactions occur when Q > K and ΔG > 0 for forward direction.',
        wrongAnswerExplanations: {
          A: 'ΔG < 0 (forward spontaneous) occurs when Q < K. Here Q > K, so the forward direction is non-spontaneous (ΔG > 0). The reaction goes in reverse.',
          D: 'Reaction proceeding in reverse when ΔG > 0 for the forward direction is correct, but ΔG cannot be both > 0 (for Q > K condition) and < 0 simultaneously. The ΔG < 0 label in D is inconsistent with the rest of the answer.',
          B: 'ΔG = 0 at equilibrium where Q = K = 10. Here Q = 100 ≠ K, so the system is not at equilibrium.',
        },
        teachingPoint: 'Q vs K: Q < K → ΔG < 0 → forward reaction spontaneous. Q > K → ΔG > 0 → reverse reaction spontaneous. Q = K → equilibrium, ΔG = 0. Formula: ΔG = RT ln(Q/K). If Q/K > 1: ΔG > 0. If Q/K < 1: ΔG < 0.',
        relatedTopics: ['reaction quotient', 'equilibrium constant', 'ΔG', 'direction of reaction', 'non-standard conditions'],
      },
    ],
  },

  // ─── C/P Passage 5: Fluid Mechanics ─────────────────────────────────────────
  {
    id: 'f3-cp-p5',
    sectionId: 'chem-phys',
    title: 'Blood Flow and Bernoulli\'s Principle',
    passageText: `The cardiovascular system is a closed hydraulic circuit governed by principles of fluid mechanics. For an ideal (incompressible, non-viscous) fluid in steady laminar flow, Bernoulli's equation states that total mechanical energy per unit volume is conserved:

P + ½ρv² + ρgh = constant

where P is fluid pressure, ρ is fluid density, v is flow velocity, g is gravitational acceleration, and h is height. In a horizontal tube, the equation simplifies to: P + ½ρv² = constant (pressure decreases where velocity increases — the Venturi effect).

For real blood flow, Poiseuille's law describes flow rate (Q) through a rigid cylindrical tube:

Q = πr⁴ΔP/(8ηL)

where r is radius, ΔP is pressure difference, η is viscosity, and L is tube length. Resistance R = 8ηL/(πr⁴). This shows a critically important dependence: flow rate varies with the fourth power of radius. Halving the vessel radius reduces flow rate by a factor of 16 (at constant pressure).

Atherosclerosis reduces arterial lumen radius. Turbulent flow develops above a critical velocity described by the Reynolds number:

Re = ρvD/η

where D is tube diameter. Turbulent flow (Re > 2000) is less efficient than laminar flow and generates bruits (audible in stenosed vessels). Turbulent flow dissipates more energy as heat.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-020',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p5',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluid mechanics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Atherosclerotic narrowing reduces a coronary artery\'s radius by 50%. By what factor does flow rate decrease (at constant pressure)?',
        choices: [
          { label: 'A', text: '2-fold decrease' },
          { label: 'B', text: '4-fold decrease' },
          { label: 'C', text: '8-fold decrease' },
          { label: 'D', text: '16-fold decrease' },
        ],
        correctAnswer: 'D',
        explanation: 'Poiseuille\'s law: Q ∝ r⁴. If r decreases to r/2: Q_new/Q_old = (r/2)⁴/r⁴ = (1/2)⁴ = 1/16. Flow rate decreases 16-fold. D matches and is confirmed by the passage: "Halving the vessel radius reduces flow rate by a factor of 16." D is correct. A (2-fold) would apply if Q ∝ r¹. B (4-fold) would apply if Q ∝ r². C (8-fold) would apply if Q ∝ r³.',
        wrongAnswerExplanations: {
          A: 'A 2-fold decrease would result from a linear relationship Q ∝ r. Poiseuille\'s law has r⁴ dependence, making flow exquisitely sensitive to small radius changes.',
          B: 'A 4-fold decrease would result from Q ∝ r² (the area relationship). The fourth-power law makes vascular narrowing have dramatically larger effects than area alone predicts.',
          C: 'An 8-fold decrease would result from Q ∝ r³. The correct relationship is r⁴: (1/2)⁴ = 1/16.',
        },
        teachingPoint: 'Poiseuille: Q ∝ r⁴. The r⁴ dependence is clinically crucial: small reductions in lumen radius (as in atherosclerosis or vasospasm) cause disproportionately large flow reductions. A 20% radius reduction → (0.8)⁴ ≈ 0.41 → 59% flow reduction! This is why even moderate stenosis is hemodynamically significant.',
        relatedTopics: ['Poiseuille\'s law', 'r⁴ dependence', 'atherosclerosis', 'flow rate', 'vascular stenosis'],
      },
      {
        id: 'mcat3-cp-021',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p5',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluid mechanics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'At a stenotic (narrowed) segment of an artery, blood velocity increases. According to Bernoulli\'s principle, what happens to blood pressure at the stenosis?',
        choices: [
          { label: 'A', text: 'Pressure increases because the vessel wall exerts more force on faster-moving blood' },
          { label: 'B', text: 'Pressure decreases because kinetic energy increases at the expense of pressure energy (Venturi effect)' },
          { label: 'C', text: 'Pressure is unchanged because flow rate is conserved by the continuity equation' },
          { label: 'D', text: 'Pressure increases because resistance is higher, requiring more driving pressure' },
        ],
        correctAnswer: 'B',
        explanation: 'Bernoulli\'s equation (horizontal): P + ½ρv² = constant. At the stenosis, velocity v increases (conservation of mass/continuity equation: A₁v₁ = A₂v₂, narrower area → higher velocity). Since v increases, ½ρv² increases, so P must decrease to keep the sum constant. This is the Venturi effect: faster flow → lower pressure. B is correct. A and D invoke a pressure-increases logic that contradicts Bernoulli. C confuses flow rate (Q = Av, which is conserved) with pressure (which is not conserved but changes with velocity).',
        wrongAnswerExplanations: {
          A: 'Bernoulli\'s equation shows the opposite — pressure decreases where velocity increases. The vessel wall does not exert more force on faster blood in a way that increases pressure; rather, the kinetic energy increase comes at the expense of pressure energy.',
          C: 'The continuity equation (A₁v₁ = A₂v₂) conserves flow rate (volume per time), not pressure. Pressure changes according to Bernoulli — it decreases at the stenosis.',
          D: 'While resistance is higher at the stenosis (Q = ΔP/R), the local pressure within the stenosis itself is lower (Bernoulli). The pressure drop across the stenosis is larger, but the local pressure at the narrowest point is lower than the pressure just before it.',
        },
        teachingPoint: 'Venturi effect (Bernoulli applied): higher velocity → lower pressure. At an arterial stenosis: velocity ↑ → pressure ↓ at the narrowest point. Paradox: the narrowed artery has LOWER local pressure, which can cause vessel collapse (critical stenosis). Clinically: atherosclerotic stenosis creates pressure gradient → downstream ischemia.',
        relatedTopics: ['Bernoulli\'s principle', 'Venturi effect', 'stenosis', 'pressure-velocity relationship', 'continuity equation'],
      },
      {
        id: 'mcat3-cp-022',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p5',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluid mechanics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'What is the clinical significance of turbulent blood flow detected by auscultation over a blood vessel?',
        choices: [
          { label: 'A', text: 'Turbulent flow indicates normal high-cardiac-output states only' },
          { label: 'B', text: 'Turbulent flow (bruit) indicates vessel narrowing (stenosis) reducing lumen, which increases velocity and may exceed Re > 2000' },
          { label: 'C', text: 'A bruit indicates the vessel has occluded and no blood flows through it' },
          { label: 'D', text: 'Turbulent flow improves oxygen delivery by mixing blood more thoroughly' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states: "Turbulent flow develops above a critical velocity described by the Reynolds number… Turbulent flow (Re > 2000) is less efficient than laminar flow and generates bruits (audible in stenosed vessels)." A bruit (audible bruit from turbulence) over a vessel is a clinical sign of stenosis — the narrowed lumen increases flow velocity, raising Re above 2000 and causing turbulent flow. B is correct. A is partially true (turbulence also occurs in high-output states like anemia) but the passage context is stenosis. C is wrong — occlusion would produce no flow (no bruit). D is wrong — turbulence dissipates energy as heat; it does not improve oxygen delivery.',
        wrongAnswerExplanations: {
          A: 'While turbulence does occur in high-output/low-viscosity states (anemia, pregnancy, fever), the passage specifically contextualizes bruits with stenosed vessels. In the clinical context of auscultating an artery, a bruit suggests stenosis.',
          C: 'A completely occluded vessel has no flow and would produce no sound. Bruits are heard precisely because flow is present but turbulent.',
          D: 'Turbulent flow dissipates energy as heat and is less efficient at delivering blood. It does not enhance oxygen delivery and is a sign of pathological flow dynamics.',
        },
        teachingPoint: 'Re = ρvD/η. Turbulence when Re > 2000. Stenosis: D↓ → v↑ (continuity) → Re↑. Also: η↓ (anemia) → Re↑. Bruit = turbulence = stenosis until proven otherwise. Clinical examples: carotid bruit → carotid stenosis; renal bruit → renal artery stenosis; femoral bruit → peripheral arterial disease.',
        relatedTopics: ['Reynolds number', 'turbulent flow', 'bruit', 'stenosis', 'laminar flow'],
      },
      {
        id: 'mcat3-cp-023',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p5',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluid mechanics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'From Poiseuille\'s law, if blood vessel length doubles while radius and pressure difference remain constant, how does flow rate change?',
        choices: [
          { label: 'A', text: 'Flow rate doubles' },
          { label: 'B', text: 'Flow rate decreases 4-fold' },
          { label: 'C', text: 'Flow rate is unchanged because length doesn\'t affect pressure' },
          { label: 'D', text: 'Flow rate is halved' },
        ],
        correctAnswer: 'D',
        explanation: 'Poiseuille\'s law: Q = πr⁴ΔP/(8ηL). Flow rate Q is inversely proportional to length L: Q ∝ 1/L. Doubling L: Q_new = Q_old/2. Flow is halved. D is correct. A would require Q ∝ L (direct proportion). C is incorrect — length appears in the denominator and directly affects resistance. B would require Q ∝ 1/L² or Q ∝ 1/r² relationship.',
        wrongAnswerExplanations: {
          A: 'Q ∝ 1/L (inverse relationship), not Q ∝ L (direct). Doubling length doubles resistance → halves flow at constant pressure.',
          C: 'Length directly appears in Poiseuille\'s law (R = 8ηL/πr⁴). Longer vessels have more resistance and less flow at the same pressure gradient.',
          B: 'A 4-fold decrease would require Q ∝ 1/L². The actual relationship is Q ∝ 1/L (inverse, not inverse square). Only r has a fourth-power dependence.',
          
        },
        teachingPoint: 'Poiseuille relationship summary: Q ∝ r⁴ (r most powerful variable), Q ∝ 1/L, Q ∝ ΔP, Q ∝ 1/η. Resistance R = ΔP/Q = 8ηL/(πr⁴). Longer vessel = more resistance = less flow. Clinical: capillary beds have enormous total length but parallel arrangement keeps total resistance manageable.',
        relatedTopics: ['Poiseuille\'s law', 'vessel length', 'resistance', 'flow rate', 'fluid mechanics'],
      },
      {
        id: 'mcat3-cp-024',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p5',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluid mechanics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Which factor, if increased, would INCREASE blood viscosity (η) and reduce flow in Poiseuille\'s law?',
        choices: [
          { label: 'A', text: 'Elevated temperature' },
          { label: 'B', text: 'Severe anemia (reduced hematocrit)' },
          { label: 'C', text: 'Polycythemia (elevated hematocrit)' },
          { label: 'D', text: 'Intravenous saline dilution' },
        ],
        correctAnswer: 'C',
        explanation: 'Blood viscosity is primarily determined by hematocrit (red blood cell concentration). Polycythemia (elevated hematocrit, too many RBCs) increases blood viscosity — more cellular material makes the fluid thicker and harder to flow. Increased η → decreased Q (Poiseuille). C is correct. A (elevated temperature) decreases liquid viscosity (molecules move faster). B (anemia) decreases hematocrit → decreases viscosity → increases flow (and increases Re, risk of turbulence). D (saline dilution) dilutes blood → decreases viscosity.',
        wrongAnswerExplanations: {
          A: 'For most liquids, viscosity decreases with increasing temperature (thermal energy reduces intermolecular interactions). Warming blood reduces viscosity and improves flow.',
          B: 'Anemia reduces hematocrit → less cellular content → lower viscosity. This decreases η, increasing Q and also raising Re (increasing risk of turbulence — anemia-related flow murmurs).',
          D: 'IV saline dilutes plasma proteins and red blood cells → lower viscosity → better flow. Iatrogenic hemodilution reduces viscosity.',
        },
        teachingPoint: 'Blood viscosity: primarily determined by hematocrit (40–45% normal). Increased hematocrit (polycythemia) → ↑η → ↑resistance → ↓flow, ↑thrombosis risk. Decreased hematocrit (anemia) → ↓η → ↑flow velocity → ↑Re → turbulence risk (flow murmurs). Temperature ↑ → η↓ (opposite to gas viscosity, which increases with temperature).',
        relatedTopics: ['blood viscosity', 'hematocrit', 'polycythemia', 'anemia', 'Poiseuille'],
      },
    ],
  },
]
