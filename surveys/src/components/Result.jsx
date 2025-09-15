import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";

const sectionToSkill = {
  A: "Decision Making Skills",
  B: "Communication Skills",
  C: "Motivation Skills",
  D: "Conflict Management Skills",
  E: "Meeting Management Skills",
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
            {/* ✅ Show skill name instead of section letter */}
            <h3 className="font-bold text-lg mb-2">
              {t(sectionToSkill[section])}
            </h3>

            {/* ✅ Show interpretation (High/Low meaning) */}
            <p className="text-xs opacity-90 leading-relaxed mb-2">
              {level === "High"
                ? t(`${sectionToSkill[section]} (Strong)`)
                : t(`${sectionToSkill[section]} (Needs Improvement)`)}
            </p>

            {/* ✅ Show score + level */}
            <p className="text-sm">
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
