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

// ── Physics group demo question data ────────────────────────────────────────
// 20 Physics MCQs. The new user answers 16 correctly (80%).
// Wrong answers are at indices 3, 7, 11, 15 (0-based) — all pick option A (index 0).

const DEMO_GROUP_QUESTIONS: DemoQuestion[] = [
  // ── Q1 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'A net force of 20 N acts on a 4 kg object. What is the magnitude of the resulting acceleration?',
    options: ['0.2 m/s²', '5 m/s²', '80 m/s²', '16 m/s²'],
    correct_answer: '5 m/s²',
    explanation_correct:
      "Newton's second law states F = ma. Rearranging: a = F/m = 20 N ÷ 4 kg = 5 m/s². The direction of acceleration is the same as the direction of the net force.",
    explanation_incorrect: {
      A: 'Dividing the mass by the force (4 ÷ 20 = 0.2) inverts the relationship; the correct operation is a = F/m, not a = m/F.',
      C: 'Multiplying force by mass (20 × 4 = 80) applies the formula in the wrong direction; Newton\'s second law requires dividing force by mass.',
      D: 'The value 16 results from subtracting (20 − 4), which has no basis in Newton\'s second law; the correct relationship is F = ma.',
    },
  },
  // ── Q2 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'An object of mass 2 kg is moving at 6 m/s. What is its kinetic energy?',
    options: ['6 J', '12 J', '36 J', '72 J'],
    correct_answer: '36 J',
    explanation_correct:
      'Kinetic energy is given by KE = ½mv². Here, KE = ½ × 2 kg × (6 m/s)² = ½ × 2 × 36 = 36 J. Note that velocity is squared, so even a modest speed contributes significantly.',
    explanation_incorrect: {
      A: 'The value 6 J results from using KE = ½mv (without squaring v), giving ½ × 2 × 6 = 6; velocity must be squared in the kinetic energy formula.',
      B: 'The value 12 J comes from KE = mv (omitting the ½ and not squaring v), giving 2 × 6 = 12; both the ½ factor and the v² term are essential.',
      D: 'The value 72 J results from KE = mv², omitting the ½ factor; the correct formula is KE = ½mv², not mv².',
    },
  },
  // ── Q3 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'Which quantity does NOT directly affect the magnitude of the electrostatic force between two point charges, according to Coulomb\'s law?',
    options: [
      'The magnitudes of the charges',
      'The separation distance between the charges',
      'The permittivity of the medium between the charges',
      'The velocities of the charges',
    ],
    correct_answer: 'The velocities of the charges',
    explanation_correct:
      "Coulomb's law states F = kq₁q₂/r². The force depends on charge magnitudes (q₁, q₂), separation (r), and the medium's permittivity (which modifies k). The velocities of charges do not appear in Coulomb's law; velocity matters for magnetic forces, not electrostatic ones.",
    explanation_incorrect: {
      A: "Charge magnitudes appear directly in Coulomb's formula as q₁ and q₂; doubling either charge doubles the force.",
      B: "Separation distance appears as r² in the denominator; the force follows an inverse-square law, so halving the distance quadruples the force.",
      C: "The permittivity ε of the medium appears in the denominator as part of Coulomb's constant (k = 1/(4πε)); a higher permittivity reduces the force.",
    },
  },
  // ── Q4 — WRONG in demo (user picks index 0 = A) ─────────────────────────
  {
    question_text:
      'A ray of light travels from water (refractive index n = 1.33) into glass (refractive index n = 1.50). Compared with its direction in water, the refracted ray in glass is:',
    options: [
      'Bent away from the normal',
      'Undeviated — it continues in the same direction',
      'Totally internally reflected back into the water',
      'Bent towards the normal',
    ],
    correct_answer: 'Bent towards the normal',
    demo_wrong_choice_index: 0,
    explanation_correct:
      "Snell's law states n₁ sin θ₁ = n₂ sin θ₂. When light passes into a medium with a higher refractive index (n₂ > n₁), sin θ₂ < sin θ₁, so the refracted angle is smaller — the ray bends towards the normal. Going from water (1.33) into denser glass (1.50) always bends the ray towards the normal.",
    explanation_incorrect: {
      A: "Bending away from the normal occurs when light enters a less dense medium (lower n). Here n₂ > n₁, so the opposite occurs — the ray slows down and bends towards the normal.",
      B: "The ray is only undeviated at normal incidence (θ₁ = 0°), or if both media have the same refractive index; the change from n = 1.33 to n = 1.50 will cause refraction.",
      C: "Total internal reflection can only occur when light travels from a denser medium into a less dense medium (n₁ > n₂) and the angle exceeds the critical angle; here the light is going from less dense to more dense (water → glass), so TIR is impossible.",
    },
  },
  // ── Q5 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'A 10 Ω resistor is connected directly across a 5 V battery. What current flows through the resistor?',
    options: ['2 A', '50 A', '0.5 A', '0.1 A'],
    correct_answer: '0.5 A',
    explanation_correct:
      "Ohm's law states V = IR, so I = V/R = 5 V ÷ 10 Ω = 0.5 A. Current flows from the positive terminal through the resistor and back to the negative terminal.",
    explanation_incorrect: {
      A: "The value 2 A results from computing R/V = 10/5 = 2, which inverts the correct relationship I = V/R.",
      B: "The value 50 A results from multiplying (V × R = 5 × 10 = 50) instead of dividing; this would require an enormous voltage for such a small resistance.",
      D: "The value 0.1 A results from computing V/R² = 5/100 = 0.05, or some other incorrect operation; the straightforward application of I = V/R gives 0.5 A.",
    },
  },
  // ── Q6 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'A proton moves horizontally to the right in a uniform magnetic field directed vertically upward. Using the right-hand rule, the magnetic force on the proton is directed:',
    options: [
      'Vertically upward (parallel to B)',
      'Horizontally to the right (parallel to v)',
      'Into the page',
      'Out of the page',
    ],
    correct_answer: 'Out of the page',
    explanation_correct:
      'The magnetic force on a positive charge is F = qv × B. With v pointing right (+x) and B pointing up (+y), the cross product v × B = x̂ × ŷ = ẑ, which is out of the page (+z). The proton therefore curves out of the page.',
    explanation_incorrect: {
      A: 'The magnetic force is always perpendicular to both v and B; a force parallel to B would do no work and cannot curve the particle as observed in cyclotrons and mass spectrometers.',
      B: 'A force parallel to v would accelerate the particle along its path without curving it; magnetic forces never have a component along the velocity vector.',
      C: 'The cross product v × B for rightward velocity and upward field gives +z (out of page), not −z (into page); into-the-page would require either a negative charge or reversed field/velocity directions.',
    },
  },
  // ── Q7 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'In the photoelectric effect, the incident light frequency is held constant above the threshold frequency, but the intensity is doubled. What is the effect on the emitted photoelectrons?',
    options: [
      'The maximum kinetic energy of the emitted electrons doubles',
      'The threshold frequency increases',
      'The number of emitted electrons per second approximately doubles',
      'No electrons are emitted because the energy per photon did not change',
    ],
    correct_answer: 'The number of emitted electrons per second approximately doubles',
    explanation_correct:
      'Intensity is proportional to the number of photons per second. Each photon ejects at most one electron, so doubling intensity doubles the photon flux and therefore approximately doubles the emission rate. The maximum kinetic energy (KE_max = hf − φ) depends only on frequency, which is unchanged.',
    explanation_incorrect: {
      A: "Maximum kinetic energy is KE_max = hf − φ (Planck's constant × frequency − work function); it depends solely on frequency, not intensity. Doubling intensity leaves KE_max unchanged.",
      B: 'The threshold frequency is a property of the metal (φ = hf_threshold) and is unaffected by the intensity of the incident light.',
      D: 'Electrons are emitted whenever the photon energy (hf) exceeds the work function, regardless of intensity; intensity controls the number of emitted electrons, not whether emission occurs.',
    },
  },
  // ── Q8 — WRONG in demo (user picks index 0 = A) ─────────────────────────
  {
    question_text:
      'For a mass–spring system undergoing simple harmonic motion, the magnitude of the acceleration is greatest when:',
    options: [
      'The mass passes through the equilibrium position',
      'The velocity of the mass is at its maximum',
      'The kinetic energy of the mass is at its maximum',
      'The displacement of the mass is at its maximum (at the amplitude)',
    ],
    correct_answer: 'The displacement of the mass is at its maximum (at the amplitude)',
    demo_wrong_choice_index: 0,
    explanation_correct:
      "Newton's second law for a spring gives F = −kx, so a = −(k/m)x. The acceleration is proportional to displacement and directed opposite to it. Maximum displacement (x = A, the amplitude) therefore produces maximum restoring force and maximum acceleration. At this point the mass is momentarily stationary.",
    explanation_incorrect: {
      A: 'At the equilibrium position x = 0, so the restoring force F = −kx = 0 and the acceleration is zero; this is the point of maximum velocity and maximum kinetic energy, not maximum acceleration.',
      B: 'Maximum velocity coincides with x = 0 (equilibrium), where the restoring force — and therefore the acceleration — is zero; velocity and acceleration are 90° out of phase in SHM.',
      C: 'Maximum kinetic energy also occurs at x = 0 (all potential energy has been converted to kinetic); at this point the acceleration is zero for the same reason as option A.',
    },
  },
  // ── Q9 ──────────────────────────────────────────────────────────────────
  {
    question_text:
      'Two ice skaters are initially at rest on a frictionless surface. Skater A (60 kg) pushes off Skater B (40 kg) and moves away at 2 m/s. What is the speed of Skater B immediately after the push?',
    options: ['1.5 m/s', '2 m/s', '3 m/s', '0.75 m/s'],
    correct_answer: '3 m/s',
    explanation_correct:
      'By conservation of momentum, the total momentum before and after must be equal. Initially both skaters are at rest, so total momentum = 0. After: p_A + p_B = 0 → 60 × (−2) + 40 × v_B = 0 → v_B = 120/40 = 3 m/s (opposite direction to A).',
    explanation_incorrect: {
      A: "1.5 m/s is obtained by computing (m_B/m_A) × v_A = (40/60) × 2 = 1.33, or by dividing the difference in masses; the correct approach uses conservation of momentum: m_A × v_A = m_B × v_B.",
      B: '2 m/s would mean both skaters have the same speed, implying equal momenta in opposite directions — which requires equal masses; with different masses (60 kg vs 40 kg), their speeds must differ.',
      D: '0.75 m/s results from using m_A × v_A / (m_A + m_B) = 120/100 = 1.2, or a similar incorrect formula; conservation of momentum directly gives m_A × v_A = m_B × v_B.',
    },
  },
  // ── Q10 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'An ideal gas is compressed isothermally so that its volume is halved. What happens to its pressure?',
    options: [
      'The pressure decreases by half',
      'The pressure remains unchanged',
      'The pressure doubles',
      'The pressure quadruples',
    ],
    correct_answer: 'The pressure doubles',
    explanation_correct:
      "Boyle's law states that for a fixed amount of ideal gas at constant temperature, PV = constant. If V is halved (V₂ = V₁/2), then P₂ = P₁V₁/V₂ = P₁ × 2 = 2P₁. Compressing the gas into half the space doubles the frequency of molecular collisions with the walls, doubling the pressure.",
    explanation_incorrect: {
      A: "Pressure decreases when volume increases (the gas expands); here the volume is being reduced, so pressure must increase, not decrease.",
      B: "Pressure remains constant in an isobaric (constant-pressure) process, not an isothermal compression; halving the volume at constant temperature necessarily changes the pressure.",
      D: "Quadrupling would require the volume to be reduced to one-quarter (V₂ = V₁/4); halving the volume only doubles the pressure according to PV = constant.",
    },
  },
  // ── Q11 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'In Young\'s double-slit experiment, bright (constructive interference) fringes form where the path difference between the two waves is:',
    options: [
      'An odd multiple of λ/2 (i.e., λ/2, 3λ/2, 5λ/2, …)',
      'Zero path difference only — no other positions produce bright fringes',
      'A whole-number multiple of the wavelength (i.e., 0, λ, 2λ, 3λ, …)',
      'Exactly λ/4',
    ],
    correct_answer: 'A whole-number multiple of the wavelength (i.e., 0, λ, 2λ, 3λ, …)',
    explanation_correct:
      'Constructive interference occurs when the two waves arrive in phase, meaning their crests and troughs coincide. This happens when the path difference Δ = nλ (n = 0, ±1, ±2, …). At these points the amplitudes add and a bright fringe forms.',
    explanation_incorrect: {
      A: 'Odd multiples of λ/2 (λ/2, 3λ/2, …) are the condition for destructive interference (dark fringes); at these path differences the two waves arrive exactly out of phase and cancel.',
      B: 'The central bright fringe (Δ = 0) is just one of infinitely many bright fringes; all positions where Δ = nλ for integer n produce bright fringes, not just the central maximum.',
      D: 'A path difference of λ/4 results in a phase difference of π/2 (90°), which produces partial constructive interference — neither a bright fringe nor a dark fringe, but an intermediate intensity.',
    },
  },
  // ── Q12 — WRONG in demo (user picks index 0 = A) ────────────────────────
  {
    question_text:
      'According to Faraday\'s law of electromagnetic induction, the magnitude of the induced EMF in a coil is proportional to:',
    options: [
      'The magnitude of the magnetic field through the coil',
      'The square of the number of turns in the coil',
      'The resistance of the coil',
      'The rate of change of magnetic flux through the coil',
    ],
    correct_answer: 'The rate of change of magnetic flux through the coil',
    demo_wrong_choice_index: 0,
    explanation_correct:
      "Faraday's law states |EMF| = N |dΦ/dt|, where N is the number of turns and dΦ/dt is the rate of change of magnetic flux. A static magnetic field (dΦ/dt = 0) induces no EMF regardless of its magnitude; only a changing flux induces a voltage.",
    explanation_incorrect: {
      A: "A constant, unchanging magnetic field induces no EMF, no matter how large it is. EMF is generated only when the flux is changing — this is why AC generators (which constantly change the angle between B and the coil) produce a continuous voltage.",
      B: "The number of turns N appears as a multiplying factor in Faraday's law (EMF = N dΦ/dt), but it is N (linear) not N² (squared) that matters; the EMF is proportional to N, not N².",
      C: "Coil resistance is not part of Faraday's law; resistance determines the current that flows once the EMF is induced (via Ohm's law), but does not affect the magnitude of the induced EMF itself.",
    },
  },
  // ── Q13 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'In alpha (α) decay, by how much does the mass number (nucleon number) of the parent nucleus decrease?',
    options: ['1', '2', '3', '4'],
    correct_answer: '4',
    explanation_correct:
      'An alpha particle is a helium-4 nucleus, ⁴₂He, consisting of 2 protons and 2 neutrons. When a nucleus undergoes alpha decay, it loses 4 nucleons (2 protons + 2 neutrons), so the mass number decreases by 4 and the atomic number decreases by 2.',
    explanation_incorrect: {
      A: 'A decrease of 1 in mass number describes beta-minus decay, where a neutron transforms into a proton and emits an electron and antineutrino; no nucleons are lost, but the atomic number increases by 1.',
      B: 'A decrease of 2 in mass number does not correspond to any standard decay mode; in alpha decay both the proton number and neutron number each decrease by 2, giving a total mass number change of 4.',
      C: 'No standard radioactive decay produces a mass number change of 3; gamma decay changes neither mass number nor atomic number.',
    },
  },
  // ── Q14 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'Two capacitors, each with capacitance 4 μF, are connected in series. What is the total capacitance of the combination?',
    options: ['8 μF', '4 μF', '2 μF', '1 μF'],
    correct_answer: '2 μF',
    explanation_correct:
      'For capacitors in series, 1/C_total = 1/C₁ + 1/C₂ = 1/4 + 1/4 = 2/4 = 1/2, so C_total = 2 μF. Series connection always reduces the total capacitance below the smallest individual value because the electric field spans both gaps.',
    explanation_incorrect: {
      A: '8 μF is the result for capacitors in parallel (C_total = C₁ + C₂ = 4 + 4 = 8 μF), not series; parallel connection increases total capacitance.',
      B: '4 μF would be the capacitance of a single capacitor; combining two in series always gives a smaller total capacitance than either individual value.',
      D: '1 μF would result from a different combination (e.g., four 4 μF capacitors in series: 1/C = 4/4, C = 1 μF); for just two 4 μF capacitors in series, the result is 2 μF.',
    },
  },
  // ── Q15 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'A heat engine operates between a hot reservoir at 600 K and a cold reservoir at 300 K. What is its maximum (Carnot) efficiency?',
    options: ['25%', '33%', '50%', '75%'],
    correct_answer: '50%',
    explanation_correct:
      'The Carnot efficiency is η_Carnot = 1 − T_cold/T_hot = 1 − 300/600 = 1 − 0.5 = 0.50 = 50%. This is the theoretical upper limit for any heat engine operating between these two temperatures; real engines are always less efficient.',
    explanation_incorrect: {
      A: "25% would result from η = T_cold/T_hot = 300/600 = 0.5 × 0.5 = 0.25, but the Carnot formula is η = 1 − T_cold/T_hot, not T_cold/T_hot itself.",
      B: "33% is approximately the efficiency for a hot reservoir at 450 K and cold at 300 K (1 − 300/450 ≈ 0.33); the specific temperatures here give exactly 50%.",
      D: "75% would require T_cold/T_hot = 0.25, meaning T_cold = 150 K for T_hot = 600 K; with T_cold = 300 K the efficiency is 50%, not 75%.",
    },
  },
  // ── Q16 — WRONG in demo (user picks index 0 = A) ────────────────────────
  {
    question_text:
      'A source of sound is moving towards a stationary observer at a speed less than the speed of sound. Compared with the frequency emitted by the source, the frequency detected by the observer is:',
    options: [
      'Lower than the emitted frequency',
      'Identical to the emitted frequency',
      'Higher than the emitted frequency',
      'Dependent on the amplitude of the sound waves, not their frequency',
    ],
    correct_answer: 'Higher than the emitted frequency',
    demo_wrong_choice_index: 0,
    explanation_correct:
      "When a source moves towards an observer, successive wavefronts are compressed — the wavelength in the direction of motion is shortened. The observer encounters wavefronts more frequently than they were emitted, so the observed frequency f' = f × v/(v − v_s) > f. This is the Doppler effect.",
    explanation_incorrect: {
      A: "A lower detected frequency occurs when the source moves away from the observer (or the observer moves away from the source); the wavefronts are stretched, increasing the apparent wavelength and lowering the perceived frequency.",
      B: "The detected frequency equals the emitted frequency only when there is no relative motion between source and observer; any approach or recession causes a Doppler shift.",
      D: "The Doppler effect is a frequency (pitch) phenomenon, not an amplitude (loudness) phenomenon; amplitude determines how loud the sound is, not its pitch.",
    },
  },
  // ── Q17 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'An object moves in a horizontal circle at constant speed. Which statement correctly describes its motion?',
    options: [
      'Both speed and velocity are constant',
      'Velocity is constant but speed continuously changes',
      'Speed is constant but velocity continuously changes direction',
      'Both speed and velocity continuously change',
    ],
    correct_answer: 'Speed is constant but velocity continuously changes direction',
    explanation_correct:
      'Speed is the magnitude of velocity and is constant for uniform circular motion. However, velocity is a vector — its direction continuously changes as the object moves around the circle. Because the velocity direction changes, the object accelerates (centripetal acceleration) even though its speed does not.',
    explanation_incorrect: {
      A: 'Both speed and velocity being constant would describe straight-line motion at constant speed (no force); circular motion requires a centripetal force, which changes the direction of the velocity vector.',
      B: 'Speed changing while velocity stays constant is physically impossible — if speed (the magnitude of v) changes, the velocity vector must also change.',
      D: 'Speed does not change in uniform circular motion by definition ("uniform" means constant speed); only the direction of velocity changes, producing centripetal acceleration.',
    },
  },
  // ── Q18 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'A constant horizontal force of 10 N pushes a 5 kg block 4 m along a smooth (frictionless) horizontal surface. How much work is done by the applied force?',
    options: ['2.5 J', '50 J', '40 J', '200 J'],
    correct_answer: '40 J',
    explanation_correct:
      'Work done by a constant force is W = Fd cos θ. Since the force and displacement are both horizontal (θ = 0°, cos 0° = 1): W = 10 N × 4 m × 1 = 40 J. This equals the gain in kinetic energy of the block (work–energy theorem), since the surface is frictionless.',
    explanation_incorrect: {
      A: '2.5 J results from dividing force by distance (10/4) or dividing by the mass; work is force multiplied by displacement, not divided.',
      B: '50 J comes from multiplying force by mass (10 × 5 = 50) instead of by displacement; work is F × d, and the mass is irrelevant for calculating work done by a single force on a frictionless surface.',
      D: '200 J comes from multiplying all three quantities (F × m × d = 10 × 5 × 4 = 200); the mass does not appear in the formula W = Fd for a constant force along the direction of motion.',
    },
  },
  // ── Q19 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'According to special relativity, a clock on a spacecraft moving at a significant fraction of the speed of light is measured by a stationary Earth observer to run:',
    options: [
      'Faster than a clock on Earth',
      'At the same rate as a clock on Earth',
      'Slower than a clock on Earth',
      'Backwards relative to the Earth clock',
    ],
    correct_answer: 'Slower than a clock on Earth',
    explanation_correct:
      "Time dilation is described by t' = γt₀, where γ = 1/√(1 − v²/c²) ≥ 1. The proper time t₀ measured by the moving clock is always shorter than the coordinate time t' measured by the stationary observer. From Earth, the moving clock appears to run slow — a phenomenon confirmed by experiments with fast-moving particles and GPS satellite corrections.",
    explanation_incorrect: {
      A: 'A clock running faster would mean γ < 1, but since v < c, γ is always ≥ 1; clocks in relative motion always appear to run slow to a stationary observer, never fast.',
      B: 'Clocks running at the same rate would be true only at v = 0 (no relative motion); any non-zero relative velocity causes measurable time dilation.',
      D: 'Clocks do not run backwards in special relativity; time dilation causes slowing, not reversal. Apparent time reversal would violate causality and is not a prediction of relativity.',
    },
  },
  // ── Q20 ─────────────────────────────────────────────────────────────────
  {
    question_text:
      'The de Broglie hypothesis associates a wavelength with a particle of momentum p. Which expression correctly gives this de Broglie wavelength?',
    options: ['λ = p / h', 'λ = h × p', 'λ = h / p', 'λ = p² / h'],
    correct_answer: 'λ = h / p',
    explanation_correct:
      "De Broglie proposed that every particle with momentum p has an associated matter wave of wavelength λ = h/p, where h is Planck's constant (6.626 × 10⁻³⁴ J·s). This was confirmed by electron diffraction experiments. A larger momentum corresponds to a shorter wavelength.",
    explanation_incorrect: {
      A: "λ = p/h inverts the correct formula; this would give a very large wavelength for large momentum, which contradicts observation (fast particles have shorter wavelengths).",
      B: "λ = hp would make the wavelength proportional to momentum, again predicting longer wavelengths for larger momentum — the opposite of what is observed and theoretically expected.",
      D: "λ = p²/h has no physical basis; the de Broglie relation is a simple linear inverse relationship between wavelength and momentum, not a quadratic one.",
    },
  },
]

