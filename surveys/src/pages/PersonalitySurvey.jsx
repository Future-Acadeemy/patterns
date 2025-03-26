import React from "react";
import Layout from "../layout/Layout";
import Survey from "../components/Survey";
import { personalityQuestions } from "../data/Questions";
import { PersonalityOptions } from "../data/Questions";
export default function PersonalitySurvey() {
  return (
    <Layout>
      <Survey questions={personalityQuestions} options={PersonalityOptions} />
    </Layout>
  );
}
