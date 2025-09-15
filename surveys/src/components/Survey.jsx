import React, { useEffect, useState } from "react";
import {
  leadershipQuestions,
  frequencyOptions,
  importanceOptions,
} from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import useSubmit from "../hooks/useSubmit";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Survey = () => {
  const {
    answers,
    setAnswer,
    calculateScores,
    setPhone,
    getSurveyData,
    setShowResult,
  } = useSurveyStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const mutation = useSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Save phone number in store
    setPhone(phoneInput);

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

  useEffect(() => {
    setPhone(userInfo.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