// ── Helper: create or retrieve a fake demo auth user ────────────────────────
async function createOrGetFakeDemoUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: SupabaseClient<any>,
  email: string,
  displayName: string,
): Promise<string | null> {
  // Attempt to create the user
  const { data: createData, error: createError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: displayName },
  })
  if (!createError) return createData.user.id

  // On duplicate-email error, scan listUsers to find the existing user
  if (
    createError.message?.toLowerCase().includes('already') ||
    createError.message?.toLowerCase().includes('duplicate') ||
    createError.message?.toLowerCase().includes('email')
  ) {
    try {
      // listUsers is paginated; perPage 1000 is generous for a dev/small-prod db
      const { data: listData } = await admin.auth.admin.listUsers({ perPage: 1000 })
      const existing = listData?.users?.find((u: { email?: string }) => u.email === email)
      if (existing) return existing.id
    } catch {
      // list failed — fall through
    }
  }

  console.error(`[demo-group] failed to create/retrieve fake user "${email}":`, createError)
  return null
}

// ── Group demo seed function ─────────────────────────────────────────────────

/**
 * Creates a fully populated Physics group demo exam for a brand new user.
 * Bob is the creator; new user, John, Timothy are shared recipients.
 * Rankings: Bob 90% > John 85% > New User 80% > Timothy 70%.
 * The new user's exam_responses are seeded so their results page works correctly.
 * Safe to call once — the caller should guard with user_metadata.demo_group_created.
 */
