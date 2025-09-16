import { create } from "zustand";
import { persist } from "zustand/middleware";
import { skillMapping } from "../data/Questions";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      answers: {}, // { [questionId]: value }
      scores: {}, // { skill: { score, level } }

      setPhone: (phone) => set({ phone }),

      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: Number(value) },
        })),

      calculateScores: () => {
        const { answers } = get();
        const skillScores = {};

        // initialize skills with 0
        ["التوجيه", "المساندة", "الرعاية", "التفويض"].forEach(
          (skill) => (skillScores[skill] = 0)
        );

        // sum up scores for each skill
        for (const [qId, value] of Object.entries(answers)) {
          const skill = skillMapping[qId];
          if (skill) {
            skillScores[skill] += value;
          }
        }

        // assign level based on threshold
        const finalScores = {};
        for (const [skill, total] of Object.entries(skillScores)) {
          finalScores[skill] = {
            score: total,
            level: total >= 36 ? "Strong" : "Needs Improvement",
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
      name: "leadership-abilities-survey",
      getStorage: () => localStorage,
    }
  )
);
