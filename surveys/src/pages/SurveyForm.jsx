import React from "react";
import Layout from "../layout/Layout";
import Survey from "../components/Survey";
import { useUserStore } from "../store/useUserStore";
import { questions } from "../data/Questions";
import { options } from "../data/Questions";
export default function SurveyForm() {
  return (
    <Layout>
      <Survey questions={questions} options={options} />
    </Layout>
  );
}