export async function seedDemoGroupExam(
  userId: string,
  userEmail: string,
  userName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: SupabaseClient<any>,
): Promise<void> {
  console.log('[demo-group] seeding group demo exam for user', userId)

  // ── DB-level guard: fail-CLOSED — skip if already seeded or on any query error ─
  //
  // Guard A: check via exam_shared_recipients (user is a recipient)
  const { data: existingRecipients, error: guardQueryError } = await admin
    .from('exam_shared_recipients')
    .select('exam_id')
    .eq('email', userEmail)

  // If the query itself failed (network error, Supabase issue, etc.) treat as
  // "don't know" and abort — fail-closed prevents duplicate creation.
  if (guardQueryError) {
    console.error('[demo-group] guard query failed — aborting to prevent duplicate:', guardQueryError)
    return
  }

  if (existingRecipients && existingRecipients.length > 0) {
    const existingIds = existingRecipients.map((r: { exam_id: string }) => r.exam_id)
    const { data: existingDemo } = await admin
      .from('exams')
      .select('id')
      .in('id', existingIds)
      .eq('title', 'Physics Group Demo Exam')
      .limit(1)

    if (existingDemo && existingDemo.length > 0) {
      console.log('[demo-group] demo already seeded (recipient check) — skipping')
      return
    }
  }

  // Guard B: check via attempts table (new user already has an attempt for this exam)
  // Catches the race-condition window between recipient insert and the guard query.
  const { data: existingAttempt } = await admin
    .from('exam_attempts')
    .select('exam_id, exams!inner(title)')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .eq('exams.title', 'Physics Group Demo Exam')
    .limit(1)

  if (existingAttempt && existingAttempt.length > 0) {
    console.log('[demo-group] demo already seeded (attempt check) — skipping')
    return
  }

  // ── 1. Create fake auth users ──────────────────────────────────────────
  const suffix = userId.slice(0, 8)
  const bobEmail = `demo-bob-${suffix}@mockmate-demo.invalid`
  const johnEmail = `demo-john-${suffix}@mockmate-demo.invalid`
  const timothyEmail = `demo-timothy-${suffix}@mockmate-demo.invalid`

  const [bobId, johnId, timothyId] = await Promise.all([
    createOrGetFakeDemoUser(admin, bobEmail, 'Bob'),
    createOrGetFakeDemoUser(admin, johnEmail, 'John'),
    createOrGetFakeDemoUser(admin, timothyEmail, 'Timothy'),
  ])

  if (!bobId || !johnId || !timothyId) {
    console.error('[demo-group] could not obtain IDs for all fake users — aborting')
    return
  }

  // ── 2. Create the exam (Bob is creator) ───────────────────────────────
  const { data: exam, error: examError } = await admin
    .from('exams')
    .insert({
      user_id: bobId,
      title: 'Physics Group Demo Exam',
      subject: 'Physics',
      exam_date: '2026-03-20',
      unlock_date: '2026-03-13',
      unlock_days_before: 7,
      status: 'completed',
    })
    .select('id')
    .single()

  if (examError || !exam) {
    console.error('[demo-group] failed to create exam row:', examError)
    return
  }

  // ── 3. Add shared recipients: new user, John, Timothy ─────────────────
  // Bob (creator) is NOT added as a recipient — the three recipients are everyone else.
  const { error: recipientsError } = await admin
    .from('exam_shared_recipients')
    .insert([
      { exam_id: exam.id, user_id: bobId, name: userName || 'You', email: userEmail },
      { exam_id: exam.id, user_id: bobId, name: 'John', email: johnEmail },
      { exam_id: exam.id, user_id: bobId, name: 'Timothy', email: timothyEmail },
    ])

  if (recipientsError) {
    console.error('[demo-group] failed to insert recipients:', recipientsError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // ── 4. Insert Physics questions ────────────────────────────────────────
  const questionRows = DEMO_GROUP_QUESTIONS.map((q, i) => ({
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

  let { error: questionsError } = await admin.from('questions').insert(questionRows)

  if (
    questionsError &&
    (questionsError.message?.includes('explanation_correct') ||
      questionsError.message?.includes('explanation_incorrect'))
  ) {
    const rowsWithoutExp = DEMO_GROUP_QUESTIONS.map((q, i) => ({
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
    console.error('[demo-group] failed to insert questions:', questionsError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // Fetch inserted question IDs (needed for new user's responses)
  const { data: insertedQuestions, error: fetchError } = await admin
    .from('questions')
    .select('id, "order", correct_answer, options')
    .eq('exam_id', exam.id)
    .order('order', { ascending: true })

  if (fetchError || !insertedQuestions || insertedQuestions.length === 0) {
    console.error('[demo-group] failed to fetch inserted questions:', fetchError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // ── 5. Create the new user's completed attempt (16/20 = 80%) ──────────
  // Two-step: insert base columns first (always works), then patch pref columns.
  const aiFeedback = {
    what_went_well:
      'You demonstrated solid understanding across most of the syllabus — Newtonian mechanics, kinetic energy, electric force, Ohm\'s law, nuclear decay, capacitors in series, the Carnot cycle, circular motion, work–energy calculations, special relativity, and the de Broglie hypothesis were all handled correctly.',
    what_to_review:
      'Focus on four specific areas: (1) Snell\'s law — when crossing into a denser medium the ray bends towards the normal, not away; (2) simple harmonic motion — maximum acceleration occurs at maximum displacement, not at equilibrium; (3) Faraday\'s law — EMF is induced by the rate of change of flux, not by the static field magnitude; (4) the Doppler effect — a source approaching an observer produces a higher detected frequency, not lower.',
    mistake_pattern:
      'Your errors share a common theme: confusing the direction or sign of a physical effect (bending toward vs. away from normal, higher vs. lower frequency) or identifying the wrong variable as the cause (static field magnitude vs. rate of change). Building explicit "before and after" mental models for each wave/field phenomenon — and practising the right-hand rule and directional reasoning — should resolve these mistakes.',
  }

  const { data: newUserAttempt, error: newUserAttemptError } = await admin
    .from('exam_attempts')
    .insert({
      exam_id: exam.id,
      user_id: userId,
      status: 'completed',
      score: 16,
      total_marks: 20,
      percentage: 80,
      submitted_at: '2026-03-17T14:00:00.000Z',
      ai_feedback: aiFeedback,
    })
    .select('id')
    .single()

  if (newUserAttemptError || !newUserAttempt) {
    console.error('[demo-group] failed to create new user attempt:', newUserAttemptError)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // Patch preference columns — non-fatal if migration not yet run
  await admin
    .from('exam_attempts')
    .update({ show_score_to_group: true, include_in_rankings: true })
    .eq('id', newUserAttempt.id)

  // ── 6. Create exam_responses for new user (4 wrong: indices 3, 7, 11, 15) ─
  const wrongIndexSet = new Set(
    DEMO_GROUP_QUESTIONS.map((q, i) =>
      q.demo_wrong_choice_index !== undefined ? i : -1,
    ).filter((i) => i >= 0),
  )

  const responseRows = insertedQuestions.map((q, idx) => {
    const demoQ = DEMO_GROUP_QUESTIONS[idx]
    const isWrong = wrongIndexSet.has(idx)
    let selectedAnswer: string
    let isCorrect: boolean

    if (isWrong && demoQ?.demo_wrong_choice_index !== undefined) {
      selectedAnswer = (q.options as string[])[demoQ.demo_wrong_choice_index]
      isCorrect = selectedAnswer === q.correct_answer
    } else {
      selectedAnswer = q.correct_answer
      isCorrect = true
    }

    return {
      attempt_id: newUserAttempt.id,
      question_id: q.id,
      selected_answer: selectedAnswer,
      is_correct: isCorrect,
      marks_awarded: isCorrect ? 1 : 0,
    }
  })

  const { error: responsesError } = await admin.from('exam_responses').insert(responseRows)
  if (responsesError) {
    console.error('[demo-group] failed to insert new user responses:', responsesError)
    await admin.from('exam_attempts').delete().eq('id', newUserAttempt.id)
    await admin.from('exams').delete().eq('id', exam.id)
    return
  }

  // ── 7. Create fake member attempts (no responses needed) ──────────────
  // Intentional per-member privacy settings for the demo:
  //   Bob     → score visible,  in rankings (show demo best case)
  //   John    → score private,  NOT in rankings (show "Score private" path)
  //   Timothy → score visible,  in rankings
  const fakeAttempts = [
    { user_id: bobId,     score: 18, percentage: 90, showScore: true,  inRankings: true  },
    { user_id: johnId,    score: 17, percentage: 85, showScore: false, inRankings: false },
    { user_id: timothyId, score: 14, percentage: 70, showScore: true,  inRankings: true  },
  ]

  for (const fa of fakeAttempts) {
    // Try INSERT with preference columns first (works when migration has run).
    const { data: withPrefs, error: withPrefsError } = await admin
      .from('exam_attempts')
      .insert({
        exam_id: exam.id,
        user_id: fa.user_id,
        status: 'completed',
        score: fa.score,
        total_marks: 20,
        percentage: fa.percentage,
        submitted_at: '2026-03-17T14:00:00.000Z',
        show_score_to_group: fa.showScore,
        include_in_rankings: fa.inRankings,
      })
      .select('id')
      .single()

    if (!withPrefsError) continue  // inserted cleanly with prefs — done

    // Preference columns don't exist yet: fall back to base insert + UPDATE.
    if (
      withPrefsError.message?.includes('show_score_to_group') ||
      withPrefsError.message?.includes('include_in_rankings')
    ) {
      const { data: baseAttempt, error: baseError } = await admin
        .from('exam_attempts')
        .insert({
          exam_id: exam.id,
          user_id: fa.user_id,
          status: 'completed',
          score: fa.score,
          total_marks: 20,
          percentage: fa.percentage,
          submitted_at: '2026-03-17T14:00:00.000Z',
        })
        .select('id')
        .single()

      if (baseError) {
        console.error('[demo-group] failed to insert fake attempt for', fa.user_id, ':', baseError)
        continue
      }

      if (baseAttempt) {
        // Best-effort UPDATE — silently ignored if columns still absent
        await admin
          .from('exam_attempts')
          .update({ show_score_to_group: fa.showScore, include_in_rankings: fa.inRankings })
          .eq('id', baseAttempt.id)
      }
    } else {
      console.error('[demo-group] failed to insert fake attempt for', fa.user_id, ':', withPrefsError)
    }
  }

  console.log('[demo-group] group demo exam seeded successfully — exam id:', exam.id)
}
