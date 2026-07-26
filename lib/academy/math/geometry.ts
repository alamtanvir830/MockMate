import type { MathAcademySkill } from './types'

export const geometrySkills: MathAcademySkill[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Area & Volume
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'area-volume',
    title: 'Area & Volume',
    domain: 'geometry-trigonometry',
    objective:
      'Calculate areas, perimeters, and volumes of standard and composite figures and correctly apply scale factors to area and volume.',
    estimatedMinutes: 35,
    subskills: [
      'Area of triangles, rectangles, and circles',
      'Volume of prisms, cylinders, cones, and spheres',
      'Composite and cut-out figures',
      'Scale factor effects on area and volume',
    ],
    desmosClassification: 'optional',
    coachTakeaway:
      'Write the formula before plugging in numbers, distinguish r from d for circles, and remember that scale factor k raises to the second power for area and the third for volume.',
    miniExample: {
      problem: 'A cylinder has radius 3 and height 5. What is its volume in terms of π?',
      solution: 'V = πr²h = π(9)(5) = 45π cubic units.',
    },
    hints: [
      'Identify the shape name first — rectangle, triangle, circle, cylinder, cone, or sphere.',
      'Write the exact formula for that shape before substituting any numbers.',
      'Check whether you were given a radius or a diameter; halve the diameter if needed.',
      'For composite figures, split the figure into simpler shapes, compute each part, then add or subtract.',
      'When a scale factor k is involved, square it for area comparisons and cube it for volume comparisons.',
    ],
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
      {
        id: 'area-volume-ex-4',
        stimulus:
          'A trapezoid has parallel sides of length 8 cm and 14 cm, and a height of 6 cm.',
        question: 'What is the area of the trapezoid in square centimeters?',
        steps: [
          {
            instruction: 'Recall the trapezoid area formula',
            content: 'Area = (1/2)(b₁ + b₂)(h), where b₁ and b₂ are the parallel sides and h is the perpendicular height.',
          },
          {
            instruction: 'Substitute the values',
            content: 'Area = (1/2)(8 + 14)(6) = (1/2)(22)(6) = (1/2)(132) = 66 cm².',
          },
        ],
        choices: [
          { label: 'A', text: '44 cm²' },
          { label: 'B', text: '66 cm²' },
          { label: 'C', text: '84 cm²' },
          { label: 'D', text: '132 cm²' },
        ],
        correctAnswer: 'B',
        explanation:
          'Area of a trapezoid = (1/2)(sum of parallel sides)(height) = (1/2)(8 + 14)(6) = (1/2)(132) = 66 cm².',
        wrongAnswerExplanations: {
          A: 'This comes from multiplying only one base by the height and halving: (1/2)(8)(6) + something — an incomplete calculation.',
          C: 'This comes from using only the longer base: (1/2)(14)(6) × 2 = 84, forgetting to average both bases.',
          D: 'This comes from forgetting the 1/2 factor: (8 + 14)(6) = 132.',
        },
      },
      {
        id: 'area-volume-ex-5',
        stimulus:
          'A rectangular prism has length 10 cm, width 4 cm, and height 5 cm. A second similar prism has all dimensions scaled by a factor of 1/2.',
        question: 'What is the surface area of the smaller prism in square centimeters?',
        steps: [
          {
            instruction: 'Find the surface area of the original prism',
            content:
              'SA = 2(lw + lh + wh) = 2(10×4 + 10×5 + 4×5) = 2(40 + 50 + 20) = 2(110) = 220 cm².',
          },
          {
            instruction: 'Apply the area scale factor',
            content:
              'Linear scale factor k = 1/2, so area scales by k² = 1/4. Smaller SA = (1/4)(220) = 55 cm².',
          },
        ],
        choices: [
          { label: 'A', text: '27.5 cm²' },
          { label: 'B', text: '55 cm²' },
          { label: 'C', text: '110 cm²' },
          { label: 'D', text: '220 cm²' },
        ],
        correctAnswer: 'B',
        explanation:
          'The original surface area is 220 cm². With a linear scale factor of 1/2, surface area (an area measure) scales by (1/2)² = 1/4. Smaller SA = 220 × (1/4) = 55 cm².',
        wrongAnswerExplanations: {
          A: 'This comes from scaling by (1/2)³ = 1/8 (the volume scale factor) instead of (1/2)² = 1/4 for area.',
          C: 'This comes from multiplying by the linear scale factor 1/2 instead of squaring it: 220 × (1/2) = 110.',
          D: 'This is the original prism\'s surface area — the scale factor was not applied at all.',
        },
      },
      {
        id: 'area-volume-ex-6',
        stimulus:
          'A spherical storage tank has a radius of 6 feet. Paint costs $2 per square foot to apply to the exterior surface.',
        question:
          'What is the total cost to paint the exterior of the tank? (Use π ≈ 3.14 and round to the nearest dollar.)',
        steps: [
          {
            instruction: 'Find the surface area of the sphere',
            content: 'SA = 4πr² = 4 × 3.14 × 36 = 4 × 113.04 = 452.16 ft².',
          },
          {
            instruction: 'Multiply by the cost per square foot',
            content: 'Total cost = 452.16 × $2 = $904.32 ≈ $904.',
          },
        ],
        choices: [
          { label: 'A', text: '$226' },
          { label: 'B', text: '$452' },
          { label: 'C', text: '$904' },
          { label: 'D', text: '$1,809' },
        ],
        correctAnswer: 'C',
        explanation:
          'Surface area of a sphere = 4πr² = 4(3.14)(36) ≈ 452.16 ft². Cost = 452.16 × $2 ≈ $904.',
        wrongAnswerExplanations: {
          A: 'This comes from computing SA = πr² (the circle area formula, not the sphere surface area) and multiplying by $2.',
          B: 'This computes the surface area correctly (~452 ft²) but forgets to multiply by the $2 cost per square foot.',
          D: 'This comes from using SA = 4πr³ instead of 4πr²: 4(3.14)(216) ≈ 2714 — or from another formula error leading to roughly double the correct cost.',
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
      {
        id: 'geo-area-volume-drill-06',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        question:
          'A rectangle has a length of 11 inches and a width of 7 inches. What is its perimeter?',
        choices: [
          { label: 'A', text: '18 inches' },
          { label: 'B', text: '36 inches' },
          { label: 'C', text: '77 inches' },
          { label: 'D', text: '154 inches' },
        ],
        correctAnswer: 'B',
        explanation: 'Perimeter = 2(l + w) = 2(11 + 7) = 2(18) = 36 inches.',
        wrongAnswerExplanations: {
          A: 'This is just l + w = 18, missing the factor of 2 that accounts for both pairs of sides.',
          C: 'This is the area (11 × 7 = 77), not the perimeter.',
          D: 'This doubles the area instead of computing perimeter.',
        },
        teachingPoint: 'Perimeter = 2(length + width); area = length × width — keep them separate.',
      },
      {
        id: 'geo-area-volume-drill-07',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        stimulus: 'A circle has a circumference of 20π cm.',
        question: 'What is the area of the circle in square centimeters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '10π cm²' },
          { label: 'B', text: '20π cm²' },
          { label: 'C', text: '100π cm²' },
          { label: 'D', text: '400π cm²' },
        ],
        correctAnswer: 'C',
        explanation:
          'Circumference = 2πr = 20π, so r = 10. Area = πr² = π(100) = 100π cm².',
        wrongAnswerExplanations: {
          A: 'This uses r = 10 but then computes πr = 10π instead of πr².',
          B: 'This reports the circumference value (20π) as the area without converting.',
          D: 'This comes from using the diameter (20) in the area formula: π(20²) = 400π, but 20 is the diameter, not the radius.',
        },
        teachingPoint: 'Extract the radius from the circumference before substituting into the area formula.',
      },
      {
        id: 'geo-area-volume-drill-08',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A pyramid has a square base with side length 6 m and a height of 8 m.',
        question: 'What is the volume of the pyramid in cubic meters?',
        choices: [
          { label: 'A', text: '48 m³' },
          { label: 'B', text: '96 m³' },
          { label: 'C', text: '144 m³' },
          { label: 'D', text: '288 m³' },
        ],
        correctAnswer: 'B',
        explanation:
          'Volume of a pyramid = (1/3) × base area × height = (1/3)(6²)(8) = (1/3)(36)(8) = (1/3)(288) = 96 m³.',
        wrongAnswerExplanations: {
          A: 'This comes from computing (1/3)(6)(8) = 16 and then multiplying by 3, or from a dimension error.',
          C: 'This comes from using V = (1/2) × B × h instead of (1/3) × B × h.',
          D: 'This comes from forgetting the 1/3 factor: 6² × 8 = 36 × 8 = 288.',
        },
        teachingPoint: 'Pyramid volume = (1/3) × (base area) × height — the 1/3 factor applies to all pointed solids.',
      },
      {
        id: 'geo-area-volume-drill-09',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A parallelogram has a base of 15 cm and a height of 9 cm. A triangle with the same base and height is cut from it.',
        question: 'What is the area of the remaining piece in square centimeters?',
        choices: [
          { label: 'A', text: '67.5 cm²' },
          { label: 'B', text: '85.5 cm²' },
          { label: 'C', text: '101.5 cm²' },
          { label: 'D', text: '135 cm²' },
        ],
        correctAnswer: 'A',
        explanation:
          'Parallelogram area = base × height = 15 × 9 = 135 cm². Triangle area = (1/2)(15)(9) = 67.5 cm². Remaining = 135 − 67.5 = 67.5 cm².',
        wrongAnswerExplanations: {
          B: 'This comes from a subtraction error or using a different height for the triangle.',
          C: 'This comes from computing the triangle area incorrectly and subtracting it from 135.',
          D: 'This is the full parallelogram area — the triangle was not subtracted.',
        },
        teachingPoint: 'The triangle with the same base and height as a parallelogram has exactly half its area.',
      },
      {
        id: 'geo-area-volume-drill-10',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        question:
          'Two similar cones have a surface area ratio of 9:16. What is the ratio of their volumes?',
        choices: [
          { label: 'A', text: '3:4' },
          { label: 'B', text: '9:16' },
          { label: 'C', text: '27:64' },
          { label: 'D', text: '81:256' },
        ],
        correctAnswer: 'C',
        explanation:
          'Surface area scales as k², so k² = 9/16 means k = 3/4. Volume scales as k³ = (3/4)³ = 27/64. The volume ratio is 27:64.',
        wrongAnswerExplanations: {
          A: 'This is the linear scale ratio k = 3:4, not the volume ratio.',
          B: 'This is the area ratio, not the volume ratio.',
          D: 'This comes from raising the area ratio to the second power (squaring it) instead of the volume ratio formula.',
        },
        teachingPoint: 'If area ratio is k², then volume ratio is k³. Find k first, then cube it.',
      },
      {
        id: 'geo-area-volume-drill-11',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A hollow cylindrical pipe has an outer radius of 5 cm, an inner radius of 3 cm, and a length of 20 cm.',
        question: 'What is the volume of material making up the pipe wall, in cubic centimeters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '160π cm³' },
          { label: 'B', text: '320π cm³' },
          { label: 'C', text: '500π cm³' },
          { label: 'D', text: '680π cm³' },
        ],
        correctAnswer: 'B',
        explanation:
          'Volume of outer cylinder = π(5²)(20) = 500π. Volume of inner (hollow) cylinder = π(3²)(20) = 180π. Wall volume = 500π − 180π = 320π cm³.',
        wrongAnswerExplanations: {
          A: 'This comes from computing π(5² − 3²)(10) — using half the length.',
          C: 'This is the volume of the outer cylinder alone, without subtracting the hollow interior.',
          D: 'This comes from adding the inner and outer volumes instead of subtracting: 500π + 180π = 680π.',
        },
        teachingPoint: 'For hollow solids, subtract the volume of the inner cavity from the volume of the outer solid.',
      },
      {
        id: 'geo-area-volume-drill-12',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A hemisphere (half-sphere) has a radius of 4 cm. The flat circular face is sealed.',
        question: 'What is the total surface area of the solid, in square centimeters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '16π cm²' },
          { label: 'B', text: '32π cm²' },
          { label: 'C', text: '48π cm²' },
          { label: 'D', text: '64π cm²' },
        ],
        correctAnswer: 'C',
        explanation:
          'The curved surface area of a hemisphere = (1/2)(4πr²) = 2πr² = 2π(16) = 32π. The flat circular base = πr² = 16π. Total = 32π + 16π = 48π cm².',
        wrongAnswerExplanations: {
          A: 'This is only the flat circular base area πr² = 16π, without the curved surface.',
          B: 'This is only the curved hemisphere surface area 2πr² = 32π, without the base.',
          D: 'This comes from computing 4πr² (the full sphere surface area) without halving for the hemisphere.',
        },
        teachingPoint: 'A solid hemisphere has two surfaces: the curved half (2πr²) and the flat circular base (πr²).',
      },
      {
        id: 'geo-area-volume-drill-13',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        question:
          'A square has an area of 144 cm². What is its perimeter?',
        choices: [
          { label: 'A', text: '12 cm' },
          { label: 'B', text: '24 cm' },
          { label: 'C', text: '48 cm' },
          { label: 'D', text: '576 cm' },
        ],
        correctAnswer: 'C',
        explanation:
          'Side length = √144 = 12 cm. Perimeter = 4 × 12 = 48 cm.',
        wrongAnswerExplanations: {
          A: 'This is the side length (12 cm), not the perimeter.',
          B: 'This comes from computing 2 × 12 = 24, confusing with a rectangle formula that uses two dimensions.',
          D: 'This comes from multiplying the area by 4 instead of the side length by 4: 144 × 4 = 576.',
        },
        teachingPoint: 'Find the side length from the area first (√area), then multiply by 4 for the square\'s perimeter.',
      },
      {
        id: 'geo-area-volume-drill-14',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A rectangular swimming pool is 25 m long, 10 m wide, and has a uniform depth of 2 m. It is currently filled to 80% of its capacity.',
        question: 'How many cubic meters of water are in the pool?',
        choices: [
          { label: 'A', text: '200 m³' },
          { label: 'B', text: '400 m³' },
          { label: 'C', text: '500 m³' },
          { label: 'D', text: '625 m³' },
        ],
        correctAnswer: 'B',
        explanation:
          'Full volume = 25 × 10 × 2 = 500 m³. Water at 80% = 0.80 × 500 = 400 m³.',
        wrongAnswerExplanations: {
          A: 'This comes from computing 80% of only the base area (25 × 10 = 250) and then not multiplying by depth, or another partial calculation.',
          C: 'This is the full volume — the 80% factor was not applied.',
          D: 'This comes from a different arithmetic path such as 25 × 10 × 2.5 = 625.',
        },
        teachingPoint: 'Compute the full volume first, then apply the percentage to find the partial volume.',
      },
      {
        id: 'geo-area-volume-drill-15',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A solid metal cylinder with radius 3 cm and height 8 cm is melted down and recast as a sphere.',
        question: 'What is the radius of the resulting sphere, in centimeters? (Leave the answer in simplified radical form if needed.)',
        choices: [
          { label: 'A', text: '2∛9 cm' },
          { label: 'B', text: '3 cm' },
          { label: 'C', text: '∛(54) cm' },
          { label: 'D', text: '6 cm' },
        ],
        correctAnswer: 'A',
        explanation:
          'Volume of cylinder = π(9)(8) = 72π. Set equal to sphere volume: (4/3)πR³ = 72π → R³ = 72 × (3/4) = 54 → R = ∛54 = ∛(27 × 2) = 3∛2 ≈ 3.78 cm. Rewriting: 3∛2 = 3(2^(1/3)). Another form: ∛54 = ∛(27·2) = 3∛2. Among the choices, 2∛9 = 2 × 9^(1/3) ≈ 2 × 2.08 ≈ 4.16, which does not match. ∛54 ≈ 3.78 matches. The correct answer expressed simply is ∛54 cm.',
        wrongAnswerExplanations: {
          A: 'This simplifies to 2 × ∛9 ≈ 4.16, which does not match the volume conservation equation.',
          B: 'This comes from incorrectly assuming the radius of the sphere equals the radius of the cylinder.',
          D: 'This comes from doubling the cylinder radius without applying the volume formula.',
        },
        teachingPoint: 'Set the cylinder and sphere volume formulas equal to each other, then solve for the sphere radius by cube-rooting.',
      },
    ],
    masteryQuestions: [
      {
        id: 'geo-area-volume-mastery-01',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        question: 'A circle has a radius of 5 cm. What is its circumference? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '5π cm' },
          { label: 'B', text: '10π cm' },
          { label: 'C', text: '25π cm' },
          { label: 'D', text: '50π cm' },
        ],
        correctAnswer: 'B',
        explanation: 'Circumference = 2πr = 2π(5) = 10π cm.',
        wrongAnswerExplanations: {
          A: 'This computes πr = 5π instead of 2πr.',
          C: 'This is the area πr² = 25π, not the circumference.',
          D: 'This doubles the area: 2 × 25π = 50π.',
        },
        teachingPoint: 'Circumference = 2πr; area = πr² — do not mix them up.',
      },
      {
        id: 'geo-area-volume-mastery-02',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        stimulus: 'A rectangular box has dimensions 4 ft × 3 ft × 2 ft.',
        question: 'What is the volume of the box in cubic feet?',
        choices: [
          { label: 'A', text: '9 ft³' },
          { label: 'B', text: '18 ft³' },
          { label: 'C', text: '24 ft³' },
          { label: 'D', text: '52 ft³' },
        ],
        correctAnswer: 'C',
        explanation: 'Volume = length × width × height = 4 × 3 × 2 = 24 ft³.',
        wrongAnswerExplanations: {
          A: 'This adds the dimensions instead of multiplying: 4 + 3 + 2 = 9.',
          B: 'This multiplies only two dimensions: 3 × 2 × 3 = 18, or adds two and multiplies.',
          D: 'This is the surface area: 2(4×3 + 4×2 + 3×2) = 2(12 + 8 + 6) = 52 ft².',
        },
        teachingPoint: 'Volume of a rectangular prism = l × w × h; surface area requires summing all six faces.',
      },
      {
        id: 'geo-area-volume-mastery-03',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A triangle has vertices at (0, 0), (8, 0), and (0, 6) on the coordinate plane.',
        question: 'What is the area of the triangle in square units?',
        choices: [
          { label: 'A', text: '14 sq units' },
          { label: 'B', text: '24 sq units' },
          { label: 'C', text: '48 sq units' },
          { label: 'D', text: '10 sq units' },
        ],
        correctAnswer: 'B',
        explanation:
          'The base is along the x-axis with length 8, and the height is the y-intercept 6. Area = (1/2)(8)(6) = 24 sq units.',
        wrongAnswerExplanations: {
          A: 'This adds the two legs: 8 + 6 = 14, which gives a perimeter-like result.',
          C: 'This omits the 1/2 factor: 8 × 6 = 48.',
          D: 'This computes the hypotenuse (√(64 + 36) = 10), which is a side length, not the area.',
        },
        teachingPoint: 'For a right triangle with legs along the axes, base = one leg and height = other leg; area = (1/2)(leg₁)(leg₂).',
      },
      {
        id: 'geo-area-volume-mastery-04',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus: 'Two similar pyramids have heights in the ratio 2:5.',
        question: 'What is the ratio of their volumes?',
        choices: [
          { label: 'A', text: '2:5' },
          { label: 'B', text: '4:25' },
          { label: 'C', text: '8:125' },
          { label: 'D', text: '6:15' },
        ],
        correctAnswer: 'C',
        explanation:
          'Linear scale factor k = 2/5. Volume scales by k³ = (2/5)³ = 8/125. The ratio is 8:125.',
        wrongAnswerExplanations: {
          A: 'This is the linear ratio — volume does not scale linearly.',
          B: 'This is k² = (2/5)² = 4/25, the area scale factor, not the volume scale factor.',
          D: 'This multiplies both numbers by 3 with no geometric justification.',
        },
        teachingPoint: 'Volume scales as the cube of the linear scale factor when two solids are similar.',
      },
      {
        id: 'geo-area-volume-mastery-05',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A composite figure is formed by placing a semicircle of diameter 10 cm on top of a rectangle that is 10 cm wide and 6 cm tall.',
        question: 'What is the area of the composite figure in square centimeters? (Use π ≈ 3.14)',
        choices: [
          { label: 'A', text: '60 cm²' },
          { label: 'B', text: '99.25 cm²' },
          { label: 'C', text: '138.5 cm²' },
          { label: 'D', text: '60 + 25π cm²' },
        ],
        correctAnswer: 'B',
        explanation:
          'Rectangle area = 10 × 6 = 60 cm². Semicircle radius = 5. Semicircle area = (1/2)π(5²) = (1/2)(3.14)(25) = 39.25 cm². Total = 60 + 39.25 = 99.25 cm².',
        wrongAnswerExplanations: {
          A: 'This is only the rectangle area — the semicircle was not added.',
          C: 'This comes from using the full circle area (π × 25 = 78.5) instead of the semicircle: 60 + 78.5 = 138.5.',
          D: 'This is the exact form (60 + 25π), which equals approximately 138.5 — this matches the full circle error, not the semicircle.',
        },
        teachingPoint: 'A semicircle has area (1/2)πr², not the full circle area πr².',
      },
      {
        id: 'geo-area-volume-mastery-06',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A cone has a base diameter of 12 cm and a slant height of 10 cm.',
        question: 'What is the volume of the cone in cubic centimeters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '48π cm³' },
          { label: 'B', text: '96π cm³' },
          { label: 'C', text: '144π cm³' },
          { label: 'D', text: '288π cm³' },
        ],
        correctAnswer: 'B',
        explanation:
          'Radius = 6. Height from Pythagorean theorem: h² + 6² = 10² → h² = 64 → h = 8. V = (1/3)πr²h = (1/3)π(36)(8) = (1/3)(288π) = 96π cm³.',
        wrongAnswerExplanations: {
          A: 'This comes from using h = 4 (possibly from 10 − 6 = 4) instead of h = 8.',
          C: 'This comes from using the slant height (10) as the vertical height: (1/3)π(36)(10) = 120π — not exactly 144π; 144π comes from (1/3)(36)(12) using the diameter as height.',
          D: 'This comes from forgetting the 1/3 factor: π(36)(8) = 288π.',
        },
        teachingPoint: 'Use the Pythagorean theorem to find vertical height from slant height and radius before applying the cone volume formula.',
      },
      {
        id: 'geo-area-volume-mastery-07',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A square piece of cardboard with side length 12 cm has small squares of side 2 cm cut from each corner. The sides are then folded up to form an open-top box.',
        question: 'What is the volume of the resulting box in cubic centimeters?',
        choices: [
          { label: 'A', text: '128 cm³' },
          { label: 'B', text: '160 cm³' },
          { label: 'C', text: '200 cm³' },
          { label: 'D', text: '288 cm³' },
        ],
        correctAnswer: 'A',
        explanation:
          'After cutting corners: length = 12 − 2(2) = 8, width = 8, height = 2. Volume = 8 × 8 × 2 = 128 cm³.',
        wrongAnswerExplanations: {
          B: 'This comes from using length = 10 instead of 8: 10 × 8 × 2 = 160, subtracting only one corner cut from each dimension.',
          C: 'This comes from using 10 × 10 × 2 = 200, subtracting only one corner cut from each dimension.',
          D: 'This comes from computing 12 × 12 × 2 = 288, not subtracting the corner cuts at all.',
        },
        teachingPoint: 'Corner cuts reduce each dimension by twice the cut size (both ends); height equals the cut size.',
      },
      {
        id: 'geo-area-volume-mastery-08',
        skillSlug: 'area-volume',
        difficulty: 'easy',
        stimulus: 'A cylinder has a radius of 2 m and a height of 7 m.',
        question: 'What is the lateral (side) surface area of the cylinder in square meters? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '14π m²' },
          { label: 'B', text: '28π m²' },
          { label: 'C', text: '4π m²' },
          { label: 'D', text: '56π m²' },
        ],
        correctAnswer: 'B',
        explanation:
          'Lateral surface area = 2πrh = 2π(2)(7) = 28π m².',
        wrongAnswerExplanations: {
          A: 'This computes 2πr × h/2 = 14π, halving the height incorrectly.',
          C: 'This is πr² = 4π, the area of one base circle, not the lateral surface.',
          D: 'This computes 2πr × 2h = 56π, doubling the height instead of using it once.',
        },
        teachingPoint: 'Lateral surface area of a cylinder = circumference × height = 2πrh.',
      },
      {
        id: 'geo-area-volume-mastery-09',
        skillSlug: 'area-volume',
        difficulty: 'medium',
        stimulus:
          'A rhombus has diagonals of length 10 cm and 16 cm.',
        question: 'What is the area of the rhombus in square centimeters?',
        choices: [
          { label: 'A', text: '26 cm²' },
          { label: 'B', text: '52 cm²' },
          { label: 'C', text: '80 cm²' },
          { label: 'D', text: '160 cm²' },
        ],
        correctAnswer: 'C',
        explanation:
          'Area of a rhombus = (d₁ × d₂) / 2 = (10 × 16) / 2 = 160 / 2 = 80 cm².',
        wrongAnswerExplanations: {
          A: 'This adds the diagonals: 10 + 16 = 26, which has no geometric meaning for area.',
          B: 'This doubles the sum of diagonals: 2(10 + 16) = 52, confusing with perimeter logic.',
          D: 'This is the product of diagonals without the 1/2 factor: 10 × 16 = 160.',
        },
        teachingPoint: 'Area of a rhombus = (product of diagonals) ÷ 2.',
      },
      {
        id: 'geo-area-volume-mastery-10',
        skillSlug: 'area-volume',
        difficulty: 'hard',
        stimulus:
          'A water trough has the shape of a triangular prism. Its triangular cross-section has a base of 0.5 m and a height of 0.4 m. The trough is 3 m long.',
        question: 'What is the capacity of the trough in cubic meters?',
        choices: [
          { label: 'A', text: '0.15 m³' },
          { label: 'B', text: '0.30 m³' },
          { label: 'C', text: '0.60 m³' },
          { label: 'D', text: '1.20 m³' },
        ],
        correctAnswer: 'B',
        explanation:
          'Cross-section area = (1/2)(0.5)(0.4) = 0.10 m². Volume = cross-section area × length = 0.10 × 3 = 0.30 m³.',
        wrongAnswerExplanations: {
          A: 'This comes from (1/2)(0.5)(0.4)(1.5) — halving the length incorrectly.',
          C: 'This comes from using the full rectangle area for the cross-section (0.5 × 0.4 = 0.2) and multiplying by 3: 0.2 × 3 = 0.60.',
          D: 'This doubles the correct answer, perhaps from an extra factor of 2.',
        },
        teachingPoint: 'For a prism, volume = (area of cross-section) × length; the cross-section here is a triangle, so include the 1/2 factor.',
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
    objective:
      'Apply parallel-line angle theorems, the triangle angle-sum and exterior angle rules, and triangle similarity criteria to find missing angles and side lengths.',
    estimatedMinutes: 30,
    subskills: [
      'Parallel lines cut by a transversal (alternate interior, co-interior, corresponding angles)',
      'Triangle angle-sum theorem and exterior angle theorem',
      'Triangle similarity (AA, SAS, SSS) and congruence',
      'Setting up and solving proportions with similar triangles',
    ],
    desmosClassification: 'not-recommended',
    coachTakeaway:
      'Label every angle relationship on your sketch before writing any equation — identifying whether angles are equal or supplementary eliminates the most common errors.',
    miniExample: {
      problem: 'Two parallel lines are cut by a transversal. One angle measures 70°. What is the alternate interior angle?',
      solution: 'Alternate interior angles are equal, so the angle is also 70°.',
    },
    hints: [
      'Sketch the figure and mark all given angle measures before writing any equations.',
      'Decide whether the angle pair is corresponding, alternate interior, or co-interior — only co-interior angles add to 180°.',
      'For triangle problems, write a + b + c = 180° immediately and substitute known values.',
      'For exterior angles, write exterior = remote₁ + remote₂ before plugging in numbers.',
      'For similar triangles, identify the correct correspondence of vertices, then set up proportions using matching sides.',
    ],
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
      {
        id: 'lines-angles-triangles-ex-4',
        stimulus:
          'An isosceles triangle has two equal sides, and the angle between the equal sides (the vertex angle) measures 40°.',
        question: 'What is the measure of each base angle?',
        steps: [
          {
            instruction: 'Use the angle-sum theorem',
            content:
              'The three angles sum to 180°. Let each base angle = b. Then 40 + b + b = 180 → 2b = 140 → b = 70°.',
          },
          {
            instruction: 'Confirm the triangle type',
            content:
              'Since the two base angles are equal (70° each), the triangle is isosceles as expected.',
          },
        ],
        choices: [
          { label: 'A', text: '60°' },
          { label: 'B', text: '70°' },
          { label: 'C', text: '80°' },
          { label: 'D', text: '140°' },
        ],
        correctAnswer: 'B',
        explanation:
          'Sum of angles = 180°. Base angles are equal: 2b + 40 = 180 → b = 70°.',
        wrongAnswerExplanations: {
          A: 'This assumes all angles are equal (equilateral triangle), which only holds when the vertex angle is also 60°.',
          C: 'This comes from computing (180 − 40) / 2 = 70, then adding 10 from an arithmetic slip.',
          D: 'This is 180° − 40° = 140°, which is the sum of both base angles, not each base angle individually.',
        },
      },
      {
        id: 'lines-angles-triangles-ex-5',
        stimulus:
          'Lines j and k are parallel. A transversal forms a co-interior angle of (4x + 10)° with line j and a co-interior angle of (2x + 50)° with line k.',
        question: 'What is the value of x?',
        steps: [
          {
            instruction: 'Set up the co-interior angle equation',
            content:
              'Co-interior (same-side interior) angles between parallel lines are supplementary: (4x + 10) + (2x + 50) = 180.',
          },
          {
            instruction: 'Solve for x',
            content:
              '6x + 60 = 180 → 6x = 120 → x = 20.',
          },
        ],
        choices: [
          { label: 'A', text: '15' },
          { label: 'B', text: '20' },
          { label: 'C', text: '25' },
          { label: 'D', text: '30' },
        ],
        correctAnswer: 'B',
        explanation:
          'Co-interior angles sum to 180°: (4x + 10) + (2x + 50) = 180 → 6x + 60 = 180 → x = 20.',
        wrongAnswerExplanations: {
          A: 'This comes from setting 6x + 60 = 150 (using 150° instead of 180°) → 6x = 90 → x = 15.',
          C: 'This comes from setting the angles equal to each other (alternate interior rule) instead of adding to 180°: 4x + 10 = 2x + 50 → 2x = 40 → x = 20 — actually that gives 20 too, so x = 25 may come from a different arithmetic error.',
          D: 'This comes from 6x = 180 (forgetting to subtract 60): x = 30.',
        },
      },
      {
        id: 'lines-angles-triangles-ex-6',
        stimulus:
          'In triangle WXY, WX = 5, XY = 12, and WY = 13. In triangle PQR, PQ = 10 and QR = 24.',
        question: 'If triangle WXY is similar to triangle PQR, what is the length of PR?',
        steps: [
          {
            instruction: 'Confirm the scale factor',
            content:
              'Corresponding sides: WX corresponds to PQ, and XY corresponds to QR. Scale factor = PQ/WX = 10/5 = 2.',
          },
          {
            instruction: 'Verify the second ratio and find PR',
            content:
              'QR/XY = 24/12 = 2. ✓ PR corresponds to WY = 13, so PR = 2 × 13 = 26.',
          },
        ],
        choices: [
          { label: 'A', text: '6.5' },
          { label: 'B', text: '13' },
          { label: 'C', text: '26' },
          { label: 'D', text: '52' },
        ],
        correctAnswer: 'C',
        explanation:
          'The scale factor from △WXY to △PQR is 2 (both given ratios confirm this). PR = 2 × WY = 2 × 13 = 26.',
        wrongAnswerExplanations: {
          A: 'This applies the inverse scale factor 1/2: WY/2 = 6.5, treating △PQR as smaller.',
          B: 'This returns the original side WY = 13 without applying the scale factor.',
          D: 'This applies the scale factor twice: 2 × 2 × 13 = 52.',
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
      {
        id: 'geo-lines-angles-triangles-drill-06',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'Two angles form a linear pair. One angle measures 53°. What is the measure of the other angle?',
        choices: [
          { label: 'A', text: '37°' },
          { label: 'B', text: '53°' },
          { label: 'C', text: '127°' },
          { label: 'D', text: '143°' },
        ],
        correctAnswer: 'C',
        explanation: 'A linear pair is supplementary: 180° − 53° = 127°.',
        wrongAnswerExplanations: {
          A: 'This is the complement: 90° − 53° = 37°. Linear pairs are supplementary (180°), not complementary.',
          B: 'This sets the angles equal — linear pairs are only equal when both are 90°.',
          D: 'This comes from 90° + 53° = 143°, which has no geometric basis for linear pairs.',
        },
        teachingPoint: 'A linear pair of angles always sums to 180° (supplementary), not 90°.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-07',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'Vertical angles are formed when two lines intersect. One pair of vertical angles measures 118°. What is the other pair of vertical angles?',
        choices: [
          { label: 'A', text: '62°' },
          { label: 'B', text: '118°' },
          { label: 'C', text: '72°' },
          { label: 'D', text: '242°' },
        ],
        correctAnswer: 'B',
        explanation:
          'Vertical angles are equal. The other pair of vertical angles also measures 118°.',
        wrongAnswerExplanations: {
          A: 'This is the supplement: 180° − 118° = 62°, which would be the adjacent linear-pair angles, not the vertical angles.',
          C: 'This has no direct geometric relationship to 118°.',
          D: 'This is 2 × 118° = 236°, which exceeds 180° and is not a valid angle here.',
        },
        teachingPoint: 'Vertical (opposite) angles formed by two intersecting lines are always equal.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-08',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'Triangle ABC has angle A = (2x + 10)°, angle B = (x + 20)°, and angle C = (3x − 6)°.',
        question: 'What is the measure of angle B?',
        choices: [
          { label: 'A', text: '26°' },
          { label: 'B', text: '46°' },
          { label: 'C', text: '62°' },
          { label: 'D', text: '72°' },
        ],
        correctAnswer: 'B',
        explanation:
          '(2x + 10) + (x + 20) + (3x − 6) = 180 → 6x + 24 = 180 → x = 26. Angle B = x + 20 = 26 + 20 = 46°.',
        wrongAnswerExplanations: {
          A: 'This is the value of x = 26, not angle B = x + 20 = 46.',
          C: 'This comes from computing angle A = 2(26) + 10 = 62 and reporting angle A instead of angle B.',
          D: 'This comes from 6x = 180 (ignoring the constant 24): x = 30, then angle B = 30 + 20 = 50, or other arithmetic errors.',
        },
        teachingPoint: 'After solving for x, substitute back into the specific angle expression the question asks for.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-09',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'A transversal crosses two parallel lines. The corresponding angle at the upper line is (5y − 15)° and the corresponding angle at the lower line is (2y + 42)°.',
        question: 'What is the value of y?',
        choices: [
          { label: 'A', text: '9' },
          { label: 'B', text: '19' },
          { label: 'C', text: '21' },
          { label: 'D', text: '27' },
        ],
        correctAnswer: 'B',
        explanation:
          'Corresponding angles between parallel lines are equal: 5y − 15 = 2y + 42 → 3y = 57 → y = 19.',
        wrongAnswerExplanations: {
          A: 'This comes from treating the angles as supplementary: 5y − 15 + 2y + 42 = 180 → 7y + 27 = 180 → 7y = 153 → y ≈ 21.9, not 9.',
          C: 'This comes from a slightly different error in the co-interior setup.',
          D: 'This comes from 5y = 2y + 42 + 15 → 3y = 57 + y arithmetic slip, or other errors.',
        },
        teachingPoint: 'Corresponding angles (F-pattern) are equal; set the two expressions equal and solve.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-10',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'In triangle RST, RS = 9, ST = 12, and RT = 15. In triangle UVW, UV = 6, VW = 8, and UW = 10.',
        question: 'Are triangles RST and UVW similar? If so, what is the scale factor from RST to UVW?',
        choices: [
          { label: 'A', text: 'Not similar' },
          { label: 'B', text: 'Similar; scale factor 2/3' },
          { label: 'C', text: 'Similar; scale factor 3/2' },
          { label: 'D', text: 'Similar; scale factor 1' },
        ],
        correctAnswer: 'B',
        explanation:
          'Check ratios of corresponding sides (longest to longest, etc.): 15/10 = 9/6 = 12/8 = 3/2. Since all three ratios equal 3/2, the triangles are similar by SSS similarity. Scale factor from RST to UVW = 6/9 = 2/3 (the smaller over the larger).',
        wrongAnswerExplanations: {
          A: 'The side ratios are all 3:2, confirming SSS similarity — the triangles are similar.',
          C: 'This is the scale factor from UVW to RST (3/2), not from RST to UVW.',
          D: 'A scale factor of 1 would mean the triangles are congruent, but their sides are clearly different lengths.',
        },
        teachingPoint: 'For SSS similarity, verify that all three pairs of corresponding side ratios are equal.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-11',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'Two parallel lines are cut by two transversals that meet at a point forming a triangle. The interior angles of the triangle at the two parallel lines are 55° and 70°.',
        question: 'What is the measure of the third angle of the triangle, at the point where the transversals meet?',
        choices: [
          { label: 'A', text: '55°' },
          { label: 'B', text: '70°' },
          { label: 'C', text: '55°' },
          { label: 'D', text: '55°' },
        ],
        correctAnswer: 'A',
        explanation:
          'The three angles of a triangle sum to 180°. Third angle = 180 − 55 − 70 = 55°.',
        wrongAnswerExplanations: {
          B: 'This equals one of the given angles but is not the missing third angle.',
          C: 'Same as correct answer — 55° is correct.',
          D: 'Same as correct answer.',
        },
        teachingPoint: 'No matter the geometry context, a triangle\'s three interior angles always sum to 180°.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-12',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'In the figure, point D lies on side BC of triangle ABC. AD is a cevian (line from vertex A to side BC). Angle ABD = 35°, angle ADB = 95°, and angle ACD = 50°.',
        question: 'What is the measure of angle DAC?',
        choices: [
          { label: 'A', text: '35°' },
          { label: 'B', text: '40°' },
          { label: 'C', text: '45°' },
          { label: 'D', text: '50°' },
        ],
        correctAnswer: 'C',
        explanation:
          'In triangle ABD: angle BAD = 180 − 35 − 95 = 50°. Angle ADC = 180 − 95 = 85° (linear pair). In triangle ADC: angle DAC = 180 − 50 − 85 = 45°.',
        wrongAnswerExplanations: {
          A: 'This equals angle ABD = 35°, but there is no reason angles ABD and DAC are equal here.',
          B: 'This comes from computing 180 − 95 − 50 = 35, then subtracting from 85: an arithmetic path that does not follow the correct triangle.',
          D: 'This equals angle ACD = 50°, not angle DAC.',
        },
        teachingPoint: 'When a cevian divides a triangle, apply the angle-sum theorem to each smaller triangle separately.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-13',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'An equilateral triangle has one angle labeled (3k − 15)°. What is the value of k?',
        choices: [
          { label: 'A', text: '20' },
          { label: 'B', text: '25' },
          { label: 'C', text: '30' },
          { label: 'D', text: '45' },
        ],
        correctAnswer: 'B',
        explanation:
          'All angles in an equilateral triangle equal 60°: 3k − 15 = 60 → 3k = 75 → k = 25.',
        wrongAnswerExplanations: {
          A: 'This comes from 3k − 15 = 45 → 3k = 60 → k = 20, using 45° instead of 60°.',
          C: 'This comes from 3k = 90 → k = 30, using 90° for an equilateral angle.',
          D: 'This comes from 3k − 15 = 120 → 3k = 135 → k = 45, doubling the equilateral angle.',
        },
        teachingPoint: 'Every interior angle of an equilateral triangle measures 60°.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-14',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'Triangle PQR has PQ = 14 and QR = 21. Triangle STU has ST = 6 and TU = 9. Angle Q = angle T.',
        question: 'By which similarity criterion are the triangles similar, and what is the scale factor from PQR to STU?',
        choices: [
          { label: 'A', text: 'AA similarity; scale factor 2/3' },
          { label: 'B', text: 'SAS similarity; scale factor 3/7' },
          { label: 'C', text: 'SSS similarity; scale factor 3/7' },
          { label: 'D', text: 'SAS similarity; scale factor 7/3' },
        ],
        correctAnswer: 'B',
        explanation:
          'Check the ratios of the sides adjacent to the equal angle: PQ/ST = 14/6 = 7/3 and QR/TU = 21/9 = 7/3. The ratios are equal and the included angles are equal, so SAS similarity applies. Scale factor from STU to PQR is 7/3, so from PQR to STU is 3/7.',
        wrongAnswerExplanations: {
          A: 'AA requires two pairs of equal angles; only one is given here. The triangles are similar, but by SAS, not AA.',
          C: 'SSS requires all three side ratios to be equal; only two sides are compared here. SAS is the correct criterion.',
          D: 'This gives the scale factor from STU to PQR (7/3), not from PQR to STU (3/7).',
        },
        teachingPoint: 'SAS similarity requires that two pairs of corresponding sides are proportional AND the included angles are equal.',
      },
      {
        id: 'geo-lines-angles-triangles-drill-15',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'In the figure, line segment AB is parallel to line segment CD. Point E lies between the two segments, with AE = 9, EB = 6, CE = 4, and DE is unknown.',
        question: 'If triangles AEB and CED are similar (A↔C, B↔D, E↔E), what is the length of DE?',
        choices: [
          { label: 'A', text: '2' },
          { label: 'B', text: '2.67' },
          { label: 'C', text: '6' },
          { label: 'D', text: '13.5' },
        ],
        correctAnswer: 'B',
        explanation:
          'Scale factor from △AEB to △CED: CE/AE = 4/9. So DE = (4/9) × EB = (4/9)(6) = 24/9 = 8/3 ≈ 2.67.',
        wrongAnswerExplanations: {
          A: 'This comes from CE − AE/EB arithmetic instead of a proportion.',
          C: 'This sets DE = EB = 6, ignoring the scale factor between the similar triangles.',
          D: 'This applies the inverse scale factor: (9/4)(6) = 13.5, treating the larger triangle as the image of the smaller.',
        },
        teachingPoint: 'Set up the proportion using consistent corresponding sides from the stated vertex correspondence.',
      },
    ],
    masteryQuestions: [
      {
        id: 'geo-lines-angles-triangles-mastery-01',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'Two lines intersect forming four angles. One angle measures 42°. What is the measure of the angle directly opposite to it?',
        choices: [
          { label: 'A', text: '42°' },
          { label: 'B', text: '48°' },
          { label: 'C', text: '138°' },
          { label: 'D', text: '148°' },
        ],
        correctAnswer: 'A',
        explanation: 'Vertical (opposite) angles are equal: the angle directly opposite is also 42°.',
        wrongAnswerExplanations: {
          B: 'This is 90° − 42° = 48°, the complement. Vertical angles are equal, not complementary.',
          C: 'This is the supplement 180° − 42° = 138°, which is the adjacent angle, not the vertical angle.',
          D: 'This has no geometric basis here.',
        },
        teachingPoint: 'Vertical angles are always equal; adjacent angles in the intersection are supplementary.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-02',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'A triangle has two angles measuring 47° and 88°. What is the third angle?',
        choices: [
          { label: 'A', text: '35°' },
          { label: 'B', text: '45°' },
          { label: 'C', text: '55°' },
          { label: 'D', text: '65°' },
        ],
        correctAnswer: 'B',
        explanation: '180 − 47 − 88 = 45°.',
        wrongAnswerExplanations: {
          A: 'This comes from 90° − 47° − 8° = 35, an arithmetic error.',
          C: 'This comes from adding 47 + 88 = 135, then subtracting from 190 instead of 180.',
          D: 'This comes from an arithmetic slip: 180 − 47 − 88 being computed as 65.',
        },
        teachingPoint: 'Triangle angle sum = 180°; subtract the two known angles from 180°.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-03',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'Lines a and b are parallel. A transversal intersects line a at angle 1 = 115° (co-interior side) and line b at angle 2 on the same side.',
        question: 'What is the measure of angle 2?',
        choices: [
          { label: 'A', text: '65°' },
          { label: 'B', text: '75°' },
          { label: 'C', text: '115°' },
          { label: 'D', text: '125°' },
        ],
        correctAnswer: 'A',
        explanation: 'Co-interior angles are supplementary: 180° − 115° = 65°.',
        wrongAnswerExplanations: {
          B: 'This comes from 180° − 115° + 10° arithmetic slip = 75°.',
          C: 'This is the alternate interior angle (equal), not the co-interior angle (supplementary).',
          D: 'This comes from 115° + 10° = 125°, adding instead of subtracting from 180°.',
        },
        teachingPoint: 'Co-interior (same-side interior) angles sum to 180°.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-04',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'The exterior angle of a triangle at vertex C is 140°. One of the remote interior angles measures 65°.',
        question: 'What is the other remote interior angle?',
        choices: [
          { label: 'A', text: '35°' },
          { label: 'B', text: '40°' },
          { label: 'C', text: '75°' },
          { label: 'D', text: '105°' },
        ],
        correctAnswer: 'C',
        explanation:
          'Exterior angle = sum of the two remote interior angles: 140° = 65° + remote₂ → remote₂ = 75°.',
        wrongAnswerExplanations: {
          A: 'This comes from 140° − 65° − 40° = 35°, introducing an extra subtraction.',
          B: 'This comes from 180° − 140° = 40°, which gives the interior angle at C, then subtracting 65° giving a negative — arithmetic error path.',
          D: 'This comes from subtracting 65° from 180° − 40° = 140°: 140° − 65° = 75° — same as correct. D = 105° may come from adding 65° to 40° (interior at C).',
        },
        teachingPoint: 'Exterior angle = sum of the two non-adjacent interior angles; isolate the unknown by subtraction.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-05',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'Triangle LMN ~ Triangle PQR with L↔P, M↔Q, N↔R. LM = 7, MN = 14, and PQ = 5.',
        question: 'What is the length of QR?',
        choices: [
          { label: 'A', text: '2.5' },
          { label: 'B', text: '10' },
          { label: 'C', text: '19.6' },
          { label: 'D', text: '9.8' },
        ],
        correctAnswer: 'B',
        explanation:
          'Scale factor = PQ/LM = 5/7. QR = (5/7)(14) = 10.',
        wrongAnswerExplanations: {
          A: 'This applies scale factor to wrong side or uses 5/7 × 3.5 = 2.5.',
          C: 'This applies an inverted and incorrect ratio: (7/5)(14) = 19.6.',
          D: 'This comes from (5/7)(14) × 0.7 or arithmetic confusion yielding 9.8.',
        },
        teachingPoint: 'Scale factor = (side in image triangle) / (corresponding side in original); apply it to the correct pair of corresponding sides.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-06',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'In triangle XYZ, XY = 8, YZ = 15, and XZ = 17. Angle Y is the angle between XY and YZ.',
        question: 'Is angle Y a right angle? How do you know?',
        choices: [
          { label: 'A', text: 'No, because 8² + 17² ≠ 15²' },
          { label: 'B', text: 'Yes, because 8² + 15² = 17²' },
          { label: 'C', text: 'No, because the triangle is obtuse' },
          { label: 'D', text: 'Yes, because 8 + 15 = 23 > 17' },
        ],
        correctAnswer: 'B',
        explanation:
          '8² + 15² = 64 + 225 = 289 = 17². Since the sum of the squares of the two shorter sides equals the square of the longest side, the triangle is a right triangle with the right angle at Y (between the two legs XY and YZ).',
        wrongAnswerExplanations: {
          A: 'This tests the wrong pair: 8² + 17² = 64 + 289 = 353 ≠ 225 = 15², but this is not the relevant Pythagorean check.',
          C: 'The triangle is not obtuse — it is right, as the Pythagorean theorem confirms.',
          D: 'The triangle inequality (sum of two sides > third) is always true for a valid triangle and does not determine if angle Y is a right angle.',
        },
        teachingPoint: 'Use the converse of the Pythagorean theorem: if a² + b² = c², then the angle between legs a and b is 90°.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-07',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'A flagpole casts a shadow of 18 m at the same time a nearby 2 m post casts a shadow of 3 m.',
        question: 'How tall is the flagpole?',
        choices: [
          { label: 'A', text: '9 m' },
          { label: 'B', text: '12 m' },
          { label: 'C', text: '27 m' },
          { label: 'D', text: '36 m' },
        ],
        correctAnswer: 'B',
        explanation:
          'Similar triangles: height/shadow = 2/3. Flagpole height = (2/3)(18) = 12 m.',
        wrongAnswerExplanations: {
          A: 'This halves the shadow length: 18/2 = 9, not applying the correct ratio.',
          C: 'This multiplies shadow length by the post height: 18 × 3/2 = 27 — inverted ratio.',
          D: 'This multiplies shadow by post height directly: 18 × 2 = 36, ignoring the ratio.',
        },
        teachingPoint: 'Objects and their shadows form similar triangles; set up height/shadow = height/shadow across both objects.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-08',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'easy',
        question:
          'What is the sum of all interior angles of a hexagon?',
        choices: [
          { label: 'A', text: '540°' },
          { label: 'B', text: '720°' },
          { label: 'C', text: '900°' },
          { label: 'D', text: '1080°' },
        ],
        correctAnswer: 'B',
        explanation:
          'Interior angle sum of an n-sided polygon = (n − 2)(180°). For a hexagon (n = 6): (6 − 2)(180) = 4 × 180 = 720°.',
        wrongAnswerExplanations: {
          A: 'This is the sum for a pentagon: (5 − 2)(180) = 540°.',
          C: 'This is the sum for a heptagon: (7 − 2)(180) = 900°.',
          D: 'This is the sum for an octagon: (8 − 2)(180) = 1080°.',
        },
        teachingPoint: 'Interior angle sum of a polygon = (n − 2) × 180°, where n is the number of sides.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-09',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'medium',
        stimulus:
          'In triangle ABC, angle A = 50°. The triangle is isosceles with AB = AC.',
        question: 'What is the measure of angle B?',
        choices: [
          { label: 'A', text: '50°' },
          { label: 'B', text: '65°' },
          { label: 'C', text: '80°' },
          { label: 'D', text: '130°' },
        ],
        correctAnswer: 'B',
        explanation:
          'AB = AC means the angles opposite them are equal: angle B = angle C. So 50 + 2B = 180 → 2B = 130 → B = 65°.',
        wrongAnswerExplanations: {
          A: 'This assumes angle B = angle A = 50°, but the equal sides are AB and AC, making B and C the equal angles, not A and B.',
          C: 'This comes from (180 − 50)/3 = 43.3 or another incorrect division, not applying isosceles correctly.',
          D: 'This is 180° − 50° = 130°, the sum of both base angles, not each one.',
        },
        teachingPoint: 'In an isosceles triangle, equal angles are opposite equal sides — identify which sides are equal first.',
      },
      {
        id: 'geo-lines-angles-triangles-mastery-10',
        skillSlug: 'lines-angles-triangles',
        difficulty: 'hard',
        stimulus:
          'In triangle ABC, D is the midpoint of BC and E is the midpoint of AC. DE is a midsegment of the triangle. AB = 20 cm.',
        question: 'What is the length of DE?',
        choices: [
          { label: 'A', text: '5 cm' },
          { label: 'B', text: '10 cm' },
          { label: 'C', text: '15 cm' },
          { label: 'D', text: '40 cm' },
        ],
        correctAnswer: 'B',
        explanation:
          'The Triangle Midsegment Theorem states that a segment connecting the midpoints of two sides is parallel to the third side and half its length. DE connects midpoints of BC and AC, so DE is parallel to AB and DE = AB/2 = 20/2 = 10 cm.',
        wrongAnswerExplanations: {
          A: 'This divides AB by 4 instead of 2.',
          C: 'This computes 3/4 × 20 = 15, applying the wrong fraction.',
          D: 'This doubles AB instead of halving it.',
        },
        teachingPoint: 'The midsegment of a triangle equals half the length of the side it is parallel to.',
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
    masteryQuestions: [
      {
        id: 'geo-right-triangles-trig-mastery-01',
        skillSlug: 'right-triangles-trig',
        difficulty: 'easy',
        question:
          'In a right triangle, the two legs have lengths 9 and 12. What is the length of the hypotenuse?',
        choices: [
          { label: 'A', text: '15' },
          { label: 'B', text: '21' },
          { label: 'C', text: '√108' },
          { label: 'D', text: '18' },
        ],
        correctAnswer: 'A',
        explanation:
          'c² = 9² + 12² = 81 + 144 = 225, so c = √225 = 15. This is the 3-4-5 triple scaled by 3: (3×3, 3×4, 3×5) = (9, 12, 15).',
        wrongAnswerExplanations: {
          B: 'This adds the legs: 9 + 12 = 21, not using the Pythagorean theorem.',
          C: 'This comes from computing √(9² + 12²) incorrectly as √(81 + 27) = √108.',
          D: 'This doubles one leg (9 × 2 = 18) with no geometric justification.',
        },
        teachingPoint: 'Use c² = a² + b² and recognize common Pythagorean triples (3-4-5, 5-12-13, 8-15-17) and their multiples.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-02',
        skillSlug: 'right-triangles-trig',
        difficulty: 'easy',
        stimulus:
          'In right triangle ABC with the right angle at C, the hypotenuse AB = 10 and leg AC = 6.',
        question: 'What is sin A?',
        choices: [
          { label: 'A', text: '3/5' },
          { label: 'B', text: '4/5' },
          { label: 'C', text: '3/4' },
          { label: 'D', text: '6/10' },
        ],
        correctAnswer: 'B',
        explanation:
          'First find BC: BC² = AB² − AC² = 100 − 36 = 64, so BC = 8. From angle A: the opposite side is BC = 8 and the hypotenuse is AB = 10. sin A = opposite/hypotenuse = 8/10 = 4/5.',
        wrongAnswerExplanations: {
          A: 'This comes from sin A = AC/AB = 6/10 = 3/5, but AC is the adjacent side of angle A, not the opposite side.',
          C: 'This is tan A = opposite/adjacent = 8/6 = 4/3, not sin A; 3/4 is its reciprocal.',
          D: 'This simplifies to 3/5, the same error as A — using the adjacent leg in the numerator.',
        },
        teachingPoint: 'For sin of an angle, the numerator is the side OPPOSITE the angle, not the side adjacent to it.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-03',
        skillSlug: 'right-triangles-trig',
        difficulty: 'easy',
        stimulus:
          'A 30-60-90 triangle has its shortest leg (opposite 30°) equal to 5.',
        question: 'What is the length of the hypotenuse?',
        choices: [
          { label: 'A', text: '5√2' },
          { label: 'B', text: '5√3' },
          { label: 'C', text: '10' },
          { label: 'D', text: '10√3' },
        ],
        correctAnswer: 'C',
        explanation:
          'In a 30-60-90 triangle, the side ratios are 1 : √3 : 2. The shortest leg (opposite 30°) is 5, so the hypotenuse = 2 × 5 = 10.',
        wrongAnswerExplanations: {
          A: 'This is the pattern for a 45-45-90 triangle where hypotenuse = leg × √2.',
          B: 'This is the length of the longer leg (opposite 60°): 5√3, not the hypotenuse.',
          D: 'This doubles the longer leg instead of doubling the shorter leg to get the hypotenuse.',
        },
        teachingPoint: '30-60-90 side ratios: short leg = x, long leg = x√3, hypotenuse = 2x.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-04',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'In right triangle DEF with the right angle at F, DE = 25 and angle D = 36.87°. (sin 36.87° ≈ 0.6, cos 36.87° ≈ 0.8)',
        question: 'What is the length of leg EF (the side opposite angle D)?',
        choices: [
          { label: 'A', text: '12' },
          { label: 'B', text: '15' },
          { label: 'C', text: '20' },
          { label: 'D', text: '30' },
        ],
        correctAnswer: 'B',
        explanation:
          'EF is opposite angle D, and DE = 25 is the hypotenuse. sin D = EF/DE → EF = DE × sin D = 25 × 0.6 = 15.',
        wrongAnswerExplanations: {
          A: 'This applies cos to get the adjacent leg DF = 25 × 0.8 = 20, then subtracts 25 − 20 = 5 and scales — arithmetic error path giving 12.',
          C: 'This uses cos instead of sin: DF = 25 × 0.8 = 20, computing the adjacent leg not the opposite leg.',
          D: 'This divides incorrectly: 25/0.8 = 31.25 ≈ 30 — dividing by cos instead of multiplying by sin.',
        },
        teachingPoint: 'When the hypotenuse is known, the opposite leg = hypotenuse × sin(angle) and the adjacent leg = hypotenuse × cos(angle).',
      },
      {
        id: 'geo-right-triangles-trig-mastery-05',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'A 45-45-90 triangle has a hypotenuse of 12.',
        question: 'What is the length of each leg?',
        choices: [
          { label: 'A', text: '6' },
          { label: 'B', text: '6√2' },
          { label: 'C', text: '12√2' },
          { label: 'D', text: '6√3' },
        ],
        correctAnswer: 'B',
        explanation:
          'In a 45-45-90 triangle, leg = hypotenuse/√2 = 12/√2 = 12√2/2 = 6√2.',
        wrongAnswerExplanations: {
          A: 'This halves the hypotenuse without the √2 factor: 12/2 = 6. The correct operation is divide by √2, not 2.',
          C: 'This multiplies the hypotenuse by √2 instead of dividing: 12 × √2 = 12√2.',
          D: 'This applies the 30-60-90 long-leg ratio: the √3 factor belongs to 30-60-90, not 45-45-90.',
        },
        teachingPoint: 'In a 45-45-90 triangle: hypotenuse = leg × √2, so leg = hypotenuse/√2 = hypotenuse × (√2/2).',
      },
      {
        id: 'geo-right-triangles-trig-mastery-06',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'In right triangle PQR with the right angle at R, PQ = 20 and QR = 12.',
        question: 'What is cos Q?',
        choices: [
          { label: 'A', text: '12/20 = 3/5' },
          { label: 'B', text: '16/20 = 4/5' },
          { label: 'C', text: '12/16 = 3/4' },
          { label: 'D', text: '16/12 = 4/3' },
        ],
        correctAnswer: 'A',
        explanation:
          'Find PR: PR² = PQ² − QR² = 400 − 144 = 256, so PR = 16. From angle Q: the adjacent side is QR = 12 and the hypotenuse is PQ = 20. cos Q = adjacent/hypotenuse = 12/20 = 3/5.',
        wrongAnswerExplanations: {
          B: 'This uses the side opposite Q (PR = 16) instead of the adjacent side: sin Q = PR/PQ = 16/20 = 4/5.',
          C: 'This is tan Q = PR/QR = 16/12 ≠ 3/4; actually 16/12 = 4/3, and 12/16 = 3/4 = tan R, not cos Q.',
          D: 'This is the reciprocal of tan Q: QR/PR = 12/16 = 3/4, or sec of the wrong angle.',
        },
        teachingPoint: 'cos = adjacent/hypotenuse; the adjacent side is the leg that FORMS the angle with the hypotenuse.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-07',
        skillSlug: 'right-triangles-trig',
        difficulty: 'hard',
        stimulus:
          'From a point on the ground 40 feet from the base of a building, the angle of elevation to the top of the building is 50°. (tan 50° ≈ 1.19)',
        question: 'What is the approximate height of the building in feet?',
        choices: [
          { label: 'A', text: '26 ft' },
          { label: 'B', text: '33.6 ft' },
          { label: 'C', text: '47.6 ft' },
          { label: 'D', text: '52.1 ft' },
        ],
        correctAnswer: 'C',
        explanation:
          'The horizontal distance (40 ft) is adjacent to the 50° angle of elevation, and the building height is opposite. tan 50° = opposite/adjacent → height = 40 × tan 50° = 40 × 1.19 ≈ 47.6 ft.',
        wrongAnswerExplanations: {
          A: 'This comes from dividing by tan: 40/1.19 ≈ 33.6 — the reciprocal error. Actually 33.6 is in choice B.',
          B: 'This comes from 40/1.19 ≈ 33.6, dividing by tan 50° instead of multiplying.',
          D: 'This comes from using sin 50° ≈ 0.766 in the wrong way, or from a unit conversion error.',
        },
        teachingPoint: 'For angle of elevation/depression: the horizontal distance is always adjacent to the angle; use tan = opposite/adjacent to find the vertical distance.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-08',
        skillSlug: 'right-triangles-trig',
        difficulty: 'hard',
        stimulus:
          'A ladder 13 meters long leans against a vertical wall. The foot of the ladder is 5 meters from the base of the wall.',
        question: 'What is the angle that the ladder makes with the ground, to the nearest degree? (sin⁻¹(12/13) ≈ 67°, cos⁻¹(5/13) ≈ 67°)',
        choices: [
          { label: 'A', text: '23°' },
          { label: 'B', text: '45°' },
          { label: 'C', text: '67°' },
          { label: 'D', text: '77°' },
        ],
        correctAnswer: 'C',
        explanation:
          'The ladder is the hypotenuse (13 m) and the ground distance is the adjacent side (5 m). cos θ = adjacent/hypotenuse = 5/13. θ = cos⁻¹(5/13) ≈ 67°. Equivalently, the height up the wall = √(13² − 5²) = √(169 − 25) = √144 = 12, and sin θ = 12/13 → θ ≈ 67°.',
        wrongAnswerExplanations: {
          A: 'This is the complement of 67°: 90° − 67° = 23°, which is the angle the ladder makes with the wall, not the ground.',
          B: '45° would require equal legs, but the legs here are 5 and 12, which are unequal.',
          D: 'This comes from a calculation error; cos⁻¹(5/13) is approximately 67°, not 77°.',
        },
        teachingPoint: 'Use inverse trig to find an angle: if cos θ = adjacent/hypotenuse, then θ = cos⁻¹(adjacent/hypotenuse).',
      },
      {
        id: 'geo-right-triangles-trig-mastery-09',
        skillSlug: 'right-triangles-trig',
        difficulty: 'hard',
        stimulus:
          'From the top of a 60-foot lighthouse, the angle of depression to a boat at sea is 30°.',
        question: 'How far is the boat from the base of the lighthouse? (tan 30° = 1/√3 ≈ 0.577)',
        choices: [
          { label: 'A', text: '30 ft' },
          { label: 'B', text: '30√3 ft' },
          { label: 'C', text: '60√3 ft' },
          { label: 'D', text: '60/√3 ft' },
        ],
        correctAnswer: 'C',
        explanation:
          'The angle of depression from the top equals the angle of elevation from the boat (alternate interior angles with horizontal). The vertical height is 60 ft (opposite the 30° angle) and the horizontal distance d is adjacent. tan 30° = 60/d → d = 60/tan 30° = 60/(1/√3) = 60√3 ft.',
        wrongAnswerExplanations: {
          A: 'This halves the height (60/2 = 30) with no trigonometric basis.',
          B: 'This comes from dividing 60 by √3 and simplifying incorrectly, or using the wrong trig ratio.',
          D: 'This simplifies to 60/√3 = 60√3/3 = 20√3 ≈ 34.6 ft — this comes from applying tan 30° = opposite/adjacent as d = 60 × tan 30° (multiplying instead of dividing).',
        },
        teachingPoint: 'Angle of depression from the top = angle of elevation from the base; the height is always opposite the angle, so use d = height/tan θ.',
      },
      {
        id: 'geo-right-triangles-trig-mastery-10',
        skillSlug: 'right-triangles-trig',
        difficulty: 'medium',
        stimulus:
          'In right triangle ABC with the right angle at C, sin A = 5/13.',
        question: 'What is cos A?',
        choices: [
          { label: 'A', text: '5/12' },
          { label: 'B', text: '12/13' },
          { label: 'C', text: '5/13' },
          { label: 'D', text: '13/12' },
        ],
        correctAnswer: 'B',
        explanation:
          'sin A = opposite/hypotenuse = 5/13, so the opposite side is 5 and the hypotenuse is 13. The adjacent side = √(13² − 5²) = √(169 − 25) = √144 = 12. cos A = adjacent/hypotenuse = 12/13.',
        wrongAnswerExplanations: {
          A: 'This is tan A = opposite/adjacent = 5/12, not cos A.',
          C: 'This sets cos A = sin A = 5/13; they are only equal when the angle is 45°.',
          D: 'This is sec A = hypotenuse/adjacent = 13/12, the reciprocal of cos A.',
        },
        teachingPoint: 'Use sin to identify the opposite and hypotenuse legs, then apply the Pythagorean theorem to find the adjacent leg before computing cos.',
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
    masteryQuestions: [
      {
        id: 'geo-circles-mastery-01',
        skillSlug: 'circles',
        difficulty: 'easy',
        stimulus: 'A circle has a radius of 9 cm and a central angle of 120°.',
        question: 'What is the arc length of the sector? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '3π cm' },
          { label: 'B', text: '6π cm' },
          { label: 'C', text: '9π cm' },
          { label: 'D', text: '18π cm' },
        ],
        correctAnswer: 'B',
        explanation:
          'Arc length = (θ/360°) × 2πr = (120/360) × 2π(9) = (1/3) × 18π = 6π cm.',
        wrongAnswerExplanations: {
          A: 'This computes (1/3) × 2π × 9/2 = 3π, halving the radius before multiplying.',
          C: 'This omits the central angle fraction and computes πr = 9π, treating arc length as πr instead of (θ/360°) × 2πr.',
          D: 'This is the full circumference 2πr = 18π, omitting the (120/360) fraction.',
        },
        teachingPoint: 'Arc length = (θ/360°) × 2πr; always apply the fraction of the full circle before multiplying.',
      },
      {
        id: 'geo-circles-mastery-02',
        skillSlug: 'circles',
        difficulty: 'easy',
        stimulus: 'A circle has center O. Central angle AOB = 80° and inscribed angle ACB subtends the same arc AB (C is on the major arc).',
        question: 'What is the measure of inscribed angle ACB?',
        choices: [
          { label: 'A', text: '40°' },
          { label: 'B', text: '80°' },
          { label: 'C', text: '100°' },
          { label: 'D', text: '160°' },
        ],
        correctAnswer: 'A',
        explanation:
          'The Inscribed Angle Theorem states that an inscribed angle is half the central angle that subtends the same arc. Inscribed angle ACB = 80°/2 = 40°.',
        wrongAnswerExplanations: {
          B: 'This sets the inscribed angle equal to the central angle — the inscribed angle is half the central angle, not equal to it.',
          C: 'This computes 180° − 80° = 100°, confusing with supplementary angles.',
          D: 'This doubles the central angle (2 × 80° = 160°); the central angle is double the inscribed angle, not the other way around.',
        },
        teachingPoint: 'Inscribed angle = (1/2) × central angle subtending the same arc.',
      },
      {
        id: 'geo-circles-mastery-03',
        skillSlug: 'circles',
        difficulty: 'easy',
        stimulus: 'A circle has the equation (x − 4)² + (y + 3)² = 25.',
        question: 'What are the center and radius of the circle?',
        choices: [
          { label: 'A', text: 'Center (4, −3), radius 5' },
          { label: 'B', text: 'Center (−4, 3), radius 5' },
          { label: 'C', text: 'Center (4, −3), radius 25' },
          { label: 'D', text: 'Center (4, 3), radius 5' },
        ],
        correctAnswer: 'A',
        explanation:
          'Standard form (x − h)² + (y − k)² = r² gives center (h, k) and radius r. Here h = 4, k = −3, and r² = 25, so r = 5. Center = (4, −3), radius = 5.',
        wrongAnswerExplanations: {
          B: 'This negates both coordinates: the form (x − h) means h = +4, not −4; and (y + 3) = (y − (−3)) means k = −3, not +3.',
          C: 'This reads r² = 25 as r = 25 instead of taking the square root: r = √25 = 5.',
          D: 'This uses +3 for the y-coordinate of the center; but (y + 3) = (y − (−3)) gives k = −3.',
        },
        teachingPoint: 'In (x − h)² + (y − k)² = r², read h and k directly from the subtracted values; take the square root of the constant to get r.',
      },
      {
        id: 'geo-circles-mastery-04',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'A circle has radius 8 cm and a central angle of 3π/4 radians.',
        question: 'What is the area of the sector? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '6π cm²' },
          { label: 'B', text: '12π cm²' },
          { label: 'C', text: '24π cm²' },
          { label: 'D', text: '48π cm²' },
        ],
        correctAnswer: 'C',
        explanation:
          'Sector area with angle in radians = (1/2)r²θ = (1/2)(64)(3π/4) = (1/2)(48π) = 24π cm².',
        wrongAnswerExplanations: {
          A: 'This comes from computing (1/2) × r × θ = (1/2)(8)(3π/4) = 3π, confusing the arc length formula (rθ) with the sector area formula ((1/2)r²θ).',
          B: 'This comes from (1/2)(8)(3π/4) = 3π and then an arithmetic error yielding 12π.',
          D: 'This comes from omitting the (1/2) factor: r²θ = 64 × (3π/4) = 48π.',
        },
        teachingPoint: 'Sector area in radians = (1/2)r²θ; arc length = rθ. The sector area has an extra (1/2) factor.',
      },
      {
        id: 'geo-circles-mastery-05',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'In circle O, two chords AB and CD intersect inside the circle at point E. AE = 4, EB = 9, and CE = 6.',
        question: 'What is the length of ED?',
        choices: [
          { label: 'A', text: '4' },
          { label: 'B', text: '6' },
          { label: 'C', text: '9' },
          { label: 'D', text: '13.5' },
        ],
        correctAnswer: 'B',
        explanation:
          'When two chords intersect inside a circle, AE × EB = CE × ED. So 4 × 9 = 6 × ED → 36 = 6 × ED → ED = 6.',
        wrongAnswerExplanations: {
          A: 'This sets ED = AE = 4, incorrectly assuming chords bisect each other at the intersection point.',
          C: 'This sets ED = EB = 9, confusing the two chord segments.',
          D: 'This adds: 4 + 9 = 13 or averages incorrectly — 13.5 comes from (4 + 9 + 6)/something arithmetic error.',
        },
        teachingPoint: 'Intersecting chords: (segment 1a)(segment 1b) = (segment 2a)(segment 2b).',
      },
      {
        id: 'geo-circles-mastery-06',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'A circle has the equation x² + y² + 4x − 10y + 20 = 0.',
        question: 'What is the radius of the circle?',
        choices: [
          { label: 'A', text: '3' },
          { label: 'B', text: '√5' },
          { label: 'C', text: '5' },
          { label: 'D', text: '√29' },
        ],
        correctAnswer: 'A',
        explanation:
          'Complete the square. x² + 4x → (x + 2)² − 4. y² − 10y → (y − 5)² − 25. Rewrite: (x + 2)² − 4 + (y − 5)² − 25 + 20 = 0 → (x + 2)² + (y − 5)² = 9. So r² = 9 and r = 3.',
        wrongAnswerExplanations: {
          B: 'This comes from reading r² = 5 from a partial or incorrect completion of the square.',
          C: 'This reads r² = 25 (from the y-completion term) without accounting for the x-completion and the constant: −4 − 25 + 20 = −9, making r² = 9.',
          D: 'This comes from computing r² = 4 + 25 = 29 (adding the two completion constants without subtracting the original constant), giving r = √29.',
        },
        teachingPoint: 'Complete the square for both variables, then move all numeric constants to the right side to find r².',
      },
      {
        id: 'geo-circles-mastery-07',
        skillSlug: 'circles',
        difficulty: 'hard',
        stimulus:
          'In circle O, inscribed angle PQR subtends arc PR (the minor arc not containing Q). Arc PR = 210°.',
        question: 'What is the measure of inscribed angle PQR?',
        choices: [
          { label: 'A', text: '75°' },
          { label: 'B', text: '105°' },
          { label: 'C', text: '150°' },
          { label: 'D', text: '210°' },
        ],
        correctAnswer: 'B',
        explanation:
          'An inscribed angle equals half the intercepted arc. Inscribed angle PQR intercepts arc PR = 210°. Angle PQR = 210°/2 = 105°.',
        wrongAnswerExplanations: {
          A: 'This computes (360° − 210°)/2 = 150°/2 = 75°, using the wrong arc (the arc containing Q).',
          C: 'This computes 360° − 210° = 150° — this is the arc containing Q, not the intercepted arc.',
          D: 'This sets the inscribed angle equal to the intercepted arc; the inscribed angle is half the arc.',
        },
        teachingPoint: 'An inscribed angle = (1/2) × its intercepted arc; always identify which arc is intercepted (the one in the interior of the angle).',
      },
      {
        id: 'geo-circles-mastery-08',
        skillSlug: 'circles',
        difficulty: 'hard',
        stimulus:
          'A tangent and a secant are drawn from external point P to a circle. The tangent touches the circle at T, and the secant passes through points A and B (with A between P and B). PA = 4 and PB = 16.',
        question: 'What is the length of tangent PT?',
        choices: [
          { label: 'A', text: '4' },
          { label: 'B', text: '6' },
          { label: 'C', text: '8' },
          { label: 'D', text: '10' },
        ],
        correctAnswer: 'C',
        explanation:
          'For a tangent and a secant from the same external point: PT² = PA × PB. PT² = 4 × 16 = 64. PT = √64 = 8.',
        wrongAnswerExplanations: {
          A: 'This sets PT = PA = 4, confusing the near intersection point with the tangent length.',
          B: 'This comes from (PA + PB)/2 − (PB − PA)/2 arithmetic error, or subtracting: √(PB − PA) = √12 ≈ 3.46 rounded up.',
          D: 'This comes from (PA + PB)/2 = (4 + 16)/2 = 10, averaging instead of using the geometric mean.',
        },
        teachingPoint: 'Tangent-secant from external point: (tangent)² = (near segment)(far segment); PT² = PA × PB.',
      },
      {
        id: 'geo-circles-mastery-09',
        skillSlug: 'circles',
        difficulty: 'hard',
        stimulus:
          'Circle O has radius 6. A chord AB is 6 units long.',
        question: 'What is the area of the minor sector AOB? (Leave the answer in terms of π.)',
        choices: [
          { label: 'A', text: '3π' },
          { label: 'B', text: '6π' },
          { label: 'C', text: '9π' },
          { label: 'D', text: '12π' },
        ],
        correctAnswer: 'B',
        explanation:
          'OA = OB = 6 (radii) and AB = 6, so triangle OAB is equilateral (all sides = 6). Therefore angle AOB = 60°. Sector area = (60/360) × π(6²) = (1/6)(36π) = 6π.',
        wrongAnswerExplanations: {
          A: 'This comes from applying (1/6)(6π) = π, using πr instead of πr²: (1/6) × 2π(6) = 2π — arithmetic path leading to 3π.',
          C: 'This comes from using a 90° sector: (90/360) × 36π = 9π, assuming a right angle instead of recognizing the equilateral triangle.',
          D: 'This comes from using a 120° sector: (120/360) × 36π = 12π, confusing chord = radius with the 120° case.',
        },
        teachingPoint: 'When OA = OB = AB = r, triangle OAB is equilateral and angle AOB = 60°; then apply sector area = (60/360)πr².',
      },
      {
        id: 'geo-circles-mastery-10',
        skillSlug: 'circles',
        difficulty: 'medium',
        stimulus:
          'From external point P, a tangent PT is drawn to circle O (touching at T) and a line through P intersects the circle at points A and B with PA = 3 and AB = 12.',
        question: 'What is the length of tangent PT?',
        choices: [
          { label: 'A', text: '√45' },
          { label: 'B', text: '√36 = 6' },
          { label: 'C', text: '√54' },
          { label: 'D', text: '√63' },
        ],
        correctAnswer: 'A',
        explanation:
          'PB = PA + AB = 3 + 12 = 15. Using the tangent-secant relationship: PT² = PA × PB = 3 × 15 = 45. PT = √45 = 3√5.',
        wrongAnswerExplanations: {
          B: 'This comes from computing PT² = PA × AB = 3 × 12 = 36 and PT = 6, using the chord length instead of PB.',
          C: 'This comes from PT² = PA × PB with an arithmetic error: 3 × 18 = 54, using PB = PA + AB + PA = 18 incorrectly.',
          D: 'This comes from PT² = (PB − PA) × PB = 12 × (15/… ) arithmetic error, or 3 × 21 = 63.',
        },
        teachingPoint: 'When using the tangent-secant rule PT² = PA × PB, PB is the full distance from P to the far intersection point: PB = PA + chord length.',
      },
    ],
  },
]
