import type { MCATPassage } from '../types'

// Form 3 C/P — Passages 6–10
// IDs: mcat3-cp-025 through mcat3-cp-046 (22 questions, 5 passages × ~4-5q)

export const chemPhysPassages3_06to10: MCATPassage[] = [
  // ─── C/P Passage 6: Organic Chemistry — Nucleophilic Substitution ────────────
  {
    id: 'f3-cp-p6',
    sectionId: 'chem-phys',
    title: 'SN1 and SN2 Mechanisms and Stereochemistry',
    passageText: `Nucleophilic substitution reactions at sp³ carbon centers proceed by two distinct mechanisms distinguished by kinetics and stereochemistry. In the SN2 mechanism, the nucleophile attacks the electrophilic carbon from the back while the leaving group departs simultaneously (concerted). The transition state is pentacoordinate. The rate depends on both nucleophile and substrate concentrations: rate = k[substrate][nucleophile]. SN2 reactions proceed with inversion of configuration (Walden inversion) and are favored by: (1) strong nucleophiles, (2) primary or methyl substrates, (3) polar aprotic solvents (DMSO, DMF, acetone), and (4) good leaving groups.

In the SN1 mechanism, ionization of the leaving group first generates a carbocation intermediate (rate-determining step), followed by nucleophilic attack. Rate = k[substrate] (first-order). The carbocation is planar (sp² hybridized), enabling nucleophilic attack from either face → racemization (approximately equal mixture of R and S products). SN1 is favored by: (1) tertiary (or allylic/benzylic) substrates, (2) polar protic solvents (water, alcohols) that stabilize the carbocation and leaving group via solvation, and (3) weak nucleophiles/neutral conditions.

A researcher treats (R)-2-bromobutane with sodium iodide in acetone, then separately with ethanol/water. The first reaction produces a product with inverted configuration; the second produces a racemic mixture.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-025',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p6',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'In the first reaction (NaI in acetone), which mechanism applies and why?',
        choices: [
          { label: 'A', text: 'SN1, because iodide is a good leaving group and acetone is a polar protic solvent' },
          { label: 'B', text: 'SN2, because iodide is a strong nucleophile and acetone is a polar aprotic solvent' },
          { label: 'C', text: 'SN1, because 2-bromobutane is a secondary substrate and secondary substrates always undergo SN1' },
          { label: 'D', text: 'SN2, because polar protic solvents favor SN2 with secondary substrates' },
        ],
        correctAnswer: 'B',
        explanation: '2-Bromobutane is a secondary alkyl halide. Iodide (I⁻) is a strong nucleophile (large, polarizable, good at SN2). Acetone is a polar aprotic solvent (polar but no O–H protons to hydrogen-bond the nucleophile) — the passage confirms polar aprotic solvents favor SN2. The product has inverted configuration (Walden inversion, SN2 characteristic). B is correct. A is wrong — acetone is polar aprotic, not protic; also iodide functions as the nucleophile, not leaving group, here. C is wrong — secondary substrates compete between SN1 and SN2; the reaction conditions (strong nucleophile, aprotic solvent) determine the mechanism, not substrate class alone. D is wrong — polar protic solvents favor SN1, not SN2.',
        wrongAnswerExplanations: {
          A: 'Acetone (CH₃COCH₃) is polar aprotic — it has a dipole moment (polar) but no O–H group to hydrogen-bond nucleophiles (aprotic). Polar protic solvents (water, ethanol) favor SN1. Also, the inversion product confirms SN2 occurred.',
          C: 'Secondary substrates can undergo either SN1 or SN2, depending on conditions. Strong nucleophile + aprotic solvent → SN2 even at secondary carbon. Weak nucleophile/protic solvent → SN1 at secondary carbon.',
          D: 'Polar protic solvents (water, alcohol) stabilize carbocation intermediates via H-bonding and ion solvation → favor SN1. Polar aprotic solvents (acetone, DMSO) favor SN2.',
        },
        teachingPoint: 'SN1 vs. SN2 decision tree: (1) primary → SN2 only; (2) tertiary → SN1 only; (3) secondary → determined by conditions. Strong nucleophile + polar aprotic → SN2 at 2°. Weak nucleophile + polar protic → SN1 at 2°. Inverted product confirms SN2; racemic product confirms SN1.',
        relatedTopics: ['SN1', 'SN2', 'polar aprotic', 'nucleophile strength', 'inversion of configuration'],
      },
      {
        id: 'mcat3-cp-026',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p6',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Why does the SN1 reaction produce a racemic mixture?',
        choices: [
          { label: 'A', text: 'Because the nucleophile attacks from the same face as the leaving group' },
          { label: 'B', text: 'Because the polar protic solvent racemizes the product after the reaction' },
          { label: 'C', text: 'Because SN1 uses a strong nucleophile that inverts configuration' },
          { label: 'D', text: 'Because the carbocation intermediate is planar (sp² hybridized), enabling attack from either face with roughly equal probability' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage states: "The carbocation is planar (sp² hybridized), enabling nucleophilic attack from either face → racemization (approximately equal mixture of R and S products)." A planar carbocation has no preferred face for attack — the nucleophile has equal probability of attacking from either side, producing equal amounts of R and S enantiomers (racemic mixture). D is correct. A describes retention (same face attack, uncommon). C inverts the logic (strong nucleophiles favor SN2 with inversion). B is incorrect — polar protic solvents facilitate SN1 but do not racemize the product after the fact.',
        wrongAnswerExplanations: {
          A: 'Attack from the same face as the departing leaving group would give retention of configuration, not racemization. This is not the SN1 mechanism.',
          C: 'Strong nucleophiles favor SN2 (inversion), not SN1. SN1 typically involves weak nucleophiles (or is solvent-driven).',
          B: 'Polar protic solvents stabilize the carbocation and facilitate its formation (ionization step), but they do not chemically racemize the product. The racemization is inherent to the mechanism (planar carbocation).',
          
        },
        teachingPoint: 'SN1 stereochemistry: carbocation = sp² = planar = no chirality → equal attack from both faces → 50:50 R:S = racemic mixture. Perfect racemization is theoretical; in practice, often slight excess of inversion product because the leaving group (still nearby as ion pair) partially shields one face.',
        relatedTopics: ['carbocation', 'sp² hybridization', 'racemization', 'SN1 stereochemistry', 'planar intermediate'],
      },
      {
        id: 'mcat3-cp-027',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p6',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'hard',
        question: 'Neopentyl bromide [(CH₃)₃CCH₂Br] is a primary alkyl halide but undergoes extremely slow SN2 reactions. Which factor best explains this?',
        choices: [
          { label: 'A', text: 'Primary alkyl halides cannot undergo SN2 reactions' },
          { label: 'B', text: 'The leaving group bromide is too poor to support SN2' },
          { label: 'C', text: 'Steric hindrance from the bulky tert-butyl group adjacent to the reaction center blocks backside attack by the nucleophile' },
          { label: 'D', text: 'Neopentyl bromide undergoes SN1 instead because it forms a stable tertiary carbocation' },
        ],
        correctAnswer: 'C',
        explanation: 'SN2 requires backside attack at the carbon bearing the leaving group. Although neopentyl bromide is primary (typically SN2-favorable), the carbon adjacent to the reaction center is a quaternary carbon (three methyl groups attached). This creates enormous steric bulk that blocks the trajectory of the incoming nucleophile. The nucleophile cannot approach the reaction center cleanly → very slow SN2. C is correct. A is wrong — primary halides typically DO undergo SN2; neopentyl is an exception due to steric (not electronic) factors. B is wrong — bromide is a good leaving group for both SN1 and SN2. D is wrong — neopentyl bromide cannot readily form a carbocation at the primary carbon; rearrangement would be needed to get a tertiary carbocation, making SN1 also slow.',
        wrongAnswerExplanations: {
          A: 'Primary alkyl halides generally undergo SN2 readily (methyl > primary > secondary >> tertiary). Neopentyl is an anomaly due to severe steric crowding at the adjacent quaternary carbon, not because of the primary classification.',
          D: 'A primary carbocation would form at the CH₂ carbon — primary carbocations are highly unstable and do not form readily. While a hydride or methyl shift could convert a primary to a tertiary carbocation, this requires additional energy, making SN1 very slow for neopentyl systems.',
          B: 'Bromide is an excellent leaving group (weak base, stable leaving group). It supports SN2 well. The problem is sterics blocking approach to the carbon, not the leaving group\'s quality.',
        },
        teachingPoint: 'Steric hindrance in SN2: backside attack requires unobstructed trajectory. Neopentyl = primary carbon adjacent to quaternary C(CH₃)₃ → steric bulk blocks nucleophile approach despite being primary. This is a classic test of understanding that substrate reactivity ≠ just degree of substitution; adjacent bulky groups matter.',
        relatedTopics: ['SN2 steric hindrance', 'neopentyl', 'backside attack', 'steric bulk', 'primary substrates'],
      },
      {
        id: 'mcat3-cp-028',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p6',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Nucleophilic substitution',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Which of the following best describes why DMSO (dimethylsulfoxide) enhances SN2 reaction rates compared to water?',
        choices: [
          { label: 'A', text: 'DMSO is a polar protic solvent that solvates the nucleophile, increasing its reactivity' },
          { label: 'B', text: 'DMSO is a polar aprotic solvent that does not hydrogen-bond the nucleophile, leaving it "naked" and more reactive' },
          { label: 'C', text: 'DMSO increases the concentration of carbocations, facilitating SN2' },
          { label: 'D', text: 'DMSO is nonpolar, so it increases the reactivity of ionic nucleophiles by exclusion' },
        ],
        correctAnswer: 'B',
        explanation: 'DMSO is polar aprotic (polar molecule, no O–H or N–H groups to donate hydrogen bonds). The passage confirms polar aprotic solvents favor SN2. In polar protic solvents (water, alcohols), the nucleophile (e.g., F⁻, Cl⁻) is surrounded by a hydrogen-bond cage that must be disrupted before the nucleophile can react — effectively reducing nucleophilicity. In DMSO, the nucleophile is not hydrogen-bonded and retains full reactivity ("naked" nucleophile). B is correct. A wrongly labels DMSO as protic. C is wrong — SN2 does not involve carbocations (that\'s SN1). D is wrong — DMSO is polar, not nonpolar.',
        wrongAnswerExplanations: {
          A: 'DMSO is polar aprotic, not polar protic. Polar protic solvents (water, ethanol) have O–H groups and DECREASE nucleophilicity by hydrogen-bonding the nucleophile.',
          C: 'Carbocations are intermediates in SN1, not SN2. SN2 is concerted — no carbocation forms.',
          D: 'DMSO (dimethylsulfoxide) is polar (has a polar S=O bond, large dipole moment). It is not a nonpolar solvent.',
        },
        teachingPoint: 'Polar aprotic solvents (DMSO, DMF, acetone): polar enough to dissolve ionic nucleophiles, but no O–H to hydrogen-bond them. Result: "naked nucleophile" — full nucleophilic power. Polar protic solvents solvate anions via H-bonds → reduce nucleophilicity → slower SN2. Nucleophilicity order in polar aprotic: I⁻ ≈ F⁻ > Br⁻ > Cl⁻ (reflects basicity). Reverses in polar protic (solvation effects dominate).',
        relatedTopics: ['polar aprotic', 'DMSO', 'solvation', 'nucleophilicity', 'SN2 rate'],
      },
    ],
  },

  // ─── C/P Passage 7: Optics and Lenses ───────────────────────────────────────
  {
    id: 'f3-cp-p7',
    sectionId: 'chem-phys',
    title: 'Geometric Optics: Lenses and the Eye',
    passageText: `Geometric optics describes image formation using ray diagrams and the thin lens equation:

1/f = 1/do + 1/di

where f is focal length (positive for converging/convex lenses, negative for diverging/concave lenses), do is object distance (positive), and di is image distance (positive = real image on opposite side, negative = virtual image on same side as object). Magnification is m = −di/do; |m| > 1 indicates a larger image; negative m indicates an inverted image.

The power of a lens is P = 1/f (in diopters, D), where f is in meters. Combined lens systems: P_total = P₁ + P₂ (lenses in contact).

The human eye adjusts focal power through accommodation — the ciliary muscles contract (near vision) or relax (far vision) to change the curvature (and thus focal length) of the crystalline lens. The far point is the most distant point a relaxed eye can focus; the near point is the closest.

Myopia (nearsightedness): the relaxed eye focuses light in front of the retina. The far point is closer than infinity — the eye cannot focus distant objects. Corrected with a diverging (concave, negative) lens.

Hyperopia (farsightedness): the relaxed eye focuses light behind the retina. The near point is farther than normal — the eye cannot focus close objects. Corrected with a converging (convex, positive) lens.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-030',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'A myopic patient has a far point of 25 cm. What prescription (in diopters) is needed to allow the patient to see clearly at infinity?',
        choices: [
          { label: 'A', text: '+4 D (converging)' },
          { label: 'B', text: '−0.25 D (diverging)' },
          { label: 'C', text: '+0.25 D (converging)' },
          { label: 'D', text: '−4 D (diverging)' },
        ],
        correctAnswer: 'D',
        explanation: 'A myopic patient cannot see infinity — the relaxed eye focuses light before the retina. The correcting lens must take light from infinity (do = ∞) and converge it to appear to come from the far point (25 cm) — making a virtual image at −25 cm (on the same side as the object, i.e., a diverging lens). Using the thin lens equation: 1/f = 1/∞ + 1/di. For a virtual image at −25 cm: 1/f = 0 + 1/(−0.25 m) = −4 D. The lens power is −4 B (diverging). D is correct. A (+4 D) would be for hyperopia. C and B have the wrong magnitude (using cm without converting to meters).',
        wrongAnswerExplanations: {
          A: '+4 D is a converging lens, used for hyperopia (farsightedness). A myopic patient needs a diverging lens to push the effective far point back to infinity.',
          C: '+0.25 D would result from not converting cm to meters (using f = 25 instead of 0.25). The correct conversion: 25 cm = 0.25 m → P = 1/0.25 = 4 D (with appropriate sign).',
          B: '−0.25 D is the correct sign (diverging) but wrong magnitude. 25 cm = 0.25 m → P = −1/0.25 = −4 D.',
          
        },
        teachingPoint: 'Myopia correction: diverging lens redirects parallel rays (from ∞) to appear to diverge from the far point (which is the most a myopic eye can handle when relaxed). P = 1/f = 1/(−far point in meters) = −1/0.25 = −4 D. Converting: far point in cm → m first!',
        relatedTopics: ['myopia', 'lens power', 'diopters', 'diverging lens', 'thin lens equation'],
      },
      {
        id: 'mcat3-cp-031',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'An object is placed 30 cm from a converging lens with f = 10 cm. Where is the image and is it real or virtual?',
        choices: [
          { label: 'A', text: 'di = 15 cm; real image on the opposite side of the lens' },
          { label: 'B', text: 'di = −15 cm; virtual image on the same side as the object' },
          { label: 'C', text: 'di = 15 cm; virtual image on the same side as the object' },
          { label: 'D', text: 'di = 10 cm; real image at the focal point' },
        ],
        correctAnswer: 'A',
        explanation: '1/f = 1/do + 1/di → 1/10 = 1/30 + 1/di → 1/di = 1/10 − 1/30 = 3/30 − 1/30 = 2/30 → di = 15 cm. Positive di = real image on the opposite side of the lens from the object. A is correct. B has the wrong sign without justification. C has correct distance but wrong image type (real, not virtual). D would apply if the object were at infinity (parallel rays → focal point), but here do = 30 cm (finite).',
        wrongAnswerExplanations: {
          B: 'di = +15 cm (positive), not −15 cm. A negative di would indicate a virtual image, but with do = 30 cm > f = 10 cm, the object is beyond the focal point → real image on the other side (positive di).',
          C: 'The image distance of 15 cm is correct, but the image type is wrong. Positive di = real image (formed where actual rays converge on the opposite side), not virtual.',
          D: 'The image at the focal point (di = f = 10 cm) occurs when do = ∞ (parallel incoming rays). Here do = 30 cm (finite) → di = 15 cm, not 10 cm.',
        },
        teachingPoint: 'Thin lens quick analysis: if do > f → real image (positive di), inverted, on opposite side. If do < f → virtual image (negative di), upright, on same side. Here do = 30 > f = 10 → real image at di = 15 cm. Check: m = −di/do = −15/30 = −0.5 (inverted, smaller image).',
        relatedTopics: ['thin lens equation', 'real vs virtual image', 'converging lens', 'image distance', 'magnification'],
      },
      {
        id: 'mcat3-cp-032',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'A person with hyperopia (farsightedness) wears corrective lenses with P = +3 D. What does this imply about their near point without correction?',
        choices: [
          { label: 'A', text: 'Their near point is closer than 25 cm (normal near point), so they need a diverging lens' },
          { label: 'B', text: 'Their corrective lens provides −3 D to diverge incoming light' },
          { label: 'C', text: 'Their far point is at 33 cm and they are myopic' },
          { label: 'D', text: 'Their near point is farther than 25 cm; they cannot focus on objects within normal near distances without correction' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage states hyperopia = "the relaxed eye focuses light behind the retina. The near point is farther than normal — the eye cannot focus close objects." Hyperopia is corrected with converging (positive) lenses (+3 D here). A hyperopic person\'s uncorrected near point is farther than the normal ~25 cm — they cannot see close objects clearly without the converging lens to augment their focusing power. D is correct. A describes a condition requiring diverging lenses (myopia correction). C would describe myopia (far point = 1/P = 1/3 ≈ 33 cm), but the lens here is positive (+3 D), not negative. B has the wrong sign (hyperopia requires converging/positive, not diverging/negative).',
        wrongAnswerExplanations: {
          A: 'A near point closer than 25 cm would be better near vision than average, which could be corrected with diverging lenses in some circumstances. Hyperopia specifically means the near point is FARTHER than normal.',
          C: 'A far point of 33 cm applies to myopia: P = −1/(far point in m) = −3 D for a −3 D lens. The lens here is +3 D (converging), which treats hyperopia, not myopia.',
          B: 'A +3 D lens is converging (convex), not diverging. Hyperopia is corrected with converging lenses to help the eye focus light onto the retina for near objects.',
          
        },
        teachingPoint: 'Hyperopia = far-sighted: near point too far. Corrected with converging (+) lens. Myopia = near-sighted: far point too close. Corrected with diverging (−) lens. Mnemonic: hyperopia = hard to see near → needs help for near → converging (+). Myopia = hard to see far → needs to reduce convergence for far → diverging (−).',
        relatedTopics: ['hyperopia', 'converging lens', 'near point', 'correction prescription', 'accommodation'],
      },
      {
        id: 'mcat3-cp-033',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p7',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Optics',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Two thin lenses (P₁ = +5 D, P₂ = −2 D) are placed in contact. What is the combined focal length?',
        choices: [
          { label: 'A', text: 'f = 10 cm' },
          { label: 'B', text: 'f = 1/3 m ≈ 33 cm' },
          { label: 'C', text: 'f = −1/3 m ≈ −33 cm' },
          { label: 'D', text: 'f = 1/7 m ≈ 14 cm' },
        ],
        correctAnswer: 'B',
        explanation: 'P_total = P₁ + P₂ = +5 + (−2) = +3 D. f = 1/P = 1/3 m ≈ 33 cm. B is correct. The combined system is converging (positive power) because the converging lens (+5 D) dominates. A (10 cm) would correspond to P = 10 D. D (14 cm) would correspond to P = 7 D = 5 + 2 (incorrectly adding magnitudes instead of algebraically). C (−33 cm) would apply if P_total were negative (−3 D).',
        wrongAnswerExplanations: {
          A: 'f = 10 cm → P = 10 D, which would require P₁ + P₂ = 10 D, not 3 D.',
          C: '−33 cm (f negative → diverging system) would require P_total = −3 D. Here P_total = +3 D (converging).',
          D: 'f = 14 cm → P = 7 D, which results from adding |P₁| + |P₂| = 5 + 2 = 7 D without regarding sign. Must add algebraically: +5 + (−2) = +3 D.',
        },
        teachingPoint: 'Combined lens power: P_total = P₁ + P₂ (always algebraic sum, with signs). Then f = 1/P_total. Key: converging = positive P and f; diverging = negative P and f. Combined lenses: powers add algebraically, then convert to focal length.',
        relatedTopics: ['combined lenses', 'lens power', 'diopters', 'focal length', 'lens combinations'],
      },
    ],
  },

  // ─── C/P Passage 8: Organic Chemistry — Carbonyl Chemistry ──────────────────
  {
    id: 'f3-cp-p8',
    sectionId: 'chem-phys',
    title: 'Carbonyl Chemistry: Aldehydes, Ketones, and Nucleophilic Addition',
    passageText: `Carbonyl compounds (aldehydes and ketones) undergo nucleophilic addition reactions because the carbonyl carbon is electrophilic — the electronegative oxygen polarizes the C=O bond, creating a partial positive charge on carbon. The general mechanism: nucleophile attacks the electrophilic carbonyl carbon → tetrahedral alkoxide intermediate → protonation → alcohol product.

Aldehydes are generally more reactive than ketones in nucleophilic addition for two reasons: (1) Steric effects — two hydrogens in aldehydes offer less steric hindrance than two alkyl groups in ketones. (2) Electronic effects — alkyl groups are electron-donating (inductive), making the carbonyl carbon of ketones less electrophilic.

Important carbonyl reactions:
• Reaction with NaBH₄ or LiAlH₄: reduces C=O to C–OH (alcohol). NaBH₄ is selective for carbonyls; LiAlH₄ reduces carbonyls AND carboxylic acid derivatives.
• Reaction with Grignard reagents (RMgX): adds an R group to carbonyl → alcohol after workup. Aldehydes + RMgX → secondary alcohol; ketones + RMgX → tertiary alcohol; formaldehyde (HCHO) + RMgX → primary alcohol.
• Reaction with water: forms a hydrate (gem-diol). Equilibrium favors hydrate for formaldehyde; disfavors hydrate for most ketones.
• Reaction with alcohols: forms hemiacetal (one equivalent), then acetal (two equivalents, under acid catalysis). Acetals are stable to base but hydrolyzed by acid.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-034',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Carbonyl chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Which type of alcohol is produced when acetaldehyde (CH₃CHO) reacts with a Grignard reagent (RMgX)?',
        choices: [
          { label: 'A', text: 'Primary alcohol' },
          { label: 'B', text: 'Secondary alcohol' },
          { label: 'C', text: 'Tertiary alcohol' },
          { label: 'D', text: 'Formaldehyde adduct (primary alcohol from formaldehyde)' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states: "Aldehydes + RMgX → secondary alcohol." Acetaldehyde (CH₃CHO) is an aldehyde with one alkyl group (CH₃) on the carbonyl carbon. When the Grignard (R) adds to the carbonyl, the product after protonation has two alkyl groups on the former carbonyl carbon (the original CH₃ from acetaldehyde + R from the Grignard) → secondary alcohol. B is correct. A (primary) results from formaldehyde + RMgX. C (tertiary) results from ketone + RMgX (two alkyl groups already on carbonyl carbon + R added = three alkyl groups).',
        wrongAnswerExplanations: {
          A: 'Primary alcohols from Grignard reactions come from formaldehyde (HCHO) + RMgX → RCH₂OH. Formaldehyde has no alkyl groups, so addition gives a primary alcohol (one alkyl group on the OH-bearing carbon).',
          C: 'Tertiary alcohols come from ketone + RMgX. Ketones have two alkyl groups; adding the Grignard R gives three alkyl groups on the product carbon → tertiary.',
          D: 'Acetaldehyde is not formaldehyde. Formaldehyde (HCHO) has no alkyl groups; acetaldehyde (CH₃CHO) has one methyl group.',
        },
        teachingPoint: 'Grignard + carbonyl → alcohol product summary: HCHO (formaldehyde) → 1° alcohol; RCHO (aldehyde) → 2° alcohol; R₂CO (ketone) → 3° alcohol. Memorize by counting alkyl groups on carbonyl carbon: 0 → primary, 1 → secondary, 2 → tertiary.',
        relatedTopics: ['Grignard reaction', 'carbonyl addition', 'alcohol type', 'aldehyde vs ketone', 'nucleophilic addition'],
      },
      {
        id: 'mcat3-cp-035',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Carbonyl chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'An organic chemist wants to protect an aldehyde group from reduction while reducing an ester in the same molecule. Which strategy is most appropriate based on the passage?',
        choices: [
          { label: 'A', text: 'Use NaBH₄ because it reduces both carbonyls and esters equally' },
          { label: 'B', text: 'Convert the aldehyde to an acetal (protect it), use LiAlH₄ to reduce the ester, then hydrolyze the acetal' },
          { label: 'C', text: 'Use LiAlH₄ directly because it selectively reduces esters without affecting aldehydes' },
          { label: 'D', text: 'The aldehyde cannot be protected; both functional groups must be reduced simultaneously' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states acetals are "stable to base but hydrolyzed by acid." Converting the aldehyde to an acetal protects it from reduction (acetals don\'t have reactive C=O). LiAlH₄ is then used to reduce the ester (the passage confirms LiAlH₄ "reduces carbonyls AND carboxylic acid derivatives," which includes esters). After reduction, the acetal is hydrolyzed under acidic conditions to regenerate the aldehyde. B correctly uses acetal protection chemistry. A is wrong — NaBH₄ is "selective for carbonyls" (reduces aldehydes and ketones, but not esters). C is wrong — LiAlH₄ reduces both carbonyls and esters; it would not spare the aldehyde. D is wrong — acetal protection provides a solution.',
        wrongAnswerExplanations: {
          A: 'NaBH₄ selectively reduces carbonyls (aldehydes and ketones) but NOT carboxylic acid derivatives (esters, amides). Using NaBH₄ would reduce the aldehyde but leave the ester intact — the opposite of what is needed.',
          C: 'LiAlH₄ reduces carbonyls AND carboxylic acid derivatives — it does not selectively spare aldehydes while reducing esters. Using LiAlH₄ directly would reduce both the aldehyde and the ester.',
          D: 'Acetal protection is a standard strategy for protecting aldehydes. Acetals are resistant to LiAlH₄ and base; they are only hydrolyzed by aqueous acid.',
        },
        teachingPoint: 'Protecting group strategy: acetal = aldehyde protected from nucleophiles and reducing agents. Steps: (1) R-CHO + 2 R\'OH/H⁺ → acetal; (2) do chemistry on the rest; (3) H₃O⁺ → regenerate R-CHO. NaBH₄ vs LiAlH₄: NaBH₄ = mild, selective for C=O only. LiAlH₄ = strong, reduces C=O + esters + amides + carboxylic acids.',
        relatedTopics: ['acetal protection', 'LiAlH4', 'NaBH4', 'protecting groups', 'selectivity'],
      },
      {
        id: 'mcat3-cp-036',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Carbonyl chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Formaldehyde (HCHO) equilibrium strongly favors the hydrate (gem-diol) form, while most ketones strongly favor the carbonyl form. Which of the following best explains this difference?',
        choices: [
          { label: 'A', text: 'Formaldehyde is less reactive than ketones because it has no alkyl stabilization' },
          { label: 'B', text: 'Alkyl groups on ketone carbonyls provide steric and electronic stabilization of the C=O form; formaldehyde has no alkyl groups, making its carbonyl less stabilized relative to the hydrate' },
          { label: 'C', text: 'Ketones form stronger hydrogen bonds with water than formaldehyde' },
          { label: 'D', text: 'The gem-diol of formaldehyde is stabilized by the absence of geminal alkyl groups that would create steric strain' },
        ],
        correctAnswer: 'D',
        explanation: 'The hydrate (gem-diol) has two OH groups on the same carbon. In formaldehyde\'s hydrate, the geminal carbon has H, H, OH, OH — no steric strain. For ketone hydrates, the geminal carbon bears two alkyl groups plus two OH groups — the alkyl groups create steric strain (crowding around the tetrahedral carbon, gauche interactions). Additionally, the alkyl groups inductively stabilize the carbonyl form. Both effects make the carbonyl form of ketones more stable than their gem-diol. D captures the steric aspect (absence of alkyl steric strain in formaldehyde\'s gem-diol). B also captures the electronic and steric argument. D is more precise about the gem-diol stability.',
        wrongAnswerExplanations: {
          A: 'The passage says formaldehyde\'s carbonyl is MORE reactive (less hindered, less electron-donated-to). Reactivity and hydrate equilibrium position are related: the more reactive the carbonyl, the more it reacts with water to form hydrate.',
          B: 'B is largely correct — alkyl groups stabilize the ketone C=O electronically and make the gem-diol sterically unfavorable. D is more specific about the gem-diol steric aspect. B would also be a strong answer choice but D specifically addresses the gem-diol stability (the question focuses on why the hydrate is favored for formaldehyde).',
          C: 'Ketone carbonyls do form hydrogen bonds with water as well. Hydrogen bonding ability alone does not explain the hydrate equilibrium difference.',
        },
        teachingPoint: 'Carbonyl hydration equilibrium: formaldehyde gem-diol heavily favored (H, H on geminal carbon → no steric strain). Ketone gem-diol disfavored (two alkyl groups create steric and electronic destabilization of the tetrahedral hydrate). Key: tetrahedral products are destabilized by geminal alkyl groups relative to the planar carbonyl.',
        relatedTopics: ['carbonyl hydration', 'gem-diol', 'formaldehyde', 'hydrate equilibrium', 'steric effects'],
      },
      {
        id: 'mcat3-cp-060',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p8',
        questionType: 'passage',
        discipline: 'Organic Chemistry',
        contentCategory: 'Carbonyl chemistry',
        foundationalConcept: 'FC 5',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Based on the passage, which reducing agent would selectively reduce an aldehyde to a primary alcohol without reducing an ester in the same molecule?',
        choices: [
          { label: 'A', text: 'LiAlH₄, because it reduces all carbonyl compounds including esters' },
          { label: 'B', text: 'NaBH₄, because it is selective for aldehydes and ketones and does not reduce carboxylic acid derivatives such as esters' },
          { label: 'C', text: 'H₂/Pd, because catalytic hydrogenation is selective for aldehydes' },
          { label: 'D', text: 'NaBH₄ cannot reduce aldehydes — only LiAlH₄ can' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states: "NaBH₄ is selective for carbonyls; LiAlH₄ reduces carbonyls AND carboxylic acid derivatives." An ester is a carboxylic acid derivative. NaBH₄ reduces the aldehyde (C=O → CHOH) but leaves the ester intact. B is correct. A is wrong — LiAlH₄ would reduce both the aldehyde and the ester. C is not stated in the passage and H₂/Pd is primarily used for alkene reduction, not selective carbonyl reduction. D inverts — NaBH₄ does reduce aldehydes and ketones.',
        wrongAnswerExplanations: {
          A: 'LiAlH₄ reduces carbonyls AND carboxylic acid derivatives (including esters). Using LiAlH₄ would reduce both the aldehyde and the ester, not selectively.',
          C: 'Catalytic hydrogenation (H₂/Pd) reduces alkenes and alkynes preferentially. It can reduce aldehydes under forcing conditions, but this is not the standard selective reagent and is not discussed in the passage.',
          D: 'NaBH₄ does reduce aldehydes and ketones (simple carbonyls). The passage confirms: "NaBH₄ is selective for carbonyls." Its limitation is NOT reducing esters, acids, or amides.',
        },
        teachingPoint: 'NaBH₄ vs LiAlH₄ selectivity: NaBH₄ = mild, reduces C=O (aldehydes, ketones) only. LiAlH₄ = strong, reduces C=O + COOR (esters) + COOH (carboxylic acids) + CONR₂ (amides). To selectively reduce an aldehyde without touching an ester → use NaBH₄.',
        relatedTopics: ['NaBH4', 'LiAlH4', 'selective reduction', 'aldehyde', 'ester'],
      },
    ],
  },

  // ─── C/P Passage 9: Atomic Structure and Spectroscopy ───────────────────────
  {
    id: 'f3-cp-p9',
    sectionId: 'chem-phys',
    title: 'Atomic Emission Spectra and Electron Transitions',
    passageText: `The Bohr model of the hydrogen atom predicts discrete energy levels: Eₙ = −13.6/n² eV, where n is the principal quantum number (n = 1, 2, 3…). Electrons can absorb a photon and transition to a higher energy level (excited state) or emit a photon and return to a lower level.

The energy of the emitted or absorbed photon: ΔE = Efinal − Einitial = hf = hc/λ

Emission series in hydrogen:
• Lyman series: transitions to n = 1 (UV range)
• Balmer series: transitions to n = 2 (visible range)
• Paschen series: transitions to n = 3 (IR range)

The energy difference between adjacent levels decreases as n increases: the levels become more closely spaced at higher n. The ionization energy of hydrogen (removing the electron from n = 1 to n = ∞) is 13.6 eV.

Flame spectroscopy identifies elements by their characteristic emission spectra. Each element has a unique set of emission lines because electron energy levels are element-specific.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-037',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p9',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Atomic structure',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'What is the energy of the photon emitted when a hydrogen electron transitions from n = 3 to n = 2?',
        choices: [
          { label: 'A', text: '−1.89 eV (photon energy cannot be negative — this is not physical)' },
          { label: 'B', text: '+3.40 eV' },
          { label: 'C', text: '+1.89 eV' },
          { label: 'D', text: '+1.51 eV' },
        ],
        correctAnswer: 'C',
        explanation: 'Eₙ = −13.6/n². E₃ = −13.6/9 = −1.51 eV. E₂ = −13.6/4 = −3.40 eV. ΔE = Efinal − Einitial = E₂ − E₃ = −3.40 − (−1.51) = −1.89 eV. The negative sign indicates energy is released (emission). The photon energy is the magnitude: E_photon = |ΔE| = 1.89 eV. C is correct. This transition is in the Balmer series (to n = 2) and falls in the visible spectrum (red light, ~656 nm). A is wrong — photon energy is the magnitude of ΔE, always positive. B (3.40 eV) = |E₂| alone, not the transition energy. D (1.51 eV) = |E₃| alone.',
        wrongAnswerExplanations: {
          A: 'Photon energy is always positive — a photon has positive energy. The negative ΔE indicates emission (energy released by atom), but the photon carries away positive energy equal to |ΔE| = 1.89 eV.',
          D: '1.51 eV = |E₃| = energy of the n = 3 level. The transition energy is the difference between the two levels involved, not the energy of either level alone.',
          B: '3.40 eV = |E₂| = energy of the n = 2 level measured from zero. The transition energy is the DIFFERENCE between levels: |E₂ − E₃| = |−3.40 − (−1.51)| = 1.89 eV.',
        },
        teachingPoint: 'Hydrogen energy levels: Eₙ = −13.6/n² eV. Transition energy: ΔE = Efinal − Einitial. For emission (n_high → n_low): ΔE < 0 (atom releases energy). E_photon = |ΔE|. n = 3 → 2: E = |−3.40 − (−1.51)| = 1.89 eV. Balmer series (→ n = 2) = visible light. Lyman series (→ n = 1) = UV. Paschen (→ n = 3) = IR.',
        relatedTopics: ['Bohr model', 'energy levels', 'photon energy', 'Balmer series', 'electron transitions'],
      },
      {
        id: 'mcat3-cp-038',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p9',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Atomic structure',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'An electron in the hydrogen atom absorbs a photon and transitions from n = 1 to n = 4. The photon\'s energy must be:',
        choices: [
          { label: 'A', text: 'Less than 13.6 eV (the ionization energy)' },
          { label: 'B', text: 'Exactly 13.6 eV to reach the ionization limit' },
          { label: 'C', text: 'Greater than 13.6 eV because excitation requires more energy than ionization' },
          { label: 'D', text: 'Equal to the energy at n = 4 (−0.85 eV)' },
        ],
        correctAnswer: 'A',
        explanation: 'E₁ = −13.6 eV. E₄ = −13.6/16 = −0.85 eV. ΔE = E₄ − E₁ = −0.85 − (−13.6) = 12.75 eV. The photon energy must be 12.75 eV. This is less than the ionization energy (13.6 eV), because the electron only reaches n = 4 (still bound), not infinity (ionized). A is correct. B (13.6 eV) would ionize the atom (electron removed completely). C is wrong — excitation to n = 4 requires less than ionization energy. D is wrong — the photon energy equals the energy difference, not the absolute energy of the target level.',
        wrongAnswerExplanations: {
          B: '13.6 eV is the ionization energy (n = 1 → n = ∞). Exciting to n = 4 requires less energy (12.75 eV) because the electron remains bound.',
          C: 'Excitation does not require more than ionization energy. A photon with > 13.6 eV would ionize the atom AND give the freed electron kinetic energy (photoelectric effect above threshold).',
          D: 'The photon energy must equal the energy DIFFERENCE between levels (ΔE = 12.75 eV), not the energy of the target level (−0.85 eV). The negative value indicates the level is bound; the photon must supply enough energy to bridge the gap from n = 1 to n = 4.',
        },
        teachingPoint: 'Absorption photon energy = ΔE = E_upper − E_lower > 0 (always positive for absorption). n = 1 → 4: ΔE = −0.85 − (−13.6) = 12.75 eV. Compare: ionization = n = 1 → ∞: ΔE = 0 − (−13.6) = 13.6 eV. Any excitation (to a finite n) requires less energy than full ionization.',
        relatedTopics: ['electron absorption', 'excitation energy', 'ionization energy', 'Bohr model', 'photon energy'],
      },
      {
        id: 'mcat3-cp-039',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p9',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Atomic structure',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Two hydrogen emission lines appear in the visible spectrum (Balmer series). A sodium flame test produces two yellow lines (~589 nm). What principle distinguishes these emission spectra?',
        choices: [
          { label: 'A', text: 'All atoms produce continuous spectra; hydrogen and sodium only differ in intensity' },
          { label: 'B', text: 'Hydrogen and sodium have different electronic energy level spacings; each element\'s unique energy levels produce characteristic emission lines' },
          { label: 'C', text: 'Hydrogen produces emission lines only because it is monatomic; molecules produce continuous spectra' },
          { label: 'D', text: 'Sodium produces only one emission line; hydrogen produces multiple lines due to its higher atomic mass' },
        ],
        correctAnswer: 'B',
        explanation: 'The passage states: "Each element has a unique set of emission lines because electron energy levels are element-specific." Hydrogen\'s emission lines (Balmer series in visible) reflect its unique n = 2, 3, 4, 5... energy levels. Sodium\'s two yellow lines (sodium doublet) reflect its unique 3p → 3s transitions. The energy level structure differs between elements because each element has different nuclear charge (Z) and electron configuration. B is correct. A (continuous spectra) applies only to hot solids/dense gases, not atomic gases. C is incorrect — hydrogen also has multiple lines from multiple transitions. D (atomic mass) does not determine emission spectra; electronic structure does.',
        wrongAnswerExplanations: {
          A: 'Atomic emission spectra are discrete (line spectra), not continuous. Continuous spectra come from blackbody radiation (hot solids or dense gases under pressure). Atomic emission produces characteristic discrete lines.',
          C: 'Both hydrogen (monatomic) and sodium (also monatomic in a flame) produce line spectra. The number of emission lines depends on available electron transitions, not on being monatomic vs molecular.',
          D: 'Sodium produces a doublet (two closely spaced lines at ~589 nm), not a single line. Atomic mass doesn\'t determine emission lines — nuclear charge (Z) and electron configuration determine energy levels.',
        },
        teachingPoint: 'Atomic emission spectroscopy: each element has a unique "fingerprint" spectrum because each element has unique electronic energy level spacings. H → Balmer lines (visible), Lyman (UV), Paschen (IR). Na → yellow doublet (3p → 3s, ~589 nm). Application: flame tests, astronomical spectroscopy, elemental analysis.',
        relatedTopics: ['emission spectrum', 'atomic spectra', 'element identification', 'energy levels', 'flame test'],
      },
      {
        id: 'mcat3-cp-061',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p9',
        questionType: 'passage',
        discipline: 'General Chemistry',
        contentCategory: 'Atomic structure',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'A photon with wavelength λ = 121.6 nm is emitted from a hydrogen atom. Using ΔE = hc/λ and Eₙ = −13.6/n² eV, to which emission series and transition does this photon correspond? (hc = 1240 eV·nm)',
        choices: [
          { label: 'A', text: 'Lyman series; n = 2 → n = 1 transition' },
          { label: 'B', text: 'Balmer series; n = 3 → n = 2 transition' },
          { label: 'C', text: 'Paschen series; n = 4 → n = 3 transition' },
          { label: 'D', text: 'Lyman series; n = 3 → n = 1 transition' },
        ],
        correctAnswer: 'A',
        explanation: 'E_photon = hc/λ = 1240 eV·nm / 121.6 nm ≈ 10.2 eV. Check n = 2 → n = 1 (Lyman): ΔE = E₁ − E₂ = (−13.6/1) − (−13.6/4) = −13.6 + 3.4 = −10.2 eV. Magnitude = 10.2 eV ✓. This is the Lyman alpha line (121.6 nm), the longest-wavelength (lowest-energy) line in the Lyman series. The passage identifies Lyman series as transitions to n = 1 (UV range). A is correct. B (Balmer, n=3→2) emits 1.89 eV at 656 nm (red, visible). C (Paschen, n=4→3) emits 0.66 eV in IR. D (Lyman, n=3→1) emits 12.09 eV at 102.6 nm.',
        wrongAnswerExplanations: {
          C: 'The Paschen series (→ n = 3) emits IR photons with lower energy (< 1.5 eV). 10.2 eV at 121.6 nm is in the UV — characteristic of the Lyman series.',
          D: 'The n = 3 → 1 Lyman transition emits: ΔE = 13.6(1 − 1/9) = 13.6 × 8/9 ≈ 12.09 eV at 102.6 nm. This does not match the 10.2 eV / 121.6 nm photon described.',
          B: 'The n = 3 → 2 Balmer transition emits 1.89 eV at 656 nm (visible red). The photon at 121.6 nm has energy 10.2 eV, far too high for the Balmer series.',
        },
        teachingPoint: 'Lyman alpha (n=2→1): 121.6 nm, 10.2 eV — the brightest UV line from hydrogen, important in astrophysics. Lyman series is UV (→n=1). Balmer series is visible (→n=2). Paschen is IR (→n=3). Quick ID: E = 1240/λ(nm) in eV. 10.2 eV at 121.6 nm = Lyman (n=2→1).',
        relatedTopics: ['Lyman series', 'electron transition', 'photon energy wavelength', 'Bohr model', 'UV spectroscopy'],
      },
    ],
  },

  // ─── C/P Passage 10: Nuclear Chemistry ──────────────────────────────────────
  {
    id: 'f3-cp-p10',
    sectionId: 'chem-phys',
    title: 'Radioactive Decay and Nuclear Medicine',
    passageText: `Radioactive nuclei decay spontaneously by emitting particles or energy. Types of decay:
• Alpha (α) decay: emission of a helium-4 nucleus (⁴₂He). Mass number decreases by 4, atomic number decreases by 2.
• Beta-minus (β⁻) decay: neutron → proton + electron (β⁻) + antineutrino. Mass number unchanged, atomic number increases by 1.
• Beta-plus (β⁺) decay (positron emission): proton → neutron + positron (β⁺) + neutrino. Mass number unchanged, atomic number decreases by 1.
• Gamma (γ) decay: emission of a high-energy photon. No change in mass number or atomic number.

Radioactive decay follows first-order kinetics: N(t) = N₀ × e^(−λt), where λ is the decay constant and t₁/₂ = ln2/λ ≈ 0.693/λ.

In nuclear medicine, technetium-99m (Tc-99m) is widely used as a radiotracer. It decays by gamma emission with a half-life of 6 hours. This short half-life minimizes radiation exposure to patients. Positron emission tomography (PET) uses β⁺ emitters (e.g., fluorine-18, t₁/₂ = 110 min). The positron annihilates with an electron → two 511 keV gamma photons emitted in opposite directions (detected in coincidence).

An iodine-131 (¹³¹I) therapy dose for thyroid cancer delivers 150 mCi initially. ¹³¹I undergoes β⁻ decay and γ decay, with t₁/₂ = 8 days.`,
    figures: [],
    questions: [
      {
        id: 'mcat3-cp-040',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p10',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Nuclear chemistry',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Iodine-131 decays with t₁/₂ = 8 days. How many half-lives have elapsed after 32 days, and what fraction of the initial 150 mCi dose remains?',
        choices: [
          { label: 'A', text: '4 half-lives; 9.375 mCi remaining' },
          { label: 'B', text: '4 half-lives; 150/4 = 37.5 mCi remaining' },
          { label: 'C', text: '8 half-lives; 0.586 mCi remaining' },
          { label: 'D', text: '4 half-lives; 150/8 = 18.75 mCi remaining' },
        ],
        correctAnswer: 'A',
        explanation: 'Number of half-lives = 32 days / 8 days = 4. After 4 half-lives: fraction remaining = (1/2)⁴ = 1/16. Dose remaining = 150 × (1/16) = 9.375 mCi. A is correct. B incorrectly divides by 4 instead of 2⁴ = 16. C incorrectly uses 8 half-lives. D divides by 8 instead of 16.',
        wrongAnswerExplanations: {
          B: 'After 4 half-lives, the remaining fraction is (1/2)⁴ = 1/16, not 1/4. Each half-life halves the remaining quantity: 150 → 75 → 37.5 → 18.75 → 9.375 mCi. Dividing by n (not 2ⁿ) is a common error.',
          C: '8 half-lives would require 64 days (8 × 8 days). Only 32 days have elapsed → 4 half-lives.',
          D: 'Dividing by 8 instead of 16 (= 2⁴). After 4 half-lives: fraction = (1/2)⁴ = 1/16. 150/16 = 9.375 mCi.',
        },
        teachingPoint: 'Half-life calculation: (1) n = total time / t₁/₂ = 32/8 = 4. (2) Fraction = (1/2)ⁿ = (1/2)⁴ = 1/16. (3) Remaining = 150 × 1/16 = 9.375 mCi. Common error: dividing by n rather than (1/2)ⁿ. Quick check: 1 half-life → 1/2, 2 → 1/4, 3 → 1/8, 4 → 1/16.',
        relatedTopics: ['half-life', 'radioactive decay', 'first-order kinetics', 'Iodine-131', 'nuclear medicine'],
      },
      {
        id: 'mcat3-cp-041',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p10',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Nuclear chemistry',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Radon-222 (²²²₈₆Rn) undergoes alpha decay. What is the daughter nucleus?',
        choices: [
          { label: 'A', text: '²¹⁸₈₄Po (Polonium-218)' },
          { label: 'B', text: '²²²₈₇Fr (Francium-222)' },
          { label: 'C', text: '²¹⁸₈₈Ra (Radium-218)' },
          { label: 'D', text: '²²⁶₈₈Ra (Radium-226)' },
        ],
        correctAnswer: 'A',
        explanation: 'Alpha decay: mass number − 4, atomic number − 2. Starting with ²²²₈₆Rn: mass number = 222 − 4 = 218; atomic number = 86 − 2 = 84 = Polonium (Po). Daughter = ²¹⁸₈₄Po. A is correct. B (Francium, Z=87) would result from beta-minus decay. C (Radium, Z=88) increases Z by 2 — wrong direction for alpha. D (Ra-226) increases both A and Z — impossible in radioactive decay.',
        wrongAnswerExplanations: {
          B: 'Francium (Z = 87) would result from beta-minus decay (neutron → proton, Z increases by 1, A unchanged). Alpha decay decreases Z by 2.',
          C: 'Radium (Z = 88) has a higher atomic number than Radon (Z = 86). Alpha decay DECREASES atomic number by 2. You cannot go from Z = 86 to Z = 88 in alpha decay.',
          D: 'Ra-226 (A = 226, Z = 88) has both higher mass number AND higher atomic number — impossible for any decay (decay always decreases mass/energy).',
        },
        teachingPoint: 'Alpha decay: A → A−4, Z → Z−2. Alpha particle = ⁴₂He. Rn-222 (Z=86): A = 222−4 = 218, Z = 86−2 = 84. Z = 84 = Polonium. Daughter = ²¹⁸₈₄Po. Historical note: this is part of the uranium-238 decay chain that produces radon gas in homes.',
        relatedTopics: ['alpha decay', 'nuclear decay', 'atomic number', 'mass number', 'daughter nucleus'],
      },
      {
        id: 'mcat3-cp-042',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p10',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Nuclear chemistry',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 1',
        difficulty: 'easy',
        question: 'Why does PET imaging detect two 511 keV photons from F-18?',
        choices: [
          { label: 'A', text: 'F-18 decays by gamma emission, producing two gamma photons directly' },
          { label: 'B', text: 'Two F-18 atoms simultaneously decay, each emitting one 511 keV photon in coincidence' },
          { label: 'C', text: 'F-18 undergoes beta-minus decay, producing two electrons that generate Cherenkov radiation' },
          { label: 'D', text: 'The positron emitted by F-18 annihilates with an electron, converting 2 × 0.511 MeV of mass-energy into two gamma photons traveling in opposite directions' },
        ],
        correctAnswer: 'D',
        explanation: 'The passage states: "The positron annihilates with an electron → two 511 keV gamma photons emitted in opposite directions." F-18 undergoes beta-plus (positron) decay. The emitted positron immediately encounters an electron and undergoes pair annihilation: e⁺ + e⁻ → 2γ. Each particle has rest mass energy = 0.511 MeV = 511 keV (E = mc²). Conservation of momentum requires the two photons to travel in opposite directions (180°). PET detects these coincident antiparallel photons to locate the decay. D is correct. A is wrong — F-18 is a β⁺ emitter, not a gamma emitter. C is wrong — F-18 undergoes β⁺ (not β⁻) decay. B is wrong — one decay produces both photons via annihilation, not two separate decays.',
        wrongAnswerExplanations: {
          A: 'F-18 undergoes β⁺ decay (positron emission), not gamma decay. Tc-99m undergoes gamma decay. F-18\'s 511 keV photons come from positron-electron annihilation, not direct gamma emission.',
          C: 'Beta-minus decay produces electrons. F-18 undergoes beta-plus (positron) decay. The 511 keV photons come from positron-electron annihilation, not Cherenkov radiation.',
          B: 'A single F-18 atom undergoes β⁺ decay. One emitted positron annihilates with one electron → two photons. This is a one-atom, two-photon process, not two atoms each emitting one photon.',
          
        },
        teachingPoint: 'PET mechanism: (1) β⁺ emitter (F-18) decays → positron emitted. (2) Positron slows in tissue, annihilates with an electron. (3) E = mc² for each particle: 0.511 MeV. (4) Two 511 keV photons emitted 180° apart. (5) PET scanner detects coincident photons → localizes decay to a line (then reconstructs 3D image). The 180° antiparallel emission is required by conservation of momentum.',
        relatedTopics: ['PET imaging', 'positron emission', 'pair annihilation', 'F-18', 'conservation of momentum'],
      },
      {
        id: 'mcat3-cp-043',
        sectionId: 'chem-phys',
        passageId: 'f3-cp-p10',
        questionType: 'passage',
        discipline: 'Physics',
        contentCategory: 'Nuclear chemistry',
        foundationalConcept: 'FC 4',
        scientificSkill: 'Skill 2',
        difficulty: 'medium',
        question: 'Technetium-99m (Tc-99m) is preferred over Iodine-131 for diagnostic imaging. Based on the passage, which of the following is NOT a reason for this preference?',
        choices: [
          { label: 'A', text: 'Tc-99m has a shorter half-life (6 h vs 8 d), minimizing patient radiation exposure' },
          { label: 'B', text: 'Tc-99m emits only gamma rays, which are easily detected without depositing as much radiation dose as particles' },
          { label: 'C', text: 'Tc-99m decays by alpha emission, which is more easily shielded than gamma' },
          { label: 'D', text: 'Tc-99m\'s short half-life allows the radiotracer to clear quickly, reducing cumulative patient dose' },
        ],
        correctAnswer: 'C',
        explanation: 'The passage states Tc-99m "decays by gamma emission" — NOT alpha emission. C is factually incorrect about Tc-99m\'s decay mode, making it the "NOT a reason" answer. Alpha emission would actually be worse for a patient diagnostic agent (alpha particles deposit a large local radiation dose within tissue due to their mass and charge). Tc-99m\'s advantages are: (1) gamma only (no particle dose, gamma exits the body and is detected externally), (2) short half-life (6 h, reduces total dose). A and B are valid reasons. D is a valid reason (same as A but expressed differently).',
        wrongAnswerExplanations: {
          A: 'True — 6 h vs 8 days. Shorter t₁/₂ → decays faster, less cumulative dose to patient during the imaging period.',
          B: 'True — gamma only (no alpha or beta) is preferred for diagnostic imaging. Gamma photons exit the body and are detected by the gamma camera; beta/alpha particles deposit dose locally.',
          D: 'True — the short half-life means the radiotracer becomes negligible quickly after imaging, reducing long-term exposure.',
        },
        teachingPoint: 'Ideal radiotracer properties: (1) gamma only (detected externally, minimal tissue dose); (2) short half-life (decays quickly after imaging); (3) short physical and biological half-life. Tc-99m: pure gamma emitter (no beta/alpha), t₁/₂ = 6 h. ¹³¹I: beta + gamma emitter, t₁/₂ = 8 days → therapeutic (ablative) use, not preferred for pure diagnosis.',
        relatedTopics: ['Tc-99m', 'radiotracer', 'gamma emission', 'nuclear medicine', 'diagnostic imaging'],
      },
    ],
  },
]
