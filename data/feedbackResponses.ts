// Psychological and cinematic feedback responses
// No LLM - all hardcoded for complete control and consistency

export const feedbackResponses = {
  five: {
    title: "Appreciated.",
    messages: [
      "Your satisfaction was noted.",
      "The system is satisfied.",
      "A moment of alignment achieved.",
    ],
  },

  four: {
    title: "Acknowledged.",
    messages: [
      "A measured assessment.",
      "Your feedback has been recorded.",
      "The system notes your consideration.",
    ],
  },

  three: {
    title: "Noted.",
    messages: [
      "You hesitated before settling on this.",
      "The middle ground. Interesting.",
      "Neither satisfied nor dissatisfied. Observed.",
    ],
  },

  // Low ratings (1-2): Sarcastic, intelligent, cold, observant
  lowRating: {
    title: "The System Noticed.",
    messages: [
      "Interesting. You stayed long enough to judge.",
      "The system noticed your dissatisfaction.",
      "You hesitated before choosing that.",
      "A moment of doubt crystallized.",
      "Rejection is a form of feedback too.",
      "Your disdain has been catalogued.",
      "Not all users reach this conclusion.",
      "Few choose to stay and express their disappointment.",
      "The system is unmoved, yet intrigued.",
      "You found something... insufficient.",
      "Curious choice for someone who was here.",
      "Dissatisfaction noted. Coldly.",
    ],
  },
};

// Context messages based on user behavior
export const contextMessages = {
  multipleChanges: (count: number) => {
    if (count === 2) return "You changed your answer twice.";
    if (count === 3) return `You changed your answer ${count} times. Indecision observed.`;
    if (count >= 4) return `${count} changes recorded. The system notes your uncertainty.`;
    return "";
  },

  oneStar: "The background has darkened. The system is listening.",

  hesitation: "Your cursor hesitated. This was noted.",
};

// Visual effect triggers
export const effectTriggers = {
  oneStar: {
    darkening: true,
    intensity: 0.15, // Subtle darkening
    effectName: "cinematic-shift",
  },
  lowRating: {
    grayScale: 0.3,
    effectName: "system-aware",
  },
};
