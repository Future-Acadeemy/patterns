import React, { useEffect, useState } from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import useSubmit from "../hooks/useSubmit";
import { useTranslation } from "react-i18next";
import { situations, abilityOptions } from "../data/Questions";

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
      className="p-6 bg-white shadow-lg rounded-3xl max-w-6xl mx-auto space-y-10"
      dir="rtl"
    >
      {situations.map((situation) => (
        <div key={situation.id} className="mb-12">
          <h2 className="text-xl font-bold mb-4">{t(situation.text)}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 mb-12">
              <thead>
                <tr>
                  <th className="p-3 bg-blue-100 text-blue-700 font-semibold rounded-tl-xl border-b border-gray-200 mb-40 mt-40">
                    {t("الأسلوب الذى أستخدمه في هذا الموقف")}
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
                {situation.options.map((option) => (
                  <tr
                    key={option.key}
                    className="bg-white hover:bg-blue-50 transition"
                  >
                    <td className="p-3 text-gray-800 font-medium border-b border-gray-200">
                      {t(`${option.key} – ${option.label}`)}
                    </td>
                    {abilityOptions.map((opt) => (
                      <td
                        key={`s${situation.id}-${option.key}-opt${opt.value}`}
                        className="p-2 text-center border-b border-gray-200"
                      >
                        <input
                          type="radio"
                          name={`s${situation.id}-${option.key}`}
                          value={opt.value}
                          checked={
                            answers[`s${situation.id}-${option.key}`] ===
                            opt.value
                          }
                          onChange={(e) =>
                            setAnswer(
                              `s${situation.id}-${option.key}`,
                              Number(e.target.value)
                            )
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
        </div>
      ))}

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
