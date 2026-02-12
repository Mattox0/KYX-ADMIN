"use client";

import { useState } from "react";
import { TruthDare } from "@/types/api/Question";
import { useGetTruthDarePaginationQuery, useDeleteTruthDareMutation } from "@/services/truth-dare.service";
import { useGetTruthDareModesQuery } from "@/services/modes.service";
import { QuestionsListLayout } from "@/components/questions-list-layout";
import { TruthDareForm } from "@/app/questions/_components/truth-dare-form";

export default function QuestionsTruthDareList() {
  const [page, setPage] = useState(1);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const { data: modes } = useGetTruthDareModesQuery();
  const { isLoading, error, data } = useGetTruthDarePaginationQuery({ page, limit: 50, modeId: selectedModeId });
  const [deleteTruthDare] = useDeleteTruthDareMutation();

  const handleModeChange = (modeId: string | null) => {
    setSelectedModeId(modeId);
    setPage(1);
  };

  const handleDelete = async (item: TruthDare) => {
    try {
      await deleteTruthDare(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <QuestionsListLayout<TruthDare>
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
          <td className="px-4 py-4 font-medium text-dark dark:text-white">
            {item.type === "ACTION" ? "Action" : "Vérité"}
          </td>
          <td className="px-4 py-4 text-sm text-body-color dark:text-dark-6">
            {item.gender}
          </td>
          <td className="flex-1 px-6 sm:px-12 py-4 text-sm text-body-color dark:text-dark-6">
            {item.mode?.name}
          </td>
        </>
      )}
      renderForm={({ item, onSuccess, onCancel }) => (
        <TruthDareForm
          key={item?.id ?? "create"}
          question={item}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      )}
    />
  );
}
