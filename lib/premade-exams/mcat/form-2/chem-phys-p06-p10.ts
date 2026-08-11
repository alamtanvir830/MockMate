import type { MCATPassage } from '../types'

// Form 2 C/P — Passages 6–10 (22 questions)
// Topics: Colligative Properties, Nuclear Chemistry, Stereochemistry/SN, Fluid Mechanics, Amino Acids

export const cpPassages06to10: MCATPassage[] = [
  // ─── Passage 6: Colligative Properties and Osmotic Pressure ─────────────────
  {
    id: 'f2-cp-p6',
    sectionId: 'chem-phys',
    title: 'Colligative Properties and Renal Concentration',
    passageText: `Colligative properties of solutions depend on the number of solute particles, not their chemical identity. The four principal colligative properties are vapor pressure lowering, boiling point elevation, freezing point depression, and osmotic pressure.

Osmotic pressure (Π) is described by the van't Hoff equation:

Π = iMRT

where i is the van't Hoff factor (number of particles per formula unit), M is molarity, R = 0.0821 L·atm/(mol·K), and T is temperature in Kelvin.

The kidney concentrates urine by establishing an osmotic gradient in the renal medulla. The countercurrent multiplier system creates a medullary osmolarity gradient ranging from ~300 mOsm/kg at the cortex to ~1,200 mOsm/kg at the inner medulla. Plasma osmolarity is maintained at approximately 285–295 mOsm/kg.

Boiling point elevation: ΔTb = Kb × m × i
Freezing point depression: ΔTf = Kf × m × i

For water: Kb = 0.512 °C·kg/mol, Kf = 1.86 °C·kg/mol.

A 0.30 m NaCl solution is used for the following experiments. NaCl dissociates completely in dilute solution into Na⁺ and Cl⁻.`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-025',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p6',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Solutions and solubility',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'What is the boiling point elevation of a 0.30 m NaCl solution at standard atmospheric pressure?',
        choices: [
          { label: 'A', text: '0.31 °C' },
          { label: 'B', text: '0.154 °C' },
          { label: 'C', text: '0.46 °C' },
          { label: 'D', text: '0.77 °C' },
        ],
        correctAnswer: 'A',
        explanation: 'NaCl dissociates into Na⁺ + Cl⁻, so i = 2. ΔTb = Kb × m × i = 0.512 × 0.30 × 2 = 0.307 ≈ 0.31 °C. The boiling point of this solution is approximately 100.31 °C.',
        wrongAnswerExplanations: {
          C: '0.46 °C ≈ 0.512 × 0.30 × 3 — uses i = 3, as if NaCl produced three particles (only true for some salts like CaCl₂).',
          D: '0.77 °C ≈ 0.512 × 0.30 × 5 — a significant overestimate, perhaps confusing Kb with Kf or using an incorrect i value.',
          B: '0.154 °C = 0.512 × 0.30 × 1 — uses i = 1, failing to account for NaCl dissociation into 2 particles.',
        },
        teachingPoint: 'ΔTb = Kb × m × i. For NaCl (i = 2): ΔTb = 0.512 × 0.30 × 2 = 0.31 °C. The van\'t Hoff factor i accounts for the number of ions formed upon dissolution.',
        relatedTopics: ['boiling point elevation', 'colligative properties', 'van\'t Hoff factor', 'electrolytes'],
      },
      {
        id: 'mcat2-cp-026',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p6',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Solutions and solubility',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'What is the osmotic pressure (in atm) of the 0.30 M NaCl solution at 37°C?',
        choices: [
          { label: 'A', text: '15.2 atm' },
          { label: 'B', text: '7.6 atm' },
          { label: 'C', text: '22.8 atm' },
          { label: 'D', text: '0.31 atm' },
        ],
        correctAnswer: 'A',
        explanation: 'Π = iMRT = 2 × 0.30 mol/L × 0.0821 L·atm/(mol·K) × 310 K = 2 × 0.30 × 0.0821 × 310 = 2 × 7.63 ≈ 15.3 atm. With i = 2 (NaCl → Na⁺ + Cl⁻), T = 310 K (37°C), M = 0.30 M.',
        wrongAnswerExplanations: {
          C: '22.8 atm uses i = 3, as if NaCl produced three ions (appropriate for CaCl₂ → Ca²⁺ + 2Cl⁻, not NaCl).',
          D: '0.31 atm is the boiling point elevation in °C, not osmotic pressure; these are different colligative properties with different formulas.',
          B: '7.6 atm uses i = 1, forgetting that NaCl fully dissociates into 2 particles.',
        },
        teachingPoint: 'Π = iMRT. Use T in Kelvin (37°C = 310 K). For NaCl (i = 2): Π = 2 × 0.30 × 0.0821 × 310 ≈ 15.3 atm. Physiological osmolarity ~285 mOsm is equivalent to ~7 atm osmotic pressure.',
        relatedTopics: ['osmotic pressure', 'van\'t Hoff equation', 'colligative properties', 'tonicity'],
      },
      {
        id: 'mcat2-cp-027',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p6',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Solutions and solubility',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'A red blood cell is placed in a 0.30 M NaCl solution. Knowing that normal physiological NaCl concentration is approximately 0.15 M (isotonic), which of the following best describes the result?',
        choices: [
          { label: 'A', text: 'The cell shrinks because it is in a hypertonic solution' },
          { label: 'B', text: 'The cell swells because it is in a hypotonic solution' },
          { label: 'C', text: 'The cell remains unchanged because NaCl is non-toxic' },
          { label: 'D', text: 'The cell lyses immediately because of the high osmolarity' },
        ],
        correctAnswer: 'A',
        explanation: '0.30 M NaCl has osmolarity ≈ 600 mOsm/kg, which is hypertonic relative to normal plasma (~285 mOsm/kg). In a hypertonic solution, the extracellular osmolarity exceeds intracellular, driving water out of the cell by osmosis. The cell loses water and shrinks (crenation).',
        wrongAnswerExplanations: {
          C: 'Osmotic effects are independent of toxicity; even non-toxic solutes cause osmotic stress if the concentration is not isotonic.',
          D: 'Lysis (bursting) occurs in hypotonic conditions, when water rushes into the cell. In hypertonic conditions, the cell loses water and shrinks, not lyses.',
          B: 'A hypotonic solution has lower osmolarity than the cell interior. 0.30 M NaCl is hypertonic (higher osmolarity than the cell), causing water efflux, not influx.',
        },
        teachingPoint: 'Isotonic: same osmolarity as cell (no net water movement). Hypotonic: lower osmolarity → water enters → cell swells/lyses. Hypertonic: higher osmolarity → water exits → cell shrinks (crenation).',
        relatedTopics: ['tonicity', 'osmosis', 'hypertonic', 'hypotonic', 'red blood cell'],
      },
      {
        id: 'mcat2-cp-028',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p6',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Solutions and solubility',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 3',
        difficulty: 'hard',
        question: 'The renal medullary osmolarity reaches 1,200 mOsm/kg. If a researcher wants to simulate this osmolarity using NaCl solution for an in vitro experiment, what approximate NaCl concentration should be used?',
        choices: [
          { label: 'A', text: '0.60 M' },
          { label: 'B', text: '0.30 M' },
          { label: 'C', text: '1.2 M' },
          { label: 'D', text: '2.4 M' },
        ],
        correctAnswer: 'A',
        explanation: 'NaCl dissociates into 2 particles, so osmolarity = 2 × [NaCl] × 1000 mOsm/mol (if in mol/L). To achieve 1,200 mOsm/kg: 1,200 = 2 × [NaCl] × 1,000 → [NaCl] = 0.60 M. At 0.60 M, each liter contains 0.60 mol NaCl × 2 particles/mol × 1,000 mmol/mol = 1,200 mOsm/kg.',
        wrongAnswerExplanations: {
          C: '1.2 M NaCl provides 2,400 mOsm/kg — double the target. This would represent extreme hyperosmolarity.',
          D: '2.4 M NaCl provides 4,800 mOsm/kg, which is four times the medullary osmolarity and would be severely hypertonic.',
          B: '0.30 M NaCl provides 0.30 × 2 × 1,000 = 600 mOsm/kg — half the target, equivalent to only twice physiological saline.',
        },
        teachingPoint: 'NaCl osmolarity (mOsm/kg) = 2 × [NaCl in mmol/L]. To achieve 1,200 mOsm/kg: [NaCl] = 600 mmol/L = 0.60 M.',
        relatedTopics: ['osmolarity', 'renal concentration', 'colligative properties', 'NaCl'],
      },
    ],
  },

  // ─── Passage 7: Nuclear Chemistry — Radioactive Decay ───────────────────────
  {
    id: 'f2-cp-p7',
    sectionId: 'chem-phys',
    title: 'Radioactive Decay and Medical Imaging',
    passageText: `Radioactive isotopes are used extensively in medical imaging and therapy. The rate of radioactive decay follows first-order kinetics:

N(t) = N₀ × (1/2)^(t/t₁/₂)

where N(t) is the number of radioactive atoms at time t, N₀ is the initial quantity, and t₁/₂ is the half-life.

The activity (A) of a radioactive sample (in becquerels, Bq) equals the decay rate:
A = λN, where λ = ln 2 / t₁/₂

Three common decay modes are:
• Alpha (α) decay: emission of a helium-4 nucleus (²He⁴); Z decreases by 2, A decreases by 4
• Beta-minus (β⁻) decay: emission of an electron; Z increases by 1, A unchanged
• Gamma (γ) emission: emission of a high-energy photon; Z and A unchanged

Technetium-99m (⁹⁹ᵐTc, t₁/₂ = 6 hours) is the most widely used radioisotope in nuclear medicine, employed in approximately 80% of all diagnostic nuclear imaging scans. It emits gamma radiation at 140 keV — ideal for imaging because it is detectable externally yet minimizes tissue damage. Iodine-131 (¹³¹I, t₁/₂ = 8 days) undergoes beta decay and is used to treat thyroid cancer and hyperthyroidism.

Table 1: Selected radioisotopes used in nuclear medicine

| Isotope | t₁/₂ | Decay mode | Clinical use |
|---------|-------|------------|--------------|
| ⁹⁹ᵐTc | 6 hours | γ | Bone/cardiac imaging |
| ¹³¹I | 8 days | β⁻ | Thyroid treatment |
| ¹⁸F | 110 min | β⁺ | PET scans |
| ²⁰¹Tl | 73 hours | γ | Cardiac imaging |`,
    figures: [
      {
        type: 'table',
        title: 'Table 1: Selected radioisotopes used in nuclear medicine',
        headers: ['Isotope', 't₁/₂', 'Decay mode', 'Clinical use'],
        rows: [
          ['⁹⁹ᵐTc', '6 hours', 'γ', 'Bone/cardiac imaging'],
          ['¹³¹I', '8 days', 'β⁻', 'Thyroid treatment'],
          ['¹⁸F', '110 min', 'β⁺', 'PET scans'],
          ['²⁰¹Tl', '73 hours', 'γ', 'Cardiac imaging'],
        ],
      },
    ],
    questions: [
      {
        id: 'mcat2-cp-029',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Atomic nucleus and nuclear reactions',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'A patient receives 200 MBq of ⁹⁹ᵐTc at 8:00 AM. What is the approximate activity remaining at 2:00 PM the same day?',
        choices: [
          { label: 'A', text: '100 MBq' },
          { label: 'B', text: '200 MBq' },
          { label: 'C', text: '50 MBq' },
          { label: 'D', text: '25 MBq' },
        ],
        correctAnswer: 'A',
        explanation: 'From 8:00 AM to 2:00 PM is 6 hours = 1 half-life of ⁹⁹ᵐTc (t₁/₂ = 6 hours). After 1 half-life: A = 200 × (1/2)¹ = 100 MBq.',
        wrongAnswerExplanations: {
          C: '50 MBq = 200 × (1/2)² — this applies 2 half-lives (12 hours), but only 6 hours have passed.',
          D: '25 MBq = 200 × (1/2)³ — this applies 3 half-lives (18 hours), not 6 hours.',
          B: '200 MBq is the initial activity; no decay has been applied.',
        },
        teachingPoint: 'After n half-lives: A = A₀ × (1/2)ⁿ. 6 hours = 1 half-life for ⁹⁹ᵐTc → activity halves to 100 MBq.',
        relatedTopics: ['radioactive decay', 'half-life', 'activity', 'nuclear medicine'],
      },
      {
        id: 'mcat2-cp-030',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Atomic nucleus and nuclear reactions',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Iodine-131 undergoes beta-minus decay. What are the daughter nuclide\'s atomic number (Z) and mass number (A) after decay from ¹³¹I (Z = 53)?',
        choices: [
          { label: 'A', text: 'Z = 54, A = 131' },
          { label: 'B', text: 'Z = 52, A = 127' },
          { label: 'C', text: 'Z = 51, A = 131' },
          { label: 'D', text: 'Z = 53, A = 130' },
        ],
        correctAnswer: 'A',
        explanation: 'In beta-minus (β⁻) decay, a neutron converts to a proton + electron + antineutrino. Z increases by 1 (53 → 54), and A remains unchanged (131). Z = 54 is xenon (Xe). The daughter nuclide is ¹³¹Xe.',
        wrongAnswerExplanations: {
          C: 'Z = 51 would result from positron emission (Z − 1), not beta-minus decay which increases Z.',
          D: 'Z unchanged, A − 1 does not correspond to any standard decay mode; beta decay changes Z, not just A.',
          B: 'Z = 52, A = 127 describes alpha decay (Z − 2, A − 4), not beta-minus decay.',
        },
        teachingPoint: 'Beta-minus decay: neutron → proton + β⁻ + antineutrino. Z increases by 1, A unchanged. ¹³¹I (Z=53) → ¹³¹Xe (Z=54). Beta-plus (positron) decay: Z decreases by 1.',
        relatedTopics: ['beta decay', 'nuclear equations', 'radioactive decay modes', 'iodine-131'],
      },
      {
        id: 'mcat2-cp-031',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Atomic nucleus and nuclear reactions',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'A radiopharmacy prepares ¹⁸F for a PET scan at 7:00 AM when activity = 8,000 MBq. The scan is scheduled for 9:10 AM. Approximately what activity is available at scan time?',
        choices: [
          { label: 'A', text: '1,000 MBq' },
          { label: 'B', text: '2,000 MBq' },
          { label: 'C', text: '4,000 MBq' },
          { label: 'D', text: '6,000 MBq' },
        ],
        correctAnswer: 'C',
        explanation: '¹⁸F t₁/₂ = 110 min. From 7:00 AM to 9:10 AM = 130 min. Number of half-lives = 130/110 ≈ 1.18. Exact activity: A = 8,000 × 2^(−1.18) = 8,000 × 0.44 ≈ 3,500 MBq. Among the given choices, 4,000 MBq (corresponding to exactly 1 half-life = 110 min) is the closest approximation. Since 130 min is only slightly more than 1 half-life, the activity will be slightly below 4,000 MBq but much closer to 4,000 than to 2,000.',
        wrongAnswerExplanations: {
          A: '1,000 MBq = 8,000 × (1/2)³ corresponds to 3 half-lives = 330 min, far longer than the 130-min elapsed time.',
          B: '2,000 MBq = 8,000 × (1/2)² corresponds to 2 half-lives = 220 min. Only 130 min have passed (1.18 half-lives), so less decay has occurred.',
          D: '6,000 MBq implies only ~0.4 half-lives of decay (~44 min), not the full 130 min elapsed.',
        },
        teachingPoint: '¹⁸F t₁/₂ = 110 min. In 130 min ≈ 1.18 half-lives: A ≈ 3,500 MBq. Closest choice is 4,000 MBq (1 full half-life). Short half-lives require careful timing in PET scan preparation — the radiopharmacy must account for decay during transport.',
        relatedTopics: ['half-life', 'PET scan', 'fluorine-18', 'radioactive decay calculation'],
      },
      {
        id: 'mcat2-cp-032',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Atomic nucleus and nuclear reactions',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Why is gamma emission preferred over alpha or beta decay for diagnostic nuclear imaging, as implied by the passage?',
        choices: [
          { label: 'A', text: 'Gamma photons have longer half-lives than alpha particles' },
          { label: 'B', text: 'Gamma photons are absorbed by bone, producing the anatomical contrast needed for imaging' },
          { label: 'C', text: 'Gamma photons increase the atomic number of the isotope, enabling longer imaging windows' },
          { label: 'D', text: 'Gamma photons penetrate tissue and can be detected externally while depositing minimal energy in tissue' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage explicitly states ⁹⁹ᵐTc is ideal because its 140 keV gamma emission "is detectable externally yet minimizes tissue damage." Alpha particles are stopped within micrometers (by a sheet of paper), and beta particles penetrate only a few mm; neither can exit the body for external detection. Gamma photons penetrate tissue readily and are detected by external gamma cameras.',
        wrongAnswerExplanations: {
          A: 'Half-life is a property of the nucleus, not of the radiation type emitted. Alpha particles and gamma photons are not themselves radioactive.',
          C: 'Gamma emission does NOT change the atomic number (Z or A unchanged). Changes in Z occur during alpha/beta decay.',
          B: 'Gamma photons are not selectively absorbed by bone in standard nuclear imaging; the contrast comes from differential uptake of the radiopharmaceutical by tissues.',
          
        },
        teachingPoint: 'Gamma photons: high penetrating power → exit body → detected externally. Alpha and beta particles: short range → deposit energy locally (good for therapy, poor for imaging). ⁹⁹ᵐTc gamma at 140 keV: optimal balance of penetration and detection.',
        relatedTopics: ['gamma radiation', 'nuclear imaging', 'radiation penetration', 'technetium-99m'],
      },
      {
        id: 'mcat2-cp-033',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Atomic nucleus and nuclear reactions',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'The decay constant λ for ⁹⁹ᵐTc is λ = ln 2 / t₁/₂. If t₁/₂ = 6 hours = 21,600 s, and a sample initially contains 1.0 × 10¹⁵ atoms, what is the initial activity in becquerels?',
        choices: [
          { label: 'A', text: '3.2 × 10¹⁰ Bq' },
          { label: 'B', text: '6.4 × 10¹⁰ Bq' },
          { label: 'C', text: '1.0 × 10¹⁵ Bq' },
          { label: 'D', text: '2.2 × 10¹¹ Bq' },
        ],
        correctAnswer: 'A',
        explanation: 'λ = ln 2 / t₁/₂ = 0.693 / 21,600 s = 3.21 × 10⁻⁵ s⁻¹. Activity A = λN = (3.21 × 10⁻⁵)(1.0 × 10¹⁵) = 3.21 × 10¹⁰ Bq ≈ 3.2 × 10¹⁰ Bq.',
        wrongAnswerExplanations: {
          B: '6.4 × 10¹⁰ would double the correct activity — perhaps from using t₁/₂ = 3 hours (half the actual half-life).',
          C: '1.0 × 10¹⁵ Bq equals the number of atoms, not the activity. Activity = λN, not just N.',
          D: '2.2 × 10¹¹ Bq would result from incorrect unit conversion (e.g., using t₁/₂ in hours instead of seconds).',
        },
        teachingPoint: 'Activity A = λN = (ln 2 / t₁/₂) × N. CRITICAL: use t₁/₂ in seconds for activity in Bq (decays/second). For ⁹⁹ᵐTc: λ = 0.693/21,600 s = 3.2 × 10⁻⁵ s⁻¹; A = 3.2 × 10¹⁰ Bq.',
        relatedTopics: ['decay constant', 'activity', 'becquerel', 'radioactive decay'],
      },
    ],
  },

  // ─── Passage 8: Organic Chemistry — Stereochemistry and SN Reactions ─────────
  {
    id: 'f2-cp-p8',
    sectionId: 'chem-phys',
    title: 'Nucleophilic Substitution: Stereochemistry and Reaction Mechanisms',
    passageText: `Nucleophilic substitution reactions (SN1 and SN2) are fundamental in organic chemistry. The two mechanisms differ in kinetics, stereochemistry, and substrate preference.

In an SN2 reaction, the nucleophile attacks the electrophilic carbon simultaneously as the leaving group departs, via a single concerted step. The reaction is bimolecular: rate = k[Nu][RX]. The attack occurs at the backside of the C–LG bond, producing inversion of configuration at the stereocenter (Walden inversion). SN2 is favored with: strong nucleophiles, primary (or methyl) substrates, polar aprotic solvents (e.g., DMSO, acetone).

In an SN1 reaction, the leaving group departs first, forming a planar carbocation intermediate. The nucleophile then attacks from either face, giving a racemic mixture of products. Rate = k[RX] (first order). SN1 is favored with: tertiary (or secondary) substrates, polar protic solvents (e.g., water, ethanol), weak nucleophiles.

A researcher treats (R)-2-bromobutane with NaOH under two different conditions:
• Experiment A: NaOH in DMSO (high concentration)
• Experiment B: NaOH in aqueous ethanol (low concentration)

The major products were analyzed by optical rotation.`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-034',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution reactions',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'In Experiment A, (R)-2-bromobutane reacts with NaOH in DMSO. What is the expected major product and its configuration?',
        choices: [
          { label: 'A', text: '(S)-2-butanol via SN2 mechanism' },
          { label: 'B', text: '(R)-2-butanol via SN1 mechanism' },
          { label: 'C', text: 'Racemic 2-butanol via SN1 mechanism' },
          { label: 'D', text: '(R)-2-butanol via SN2 mechanism' },
        ],
        correctAnswer: 'A',
        explanation: 'Experiment B uses concentrated NaOH (strong nucleophile) in DMSO (polar aprotic solvent) — optimal SN2 conditions. 2-bromobutane is secondary, which can undergo both SN1 and SN2, but the conditions strongly favor SN2. SN2 produces inversion of configuration (Walden inversion): (R)-2-bromobutane → (S)-2-butanol.',
        wrongAnswerExplanations: {
          C: 'A racemic mixture indicates SN1. DMSO (polar aprotic) and high [NaOH] strongly disfavor SN1; SN2 is strongly preferred under these conditions.',
          D: '(R)-2-butanol via SN2 would require retention of configuration, but SN2 always gives inversion (Walden inversion), converting R → S.',
          B: '(R)-2-butanol via SN1 would require retention, but SN1 gives racemic mixture, not pure (R) product.',
        },
        teachingPoint: 'SN2 conditions: strong nucleophile + polar aprotic solvent + primary/secondary substrate → inversion of configuration. (R) starting material → (S) product via backside attack.',
        relatedTopics: ['SN2 mechanism', 'Walden inversion', 'stereochemistry', 'DMSO', 'polar aprotic'],
      },
      {
        id: 'mcat2-cp-035',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution reactions',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'In Experiment B, (R)-2-bromobutane reacts with dilute NaOH in aqueous ethanol. What is the most likely product distribution?',
        choices: [
          { label: 'A', text: 'Exclusively (S)-2-butanol' },
          { label: 'B', text: 'Exclusively (R)-2-butanol' },
          { label: 'C', text: 'Approximately equal amounts of (R)- and (S)-2-butanol' },
          { label: 'D', text: 'No reaction because the substrate is secondary' },
        ],
        correctAnswer: 'C',
        explanation: 'Experiment B uses dilute NaOH (weak nucleophile) in aqueous ethanol (polar protic solvent) — conditions favoring SN1. In SN1, ionization forms a planar sp² carbocation intermediate, which is achiral. The nucleophile (OH⁻ or ethanol) attacks from either face with approximately equal probability, giving a racemic mixture of (R)- and (S)-2-butanol.',
        wrongAnswerExplanations: {
          A: 'Exclusive (S)-2-butanol would indicate pure SN2 (inversion). Aqueous ethanol and dilute nucleophile strongly favor SN1.',
          B: 'Exclusive (R)-2-butanol would indicate retention of configuration, which only occurs in special cases (neighboring group participation), not standard SN1.',
          D: 'Secondary substrates can undergo SN1 in polar protic solvents, especially with a stabilized carbocation (2° is borderline, but does react under SN1 conditions).',
        },
        teachingPoint: 'SN1 conditions: polar protic solvent + weak/dilute nucleophile → carbocation intermediate → racemization. (R) starting material → ~50% (R) + 50% (S) products.',
        relatedTopics: ['SN1 mechanism', 'carbocation', 'racemization', 'polar protic solvent', 'stereochemistry'],
      },
      {
        id: 'mcat2-cp-036',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution reactions',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Which of the following substrates would undergo SN2 most readily?',
        choices: [
          { label: 'A', text: 'CH₃CH₂CH₂Br (1-bromopropane)' },
          { label: 'B', text: '(CH₃)₃CBr (tert-butyl bromide)' },
          { label: 'C', text: '(CH₃)₂CHBr (isopropyl bromide)' },
          { label: 'D', text: '(CH₃)₃CCH₂Br (neopentyl bromide)' },
        ],
        correctAnswer: 'A',
        explanation: '1-Bromopropane is a primary alkyl bromide with minimal steric hindrance around the electrophilic carbon. SN2 is disfavored by steric bulk: tertiary > secondary > primary > methyl in steric hindrance. Primary substrates (A) are the most reactive in SN2 because the nucleophile can access the backside of the C–Br bond unobstructed.',
        wrongAnswerExplanations: {
          C: 'Isopropyl bromide (secondary) is less reactive than primary in SN2 due to greater steric hindrance.',
          D: 'Neopentyl bromide is technically primary but is severely hindered by the adjacent tert-butyl group — it is one of the most SN2-resistant primary halides despite being primary.',
          B: 'tert-Butyl bromide (tertiary) is the most sterically hindered; it undergoes SN1, not SN2. Three methyl groups block backside attack.',
        },
        teachingPoint: 'SN2 reactivity: methyl > primary > secondary >> tertiary (due to steric hindrance). Primary alkyl halides are most reactive in SN2. Tertiary halides undergo SN1 exclusively (cannot do SN2).',
        relatedTopics: ['SN2 reactivity', 'steric hindrance', 'primary substrate', 'nucleophilic substitution'],
      },
      {
        id: 'mcat2-cp-037',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution reactions',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'If the rate of Experiment A is measured and found to depend on both [NaOH] and [2-bromobutane], what is the overall kinetic order of the reaction and what mechanism does this confirm?',
        choices: [
          { label: 'A', text: 'First order overall; confirms SN1' },
          { label: 'B', text: 'Second order overall; confirms SN1' },
          { label: 'C', text: 'Second order overall; confirms SN2' },
          { label: 'D', text: 'Zero order in nucleophile; confirms SN2' },
        ],
        correctAnswer: 'C',
        explanation: 'Rate = k[NaOH][2-bromobutane]. Dependence on both nucleophile and substrate concentrations gives second-order kinetics (first order in each). This is the hallmark of SN2: the bimolecular, concerted mechanism requires both species in the transition state. SN1 would show first-order kinetics (rate = k[RX] only, independent of [nucleophile]).',
        wrongAnswerExplanations: {
          A: 'SN1 is first-order with rate depending only on substrate concentration (the rate-limiting ionization step). Rate depending on [NaOH] rules out SN1.',
          D: 'SN2 is first-order in nucleophile (not zero-order); the rate expression is rate = k[Nu][RX].',
          B: 'Second-order kinetics (rate depends on both [substrate] and [nucleophile]) confirms SN2, not SN1.',
        },
        teachingPoint: 'Kinetic test for mechanism: rate depends on [nucleophile] → SN2 (bimolecular). Rate independent of [nucleophile] → SN1 (unimolecular). SN2 is 2nd order overall: rate = k[substrate][nucleophile].',
        relatedTopics: ['reaction kinetics', 'SN1 vs SN2', 'rate law', 'bimolecular', 'unimolecular'],
      },
    ],
  },

  // ─── Passage 9: Fluid Mechanics and Cardiovascular Physiology ────────────────
  {
    id: 'f2-cp-p9',
    sectionId: 'chem-phys',
    title: 'Fluid Dynamics of the Cardiovascular System',
    passageText: `Blood flow through the cardiovascular system obeys the principles of fluid mechanics. Poiseuille's Law describes laminar flow of viscous fluid through a rigid cylindrical vessel:

Q = π r⁴ ΔP / (8 η L)

where Q is volumetric flow rate (m³/s), r is vessel radius, ΔP is the pressure difference across the vessel, η is fluid viscosity, and L is vessel length.

Vascular resistance R is defined analogously to Ohm's Law:

Q = ΔP / R,  so R = 8ηL / (πr⁴)

Vessels in parallel: 1/R_total = 1/R₁ + 1/R₂ + ...
Vessels in series: R_total = R₁ + R₂ + ...

The continuity equation (conservation of mass) for incompressible fluids states:

A₁v₁ = A₂v₂

where A is cross-sectional area and v is velocity.

Bernoulli's equation relates pressure, velocity, and height in ideal (inviscid) fluid flow:

P + ½ρv² + ρgh = constant

The aorta has a diameter of approximately 2.5 cm and a blood flow velocity of ~20 cm/s during systole. The total cross-sectional area of all capillaries (~5,000 cm²) far exceeds that of the aorta (~5 cm²).`,
    figures: [],
    questions: [
      {
        id: 'mcat2-cp-038',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p9',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'If an arteriole\'s radius decreases from 100 μm to 50 μm (half the original radius) due to vasoconstriction, by what factor does vascular resistance change?',
        choices: [
          { label: 'A', text: 'Resistance doubles' },
          { label: 'B', text: 'Resistance increases by factor of 4' },
          { label: 'C', text: 'Resistance increases by factor of 16' },
          { label: 'D', text: 'Resistance increases by factor of 8' },
        ],
        correctAnswer: 'C',
        explanation: 'R = 8ηL/(πr⁴). When radius is halved (r → r/2): R_new = 8ηL/[π(r/2)⁴] = 8ηL/(πr⁴/16) = 16 × (8ηL/πr⁴) = 16 × R_original. Resistance increases by a factor of 16. This r⁴ dependence makes small changes in vessel radius produce dramatic changes in flow and resistance.',
        wrongAnswerExplanations: {
          A: 'Doubling would result from R ∝ 1/r¹ dependence, but Poiseuille\'s Law gives R ∝ 1/r⁴.',
          B: 'Factor of 4 would result from R ∝ 1/r², but the correct dependence is r⁴.',
          D: 'Factor of 8 would result from R ∝ 1/r³ dependence, which is incorrect.',
        },
        teachingPoint: 'R ∝ 1/r⁴ from Poiseuille\'s Law. Halving the radius → resistance increases by 2⁴ = 16×. This is why vasoconstriction dramatically increases blood pressure even with modest radius changes.',
        relatedTopics: ['Poiseuille\'s Law', 'vascular resistance', 'vasoconstriction', 'blood flow'],
      },
      {
        id: 'mcat2-cp-039',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p9',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Using the continuity equation, if the aorta has a cross-sectional area of 5 cm² and blood flows at 20 cm/s, what is the average velocity of blood in the capillary bed (total area ≈ 5,000 cm²)?',
        choices: [
          { label: 'A', text: '20,000 cm/s' },
          { label: 'B', text: '0.10 cm/s' },
          { label: 'C', text: '0.02 cm/s' },
          { label: 'D', text: '200 cm/s' },
        ],
        correctAnswer: 'C',
        explanation: 'Continuity equation: A₁v₁ = A₂v₂. v₂ = A₁v₁/A₂ = (5 cm² × 20 cm/s) / 5,000 cm² = 100/5,000 = 0.02 cm/s. Blood moves very slowly through capillaries, maximizing time for diffusion of O₂ and nutrients.',
        wrongAnswerExplanations: {
          A: '20,000 cm/s would result from v₂ = A₂v₁/A₁ — inverting the ratio, which gives a faster velocity in larger cross-section, opposite of the correct relationship.',
          B: '0.10 cm/s would result from using A₁/A₂ = 5/500 = 0.01 instead of 5/5,000 = 0.001.',
          D: '200 cm/s = v₁ × (A₂/A₁) × (1/A₂) — this arithmetic error gives a result greater than the aortic velocity.',
        },
        teachingPoint: 'Continuity: A₁v₁ = A₂v₂. Capillary area (5,000 cm²) >> aortic area (5 cm²) → capillary velocity (0.02 cm/s) << aortic velocity (20 cm/s). Slow capillary flow allows time for gas and nutrient exchange.',
        relatedTopics: ['continuity equation', 'blood velocity', 'capillary', 'cardiovascular physiology'],
      },
      {
        id: 'mcat2-cp-040',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p9',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'According to Bernoulli\'s equation, in a horizontal vessel where blood speed increases through a stenosis (narrowing), what happens to the blood pressure at the stenosis?',
        choices: [
          { label: 'A', text: 'Pressure increases because faster flow requires more force' },
          { label: 'B', text: 'Pressure increases because resistance is higher at the narrowing' },
          { label: 'C', text: 'Pressure is unchanged because blood is incompressible' },
          { label: 'D', text: 'Pressure decreases because kinetic energy increases at the expense of pressure energy' },
        ],
        correctAnswer: 'D',
        explanation: 'Bernoulli\'s equation: P + ½ρv² + ρgh = constant. In a horizontal vessel (h = constant), increasing v means ½ρv² increases, so P must decrease to maintain the constant sum. At the stenosis where velocity is highest, pressure is lowest — the Venturi effect. This counterintuitive result is clinically important in understanding atherosclerotic plaques.',
        wrongAnswerExplanations: {
          A: 'This contradicts Bernoulli\'s equation. Higher velocity is associated with lower pressure, not higher.',
          C: 'Incompressibility (continuity equation) explains why velocity increases at the narrowing, but it does not keep pressure unchanged. Bernoulli shows pressure must decrease.',
          B: 'While resistance is higher at the stenosis (Poiseuille\'s Law), Bernoulli\'s equation governs local pressure at a point in steady flow. The Bernoulli effect dominates the local pressure change at the stenosis.',
          
        },
        teachingPoint: 'Bernoulli\'s principle: P + ½ρv² = constant (horizontal). Higher velocity → lower pressure. At a stenosis: high v → low pressure (Venturi effect). This is why plaques can cause local pressure drops and turbulence.',
        relatedTopics: ['Bernoulli\'s equation', 'stenosis', 'Venturi effect', 'blood pressure', 'fluid mechanics'],
      },
      {
        id: 'mcat2-cp-041',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p9',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Two arterioles of equal resistance R are connected in parallel, feeding the same capillary bed. If one arteriole becomes blocked (resistance → ∞), what happens to total resistance of the parallel network?',
        choices: [
          { label: 'A', text: 'Total resistance doubles' },
          { label: 'B', text: 'Total resistance drops to zero' },
          { label: 'C', text: 'Total resistance increases to R' },
          { label: 'D', text: 'Total resistance is unchanged at R/2' },
        ],
        correctAnswer: 'C',
        explanation: 'Originally (two equal resistors R in parallel): 1/R_total = 1/R + 1/R = 2/R → R_total = R/2. When one is blocked (resistance → ∞): 1/R_total = 1/R + 1/∞ = 1/R + 0 = 1/R → R_total = R. Resistance doubles from R/2 to R when one parallel path is eliminated.',
        wrongAnswerExplanations: {
          A: 'The total resistance doubles in the sense of going from R/2 to R (×2), but option A stated "total resistance doubles" without context. More precisely, total resistance goes from R/2 to R — which is indeed a doubling — so C ("increases to R") is the most precisely correct answer.',
          B: 'Resistance → 0 is impossible without a short circuit. Parallel resistance can only decrease if paths are added, not removed.',
          D: 'R/2 is the starting resistance; after blocking one arteriole, resistance increases, not stays the same.',
        },
        teachingPoint: 'Two equal resistors R in parallel: R_total = R/2. Remove one path (R → ∞): R_total = R. Parallel arrangement means total resistance is always less than the smallest individual resistance when all paths are open.',
        relatedTopics: ['parallel resistance', 'vascular resistance', 'blood flow', 'Ohm\'s Law analogy'],
      },
      {
        id: 'mcat2-cp-042',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p9',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Fluids and solids',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 3',
        difficulty: 'hard',
        question: 'A researcher designs an artificial blood vessel experiment to study thrombosis. The vessel is oriented vertically, with blood entering at the bottom and exiting at the top (height difference = 30 cm). Blood density ρ = 1,060 kg/m³ and g = 9.8 m/s². If flow velocity is the same at entry and exit, what is the pressure difference needed to maintain this flow?',
        choices: [
          { label: 'A', text: 'ΔP ≈ 3,116 Pa (≈ 23.4 mmHg)' },
          { label: 'B', text: 'ΔP ≈ 312 Pa' },
          { label: 'C', text: 'ΔP ≈ 6,232 Pa' },
          { label: 'D', text: 'ΔP ≈ 0 Pa (no pressure needed)' },
        ],
        correctAnswer: 'A',
        explanation: 'From Bernoulli: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂. With v₁ = v₂ (same velocity), the kinetic terms cancel: P₁ − P₂ = ρg(h₂ − h₁) = 1,060 × 9.8 × 0.30 = 3,116 Pa ≈ 23.4 mmHg. This is the minimum pressure needed to push blood upward 30 cm against gravity.',
        wrongAnswerExplanations: {
          C: '6,232 Pa doubles the correct answer, perhaps using h = 0.60 m or doubling ρg.',
          D: 'If the vessel were horizontal, ΔP = 0 when velocities are equal. But vertical orientation requires ΔP = ρgh to overcome gravity.',
          B: '312 Pa uses ρ = 1,040 kg/m³ and h = 0.03 m — a factor-of-10 error in height (30 cm = 0.30 m, not 0.03 m).',
        },
        teachingPoint: 'Bernoulli for vertical flow (equal velocities): ΔP = ρgΔh. For blood rising 30 cm: ΔP = 1,060 × 9.8 × 0.30 ≈ 3,116 Pa ≈ 23 mmHg. This is why blood pressure differs from standing to lying down.',
        relatedTopics: ['Bernoulli\'s equation', 'hydrostatic pressure', 'gravitational potential energy', 'blood pressure'],
      },
    ],
  },

  // ─── Passage 10: Amino Acid Chemistry and Isoelectric Point ──────────────────
  {
    id: 'f2-cp-p10',
    sectionId: 'chem-phys',
    title: 'Amino Acid Ionization and the Isoelectric Point',
    passageText: `Amino acids contain both an α-amino group (–NH₃⁺, pKₐ₁ ≈ 9–10) and an α-carboxyl group (–COOH, pKₐ₂ ≈ 2) that ionize at different pH values. Some amino acids also have ionizable side chains.

The isoelectric point (pI) is the pH at which an amino acid carries no net charge (exists as a zwitterion). For a simple amino acid (no ionizable side chain):

pI = (pKₐ₁ + pKₐ₂) / 2

For a basic amino acid (e.g., lysine, with side chain pKₐ₃):
pI = (pKₐ₂ + pKₐ₃) / 2  (average of the two higher pKₐ values)

For an acidic amino acid (e.g., aspartate, with side chain pKₐ₃ < 7):
pI = (pKₐ₁ + pKₐ₃) / 2  (average of the two lower pKₐ values)

The Henderson-Hasselbalch equation determines the protonation state of each group at a given pH.

Table 1: pKₐ values for selected amino acids

| Amino acid | pKₐ₁ (α-COOH) | pKₐ₂ (α-NH₃⁺) | pKₐ₃ (side chain) | pI |
|------------|----------------|----------------|-------------------|-----|
| Alanine | 2.34 | 9.69 | — | 6.01 |
| Lysine | 2.18 | 8.95 | 10.53 (ε-NH₃⁺) | 9.74 |
| Aspartate | 1.88 | 9.60 | 3.65 (β-COOH) | 2.77 |
| Histidine | 1.82 | 9.17 | 6.00 (imidazole) | 7.59 |`,
    figures: [
      {
        type: 'table',
        title: 'Table 1: pKₐ values for selected amino acids',
        headers: ['Amino acid', 'pKₐ₁ (α-COOH)', 'pKₐ₂ (α-NH₃⁺)', 'pKₐ₃ (side chain)', 'pI'],
        rows: [
          ['Alanine', '2.34', '9.69', '—', '6.01'],
          ['Lysine', '2.18', '8.95', '10.53 (ε-NH₃⁺)', '9.74'],
          ['Aspartate', '1.88', '9.60', '3.65 (β-COOH)', '2.77'],
          ['Histidine', '1.82', '9.17', '6.00 (imidazole)', '7.59'],
        ],
      },
    ],
    questions: [
      {
        id: 'mcat2-cp-043',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p10',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Amino acid structure and properties',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Using Table 1, which amino acid would carry the greatest positive charge at pH 5.0?',
        choices: [
          { label: 'A', text: 'Alanine (pI = 6.01)' },
          { label: 'B', text: 'Lysine (pI = 9.74)' },
          { label: 'C', text: 'Aspartate (pI = 2.77)' },
          { label: 'D', text: 'Histidine (pI = 7.59)' },
        ],
        correctAnswer: 'B',
        explanation: 'Net charge is positive when pH < pI. At pH 5.0: lysine (pI = 9.74) has the greatest difference between pH and pI (4.74 units below pI), meaning it is most strongly protonated. Lysine has two amino groups (α-NH₃⁺ and ε-NH₃⁺) both fully protonated at pH 5.0, while the carboxyl is deprotonated — giving a net charge of approximately +2. Aspartate (pI = 2.77) has pH > pI at pH 5.0, so it carries net negative charge.',
        wrongAnswerExplanations: {
          A: 'Alanine (pI = 6.01): pH 5.0 < pI → slight net positive charge, but less than lysine because the gap is smaller (1 unit vs. 4.74 units for lysine).',
          C: 'Aspartate (pI = 2.77): pH 5.0 > pI → net negative charge, not positive. At pH 5.0, both carboxyl groups are deprotonated.',
          D: 'Histidine (pI = 7.59): pH 5.0 < pI → net positive charge, but less than lysine. At pH 5.0, the imidazole (pKₐ = 6.0) is still mostly protonated, giving charge ≈ +1, while lysine reaches approximately +2.',
        },
        teachingPoint: 'Greatest positive charge at a given pH: the amino acid furthest below its pI (pH << pI). Lysine (pI = 9.74) at pH 5.0 is 4.74 units below its pI, giving approximately +2 net charge from two protonated amino groups.',
        relatedTopics: ['isoelectric point', 'amino acid charge', 'lysine', 'net charge calculation'],
      },
      {
        id: 'mcat2-cp-044',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p10',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Amino acid structure and properties',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Using Table 1, what is the expected pI for alanine, and does this match the tabulated value?',
        choices: [
          { label: 'A', text: 'pI = (2.34 + 9.69)/2 = 6.02; yes, matches Table 1' },
          { label: 'B', text: 'pI = (2.34 + 9.69)/2 = 9.69; does not match Table 1' },
          { label: 'C', text: 'pI = 9.69 because the pI equals the higher pKₐ' },
          { label: 'D', text: 'pI = 2.34 because the pI equals the lower pKₐ' },
        ],
        correctAnswer: 'A',
        explanation: 'For a simple amino acid with no ionizable side chain, pI = (pKₐ₁ + pKₐ₂)/2 = (2.34 + 9.69)/2 = 12.03/2 = 6.015 ≈ 6.01. This matches the tabulated value of 6.01 in Table 1, confirming the formula.',
        wrongAnswerExplanations: {
          B: 'The arithmetic is inverted; (2.34 + 9.69)/2 = 6.02, not 9.69.',
          C: 'The pI is not equal to the higher pKₐ. pI = average of the two flanking pKₐ values around the neutral form.',
          D: 'The pI is not equal to the lower pKₐ (2.34). At pH 2.34, alanine would be in the form H₂A⁺ ⇌ HA⁰ (half-protonated at the carboxyl), not at net zero charge.',
        },
        teachingPoint: 'For simple amino acids: pI = (pKₐ₁ + pKₐ₂)/2. pKₐ₁ for carboxyl (low, ~2) and pKₐ₂ for amino group (high, ~10). pI ≈ 6 for most simple amino acids (alanine: 6.01). pI is not equal to either individual pKₐ.',
        relatedTopics: ['isoelectric point', 'pKₐ', 'zwitterion', 'amino acid structure'],
      },
      {
        id: 'mcat2-cp-045',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p10',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Amino acid structure and properties',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'During gel electrophoresis at pH 7.0, in which direction would aspartate (pI = 2.77) migrate?',
        choices: [
          { label: 'A', text: 'Toward the positive electrode (anode), because it is negatively charged at pH 7.0' },
          { label: 'B', text: 'Toward the negative electrode (cathode), because it is positively charged at pH 7.0' },
          { label: 'C', text: 'No migration, because pH 7.0 is near its pI' },
          { label: 'D', text: 'Toward the positive electrode, because all acidic amino acids migrate toward the anode' },
        ],
        correctAnswer: 'A',
        explanation: 'At pH 7.0, which is well above aspartate\'s pI (2.77), aspartate carries a net negative charge. The side chain carboxyl (pKₐ₃ = 3.65) and the α-carboxyl (pKₐ₁ = 1.88) are both fully deprotonated at pH 7.0 (pH >> pKₐ). In electrophoresis, negatively charged species migrate toward the positive electrode (anode). This is also correct for option D\'s conclusion, but D\'s reasoning ("all acidic amino acids always move toward anode") is overly broad — it depends on the experimental pH relative to the pI.',
        wrongAnswerExplanations: {
          B: 'Positively charged molecules migrate toward the cathode. Aspartate is negatively charged at pH 7.0 (above its pI), so it moves toward the anode, not cathode.',
          C: 'No migration occurs only at the pI. Aspartate\'s pI = 2.77, which is far from pH 7.0.',
          D: 'The conclusion (toward anode) is correct, but "all acidic amino acids" always moving toward the anode is incorrect — this is only true when pH > pI. If the gel pH were below 2.77, aspartate would move toward the cathode.',
        },
        teachingPoint: 'Electrophoresis migration: pH > pI → net negative charge → migrates to anode (+). pH < pI → net positive charge → migrates to cathode (−). Aspartate pI = 2.77; at pH 7.0, it is fully negative and moves to the anode.',
        relatedTopics: ['electrophoresis', 'isoelectric point', 'amino acid charge', 'aspartate'],
      },
      {
        id: 'mcat2-cp-046',
        sectionId: 'chem-phys',
        passageId: 'f2-cp-p10',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Amino acid structure and properties',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'Histidine is unique among standard amino acids because its imidazole side chain has pKₐ₃ ≈ 6.0, close to physiological pH. What fraction of histidine side chains are protonated (charged) at pH 7.0?',
        choices: [
          { label: 'A', text: 'Approximately 9%' },
          { label: 'B', text: 'Approximately 50%' },
          { label: 'C', text: 'Approximately 91%' },
          { label: 'D', text: 'Approximately 1%' },
        ],
        correctAnswer: 'A',
        explanation: 'Using Henderson-Hasselbalch: pH = pKₐ + log([A⁻]/[HA]). At pH 7.0, pKₐ = 6.0: 7.0 = 6.0 + log([A⁻]/[HA]) → log([A⁻]/[HA]) = 1.0 → [A⁻]/[HA] = 10. Fraction protonated = [HA]/([HA] + [A⁻]) = 1/(1 + 10) = 1/11 ≈ 9%. The deprotonated (neutral) form predominates; only ~9% of histidine side chains are positively charged at physiological pH.',
        wrongAnswerExplanations: {
          B: '50% protonated occurs at pH = pKₐ = 6.0 (by definition). At pH 7.0 (one unit above pKₐ), the equilibrium strongly favors the deprotonated form.',
          C: '91% protonated would be the fraction at pH 5.0 (one unit BELOW the pKₐ). At pH 7.0 (one unit ABOVE), ~91% are deprotonated and only 9% protonated.',
          D: '~1% protonated occurs at two pH units above the pKₐ (pH 8.0). At pH 7.0 (one unit above pKₐ 6.0), approximately 9% are protonated.',
        },
        teachingPoint: 'Henderson-Hasselbalch: at 1 pH unit above pKₐ, [A⁻]/[HA] = 10, so 91% deprotonated and 9% protonated. Histidine side chain: pKₐ = 6.0, pH 7.0 → ~9% protonated. This partial protonation at physiological pH makes histidine the primary pH buffer in proteins.',
        relatedTopics: ['Henderson-Hasselbalch', 'histidine', 'imidazole', 'protonation fraction', 'protein buffering'],
      },
    ],
  },
]
