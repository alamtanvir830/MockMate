/**
 * SHSAT Practice Test B — Form 2
 *
 * STRUCTURE:
 *   SHSATForm (same interface as shsat-form-1.ts)
 *     └─ subsections[]
 *          ├─ type, title, sectionLabel, directions
 *          ├─ passages[]   ← Reading Comprehension + Rev/Edit Part A
 *          └─ questions[]  ← Rev/Edit Part B + Math
 *
 * SECTION BREAKDOWN:
 *   Reading Comprehension   Q  1 – Q 48   (subsections[0], 6 passages × 8 Q)
 *   Revising/Editing Part A Q 49 – Q 53   (subsections[1], 5 standalone Q)
 *   Revising/Editing Part B Q 54 – Q 57   (subsections[2], 4 standalone Q)
 *   Mathematics             Q 58 – Q114   (subsections[3], 57 standalone Q)
 */

import type {
  SHSATForm,
  SHSATSubsectionType,
  SHSATChoice,
  SHSATMCQQuestion,
  SHSATGridInQuestion,
} from './shsat-form-1'

export const shsatForm2: SHSATForm = {
  id: 'shsat-form-2',
  title: 'SHSAT PRACTICE TEST B - 2025',
  description: 'Specialized High Schools Admissions Test — Practice Form 2',
  timeLimitMinutes: 180,
  sectionNumber: 2,

  subsections: [

    // ── Reading Comprehension  Q1–Q48 ─────────────────────────────────────────
    {
      id: 'rc',
      type: 'reading_comprehension' as SHSATSubsectionType,
      sectionLabel: 'English Language Arts',
      title: 'READING COMPREHENSION',
      directions:
        'Read each of the following texts and answer the related questions. As needed, you may use the online notepad tool or write on the scrap paper given to you to take notes. You should reread relevant parts of each text, while being mindful of time, before selecting the best answer for each question. Base your answers only on the content within the text.',

      passages: [

        // ── Passage 1  (Q1–Q8)  The Unseen Light of the Deep ─────────────────
        {
          id: 'passage-1',
          title: 'The Unseen Light of the Deep',
          contentType: 'prose',
          content:
            'Deep within the ocean, where sunlight cannot penetrate, an extraordinary phenomenon illuminates the darkness. Bioluminescence — the ability of living organisms to produce and emit light — has evolved independently in dozens of marine species, from microscopic plankton to massive squid. Scientists estimate that more than seventy-six percent of deep-sea creatures possess this remarkable ability, making it one of the most widespread adaptations on Earth.\n\n' +
            'The chemical process behind bioluminescence involves a molecule called luciferin, which reacts with oxygen in the presence of an enzyme called luciferase. This reaction releases energy in the form of photons — particles of light — without generating significant heat. This "cold light" distinguishes bioluminescence from the combustion that powers a torch or candle. For animals in the frigid deep sea, such an efficient light source is essential; generating heat would require far more energy than these organisms can afford.\n\n' +
            'Bioluminescence serves several distinct purposes. Predators such as the anglerfish use a glowing lure dangled in front of their jaws to attract prey in the dark. Creatures such as the bobtail squid use counterillumination — emitting light from their undersides to match the faint glow filtering from the surface — effectively erasing their own shadow and becoming invisible to predators lurking below. Other organisms flash in rhythmic patterns to communicate with potential mates or to startle an attacker long enough to escape.\n\n' +
            'Scientists have harnessed bioluminescent proteins for use in medical research. By tagging cancer cells or bacteria with luciferase genes, researchers can track the spread of disease inside living organisms without surgery. The same glowing proteins help scientists visualize neural activity in the brain, advancing the study of neuroscience.\n\n' +
            'Despite decades of study, researchers continue to discover new bioluminescent species. In 2019, a study published in Scientific Reports revealed that several species of shark, previously assumed to be non-luminescent, could emit a subtle blue-green glow visible only to other sharks. The discovery suggests that bioluminescence plays an even larger role in ocean communication than scientists had previously imagined.',

          questions: [
            {
              id: 'p1q1', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Bioluminescence is found only in anglerfish and bobtail squid.' },
                { id: 'B', text: 'The chemical process of bioluminescence is too complex for scientific application.' },
                { id: 'C', text: 'Bioluminescence is a widespread and versatile adaptation with important real-world applications.' },
                { id: 'D', text: 'Deep-sea organisms rely entirely on bioluminescence for their survival.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p1q2', type: 'mcq',
              question: 'According to the passage, what distinguishes bioluminescence from other forms of light?',
              choices: [
                { id: 'A', text: 'It requires the simultaneous presence of oxygen and luciferin to function.' },
                { id: 'B', text: 'It produces light without generating significant heat.' },
                { id: 'C', text: 'It can only be observed in deep-sea environments.' },
                { id: 'D', text: 'It relies on combustion rather than a chemical reaction.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p1q3', type: 'mcq',
              question: 'Which detail from the passage best supports the idea that bioluminescence can be used as a defensive strategy?',
              choices: [
                { id: 'A', text: 'The anglerfish dangles a glowing lure to attract prey in the dark.' },
                { id: 'B', text: 'Researchers tag cancer cells with luciferase genes to track disease.' },
                { id: 'C', text: 'The bobtail squid emits light from its underside to erase its own shadow.' },
                { id: 'D', text: 'Scientists discovered glowing sharks in a 2019 study.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p1q4', type: 'mcq',
              question: 'As used in the passage, the word "counterillumination" most nearly means —',
              choices: [
                { id: 'A', text: 'attracting predators with a sudden flash of light' },
                { id: 'B', text: 'emitting light to match the surrounding brightness and avoid detection' },
                { id: 'C', text: 'communicating with potential mates through rhythmic light patterns' },
                { id: 'D', text: 'erasing a shadow by extinguishing all nearby sources of light' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p1q5', type: 'mcq',
              question: 'What can the reader infer about why energy efficiency is critical to deep-sea bioluminescent organisms?',
              choices: [
                { id: 'A', text: 'Deep-sea organisms have evolved to generate large amounts of heat to stay warm.' },
                { id: 'B', text: 'Bioluminescent light is too costly for small organisms to sustain over time.' },
                { id: 'C', text: 'Organisms with limited energy reserves require a light source that does not waste energy on heat.' },
                { id: 'D', text: 'Most deep-sea organisms prefer combustion-based light over cold light.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p1q6', type: 'mcq',
              question: 'The author\'s mention of cancer research in the fourth paragraph primarily serves to —',
              choices: [
                { id: 'A', text: 'argue that bioluminescence is a more important adaptation than previously believed' },
                { id: 'B', text: 'demonstrate that bioluminescent proteins have valuable applications beyond the ocean' },
                { id: 'C', text: 'compare modern medical technology with deep-sea animal behavior' },
                { id: 'D', text: 'explain how luciferase was first identified by scientists' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p1q7', type: 'mcq',
              question: 'According to the passage, what made the 2019 study significant?',
              choices: [
                { id: 'A', text: 'It established that more than seventy-six percent of deep-sea creatures use bioluminescence.' },
                { id: 'B', text: 'It demonstrated that bioluminescence evolved simultaneously in dozens of unrelated species.' },
                { id: 'C', text: 'It revealed that certain shark species produce a glow visible only to other sharks.' },
                { id: 'D', text: 'It confirmed that bioluminescence requires both luciferin and luciferase to produce light.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p1q8', type: 'mcq',
              question: 'Which word best describes the overall tone of this passage?',
              choices: [
                { id: 'A', text: 'Skeptical' },
                { id: 'B', text: 'Alarmist' },
                { id: 'C', text: 'Informative' },
                { id: 'D', text: 'Melancholic' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 2  (Q9–Q16)  The Code of the Underground Railroad ─────────
        {
          id: 'passage-2',
          title: 'The Code of the Underground Railroad',
          contentType: 'prose',
          content:
            'Before the Civil War, enslaved people in the American South risked their lives to flee north toward freedom. A covert network of secret routes, safe houses, and devoted guides — known as the Underground Railroad — helped thousands make this dangerous journey. Though the Underground Railroad was not literally underground, nor was it a railroad, its name captured the secrecy and speed with which freedom seekers moved through the country.\n\n' +
            'Conductors — the name given to those who guided people to safety — depended on coded communication to avoid capture. One of the most celebrated conductors, Harriet Tubman, made approximately thirteen return trips into the South after her own escape in 1849. Tubman and others used spirituals — religious songs — as a means of communicating safe routes and departure times. "Follow the Drinking Gourd" was believed to encode directions using the North Star, which pointed toward free northern states. Scholars continue to debate the extent to which each song contained literal instructions, but the use of veiled language was undeniable.\n\n' +
            'The network relied on the courage of people from many backgrounds. Quakers, free Black Americans, and white abolitionists all served as stationmasters — those who sheltered freedom seekers in barns, basements, and hidden rooms. One of the most active stations was the home of Thomas Garrett in Wilmington, Delaware, who assisted more than 2,700 people in his lifetime. When a court ordered Garrett to pay a ruinous fine for his work, he reportedly replied that he had never intended to break what he considered a law of God, and that he would continue to help anyone who sought his assistance.\n\n' +
            'Reaching free territory did not guarantee safety. The Fugitive Slave Act of 1850 required citizens of free states to assist in capturing and returning freedom seekers to their enslaved condition. As a result, many travelers pushed further north into Canada, where British law prohibited slavery outright. The Underground Railroad extended its routes accordingly, terminating in cities such as Toronto and Montreal.\n\n' +
            'Historians estimate that between 30,000 and 100,000 people used the Underground Railroad between 1810 and 1860. Its legacy shaped the abolitionist movement and contributed to the tensions that would ultimately lead to the Civil War.',

          questions: [
            {
              id: 'p2q1', type: 'mcq',
              question: 'Which statement best expresses the central idea of the passage?',
              choices: [
                { id: 'A', text: 'Harriet Tubman was the most important figure in American history.' },
                { id: 'B', text: 'The Underground Railroad was a coordinated network that helped enslaved people reach freedom through courage and coded communication.' },
                { id: 'C', text: 'Spirituals such as "Follow the Drinking Gourd" were the primary tools of the Underground Railroad.' },
                { id: 'D', text: 'The Fugitive Slave Act ultimately made the Underground Railroad unnecessary.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p2q2', type: 'mcq',
              question: 'According to the passage, why did many freedom seekers continue north into Canada after reaching free states?',
              choices: [
                { id: 'A', text: 'Canada offered better economic opportunities than the northern United States.' },
                { id: 'B', text: 'The Underground Railroad\'s established routes ended at the Canadian border.' },
                { id: 'C', text: 'The Fugitive Slave Act required free states to return freedom seekers to slavery.' },
                { id: 'D', text: 'Harriet Tubman personally guided most travelers to Canadian cities.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p2q3', type: 'mcq',
              question: 'As used in the passage, the word "covert" most nearly means —',
              choices: [
                { id: 'A', text: 'dangerous' },
                { id: 'B', text: 'religious' },
                { id: 'C', text: 'secretive' },
                { id: 'D', text: 'organized' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p2q4', type: 'mcq',
              question: 'What does Thomas Garrett\'s response to the court most reveal about his character?',
              choices: [
                { id: 'A', text: 'He regretted his decision to help freedom seekers and feared further legal action.' },
                { id: 'B', text: 'He believed the fine would prevent him from continuing his work on the Railroad.' },
                { id: 'C', text: 'He remained committed to his moral principles despite the legal consequences he faced.' },
                { id: 'D', text: 'He believed that the court had no legitimate authority over his actions.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p2q5', type: 'mcq',
              question: 'Which detail from the passage best supports the idea that the Underground Railroad required cooperation across different groups of people?',
              choices: [
                { id: 'A', text: 'Harriet Tubman made approximately thirteen return trips into the South after her escape.' },
                { id: 'B', text: 'The Fugitive Slave Act of 1850 required citizens to assist in capturing freedom seekers.' },
                { id: 'C', text: 'Quakers, free Black Americans, and white abolitionists all served as stationmasters.' },
                { id: 'D', text: 'Historians estimate that between 30,000 and 100,000 people used the network.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p2q6', type: 'mcq',
              question: 'The author places quotation marks around "Follow the Drinking Gourd" most likely to —',
              choices: [
                { id: 'A', text: 'indicate that the title of the spiritual is being referenced directly' },
                { id: 'B', text: 'suggest that the spiritual was not a widely recognized song at the time' },
                { id: 'C', text: 'emphasize that scholars universally doubt the song contained encoded directions' },
                { id: 'D', text: 'show that the song\'s full meaning is too complex to summarize in the passage' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'A',
            },
            {
              id: 'p2q7', type: 'mcq',
              question: 'What can the reader infer about the relationship between the Underground Railroad and the Civil War?',
              choices: [
                { id: 'A', text: 'The Underground Railroad directly caused the Civil War to begin in 1861.' },
                { id: 'B', text: 'The activities of the Underground Railroad contributed to growing national tensions over slavery.' },
                { id: 'C', text: 'Most people who used the Underground Railroad later served as soldiers in the Civil War.' },
                { id: 'D', text: 'The Civil War made the Underground Railroad unnecessary after 1860.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p2q8', type: 'mcq',
              question: 'Which word best describes the author\'s attitude toward the participants in the Underground Railroad?',
              choices: [
                { id: 'A', text: 'Neutral' },
                { id: 'B', text: 'Disapproving' },
                { id: 'C', text: 'Admiring' },
                { id: 'D', text: 'Pitying' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 3  (Q17–Q24)  The Last Day on the Mountain ───────────────
        {
          id: 'passage-3',
          title: 'The Last Day on the Mountain',
          contentType: 'prose',
          content:
            'The trail had been Nina\'s idea. She had spent the better part of the spring convincing her older brother Marcus that a two-day hike through the Adirondacks was exactly what the family needed — a last summer adventure before he left for college in September. Marcus had protested that he had packing to do, phone calls to make, a hundred small logistics that stood between him and the rest of his life. Nina had dismissed all of it.\n\n' +
            'Now, as they paused at the crest of a ridge, she was no longer sure she had made the right choice.\n\n' +
            'The view was breathtaking — a carpet of green and gold rolling toward the horizon, a lake glittering like a dropped coin somewhere in the valley below. But Marcus stood apart from the group, one hand resting on the shoulder strap of his pack, his eyes fixed on a distance that had nothing to do with geography. He had been like this since morning: helpful but remote, answering questions but never quite starting a conversation.\n\n' +
            'Nina had expected the hike to bring him back to them. She had imagined laughing at inside jokes, stopping to eat sandwiches on sunlit boulders, arriving at the summit flushed and triumphant. Instead, she found herself studying the back of her brother\'s jacket and trying to remember the last time they had really talked about anything — not logistics or schedules, but anything that mattered.\n\n' +
            '"Should we keep moving?" her mother called from the trail.\n\n' +
            '"Yeah," Marcus said, without turning around. He began to walk.\n\n' +
            'Nina watched him go. The lake in the valley caught the light again and flashed — brilliant and brief — before the clouds moved in.',

          questions: [
            {
              id: 'p3q1', type: 'mcq',
              question: 'Which statement best describes the central conflict of this passage?',
              choices: [
                { id: 'A', text: 'Nina and Marcus disagree about whether the family should continue hiking toward the summit.' },
                { id: 'B', text: 'Nina hoped the hike would reconnect her family, but Marcus remains emotionally distant.' },
                { id: 'C', text: 'Marcus is resentful that Nina persuaded him to take time away from his college preparations.' },
                { id: 'D', text: 'The family struggles to navigate a challenging and unfamiliar trail.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p3q2', type: 'mcq',
              question: 'What can the reader infer about Marcus\'s emotional state throughout the hike?',
              choices: [
                { id: 'A', text: 'He is excited about starting college and eager to return home to finish packing.' },
                { id: 'B', text: 'He resents Nina for arranging the hike without consulting him first.' },
                { id: 'C', text: 'He is mentally preoccupied with his future and feels disconnected from the present moment.' },
                { id: 'D', text: 'He is physically exhausted and struggling to keep pace with the rest of the family.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p3q3', type: 'mcq',
              question: 'The phrase "eyes fixed on a distance that had nothing to do with geography" suggests that Marcus is —',
              choices: [
                { id: 'A', text: 'struggling to see the view clearly because of the sunlight' },
                { id: 'B', text: 'focused on a specific memory from a previous hike in the same area' },
                { id: 'C', text: 'mentally absorbed in thought rather than present with his surroundings' },
                { id: 'D', text: 'deliberately ignoring the scenery to signal his anger at his family' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p3q4', type: 'mcq',
              question: 'Which detail from the passage best suggests that Nina feels uncertain about her decision to plan the hike?',
              choices: [
                { id: 'A', text: '"The view was breathtaking — a carpet of green and gold rolling toward the horizon."' },
                { id: 'B', text: '"She had spent the better part of the spring convincing her older brother Marcus."' },
                { id: 'C', text: '"Now, as they paused at the crest of a ridge, she was no longer sure she had made the right choice."' },
                { id: 'D', text: '"\'Yeah,\' Marcus said, without turning around."' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p3q5', type: 'mcq',
              question: 'The image of the lake flashing "brilliant and brief" at the end of the passage most likely represents —',
              choices: [
                { id: 'A', text: 'an approaching thunderstorm that threatens the family\'s safety' },
                { id: 'B', text: 'a fleeting moment of beauty or connection that quickly disappears' },
                { id: 'C', text: 'the light Marcus has been searching for throughout the hike' },
                { id: 'D', text: 'the family\'s shared triumph at finally reaching the summit together' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p3q6', type: 'mcq',
              question: 'What was Nina\'s original expectation for the hike?',
              choices: [
                { id: 'A', text: 'That it would give Marcus time to complete the logistics of preparing for college.' },
                { id: 'B', text: 'That it would give the family an opportunity to discuss Marcus\'s plans for the future.' },
                { id: 'C', text: 'That it would be a joyful, bonding experience filled with laughter and shared memories.' },
                { id: 'D', text: 'That it would prove to Marcus he was not yet ready to leave home for college.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p3q7', type: 'mcq',
              question: 'Why does the author choose to present the story primarily from Nina\'s perspective rather than Marcus\'s?',
              choices: [
                { id: 'A', text: 'To suggest that Marcus\'s feelings are less important to the story than Nina\'s.' },
                { id: 'B', text: 'To create suspense by focusing the reader\'s attention on the physical trail.' },
                { id: 'C', text: 'To show Marcus as inaccessible — the reader, like Nina, cannot fully know what he is feeling.' },
                { id: 'D', text: 'To indicate that Marcus is intentionally keeping his thoughts secret from the family.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p3q8', type: 'mcq',
              question: 'Which word best describes the overall mood of this passage?',
              choices: [
                { id: 'A', text: 'Joyful' },
                { id: 'B', text: 'Suspenseful' },
                { id: 'C', text: 'Melancholic' },
                { id: 'D', text: 'Humorous' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 4  (Q25–Q32)  Clay ────────────────────────────────────────
        {
          id: 'passage-4',
          title: 'Clay',
          contentType: 'prose',
          content:
            'Clay had learned to read weather the same way he read people — slowly, carefully, with a deep distrust of whatever appeared on the surface. The morning of his grandfather\'s funeral, he stood on the back porch and watched the sky shift from pewter to slate, the clouds building in slow columns above the ridge. A red-tailed hawk circled once and was gone.\n\n' +
            'He had not cried. He understood, distantly, that this was what people expected of him — the wet face, the crumpled expression, the visible performance of grief. But Clay\'s feelings did not work that way. They arrived late, like a delayed train, and settled in places he hadn\'t anticipated: the tightness in his jaw when he saw his grandfather\'s boots by the back door, the way his breath caught when he opened the shed and smelled wood shavings and motor oil.\n\n' +
            'Inside the house, relatives moved through the kitchen with plates and quiet voices. Clay had stood among them for a time, receiving their embraces and their careful words. But the comfort they offered landed on the outside of him, unable to find a way in.\n\n' +
            'He stepped back onto the porch and stayed there while the first drops of rain stippled the dust in the yard. His grandfather had built this porch. Had planed each board smooth with hands that Clay had watched for years — wide, patient hands that never rushed. Clay pressed his palm flat against the railing and felt the grain of the wood beneath his fingers, the slight roughness where the paint had begun to peel at the corner post.\n\n' +
            'The rain came harder. Clay did not move. There was something clean about standing in it — about letting the cold water flatten his hair and dampen his shirt — as though the sky had given him permission to feel something without having to name it.',

          questions: [
            {
              id: 'p4q1', type: 'mcq',
              question: 'Which sentence best describes Clay\'s emotional state at the beginning of the passage?',
              choices: [
                { id: 'A', text: 'He is openly grief-stricken and struggling to compose himself in front of his relatives.' },
                { id: 'B', text: 'He feels nothing and is largely indifferent to his grandfather\'s death.' },
                { id: 'C', text: 'He experiences grief in a private, internal way that does not match outward expectations.' },
                { id: 'D', text: 'He is angry at his relatives for gathering at the house after the funeral.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p4q2', type: 'mcq',
              question: 'What does the detail about his grandfather\'s boots by the back door most reveal about Clay?',
              choices: [
                { id: 'A', text: 'He is preoccupied with the practical task of deciding what to do with his grandfather\'s belongings.' },
                { id: 'B', text: 'Small, specific objects trigger his grief more powerfully than formal expressions of mourning.' },
                { id: 'C', text: 'He finds it too painful to remain inside the house with his relatives.' },
                { id: 'D', text: 'He is trying to commit everything his grandfather ever owned to memory.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p4q3', type: 'mcq',
              question: 'Why does the author avoid dialogue in this passage?',
              choices: [
                { id: 'A', text: 'To suggest that Clay is unable to communicate meaningfully with the people around him.' },
                { id: 'B', text: 'To convey that the relatives are speaking too softly to be overheard.' },
                { id: 'C', text: 'To keep the reader inside Clay\'s private, interior experience rather than his external interactions.' },
                { id: 'D', text: 'To indicate that there is nothing meaningful left to say after a funeral.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p4q4', type: 'mcq',
              question: 'The phrase "the comfort they offered landed on the outside of him, unable to find a way in" most likely means —',
              choices: [
                { id: 'A', text: 'Clay could not hear what his relatives were saying to him.' },
                { id: 'B', text: 'Clay found his relatives\'s words dismissive and unhelpful.' },
                { id: 'C', text: 'The sympathy of others could not reach Clay\'s deeper emotional state.' },
                { id: 'D', text: 'Clay was physically uncomfortable being embraced by so many people at once.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p4q5', type: 'mcq',
              question: 'What can the reader infer about Clay\'s relationship with his grandfather based on the passage?',
              choices: [
                { id: 'A', text: 'Their relationship was distant and rarely involved shared physical work.' },
                { id: 'B', text: 'Clay admired his grandfather and holds specific, tangible memories of him.' },
                { id: 'C', text: 'Clay regrets that he never devoted enough time to his grandfather while he was alive.' },
                { id: 'D', text: 'Clay and his grandfather frequently disagreed about how tasks should be done.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p4q6', type: 'mcq',
              question: 'The image of Clay pressing his palm against the porch railing primarily serves to —',
              choices: [
                { id: 'A', text: 'show that Clay is checking whether the structure his grandfather built needs repair' },
                { id: 'B', text: 'suggest that Clay connects to his grandfather through a physical object his grandfather made' },
                { id: 'C', text: 'demonstrate that Clay is about to leave the porch and return inside to his relatives' },
                { id: 'D', text: 'indicate that Clay distrusts the quality of the construction' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p4q7', type: 'mcq',
              question: 'Which detail from the passage best suggests that standing in the rain provides Clay with a sense of relief?',
              choices: [
                { id: 'A', text: '"The morning of his grandfather\'s funeral, he stood on the back porch."' },
                { id: 'B', text: '"A red-tailed hawk circled once and was gone."' },
                { id: 'C', text: '"There was something clean about standing in it...as though the sky had given him permission to feel something without having to name it."' },
                { id: 'D', text: '"His grandfather had built this porch."' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p4q8', type: 'mcq',
              question: 'Which statement best describes the author\'s purpose in this passage?',
              choices: [
                { id: 'A', text: 'To argue that people should express grief openly rather than privately.' },
                { id: 'B', text: 'To describe the customs and rituals typically associated with funerals.' },
                { id: 'C', text: 'To explore the inner emotional experience of a character who grieves in an unconventional way.' },
                { id: 'D', text: 'To contrast Clay\'s personality with that of his more expressive relatives.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 5  (Q33–Q40)  The Art of Memory ──────────────────────────
        {
          id: 'passage-5',
          title: 'The Art of Memory: How Mnemonics Shape Learning',
          contentType: 'prose',
          content:
            'The human brain is remarkably capable of storing and retrieving information, yet it was not designed to memorize random sequences of facts. Ancient Greek and Roman orators understood this limitation and developed a system known as the "method of loci" — a technique that involves mentally placing pieces of information along a familiar route or within an imagined building. By "walking" through that space in their minds, speakers could recall speeches of extraordinary length without a single written note.\n\n' +
            'Modern psychologists have confirmed what ancient rhetoricians discovered by trial and error: memory is fundamentally associative. The brain retains information more effectively when new material is connected to something already known. A string of unrelated numbers, for example, is difficult to remember in isolation; the same numbers arranged into a birthdate or a phone number become immediately meaningful and far easier to retrieve.\n\n' +
            'This principle underlies many mnemonic devices still in use today. Acronyms such as "ROYGBIV" help students recall the colors of the visible spectrum, while rhymes and songs have long been used to teach the order of the months, the bones of the body, and the capitals of nations. Research published by educational psychologists in the 1980s demonstrated that students who learned foreign vocabulary through keyword mnemonics — linking a new word to a similar-sounding word in their native language — outperformed control groups by as much as two to one on retention tests.\n\n' +
            'Despite these advantages, mnemonics are not a replacement for deep understanding. A student who memorizes "PEMDAS" may execute the correct order of mathematical operations without grasping why parentheses take priority. Critics of heavy mnemonic use argue that overreliance on memory tricks can produce students who perform well on recall-based tests but struggle to apply knowledge to new contexts.\n\n' +
            'The most effective learning, researchers now suggest, combines both approaches: using mnemonics as a scaffold to hold new information in place while deeper conceptual understanding is built beneath it. Like the temporary supports that hold a new arch in place until the stone can bear its own weight, memory techniques serve best when they are eventually no longer needed.',

          questions: [
            {
              id: 'p5q1', type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'The method of loci was invented by Greek orators and has never changed since ancient times.' },
                { id: 'B', text: 'Mnemonic devices are effective memory tools but work best when combined with genuine understanding.' },
                { id: 'C', text: 'Memory tricks are too unreliable to be useful in modern educational settings.' },
                { id: 'D', text: 'Acronyms and rhymes are the only types of mnemonics that have been scientifically proven.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p5q2', type: 'mcq',
              question: 'As used in the passage, the word "associative" most nearly means —',
              choices: [
                { id: 'A', text: 'working through groups of people' },
                { id: 'B', text: 'functioning by making connections between ideas' },
                { id: 'C', text: 'based on repetition and practice' },
                { id: 'D', text: 'relying on visual images to recall facts' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p5q3', type: 'mcq',
              question: 'Which detail from the passage best supports the claim that mnemonic techniques can improve academic performance?',
              choices: [
                { id: 'A', text: 'The method of loci was developed by ancient Greek and Roman orators.' },
                { id: 'B', text: 'A string of unrelated numbers is difficult to remember in isolation.' },
                { id: 'C', text: 'Students who used keyword mnemonics outperformed control groups by as much as two to one on retention tests.' },
                { id: 'D', text: 'Critics argue that overreliance on mnemonics can prevent deep understanding.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p5q4', type: 'mcq',
              question: 'Why does the author include the example of "PEMDAS" in the fourth paragraph?',
              choices: [
                { id: 'A', text: 'To demonstrate that mathematical mnemonics are always more effective than verbal ones.' },
                { id: 'B', text: 'To show how a mnemonic can be memorized without the learner understanding the underlying concept.' },
                { id: 'C', text: 'To argue that order of operations is the most difficult topic for students to learn.' },
                { id: 'D', text: 'To provide evidence that educational psychologists created mnemonics in the 1980s.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p5q5', type: 'mcq',
              question: 'What can the reader infer about the "method of loci" based on the passage?',
              choices: [
                { id: 'A', text: 'It was used exclusively to help students memorize mathematical formulas.' },
                { id: 'B', text: 'It relied on connecting information to familiar mental images rather than raw repetition.' },
                { id: 'C', text: 'It was abandoned in ancient times and rediscovered by modern psychologists.' },
                { id: 'D', text: 'It was proven ineffective compared to modern mnemonic techniques.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p5q6', type: 'mcq',
              question: 'According to the passage, what is the critics\' primary concern about heavy reliance on mnemonics?',
              choices: [
                { id: 'A', text: 'Mnemonics take too long to create and are rarely worth the effort.' },
                { id: 'B', text: 'Students who use mnemonics often forget them before important tests.' },
                { id: 'C', text: 'Overusing memory tricks can make it difficult to apply knowledge in new situations.' },
                { id: 'D', text: 'Mnemonics work only for language-based subjects, not mathematics or science.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p5q7', type: 'mcq',
              question: 'The comparison to "temporary supports that hold a new arch in place" in the final paragraph suggests that mnemonics —',
              choices: [
                { id: 'A', text: 'should be removed as soon as deeper understanding is established' },
                { id: 'B', text: 'are permanent structures that hold knowledge in place permanently' },
                { id: 'C', text: 'require constant reinforcement or they will collapse under pressure' },
                { id: 'D', text: 'work best when combined with physical objects rather than mental images' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'A',
            },
            {
              id: 'p5q8', type: 'mcq',
              question: 'Which word best describes the author\'s overall approach in this passage?',
              choices: [
                { id: 'A', text: 'One-sided — the author argues strongly for the use of mnemonics.' },
                { id: 'B', text: 'Balanced — the author presents both the benefits and the limitations of mnemonics.' },
                { id: 'C', text: 'Critical — the author believes mnemonics do more harm than good.' },
                { id: 'D', text: 'Historical — the author focuses primarily on the origins of mnemonic devices.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
          ],
        },

        // ── Passage 6  (Q41–Q48)  The River (Poem) ───────────────────────────
        {
          id: 'passage-6',
          title: 'The River',
          contentType: 'poem',
          content: '',
          lines: [
            { num: 1,  text: 'The river does not ask permission—' },
            { num: 2,  text: 'it carves its path through limestone dark,' },
            { num: 3,  text: 'turning obstacles to sediment,' },
            { num: 4,  text: 'leaving channels as its mark.' },
            { num: 0,  text: '' },
            { num: 5,  text: 'In summer, children call it home,' },
            { num: 6,  text: 'wade through shallows, catch the light;' },
            { num: 7,  text: 'in winter, ice lays claim to it' },
            { num: 8,  text: 'and stills the current overnight.' },
            { num: 0,  text: '' },
            { num: 9,  text: 'But come the thaw, the river rises,' },
            { num: 10, text: 'reclaims the banks it used to own;' },
            { num: 11, text: 'the boundary-makers pack their tools' },
            { num: 12, text: 'and learn once more what rivers know.' },
          ],

          questions: [
            {
              id: 'p6q1', type: 'mcq',
              question: 'Which statement best expresses the central idea of the poem?',
              choices: [
                { id: 'A', text: 'Rivers are dangerous and unpredictable forces that should be avoided.' },
                { id: 'B', text: 'Natural forces persist and reassert themselves despite human attempts to contain them.' },
                { id: 'C', text: 'Children are more in tune with nature than adults.' },
                { id: 'D', text: 'The changing seasons cause rivers to shrink and grow in predictable ways.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q2', type: 'mcq',
              question: 'The opening line "The river does not ask permission" suggests that the river is —',
              choices: [
                { id: 'A', text: 'reckless and destructive in its behavior' },
                { id: 'B', text: 'indifferent to human rules and boundaries' },
                { id: 'C', text: 'responding to the demands of the children who use it' },
                { id: 'D', text: 'changing course each season due to rainfall' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q3', type: 'mcq',
              question: 'In lines 3–4, the image of "turning obstacles to sediment" and "leaving channels as its mark" primarily emphasizes that the river —',
              choices: [
                { id: 'A', text: 'destroys everything in its path without leaving anything behind' },
                { id: 'B', text: 'reshapes the landscape as it moves, permanently altering the land' },
                { id: 'C', text: 'becomes weaker as it encounters harder rock formations' },
                { id: 'D', text: 'follows the same course year after year without change' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q4', type: 'mcq',
              question: 'What contrast is established between the second stanza (lines 5–8) and the third stanza (lines 9–12)?',
              choices: [
                { id: 'A', text: 'The difference between a river that is shared by many people and one that belongs to no one.' },
                { id: 'B', text: 'The difference between a river that is used joyfully in summer and one that is reclaimed in spring.' },
                { id: 'C', text: 'The difference between the danger of a summer river and the safety of a frozen one.' },
                { id: 'D', text: 'The difference between how adults experience rivers and how children experience them.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q5', type: 'mcq',
              question: 'Who are the "boundary-makers" referred to in line 11?',
              choices: [
                { id: 'A', text: 'Children who mark the edges of the river during summer.' },
                { id: 'B', text: 'Animals that establish territory along the riverbanks.' },
                { id: 'C', text: 'People who attempt to define or control the river\'s limits.' },
                { id: 'D', text: 'Ice formations that block the river\'s current in winter.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 'p6q6', type: 'mcq',
              question: 'What does the phrase "learn once more what rivers know" in the final line most likely mean?',
              choices: [
                { id: 'A', text: 'Scientists must study rivers again each spring to update their records.' },
                { id: 'B', text: 'Humans are repeatedly reminded that they cannot permanently control natural forces.' },
                { id: 'C', text: 'Rivers have a kind of wisdom that can be taught to those who observe them.' },
                { id: 'D', text: 'Children learn important life lessons from spending time near rivers.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q7', type: 'mcq',
              question: 'The structure of this poem — moving from winter\'s stillness in stanza two back to the river\'s resurgence in stanza three — primarily serves to —',
              choices: [
                { id: 'A', text: 'describe the physical geography of a specific river valley in detail' },
                { id: 'B', text: 'create a cyclical pattern that reinforces the river\'s inevitable return' },
                { id: 'C', text: 'establish suspense about whether the river will survive the winter' },
                { id: 'D', text: 'contrast a peaceful natural world with a noisy human one' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 'p6q8', type: 'mcq',
              question: 'Which word best describes the overall tone of this poem?',
              choices: [
                { id: 'A', text: 'Sorrowful' },
                { id: 'B', text: 'Reverent' },
                { id: 'C', text: 'Anxious' },
                { id: 'D', text: 'Humorous' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
          ],
        },

      ], // end passages (Reading Comprehension)
    },

    // ── Revising/Editing Part A  Q49–Q53 ──────────────────────────────────────
    {
      id: 'rev-edit-a',
      type: 'revising_editing_a' as SHSATSubsectionType,
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART A',
      directions:
        'Read the passage below and answer the questions that follow. You will be asked to improve the writing quality of the text and to correct errors so that the text follows the conventions of standard written English. You should reread relevant parts of the text, while being mindful of time, before selecting the best answer for each question.',
      passages: [
        {
          id: 're-a-passage-1',
          title: 'The Rise of Radio Broadcasting',
          contentType: 'numbered_sentences',
          content:
            '(1) In the early twentieth century, radio transformed the way people received news and entertainment.\n' +
            '(2) Before radio, most people relied on newspapers, which were printed once or twice a day, to learn about current events.\n' +
            '(3) Radio allowed information to travel instantly across long distances, reaching listeners in their own homes.\n' +
            '(4) Guglielmo Marconi, an Italian inventor, is often credited with developing the first practical wireless telegraph system.\n\n' +
            '(5) Early radio broadcasts were simple and consisted mainly of music and voice transmissions.\n' +
            '(6) However, the medium grew quickly as stations began offering news programs, dramas, and variety shows.\n' +
            '(7) By the 1930s, millions of Americans gathered around their radios each evening to listen together.\n' +
            '(8) This shared experience helped create a sense of national community during difficult times such as the Great Depression.\n\n' +
            '(9) Radio also changed how political leaders communicated with the public.\n' +
            '(10) President Franklin D. Roosevelt used radio broadcasts — known as "fireside chats" — to speak directly to citizens about government policy.\n' +
            '(11) These broadcasts helped restore confidence and calm during periods of economic and social uncertainty.\n' +
            '(12) Radio remained the dominant form of mass communication until the widespread adoption of television in the 1950s.',
          questions: [
            {
              id: 're-a-q1', type: 'mcq',
              question: 'Which sentence would be the BEST introduction to the passage, placed before sentence 1?',
              choices: [
                { id: 'A', text: 'Many people enjoy listening to music at home.' },
                { id: 'B', text: 'Technology has changed many aspects of daily life throughout history.' },
                { id: 'C', text: 'Guglielmo Marconi was born in 1874 in Bologna, Italy.' },
                { id: 'D', text: 'Television eventually replaced radio as the most popular broadcast medium.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 're-a-q2', type: 'mcq',
              question: 'Which sentence BEST explains how radio changed the speed of information delivery?',
              choices: [
                { id: 'A', text: 'Sentence 1' },
                { id: 'B', text: 'Sentence 2' },
                { id: 'C', text: 'Sentence 3' },
                { id: 'D', text: 'Sentence 4' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
            {
              id: 're-a-q3', type: 'mcq',
              question: 'Which transition word or phrase would BEST replace "However" at the beginning of sentence 6?',
              choices: [
                { id: 'A', text: 'In contrast' },
                { id: 'B', text: 'As a result' },
                { id: 'C', text: 'For example' },
                { id: 'D', text: 'In addition' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 're-a-q4', type: 'mcq',
              question: 'Where would the following sentence BEST be placed in the passage?\n"These programs created some of the first national celebrities, known and recognized from coast to coast."',
              choices: [
                { id: 'A', text: 'After sentence 5' },
                { id: 'B', text: 'After sentence 6' },
                { id: 'C', text: 'After sentence 8' },
                { id: 'D', text: 'After sentence 11' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'B',
            },
            {
              id: 're-a-q5', type: 'mcq',
              question: 'Which revision of sentence 7 is MOST grammatically correct and clear?',
              choices: [
                { id: 'A', text: 'By the 1930s millions of Americans they gathered around their radios each evening.' },
                { id: 'B', text: 'Millions of Americans, by the 1930s, they were gathering around their radios in the evening.' },
                { id: 'C', text: 'By the 1930s, millions of Americans were gathering around their radios each evening to listen.' },
                { id: 'D', text: 'In the 1930s millions of Americans gathered around, their radios, each evening to listen.' },
              ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
              correct_answer: 'C',
            },
          ],
        },
      ],
    },

    // ── Revising/Editing Part B  Q54–Q57 ──────────────────────────────────────
    {
      id: 'rev-edit-b',
      type: 'revising_editing_b' as SHSATSubsectionType,
      sectionLabel: 'English Language Arts',
      title: 'REVISING/EDITING PART B',
      directions:
        'Read and answer the following questions. You will be asked to recognize and correct errors so that the sentences or short paragraphs follow the conventions of standard written English. As needed, you may use the notepad tool or write on the scrap paper given to you to take notes. You should reread relevant parts while being mindful of time.',
      questions: [
        {
          id: 're-b-q1', type: 'mcq',
          question: 'Which sentence is written correctly?',
          choices: [
            { id: 'A', text: 'The coach, who trained the team every day won the championship.' },
            { id: 'B', text: 'The coach who trained the team every day, won the championship.' },
            { id: 'C', text: 'The coach who trained the team every day won the championship.' },
            { id: 'D', text: 'The coach who, trained the team every day won the championship.' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 're-b-q2', type: 'mcq',
          question: 'Which revision BEST improves this sentence?\n"Mia went to the store and she bought milk and then she came back home and made dinner."',
          choices: [
            { id: 'A', text: 'Mia went to the store, bought milk, came back home, and made dinner.' },
            { id: 'B', text: 'Mia went to the store and she bought milk; then she came home and made dinner.' },
            { id: 'C', text: 'Mia went to the store and bought milk and made dinner after coming home.' },
            { id: 'D', text: 'Going to the store, Mia bought milk, coming back, she made dinner.' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'A',
        },
        {
          id: 're-b-q3', type: 'mcq',
          question: 'Which revision BEST corrects the error in this sentence?\n"Exhausted from the long rehearsal, the stage lights were turned off by the director."',
          choices: [
            { id: 'A', text: 'Exhausted from the long rehearsal, the director turned off the stage lights.' },
            { id: 'B', text: 'The director turned off the stage lights, who was exhausted from the long rehearsal.' },
            { id: 'C', text: 'Exhausted from the long rehearsal, and the stage lights were turned off.' },
            { id: 'D', text: 'The stage lights were turned off because of exhaustion from the long rehearsal.' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'A',
        },
        {
          id: 're-b-q4', type: 'mcq',
          question: 'Which sentence uses correct pronoun agreement?',
          choices: [
            { id: 'A', text: 'Each of the students submitted their assignment on time.' },
            { id: 'B', text: 'Each of the students submitted his or her assignment on time.' },
            { id: 'C', text: 'Each of the students submitted its assignment on time.' },
            { id: 'D', text: 'Each of the students submitted our assignment on time.' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
      ],
    },

    // ── Mathematics  Q58–Q114 ─────────────────────────────────────────────────
    {
      id: 'math',
      type: 'mathematics' as SHSATSubsectionType,
      sectionLabel: 'Mathematics',
      title: 'MATHEMATICS',
      directionBullets: [
        'Formulas and definitions are not provided.',
        'Diagrams are not necessarily drawn to scale.',
        'Assume all diagrams lie in one plane unless otherwise stated.',
        'Graphs are drawn to scale unless otherwise stated.',
      ],
      directions:
        'Solve each problem. Select the answer from the choices given or enter your answer in the space provided.',
      questions: [

        // ── Easy  Q58–Q70 ──────────────────────────────────────────────────
        {
          id: 'math-q1', type: 'mcq',
          question: 'What is 5 + 3 × 4?',
          choices: [
            { id: 'A', text: '17' },
            { id: 'B', text: '32' },
            { id: 'C', text: '24' },
            { id: 'D', text: '20' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'A',
        },
        {
          id: 'math-q2', type: 'mcq',
          question: 'What is 2/5 + 1/4?',
          choices: [
            { id: 'A', text: '3/9' },
            { id: 'B', text: '13/20' },
            { id: 'C', text: '3/20' },
            { id: 'D', text: '1/2' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q3', type: 'mcq',
          question: 'What is 30% of 60?',
          choices: [
            { id: 'A', text: '12' },
            { id: 'B', text: '16' },
            { id: 'C', text: '18' },
            { id: 'D', text: '20' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q4', type: 'mcq',
          question: 'A number increased by 9 equals 14. What is the number?',
          choices: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
            { id: 'C', text: '6' },
            { id: 'D', text: '7' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q5', type: 'mcq',
          question: 'What is the value of 4² − 7?',
          choices: [
            { id: 'A', text: '7' },
            { id: 'B', text: '9' },
            { id: 'C', text: '11' },
            { id: 'D', text: '13' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q6', type: 'mcq',
          question: 'Which is equivalent to 3(5 + 7)?',
          choices: [
            { id: 'A', text: '22' },
            { id: 'B', text: '30' },
            { id: 'C', text: '36' },
            { id: 'D', text: '42' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q7', type: 'mcq',
          question: 'What is the area of a square with side length 7?',
          choices: [
            { id: 'A', text: '14' },
            { id: 'B', text: '21' },
            { id: 'C', text: '28' },
            { id: 'D', text: '49' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'D',
        },
        {
          id: 'math-q8', type: 'mcq',
          question: 'What is 2/3 of 45?',
          choices: [
            { id: 'A', text: '20' },
            { id: 'B', text: '25' },
            { id: 'C', text: '30' },
            { id: 'D', text: '35' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q9', type: 'mcq',
          question: 'A number line shows points at −6 and 4. What is the distance between them?',
          choices: [
            { id: 'A', text: '2' },
            { id: 'B', text: '6' },
            { id: 'C', text: '10' },
            { id: 'D', text: '12' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q10', type: 'grid_in', question: 'What is 6 × 9?',   correct_answer: '54' } as SHSATGridInQuestion,
        { id: 'math-q11', type: 'grid_in', question: 'What is 121 ÷ 11?', correct_answer: '11' } as SHSATGridInQuestion,
        { id: 'math-q12', type: 'grid_in', question: 'What is 8²?',       correct_answer: '64' } as SHSATGridInQuestion,
        { id: 'math-q13', type: 'grid_in', question: 'What is 1/3 of 60?', correct_answer: '20' } as SHSATGridInQuestion,

        // ── Medium  Q71–Q90 ────────────────────────────────────────────────
        {
          id: 'math-q14', type: 'mcq',
          question: 'A jacket costs $30 and is on sale for 20% off. What is the sale price?',
          choices: [
            { id: 'A', text: '$20' },
            { id: 'B', text: '$22' },
            { id: 'C', text: '$24' },
            { id: 'D', text: '$26' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q15', type: 'mcq',
          question: 'A ratio of girls to boys is 4:5. If there are 20 girls, how many boys are there?',
          choices: [
            { id: 'A', text: '16' },
            { id: 'B', text: '20' },
            { id: 'C', text: '25' },
            { id: 'D', text: '30' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q16', type: 'mcq',
          question: 'Solve: 4x + 3 = 19',
          choices: [
            { id: 'A', text: '3' },
            { id: 'B', text: '4' },
            { id: 'C', text: '5' },
            { id: 'D', text: '6' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q17', type: 'mcq',
          question: 'A car travels 90 miles in 3 hours. What is its speed in miles per hour?',
          choices: [
            { id: 'A', text: '20' },
            { id: 'B', text: '25' },
            { id: 'C', text: '30' },
            { id: 'D', text: '35' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q18', type: 'grid_in', question: 'What is 35% of 80?',  correct_answer: '28' } as SHSATGridInQuestion,
        {
          id: 'math-q19', type: 'mcq',
          question: 'A rectangle has an area of 54 and a width of 9. What is its length?',
          choices: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
            { id: 'C', text: '6' },
            { id: 'D', text: '7' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q20', type: 'mcq',
          question: 'If x = 3, what is the value of 2x³?',
          choices: [
            { id: 'A', text: '18' },
            { id: 'B', text: '27' },
            { id: 'C', text: '54' },
            { id: 'D', text: '216' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q21', type: 'mcq',
          question: 'What is the mean of 5, 8, 12, and 7?',
          choices: [
            { id: 'A', text: '7' },
            { id: 'B', text: '8' },
            { id: 'C', text: '9' },
            { id: 'D', text: '10' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        { id: 'math-q22', type: 'grid_in', question: 'What is 20% of 150?', correct_answer: '30' } as SHSATGridInQuestion,
        {
          id: 'math-q23', type: 'mcq',
          question: 'A number is decreased by 40% to become 60. What was the original number?',
          choices: [
            { id: 'A', text: '90' },
            { id: 'B', text: '100' },
            { id: 'C', text: '110' },
            { id: 'D', text: '120' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q24', type: 'mcq',
          question: 'A car travels at 55 miles per hour for 3 hours. How far does it travel?',
          choices: [
            { id: 'A', text: '145 miles' },
            { id: 'B', text: '155 miles' },
            { id: 'C', text: '165 miles' },
            { id: 'D', text: '175 miles' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q25', type: 'mcq',
          question: 'A store buys an item for $60 and marks it up 30%. What is the selling price?',
          choices: [
            { id: 'A', text: '$72' },
            { id: 'B', text: '$75' },
            { id: 'C', text: '$78' },
            { id: 'D', text: '$80' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q26', type: 'grid_in',
          question: 'A rectangle has a perimeter of 30. One side has a length of 9. What is the length of the other side?',
          correct_answer: '6' } as SHSATGridInQuestion,
        {
          id: 'math-q27', type: 'mcq',
          question: 'If 4 workers can complete a job in 15 days, how many days would 6 workers take to complete the same job at the same rate?',
          choices: [
            { id: 'A', text: '8' },
            { id: 'B', text: '10' },
            { id: 'C', text: '12' },
            { id: 'D', text: '14' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q28', type: 'mcq',
          question: 'The average of 5 numbers is 12. Four of the numbers are 10, 11, 13, and 14. What is the fifth number?',
          choices: [
            { id: 'A', text: '10' },
            { id: 'B', text: '12' },
            { id: 'C', text: '13' },
            { id: 'D', text: '14' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q29', type: 'mcq',
          question: 'Which of the following fractions is the greatest?',
          choices: [
            { id: 'A', text: '4/9' },
            { id: 'B', text: '3/7' },
            { id: 'C', text: '7/15' },
            { id: 'D', text: '5/11' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q30', type: 'grid_in', question: 'Solve for x: 3x + 4 = 22', correct_answer: '6' } as SHSATGridInQuestion,
        {
          id: 'math-q31', type: 'mcq',
          question: 'A store buys a shirt for $25 and marks it up 60%. What is the selling price?',
          choices: [
            { id: 'A', text: '$35' },
            { id: 'B', text: '$38' },
            { id: 'C', text: '$40' },
            { id: 'D', text: '$45' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q32', type: 'mcq',
          question: 'The sum of two numbers is 52 and their difference is 8. What is the larger number?',
          choices: [
            { id: 'A', text: '26' },
            { id: 'B', text: '28' },
            { id: 'C', text: '30' },
            { id: 'D', text: '32' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q33', type: 'grid_in',
          question: 'What is the sum of the interior angles of a quadrilateral, in degrees?',
          correct_answer: '360' } as SHSATGridInQuestion,

        // ── Hard  Q91–Q105 ─────────────────────────────────────────────────
        {
          id: 'math-q34', type: 'mcq',
          question: 'What is the value of x in 5x − 4 = 3x + 10?',
          choices: [
            { id: 'A', text: '5' },
            { id: 'B', text: '6' },
            { id: 'C', text: '7' },
            { id: 'D', text: '8' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q35', type: 'mcq',
          question: 'The sum of three consecutive odd integers is 63. What is the largest of the three?',
          choices: [
            { id: 'A', text: '19' },
            { id: 'B', text: '21' },
            { id: 'C', text: '23' },
            { id: 'D', text: '25' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q36', type: 'mcq',
          question: 'A triangle has sides of length 8, 15, and 17. What type of triangle is it?',
          choices: [
            { id: 'A', text: 'Acute' },
            { id: 'B', text: 'Obtuse' },
            { id: 'C', text: 'Right' },
            { id: 'D', text: 'Equilateral' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q37', type: 'grid_in', question: 'What is 4³?', correct_answer: '64' } as SHSATGridInQuestion,
        {
          id: 'math-q38', type: 'mcq',
          question: 'A bag has 4 red, 3 blue, and 5 yellow marbles. What is the probability of randomly selecting a yellow marble?',
          choices: [
            { id: 'A', text: '1/4' },
            { id: 'B', text: '5/12' },
            { id: 'C', text: '1/3' },
            { id: 'D', text: '5/7' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q39', type: 'mcq',
          question: 'A number is increased by 20%, then the result is decreased by 20%. How does the final value compare to the original?',
          choices: [
            { id: 'A', text: 'It is the same.' },
            { id: 'B', text: 'It is greater.' },
            { id: 'C', text: 'It is smaller.' },
            { id: 'D', text: 'It cannot be determined.' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q40', type: 'mcq',
          question: 'Two angles of a triangle are 38° and 65°. What is the measure of the third angle?',
          choices: [
            { id: 'A', text: '67°' },
            { id: 'B', text: '72°' },
            { id: 'C', text: '77°' },
            { id: 'D', text: '83°' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q41', type: 'grid_in',
          question: 'What is the value of 5(x − 2) when x = 7?',
          correct_answer: '25' } as SHSATGridInQuestion,
        {
          id: 'math-q42', type: 'mcq',
          question: 'A rectangle has a perimeter of 44 and a length of 14. What is its area?',
          choices: [
            { id: 'A', text: '84' },
            { id: 'B', text: '98' },
            { id: 'C', text: '112' },
            { id: 'D', text: '126' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q43', type: 'mcq',
          question: 'If a number is increased by 3 and the result is multiplied by 4, the answer is 28. What is the number?',
          choices: [
            { id: 'A', text: '2' },
            { id: 'B', text: '4' },
            { id: 'C', text: '5' },
            { id: 'D', text: '7' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        {
          id: 'math-q44', type: 'mcq',
          question: 'A jar contains 5 red and 8 green marbles. What is the probability of NOT drawing a red marble?',
          choices: [
            { id: 'A', text: '5/13' },
            { id: 'B', text: '8/13' },
            { id: 'C', text: '3/8' },
            { id: 'D', text: '5/8' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        { id: 'math-q45', type: 'grid_in',
          question: 'What is the value of |−20| + |−4|?',
          correct_answer: '24' } as SHSATGridInQuestion,
        {
          id: 'math-q46', type: 'mcq',
          question: 'Angles A and B are supplementary. Angle A is four times angle B. What is the measure of angle A?',
          choices: [
            { id: 'A', text: '108°' },
            { id: 'B', text: '120°' },
            { id: 'C', text: '135°' },
            { id: 'D', text: '144°' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'D',
        },
        {
          id: 'math-q47', type: 'mcq',
          question: 'A store buys an item for $90 and marks it up 20%. What is the selling price?',
          choices: [
            { id: 'A', text: '$100' },
            { id: 'B', text: '$104' },
            { id: 'C', text: '$108' },
            { id: 'D', text: '$112' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q48', type: 'grid_in',
          question: 'What is the least common multiple (LCM) of 4 and 10?',
          correct_answer: '20' } as SHSATGridInQuestion,

        // ── Very Hard  Q106–Q114 ───────────────────────────────────────────
        {
          id: 'math-q49', type: 'mcq',
          question: 'A number is tripled, then 12 is subtracted, resulting in 42. What is the number?',
          choices: [
            { id: 'A', text: '15' },
            { id: 'B', text: '18' },
            { id: 'C', text: '20' },
            { id: 'D', text: '24' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        { id: 'math-q50', type: 'grid_in', question: 'Solve for x: 6x = 5x + 11', correct_answer: '11' } as SHSATGridInQuestion,
        {
          id: 'math-q51', type: 'mcq',
          question: 'A square has an area of 64. What is its perimeter?',
          choices: [
            { id: 'A', text: '16' },
            { id: 'B', text: '24' },
            { id: 'C', text: '32' },
            { id: 'D', text: '64' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q52', type: 'mcq',
          question: 'If 5 notebooks cost $6.25, how much do 8 notebooks cost?',
          choices: [
            { id: 'A', text: '$8.00' },
            { id: 'B', text: '$9.00' },
            { id: 'C', text: '$10.00' },
            { id: 'D', text: '$11.00' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        { id: 'math-q53', type: 'grid_in', question: 'What is 5² × 2³?', correct_answer: '200' } as SHSATGridInQuestion,
        {
          id: 'math-q54', type: 'mcq',
          question: 'A number is 30% greater than 40. What is it?',
          choices: [
            { id: 'A', text: '48' },
            { id: 'B', text: '50' },
            { id: 'C', text: '52' },
            { id: 'D', text: '54' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'C',
        },
        {
          id: 'math-q55', type: 'mcq',
          question: 'A rectangle\'s length is 3 times its width. If its area is 75, what is the width?',
          choices: [
            { id: 'A', text: '3' },
            { id: 'B', text: '5' },
            { id: 'C', text: '7' },
            { id: 'D', text: '15' },
          ] as [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice],
          correct_answer: 'B',
        },
        { id: 'math-q56', type: 'grid_in', question: 'Solve for x: x/7 = 8', correct_answer: '56' } as SHSATGridInQuestion,
        { id: 'math-q57', type: 'grid_in', question: 'What is 150 − (4 × 8)?', correct_answer: '118' } as SHSATGridInQuestion,
      ],
    },

  ], // end subsections
}
