"use client";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import QuestionsNeverHaveList from '@/app/questions/_components/questions-never-have-list';

export default function NeverHavePage() {
  return (
    <>
      <Breadcrumb pageName="Je n'ai jamais" />

      <QuestionsNeverHaveList />
    </>
  )
}