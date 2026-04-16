import type { SupabaseClient } from '@supabase/supabase-js'

// ── Static demo question data ────────────────────────────────────────────────
// 20 Biology MCQs. The demo "user" answers 17 correctly (85%).
// Incorrect demo answers are on questions at index 6, 9, 12 (0-based).

interface DemoQuestion {
  question_text: string
  options: [string, string, string, string]
  correct_answer: string
  explanation_correct: string
  explanation_incorrect: Record<string, string>
  // Index of the option the demo "user" chose (0-based). Null = chose correct.
  demo_wrong_choice_index?: number
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  // ── Q1 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which of the following best describes the fluid mosaic model of the cell membrane?',
    options: [
      'A rigid bilayer of phospholipids with proteins permanently fixed in place',
      'A phospholipid bilayer with laterally mobile proteins forming a dynamic mosaic',
      'A monolayer of cholesterol molecules with peripheral proteins attached',
      'A static protein matrix embedded in a cholesterol scaffold',
    ],
    correct_answer:
      'A phospholipid bilayer with laterally mobile proteins forming a dynamic mosaic',
    explanation_correct:
      'The fluid mosaic model (Singer & Nicolson, 1972) describes the membrane as a phospholipid bilayer in which membrane proteins float and move laterally, producing a dynamic, mosaic-like organisation rather than a fixed structure.',
    explanation_incorrect: {
      A: 'Fixed protein positions describe the outdated "unit membrane" model; the fluid mosaic model specifically emphasises lateral mobility of both lipids and proteins.',
      C: 'Cholesterol modulates membrane fluidity in animal cells but is not the primary structural component; phospholipids form the bilayer backbone.',
      D: 'The membrane is fluid and dynamic, not static; proteins are embedded in or associated with the phospholipid bilayer, not a cholesterol scaffold.',
    },
  },
  // ── Q2 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'During DNA replication, which enzyme synthesises the new DNA strand by adding nucleotides in the 5′→3′ direction?',
    options: ['DNA ligase', 'DNA helicase', 'DNA polymerase III', 'Primase'],
    correct_answer: 'DNA polymerase III',
    explanation_correct:
      'DNA polymerase III is the main replicative polymerase in prokaryotes; it extends a primer by adding deoxyribonucleotides to the free 3′-OH group, always synthesising in the 5′→3′ direction.',
    explanation_incorrect: {
      A: 'DNA ligase seals nicks between adjacent Okazaki fragments by catalysing phosphodiester bond formation; it does not synthesise new strands.',
      B: 'DNA helicase unwinds and separates the double helix at the replication fork by breaking hydrogen bonds; it lacks polymerase activity.',
      D: 'Primase synthesises short RNA primers (~10 nt) to provide the free 3′-OH required by DNA polymerase; it does not synthesise the bulk of the new DNA strand.',
    },
  },
  // ── Q3 ──────────────────────────────────────────────────────────────────
  {
    question_text: 'On a Michaelis-Menten curve, the Km value represents:',
    options: [
      'The maximum reaction velocity when all active sites are saturated',
      'The substrate concentration at which reaction velocity equals ½Vmax',
      'The number of substrate molecules an enzyme processes per second',
      'The free energy change of the reaction',
    ],
    correct_answer:
      'The substrate concentration at which reaction velocity equals ½Vmax',
    explanation_correct:
      'Km (Michaelis constant) is defined as the [S] at which v = Vmax/2; a low Km indicates high substrate affinity, while a high Km indicates low affinity.',
    explanation_incorrect: {
      A: 'This describes Vmax — the maximum rate achieved when every enzyme active site is occupied; Vmax is a different kinetic parameter from Km.',
      C: 'This describes the turnover number (kcat), a measure of catalytic efficiency; Km relates to substrate concentration, not reaction count.',
      D: 'Free energy change (ΔG) is a thermodynamic property; Km is a kinetic constant and is unrelated to the energetics of the overall reaction.',
    },
  },
  // ── Q4 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'During which phase of mitosis do sister chromatids separate and move to opposite poles of the cell?',
    options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    correct_answer: 'Anaphase',
    explanation_correct:
      'Anaphase begins when separase cleaves cohesin, releasing sister chromatids; shortening kinetochore microtubules pull each chromatid to opposite poles, ensuring each daughter cell receives one copy of every chromosome.',
    explanation_incorrect: {
      A: 'Prophase is when chromosomes condense and the spindle begins to form; chromatids are still joined and have not yet aligned or separated.',
      B: 'In metaphase, chromosomes are aligned at the metaphase plate by balanced spindle tension; sister chromatids are still held together by cohesin.',
      D: 'Telophase follows separation — nuclear envelopes reform around the two chromosome sets; chromatid separation is already complete by the time telophase begins.',
    },
  },
  // ── Q5 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'In a monohybrid cross between two heterozygous individuals (Aa × Aa), what is the expected phenotypic ratio in the offspring?',
    options: ['1 : 1', '3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'],
    correct_answer: '3 : 1',
    explanation_correct:
      'The cross yields offspring in a 1 AA : 2 Aa : 1 aa genotypic ratio; because A is completely dominant, both AA and Aa display the dominant phenotype, giving a 3 dominant : 1 recessive phenotypic ratio.',
    explanation_incorrect: {
      A: 'A 1:1 phenotypic ratio is produced by a testcross (Aa × aa), not two heterozygotes; it reflects equal probability of transmitting A or a from the heterozygous parent.',
      C: 'The 1:2:1 describes the genotypic (not phenotypic) outcome of Aa × Aa; when A is completely dominant, the AA and Aa genotypes are phenotypically identical.',
      D: 'A 9:3:3:1 ratio results from a dihybrid cross (AaBb × AaBb) involving two independently assorting loci; a monohybrid cross involves only one gene.',
    },
  },
  // ── Q6 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which metabolic process produces the greatest number of ATP molecules per glucose molecule?',
    options: [
      'Glycolysis',
      'The citric acid cycle',
      'The electron transport chain and oxidative phosphorylation',
      'Fermentation',
    ],
    correct_answer: 'The electron transport chain and oxidative phosphorylation',
    explanation_correct:
      'Oxidative phosphorylation generates ~32–34 ATP per glucose by using the proton gradient established by the ETC across the inner mitochondrial membrane to drive ATP synthase — far exceeding any other stage of cellular respiration.',
    explanation_incorrect: {
      A: 'Glycolysis yields only 2 net ATP per glucose via substrate-level phosphorylation in the cytoplasm; it is the least efficient ATP-producing stage.',
      B: 'The citric acid cycle produces 2 ATP (GTP) per glucose directly; its primary output is NADH and FADH₂, which fuel the ETC rather than producing ATP directly.',
      D: 'Fermentation regenerates NAD⁺ to sustain glycolysis under anaerobic conditions but produces no additional ATP beyond the 2 from glycolysis, making it the least energy-efficient option.',
    },
  },
  // ── Q7 — WRONG in demo (demo picks index 0 = A) ─────────────────────────
  {
    question_text:
      'Which of the following correctly describes a primary producer in an ecosystem?',
    options: [
      'An organism that obtains energy by consuming other organisms',
      'An organism that decomposes dead organic matter',
      'An organism that obtains energy by consuming primary producers',
      'An organism that converts solar or chemical energy into organic compounds',
    ],
    correct_answer:
      'An organism that converts solar or chemical energy into organic compounds',
    demo_wrong_choice_index: 0, // user picks "An organism that obtains energy by consuming other organisms"
    explanation_correct:
      'Primary producers (autotrophs) form the base of food webs by using photosynthesis or chemosynthesis to convert inorganic energy into organic compounds, making energy available to all higher trophic levels.',
    explanation_incorrect: {
      A: 'This describes a heterotroph (consumer); consumers obtain energy by ingesting other organisms and occupy higher trophic levels than producers.',
      B: 'This describes a decomposer (saprotroph), such as fungi or bacteria; they break down dead organic matter and recycle nutrients but do not fix new energy into the system.',
      C: 'This describes a primary consumer (herbivore), which feeds on producers; organisms at this trophic level obtain energy from producers rather than creating it.',
    },
  },
  // ── Q8 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which organelle is primarily responsible for modifying, sorting, and packaging proteins for secretion or delivery to other organelles?',
    options: [
      'Smooth endoplasmic reticulum',
      'Mitochondria',
      'Golgi apparatus',
      'Lysosome',
    ],
    correct_answer: 'Golgi apparatus',
    explanation_correct:
      'The Golgi apparatus receives proteins from the rough ER in cis-cisternae, modifies them (e.g., glycosylation, phosphorylation), sorts them, and packages them into transport vesicles directed to the plasma membrane, lysosomes, or secretion.',
    explanation_incorrect: {
      A: 'The smooth ER synthesises lipids, metabolises carbohydrates, and detoxifies drugs; it does not receive and sort secretory proteins from the rough ER.',
      B: 'Mitochondria perform oxidative phosphorylation and ATP synthesis; they do not participate in the secretory pathway for cytoplasmic or membrane proteins.',
      D: 'Lysosomes receive hydrolytic enzymes packaged by the Golgi; they are the destination of some Golgi-derived vesicles, not the sorting organelle itself.',
    },
  },
  // ── Q9 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'A point mutation changes a codon from AAA (Lys) to AAG (Lys). This mutation is best classified as:',
    options: [
      'A missense mutation',
      'A nonsense mutation',
      'A frameshift mutation',
      'A silent mutation',
    ],
    correct_answer: 'A silent mutation',
    explanation_correct:
      'Both AAA and AAG encode lysine; a base substitution that does not change the amino acid sequence is a silent (synonymous) mutation, leaving protein function unaltered due to codon degeneracy.',
    explanation_incorrect: {
      A: 'A missense mutation changes a codon to one encoding a different amino acid (e.g., sickle-cell: GAG→GTG, Glu→Val); here the amino acid identity is preserved.',
      B: 'A nonsense mutation converts a sense codon into a stop codon (UAA, UAG, or UGA), prematurely terminating translation; AAG still encodes lysine, not a stop signal.',
      C: 'A frameshift mutation results from an insertion or deletion of nucleotides (not a substitution), shifting the triplet reading frame and altering all downstream codons.',
    },
  },
  // ── Q10 — WRONG in demo (demo picks index 0 = A) ────────────────────────
  {
    question_text:
      'Which of the following correctly describes the role of transfer RNA (tRNA) during translation?',
    options: [
      'It carries the genetic code from the nucleus to the ribosome',
      'It catalyses peptide bond formation between adjacent amino acids',
      'It delivers specific amino acids to the ribosome, matching mRNA codons via its anticodon',
      'It forms the structural scaffold of the ribosomal subunits',
    ],
    correct_answer:
      'It delivers specific amino acids to the ribosome, matching mRNA codons via its anticodon',
    demo_wrong_choice_index: 0, // user picks "It carries the genetic code from the nucleus to the ribosome"
    explanation_correct:
      'Each tRNA is aminoacylated with a specific amino acid and contains an anticodon loop that base-pairs with the complementary mRNA codon at the ribosomal A-site, ensuring the correct amino acid is incorporated into the growing polypeptide.',
    explanation_incorrect: {
      A: 'This describes mRNA (messenger RNA), which carries the transcribed genetic code from the nucleus to cytoplasmic ribosomes; tRNA is an adapter molecule that carries amino acids.',
      B: 'Peptide bond formation is catalysed by the peptidyl transferase activity of the large subunit rRNA (a ribozyme); tRNA is a substrate that positions amino acids, not a catalyst.',
      D: 'Ribosomal RNA (rRNA) combined with ribosomal proteins forms the structural and catalytic core of ribosomes; tRNA transiently occupies the A, P, and E sites but is not part of the ribosome structure.',
    },
  },
  // ── Q11 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'In the light-dependent reactions of photosynthesis, what is the primary role of water (H₂O)?',
    options: [
      'It serves as the final electron acceptor in the photosynthetic electron transport chain',
      'It provides electrons to replace those lost from Photosystem II after photoexcitation',
      'It combines directly with CO₂ to form glucose in the thylakoid',
      'It directly activates ATP synthase in the thylakoid membrane',
    ],
    correct_answer:
      'It provides electrons to replace those lost from Photosystem II after photoexcitation',
    explanation_correct:
      'Water is oxidised by the oxygen-evolving complex (OEC) of Photosystem II, releasing electrons to replenish those ejected from P680 by light energy, along with H⁺ ions that contribute to the proton gradient and O₂ as a byproduct.',
    explanation_incorrect: {
      A: 'NADP⁺ is the final electron acceptor in the photosynthetic ETC, accepting electrons to form NADPH; water is an electron donor, not an acceptor.',
      C: 'Glucose synthesis from CO₂ occurs during the Calvin cycle (light-independent reactions) via the enzyme RuBisCO; water does not directly combine with CO₂ in the thylakoid.',
      D: 'ATP synthase is driven by the proton gradient (chemiosmosis) generated by the ETC; water contributes H⁺ ions to this gradient but does not directly activate the enzyme.',
    },
  },
  // ── Q12 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which cell cycle checkpoint verifies that DNA replication is complete and damage-free before the cell enters mitosis?',
    options: [
      'G1/S checkpoint',
      'G2/M checkpoint',
      'Spindle assembly checkpoint',
      'Restriction point',
    ],
    correct_answer: 'G2/M checkpoint',
    explanation_correct:
      'The G2/M checkpoint uses ATM/ATR kinase signalling to confirm complete, error-free DNA replication; if damage or incomplete replication is detected, CDK1–cyclin B activation is suppressed and mitotic entry is blocked until repair is complete.',
    explanation_incorrect: {
      A: 'The G1/S checkpoint (restriction point) evaluates cell size, nutrient availability, and mitogenic signals before committing to S phase; it does not check DNA replication completion.',
      C: 'The spindle assembly checkpoint (SAC) monitors proper kinetochore–microtubule attachment during metaphase to prevent premature anaphase; it acts within mitosis, not at G2/M.',
      D: 'The restriction point is another name for the G1/S checkpoint; it controls entry into S phase, not verification of completed replication before mitosis.',
    },
  },
  // ── Q13 — WRONG in demo (demo picks index 0 = A) ────────────────────────
  {
    question_text:
      'Crossing over (homologous recombination) during meiosis occurs primarily during which stage?',
    options: [
      'Metaphase I',
      'Anaphase II',
      'Prophase I',
      'Telophase II',
    ],
    correct_answer: 'Prophase I',
    demo_wrong_choice_index: 0, // user picks "Metaphase I"
    explanation_correct:
      'Crossing over occurs during prophase I — specifically at the pachytene substage — when homologous chromosomes are paired along their lengths by the synaptonemal complex and non-sister chromatids exchange segments at chiasmata.',
    explanation_incorrect: {
      A: 'In metaphase I, paired homologues align at the metaphase plate but crossing over has already been completed; only attachment and alignment occur at this stage.',
      B: 'Anaphase II involves separation of sister chromatids; the synaptonemal complex has long since disassembled, making recombination impossible at this point.',
      D: 'Telophase II is the final meiotic stage, during which haploid nuclei reform; genetic recombination cannot occur after prophase I.',
    },
  },
  // ── Q14 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which of the following correctly explains why ATP hydrolysis releases energy?',
    options: [
      'The reaction creates a new high-energy bond between AMP and inorganic phosphate',
      'ATP is a large molecule that releases energy simply by decomposing into smaller fragments',
      'The phosphoanhydride bonds are strained by electrostatic repulsion, and the products are stabilised by resonance and solvation',
      'ATP hydrolysis is endothermic, absorbing heat that is later used to drive cellular work',
    ],
    correct_answer:
      'The phosphoanhydride bonds are strained by electrostatic repulsion, and the products are stabilised by resonance and solvation',
    explanation_correct:
      'The adjacent negatively charged phosphate groups in ATP experience electrostatic repulsion; upon hydrolysis, ADP and Pi are stabilised by resonance delocalisation and increased hydration, making the reaction exergonic (ΔG ≈ −30.5 kJ/mol under standard conditions).',
    explanation_incorrect: {
      A: 'Hydrolysis breaks (not creates) the phosphoanhydride bond between β- and γ-phosphates; the products ADP and Pi are more stable, not higher in energy, than ATP.',
      B: 'Molecular size does not determine thermodynamic favourability; it is the difference in free energy between reactants and products that determines whether a reaction releases or consumes energy.',
      D: 'ATP hydrolysis is exergonic — it releases free energy and can drive endergonic reactions; calling it endothermic confuses the direction of energy flow.',
    },
  },
  // ── Q15 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which of the following is a necessary condition for natural selection to occur in a population?',
    options: [
      'Individuals must be capable of sexual reproduction',
      'The population must be geographically isolated from other populations',
      'Heritable variation in traits must exist, and variants must differ in reproductive success',
      'Mutations must occur at a constant rate across all generations',
    ],
    correct_answer:
      'Heritable variation in traits must exist, and variants must differ in reproductive success',
    explanation_correct:
      'Natural selection requires three conditions: (1) variation in heritable traits, (2) that some variants confer greater reproductive success (differential fitness), and (3) that the advantageous traits are passed to offspring — leading to allele frequency shifts over generations.',
    explanation_incorrect: {
      A: 'Many organisms (bacteria, some plants) reproduce asexually yet undergo natural selection; sexual reproduction increases genetic variation but is not a prerequisite for selection.',
      B: 'Geographic isolation promotes allopatric speciation but is not required for natural selection; selection acts on any population with heritable variation and differential fitness, regardless of geography.',
      D: 'Mutation generates variation but need not occur at a constant rate for selection to operate; selection acts on existing heritable variation regardless of how or when it arose.',
    },
  },
  // ── Q16 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which of the following transport processes requires ATP and moves substances against their concentration gradient?',
    options: [
      'Facilitated diffusion',
      'Osmosis',
      'Simple diffusion',
      'Primary active transport',
    ],
    correct_answer: 'Primary active transport',
    explanation_correct:
      'Primary active transport (e.g., the Na⁺/K⁺-ATPase) directly couples ATP hydrolysis to the movement of ions against their electrochemical gradient, maintaining the concentration differences essential for membrane potential and cellular function.',
    explanation_incorrect: {
      A: 'Facilitated diffusion uses channel or carrier proteins to move substances down their concentration gradient; no ATP is consumed.',
      B: 'Osmosis is the passive movement of water across a semipermeable membrane down its water potential gradient; it requires no energy input.',
      C: 'Simple diffusion is the unmediated movement of small, nonpolar molecules down their concentration gradient across the lipid bilayer; it is entirely passive and ATP-independent.',
    },
  },
  // ── Q17 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Before export from the nucleus, eukaryotic pre-mRNA undergoes which set of processing modifications?',
    options: [
      'Translation of introns before their removal by splicing',
      'Conversion of uracil to thymine to produce a DNA-like coding strand',
      '5′ capping, 3′ polyadenylation, and splicing out of introns',
      'Methylation of the coding sequence to enhance ribosome binding',
    ],
    correct_answer: '5′ capping, 3′ polyadenylation, and splicing out of introns',
    explanation_correct:
      '5′ capping (7-methylguanosine) protects the transcript and promotes translation initiation; poly-A tailing stabilises the mRNA and aids nuclear export; and spliceosome-mediated splicing removes introns so only exon-encoded sequences are translated.',
    explanation_incorrect: {
      A: 'Introns are never translated; the spliceosome removes them before the mRNA leaves the nucleus, preventing aberrant protein production from non-coding sequences.',
      B: 'RNA contains uracil (U) rather than thymine (T), and no cellular mechanism converts U to T in mRNA; thymine is a DNA-specific base.',
      D: 'Methylation of the pre-mRNA coding sequence is not a standard nuclear processing step; DNA promoter methylation regulates gene expression at the transcriptional level, which is distinct from mRNA maturation.',
    },
  },
  // ── Q18 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'A competitive inhibitor reduces enzyme activity by:',
    options: [
      'Irreversibly destroying the enzyme\'s active site',
      'Reversibly binding the active site and competing directly with the substrate',
      'Binding an allosteric site and inducing a conformational change in the active site',
      'Raising the activation energy of the reaction beyond what the substrate can supply',
    ],
    correct_answer:
      'Reversibly binding the active site and competing directly with the substrate',
    explanation_correct:
      'Competitive inhibitors structurally mimic the substrate and bind reversibly to the active site; the inhibition is overcome by increasing substrate concentration, resulting in an increased apparent Km with an unchanged Vmax.',
    explanation_incorrect: {
      A: 'Irreversible active-site destruction describes irreversible inhibition (e.g., aspirin acetylating COX-1); competitive inhibition is by definition reversible and concentration-dependent.',
      C: 'Allosteric binding with conformational change describes non-competitive (or mixed) inhibition; the defining feature of competitive inhibition is occupation of the active site, not an allosteric site.',
      D: 'Inhibitors do not work by raising activation energy "beyond the substrate\'s capacity"; enzymes lower activation energy, and inhibitors modulate access to or catalytic geometry of the active site.',
    },
  },
  // ── Q19 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'In the carbon cycle, which process is primarily responsible for returning CO₂ from living organisms to the atmosphere?',
    options: [
      'Nitrogen fixation',
      'Denitrification',
      'Cellular respiration',
      'Transpiration',
    ],
    correct_answer: 'Cellular respiration',
    explanation_correct:
      'Cellular respiration in all aerobic organisms oxidises organic carbon compounds to CO₂ and H₂O, returning carbon to the atmospheric pool and completing the biological side of the carbon cycle.',
    explanation_incorrect: {
      A: 'Nitrogen fixation converts atmospheric N₂ into bioavailable ammonia (NH₃); it is part of the nitrogen cycle and does not involve CO₂ exchange.',
      B: 'Denitrification reduces nitrate (NO₃⁻) back to N₂ gas; it is also a nitrogen cycle process and has no direct effect on atmospheric CO₂ levels.',
      D: 'Transpiration is the evaporative loss of water vapour through plant stomata; it belongs to the water cycle and releases H₂O, not CO₂.',
    },
  },
  // ── Q20 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'The resting membrane potential of a typical neuron (approximately −70 mV) is primarily maintained by:',
    options: [
      'Continuous influx of Na⁺ through voltage-gated sodium channels',
      'High intracellular K⁺ concentration maintained by Na⁺/K⁺-ATPase and K⁺ leak channels',
      'Equal concentrations of Na⁺ and K⁺ on both sides of the membrane',
      'Active pumping of Cl⁻ ions out of the cell',
    ],
    correct_answer:
      'High intracellular K⁺ concentration maintained by Na⁺/K⁺-ATPase and K⁺ leak channels',
    explanation_correct:
      'The Na⁺/K⁺-ATPase continuously pumps 3 Na⁺ out and 2 K⁺ in (using ATP), maintaining a high intracellular K⁺ concentration; K⁺ then leaks out through open K⁺ channels down its concentration gradient, leaving net negative charge inside and establishing the ~−70 mV resting potential.',
    explanation_incorrect: {
      A: 'Voltage-gated Na⁺ channels are closed at rest and open only during depolarisation; resting potential is set by leak channels (primarily K⁺), not voltage-gated Na⁺ influx.',
      C: 'Na⁺ and K⁺ are asymmetrically distributed (high extracellular Na⁺, high intracellular K⁺); equal concentrations would eliminate the electrochemical gradients essential for action potential generation.',
      D: 'While Cl⁻ distribution contributes to resting potential in some neurons, the dominant mechanism is K⁺ efflux through leak channels combined with Na⁺/K⁺-ATPase activity, not active Cl⁻ extrusion.',
    },
  },
]

