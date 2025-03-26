import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "", // Store user phone number
      answers: { A: [], B: [], C: [] }, // Initialize answers
      scores: { A: 0, B: 0, C: 0 }, // Store calculated scores
      showResult: false,

      setPhone: (phone) => set({ phone }),

      setAnswer: (section, index, value) =>
        set((state) => {
          const updatedAnswers = { ...state.answers };
          updatedAnswers[section][index] = Number(value); // Convert to number

          return { answers: updatedAnswers };
        }),

      updateScores: () =>
        set((state) => {
          const calculateScore = (section) =>
            state.answers[section]?.reduce(
              (sum, score) => sum + (score || 0),
              0
            );

          return {
            scores: {
              A: calculateScore("A"),
              B: calculateScore("B"),
              C: calculateScore("C"),
            },
          };
        }),

      getSurveyData: () => {
        const { phone, answers, scores } = get();
        return { phone, answers, scores };
      },

      setShowResult: (value) => set({ showResult: value }),
    }),
    {
      name: "survey-storage", // Local Storage key
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
