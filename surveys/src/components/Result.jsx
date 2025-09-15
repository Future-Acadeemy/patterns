import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useTranslation } from "react-i18next";

const sectionToSkill = {
  linguistic: "Linguistic Skills",
  musical: "Musical Skills",
  social: "Social Skills",
  personal: "Personal Skills",
  bodily_kinesthetic: "Bodily-Kinesthetic Skills",
  logical_mathematical: "Logical-Mathematical Skills",
  visual_spatial: "Visual-Spatial Skills",
};

const sectionColors = {
  linguistic: "bg-blue-50 text-blue-800",
  musical: "bg-green-50 text-green-800",
  social: "bg-yellow-50 text-yellow-800",
  personal: "bg-purple-50 text-purple-800",
  bodily_kinesthetic: "bg-pink-50 text-pink-800",
  logical_mathematical: "bg-indigo-50 text-indigo-800",
  visual_spatial: "bg-teal-50 text-teal-800",
};

const Result = () => {
  const { scores } = useSurveyStore();
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">
        {t("Your Survey Results")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(scores).map(([section, { score, level }]) => (
          <div
            key={section}
            className={`p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition flex flex-col justify-between ${sectionColors[section]}`}
          >
            {/* Skill Name */}
            <h3 className="font-bold text-lg mb-3">
              {t(sectionToSkill[section])}
            </h3>

            {/* Level Badge */}
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                level === "High"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {level === "High" ? t("Strong") : t("Needs Improvement")}
            </span>

            {/* Score Info */}
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">{t("Score")}:</span> {score} /{" "}
              {Object.keys(sectionToSkill).length * 5}
            </p>

            {/* Optional Explanation */}
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {level === "High"
                ? t(
                    `You have a strong ${sectionToSkill[
                      section
                    ].toLowerCase()}.`
                  )
                : t(
                    `You can improve your ${sectionToSkill[
                      section
                    ].toLowerCase()}.`
                  )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