// ── Seed function ────────────────────────────────────────────────────────────

/**
 * Creates a fully populated demo exam for a brand new user.
 * Inserts: 1 exam, 20 questions (with explanations), 1 completed attempt, 20 responses.
 * Score: 17/20 = 85%.
 * Safe to call multiple times — the caller should guard with user_metadata.demo_created.
 */
export async function seedDemoExam(
  userId: string,
  // Accept any Supabase admin client (avoids importing the factory here)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: SupabaseClient<any>,
): Promise<void> {
  console.log('[demo] seeding demo exam for user', userId)

  // ── 1. Create the exam row ─────────────────────────────────────────────
  const { data: exam, error: examError } = await admin
    .from('exams')
    .insert({
      user_id: userId,
      title: 'Biology Demo Exam',
      subject: 'Biology',
      exam_date: '2026-03-15',
      unlock_date: '2026-03-08',
      unlock_days_before: 7,
      status: 'completed', // shows "View results" on dashboard immediately
    })
    .select('id')
    .single()

  if (examError || !exam) {
    console.error('[demo] failed to create exam row:', examError)
    return
  }

  // ── 2. Create question rows ────────────────────────────────────────────
  const questionRows = DEMO_QUESTIONS.map((q, i) => ({
    exam_id: exam.id,
    question_text: q.question_text,
    question_type: 'multiple_choice',
    options: q.options,
    correct_answer: q.correct_answer,
    marks: 1,
    order: i + 1,
    explanation_correct: q.explanation_correct,
    explanation_incorrect: q.explanation_incorrect,
  }))

  // Try with explanation columns; fall back if migration not yet run
  let { error: questionsError } = await admin.from('questions').insert(questionRows)

  if (
    questionsError &&
    (questionsError.message?.includes('explanation_correct') ||
      questionsError.message?.includes('explanation_incorrect'))
  ) {
    const rowsWithoutExp = DEMO_QUESTIONS.map((q, i) => ({
      exam_id: exam.id,
      question_text: q.question_text,
      question_type: 'multiple_choice',
      options: q.options,
      correct_answer: q.correct_answer,
      marks: 1,
      order: i + 1,
    }))
    const { error: retryError } = await admin.from('questions').insert(rowsWithoutExp)
    questionsError = retryError ?? null
  }

  if (questionsError) {
    console.error('[demo] failed to insert questions:', questionsError)
    // Clean up exam row so the user isn't left with an empty demo
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // Fetch the inserted questions to get their auto-generated IDs
  const { data: insertedQuestions, error: fetchError } = await admin
    .from('questions')
    .select('id, "order", correct_answer, options')
    .eq('exam_id', exam.id)
    .order('order', { ascending: true })

  if (fetchError || !insertedQuestions || insertedQuestions.length === 0) {
    console.error('[demo] failed to fetch inserted questions:', fetchError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // ── 3. Create the completed attempt ───────────────────────────────────
  // 17 correct out of 20 = 85%
  const { data: attempt, error: attemptError } = await admin
    .from('exam_attempts')
    .insert({
      exam_id: exam.id,
      user_id: userId,
      status: 'completed',
      score: 17,
      total_marks: 20,
      percentage: 85,
      submitted_at: '2026-03-15T10:30:00.000Z',
      ai_feedback: {
        what_went_well:
          'You demonstrated solid understanding of cell biology fundamentals, enzyme kinetics, and core genetics. Your answers on ATP hydrolysis, active transport mechanisms, gene expression processing, and the cell cycle checkpoints were accurate and well-reasoned.',
        what_to_review:
          'Focus on the distinct roles of tRNA versus mRNA in translation — these are frequently confused. Also revisit the precise stages of meiosis, particularly the timing of crossing over relative to metaphase I, and the definition of primary producers versus consumers.',
        mistake_pattern:
          'Your errors suggest occasional mix-ups between the timing and molecular actors in sequential biological processes (e.g., which molecules carry which information in translation, which meiotic stage hosts recombination, and how trophic roles are defined). Building a clear process-by-process timeline for each pathway should resolve this pattern.',
      },
    })
    .select('id')
    .single()

  if (attemptError || !attempt) {
    console.error('[demo] failed to create attempt:', attemptError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // ── 4. Create response rows (17 correct, 3 wrong) ─────────────────────
  // Questions at 0-based index 6, 9, 12 have demo_wrong_choice_index set
  const wrongIndexSet = new Set(
    DEMO_QUESTIONS.map((q, i) =>
      q.demo_wrong_choice_index !== undefined ? i : -1,
    ).filter((i) => i >= 0),
  )

  const responseRows = insertedQuestions.map((q, idx) => {
    const demoQ = DEMO_QUESTIONS[idx]
    const isWrong = wrongIndexSet.has(idx)
    let selectedAnswer: string
    let isCorrect: boolean

    if (isWrong && demoQ?.demo_wrong_choice_index !== undefined) {
      selectedAnswer = (q.options as string[])[demoQ.demo_wrong_choice_index]
      isCorrect = selectedAnswer === q.correct_answer // will be false
    } else {
      selectedAnswer = q.correct_answer
      isCorrect = true
    }

    return {
      attempt_id: attempt.id,
      question_id: q.id,
      selected_answer: selectedAnswer,
      is_correct: isCorrect,
      marks_awarded: isCorrect ? 1 : 0,
    }
  })

  const { error: responsesError } = await admin
    .from('exam_responses')
    .insert(responseRows)

  if (responsesError) {
    console.error('[demo] failed to insert responses:', responsesError)
    // Attempt and exam exist but without responses — results page would show 0
    // responses; clean everything up
    await admin.from('exam_attempts').delete().eq('id', attempt.id)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  console.log('[demo] demo exam seeded successfully — exam id:', exam.id)
}
