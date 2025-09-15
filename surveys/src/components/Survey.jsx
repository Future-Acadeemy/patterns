import React from "react";
import {
  leadershipQuestions,
  frequencyOptions,
  importanceOptions,
  skillMapping,
} from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";

const Survey = () => {
  const { answers, setAnswer, setScores, getSurveyData, setShowResult } =
    useSurveyStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Calculate scores inside the component (mutation here)
    const questionScores = Object.entries(answers).reduce(
      (acc, [id, { freq, imp }]) => {
        acc[id] = (freq || 0) * (imp || 0);
        return acc;
      },
      {}
    );

    const skillScores = {};
    for (const [skill, ids] of Object.entries(skillMapping)) {
      skillScores[skill] = ids.reduce(
        (sum, id) => sum + (questionScores[id] || 0),
        0
      );
    }

    setScores(skillScores);
    setShowResult(true);

    console.log("Survey Data:", getSurveyData());
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Question</th>
            <th colSpan={3} className="p-2 border text-center">
              Frequency
            </th>
            <th colSpan={3} className="p-2 border text-center">
              Importance
            </th>
          </tr>
          <tr className="bg-gray-50">
            <th></th>
            {frequencyOptions.map((opt) => (
              <th key={`f-${opt.value}`} className="border p-1">
                {opt.label}
              </th>
            ))}
            {importanceOptions.map((opt) => (
              <th key={`i-${opt.value}`} className="border p-1">
                {opt.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leadershipQuestions.map((q) => (
            <tr key={q.id} className="hover:bg-gray-50">
              <td className="border p-2">{q.text}</td>
              {frequencyOptions.map((opt) => (
                <td
                  key={`freq-${q.id}-${opt.value}`}
                  className="border text-center"
                >
                  <input
                    type="radio"
                    name={`freq-${q.id}`}
                    value={opt.value}
                    checked={answers[q.id]?.freq === opt.value}
                    onChange={(e) => setAnswer(q.id, "freq", e.target.value)}
                  />
                </td>
              ))}
              {importanceOptions.map((opt) => (
                <td
                  key={`imp-${q.id}-${opt.value}`}
                  className="border text-center"
                >
                  <input
                    type="radio"
                    name={`imp-${q.id}`}
                    value={opt.value}
                    checked={answers[q.id]?.imp === opt.value}
                    onChange={(e) => setAnswer(q.id, "imp", e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Survey;
