"use client";

import { useState } from "react";
import { Prefer } from "@/types/api/Question";
import { useGetPreferPaginationQuery, useDeletePreferMutation } from "@/services/prefer.service";
import { useGetPreferModesQuery } from "@/services/modes.service";
import { QuestionsListLayout } from "@/components/questions-list-layout";
import { PreferForm } from "@/app/questions/_components/prefer-form";

export default function QuestionsPreferList() {
  const [page, setPage] = useState(1);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const { data: modes } = useGetPreferModesQuery();
  const { isLoading, error, data } = useGetPreferPaginationQuery({ page, limit: 50, modeId: selectedModeId });
  const [deletePrefer] = useDeletePreferMutation();

  const handleModeChange = (modeId: string | null) => {
    setSelectedModeId(modeId);
    setPage(1);
  };

  const handleDelete = async (item: Prefer) => {
    try {
      await deletePrefer(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <QuestionsListLayout<Prefer>
      title="Questions"
      modes={modes ?? []}
      data={data}
      isLoading={isLoading}
      error={error}
      page={page}
      onPageChange={setPage}
      selectedModeId={selectedModeId}
      onModeChange={handleModeChange}
      onDelete={handleDelete}
      renderColumns={(item) => (
        <>
          <td className="flex-1 px-4 py-4 font-medium text-dark dark:text-white">
            {item.choiceOne}
          </td>
          <td className="flex-1 px-4 py-4 font-medium text-dark dark:text-white">
            {item.choiceTwo}
          </td>
          <td className="px-6 sm:px-12 py-4 text-sm text-body-color dark:text-dark-6">
            {item.mode?.name}
          </td>
        </>
      )}
      renderForm={({ item, onSuccess, onCancel }) => (
        <PreferForm
          key={item?.id ?? "create"}
          question={item}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      )}
    />
  );
}
