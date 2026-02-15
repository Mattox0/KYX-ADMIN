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

export default function ReportUnresolvedList({
  search,
}: {
  search: string | null;
}) {
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useGetReportPaginationQuery({
    page,
    limit: 50,
    search: search,
    resolved: false
  });
  const [deleteReport] = useDeleteReportMutation();
  const [updateReport] = useUpdateReportMutation();

  const handleDelete = async (item: Report) => {
    try {
      await deleteReport(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const handleResolve = async (item: Report) => {
    try {
      await updateReport({ id: item.id, body: { resolved: true }}).unwrap();
    } catch (err) {
      console.error("Failed to resolved question:", err);
    }
  }

  return (
    <ListLayout<Report>
      title="Signalement - Non résolus"
      data={data}
      isLoading={isLoading}
      error={error}
      textNoData="Vous avez traités tous les signalements, bravo !"
      onPageChange={setPage}
      onDelete={handleDelete}
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
            <td className="px-4 py-4">
              <Button
                icon={<icons.ResolvedIcon />}
                shape="full"
                size="small"
                variant="outlineGreen"
                onClick={() => handleResolve(item)}
              />
            </td>
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
