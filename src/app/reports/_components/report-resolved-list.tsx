"use client";

import { useState } from "react";
import Link from "next/link";
import { ListLayout } from "@/components/list-layout";
import { Report } from "@/types/api/Report";
import {
  useDeleteReportMutation,
  useGetReportPaginationQuery, useUpdateReportMutation,
} from "@/services/report.servce";
import { Button } from "@/components/ui-elements/button";
import * as icons from "@/assets/icons";

const REASON_LABELS: Record<string, string> = {
  INCORRECT_TRADUCTION: "Traduction incorrecte",
  INAPPROPRIATE_CONTENT: "Contenu inapproprié",
  NOT_FUNNY: "Pas drôle",
  OTHER: "Autre",
};

export default function ReportResolvedList({
                                               search,
                                             }: {
  search: string | null;
}) {
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useGetReportPaginationQuery({
    page,
    limit: 50,
    search: search,
    resolved: true
  });
  const [deleteReport] = useDeleteReportMutation();
  const [updateReport] = useUpdateReportMutation();

  const handleDelete = async (item: Report) => {
    try {
      await deleteReport(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete report:", err);
    }
  };

  const handleResolve = async (item: Report) => {
    try {
      await updateReport({ id: item.id, body: { resolved: true }}).unwrap();
    } catch (err) {
      console.error("Failed to resolved report:", err);
    }
  }

  return (
    <ListLayout<Report>
      title="Signalement - Résolus"
      data={data}
      isLoading={isLoading}
      error={error}
      textNoData="Il n'y a aucun signalements."
      onPageChange={setPage}
      onDelete={handleDelete}
      columnHeader={
        <thead>
          <tr className="flex items-center border-b border-stroke dark:border-dark-3">
            <th className="w-40 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Joueur</th>
            <th className="w-40 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Question</th>
            <th className="flex-1 px-4 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6">Commentaire</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-body-color dark:text-dark-6 sm:px-12"></th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
      }
      renderColumns={(item) => {
        const questionType = item.truthDare
          ? "truth-dare"
          : item.neverHave
            ? "never-have"
            : item.prefer
              ? "prefer"
              : null;
        const questionId = item.truthDare?.id ?? item.neverHave?.id ?? item.prefer?.id;

        return (
          <>
            <td className="px-4 py-4 w-40 text-sm text-body-color dark:text-dark-6">
              {item.user?.id}
            </td>
            <td className="px-4 py-4 w-40 text-sm">
              {questionType && questionId ? (
                <Link
                  href={`/questions/${questionType}?search=${questionId}`}
                  className="text-primary underline hover:text-primary/80"
                >
                  {questionId}
                </Link>
              ) : (
                "-"
              )}
            </td>
            <td className="flex-1 px-4 py-4 font-medium text-dark dark:text-white">
              {item.comment || "Pas de commentaire"}
            </td>
            <td className="text-body-color px-6 py-4 text-sm dark:text-dark-6 sm:px-12">
              {REASON_LABELS[item.reason] ?? item.reason}
            </td>
          </>
        );
      }}
    />
  );
}
