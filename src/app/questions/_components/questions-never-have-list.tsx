"use client";

import { useState } from "react";
import { NeverHave } from "@/types/api/Question";
import { useGetNeverHavePaginationQuery, useDeleteNeverHaveMutation } from "@/services/never-have.service";
import { useGetNeverHaveModesQuery } from "@/services/modes.service";
import { QuestionsListLayout } from "@/components/questions-list-layout";
import { NeverHaveForm } from "@/app/questions/_components/never-have-form";

export default function QuestionsNeverHaveList() {
  const [page, setPage] = useState(1);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const { data: modes } = useGetNeverHaveModesQuery();
  const { isLoading, error, data } = useGetNeverHavePaginationQuery({ page, limit: 50, modeId: selectedModeId });
  const [deleteNeverHave] = useDeleteNeverHaveMutation();

  const handleModeChange = (modeId: string | null) => {
    setSelectedModeId(modeId);
    setPage(1);
  };

  const handleDelete = async (item: NeverHave) => {
    try {
      await deleteNeverHave(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <QuestionsListLayout<NeverHave>
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
            {item.question}
          </td>
          <td className="px-6 sm:px-12 py-4 text-sm text-body-color dark:text-dark-6">
            {item.mode?.name}
          </td>
        </>
      )}
      renderForm={({ item, onSuccess, onCancel }) => (
        <NeverHaveForm
          key={item?.id ?? "create"}
          question={item}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      )}
    />
  );
}
