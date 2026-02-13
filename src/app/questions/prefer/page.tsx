"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import QuestionsPreferList from "@/app/questions/_components/list/questions-prefer-list";

export default function PreferPage() {
  return (
    <>
      <Breadcrumb pageName="Tu préfères" />

      <QuestionsPreferList />
    </>
  );
}
