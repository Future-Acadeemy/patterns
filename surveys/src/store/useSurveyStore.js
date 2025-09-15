import { create } from "zustand";
import { persist } from "zustand/middleware";
import { intelligenceMapping } from "../data/Questions";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "", // Add phone field
      answers: {}, // { [questionId]: value }
      scores: {}, // { intelligence: { score: number, level: string } }

      setPhone: (phone) => set({ phone }),

      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: Number(value) },
        })),

      calculateScores: () => {
        const { answers } = get();
        const finalScores = {};

        for (const [intelligence, questionIds] of Object.entries(
          intelligenceMapping
        )) {
          const total = questionIds.reduce(
            (sum, qId) => sum + (answers[qId] || 0),
            0
          );
          finalScores[intelligence] = {
            score: total,
            level: total > 15 ? "High" : "Low", // You can adjust threshold
          };
        }

        set({ scores: finalScores });
      },

      getSurveyData: () => {
        const { phone, answers, scores } = get();
        return { phone, answers, scores };
      },
    }),
    {
      name: "personal-abilities-survey",
      getStorage: () => localStorage,
    }
  )
);
