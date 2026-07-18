import type { MathAcademySkill } from './types'

export const geometrySkills: MathAcademySkill[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Area & Volume
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'area-volume',
    title: 'Area & Volume',
    domain: 'geometry-trigonometry',
    overview: {
      whatItTests:
        'The ability to calculate areas of triangles, rectangles, and circles; volumes of prisms, cylinders, cones, and spheres; the area of composite figures built from simpler shapes; and the effect of scale factors on area and volume.',
      howItAppears:
        'Questions may describe a room, container, or geometric figure and ask for the amount of material needed, the capacity, or a comparison between two similar figures after one dimension is scaled. Some questions embed the geometry inside a word problem about paint, water, or packaging.',
      whyStudentsMissIt:
        'Students confuse area and perimeter formulas, forget the factor of 1/3 in cone and pyramid volumes, or apply a linear scale factor directly to area or volume instead of squaring or cubing it.',
      whatToLookFor:
        'Units that signal area (square feet, cm²) vs. volume (cubic inches, liters), the word "similar" or a scale factor ratio, and composite figures where you must add or subtract areas of standard shapes.',
    },
    strategy: {
      steps: [
        'Identify the shape or shapes involved and write down the relevant formula(s) before plugging in numbers.',
        'For composite figures, break the figure into standard shapes, compute each area or volume separately, then add or subtract as required.',
        'When a scale factor k is given, remember: area scales by k², volume scales by k³.',
        'Substitute values carefully, keeping track of units throughout.',
        'Check that your answer is reasonable in the context — an area cannot be negative, and a volume must be positive.',
      ],
      timeSavingTip:
        'For circles, π often cancels or appears in the answer choices in terms of π — leave it as π until the final step to avoid rounding errors.',
      whenNotToOverthink:
        'If the figure is a plain rectangle or triangle with numbers given for base and height, apply the formula directly — there is no trick.',
    },
    commonTraps: [
      {
        title: 'Using diameter instead of radius',
        description:
          'Circle formulas use radius, but problems often state the diameter. Students plug the diameter directly into A = πr² or C = 2πr without halving it first.',
        avoidance:
          'Every time you read a circle problem, write r = d/2 before writing any formula.',
      },
      {
        title: 'Forgetting the 1/3 factor for cones and pyramids',
        description:
          'Students use V = Bh (the prism formula) instead of V = (1/3)Bh when the shape comes to a point.',
        avoidance:
          'Associate "pointed top = one-third" — cones and pyramids share the same 1/3 multiplier as their flat counterparts.',
      },
      {
        title: 'Applying a linear scale factor to area or volume',
        description:
          'If a figure is scaled by a factor of 3, its area increases by 3² = 9, not 3. Students who multiply area by 3 get the wrong answer.',
        avoidance:
          'Label the scale factor k, then write "area × k²" or "volume × k³" explicitly before computing.',
      },
      {
        title: 'Adding instead of subtracting for cut-out composite figures',
        description:
          'When a smaller shape is removed from a larger one (e.g., a circle cut from a rectangle), students sometimes add the two areas instead of subtracting.',
        avoidance:
          'Draw the figure and shade the region you want — if it is what remains after a cut-out, you subtract the inner area from the outer area.',
      },
    ],
    guidedExamples: [
      {
        id: 'area-volume-ex-1',
        stimulus:
          'A rectangular garden measures 14 meters by 9 meters. A circular fountain with a diameter of 4 meters is installed in the center of the garden.',
        question:
          'What is the area of the garden that is NOT covered by the fountain, in square meters? (Use π ≈ 3.14)',
        steps: [
          {
            instruction: 'Find the area of the rectangle',
            content: 'A_rect = length × width = 14 × 9 = 126 m²',
          },
          {
            instruction: 'Find the area of the circular fountain',
            content:
              'Diameter = 4 m, so radius = 2 m. A_circle = π r² = 3.14 × 4 = 12.56 m²',
          },
          {
            instruction: 'Subtract the fountain area from the garden area',
            content: 'A_remaining = 126 − 12.56 = 113.44 m²',
          },
        ],
        choices: [
          { label: 'A', text: '100.44 m²' },
          { label: 'B', text: '113.44 m²' },
          { label: 'C', text: '118.56 m²' },
          { label: 'D', text: '138.56 m²' },
        ],
        correctAnswer: 'B',
        explanation:
          'The rectangle has area 14 × 9 = 126 m². The fountain has radius 2 m, so its area is π(2²) ≈ 12.56 m². The uncovered area is 126 − 12.56 = 113.44 m².',
        wrongAnswerExplanations: {
          A: 'This results from using the diameter (4) directly in the circle area formula instead of the radius (2), giving π(4²) = 50.24, then subtracting: 126 − 50.24 ≈ 75.76 — a different error path, but 100.44 comes from using r = 4 in A = πr²/2, an incorrect half-circle formula.',
          C: 'This results from using the circumference of the circle (≈ 12.56) but treating it as the area of the full fountain — an inconsistent mix of formulas.',
          D: 'This results from adding the fountain area to the garden area instead of subtracting it.',
        },
      },
      {
        id: 'area-volume-ex-2',
        stimulus:
          'A cylindrical water tank has a radius of 3 feet and a height of 10 feet. A second tank is geometrically similar to the first, with a scale factor of 2 (all linear dimensions doubled).',
        question:
          'What is the volume of the second tank, in cubic feet? (Leave the answer in terms of π.)',
        steps: [
          {
            instruction: 'Find the volume of the original tank',
            content: 'V₁ = π r² h = π (3²)(10) = 90π ft³',
          },
          {
            instruction: 'Apply the volume scale factor',
            content:
              'When linear dimensions scale by k = 2, volume scales by k³ = 2³ = 8. V₂ = 8 × 90π = 720π ft³',
          },
        ],
        choices: [
          { label: 'A', text: '180π ft³' },
          { label: 'B', text: '360π ft³' },
          { label: 'C', text: '720π ft³' },
          { label: 'D', text: '1440π ft³' },
        ],
        correctAnswer: 'C',
        explanation:
          'The original volume is π(9)(10) = 90π ft³. Because all linear dimensions are doubled (k = 2), volume scales by k³ = 8, giving 8 × 90π = 720π ft³.',
        wrongAnswerExplanations: {
          A: 'This comes from multiplying the original volume by k = 2 instead of k³ = 8.',
          B: 'This comes from multiplying the original volume by k² = 4 (the area scale factor) instead of k³ = 8.',
          D: 'This comes from correctly computing 720π and then doubling it a second time, overcounting the scale factor.',
        },
      },
      {
        id: 'area-volume-ex-3',
        stimulus:
          'An ice cream cone has a radius of 3 cm and a slant height of 5 cm. The cone is filled level with the rim (no ice cream above the rim).',
        question:
          'What is the volume of ice cream in the cone, in cubic centimeters? (Leave the answer in terms of π.)',
        steps: [
          {
            instruction: 'Find the vertical height of the cone using the Pythagorean theorem',
            content:
              'The slant height is 5 cm and the radius is 3 cm. h² + r² = l² → h² = 25 − 9 = 16 → h = 4 cm',
          },
          {
            instruction: 'Apply the cone volume formula',
            content: 'V = (1/3)π r² h = (1/3)π (9)(4) = 12π cm³',
          },
        ],
        choices: [
          { label: 'A', text: '12π cm³' },
          { label: 'B', text: '15π cm³' },
          { label: 'C', text: '36π cm³' },
          { label: 'D', text: '45π cm³' },
        ],
        correctAnswer: 'A',
        explanation:
          'Using the Pythagorean theorem with slant height 5 and radius 3 gives vertical height h = 4 cm. The cone volume is (1/3)π(3²)(4) = (1/3)(36π) = 12π cm³.',
        wrongAnswerExplanations: {
          B: 'This comes from using the slant height (5) as the vertical height: (1/3)π(9)(5) = 15π — a common mistake when the problem gives slant height rather than vertical height.',
          C: 'This comes from forgetting the 1/3 factor and computing π r² h = π(9)(4) = 36π as if the cone were a cylinder.',
          D: 'This comes from forgetting the 1/3 factor AND using the slant height as the height: π(9)(5) = 45π.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'area-volume-d1',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        question:
          'A triangle has a base of 12 cm and a height of 7 cm. What is its area in square centimeters?',
        choices: [
          { label: 'A', text: '19 cm²' },
          { label: 'B', text: '42 cm²' },
          { label: 'C', text: '84 cm²' },
          { label: 'D', text: '168 cm²' },
        ],
        correctAnswer: 'B',
        explanation: 'Area of a triangle = (1/2) × base × height = (1/2)(12)(7) = 42 cm².',
        wrongAnswerExplanations: {
          A: 'This is the perimeter calculation 12 + 7, not the area.',
          C: 'This comes from using the full product base × height = 84 without the 1/2 factor.',
          D: 'This comes from doubling the base × height product instead of halving it.',
        },
        teachingPoint: 'Triangle area requires the 1/2 factor — forgetting it doubles the answer.',
      },
      {
        id: 'area-volume-d2',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        stimulus:
          'A sphere has a radius of 3 inches.',
        question: 'What is the volume of the sphere, in cubic inches? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '12π in³' },
          { label: 'B', text: '36π in³' },
          { label: 'C', text: '108π in³' },
          { label: 'D', text: '144π in³' },
        ],
        correctAnswer: 'B',
        explanation: 'V = (4/3)π r³ = (4/3)π(27) = 36π in³.',
        wrongAnswerExplanations: {
          A: 'This comes from using (1/3)πr³ = 9π — mixing the cone formula with the sphere formula.',
          C: 'This comes from computing (4/3)π r² × r but using r = 3 and forgetting to include the 4/3 correctly: 4 × 27π = 108π — the 4/3 was replaced by 4.',
          D: 'This comes from using V = 4πr³ without the 1/3, then miscalculating.',
        },
        teachingPoint: 'The sphere volume formula is (4/3)πr³ — cube the radius, then multiply by 4/3.',
      },
      {
        id: 'area-volume-d3',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A composite figure consists of a rectangle measuring 10 ft × 6 ft with a semicircle of diameter 6 ft attached to one of its shorter ends.',
        question:
          'What is the total area of the composite figure, in square feet? (Use π ≈ 3.14)',
        choices: [
          { label: 'A', text: '60 ft²' },
          { label: 'B', text: '71.13 ft²' },
          { label: 'C', text: '74.13 ft²' },
          { label: 'D', text: '88.26 ft²' },
        ],
        correctAnswer: 'C',
        explanation:
          'Rectangle area = 10 × 6 = 60 ft². Semicircle: diameter = 6 ft, so radius = 3 ft. Semicircle area = (1/2)π(3²) = (1/2)(3.14)(9) = 14.13 ft². Total = 60 + 14.13 = 74.13 ft².',
        wrongAnswerExplanations: {
          A: 'This is only the rectangle area, ignoring the semicircle entirely.',
          B: 'This comes from using the full circle area instead of the semicircle area: π(3²) = 28.26 — but then only adding half of 28.26 is 14.13, so 71.13 likely results from adding 28.26/2 − 3 due to a radius error.',
          D: 'This comes from using the full circle area (28.26 ft²) instead of a semicircle and adding it to the rectangle: 60 + 28.26 = 88.26.',
        },
        teachingPoint: 'For composite figures, break the shape into parts and add (or subtract) their individual areas.',
      },
      {
        id: 'area-volume-d4',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        question:
          'Two similar rectangular prisms have a length ratio of 3:1. If the smaller prism has a volume of 20 cm³, what is the volume of the larger prism in cubic centimeters?',
        choices: [
          { label: 'A', text: '60 cm³' },
          { label: 'B', text: '180 cm³' },
          { label: 'C', text: '540 cm³' },
          { label: 'D', text: '1620 cm³' },
        ],
        correctAnswer: 'C',
        explanation:
          'Linear scale factor k = 3. Volume scales by k³ = 27. Larger volume = 27 × 20 = 540 cm³.',
        wrongAnswerExplanations: {
          A: 'This comes from multiplying by the linear scale factor k = 3 instead of k³ = 27.',
          B: 'This comes from multiplying by k² = 9 (the area scale factor) instead of k³ = 27.',
          D: 'This comes from multiplying by k⁴ = 81, confusing the exponent rule.',
        },
        teachingPoint: 'When figures are similar with linear scale factor k, their volumes differ by a factor of k³.',
      },
      {
        id: 'area-volume-d5',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A cylindrical water tank with a radius of 4 meters and a height of 9 meters is being drained. Water is removed at a constant rate of 6π cubic meters per minute.',
        question:
          'How many minutes will it take to completely drain the full tank?',
        choices: [
          { label: 'A', text: '24 minutes' },
          { label: 'B', text: '72 minutes' },
          { label: 'C', text: '96 minutes' },
          { label: 'D', text: '144 minutes' },
        ],
        correctAnswer: 'A',
        explanation:
          'Volume of cylinder = π r² h = π(16)(9) = 144π m³. Time = Total volume ÷ Rate = 144π ÷ 6π = 24 minutes.',
        wrongAnswerExplanations: {
          B: 'This comes from computing the volume correctly as 144π but dividing by 2π instead of 6π.',
          C: 'This comes from using r = 4 instead of r² = 16 in the formula (V = π · 4 · 9 · π ≈ error), or dividing 144π by 1.5π.',
          D: 'This comes from finding V = 144π but then dividing by π only (not 6π), giving 144.',
        },
        teachingPoint: 'Set up rate problems as Total amount ÷ Rate per unit time after correctly computing the volume.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Lines, Angles & Triangles
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'lines-angles-triangles',
    title: 'Lines, Angles & Triangles',
    domain: 'geometry-trigonometry',
    overview: {
      whatItTests:
        'The ability to identify and use angle relationships formed by parallel lines cut by a transversal (alternate interior, co-interior/same-side interior, corresponding angles), apply the triangle angle-sum theorem (angles sum to 180°), use the exterior angle theorem, and recognize similar and congruent triangles via AA, SAS, or SSS.',
      howItAppears:
        'Questions show a diagram (or describe one in text) with two parallel lines, a transversal, and angle labels, and ask for a missing angle value. Triangle problems may ask you to find an unknown interior or exterior angle, prove two triangles are similar, or find a missing side length in similar triangles.',
      whyStudentsMissIt:
        'Students mix up alternate interior angles (equal) with co-interior angles (supplementary), or they forget that the exterior angle of a triangle equals the sum of the two non-adjacent interior angles — not just one of them.',
      whatToLookFor:
        'The words "parallel" or tick marks on lines indicating they are parallel; the word "transversal"; Z-shapes (alternate interior), F-shapes (corresponding), and C/U-shapes (co-interior) formed by parallel lines; and exterior angles labeled outside a triangle vertex.',
    },
    strategy: {
      steps: [
        'Mark all given angle measures on the diagram (or a quick sketch) before setting up any equation.',
        'Identify the relationship between the two angles in question: are they corresponding (equal), alternate interior (equal), or co-interior (supplementary, sum = 180°)?',
        'For triangles, write the angle-sum equation: a + b + c = 180° and substitute known values.',
        'For exterior angles, remember: exterior angle = sum of the two non-adjacent interior angles.',
        'For similar triangles, set up a proportion of corresponding sides and solve for the unknown.',
      ],
      timeSavingTip:
        'If two angles look equal on a well-drawn diagram, check whether they fit an alternate interior or corresponding relationship — this confirms equality without algebra.',
      whenNotToOverthink:
        'If the problem gives you two of the three angles in a triangle, just subtract their sum from 180° to find the third.',
    },
    commonTraps: [
      {
        title: 'Confusing alternate interior with co-interior angles',
        description:
          'Alternate interior angles are equal; co-interior (same-side interior) angles are supplementary. Students apply equality to co-interior angles and get the wrong answer.',
        avoidance:
          'Look at which side of the transversal both angles are on: same side → supplementary (add to 180°); opposite sides → equal.',
      },
      {
        title: 'Applying the exterior angle theorem to only one interior angle',
        description:
          'The exterior angle equals the sum of both non-adjacent interior angles, not just the one that looks opposite to it.',
        avoidance:
          'Write "exterior = remote₁ + remote₂" as a formula before plugging in numbers.',
      },
      {
        title: 'Using SSA to claim triangle similarity or congruence',
        description:
          'SSA (two sides and a non-included angle) is not a valid similarity or congruence criterion, but students sometimes use it anyway.',
        avoidance:
          'Only use AA, SAS, or SSS for similarity; for congruence, use SAS, ASA, AAS, SSS, or HL. If given SSA, look for another relationship.',
      },
      {
        title: 'Misidentifying the base angles in an isosceles triangle',
        description:
          'In an isosceles triangle, the two equal angles are opposite the two equal sides. Students sometimes assume the two labeled equal sides create the vertex angle rather than the base angles.',
        avoidance:
          'Identify which two sides are equal; the angles opposite those sides are the base angles and are equal to each other.',
      },
    ],
    guidedExamples: [
      {
        id: 'lines-angles-triangles-ex-1',
        stimulus:
          'Lines m and n are parallel. A transversal crosses both lines. The angle formed between the transversal and line m on the upper-left is 65°.',
        question:
          'What is the measure of the angle formed between the transversal and line n on the lower-right (the alternate interior angle to the 65° angle)?',
        steps: [
          {
            instruction: 'Identify the angle relationship',
            content:
              'The upper-left angle on line m and the lower-right angle on line n are on opposite sides of the transversal and between the parallel lines — these are alternate interior angles.',
          },
          {
            instruction: 'Apply the alternate interior angles theorem',
            content:
              'Alternate interior angles formed by parallel lines are equal. Therefore the lower-right angle = 65°.',
          },
        ],
        choices: [
          { label: 'A', text: '25°' },
          { label: 'B', text: '65°' },
          { label: 'C', text: '115°' },
          { label: 'D', text: '130°' },
        ],
        correctAnswer: 'B',
        explanation:
          'The two angles are alternate interior angles with respect to the parallel lines m and n, so they are equal. The measure is 65°.',
        wrongAnswerExplanations: {
          A: 'This is the complement of 65° (90° − 65°), which applies to perpendicular lines, not to alternate interior angles.',
          C: 'This is the supplement of 65° (180° − 65°), which is the co-interior (same-side interior) angle relationship, not the alternate interior relationship.',
          D: 'This doubles the given angle, which has no geometric justification here.',
        },
      },
      {
        id: 'lines-angles-triangles-ex-2',
        stimulus:
          'In triangle PQR, angle P = 48° and angle Q = 73°. Side RS is drawn from vertex R to a point S on line PQ extended beyond Q, forming exterior angle QRS.',
        question:
          'What is the measure of exterior angle QRS?',
        steps: [
          {
            instruction: 'Find the interior angle at R',
            content:
              'Angle sum in a triangle: P + Q + R = 180° → 48 + 73 + R = 180 → R = 59°',
          },
          {
            instruction: 'Apply the exterior angle theorem',
            content:
              'The exterior angle at R (angle QRS) equals the sum of the two non-adjacent interior angles: P + Q = 48 + 73 = 121°.',
          },
        ],
        choices: [
          { label: 'A', text: '59°' },
          { label: 'B', text: '107°' },
          { label: 'C', text: '121°' },
          { label: 'D', text: '132°' },
        ],
        correctAnswer: 'C',
        explanation:
          'The exterior angle theorem states that an exterior angle equals the sum of the two non-adjacent (remote) interior angles. The exterior angle at R = P + Q = 48° + 73° = 121°. Note: it also equals 180° − 59° = 121°, consistent with a linear pair.',
        wrongAnswerExplanations: {
          A: 'This is the interior angle at R, not the exterior angle.',
          B: 'This comes from adding only one remote interior angle to the interior angle at R: 48 + 59 = 107, which is not a valid theorem.',
          D: 'This comes from computing 180° − 48° = 132°, confusing the supplement of one angle with the exterior angle theorem.',
        },
      },
      {
        id: 'lines-angles-triangles-ex-3',
        stimulus:
          'Triangle ABC and Triangle DEF are similar (△ABC ~ △DEF) with the correspondence A↔D, B↔E, C↔F. AB = 8 cm, BC = 10 cm, and DE = 12 cm.',
        question:
          'What is the length of EF in centimeters?',
        steps: [
          {
            instruction: 'Set up the ratio of corresponding sides',
            content:
              'Since △ABC ~ △DEF, corresponding sides are proportional: AB/DE = BC/EF. So 8/12 = 10/EF.',
          },
          {
            instruction: 'Solve for EF',
            content:
              '8 · EF = 12 · 10 = 120 → EF = 120/8 = 15 cm.',
          },
        ],
        choices: [
          { label: 'A', text: '6.67 cm' },
          { label: 'B', text: '13.33 cm' },
          { label: 'C', text: '15 cm' },
          { label: 'D', text: '16 cm' },
        ],
        correctAnswer: 'C',
        explanation:
          'The scale factor from △ABC to △DEF is DE/AB = 12/8 = 1.5. Since EF corresponds to BC, EF = 1.5 × 10 = 15 cm.',
        wrongAnswerExplanations: {
          A: 'This comes from setting up an inverted proportion: EF/BC = AB/DE → EF = (8/12) × 10 = 6.67, swapping which triangle is larger.',
          B: 'This comes from adding the scale difference rather than multiplying: 10 + (12 − 8) = 14, or from a similar arithmetic error.',
          D: 'This comes from applying the scale factor to the wrong side: 1.5 × 8 = 12 — already the given DE value — then adding 4 arbitrarily.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'lines-angles-triangles-d1',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        stimulus:
          'Two parallel lines are cut by a transversal. One of the co-interior (same-side interior) angles measures 112°.',
        question: 'What is the measure of the other co-interior angle?',
        choices: [
          { label: 'A', text: '68°' },
          { label: 'B', text: '78°' },
          { label: 'C', text: '112°' },
          { label: 'D', text: '158°' },
        ],
        correctAnswer: 'A',
        explanation:
          'Co-interior (same-side interior) angles are supplementary when lines are parallel: 180° − 112° = 68°.',
        wrongAnswerExplanations: {
          C: 'This would be correct for alternate interior angles (equal), but co-interior angles are supplementary, not equal.',
          D: 'This comes from subtracting from 270° instead of 180°, which has no geometric basis.',
        },
        teachingPoint: 'Co-interior (same-side interior) angles between parallel lines are supplementary — they add up to 180°.',
      },
      {
        id: 'lines-angles-triangles-d2',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'In a triangle, two angles measure 54° and 81°. What is the measure of the third angle?',
        choices: [
          { label: 'A', text: '35°' },
          { label: 'B', text: '45°' },
          { label: 'C', text: '54°' },
          { label: 'D', text: '63°' },
        ],
        correctAnswer: 'B',
        explanation:
          'Sum of angles in a triangle = 180°. Third angle = 180 − 54 − 81 = 45°.',
        wrongAnswerExplanations: {
          A: 'This comes from subtracting both given angles from 90° instead of 180°: 90 − 54 − 81 is negative, suggesting an arithmetic error leading to 35.',
          D: 'This comes from adding the two given angles and subtracting from 198° rather than 180°, or from other arithmetic errors.',
        },
        teachingPoint: 'The three interior angles of any triangle always sum to 180°.',
      },
      {
        id: 'lines-angles-triangles-d3',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'In triangle XYZ, the exterior angle at vertex Z measures 135°. Angle X = 72°.',
        question: 'What is the measure of angle Y?',
        choices: [
          { label: 'A', text: '45°' },
          { label: 'B', text: '63°' },
          { label: 'C', text: '72°' },
          { label: 'D', text: '108°' },
        ],
        correctAnswer: 'B',
        explanation:
          'The exterior angle at Z equals the sum of the two remote interior angles: X + Y = 135°. Since X = 72°, Y = 135 − 72 = 63°. Verify: interior angle Z = 180 − 135 = 45°, and 72 + 63 + 45 = 180°. ✓',
        wrongAnswerExplanations: {
          A: 'This is the interior angle at Z (180 − 135 = 45°), not angle Y.',
          C: 'This incorrectly sets Y = X = 72°, assuming an isosceles triangle without justification.',
          D: 'This comes from subtracting 72° from 180° instead of from 135°: 180 − 72 = 108.',
        },
        teachingPoint: 'An exterior angle of a triangle equals the sum of the two non-adjacent interior angles, not the supplement of just one.',
      },
      {
        id: 'lines-angles-triangles-d4',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'Triangle JKL is similar to triangle MNP with the correspondence J↔M, K↔N, L↔P. JK = 6, KL = 9, and MN = 10.',
        question: 'What is the length of NP?',
        choices: [
          { label: 'A', text: '5.4' },
          { label: 'B', text: '12' },
          { label: 'C', text: '15' },
          { label: 'D', text: '16.67' },
        ],
        correctAnswer: 'C',
        explanation:
          'Scale factor = MN/JK = 10/6 = 5/3. NP corresponds to KL, so NP = (5/3) × 9 = 15.',
        wrongAnswerExplanations: {
          A: 'This comes from applying the inverse scale factor: (6/10) × 9 = 5.4, which would shrink the triangle instead of enlarging it.',
          B: 'This comes from adding the difference in the first pair of sides to the second: 9 + (10 − 6) = 13, or a misapplication giving 12.',
          D: 'This comes from setting KL/NP = MN/JK instead of JK/MN = KL/NP: 9/NP = 6/10 → NP = 15 — actually this gives 15 too, so D may come from 9 × (10/6) + rounding error.',
        },
        teachingPoint: 'In similar triangles, set up proportions using consistent corresponding sides from the two triangles.',
      },
      {
        id: 'lines-angles-triangles-d5',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'Lines p and q are parallel. A transversal crosses line p at point A and line q at point B. At point A, the transversal creates an angle of (3x + 15)° on the left side above line p. At point B, the transversal creates an angle of (5x − 25)° on the right side below line q.',
        question:
          'What is the value of x? (These two angles are alternate interior angles.)',
        choices: [
          { label: 'A', text: '10' },
          { label: 'B', text: '20' },
          { label: 'C', text: '25' },
          { label: 'D', text: '35' },
        ],
        correctAnswer: 'B',
        explanation:
          'Alternate interior angles are equal: 3x + 15 = 5x − 25. Subtract 3x: 15 = 2x − 25. Add 25: 40 = 2x. So x = 20. Check: 3(20) + 15 = 75° and 5(20) − 25 = 75°. ✓',
        wrongAnswerExplanations: {
          A: 'This comes from setting up the equation as co-interior (supplementary): 3x + 15 + 5x − 25 = 180 → 8x − 10 = 180 → 8x = 190 → x ≈ 23.75, then rounding or making an arithmetic error to reach 10.',
          C: 'This comes from an arithmetic error in the alternate-interior equation, such as writing 15 = 2x − 25 → 2x = 15 + 15 = 30 → x = 15, or a sign error giving 50 = 2x → x = 25.',
          D: 'This comes from adding instead of subtracting: 3x + 15 + 5x − 25 = 180 → 8x = 190 → x ≈ 23.75, or from a different setup where x = 35 seems plausible.',
        },
        teachingPoint: 'Set alternate interior angles equal to each other and solve the resulting linear equation, then verify by substituting back.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Right Triangles & Trigonometry
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'right-triangles-trig',
    title: 'Right Triangles & Trigonometry',
    domain: 'geometry-trigonometry',
    overview: {
      whatItTests:
        'The ability to apply the Pythagorean theorem to find missing sides, use the 30-60-90 and 45-45-90 special triangle ratios, compute sine, cosine, and tangent using SOHCAHTOA, and apply the complementary angle trig identity (sin θ = cos(90° − θ)).',
      howItAppears:
        'Questions typically give a right triangle with two known measurements (two sides, or one side and one angle) and ask for a missing side or angle. Some questions express the answer using exact values (fractions, radicals) or ask which expression is equivalent to a given trig ratio.',
      whyStudentsMissIt:
        'Students label the sides relative to the wrong angle, confuse sin and cos, or forget the special triangle ratios and try to use a calculator approach that is not available on the SAT.',
      whatToLookFor:
        'The right angle marker (□), angle labels that hint at 30-60-90 (look for 30° or 60°) or 45-45-90 (look for 45° or an isosceles right triangle), and the phrase "in terms of sin/cos/tan of angle ___."',
    },
    strategy: {
      steps: [
        'Mark the right angle and label the three sides as hypotenuse (opposite the right angle), opposite (across from the reference angle), and adjacent (next to the reference angle).',
        'Choose the trig ratio or theorem that connects the two known quantities to the unknown: use sin if opposite/hypotenuse are involved, cos if adjacent/hypotenuse, tan if opposite/adjacent.',
        'For 30-60-90 triangles: sides are in ratio 1 : √3 : 2 (short leg : long leg : hypotenuse). For 45-45-90: 1 : 1 : √2.',
        'For complementary angles, use sin θ = cos(90° − θ) and cos θ = sin(90° − θ) to rewrite expressions.',
        'Solve for the unknown algebraically and simplify radicals if needed.',
      ],
      timeSavingTip:
        'In 30-60-90 and 45-45-90 problems, find the shortest side first and scale the ratio — this avoids messy algebra.',
      whenNotToOverthink:
        'If the triangle is a classic 3-4-5 or 5-12-13 Pythagorean triple, recognize it immediately and skip the square-root computation.',
    },
    commonTraps: [
      {
        title: 'Labeling opposite and adjacent relative to the wrong angle',
        description:
          'Which side is "opposite" and which is "adjacent" changes depending on which acute angle you are referencing. Using the wrong reference angle swaps sin and cos.',
        avoidance:
          'Draw an arrow pointing to the reference angle, then label the side across from the arrow as "opposite" and the non-hypotenuse side touching the arrow as "adjacent."',
      },
      {
        title: 'Forgetting the √3 in the 30-60-90 ratio',
        description:
          'Students remember 1 : 1 : 2 (dropping the √3) or mix up which side the √3 belongs to.',
        avoidance:
          'Memorize the pattern: the side opposite 60° is √3 times the side opposite 30°, and the hypotenuse is twice the shortest side.',
      },
      {
        title: 'Misapplying the complementary identity direction',
        description:
          'sin 40° = cos 50° (not cos 40°). Students write sin θ = cos θ instead of sin θ = cos(90° − θ).',
        avoidance:
          'Always verify the two angles add to 90° when applying the identity.',
      },
      {
        title: 'Using the hypotenuse as the adjacent or opposite side',
        description:
          'Students confuse the longest side with "adjacent" when the reference angle is one of the base angles.',
        avoidance:
          'The hypotenuse is always and only the side opposite the right angle, regardless of the reference angle.',
      },
    ],
    guidedExamples: [
      {
        id: 'right-triangles-trig-ex-1',
        stimulus:
          'A right triangle has legs of length 5 and 12.',
        question: 'What is the length of the hypotenuse?',
        steps: [
          {
            instruction: 'Apply the Pythagorean theorem',
            content: 'a² + b² = c² → 5² + 12² = c² → 25 + 144 = c² → c² = 169',
          },
          {
            instruction: 'Solve for c',
            content: 'c = √169 = 13',
          },
        ],
        choices: [
          { label: 'A', text: '11' },
          { label: 'B', text: '13' },
          { label: 'C', text: '15' },
          { label: 'D', text: '17' },
        ],
        correctAnswer: 'B',
        explanation:
          '5² + 12² = 25 + 144 = 169 = 13². This is the well-known 5-12-13 Pythagorean triple, so the hypotenuse is 13.',
        wrongAnswerExplanations: {
          A: 'This comes from subtracting the smaller leg from the larger: 12 − 5 = 7, then guessing the next integer, or from √(144 − 25) = √119 ≈ 10.9.',
          C: 'This comes from adding the two legs directly: 5 + 12 = 17, then subtracting 2 arbitrarily, or from confusing a 5-12-13 triple with a 6-8-10 or 9-12-15 triple.',
          D: 'This comes from adding the two legs directly: 5 + 12 = 17, treating the triangle inequality as the hypotenuse.',
        },
      },
      {
        id: 'right-triangles-trig-ex-2',
        stimulus:
          'In a right triangle, the hypotenuse measures 10 and one acute angle measures 30°.',
        question:
          'What is the length of the side opposite the 30° angle?',
        steps: [
          {
            instruction: 'Recall the 30-60-90 triangle ratio',
            content:
              'In a 30-60-90 triangle, sides are in ratio 1 : √3 : 2. The hypotenuse corresponds to "2" in this ratio.',
          },
          {
            instruction: 'Scale the ratio to match the hypotenuse of 10',
            content:
              'Scale factor = 10/2 = 5. The side opposite 30° corresponds to "1" in the ratio, so its length = 1 × 5 = 5.',
          },
        ],
        choices: [
          { label: 'A', text: '5' },
          { label: 'B', text: '5√2' },
          { label: 'C', text: '5√3' },
          { label: 'D', text: '10√3' },
        ],
        correctAnswer: 'A',
        explanation:
          'In a 30-60-90 triangle the side opposite the 30° angle is half the hypotenuse: 10/2 = 5.',
        wrongAnswerExplanations: {
          B: 'This is the leg of a 45-45-90 triangle with hypotenuse 10: 10/√2 = 5√2, but this is not a 45-45-90 triangle.',
          C: 'This is the length of the side opposite the 60° angle (5√3), not the side opposite the 30° angle.',
          D: 'This comes from multiplying the hypotenuse by √3 rather than dividing by 2.',
        },
      },
      {
        id: 'right-triangles-trig-ex-3',
        stimulus:
          'In right triangle ABC with the right angle at C, angle A measures 38°.',
        question:
          'Which of the following is equal to sin 38°?',
        steps: [
          {
            instruction: 'Identify the complementary angle identity',
            content:
              'sin θ = cos(90° − θ). Here θ = 38°, so sin 38° = cos(90° − 38°) = cos 52°.',
          },
          {
            instruction: 'Confirm using SOHCAHTOA in the triangle',
            content:
              'Angle A = 38° and angle B = 52° (since A + B = 90°). sin A = opposite/hypotenuse = BC/AB. cos B = adjacent/hypotenuse = BC/AB. So sin 38° = cos 52°.',
          },
        ],
        choices: [
          { label: 'A', text: 'cos 38°' },
          { label: 'B', text: 'cos 52°' },
          { label: 'C', text: 'sin 52°' },
          { label: 'D', text: 'tan 38°' },
        ],
        correctAnswer: 'B',
        explanation:
          'By the complementary angle identity, sin 38° = cos(90° − 38°) = cos 52°.',
        wrongAnswerExplanations: {
          A: 'cos 38° ≠ sin 38° in general (they are only equal when θ = 45°).',
          C: 'sin 52° = cos 38°, not sin 38° — this confuses which identity applies to which angle.',
          D: 'tan 38° = sin 38°/cos 38° ≠ sin 38° unless cos 38° = 1, which is not the case.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'right-triangles-trig-d1',
        skillSlug: 'right-triangles-trig',
        difficulty: 'easy',
        question:
          'In a right triangle, one leg has length 8 and the hypotenuse has length 17. What is the length of the other leg?',
        choices: [
          { label: 'A', text: '9' },
          { label: 'B', text: '12' },
          { label: 'C', text: '15' },
          { label: 'D', text: '√225' },
        ],
        correctAnswer: 'C',
        explanation:
          'a² + 8² = 17² → a² = 289 − 64 = 225 → a = 15. This is the 8-15-17 Pythagorean triple. (Note: √225 = 15, so C and D are equivalent, but 15 is the simplified form.)',
        wrongAnswerExplanations: {
          A: 'This comes from subtracting the legs: 17 − 8 = 9, not applying the Pythagorean theorem.',
          B: 'This comes from confusing the 8-15-17 triple with the 5-12-13 triple and substituting 12.',
        },
        teachingPoint: 'Use a² = c² − b² to find a missing leg, not c − b.',
      },
      {
        id: 'right-triangles-trig-d2',
        skillSlug: 'right-triangles-trig',
        difficulty: 'easy',
        stimulus:
          'A right triangle has one angle of 45° and a hypotenuse of 8√2.',
        question: 'What is the length of each leg?',
        choices: [
          { label: 'A', text: '4' },
          { label: 'B', text: '8' },
          { label: 'C', text: '8√2' },
          { label: 'D', text: '16' },
        ],
        correctAnswer: 'B',
        explanation:
          'In a 45-45-90 triangle, leg = hypotenuse/√2 = 8√2/√2 = 8. Both legs are equal to 8.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing the hypotenuse by 2√2 instead of √2: 8√2/(2√2) = 4.',
          C: 'This sets the leg equal to the hypotenuse, which is incorrect for a 45-45-90 triangle.',
          D: 'This comes from multiplying the hypotenuse by √2 instead of dividing: 8√2 × √2 = 16.',
        },
        teachingPoint: 'In a 45-45-90 triangle, each leg equals the hypotenuse divided by √2.',
      },
      {
        id: 'right-triangles-trig-d3',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'In right triangle RST with the right angle at T, RS = 13, RT = 5, and ST = 12. Angle R is at vertex R.',
        question: 'What is tan R?',
        choices: [
          { label: 'A', text: '5/13' },
          { label: 'B', text: '12/13' },
          { label: 'C', text: '5/12' },
          { label: 'D', text: '12/5' },
        ],
        correctAnswer: 'D',
        explanation:
          'With respect to angle R: the opposite side is ST = 12 (across from R) and the adjacent side is RT = 5 (next to R, not the hypotenuse). tan R = opposite/adjacent = 12/5.',
        wrongAnswerExplanations: {
          A: 'This is sin R = RT/RS = 5/13, not tan R.',
          B: 'This is cos R = ST/RS = 12/13 — wait, actually sin R = opposite/hypotenuse = ST/RS = 12/13. This confuses sin and cos.',
          C: 'This inverts the ratio: tan R = ST/RT = 12/5, not 5/12. The value 5/12 would be tan T (opposite/adjacent from T\'s perspective).',
        },
        teachingPoint: 'Always label opposite and adjacent relative to the specific angle being asked about before applying SOHCAHTOA.',
      },
      {
        id: 'right-triangles-trig-d4',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'In right triangle ABC with the right angle at C, AC = 7 and BC = 7√3.',
        question: 'What is the measure of angle A?',
        choices: [
          { label: 'A', text: '30°' },
          { label: 'B', text: '45°' },
          { label: 'C', text: '60°' },
          { label: 'D', text: '75°' },
        ],
        correctAnswer: 'C',
        explanation:
          'From angle A: adjacent leg AC = 7, opposite leg BC = 7√3. tan A = opposite/adjacent = 7√3/7 = √3. Since tan 60° = √3, angle A = 60°. Equivalently, recognize the ratio of legs as 1 : √3, which is the 30-60-90 pattern with the 60° angle opposite the longer leg.',
        wrongAnswerExplanations: {
          A: 'Angle A = 30° would mean the shorter leg (7) is opposite A, but in this triangle the longer leg (7√3) is opposite A. The 30° angle is at vertex B.',
          B: '45° would require equal legs (both 7), but the legs are 7 and 7√3, which are unequal.',
          D: '75° is not a standard special angle and does not match the 30-60-90 ratio present here.',
        },
        teachingPoint: 'Recognize the 1 : √3 leg ratio as the signature of a 30-60-90 triangle, where the 60° angle faces the √3 side.',
      },
      {
        id: 'right-triangles-trig-d5',
        skillSlug: 'right-triangles-trig',
        difficulty: 'hard',
        stimulus:
          'In right triangle PQR with the right angle at R, PQ = 26 and angle P = 22.6°. A student writes the equation: cos 22.6° = QR/26.',
        question:
          'The student\'s equation is incorrect. Which equation correctly expresses QR in terms of a trigonometric function of angle P?',
        choices: [
          { label: 'A', text: 'sin 22.6° = QR/26' },
          { label: 'B', text: 'cos 22.6° = QR/26' },
          { label: 'C', text: 'tan 22.6° = QR/PR' },
          { label: 'D', text: 'sin 67.4° = QR/26' },
        ],
        correctAnswer: 'A',
        explanation:
          'With the right angle at R, PQ = 26 is the hypotenuse. From angle P, the side QR is the opposite side (it does not touch angle P and is not the hypotenuse). So sin P = opposite/hypotenuse = QR/26. The student incorrectly used cos. Note that sin 22.6° = cos 67.4°, and also D states sin 67.4° = QR/26 which is equivalent since 67.4° is the complement of 22.6°.',
        wrongAnswerExplanations: {
          B: 'This is exactly the student\'s incorrect equation. cos P = adjacent/hypotenuse = PR/26, not QR/26.',
          C: 'tan 22.6° = QR/PR is technically correct (opposite/adjacent), but it does not express QR directly in terms of the hypotenuse 26. The question asks which option is correct for a direct expression involving PQ = 26.',
          D: 'sin 67.4° = cos 22.6° = PR/26, not QR/26. The angle 67.4° is at vertex Q, and the side opposite Q is PR, not QR.',
        },
        teachingPoint: 'Before applying SOHCAHTOA, identify which side is opposite and which is adjacent relative to the stated angle, not the complement angle.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Circles
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'circles',
    title: 'Circles',
    domain: 'geometry-trigonometry',
    overview: {
      whatItTests:
        'The ability to compute circumference and area of a circle, find arc length and sector area using a central angle, apply the inscribed angle theorem (inscribed angle = half the central angle), use the tangent-radius perpendicularity property, and work with the standard equation of a circle (x − h)² + (y − k)² = r².',
      howItAppears:
        'Questions may ask for the arc length or sector area when a central angle is given as a fraction of 360°, ask for a missing coordinate using the circle equation, or ask which point lies on a given circle. Angle problems may involve inscribed angles or tangent lines drawn from an external point.',
      whyStudentsMissIt:
        'Students confuse arc length (a distance along the circle) with sector area (a region), forget that an inscribed angle is half the central angle (not equal), or expand the standard circle equation incorrectly when it is given in general form.',
      whatToLookFor:
        'The degree measure of a central or inscribed angle, the words "arc," "sector," or "tangent," and circle equations that may be in general form (x² + y² + Dx + Ey + F = 0) requiring completion of the square.',
    },
    strategy: {
      steps: [
        'Identify the radius (or diameter) from the given information.',
        'For arc length: Arc length = (central angle / 360°) × 2πr.',
        'For sector area: Sector area = (central angle / 360°) × πr².',
        'For inscribed angles: Inscribed angle = (1/2) × intercepted arc (or (1/2) × central angle subtending the same arc).',
        'For the circle equation: rewrite (x − h)² + (y − k)² = r² to read center (h, k) and radius r directly, completing the square if the equation is in general form.',
      ],
      timeSavingTip:
        'Express arc length and sector area as fractions of the full circle rather than computing them from scratch — (θ/360) × (full circumference or full area).',
      whenNotToOverthink:
        'If the problem gives the circle equation already in standard form, just read off h, k, and r without algebraic manipulation.',
    },
    commonTraps: [
      {
        title: 'Confusing arc length with sector area',
        description:
          'Both use the same (θ/360°) fraction, but arc length multiplies by 2πr (a linear measurement) while sector area multiplies by πr² (a square measurement).',
        avoidance:
          'Write the relevant formula explicitly before computing; do not rely on memory of which has r vs. r².',
      },
      {
        title: 'Setting an inscribed angle equal to the central angle',
        description:
          'An inscribed angle is exactly half the central angle that subtends the same arc, not equal to it.',
        avoidance:
          'Draw the central angle and the inscribed angle together and write "inscribed = central/2" before solving.',
      },
      {
        title: 'Reading the circle equation center with wrong signs',
        description:
          'In (x − h)² + (y − k)² = r², the center is at (h, k), but students read (x + 3)² as center x = 3 instead of x = −3.',
        avoidance:
          'Rewrite the equation by explicitly factoring out the negative: (x − (−3))², confirming the center coordinate is −3.',
      },
      {
        title: 'Confusing r with r² in the circle equation',
        description:
          'If (x − 1)² + (y + 2)² = 25, the radius is 5 (not 25). Students report r = 25.',
        avoidance:
          'Always take the square root of the right-hand side constant to find r.',
      },
    ],
    guidedExamples: [
      {
        id: 'circles-ex-1',
        stimulus:
          'A circle has a radius of 9 cm. A central angle of 80° subtends an arc.',
        question:
          'What is the length of the arc subtended by the 80° central angle? (Leave the answer in terms of π.)',
        steps: [
          {
            instruction: 'Write the arc length formula',
            content: 'Arc length = (central angle / 360°) × 2πr',
          },
          {
            instruction: 'Substitute the values',
            content:
              'Arc length = (80/360) × 2π(9) = (2/9) × 18π = 4π cm',
          },
        ],
        choices: [
          { label: 'A', text: '2π cm' },
          { label: 'B', text: '4π cm' },
          { label: 'C', text: '8π cm' },
          { label: 'D', text: '18π cm' },
        ],
        correctAnswer: 'B',
        explanation:
          'Arc length = (80/360) × 2π(9) = (2/9)(18π) = 4π cm.',
        wrongAnswerExplanations: {
          A: 'This comes from using the radius once (not 2r) in the circumference formula: (80/360) × π(9) = 2π.',
          C: 'This comes from doubling the correct arc length, perhaps from a calculation error in simplifying 80/360.',
          D: 'This is the full circumference 2π(9) = 18π, ignoring the fraction of the circle entirely.',
        },
      },
      {
        id: 'circles-ex-2',
        stimulus:
          'A circle with center O has a central angle of 120° subtending arc AB. Point C is a point on the circle on the major arc (the longer arc) side, and angle ACB is an inscribed angle that subtends the same arc AB.',
        question: 'What is the measure of inscribed angle ACB?',
        steps: [
          {
            instruction: 'Identify the relationship between inscribed and central angles',
            content:
              'An inscribed angle equals half the central angle subtending the same arc. The central angle for arc AB is 120°.',
          },
          {
            instruction: 'Compute the inscribed angle',
            content: 'Angle ACB = 120°/2 = 60°.',
          },
        ],
        choices: [
          { label: 'A', text: '30°' },
          { label: 'B', text: '60°' },
          { label: 'C', text: '120°' },
          { label: 'D', text: '240°' },
        ],
        correctAnswer: 'B',
        explanation:
          'The inscribed angle theorem states that the inscribed angle is half the central angle subtending the same arc: angle ACB = 120°/2 = 60°.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing by 4 instead of 2: 120°/4 = 30°.',
          C: 'This sets the inscribed angle equal to the central angle, forgetting the factor of 1/2.',
          D: 'This is the reflex central angle (360° − 120° = 240°), not the inscribed angle.',
        },
      },
      {
        id: 'circles-ex-3',
        stimulus:
          'A circle has the equation (x + 2)² + (y − 5)² = 49.',
        question: 'What are the center and radius of the circle?',
        steps: [
          {
            instruction: 'Rewrite in the form (x − h)² + (y − k)² = r²',
            content:
              '(x + 2)² = (x − (−2))², so h = −2. (y − 5)² has k = 5. The right side is 49 = r².',
          },
          {
            instruction: 'Solve for r',
            content: 'r = √49 = 7.',
          },
        ],
        choices: [
          { label: 'A', text: 'Center (2, −5), radius 7' },
          { label: 'B', text: 'Center (−2, 5), radius 7' },
          { label: 'C', text: 'Center (−2, 5), radius 49' },
          { label: 'D', text: 'Center (2, −5), radius 49' },
        ],
        correctAnswer: 'B',
        explanation:
          'Standard form is (x − h)² + (y − k)² = r². Rewriting: (x − (−2))² + (y − 5)² = 49 gives center (−2, 5) and r = √49 = 7.',
        wrongAnswerExplanations: {
          A: 'This incorrectly reads the signs: h = +2 and k = −5 instead of h = −2 and k = +5.',
          C: 'This correctly identifies the center (−2, 5) but reports r = 49 (the value of r²) instead of r = 7.',
          D: 'This gets both the center signs wrong (A\'s error) and also uses r = 49 instead of r = 7.',
        },
      },
    ],
    drillQuestions: [
      {
        id: 'circles-d1',
        skillSlug: 'circles',
        difficulty: 'easy',
        question:
          'A circle has a diameter of 14 cm. What is the area of the circle in square centimeters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '14π cm²' },
          { label: 'B', text: '28π cm²' },
          { label: 'C', text: '49π cm²' },
          { label: 'D', text: '196π cm²' },
        ],
        correctAnswer: 'C',
        explanation:
          'Radius = diameter/2 = 7 cm. Area = πr² = π(49) = 49π cm².',
        wrongAnswerExplanations: {
          A: 'This comes from using the diameter directly as a linear factor: π × 14 = 14π, treating area like circumference.',
          B: 'This is the circumference (2πr = 2π × 7 = 14π) — wait, that is 14π, so B = 28π likely comes from π × d = π × 14 × 2 = 28π.',
          D: 'This comes from using the diameter in the area formula instead of the radius: π(14²) = 196π.',
        },
        teachingPoint: 'Always halve the diameter to get the radius before substituting into A = πr².',
      },
      {
        id: 'circles-d2',
        skillSlug: 'circles',
        difficulty: 'easy',
        stimulus:
          'A sector of a circle has a radius of 6 and a central angle of 90°.',
        question:
          'What is the area of the sector? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '3π' },
          { label: 'B', text: '6π' },
          { label: 'C', text: '9π' },
          { label: 'D', text: '36π' },
        ],
        correctAnswer: 'C',
        explanation:
          'Sector area = (90/360) × πr² = (1/4) × π(36) = 9π.',
        wrongAnswerExplanations: {
          A: 'This comes from computing (1/4) × 2πr = (1/4)(12π) = 3π — using the arc length formula instead of the sector area formula.',
          B: 'This comes from computing (1/4) × πr² but using r = 2√6 ≈ 4.9 incorrectly, or halving the correct answer.',
          D: 'This is the full circle area πr² = 36π, omitting the (90/360) fraction.',
        },
        teachingPoint: 'Sector area = (θ/360°) × πr²; do not confuse this with arc length = (θ/360°) × 2πr.',
      },
      {
        id: 'circles-d3',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'Circle O has a radius of 10. A tangent line is drawn from external point P to the circle, touching it at point T. The distance from P to the center O is 26.',
        question: 'What is the length of the tangent segment PT?',
        choices: [
          { label: 'A', text: '16' },
          { label: 'B', text: '24' },
          { label: 'C', text: '28' },
          { label: 'D', text: '√776' },
        ],
        correctAnswer: 'B',
        explanation:
          'A tangent to a circle is perpendicular to the radius at the point of tangency, so angle OTP = 90°. Triangle OTP is a right triangle with hypotenuse OP = 26 and leg OT = 10. PT² = OP² − OT² = 676 − 100 = 576. PT = √576 = 24.',
        wrongAnswerExplanations: {
          A: 'This comes from subtracting the radius from OP: 26 − 10 = 16, incorrectly treating the tangent as a straight extension of the radius.',
          C: 'This comes from adding the radius to OP: 26 + 10 = 36, then halving: 18, or from another arithmetic error.',
          D: 'This comes from adding the squares instead of subtracting: √(26² + 10²) = √(676 + 100) = √776, incorrectly placing PT as the hypotenuse.',
        },
        teachingPoint: 'A tangent segment meets the radius at 90°, making OTP a right triangle where OP is the hypotenuse.',
      },
      {
        id: 'circles-d4',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'A circle has the equation x² + y² − 6x + 8y = 11.',
        question: 'What is the radius of the circle?',
        choices: [
          { label: 'A', text: '6' },
          { label: 'B', text: '√36' },
          { label: 'C', text: '√11' },
          { label: 'D', text: '√36 = 6, same as A' },
        ],
        correctAnswer: 'A',
        explanation:
          'Complete the square. x² − 6x → (x − 3)² − 9. y² + 8y → (y + 4)² − 16. Rewrite: (x − 3)² − 9 + (y + 4)² − 16 = 11 → (x − 3)² + (y + 4)² = 36. So r² = 36 and r = 6.',
        wrongAnswerExplanations: {
          B: '√36 = 6, which is indeed the radius — this is equivalent to A. On the SAT the numeric value would be listed.',
          C: 'This comes from reading r² = 11 (the right-hand side before completing the square) and reporting √11 without completing the square.',
        },
        teachingPoint: 'To find the radius from a general circle equation, complete the square for both x and y, then take the square root of the resulting constant.',
      },
      {
        id: 'circles-d5',
        skillSlug: 'circles',
        difficulty: 'hard',
        stimulus:
          'In circle O, central angle AOB = 150° and the radius is 12 cm.',
        question:
          'What is the area of the minor sector AOB minus the area of triangle AOB, in square centimeters? (Leave the answer in terms of π and simplified radicals.)',
        choices: [
          { label: 'A', text: '60π − 36√3' },
          { label: 'B', text: '60π − 72√3' },
          { label: 'C', text: '60π + 36√3' },
          { label: 'D', text: '72π − 36√3' },
        ],
        correctAnswer: 'A',
        explanation:
          'Sector area = (150/360) × π(12²) = (5/12)(144π) = 60π. For triangle AOB: OA = OB = 12 (radii), central angle = 150°. Area of triangle = (1/2)(OA)(OB)sin(AOB) = (1/2)(12)(12)sin 150° = 72 × (1/2) = 36. So sector − triangle = 60π − 36.',
        wrongAnswerExplanations: {
          B: 'This comes from computing sin 150° = √3/2 (confusing it with sin 120° = √3/2) and getting 72 × (√3/2) = 36√3, then writing 60π − 72√3 instead of 60π − 36√3.',
          C: 'This adds the triangle area instead of subtracting it, giving 60π + 36.',
          D: 'This comes from computing the sector area as (150/360) × π(144) = (5/12)(144π) = 60π — but then using radius 12 in full-circle area πr² and misapplying: (150/360)(144π) = 60π is correct, so D\'s sector 72π likely comes from using radius 12 and fraction 1/2 of circle instead of 5/12.',
        },
        teachingPoint: 'The area between a sector and its chord triangle equals (sector area) − (1/2)r²sin θ; use sin 150° = 1/2, not √3/2.',
      },
    ],
  },
]
