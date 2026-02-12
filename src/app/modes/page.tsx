import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { ModeNeverHave } from "@/app/modes/_components/mode-never-have";
import { ModePrefer } from "@/app/modes/_components/mode-prefer";
import { ModeTruthDare } from "@/app/modes/_components/mode-truth-dare";

export const metadata: Metadata = {
  title: "Modes",
};

export default function Mode() {
  return (
    <>
      <Breadcrumb pageName="Modes" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <ModeNeverHave />

          <ModePrefer />

          <ModeTruthDare />
        </div>
      </div>
    </>
  );
}
