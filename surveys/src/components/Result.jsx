import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { questions, options } from "../data/Questions";
import { interpretScore } from "../services/Services";
import { useTranslation } from "react-i18next";

const Result = () => {
  const { answers, scores } = useSurveyStore();
  const user = useUserStore((state) => state);
  const userInfo = user.userInfo;
  const { t, i18n } = useTranslation();

  const generateWordFile = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Maslach Burnout Inventory (MBI) Results",
                  bold: true,
                  size: 32,
                }),
              ],
              spacing: { after: 300 },
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "User Information",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            ...Object.entries(userInfo).map(
              ([key, value]) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${value}`,
                      size: 24,
                    }),
                  ],
                  spacing: { after: 150 },
                })
            ),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({ text: "Results", bold: true, size: 28 }),
              ],
              spacing: { after: 200 },
            }),
            ...Object.entries(scores).map(
              ([section, score]) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Section ${section}: ${score} (${interpretScore(
                        section,
                        score
                      )})`,
                      size: 22,
                    }),
                  ],
                  spacing: { after: 200 },
                })
            ),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Survey Questions and Answers",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            ...Object.entries(questions).flatMap(([section, qs]) =>
              qs.map((q, index) => {
                const answerValue = answers[section][index];
                const answerLabel =
                  options.find((option) => option.value === answerValue)
                    ?.label || "Not answered";

                return new Paragraph({
                  children: [
                    new TextRun({
                      text: `Q${index + 1}: ${q}`,
                      size: 22,
                    }),
                    new TextRun({
                      text: `\nAnswer: ${answerLabel}`,
                      italics: true,
                      size: 22,
                    }),
                  ],
                  spacing: { after: 200 },
                });
              })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "MBI_Results.docx");
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
        {t("Results")}
      </h2>

      <div className="mt-6 rounded-lg p-4 bg-gray-50">
        <ul className="mt-2 space-y-2">
          {Object.entries(scores).map(([section, score]) => (
            <li key={section} className="text-gray-700">
              <span className="font-semibold">
                {t("Section")} {t(section)}:
              </span>{" "}
              {score}
              <span className="text-sm text-gray-500">
                {" "}
                {t(interpretScore(section, score))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
        onClick={generateWordFile}
      >
        {t("Download Report")}
      </button>
    </div>
  );
};

export default Result;
