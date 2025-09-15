import React, { useEffect, useState } from "react";
import { personalAbilitiesQuestions, abilityOptions } from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import useSubmit from "../hooks/useSubmit";
import { useTranslation } from "react-i18next";

const AbilitiesSurvey = () => {
  const { t } = useTranslation();
  const {
    phone,
    setPhone,
    answers,
    setAnswer,
    calculateScores,
    getSurveyData,
  } = useSurveyStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  const [validationError, setValidationError] = useState("");
  const mutation = useSubmit();

  // Initialize phone input from user info
  useEffect(() => {
    if (userInfo.phone) setPhone(userInfo.phone);
  }, [userInfo.phone, setPhone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setValidationError(t("Please enter your phone number."));
      return;
    }

    calculateScores();

    try {
      await mutation.mutateAsync(getSurveyData());
      navigate("/report");
    } catch (error) {
      setValidationError(t("Submission failed. Please try again."));
    }
    navigate("/report");

    console.log("Survey Data:", getSurveyData());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-3xl max-w-6xl mx-auto"
    >
      {/* Survey Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-3 bg-blue-100 text-blue-700 font-semibold rounded-tl-xl border-b border-gray-200">
                {t("Question")}
              </th>
              {abilityOptions.map((opt) => (
                <th
                  key={opt.value}
                  className="p-3 bg-blue-100 text-blue-700 font-semibold text-center border-b border-gray-200"
                >
                  {t(opt.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {personalAbilitiesQuestions.map((q, index) => (
              <tr
                key={index + 1}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 text-gray-800 font-medium border-b border-gray-200">
                  {t(`${index + 1}. ${q}`)}
                </td>
                {abilityOptions.map((opt) => (
                  <td
                    key={`q${index + 1}-opt${opt.value}`}
                    className="p-2 text-center border-b border-gray-200"
                  >
                    <input
                      type="radio"
                      name={`q${index + 1}`}
                      value={opt.value}
                      checked={answers[index + 1] === opt.value}
                      onChange={(e) =>
                        setAnswer(index + 1, Number(e.target.value))
                      }
                      className="accent-blue-500 w-5 h-5 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {validationError && (
        <p className="mt-4 text-red-500 text-center">{validationError}</p>
      )}

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
        >
          {t("Submit")}
        </button>
      </div>
    </form>
  );
};

export default AbilitiesSurvey;
