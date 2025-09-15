import React, { useEffect, useState } from "react";
import Result from "./Result";
import { questions } from "../data/Questions";
import { options } from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import { interpretations } from "../data/Questions";
import { interpretScore } from "../services/Services";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";
import useSubmit from "../hooks/useSubmit";
import { useTranslation } from "react-i18next";

const Survey = () => {
  const {
    answers,
    setAnswer,
    showResult,
    setShowResult,
    scores,
    updateScores,
    getSurveyData,
    setPhone,
  } = useSurveyStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const mutation = useSubmit();
  console.log("questions:: --> ", questions);

  const scoresWithInterpretations = Object.entries(scores).reduce(
    (acc, [section, { score, level }]) => {
      acc[section] = {
        score,
        level,
        interpretation: interpretScore(section, score),
      };
      return acc;
    },
    {}
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateScores();
    const surveyData = getSurveyData();

    // try {
    //   await mutation.mutateAsync({
    //     phone: surveyData.phone,
    //     answers: surveyData.answers,
    //     scores: surveyData.scores,
    //   });
    //   navigate("/report");
    // } catch (error) {
    //   setValidationError("Submission failed. Please try again.");
    // }

    console.log("data:--> ", getSurveyData());

    navigate("/report");
  };

  useEffect(() => {
    setPhone(userInfo.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {Object.entries(questions).map(([section, qs]) => (
          <div key={section} className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 text-center">
              {t("Section")} {t(section)}
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    {t("Question")}
                  </th>
                  {options.map((option) => (
                    <th
                      key={option.value}
                      className="border border-gray-300 px-4 py-3 text-center"
                    >
                      {t(option.label)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qs.map((q, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {t(q)}
                    </td>
                    {options.map((option) => (
                      <td
                        key={option.value}
                        className="border border-gray-300 px-4 py-3 text-center"
                      >
                        <input
                          type="radio"
                          name={`section-${section}-question-${index}`}
                          value={option.value}
                          checked={answers[section][index] === option?.value}
                          onChange={(e) =>
                            setAnswer(section, index, e.target.value)
                          }
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
