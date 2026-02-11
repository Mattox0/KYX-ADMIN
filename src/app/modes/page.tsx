import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { ModeNeverHave } from "@/app/modes/_components/mode-never-have";

export const metadata: Metadata = {
  title: "Modes",
};

export default function Mode() {
  return (
    <>
      <Breadcrumb pageName="Modes" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col">
          <ModeNeverHave />
        </div>

        <div className="flex flex-col">

        </div>
      </div>
    </>
  );
}
