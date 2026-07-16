import type { VideoConfig } from '@/lib/academy/videos/types'

export const config: VideoConfig = {
  videoKey: 'boundaries-complete-sentences',
  lessonSlug: 'boundaries',
  skillSlug: 'boundaries',
  subskillSlug: 'complete-sentences-independent-clauses',
  title: 'Complete Sentences and Independent Clauses',
  description:
    'Learn what makes a sentence complete, how to identify an independent clause, and why every SAT punctuation decision depends on this skill.',
  estimatedDurationSeconds: 235,
  scriptVersion: 1,
  videoVersion: 1,
  narrationProvider: 'elevenlabs',
  narrationVoiceId: process.env.ELEVENLABS_VOICE_ID ?? '',
  captionsPath: './captions.vtt',
  transcriptPath: './transcript.md',
  storyboardPath: './storyboard.ts',
  originalContentConfirmed: true,
  scenes: [
    {
      id: 'scene-01-title',
      startSeconds: 0,
      durationSeconds: 15,
      narration:
        'In this lesson, we will cover one of the most fundamental grammar concepts on the SAT: the complete sentence. Understanding what makes a sentence complete is the key to every punctuation question in the Boundaries category.',
      onScreenLines: [
        'Complete Sentences',
        'and Independent Clauses',
        'Writing Skills · Boundaries',
      ],
    },
    {
      id: 'scene-02-definition',
      startSeconds: 15,
      durationSeconds: 35,
      narration:
        'A complete sentence must have three things. First, a subject — the noun or pronoun that performs or receives the action. Second, a finite verb — a verb that shows tense, such as runs, ran, or has run. And third, a complete thought — the sentence must not leave the reader expecting more information.',
      onScreenLines: [
        'A complete sentence requires:',
        '① A subject',
        '② A finite verb',
        '③ A complete thought',
      ],
      highlights: ['subject', 'finite verb', 'complete thought'],
    },
    {
      id: 'scene-03-independent-clause',
      startSeconds: 50,
      durationSeconds: 35,
      narration:
        'When a complete sentence can stand on its own — when it does not depend on another clause to make sense — we call it an independent clause. Look at this example: The engineers tested the new prototype. The word engineers is the subject. Tested is the finite verb. And the thought is complete. This is an independent clause.',
      onScreenLines: [
        'The engineers tested the new prototype.',
        '',
        'engineers → subject',
        'tested → finite verb',
        '✓ Can stand alone = independent clause',
      ],
      highlights: ['engineers', 'tested'],
      annotations: ['subject', 'finite verb'],
    },
    {
      id: 'scene-04-standalone-test',
      startSeconds: 85,
      durationSeconds: 30,
      narration:
        "Here is a reliable test you can use on the SAT. Cover the clause you are evaluating. Read it on its own. If it can stand alone as a complete sentence, it is an independent clause. If it cannot — if it sounds unfinished or begins with a word like although, because, or since — it is a dependent clause or a fragment.",
      onScreenLines: [
        'The standalone test:',
        'Cover the clause. Can it stand alone?',
        '',
        'YES → Independent clause',
        'NO  → Dependent clause or fragment',
      ],
    },
    {
      id: 'scene-05-fragment-vs-complete',
      startSeconds: 115,
      durationSeconds: 35,
      narration:
        "Compare these two examples. The first begins with the word although. Because of that word, the clause is dependent. It sounds unfinished — we are waiting for the other half of the sentence. This is a fragment. The second example removes although, and now the clause stands alone perfectly. It is a complete sentence.",
      onScreenLines: [
        '✗ Although the researchers gathered data.',
        '   ↑ subordinating conjunction → dependent clause (fragment)',
        '',
        '✓ The researchers gathered data.',
        '   ↑ no subordinating word → complete sentence',
      ],
      highlights: ['Although', 'gathered'],
    },
    {
      id: 'scene-06-punctuation',
      startSeconds: 150,
      durationSeconds: 30,
      narration:
        'When two independent clauses appear together, the SAT expects you to punctuate them correctly. You have three valid options: a period, a semicolon, or a comma followed by a coordinating conjunction — for, and, nor, but, or, yet, or so. Here, a period or a semicolon correctly separates these two complete sentences.',
      onScreenLines: [
        'The engineers tested the prototype.',
        'They recorded their findings in a shared database.',
        '',
        'To join two independent clauses, use:',
        '• Period     • Semicolon     • Comma + FANBOYS',
      ],
      highlights: ['.', ';', ', and'],
    },
    {
      id: 'scene-07-comma-splice',
      startSeconds: 180,
      durationSeconds: 30,
      narration:
        'The most common mistake students make is the comma splice. This happens when a comma alone connects two independent clauses. A comma by itself is not strong enough to join two complete sentences. If you see a comma separating two full sentences on the SAT, that answer choice is wrong.',
      onScreenLines: [
        '✗ The engineers tested the prototype, they recorded their findings.',
        '',
        'Comma splice:',
        'A comma alone cannot join two independent clauses.',
      ],
      highlights: [','],
    },
    {
      id: 'scene-08-summary',
      startSeconds: 210,
      durationSeconds: 25,
      narration:
        'Here is your takeaway. Before you choose any punctuation answer on the SAT, identify both clauses. Test each one: can it stand alone as a complete sentence? Once you know which clauses are independent, the correct punctuation follows the rule. Every Boundaries decision starts with identifying complete sentences.',
      onScreenLines: [
        'Before choosing punctuation:',
        '① Identify both clauses',
        '② Test each one — can it stand alone?',
        '③ Apply the correct punctuation',
        '',
        'Every Boundaries decision starts with identifying complete sentences.',
      ],
    },
  ],
}
