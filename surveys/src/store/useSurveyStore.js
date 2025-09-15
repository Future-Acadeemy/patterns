import { create } from "zustand";
import { persist } from "zustand/middleware";

// Section mapping: each question belongs to a section (A–E)
const questionMapping = {
  1: "A",
  2: "A",
  3: "A",
  4: "A", // Decision making
  5: "B",
  6: "B",
  7: "B",
  8: "B",
  9: "B",
  10: "B", // Communication
  11: "C",
  12: "C",
  13: "C",
  14: "C",
  15: "C",
  16: "C",
  17: "C",
  18: "C", // Motivation
  19: "D",
  20: "D",
  21: "D",
  22: "D",
  23: "D",
  24: "D",
  25: "D",
  26: "D",
  27: "D",
  28: "D", // Conflict Mgmt
  29: "E",
  30: "E",
  31: "E",
  32: "E",
  33: "E",
  34: "E",
  35: "E",
  36: "E",
  37: "E",
  38: "E",
  39: "E",
  40: "E", // Meetings
  41: "E",
  42: "E",
  43: "E",
  44: "E",
  45: "E",
  46: "E",
  47: "E",
  48: "E",
};

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      // answers = { [id]: { freq, imp } }
      answers: {},
      scores: {},
      showResult: false,

      setPhone: (phone) => set({ phone }),

      setAnswer: (questionId, type, value) =>
        set((state) => {
          const updated = { ...state.answers };
          if (!updated[questionId]) updated[questionId] = { freq: 0, imp: 0 };
          updated[questionId][type] = Number(value);

          return { answers: updated };
        }),

      // 🧮 Calculate scores
      calculateScores: () => {
        const { answers } = get();
        const sectionScores = {};

        Object.entries(answers).forEach(([qId, { freq, imp }]) => {
          const questionNumber = Number(qId);
          const section = questionMapping[questionNumber];

          if (section) {
            // Multiply freq × imp (main rule)
            const score = freq * imp;

            if (!sectionScores[section]) {
              sectionScores[section] = { total: 0, count: 0 };
            }
            sectionScores[section].total += score;
            sectionScores[section].count += 1;
          }
        });

        // Normalize & assign levels
        const finalScores = {};
        for (const [section, { total }] of Object.entries(sectionScores)) {
          finalScores[section] = {
            score: total,
            level: total > 30 ? "High" : "Low",
          };
        }

        set({ scores: finalScores });
      },

      setScores: (scores) => set({ scores }),
      setShowResult: (value) => set({ showResult: value }),

      getSurveyData: () => {
        const { phone, answers, scores } = get();
        return { phone, answers, scores };
      },
    }),
    {
      name: "leadership-survey",
      getStorage: () => localStorage,
    }
  )
);
