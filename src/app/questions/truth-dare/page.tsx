"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import QuestionsTruthDareList from "@/app/questions/_components/questions-truth-dare-list";

export default function TruthDarePage() {
  return (
    <>
      <Breadcrumb pageName="Action ou Vérité" />

      <QuestionsTruthDareList />
    </>
  );
}
