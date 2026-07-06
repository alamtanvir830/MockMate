export type Difficulty = 'easy' | 'medium' | 'hard'

export interface QuestionMeta {
  difficulty: Difficulty
  section: 'ela' | 'math'
  domain: string
  skill: string
}

export interface PassageMeta {
  difficulty: Difficulty
}

// Passage difficulty (for adaptive passage-unit selection in RC)
export const PASSAGE_META: Record<string, PassageMeta> = {
  'passage-1': { difficulty: 'medium' },
  'passage-2': { difficulty: 'medium' },
  'passage-3': { difficulty: 'medium' },
  'passage-4': { difficulty: 'hard'   },
}

// Per-question metadata shared across Form 1 and Form 2 (same ID structure)
export const QUESTION_META: Record<string, QuestionMeta> = {

  // ── RC Passage 1 (7 Q) ────────────────────────────────────────────────────
  'p1q1': { difficulty: 'easy',   section: 'ela', domain: 'reading_comprehension', skill: 'central_idea'    },
  'p1q2': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'text_evidence'   },
  'p1q3': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'vocabulary'      },
  'p1q4': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_craft'   },
  'p1q5': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'inference'       },
  'p1q6': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_purpose' },
  'p1q7': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'categorization'  },

  // ── RC Passage 2 (9 Q) ────────────────────────────────────────────────────
  'p2q1': { difficulty: 'easy',   section: 'ela', domain: 'reading_comprehension', skill: 'central_idea'    },
  'p2q2': { difficulty: 'easy',   section: 'ela', domain: 'reading_comprehension', skill: 'detail'          },
  'p2q3': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'vocabulary'      },
  'p2q4': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'inference'       },
  'p2q5': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'text_structure'  },
  'p2q6': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'inference'       },
  'p2q7': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_claim'   },
  'p2q8': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'text_function'   },
  'p2q9': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'synthesis'       },

  // ── RC Passage 3 (9 Q) ────────────────────────────────────────────────────
  'p3q1': { difficulty: 'easy',   section: 'ela', domain: 'reading_comprehension', skill: 'detail'          },
  'p3q2': { difficulty: 'easy',   section: 'ela', domain: 'reading_comprehension', skill: 'sequence'        },
  'p3q3': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'inference'       },
  'p3q4': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'motivation'      },
  'p3q5': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'text_structure'  },
  'p3q6': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'vocabulary'      },
  'p3q7': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'theme'           },
  'p3q8': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_craft'   },
  'p3q9': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'characterization'},

  // ── RC Passage 4 (9 Q) ────────────────────────────────────────────────────
  'p4q1': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'central_idea'    },
  'p4q2': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'detail'          },
  'p4q3': { difficulty: 'medium', section: 'ela', domain: 'reading_comprehension', skill: 'vocabulary'      },
  'p4q4': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'inference'       },
  'p4q5': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'text_evidence'   },
  'p4q6': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_argument'},
  'p4q7': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'synthesis'       },
  'p4q8': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'evaluation'      },
  'p4q9': { difficulty: 'hard',   section: 'ela', domain: 'reading_comprehension', skill: 'authors_craft'   },

  // ── Revising & Editing Part A (8 Q) ──────────────────────────────────────
  're-a-q1': { difficulty: 'easy',   section: 'ela', domain: 'revising_editing', skill: 'organization'       },
  're-a-q2': { difficulty: 'easy',   section: 'ela', domain: 'revising_editing', skill: 'clarity'            },
  're-a-q3': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'organization'       },
  're-a-q4': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'supporting_evidence'},
  're-a-q5': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'word_choice'        },
  're-a-q6': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'sentence_placement' },
  're-a-q7': { difficulty: 'hard',   section: 'ela', domain: 'revising_editing', skill: 'development'        },
  're-a-q8': { difficulty: 'hard',   section: 'ela', domain: 'revising_editing', skill: 'conclusion'         },

  // ── Revising & Editing Part B (8 Q) ──────────────────────────────────────
  're-b-q1': { difficulty: 'easy',   section: 'ela', domain: 'revising_editing', skill: 'grammar'           },
  're-b-q2': { difficulty: 'easy',   section: 'ela', domain: 'revising_editing', skill: 'punctuation'       },
  're-b-q3': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'grammar'           },
  're-b-q4': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'word_choice'       },
  're-b-q5': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'agreement'         },
  're-b-q6': { difficulty: 'medium', section: 'ela', domain: 'revising_editing', skill: 'word_usage'        },
  're-b-q7': { difficulty: 'hard',   section: 'ela', domain: 'revising_editing', skill: 'parallel_structure'},
  're-b-q8': { difficulty: 'hard',   section: 'ela', domain: 'revising_editing', skill: 'transition'        },

  // ── Mathematics — Easy (7 Q) ─────────────────────────────────────────────
  'math-q1': { difficulty: 'easy', section: 'math', domain: 'arithmetic', skill: 'computation'   },
  'math-q2': { difficulty: 'easy', section: 'math', domain: 'arithmetic', skill: 'computation'   },
  'math-q3': { difficulty: 'easy', section: 'math', domain: 'arithmetic', skill: 'fractions'     },
  'math-q4': { difficulty: 'easy', section: 'math', domain: 'arithmetic', skill: 'percentages'   },
  'math-q5': { difficulty: 'easy', section: 'math', domain: 'arithmetic', skill: 'ratios'        },
  'math-q6': { difficulty: 'easy', section: 'math', domain: 'algebra',    skill: 'expressions'   },
  'math-q7': { difficulty: 'easy', section: 'math', domain: 'algebra',    skill: 'equations'     },

  // ── Mathematics — Medium (20 Q) ──────────────────────────────────────────
  'math-q14': { difficulty: 'medium', section: 'math', domain: 'arithmetic',   skill: 'number_properties' },
  'math-q15': { difficulty: 'medium', section: 'math', domain: 'arithmetic',   skill: 'fractions'         },
  'math-q16': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'linear_equations'  },
  'math-q17': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'inequalities'      },
  'math-q18': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'patterns'          },
  'math-q19': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'functions'         },
  'math-q20': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'systems'           },
  'math-q21': { difficulty: 'medium', section: 'math', domain: 'geometry',     skill: 'perimeter_area'    },
  'math-q22': { difficulty: 'medium', section: 'math', domain: 'geometry',     skill: 'angles'            },
  'math-q23': { difficulty: 'medium', section: 'math', domain: 'geometry',     skill: 'triangles'         },
  'math-q24': { difficulty: 'medium', section: 'math', domain: 'geometry',     skill: 'coordinate_geometry'},
  'math-q25': { difficulty: 'medium', section: 'math', domain: 'statistics',   skill: 'mean_median'       },
  'math-q26': { difficulty: 'medium', section: 'math', domain: 'statistics',   skill: 'probability'       },
  'math-q27': { difficulty: 'medium', section: 'math', domain: 'word_problem', skill: 'rates'             },
  'math-q28': { difficulty: 'medium', section: 'math', domain: 'word_problem', skill: 'percent_change'    },
  'math-q29': { difficulty: 'medium', section: 'math', domain: 'arithmetic',   skill: 'exponents'         },
  'math-q30': { difficulty: 'medium', section: 'math', domain: 'algebra',      skill: 'quadratics'        },
  'math-q31': { difficulty: 'medium', section: 'math', domain: 'geometry',     skill: 'circles'           },
  'math-q32': { difficulty: 'medium', section: 'math', domain: 'statistics',   skill: 'data_interpretation'},
  'math-q33': { difficulty: 'medium', section: 'math', domain: 'word_problem', skill: 'multi_step'        },

  // ── Mathematics — Hard (23 Q) ────────────────────────────────────────────
  'math-q34': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'advanced_equations'  },
  'math-q35': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'polynomials'         },
  'math-q36': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'similar_figures'     },
  'math-q37': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'pythagorean'         },
  'math-q38': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'systems_complex'     },
  'math-q39': { difficulty: 'hard', section: 'math', domain: 'statistics',   skill: 'combinations'        },
  'math-q40': { difficulty: 'hard', section: 'math', domain: 'word_problem', skill: 'complex_rates'       },
  'math-q41': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'sequences'           },
  'math-q42': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'volume_surface'      },
  'math-q43': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'functions_advanced'  },
  'math-q44': { difficulty: 'hard', section: 'math', domain: 'statistics',   skill: 'data_analysis'       },
  'math-q45': { difficulty: 'hard', section: 'math', domain: 'word_problem', skill: 'optimization'        },
  'math-q46': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'coordinate_advanced' },
  'math-q48': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'grid_in'             },
  'math-q49': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'grid_in'             },
  'math-q50': { difficulty: 'hard', section: 'math', domain: 'arithmetic',   skill: 'grid_in'             },
  'math-q51': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'grid_in'             },
  'math-q52': { difficulty: 'hard', section: 'math', domain: 'word_problem', skill: 'grid_in'             },
  'math-q53': { difficulty: 'hard', section: 'math', domain: 'geometry',     skill: 'grid_in'             },
  'math-q54': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'grid_in'             },
  'math-q55': { difficulty: 'hard', section: 'math', domain: 'statistics',   skill: 'grid_in'             },
  'math-q56': { difficulty: 'hard', section: 'math', domain: 'algebra',      skill: 'grid_in'             },
  'math-q57': { difficulty: 'hard', section: 'math', domain: 'word_problem', skill: 'grid_in'             },
}
