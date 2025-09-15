import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";

const interpretations = {
  A: {
    High: "Decision making skills",
    Low: "Decision making skills",
  },
  B: {
    High: "Communication Skills",
    Low: "Communication Skills",
  },
  C: {
    High: "Motivation Skills",
    Low: "Motivation Skills",
  },
  D: {
    High: "Conflict Management Skills",
    Low: "Conflict Management Skills",
  },
  E: {
    High: "Meeting Management Skills",
    Low: "Meeting Management Skills",
  },
};

const sectionColors = {
  A: "bg-blue-50 text-blue-800",
  B: "bg-green-50 text-green-800",
  C: "bg-yellow-50 text-yellow-800",
  D: "bg-purple-50 text-purple-800",
  E: "bg-pink-50 text-pink-800",
};

const Result = () => {
  const { scores } = useSurveyStore();
  const user = useUserStore((state) => state);
  const { t } = useTranslation();

  const interpretScore = (section, score) => {
    const level = score > 30 ? "High" : "Low";
    return interpretations[section]?.[level] || "";
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {t("Results")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(scores).map(([section, { score, level }]) => (
          <div
            key={section}
            className={`p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition ${sectionColors[section]}`}
          >
            <h3 className="font-bold text-lg mb-2">
              {t("Section")} {t(section)}
            </h3>
            <p className="text-xs opacity-90 leading-relaxed">
              {t(interpretScore(section, score))}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">{t("Score")}:</span> {score} (
              {level})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
