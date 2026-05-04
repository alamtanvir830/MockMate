/**
 * SHSAT Practice Test B — Form 2
 *
 * Uses the v2 sections[] structure (compatible with PremadeExamTaker).
 * Form 1 uses the newer subsections[] structure (SHSATExamTaker).
 *
 * To edit: update the passages[] and questions[] arrays below.
 * Question numbers are auto-derived at runtime — do not hard-code them.
 */

// Self-contained types — does not import from shsat-form-1
interface SHSATChoice { id: 'A'|'B'|'C'|'D'; text: string }
interface SHSATMCQQuestion {
  id: string; type: 'mcq'; question: string
  choices: [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice]
  correct_answer: 'A'|'B'|'C'|'D'
}
type SHSATQuestion = SHSATMCQQuestion
interface SHSATPassage { id: string; title: string; author?: string; content: string; questions: SHSATQuestion[] }
interface SHSATSection { id: string; number: number; title: string; passages: SHSATPassage[] }
interface SHSATForm { id: string; title: string; description: string; timeLimitMinutes: number; sections: SHSATSection[] }

export const shsatForm2: SHSATForm = {
  id: 'shsat-form-2',
  title: 'SHSAT PRACTICE TEST B - 2025',
  description: 'Specialized High Schools Admissions Test — Practice Form 2',
  timeLimitMinutes: 180,

  sections: [
    {
      id: 'section-2-ela',
      number: 2,
      title: 'English Language Arts',
      passages: [

        // ── Passage 1  (Questions 1–8) ────────────────────────────────────
        {
          id: 'passage-1',
          title: 'The Unseen Light of the Deep',
          content:
            'Deep within the ocean, where sunlight cannot penetrate, an extraordinary phenomenon illuminates the darkness. Bioluminescence — the ability of living organisms to produce and emit light — has evolved independently in dozens of marine species, from microscopic plankton to massive squid. Scientists estimate that more than seventy-six percent of deep-sea creatures possess this remarkable ability, making it one of the most widespread adaptations on Earth.\n\n' +
            'The chemical process behind bioluminescence involves a molecule called luciferin, which reacts with oxygen in the presence of an enzyme called luciferase. This reaction releases energy in the form of photons — particles of light — without generating significant heat. This "cold light" distinguishes bioluminescence from the combustion that powers a torch or candle. For animals in the frigid deep sea, such an efficient light source is essential; generating heat would require far more energy than these organisms can afford.\n\n' +
            'Bioluminescence serves several distinct purposes. Predators such as the anglerfish use a glowing lure dangled in front of their jaws to attract prey in the dark. Creatures such as the bobtail squid use counterillumination — emitting light from their undersides to match the faint glow filtering from the surface — effectively erasing their own shadow and becoming invisible to predators lurking below. Other organisms flash in rhythmic patterns to communicate with potential mates or to startle an attacker long enough to escape.\n\n' +
            'Scientists have harnessed bioluminescent proteins for use in medical research. By tagging cancer cells or bacteria with luciferase genes, researchers can track the spread of disease inside living organisms without surgery. The same glowing proteins help scientists visualize neural activity in the brain, advancing the study of neuroscience.\n\n' +
            'Despite decades of study, researchers continue to discover new bioluminescent species. In 2019, a study published in Scientific Reports revealed that several species of shark, previously assumed to be non-luminescent, could emit a subtle blue-green glow visible only to other sharks. The discovery suggests that bioluminescence plays an even larger role in ocean communication than scientists had previously imagined.',

          questions: [
            {
              id: 'p1q1',
              type: 'mcq',
              question: 'Which statement best expresses the main idea of the passage?',
              choices: [
                { id: 'A', text: 'Bioluminescence is found only in anglerfish and bobtail squid.' },
                { id: 'B', text: 'The chemical process of bioluminescence is too complex for scientific application.' },
                { id: 'C', text: 'Bioluminescence is a widespread and versatile adaptation with important real-world applications.' },
                { id: 'D', text: 'Deep-sea organisms rely entirely on bioluminescence for their survival.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q2',
              type: 'mcq',
              question: 'According to the passage, what distinguishes bioluminescence from other forms of light?',
              choices: [
                { id: 'A', text: 'It requires the simultaneous presence of oxygen and luciferin to function.' },
                { id: 'B', text: 'It produces light without generating significant heat.' },
                { id: 'C', text: 'It can only be observed in deep-sea environments.' },
                { id: 'D', text: 'It relies on combustion rather than a chemical reaction.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q3',
              type: 'mcq',
              question: 'Which detail from the passage best supports the idea that bioluminescence can be used as a defensive strategy?',
              choices: [
                { id: 'A', text: 'The anglerfish dangles a glowing lure to attract prey in the dark.' },
                { id: 'B', text: 'Researchers tag cancer cells with luciferase genes to track disease.' },
                { id: 'C', text: 'The bobtail squid emits light from its underside to erase its own shadow.' },
                { id: 'D', text: 'Scientists discovered glowing sharks in a 2019 study.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q4',
              type: 'mcq',
              question: 'As used in the passage, the word "counterillumination" most nearly means —',
              choices: [
                { id: 'A', text: 'attracting predators with a sudden flash of light' },
                { id: 'B', text: 'emitting light to match the surrounding brightness and avoid detection' },
                { id: 'C', text: 'communicating with potential mates through rhythmic light patterns' },
                { id: 'D', text: 'erasing a shadow by extinguishing all nearby sources of light' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q5',
              type: 'mcq',
              question: 'What can the reader infer about why energy efficiency is critical to deep-sea bioluminescent organisms?',
              choices: [
                { id: 'A', text: 'Deep-sea organisms have evolved to generate large amounts of heat to stay warm.' },
                { id: 'B', text: 'Bioluminescent light is too costly for small organisms to sustain over time.' },
                { id: 'C', text: 'Organisms with limited energy reserves require a light source that does not waste energy on heat.' },
                { id: 'D', text: 'Most deep-sea organisms prefer combustion-based light over cold light.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q6',
              type: 'mcq',
              question: 'The author\'s mention of cancer research in the fourth paragraph primarily serves to —',
              choices: [
                { id: 'A', text: 'argue that bioluminescence is a more important adaptation than previously believed' },
                { id: 'B', text: 'demonstrate that bioluminescent proteins have valuable applications beyond the ocean' },
                { id: 'C', text: 'compare modern medical technology with deep-sea animal behavior' },
                { id: 'D', text: 'explain how luciferase was first identified by scientists' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p1q7',
              type: 'mcq',
              question: 'According to the passage, what made the 2019 study significant?',
              choices: [
                { id: 'A', text: 'It established that more than seventy-six percent of deep-sea creatures use bioluminescence.' },
                { id: 'B', text: 'It demonstrated that bioluminescence evolved simultaneously in dozens of unrelated species.' },
                { id: 'C', text: 'It revealed that certain shark species produce a glow visible only to other sharks.' },
                { id: 'D', text: 'It confirmed that bioluminescence requires both luciferin and luciferase to produce light.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p1q8',
              type: 'mcq',
              question: 'Which word best describes the overall tone of this passage?',
              choices: [
                { id: 'A', text: 'Skeptical' },
                { id: 'B', text: 'Alarmist' },
                { id: 'C', text: 'Informative' },
                { id: 'D', text: 'Melancholic' },
              ],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 2  (Questions 9–16) ───────────────────────────────────
        {
          id: 'passage-2',
          title: 'The Code of the Underground Railroad',
          content:
            'Before the Civil War, enslaved people in the American South risked their lives to flee north toward freedom. A covert network of secret routes, safe houses, and devoted guides — known as the Underground Railroad — helped thousands make this dangerous journey. Though the Underground Railroad was not literally underground, nor was it a railroad, its name captured the secrecy and speed with which freedom seekers moved through the country.\n\n' +
            'Conductors — the name given to those who guided people to safety — depended on coded communication to avoid capture. One of the most celebrated conductors, Harriet Tubman, made approximately thirteen return trips into the South after her own escape in 1849. Tubman and others used spirituals — religious songs — as a means of communicating safe routes and departure times. "Follow the Drinking Gourd" was believed to encode directions using the North Star, which pointed toward free northern states. Scholars continue to debate the extent to which each song contained literal instructions, but the use of veiled language was undeniable.\n\n' +
            'The network relied on the courage of people from many backgrounds. Quakers, free Black Americans, and white abolitionists all served as stationmasters — those who sheltered freedom seekers in barns, basements, and hidden rooms. One of the most active stations was the home of Thomas Garrett in Wilmington, Delaware, who assisted more than 2,700 people in his lifetime. When a court ordered Garrett to pay a ruinous fine for his work, he reportedly replied that he had never intended to break what he considered a law of God, and that he would continue to help anyone who sought his assistance.\n\n' +
            'Reaching free territory did not guarantee safety. The Fugitive Slave Act of 1850 required citizens of free states to assist in capturing and returning freedom seekers to their enslaved condition. As a result, many travelers pushed further north into Canada, where British law prohibited slavery outright. The Underground Railroad extended its routes accordingly, terminating in cities such as Toronto and Montreal.\n\n' +
            'Historians estimate that between 30,000 and 100,000 people used the Underground Railroad between 1810 and 1860. Its legacy shaped the abolitionist movement and contributed to the tensions that would ultimately lead to the Civil War.',

          questions: [
            {
              id: 'p2q1',
              type: 'mcq',
              question: 'Which statement best expresses the central idea of the passage?',
              choices: [
                { id: 'A', text: 'Harriet Tubman was the most important figure in American history.' },
                { id: 'B', text: 'The Underground Railroad was a coordinated network that helped enslaved people reach freedom through courage and coded communication.' },
                { id: 'C', text: 'Spirituals such as "Follow the Drinking Gourd" were the primary tools of the Underground Railroad.' },
                { id: 'D', text: 'The Fugitive Slave Act ultimately made the Underground Railroad unnecessary.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q2',
              type: 'mcq',
              question: 'According to the passage, why did many freedom seekers continue north into Canada after reaching free states?',
              choices: [
                { id: 'A', text: 'Canada offered better economic opportunities than the northern United States.' },
                { id: 'B', text: 'The Underground Railroad\'s established routes ended at the Canadian border.' },
                { id: 'C', text: 'The Fugitive Slave Act required free states to return freedom seekers to slavery.' },
                { id: 'D', text: 'Harriet Tubman personally guided most travelers to Canadian cities.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q3',
              type: 'mcq',
              question: 'As used in the passage, the word "covert" most nearly means —',
              choices: [
                { id: 'A', text: 'dangerous' },
                { id: 'B', text: 'religious' },
                { id: 'C', text: 'secretive' },
                { id: 'D', text: 'organized' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q4',
              type: 'mcq',
              question: 'What does Thomas Garrett\'s response to the court most reveal about his character?',
              choices: [
                { id: 'A', text: 'He regretted his decision to help freedom seekers and feared further legal action.' },
                { id: 'B', text: 'He believed the fine would prevent him from continuing his work on the Railroad.' },
                { id: 'C', text: 'He remained committed to his moral principles despite the legal consequences he faced.' },
                { id: 'D', text: 'He believed that the court had no legitimate authority over his actions.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q5',
              type: 'mcq',
              question: 'Which detail from the passage best supports the idea that the Underground Railroad required cooperation across different groups of people?',
              choices: [
                { id: 'A', text: 'Harriet Tubman made approximately thirteen return trips into the South after her escape.' },
                { id: 'B', text: 'The Fugitive Slave Act of 1850 required citizens to assist in capturing freedom seekers.' },
                { id: 'C', text: 'Quakers, free Black Americans, and white abolitionists all served as stationmasters.' },
                { id: 'D', text: 'Historians estimate that between 30,000 and 100,000 people used the network.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p2q6',
              type: 'mcq',
              question: 'The author places quotation marks around "Follow the Drinking Gourd" most likely to —',
              choices: [
                { id: 'A', text: 'indicate that the title of the spiritual is being referenced directly' },
                { id: 'B', text: 'suggest that the spiritual was not a widely recognized song at the time' },
                { id: 'C', text: 'emphasize that scholars universally doubt the song contained encoded directions' },
                { id: 'D', text: 'show that the song\'s full meaning is too complex to summarize in the passage' },
              ],
              correct_answer: 'A',
            },
            {
              id: 'p2q7',
              type: 'mcq',
              question: 'What can the reader infer about the relationship between the Underground Railroad and the Civil War?',
              choices: [
                { id: 'A', text: 'The Underground Railroad directly caused the Civil War to begin in 1861.' },
                { id: 'B', text: 'The activities of the Underground Railroad contributed to growing national tensions over slavery.' },
                { id: 'C', text: 'Most people who used the Underground Railroad later served as soldiers in the Civil War.' },
                { id: 'D', text: 'The Civil War made the Underground Railroad unnecessary after 1860.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p2q8',
              type: 'mcq',
              question: 'Which word best describes the author\'s attitude toward the participants in the Underground Railroad?',
              choices: [
                { id: 'A', text: 'Neutral' },
                { id: 'B', text: 'Disapproving' },
                { id: 'C', text: 'Admiring' },
                { id: 'D', text: 'Pitying' },
              ],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 3  (Questions 17–24) ──────────────────────────────────
        {
          id: 'passage-3',
          title: 'The Last Day on the Mountain',
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
              id: 'p3q1',
              type: 'mcq',
              question: 'Which statement best describes the central conflict of this passage?',
              choices: [
                { id: 'A', text: 'Nina and Marcus disagree about whether the family should continue hiking toward the summit.' },
                { id: 'B', text: 'Nina hoped the hike would reconnect her family, but Marcus remains emotionally distant.' },
                { id: 'C', text: 'Marcus is resentful that Nina persuaded him to take time away from his college preparations.' },
                { id: 'D', text: 'The family struggles to navigate a challenging and unfamiliar trail.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q2',
              type: 'mcq',
              question: 'What can the reader infer about Marcus\'s emotional state throughout the hike?',
              choices: [
                { id: 'A', text: 'He is excited about starting college and eager to return home to finish packing.' },
                { id: 'B', text: 'He resents Nina for arranging the hike without consulting him first.' },
                { id: 'C', text: 'He is mentally preoccupied with his future and feels disconnected from the present moment.' },
                { id: 'D', text: 'He is physically exhausted and struggling to keep pace with the rest of the family.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q3',
              type: 'mcq',
              question: 'The phrase "eyes fixed on a distance that had nothing to do with geography" suggests that Marcus is —',
              choices: [
                { id: 'A', text: 'struggling to see the view clearly because of the sunlight' },
                { id: 'B', text: 'focused on a specific memory from a previous hike in the same area' },
                { id: 'C', text: 'mentally absorbed in thought rather than present with his surroundings' },
                { id: 'D', text: 'deliberately ignoring the scenery to signal his anger at his family' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q4',
              type: 'mcq',
              question: 'Which detail from the passage best suggests that Nina feels uncertain about her decision to plan the hike?',
              choices: [
                { id: 'A', text: '"The view was breathtaking — a carpet of green and gold rolling toward the horizon."' },
                { id: 'B', text: '"She had spent the better part of the spring convincing her older brother Marcus."' },
                { id: 'C', text: '"Now, as they paused at the crest of a ridge, she was no longer sure she had made the right choice."' },
                { id: 'D', text: '"\'Yeah,\' Marcus said, without turning around."' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q5',
              type: 'mcq',
              question: 'The image of the lake flashing "brilliant and brief" at the end of the passage most likely represents —',
              choices: [
                { id: 'A', text: 'an approaching thunderstorm that threatens the family\'s safety' },
                { id: 'B', text: 'a fleeting moment of beauty or connection that quickly disappears' },
                { id: 'C', text: 'the light Marcus has been searching for throughout the hike' },
                { id: 'D', text: 'the family\'s shared triumph at finally reaching the summit together' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p3q6',
              type: 'mcq',
              question: 'What was Nina\'s original expectation for the hike?',
              choices: [
                { id: 'A', text: 'That it would give Marcus time to complete the logistics of preparing for college.' },
                { id: 'B', text: 'That it would give the family an opportunity to discuss Marcus\'s plans for the future.' },
                { id: 'C', text: 'That it would be a joyful, bonding experience filled with laughter and shared memories.' },
                { id: 'D', text: 'That it would prove to Marcus he was not yet ready to leave home for college.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q7',
              type: 'mcq',
              question: 'Why does the author choose to present the story primarily from Nina\'s perspective rather than Marcus\'s?',
              choices: [
                { id: 'A', text: 'To suggest that Marcus\'s feelings are less important to the story than Nina\'s.' },
                { id: 'B', text: 'To create suspense by focusing the reader\'s attention on the physical trail.' },
                { id: 'C', text: 'To show Marcus as inaccessible — the reader, like Nina, cannot fully know what he is feeling.' },
                { id: 'D', text: 'To indicate that Marcus is intentionally keeping his thoughts secret from the family.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p3q8',
              type: 'mcq',
              question: 'Which word best describes the overall mood of this passage?',
              choices: [
                { id: 'A', text: 'Joyful' },
                { id: 'B', text: 'Suspenseful' },
                { id: 'C', text: 'Melancholic' },
                { id: 'D', text: 'Humorous' },
              ],
              correct_answer: 'C',
            },
          ],
        },

        // ── Passage 4  (Questions 25–32) ──────────────────────────────────
        {
          id: 'passage-4',
          title: 'Clay',
          content:
            'Clay had learned to read weather the same way he read people — slowly, carefully, with a deep distrust of whatever appeared on the surface. The morning of his grandfather\'s funeral, he stood on the back porch and watched the sky shift from pewter to slate, the clouds building in slow columns above the ridge. A red-tailed hawk circled once and was gone.\n\n' +
            'He had not cried. He understood, distantly, that this was what people expected of him — the wet face, the crumpled expression, the visible performance of grief. But Clay\'s feelings did not work that way. They arrived late, like a delayed train, and settled in places he hadn\'t anticipated: the tightness in his jaw when he saw his grandfather\'s boots by the back door, the way his breath caught when he opened the shed and smelled wood shavings and motor oil.\n\n' +
            'Inside the house, relatives moved through the kitchen with plates and quiet voices. Clay had stood among them for a time, receiving their embraces and their careful words. But the comfort they offered landed on the outside of him, unable to find a way in.\n\n' +
            'He stepped back onto the porch and stayed there while the first drops of rain stippled the dust in the yard. His grandfather had built this porch. Had planed each board smooth with hands that Clay had watched for years — wide, patient hands that never rushed. Clay pressed his palm flat against the railing and felt the grain of the wood beneath his fingers, the slight roughness where the paint had begun to peel at the corner post.\n\n' +
            'The rain came harder. Clay did not move. There was something clean about standing in it — about letting the cold water flatten his hair and dampen his shirt — as though the sky had given him permission to feel something without having to name it.',

          questions: [
            {
              id: 'p4q1',
              type: 'mcq',
              question: 'Which sentence best describes Clay\'s emotional state at the beginning of the passage?',
              choices: [
                { id: 'A', text: 'He is openly grief-stricken and struggling to compose himself in front of his relatives.' },
                { id: 'B', text: 'He feels nothing and is largely indifferent to his grandfather\'s death.' },
                { id: 'C', text: 'He experiences grief in a private, internal way that does not match outward expectations.' },
                { id: 'D', text: 'He is angry at his relatives for gathering at the house after the funeral.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p4q2',
              type: 'mcq',
              question: 'What does the detail about his grandfather\'s boots by the back door most reveal about Clay?',
              choices: [
                { id: 'A', text: 'He is preoccupied with the practical task of deciding what to do with his grandfather\'s belongings.' },
                { id: 'B', text: 'Small, specific objects trigger his grief more powerfully than formal expressions of mourning.' },
                { id: 'C', text: 'He finds it too painful to remain inside the house with his relatives.' },
                { id: 'D', text: 'He is trying to commit everything his grandfather ever owned to memory.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q3',
              type: 'mcq',
              question: 'Why does the author avoid dialogue in this passage?',
              choices: [
                { id: 'A', text: 'To suggest that Clay is unable to communicate meaningfully with the people around him.' },
                { id: 'B', text: 'To convey that the relatives are speaking too softly to be overheard.' },
                { id: 'C', text: 'To keep the reader inside Clay\'s private, interior experience rather than his external interactions.' },
                { id: 'D', text: 'To indicate that there is nothing meaningful left to say after a funeral.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p4q4',
              type: 'mcq',
              question: 'The phrase "the comfort they offered landed on the outside of him, unable to find a way in" most likely means —',
              choices: [
                { id: 'A', text: 'Clay could not hear what his relatives were saying to him.' },
                { id: 'B', text: 'Clay found his relatives\'s words dismissive and unhelpful.' },
                { id: 'C', text: 'The sympathy of others could not reach Clay\'s deeper emotional state.' },
                { id: 'D', text: 'Clay was physically uncomfortable being embraced by so many people at once.' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p4q5',
              type: 'mcq',
              question: 'What can the reader infer about Clay\'s relationship with his grandfather based on the passage?',
              choices: [
                { id: 'A', text: 'Their relationship was distant and rarely involved shared physical work.' },
                { id: 'B', text: 'Clay admired his grandfather and holds specific, tangible memories of him.' },
                { id: 'C', text: 'Clay regrets that he never devoted enough time to his grandfather while he was alive.' },
                { id: 'D', text: 'Clay and his grandfather frequently disagreed about how tasks should be done.' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q6',
              type: 'mcq',
              question: 'The image of Clay pressing his palm against the porch railing primarily serves to —',
              choices: [
                { id: 'A', text: 'show that Clay is checking whether the structure his grandfather built needs repair' },
                { id: 'B', text: 'suggest that Clay connects to his grandfather through a physical object his grandfather made' },
                { id: 'C', text: 'demonstrate that Clay is about to leave the porch and return inside to his relatives' },
                { id: 'D', text: 'indicate that Clay distrusts the quality of the construction' },
              ],
              correct_answer: 'B',
            },
            {
              id: 'p4q7',
              type: 'mcq',
              question: 'Which detail from the passage best suggests that standing in the rain provides Clay with a sense of relief?',
              choices: [
                { id: 'A', text: '"The morning of his grandfather\'s funeral, he stood on the back porch."' },
                { id: 'B', text: '"A red-tailed hawk circled once and was gone."' },
                { id: 'C', text: '"There was something clean about standing in it...as though the sky had given him permission to feel something without having to name it."' },
                { id: 'D', text: '"His grandfather had built this porch."' },
              ],
              correct_answer: 'C',
            },
            {
              id: 'p4q8',
              type: 'mcq',
              question: 'Which statement best describes the author\'s purpose in this passage?',
              choices: [
                { id: 'A', text: 'To argue that people should express grief openly rather than privately.' },
                { id: 'B', text: 'To describe the customs and rituals typically associated with funerals.' },
                { id: 'C', text: 'To explore the inner emotional experience of a character who grieves in an unconventional way.' },
                { id: 'D', text: 'To contrast Clay\'s personality with that of his more expressive relatives.' },
              ],
              correct_answer: 'C',
            },
          ],
        },

      ], // end passages
    },   // end section 2
  ],     // end sections
}
