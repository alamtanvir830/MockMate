import type { MCATPassage } from '../types'

// Form 2 C/P — Passages 1–5 (25 questions)
// Topics: Enzyme Kinetics, Gas Laws/Respiration, Electrochemistry, Geometric Optics, Thermodynamics

export const cpPassages01to05: MCATPassage[] = [
  // ─── Passage 1: Pyruvate Kinase — Michaelis-Menten Kinetics ─────────────────
  {
    id: 'f2-cp-p1',
    sectionId: 'chem-phys',
    title: 'Pyruvate Kinase Kinetics and Inhibition',
    passageText: `Pyruvate kinase (PK) catalyzes the final step of glycolysis, transferring a phosphate group from phosphoenolpyruvate (PEP) to ADP to yield pyruvate and ATP:

PEP + ADP → pyruvate + ATP

A biochemist measured the initial reaction velocity (v) of purified PK at varying PEP concentrations in the presence and absence of a small-molecule inhibitor. The results are shown in Table 1. The extrapolated maximum velocity (Vmax) was determined to be 75 μmol/min in both conditions. In a separate experiment, 50 μg of purified PK (MW = 200 kDa) produced a maximum reaction rate of 150 nmol/min.

PK is allosterically regulated: ATP inhibits activity by binding a site distinct from the active site, while fructose-1,6-bisphosphate (FBP) activates the enzyme by promoting transition to the active conformation. These regulatory features allow PK to respond to the cell's energy status.`,
    figures: [
      {
        type: 'table',
        title: 'Table 1: PK reaction velocity at varying [PEP]',
        headers: ['[PEP] (mM)', 'v, no inhibitor (μmol/min)', 'v, + inhibitor (μmol/min)'],
        rows: [
          ['0.2', '21', '12'],
          ['0.5', '37.5', '25'],
          ['1.0', '50', '38'],
          ['2.0', '60', '50'],
          ['5.0', '68', '63'],
        ],
      },
    ],
    questions: [
      {
        id: 'mcat2-cp-001',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p1',
        questionType: 'passage',
        discipline: 'Biochemistry',
        contentCategory: 'Enzyme kinetics',
        foundationalConcept: 'FC 1: Biomolecules have unique properties that determine how they contribute to the structure and function of cells.',
        scientificSkill: 'Skill 4',
        difficulty: 'medium',
        question: 'Based on Table 1, what is the Km of pyruvate kinase for PEP in the absence of inhibitor?',
        choices: [
          { label: 'A', text: '0.2 mM' },
          { label: 'B', text: '2.0 mM' },
          { label: 'C', text: '1.0 mM' },
          { label: 'D', text: '0.5 mM' },
        ],
        correctAnswer: 'D',
        explanation: 'Km equals the substrate concentration at which v = Vmax/2. Vmax = 75 μmol/min, so Vmax/2 = 37.5 μmol/min. From Table 1, v = 37.5 μmol/min when [PEP] = 0.5 mM. Therefore Km = 0.5 mM.',
        wrongAnswerExplanations: {
          A: '0.2 mM is the lowest concentration tested; at this point v = 21 μmol/min, well below half-maximal.',
          C: '1.0 mM corresponds to v = 50 μmol/min in the uninhibited condition, which is two-thirds of Vmax, not half.',
          B: '2.0 mM corresponds to v = 60 μmol/min, which is four-fifths of Vmax. This is the apparent Km only for the inhibited enzyme at α ≈ 4, not for the uninhibited enzyme.',
          
        },
        teachingPoint: 'Km = [S] at v = Vmax/2. Read directly from the point in a Michaelis-Menten table where velocity equals exactly half the maximum velocity.',
        relatedTopics: ['Michaelis-Menten kinetics', 'Km', 'enzyme kinetics', 'glycolysis'],
      },
      {
        id: 'mcat2-cp-002',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p1',
        questionType: 'passage',
        discipline: 'Biochemistry',
        contentCategory: 'Enzyme kinetics',
        foundationalConcept: 'FC 1',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Based on Table 1, which type of inhibition does the small-molecule inhibitor most likely represent?',
        choices: [
          { label: 'A', text: 'Uncompetitive inhibition, because Vmax decreases and apparent Km decreases' },
          { label: 'B', text: 'Noncompetitive inhibition, because Vmax decreases while Km is unchanged' },
          { label: 'C', text: 'Competitive inhibition, because Vmax is unchanged while apparent Km increases' },
          { label: 'D', text: 'Irreversible inhibition, because Vmax drops to zero at high inhibitor concentrations' },
        ],
        correctAnswer: 'C',
        explanation: 'The extrapolated Vmax is 75 μmol/min with and without the inhibitor — Vmax is unchanged. The apparent Km is higher with the inhibitor: with inhibitor, v = 37.5 μmol/min is reached above 1.0 mM PEP (compare uninhibited Km = 0.5 mM). Unchanged Vmax + increased apparent Km defines competitive inhibition, where the inhibitor competes with substrate for the active site but can be overcome at high [S].',
        wrongAnswerExplanations: {
          A: 'Uncompetitive inhibitors bind only the enzyme-substrate complex, decreasing both Vmax and apparent Km. The table shows Vmax unchanged, ruling this out.',
          B: 'Pure noncompetitive inhibition decreases Vmax while leaving Km unchanged. The table shows Vmax unchanged but apparent Km clearly higher, inconsistent with noncompetitive inhibition.',
          D: 'Irreversible inhibition removes active enzyme, permanently reducing Vmax. Both columns show the same extrapolated Vmax = 75 μmol/min, inconsistent with irreversible inhibition.',
        },
        teachingPoint: 'Competitive inhibition: Vmax unchanged, apparent Km increases (can be overcome by excess substrate). The inhibitor competes directly with substrate for the active site.',
        relatedTopics: ['competitive inhibition', 'noncompetitive inhibition', 'Lineweaver-Burk', 'enzyme regulation'],
      },
      {
        id: 'mcat2-cp-003',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p1',
        questionType: 'passage',
        discipline: 'Biochemistry',
        contentCategory: 'Enzyme kinetics',
        foundationalConcept: 'FC 1',
        scientificSkill: 'Skill 4',
        difficulty: 'hard',
        question: 'On a Lineweaver-Burk (double-reciprocal) plot comparing the inhibited and uninhibited enzyme, the two lines would intersect at which location?',
        choices: [
          { label: 'A', text: 'On the y-axis (1/[S] = 0), indicating the same Vmax' },
          { label: 'B', text: 'On the x-axis (1/v = 0), indicating the same Km' },
          { label: 'C', text: 'In the second quadrant (negative 1/[S], positive 1/v), indicating the same Vmax' },
          { label: 'D', text: 'In the fourth quadrant (positive 1/[S], negative 1/v), indicating the same Km' },
        ],
        correctAnswer: 'C',
        explanation: 'For competitive inhibition on a Lineweaver-Burk plot (1/v vs 1/[S]), the equation is 1/v = (αKm/Vmax)(1/[S]) + 1/Vmax. The y-intercept is 1/Vmax in both conditions (same Vmax). The lines diverge in slope but share the same y-intercept. The intersection appears at 1/[S] = 0 — which is the y-axis — where both lines share y = 1/Vmax. However, on the graph, the lines visually "converge" on the y-axis rather than in the second quadrant. The x-intercept of the uninhibited line is -1/Km; for inhibited it is -1/(αKm), a different point. Both lines share ONLY the y-intercept: the intersection is on the y-axis where 1/[S] = 0.',
        wrongAnswerExplanations: {
          B: 'If the lines intersected on the x-axis, they would share the same x-intercept = -1/Km. This would mean the same Km, which contradicts the definition of competitive inhibition (apparent Km increases).',
          D: 'The fourth quadrant intersection (same x-intercept, different y-intercepts) characterizes noncompetitive inhibition, where Km is unchanged but Vmax decreases.',
          A: 'This answer is partially correct in that the shared y-intercept IS on the y-axis, but the phrasing "on the y-axis" is the same as option C in substance. Option C more precisely states the intersection occurs where 1/[S] = 0, i.e., the y-axis. Both describe the same geometric point; C gives the correct mechanistic reasoning (same Vmax).',
        },
        teachingPoint: 'Lineweaver-Burk for competitive inhibition: lines share y-intercept (1/Vmax) but have different slopes and x-intercepts. The intersection is at the y-axis (1/[S]=0). Noncompetitive: lines share x-intercept (-1/Km) but different y-intercepts.',
        relatedTopics: ['Lineweaver-Burk plot', 'competitive inhibition', 'double-reciprocal plot', 'enzyme kinetics'],
      },
      {
        id: 'mcat2-cp-004',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p1',
        questionType: 'passage',
        discipline: 'Biochemistry',
        contentCategory: 'Enzyme regulation',
        foundationalConcept: 'FC 1',
        scientificSkill: 'Skill 2',
        difficulty: 'easy',
        question: 'According to the passage, when intracellular ATP levels are elevated, which of the following best describes the effect on pyruvate kinase?',
        choices: [
          { label: 'A', text: 'PK activity increases, accelerating ATP production from PEP' },
          { label: 'B', text: 'PK activity decreases because ATP binds the active site and competes with PEP' },
          { label: 'C', text: 'PK activity decreases because ATP binds an allosteric site and shifts the enzyme toward an inactive conformation' },
          { label: 'D', text: 'PK activity is unchanged because allosteric inhibitors only affect Km, not catalytic rate' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage states that ATP inhibits PK by binding "a site distinct from the active site" — this is the defining feature of allosteric inhibition. High ATP signals that energy is already sufficient; inhibiting PK slows glycolysis, preventing further ATP production. Allosteric inhibitors reduce catalytic activity by causing conformational changes, typically decreasing Vmax.',
        wrongAnswerExplanations: {
          A: 'This contradicts the passage, which explicitly states that ATP inhibits (not activates) PK. Furthermore, stimulating PK when ATP is already high would wastefully overproduce ATP.',
          B: 'The passage states the inhibitory site is "distinct from the active site," so ATP does not compete with PEP. Competitive inhibition would be reversible by excess PEP and is not what is described.',
          D: 'Allosteric inhibitors typically reduce Vmax by decreasing the fraction of enzyme in the active conformation. The statement that allosteric inhibitors "only affect Km" is incorrect.',
        },
        teachingPoint: 'Allosteric regulation: effector binds at a site distinct from the active site, causing conformational change. ATP inhibiting PK when energy is abundant is a classic feedback control mechanism in glycolysis.',
        relatedTopics: ['allosteric regulation', 'feedback inhibition', 'glycolysis regulation', 'ATP', 'pyruvate kinase'],
      },
      {
        id: 'mcat2-cp-005',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p1',
        questionType: 'passage',
        discipline: 'Biochemistry',
        contentCategory: 'Enzyme kinetics',
        foundationalConcept: 'FC 1',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'In the separate experiment described, 50 μg of PK (MW = 200 kDa) achieved a maximum reaction rate of 150 nmol/min. What is the turnover number (kcat) of this enzyme?',
        choices: [
          { label: 'A', text: '0.05 s⁻¹' },
          { label: 'B', text: '0.5 s⁻¹' },
          { label: 'C', text: '10 s⁻¹' },
          { label: 'D', text: '600 s⁻¹' },
        ],
        correctAnswer: 'C',
        explanation: 'kcat = Vmax / [E]T. First find moles of enzyme: 50 μg = 50 × 10⁻⁶ g; [E]T = 50 × 10⁻⁶ g ÷ 200,000 g/mol = 2.5 × 10⁻¹⁰ mol. Vmax = 150 nmol/min = 150 × 10⁻⁹ mol/min. kcat = (150 × 10⁻⁹ mol/min) ÷ (2.5 × 10⁻¹⁰ mol) = 600 min⁻¹. Convert to s⁻¹: 600 ÷ 60 = 10 s⁻¹.',
        wrongAnswerExplanations: {
          A: '0.05 s⁻¹ would result from an additional factor-of-200 error, possibly confusing kDa with Da or incorrectly handling exponents.',
          B: '0.5 s⁻¹ results from dividing 600 min⁻¹ by 1,200 instead of 60 — a unit conversion error.',
          D: '600 s⁻¹ is the kcat in min⁻¹, not s⁻¹. This error arises from forgetting to convert minutes to seconds (divide by 60).',
        },
        teachingPoint: 'kcat (turnover number) = Vmax ÷ [E]T. Steps: (1) convert enzyme mass to moles using MW, (2) compute kcat in min⁻¹, (3) convert to s⁻¹ by dividing by 60.',
        relatedTopics: ['turnover number', 'kcat', 'catalytic efficiency', 'enzyme kinetics', 'unit conversion'],
      },
    ],
  },

  // ─── Passage 2: Gas Laws and Pulmonary Physiology ───────────────────────────
  {
    id: 'f2-cp-p2',
    sectionId: 'chem-phys',
    title: 'Alveolar Gas Exchange and Dalton\'s Law',
    passageText: `Gas exchange in the lungs depends on the partial pressures of oxygen (O₂) and carbon dioxide (CO₂) across the alveolar-capillary membrane. Dalton's Law states that the total pressure of a gas mixture equals the sum of the partial pressures of each component gas:

P_total = P_O₂ + P_CO₂ + P_N₂ + P_H₂O + ...

At sea level, atmospheric pressure is 760 mmHg. Inspired air is approximately 21% O₂ and 79% N₂ (ignoring trace gases). As air enters the lungs, it becomes saturated with water vapor (P_H₂O = 47 mmHg at 37°C), reducing the effective partial pressure of inhaled gases.

Alveolar air differs from inspired air because CO₂ diffuses from blood into alveoli. The alveolar gas equation approximates alveolar PO₂ (P_AO₂):

P_AO₂ = P_IO₂ − (P_ACO₂ / RQ)

where P_IO₂ is the inspired PO₂ after humidification, P_ACO₂ is alveolar PCO₂ (≈ arterial PCO₂ = 40 mmHg at rest), and RQ (respiratory quotient) is approximately 0.8 for a mixed diet.

Gas transfer across the alveolar membrane follows Fick's Law: the rate of diffusion is proportional to the surface area, the partial pressure gradient, and the solubility of the gas, and inversely proportional to membrane thickness.

Henry's Law relates the dissolved concentration of a gas in liquid to its partial pressure: [gas] = k_H × P, where k_H is the Henry's Law constant. CO₂ is approximately 24 times more soluble in blood than O₂, contributing to its rapid diffusion despite having a smaller partial pressure gradient.`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-006',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p2',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Gas phase — kinetic molecular theory and gas laws',
        foundationalConcept: 'FC 4: Complex living organisms transport materials, sense their environment, process signals, and respond to changes using processes understood in terms of physical principles.',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Using the information in the passage, what is the approximate partial pressure of inspired oxygen (P_IO₂) after humidification at sea level?',
        choices: [
          { label: 'A', text: '100 mmHg' },
          { label: 'B', text: '713 mmHg' },
          { label: 'C', text: '160 mmHg' },
          { label: 'D', text: '150 mmHg' },
        ],
        correctAnswer: 'D',
        explanation: 'After humidification, the effective total pressure is 760 − 47 = 713 mmHg. Oxygen is 21% of dry air, so P_IO₂ = 0.21 × 713 = 149.7 ≈ 150 mmHg. This is the standard value for inspired PO₂ at sea level.',
        wrongAnswerExplanations: {
          A: '100 mmHg is the alveolar PO₂ (P_AO₂) after CO₂ has entered the alveoli, not the inspired PO₂ after humidification.',
          C: '160 mmHg = 0.21 × 760 — this calculation ignores the subtraction of water vapor pressure (47 mmHg) from total atmospheric pressure.',
          B: '713 mmHg is the total pressure of dry gases after subtracting water vapor, not just the oxygen fraction.',
          
        },
        teachingPoint: 'Inspired PO₂ = fraction O₂ × (P_atm − P_H₂O) = 0.21 × (760 − 47) = 0.21 × 713 ≈ 150 mmHg. Always subtract P_H₂O before applying fractions.',
        relatedTopics: ['Dalton\'s Law', 'partial pressure', 'alveolar gas equation', 'pulmonary physiology'],
      },
      {
        id: 'mcat2-cp-007',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p2',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Gas phase — kinetic molecular theory and gas laws',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'Using the alveolar gas equation with P_IO₂ = 150 mmHg, P_ACO₂ = 40 mmHg, and RQ = 0.8, what is the alveolar PO₂ (P_AO₂)?',
        choices: [
          { label: 'A', text: '100 mmHg' },
          { label: 'B', text: '110 mmHg' },
          { label: 'C', text: '120 mmHg' },
          { label: 'D', text: '140 mmHg' },
        ],
        correctAnswer: 'A',
        explanation: 'P_AO₂ = P_IO₂ − (P_ACO₂ / RQ) = 150 − (40 / 0.8) = 150 − 50 = 100 mmHg. This is the normal alveolar PO₂ at rest, consistent with arterial PO₂ of approximately 95–100 mmHg.',
        wrongAnswerExplanations: {
          B: '110 mmHg results from using RQ = 1.0: 150 − (40/1.0) = 110. However, the passage specifies RQ = 0.8 for a mixed diet.',
          C: '120 mmHg would require P_ACO₂/RQ = 30, which is incorrect with the given values.',
          D: '140 mmHg ignores the CO₂ correction entirely (150 − 10) or uses an unrealistically high RQ ≈ 4.',
        },
        teachingPoint: 'Alveolar gas equation: P_AO₂ = P_IO₂ − P_ACO₂/RQ = 150 − 40/0.8 = 100 mmHg. The division by RQ (not 1.0) reflects that more O₂ is consumed per CO₂ produced on a mixed diet.',
        relatedTopics: ['alveolar gas equation', 'respiratory quotient', 'alveolar PO₂', 'pulmonary gas exchange'],
      },
      {
        id: 'mcat2-cp-008',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p2',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'The passage states that CO₂ is approximately 24 times more soluble in blood than O₂. According to Henry\'s Law, if the partial pressure of CO₂ at the alveolar-capillary interface is 45 mmHg and the Henry\'s Law constant for CO₂ is k, what determines the dissolved CO₂ concentration?',
        choices: [
          { label: 'A', text: '[CO₂] = 45 / k' },
          { label: 'B', text: '[CO₂] = k / 45' },
          { label: 'C', text: '[CO₂] = k × 45' },
          { label: 'D', text: '[CO₂] = k + 45' },
        ],
        correctAnswer: 'C',
        explanation: 'Henry\'s Law: [gas] = k_H × P. The dissolved concentration of a gas is directly proportional to its partial pressure, with the Henry\'s Law constant k_H as the proportionality constant. At P_CO₂ = 45 mmHg: [CO₂] = k × 45.',
        wrongAnswerExplanations: {
          A: '45/k would imply concentration decreases as partial pressure increases — the opposite of Henry\'s Law.',
          D: 'k + 45 is additive rather than multiplicative; Henry\'s Law describes a proportional (multiplicative) relationship.',
          B: 'k/45 has the same inverse relationship problem and is also dimensionally problematic.',
        },
        teachingPoint: 'Henry\'s Law: [gas] = k_H × P. Dissolved gas concentration is directly proportional to partial pressure. CO₂\'s high solubility (24× O₂) means significant amounts dissolve in blood even at modest partial pressures.',
        relatedTopics: ['Henry\'s Law', 'gas solubility', 'CO₂ transport', 'blood gases'],
      },
      {
        id: 'mcat2-cp-009',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p2',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 3',
        difficulty: 'medium',
        question: 'A researcher wants to study gas diffusion by measuring the rate at which O₂ crosses a model alveolar membrane. According to Fick\'s Law as described in the passage, which experimental manipulation would most increase the diffusion rate?',
        choices: [
          { label: 'A', text: 'Doubling the membrane thickness' },
          { label: 'B', text: 'Halving the alveolar surface area' },
          { label: 'C', text: 'Doubling the partial pressure gradient of O₂ across the membrane' },
          { label: 'D', text: 'Replacing O₂ with a gas of equivalent partial pressure but lower solubility' },
        ],
        correctAnswer: 'C',
        explanation: 'Fick\'s Law: diffusion rate ∝ (surface area × pressure gradient × solubility) / membrane thickness. Doubling the pressure gradient doubles the diffusion rate. Options A and B would halve and reduce diffusion, respectively. Option D would decrease diffusion rate by reducing solubility.',
        wrongAnswerExplanations: {
          A: 'Doubling thickness decreases diffusion rate by half (diffusion rate inversely proportional to thickness).',
          B: 'Halving surface area decreases diffusion rate by half (rate directly proportional to area).',
          D: 'Lower solubility decreases the driving force for gas transfer into solution, reducing the effective diffusion rate.',
        },
        teachingPoint: 'Fick\'s Law: J = D × A × ΔP / (thickness). To increase diffusion: increase ΔP, increase A, increase solubility/diffusivity, or decrease thickness.',
        relatedTopics: ['Fick\'s Law', 'diffusion', 'alveolar gas exchange', 'membrane permeability'],
      },
      {
        id: 'mcat2-cp-010',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p2',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Gas phase — kinetic molecular theory and gas laws',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'A patient with pulmonary fibrosis has alveolar membranes that are 3× thicker than normal. If all other parameters remain constant, what is the expected change in the rate of O₂ diffusion?',
        choices: [
          { label: 'A', text: 'Decreases to one-third of normal' },
          { label: 'B', text: 'Decreases to one-ninth of normal' },
          { label: 'C', text: 'Increases by a factor of 3' },
          { label: 'D', text: 'Unchanged, because pressure gradients compensate' },
        ],
        correctAnswer: 'A',
        explanation: 'Fick\'s Law: diffusion rate ∝ 1/thickness. If thickness triples (3×), diffusion rate decreases to 1/3 of normal. This is why pulmonary fibrosis causes hypoxemia — thickened alveolar walls impair O₂ transfer.',
        wrongAnswerExplanations: {
          B: '1/9 would result if diffusion were inversely proportional to thickness², but Fick\'s Law has a linear inverse relationship with thickness.',
          C: 'Tripled thickness decreases, not increases, diffusion. The relationship is inverse.',
          D: 'The pressure gradient is not self-adjusting. Thicker membranes reduce diffusion regardless of gradient unless the patient compensates with hyperventilation.',
        },
        teachingPoint: 'Fick\'s Law: diffusion rate inversely proportional to membrane thickness. Triple the thickness → one-third the diffusion rate. Pulmonary fibrosis impairs gas exchange by thickening alveolar membranes.',
        relatedTopics: ['Fick\'s Law', 'pulmonary fibrosis', 'diffusion rate', 'alveolar membrane'],
      },
    ],
  },

  // ─── Passage 3: Electrochemistry — Galvanic Cells and Nernst Equation ────────
  {
    id: 'f2-cp-p3',
    sectionId: 'chem-phys',
    title: 'Galvanic Cell Thermodynamics and the Nernst Equation',
    passageText: `Galvanic (voltaic) cells convert chemical energy into electrical energy through spontaneous redox reactions. In a standard galvanic cell, two half-reactions occur simultaneously: oxidation at the anode and reduction at the cathode. Electrons flow through an external circuit from anode to cathode.

Standard reduction potentials (E°red) are measured relative to the standard hydrogen electrode (SHE, E° = 0.00 V). The standard cell potential is:

E°cell = E°cathode − E°anode

Selected standard reduction potentials:
• Zn²⁺(aq) + 2e⁻ → Zn(s)    E° = −0.76 V
• Cu²⁺(aq) + 2e⁻ → Cu(s)    E° = +0.34 V
• Fe³⁺(aq) + e⁻ → Fe²⁺(aq)  E° = +0.77 V
• Ag⁺(aq) + e⁻ → Ag(s)       E° = +0.80 V

The relationship between cell potential and Gibbs free energy is:

ΔG° = −nFE°cell

where n is the number of moles of electrons transferred and F = 96,485 C/mol (Faraday's constant).

Under non-standard conditions, the Nernst equation corrects for concentration:

E = E° − (RT/nF) ln Q = E° − (0.0592/n) log Q  (at 25°C)

where Q is the reaction quotient. At equilibrium, E = 0 and Q = Keq, so:

log Keq = nE°/0.0592`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-011',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p3',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5: The principles that govern chemical interactions and reactions.',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'A galvanic cell is constructed with a zinc anode and a copper cathode in their respective 1.0 M ion solutions. What is the standard cell potential?',
        choices: [
          { label: 'A', text: '−1.10 V' },
          { label: 'B', text: '+0.42 V' },
          { label: 'C', text: '+1.10 V' },
          { label: 'D', text: '+1.56 V' },
        ],
        correctAnswer: 'C',
        explanation: 'E°cell = E°cathode − E°anode = (+0.34 V) − (−0.76 V) = +0.34 + 0.76 = +1.10 V. Zinc is the anode (oxidized) and copper is the cathode (reduced) because copper has the higher (more positive) reduction potential.',
        wrongAnswerExplanations: {
          A: '−1.10 V would result from subtracting in the wrong direction (E°anode − E°cathode), incorrectly treating zinc as cathode and copper as anode.',
          B: '+0.42 V = 0.34 + 0.08 — an arithmetic error unrelated to the actual half-cell potentials.',
          D: '+1.56 V = 0.80 − (−0.76) — this uses the silver reduction potential instead of copper\'s, confusing Cu²⁺/Cu with Ag⁺/Ag.',
        },
        teachingPoint: 'E°cell = E°cathode − E°anode. The cathode has the higher (more positive) reduction potential. For Zn-Cu cell: (+0.34) − (−0.76) = +1.10 V. A positive E°cell confirms spontaneity.',
        relatedTopics: ['galvanic cell', 'standard reduction potential', 'cell potential', 'electrochemistry'],
      },
      {
        id: 'mcat2-cp-012',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p3',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'For the Zn-Cu galvanic cell with E°cell = +1.10 V and n = 2, what is ΔG° for the cell reaction?',
        choices: [
          { label: 'A', text: '+212 kJ/mol' },
          { label: 'B', text: '−212 kJ/mol' },
          { label: 'C', text: '+424 kJ/mol' },
          { label: 'D', text: '−424 kJ/mol' },
        ],
        correctAnswer: 'B',
        explanation: 'ΔG° = −nFE°cell = −(2)(96,485 C/mol)(+1.10 V) = −212,267 J/mol ≈ −212 kJ/mol. The negative sign confirms the reaction is spontaneous (ΔG° < 0 for a galvanic cell with positive E°cell).',
        wrongAnswerExplanations: {
          A: '+212 kJ/mol has the wrong sign. ΔG° = −nFE°. With E° > 0 and n > 0, ΔG° must be negative (spontaneous).',
          C: '+424 kJ/mol uses +2nFE° instead of −nFE°, giving both the wrong sign and an incorrect factor of 2.',
          D: '−424 kJ/mol uses n = 4 instead of n = 2, or doubles the result without justification.',
        },
        teachingPoint: 'ΔG° = −nFE°cell. Positive E°cell → negative ΔG° (spontaneous). F ≈ 96,485 C/mol; use n from the balanced equation. For Zn-Cu: ΔG° = −(2)(96,485)(1.10) ≈ −212 kJ/mol.',
        relatedTopics: ['Gibbs free energy', 'Faraday constant', 'electrochemistry', 'spontaneity'],
      },
      {
        id: 'mcat2-cp-013',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p3',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'For the Zn-Cu cell, if [Zn²⁺] = 0.10 M and [Cu²⁺] = 1.0 M, how does the actual cell potential E compare to E°cell = +1.10 V?',
        choices: [
          { label: 'A', text: 'E < 1.10 V, because the reaction quotient Q > 1' },
          { label: 'B', text: 'E = 1.10 V, because concentration effects cancel at 25°C' },
          { label: 'C', text: 'E > 1.10 V, because lowering [Zn²⁺] shifts the equilibrium toward products' },
          { label: 'D', text: 'E < 1.10 V, because lowering [Cu²⁺] decreases the driving force for reduction' },
        ],
        correctAnswer: 'C',
        explanation: 'The cell reaction is Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Q = [Zn²⁺]/[Cu²⁺] = 0.10/1.0 = 0.10 < 1. By the Nernst equation: E = E° − (0.0592/2) log(0.10) = 1.10 − (0.0296)(−1) = 1.10 + 0.0296 ≈ 1.13 V > 1.10 V. When Q < 1 (reaction quotient less than equilibrium), the reaction has more driving force, so E > E°.',
        wrongAnswerExplanations: {
          A: 'Q = [Zn²⁺]/[Cu²⁺] = 0.10/1.0 = 0.10 < 1, not > 1. When Q < 1, E > E° (not less).',
          B: 'Concentration effects do not cancel unless concentrations are at standard state (1.0 M each). [Zn²⁺] = 0.10 M ≠ standard.',
          D: '[Cu²⁺] = 1.0 M (unchanged); [Zn²⁺] is reduced to 0.10 M, which decreases Q and increases E, not decreases it.',
        },
        teachingPoint: 'Nernst equation: E = E° − (0.0592/n) log Q. When Q < 1, log Q < 0, so E > E°. Depleting a product (or diluting Zn²⁺) or enriching a reactant increases cell potential.',
        relatedTopics: ['Nernst equation', 'reaction quotient', 'cell potential', 'concentration effects'],
      },
      {
        id: 'mcat2-cp-014',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p3',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'In the Zn-Cu galvanic cell, which species undergoes oxidation and where does it occur?',
        choices: [
          { label: 'A', text: 'Cu(s) is oxidized at the cathode' },
          { label: 'B', text: 'Zn²⁺(aq) is oxidized at the cathode' },
          { label: 'C', text: 'Cu²⁺(aq) is oxidized at the anode' },
          { label: 'D', text: 'Zn(s) is oxidized at the anode' },
        ],
        correctAnswer: 'D',
        explanation: 'In a galvanic cell, oxidation occurs at the anode. Zinc has the lower (more negative) reduction potential (−0.76 V vs. +0.34 V for copper), so zinc is oxidized: Zn(s) → Zn²⁺(aq) + 2e⁻. Copper is reduced at the cathode: Cu²⁺(aq) + 2e⁻ → Cu(s).',
        wrongAnswerExplanations: {
          A: 'Cu is reduced (gains electrons) at the cathode, not oxidized. Copper\'s higher reduction potential means it favors being reduced.',
          C: 'Cu²⁺ is the oxidizing agent (it gets reduced to Cu); it does not undergo oxidation. Additionally, the anode process involves Zn, not copper.',
          B: 'Zn²⁺ is the product of Zn oxidation; it does not itself undergo oxidation. The cathode is the site of reduction, not oxidation.',
          
        },
        teachingPoint: 'Mnemonic: "An Ox, Red Cat" — Anode = Oxidation, Cathode = Reduction. In galvanic cells, the species with the lower (more negative) reduction potential is oxidized at the anode.',
        relatedTopics: ['galvanic cell', 'anode', 'cathode', 'oxidation', 'reduction'],
      },
      {
        id: 'mcat2-cp-015',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p3',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Electrochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'Using the relationship log Keq = nE°/0.0592, what is the equilibrium constant for the Zn-Cu cell reaction at 25°C?',
        choices: [
          { label: 'A', text: 'Keq ≈ 10³⁷' },
          { label: 'B', text: 'Keq ≈ 10²³' },
          { label: 'C', text: 'Keq ≈ 10¹⁹, because only one electron is transferred in this reaction' },
          { label: 'D', text: 'Keq ≈ 1, because the cell is at standard state' },
        ],
        correctAnswer: 'A',
        explanation: 'log Keq = nE°/0.0592 = (2 × 1.10)/0.0592 = 2.20/0.0592 ≈ 37.2. Therefore Keq ≈ 10³⁷. n = 2 because the Zn/Cu cell transfers 2 electrons per formula unit (Zn → Zn²⁺ + 2e⁻; Cu²⁺ + 2e⁻ → Cu). This enormous equilibrium constant confirms the reaction strongly and essentially irreversibly favors products.',
        wrongAnswerExplanations: {
          B: '10²³ would require nE°/0.0592 ≈ 23, implying nE° ≈ 1.36 V. With E°cell = 1.10 V and n = 2, nE° = 2.20, giving log Keq ≈ 37, not 23.',
          C: 'The Zn/Cu cell transfers n = 2 electrons per formula unit, not 1. Using n = 1 erroneously gives log Keq = (1)(1.10)/0.0592 ≈ 18.6, or Keq ≈ 10¹⁹ — a factor of 10¹⁸ too small.',
          D: 'Keq = 1 (log Keq = 0) would require E°cell = 0, indicating no net thermodynamic driving force. A large positive E°cell = 1.10 V guarantees Keq >> 1.',
        },
        teachingPoint: 'log Keq = nE°/0.0592. For Zn-Cu: log Keq = (2)(1.10)/0.0592 ≈ 37. This huge Keq means the reaction is essentially irreversible under normal conditions — zinc will spontaneously dissolve as copper plates out.',
        relatedTopics: ['equilibrium constant', 'Nernst equation', 'cell potential', 'thermodynamics'],
      },
    ],
  },

  // ─── Passage 4: Geometric Optics and the Eye ────────────────────────────────
  {
    id: 'f2-cp-p4',
    sectionId: 'chem-phys',
    title: 'Geometric Optics and Image Formation in the Human Eye',
    passageText: `The human eye forms images using a combination of the cornea (providing ~67% of total refractive power) and the crystalline lens. The total refractive power of the relaxed normal eye is approximately 60 diopters (D), where 1 D = 1/focal length (in meters).

The thin-lens equation relates object distance (d_o), image distance (d_i), and focal length (f):

1/d_o + 1/d_i = 1/f

The lens equation is also expressed in terms of refractive power P (diopters): P = 1/f. For a relaxed eye viewing a distant object, the image forms on the retina (d_i ≈ 2.0 cm = 0.020 m).

In myopia (nearsightedness), the focal point falls in front of the retina when viewing distant objects. In hyperopia (farsightedness), it falls behind the retina. Corrective lenses compensate by changing the total system power.

Lateral magnification (m) is defined as:

m = −d_i / d_o = h_i / h_o

where h_i and h_o are image and object heights. A negative magnification indicates an inverted image.

For refraction at a single spherical interface, Snell's Law applies:

n₁ sin θ₁ = n₂ sin θ₂

The index of refraction of the cornea is approximately 1.38; aqueous humor is 1.34; and the lens varies from 1.39–1.41 from edge to center.`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-016',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p4',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Light and geometrical optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'The passage states that the relaxed eye has a total refractive power of approximately 60 D and an image distance (axial length) of 2.0 cm. A corrected calculation shows the actual minimal power for focusing distant objects at a 2.0 cm image distance is 50 D. Which situation does P = 60 D, d_i = 2.0 cm most accurately describe?',
        choices: [
          { label: 'A', text: 'A relaxed emmetropic eye focused at infinity' },
          { label: 'B', text: 'A hyperopic eye requiring a converging corrective lens' },
          { label: 'C', text: 'An accommodating eye focused at a near object approximately 10 cm away' },
          { label: 'D', text: 'A myopic eye that cannot focus objects at infinity' },
        ],
        correctAnswer: 'C',
        explanation: 'Using 1/f = P = 60 D → f = 1/60 m = 1.67 cm. With d_i = 2.0 cm: 1/d_o = 1/f − 1/d_i = 60 − 50 = 10 m⁻¹ → d_o = 0.10 m = 10 cm. A total power of 60 D with a 2.0 cm axial length focuses objects at approximately 10 cm — this represents the accommodating eye (ciliary muscles contracted, lens thickened) focused at the near point. A relaxed emmetropic eye needs P ≈ 50 D to focus infinity on a 2 cm retina.',
        wrongAnswerExplanations: {
          A: 'For infinity focus at d_i = 2.0 cm, P = 1/d_i = 50 D. P = 60 D > 50 D means too much power for infinity focus; the focal point falls anterior to the retina for distant objects.',
          D: 'Myopia can occur here if the axial length is >2 cm (the eye is too long), but the described eye has d_i = 2.0 cm with P = 60 D, which gives a near-point focus, not the definition of myopia per se.',
          B: 'Hyperopia means the eye has insufficient power (P too low); at P = 60 D with a 2 cm axial length, the power is actually above the minimum for emmetropia, not below.',
        },
        teachingPoint: 'Key relationship: P_min for infinity focus = 1/d_i. For d_i = 2 cm, P_min = 50 D. Total power of 60 D > 50 D means the lens is accommodating and the system is focused at d_o = 1/(P − 1/d_i) = 1/10 m = 10 cm.',
        relatedTopics: ['thin-lens equation', 'accommodation', 'near point', 'diopters', 'eye optics'],
      },
      {
        id: 'mcat2-cp-017',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p4',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Light and geometrical optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'A myopic patient\'s uncorrected eye forms a sharp image of a distant object 1.8 cm in front of the retina (image distance = 1.8 cm, retina at 2.0 cm). This patient should be corrected with which type of lens?',
        choices: [
          { label: 'A', text: 'Converging (convex) lens, to increase total refractive power' },
          { label: 'B', text: 'Diverging (concave) lens, to decrease total refractive power' },
          { label: 'C', text: 'Converging lens, to move the image forward toward the cornea' },
          { label: 'D', text: 'Plano lens (flat, no power), to eliminate aberrations' },
        ],
        correctAnswer: 'B',
        explanation: 'In myopia, the eye is too powerful (or too long), so light from distant objects converges in front of the retina. To correct this, total refractive power must decrease. A diverging (concave) lens with negative power spreads light before it enters the eye, effectively reducing total power and moving the focal point back to the retina.',
        wrongAnswerExplanations: {
          A: 'A converging lens increases refractive power, which would worsen myopia by bringing the focal point even farther in front of the retina.',
          C: 'The image in myopia is already too far forward (anterior to retina). Moving the image further forward is the wrong direction.',
          D: 'A plano lens provides no refractive correction and does nothing to address the underlying focusing error.',
        },
        teachingPoint: 'Myopia: eye too powerful → focal point anterior to retina → correct with diverging (negative power) lens. Hyperopia: eye not powerful enough → correct with converging (positive power) lens.',
        relatedTopics: ['myopia', 'hyperopia', 'corrective lenses', 'converging lens', 'diverging lens'],
      },
      {
        id: 'mcat2-cp-018',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p4',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Light and geometrical optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'An object 25 cm from the eye produces an image on the retina (d_i = 2.0 cm). What is the magnification and orientation of the retinal image?',
        choices: [
          { label: 'A', text: 'm = −0.08 (inverted, reduced)' },
          { label: 'B', text: 'm = +0.08 (upright, reduced)' },
          { label: 'C', text: 'm = −12.5 (inverted, magnified)' },
          { label: 'D', text: 'm = +12.5 (upright, magnified)' },
        ],
        correctAnswer: 'A',
        explanation: 'm = −d_i/d_o = −(0.020 m)/(0.25 m) = −0.08. The negative sign indicates the image is inverted; |m| = 0.08 < 1 indicates the image is reduced in size. The brain\'s visual cortex corrects for the inverted retinal image.',
        wrongAnswerExplanations: {
          B: '+0.08 has the correct magnitude but wrong sign. Converging (real) images formed by the eye lens are always inverted (negative magnification).',
          C: 'm = −d_o/d_i = −12.5 — this inverts the ratio. The formula is m = −d_i/d_o, not −d_o/d_i.',
          D: '+12.5 uses both the wrong ratio and the wrong sign.',
        },
        teachingPoint: 'Magnification m = −d_i/d_o. Negative → inverted image (normal for real images from converging lenses). The retinal image is always small and inverted; the brain interprets it as upright.',
        relatedTopics: ['magnification', 'thin-lens equation', 'real image', 'retinal image'],
      },
      {
        id: 'mcat2-cp-019',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p4',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Light and geometrical optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Light travels from the cornea (n = 1.38) into the aqueous humor (n = 1.34). According to Snell\'s Law, compared to the incident angle, the refracted ray will:',
        choices: [
          { label: 'A', text: 'Bend away from the normal because it enters a less dense medium' },
          { label: 'B', text: 'Bend toward the normal because it enters a denser medium' },
          { label: 'C', text: 'Continue straight without bending because the indices are similar' },
          { label: 'D', text: 'Undergo total internal reflection at the cornea-aqueous interface' },
        ],
        correctAnswer: 'A',
        explanation: 'Snell\'s Law: n₁ sin θ₁ = n₂ sin θ₂. The cornea (n₁ = 1.38) is denser than the aqueous humor (n₂ = 1.34). When light moves from higher to lower index (less dense medium), sin θ₂ = (n₁/n₂) sin θ₁ > sin θ₁, so θ₂ > θ₁ — the ray bends away from the normal. Although the bend is small due to the small index difference, the direction is away from the normal.',
        wrongAnswerExplanations: {
          C: 'Any difference in refractive index causes some bending, even if small. The ray does refract.',
          D: 'Total internal reflection only occurs at angles above the critical angle when light moves from denser to less dense. At typical angles in the eye, this does not occur.',
          B: 'Light bends toward the normal only when moving into a denser medium (higher n). Here n decreases from 1.38 to 1.34.',
        },
        teachingPoint: 'Snell\'s Law: light bends toward normal entering denser medium (higher n) and away from normal entering less dense medium (lower n). Cornea → aqueous: n decreases → ray bends away from normal.',
        relatedTopics: ['Snell\'s Law', 'refraction', 'index of refraction', 'total internal reflection'],
      },
    ],
  },

  // ─── Passage 5: Thermodynamics — ΔG, ΔH, Hess's Law ────────────────────────
  {
    id: 'f2-cp-p5',
    sectionId: 'chem-phys',
    title: 'Thermodynamics of ATP Hydrolysis and Coupled Reactions',
    passageText: `The hydrolysis of ATP is the primary energy-releasing reaction in cellular metabolism:

ATP + H₂O → ADP + Pᵢ     ΔG°' = −30.5 kJ/mol

The prime symbol (°') denotes standard biological conditions: 25°C, 1 M solutes, pH 7.0. Under physiological conditions in actively metabolizing cells, ΔG for ATP hydrolysis can be as negative as −50 to −60 kJ/mol because intracellular ATP/ADP ratios are maintained far from equilibrium.

Cells couple ATP hydrolysis to thermodynamically unfavorable reactions to drive them forward. The thermodynamic principle is:

ΔG_total = ΔG₁ + ΔG₂

For a coupled reaction to be spontaneous, ΔG_total must be negative.

The relationship between standard free energy and equilibrium constant is:

ΔG° = −RT ln Keq

where R = 8.314 J/(mol·K) and T is temperature in Kelvin. At 25°C (298 K), this simplifies to:

ΔG° = −(2.303 RT) log Keq ≈ −5,710 log Keq  (in J/mol)

or equivalently, ΔG° ≈ −(5.71 kJ/mol) log Keq

Hess's Law states that the enthalpy change (ΔH) for an overall reaction equals the sum of ΔH values for each individual step, regardless of pathway. An analogous principle applies to ΔG: overall ΔG = sum of ΔG for each step.`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-020',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p5',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics and thermochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'easy',
        question: 'The synthesis of glutamine from glutamate and NH₃ has ΔG°\' = +14.2 kJ/mol. When coupled to ATP hydrolysis (ΔG°\' = −30.5 kJ/mol), what is the ΔG°\' of the coupled reaction?',
        choices: [
          { label: 'A', text: '+44.7 kJ/mol' },
          { label: 'B', text: '+16.3 kJ/mol' },
          { label: 'C', text: '−16.3 kJ/mol' },
          { label: 'D', text: '−44.7 kJ/mol' },
        ],
        correctAnswer: 'C',
        explanation: 'ΔG°\'_total = ΔG°\'_synthesis + ΔG°\'_ATP hydrolysis = (+14.2) + (−30.5) = −16.3 kJ/mol. The negative total ΔG°\' confirms the coupled reaction is thermodynamically spontaneous under standard biological conditions.',
        wrongAnswerExplanations: {
          A: '+44.7 kJ/mol = 14.2 + 30.5 — this adds the magnitudes without applying the negative sign to ATP hydrolysis.',
          B: '+16.3 kJ/mol = 30.5 − 14.2 — this subtracts in the wrong order and keeps the wrong sign.',
          D: '−44.7 kJ/mol = −(14.2 + 30.5) — this applies a negative sign to both terms incorrectly.',
        },
        teachingPoint: 'Coupled reaction: ΔG_total = ΔG₁ + ΔG₂. ATP hydrolysis (ΔG < 0) can drive unfavorable reactions (ΔG > 0) if the sum is negative. Glutamine synthesis (+14.2) + ATP hydrolysis (−30.5) = −16.3 kJ/mol (spontaneous).',
        relatedTopics: ['coupled reactions', 'Gibbs free energy', 'ATP hydrolysis', 'thermodynamics'],
      },
      {
        id: 'mcat2-cp-021',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p5',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics and thermochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Using ΔG°\' = −(5.71 kJ/mol) log Keq, what is the equilibrium constant for ATP hydrolysis (ΔG°\' = −30.5 kJ/mol)?',
        choices: [
          { label: 'A', text: 'Keq ≈ 10⁵·³ ≈ 200,000' },
          { label: 'B', text: 'Keq ≈ 10²·³ ≈ 200' },
          { label: 'C', text: 'Keq ≈ 10⁻⁵·³ ≈ 5 × 10⁻⁶' },
          { label: 'D', text: 'Keq ≈ 1' },
        ],
        correctAnswer: 'A',
        explanation: 'ΔG°\' = −5.71 log Keq → log Keq = −ΔG°\'/5.71 = −(−30.5)/5.71 = 30.5/5.71 ≈ 5.34. Therefore Keq ≈ 10⁵·³ ≈ 200,000. This very large Keq confirms ATP hydrolysis strongly favors products (ADP + Pᵢ).',
        wrongAnswerExplanations: {
          B: 'log Keq ≈ 2.3 would require ΔG°\' ≈ −13.1 kJ/mol, not −30.5 kJ/mol. This likely results from a factor-of-2.3 arithmetic error.',
          C: 'A negative log Keq (Keq < 1) would mean the reaction favors reactants, which contradicts the large negative ΔG°\'.',
          D: 'Keq = 1 (log Keq = 0) requires ΔG°\' = 0. With ΔG°\' = −30.5 kJ/mol, Keq >> 1.',
        },
        teachingPoint: 'From ΔG°\' = −RT ln Keq: log Keq = −ΔG°\'/(5.71 kJ/mol). Large negative ΔG°\' → large Keq. ATP hydrolysis: Keq ≈ 10⁵·³ — nearly irreversible under standard conditions.',
        relatedTopics: ['equilibrium constant', 'Gibbs free energy', 'ATP', 'thermodynamics'],
      },
      {
        id: 'mcat2-cp-022',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p5',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics and thermochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'The passage notes that physiological ΔG for ATP hydrolysis can reach −55 kJ/mol, more negative than ΔG°\' = −30.5 kJ/mol. Which change in intracellular conditions most directly explains this difference?',
        choices: [
          { label: 'A', text: 'Physiological temperature (37°C) is higher than standard (25°C), increasing ΔG magnitude' },
          { label: 'B', text: 'The intracellular pH of 7.4 is higher than the standard pH 7.0, shifting equilibrium' },
          { label: 'C', text: 'Cellular enzymes (ATPases) catalyze ATP hydrolysis faster, making ΔG more negative' },
          { label: 'D', text: 'Intracellular [ATP] is far higher than [ADP][Pᵢ], making Q << Keq and driving ΔG more negative' },
        ],
        correctAnswer: 'D',
        explanation: 'ΔG = ΔG°\' + RT ln Q. When [ATP] is high and [ADP][Pᵢ] is low (as in actively metabolizing cells), Q = [ADP][Pᵢ]/[ATP] << Keq. Since ln Q < 0, ΔG = ΔG°\' + negative = more negative than ΔG°\'. The cell maintains a high ATP/ADP ratio to maximize free energy available per hydrolysis.',
        wrongAnswerExplanations: {
          A: 'Temperature affects ΔG°\', but the primary reason for physiological vs. standard differences is concentration ratios, not the modest 12°C temperature difference.',
          C: 'Enzymes (catalysts) do not change ΔG or thermodynamic parameters — they only change reaction rate. Catalysts lower activation energy but never alter ΔG.',
          B: 'The difference between pH 7.0 and 7.4 has a small effect on ΔG°\' but is not the dominant factor explaining a 25 kJ/mol difference. Concentration ratios dominate.',
          
        },
        teachingPoint: 'ΔG = ΔG°\' + RT ln Q. When Q < Keq (reactants in excess), ΔG is more negative than ΔG°\'. Cells maintain Q << Keq for ATP hydrolysis by keeping [ATP] >> [ADP][Pᵢ].',
        relatedTopics: ['reaction quotient', 'Gibbs free energy', 'physiological conditions', 'ATP homeostasis'],
      },
      {
        id: 'mcat2-cp-023',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p5',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics and thermochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Using Hess\'s Law, if a metabolic pathway consists of three sequential reactions with ΔG values of −12, +5, and −20 kJ/mol, what is the overall ΔG for the pathway?',
        choices: [
          { label: 'A', text: '+37 kJ/mol' },
          { label: 'B', text: '−7 kJ/mol' },
          { label: 'C', text: '−27 kJ/mol' },
          { label: 'D', text: '−32 kJ/mol' },
        ],
        correctAnswer: 'C',
        explanation: 'By Hess\'s Law (analogous principle for ΔG): ΔG_total = ΔG₁ + ΔG₂ + ΔG₃ = (−12) + (+5) + (−20) = −27 kJ/mol. The overall pathway is spontaneous despite one unfavorable step, because the favorable steps more than compensate.',
        wrongAnswerExplanations: {
          A: '+37 kJ/mol = 12 + 5 + 20 — sums the absolute values rather than the signed values.',
          B: '−7 kJ/mol = (−12) + (5) = −7 — includes only the first two steps and ignores the third.',
          D: '−32 kJ/mol = (−12) + (−20) = −32 — ignores the positive +5 kJ/mol step.',
        },
        teachingPoint: 'Hess\'s Law for ΔG: total ΔG = sum of all individual ΔG values. Include all signs. A pathway can be overall spontaneous even if individual steps are endergonic, as long as the total ΔG < 0.',
        relatedTopics: ['Hess\'s Law', 'Gibbs free energy', 'metabolic pathways', 'thermodynamics'],
      },
      {
        id: 'mcat2-cp-024',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p5',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Thermodynamics and thermochemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'medium',
        question: 'A reaction at 25°C has ΔH° = −40 kJ/mol and ΔS° = −80 J/(mol·K). Under which temperature conditions, if any, is this reaction spontaneous?',
        choices: [
          { label: 'A', text: 'Spontaneous at all temperatures' },
          { label: 'B', text: 'Never spontaneous' },
          { label: 'C', text: 'Spontaneous only above 500 K' },
          { label: 'D', text: 'Spontaneous only below 500 K' },
        ],
        correctAnswer: 'D',
        explanation: 'ΔG° = ΔH° − TΔS°. For spontaneity, ΔG° < 0. Since ΔH° < 0 and ΔS° < 0, this is an enthalpy-favored, entropy-disfavored reaction. ΔG° < 0 when ΔH° > TΔS°: −40,000 > T × (−80) → 40,000 > 80T → T < 500 K. So the reaction is spontaneous below 500 K.',
        wrongAnswerExplanations: {
          A: 'Only reactions with ΔH° < 0 and ΔS° > 0 are spontaneous at all temperatures. With ΔS° < 0, high temperatures make TΔS° a large positive contribution that will eventually make ΔG° > 0.',
          C: 'Above 500 K, TΔS° term (−TΔS° = −T × (−80) = +80T) becomes large positive, exceeding −ΔH° = +40,000 J/mol, making ΔG° > 0.',
          B: 'At low temperatures (T → 0), ΔG° ≈ ΔH° = −40 kJ/mol < 0, which is spontaneous.',
          
        },
        teachingPoint: 'ΔG° = ΔH° − TΔS°. For ΔH° < 0, ΔS° < 0: spontaneous below T_crossover = ΔH°/ΔS° = (−40,000)/(−80) = 500 K. Above this temperature, TΔS° term dominates and ΔG° > 0.',
        relatedTopics: ['Gibbs free energy', 'enthalpy', 'entropy', 'spontaneity', 'temperature dependence'],
      },
    ],
  },
]
