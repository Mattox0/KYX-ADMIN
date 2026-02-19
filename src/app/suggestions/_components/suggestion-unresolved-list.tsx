"use client";

import { useState } from "react";
import { ListLayout } from "@/components/list-layout";
import { Suggestion } from "@/types/api/Suggestion";
import {
  useDeleteSuggestionMutation,
  useGetSuggestionPaginationQuery,
  useUpdateSuggestionMutation,
} from "@/services/suggestion.service";
import { Button } from "@/components/ui-elements/button";
import * as icons from "@/assets/icons";

export default function SuggestionUnresolvedList({
  search,
}: {
  search: string | null;
}) {
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useGetSuggestionPaginationQuery({
    page,
    limit: 50,
    search: search,
    resolved: false,
  });
  const [deleteSuggestion] = useDeleteSuggestionMutation();
  const [updateSuggestion] = useUpdateSuggestionMutation();

  const handleDelete = async (item: Suggestion) => {
    try {
      await deleteSuggestion(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete suggestion:", err);
    }
  };

  const handleResolve = async (item: Suggestion) => {
    try {
      await updateSuggestion({ id: item.id, body: { resolved: true } }).unwrap();
    } catch (err) {
      console.error("Failed to resolve suggestion:", err);
    }
  };

  return (
    <ListLayout<Suggestion>
      title="Suggestions - Non résolues"
      data={data}
      isLoading={isLoading}
      error={error}
      textNoData="Vous avez traité toutes les suggestions, bravo !"
      onPageChange={setPage}
      onDelete={handleDelete}
      columnHeader={
        <thead>
          <tr className="flex items-center border-b border-stroke dark:border-dark-3">
            <th className="w-25 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6"></th>
            <th className="w-40 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Joueur</th>
            <th className="flex-1 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Suggestion</th>
          </tr>
        </thead>
      }
      renderColumns={(item) => (
        <>
          <td className="w-25 px-4 py-4">
            <Button
              icon={<icons.ResolvedIcon />}
              shape="full"
              size="small"
              variant="outlineGreen"
              onClick={() => handleResolve(item)}
            />
          </td>
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
