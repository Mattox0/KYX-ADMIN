"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import QuestionsPreferList from "@/app/questions/_components/list/questions-prefer-list";
import { SearchIcon } from "@/assets/icons";
import { useState } from "react";
import ReportUnresolvedList from "@/app/reports/_components/report-unresolved-list";
import ReportResolvedList from "@/app/reports/_components/report-resolved-list";

export default function ReportPage() {
  const [search, setSearch] = useState<string | null>(null);

  return (
    <>
      <Breadcrumb pageName="Signalements" />

      <div className="flex flex-col w-full gap-8">
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

        <ReportUnresolvedList search={search} />

        <ReportResolvedList search={search} />
      </div>
    </>
  );
}
