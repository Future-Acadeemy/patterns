import React, { useEffect, useState } from "react";
import {
  leadershipQuestions,
  frequencyOptions,
  importanceOptions,
} from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate, useSubmit } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Survey = () => {
  const { answers, setAnswer, calculateScores, setShowResult, getSurveyData } =
    useSurveyStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const mutation = useSubmit();

  useEffect(() => {
    // optional: set phone from userInfo if needed in store
  }, [userInfo.phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Save phone number in store
    if (phoneInput) setPhoneInput(phoneInput);

    // ✅ Let the store calculate scores
    calculateScores();
    setShowResult(true);

    // --- If you want API submission ---
    // try {
    //   await mutation.mutateAsync(getSurveyData());
    //   navigate("/report");
    // } catch (error) {
    //   setValidationError("Submission failed. Please try again.");
    // }

    console.log("Survey Data:", getSurveyData());

    navigate("/report");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-3xl max-w-6xl mx-auto"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-3 bg-blue-100 text-blue-700 font-semibold rounded-tl-xl border-b border-gray-200">
                Question
              </th>
              <th
                colSpan={3}
                className="p-3 bg-blue-100 text-blue-700 font-semibold text-center border-b border-gray-200"
              >
                Frequency
              </th>
              <th
                colSpan={3}
                className="p-3 bg-blue-100 text-blue-700 font-semibold text-center rounded-tr-xl border-b border-gray-200"
              >
                Importance
              </th>
            </tr>
            <tr className="bg-gray-50 text-gray-700">
              <th></th>
              {frequencyOptions.map((opt, idx) => (
                <th
                  key={`f-${opt.value}`}
                  className={`p-2 border-b border-gray-200 text-center font-medium ${
                    idx === frequencyOptions.length - 1
                      ? "border-r-2 border-gray-400"
                      : ""
                  }`}
                >
                  {opt.label}
                </th>
              ))}
              {importanceOptions.map((opt) => (
                <th
                  key={`i-${opt.value}`}
                  className="p-2 border-b border-gray-200 text-center font-medium"
                >
                  {opt.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leadershipQuestions.map((q, index) => (
              <tr
                key={q.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 text-gray-800 font-medium border-b border-gray-200">
                  {q.text}
                </td>
                {frequencyOptions.map((opt, idx) => (
                  <td
                    key={`freq-${q.id}-${opt.value}`}
                    className={`p-2 text-center border-b border-gray-200 ${
                      idx === frequencyOptions.length - 1
                        ? "border-r-2 border-gray-400"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`freq-${q.id}`}
                      value={opt.value}
                      checked={answers[q.id]?.freq === opt.value}
                      onChange={(e) => setAnswer(q.id, "freq", e.target.value)}
                      className="accent-blue-500 w-5 h-5 cursor-pointer"
                    />
                  </td>
                ))}
                {importanceOptions.map((opt) => (
                  <td
                    key={`imp-${q.id}-${opt.value}`}
                    className="p-2 text-center border-b border-gray-200"
                  >
                    <input
                      type="radio"
                      name={`imp-${q.id}`}
                      value={opt.value}
                      checked={answers[q.id]?.imp === opt.value}
                      onChange={(e) => setAnswer(q.id, "imp", e.target.value)}
                      className="accent-green-500 w-5 h-5 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Survey;
