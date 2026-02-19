"use client";

import { useState } from "react";
import { ListLayout } from "@/components/list-layout";
import { Suggestion } from "@/types/api/Suggestion";
import {
  useDeleteSuggestionMutation,
  useGetSuggestionPaginationQuery,
} from "@/services/suggestion.service";

export default function SuggestionResolvedList({
  search,
}: {
  search: string | null;
}) {
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useGetSuggestionPaginationQuery({
    page,
    limit: 50,
    search: search,
    resolved: true,
  });
  const [deleteSuggestion] = useDeleteSuggestionMutation();

  const handleDelete = async (item: Suggestion) => {
    try {
      await deleteSuggestion(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete suggestion:", err);
    }
  };

  return (
    <ListLayout<Suggestion>
      title="Suggestions - Résolues"
      data={data}
      isLoading={isLoading}
      error={error}
      textNoData="Il n'y a aucune suggestion résolue."
      onPageChange={setPage}
      onDelete={handleDelete}
      columnHeader={
        <thead>
          <tr className="flex items-center border-b border-stroke dark:border-dark-3">
            <th className="w-40 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Joueur</th>
            <th className="flex-1 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Suggestion</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
      }
      renderColumns={(item) => (
        <>
          <td className="px-4 py-4 w-40 text-sm text-body-color dark:text-dark-6">
            {item.user?.id ?? "/"}
          </td>
          <td className="flex-1 px-4 py-4 font-medium text-dark dark:text-white">
            {item.content}
          </td>
        </>
      )}
    />
  );
}
