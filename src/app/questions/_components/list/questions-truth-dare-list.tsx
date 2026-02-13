"use client";

import { Fragment, useRef, useState } from "react";
import { TruthDare } from "@/types/api/Question";
import { useGetTruthDarePaginationQuery, useDeleteTruthDareMutation, useImportTruthDareMutation } from "@/services/truth-dare.service";
import { useGetTruthDareModesQuery } from "@/services/modes.service";
import { QuestionsListLayout } from "@/components/questions-list-layout";
import { TruthDareForm } from "@/app/questions/_components/forms/truth-dare-form";
import { SearchIcon } from "@/assets/icons";

export default function QuestionsTruthDareList() {
  const [page, setPage] = useState(1);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const { data: modes } = useGetTruthDareModesQuery();
  const { isLoading, error, data, refetch } = useGetTruthDarePaginationQuery({ page, limit: 50, modeId: selectedModeId, search: search });
  const [deleteTruthDare] = useDeleteTruthDareMutation();
  const [importTruthDare] = useImportTruthDareMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const BATCH_SIZE = 50;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const json = JSON.parse(event.target?.result as string);
      const questions: { type: string; gender: string; question: string; modeId: string }[] = json.questions;

      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const batch = questions.slice(i, i + BATCH_SIZE);
        try {
          await importTruthDare({ questions: batch }).unwrap();
        } catch (err) {
          console.error(`Failed to import batch ${i / BATCH_SIZE + 1}:`, err);
        }
      }
    };
    reader.readAsText(file);

    e.target.value = "";
  };

  return (
    <Fragment>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Rechercher une question..."
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value || null)}
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => refetch()}
          className="shrink-0 rounded-full bg-dark-2 px-5 py-3 text-sm font-medium text-white hover:bg-dark-3 transition-colors dark:bg-dark-3 dark:hover:bg-dark-4"
        >
          Refresh
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="shrink-0 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          Import JSON
        </button>
      </div>
      <QuestionsListLayout<TruthDare>
        title="Questions"
        modes={modes ?? []}
        data={data}
        isLoading={isLoading}
        error={error}
        onPageChange={setPage}
        selectedModeId={selectedModeId}
        onModeChange={handleModeChange}
        onDelete={handleDelete}
        renderColumns={(item) => (
          <>
            <td className="px-4 py-4 font-medium text-dark dark:text-white">
              {item.type === "DARE" ? "Action" : "Vérité"}
            </td>
            <td className="px-4 py-4 text-sm text-body-color dark:text-dark-6">
              {{ MAN: "Homme", FEMALE: "Femme", ALL: "Tous" }[item.gender] ?? item.gender}
            </td>
            <td className="flex-1 px-4 py-4 text-dark dark:text-white">
              {item.question}
            </td>
            <td className="px-4 py-4 text-sm text-body-color dark:text-dark-6">
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
    </Fragment>
  );
}
