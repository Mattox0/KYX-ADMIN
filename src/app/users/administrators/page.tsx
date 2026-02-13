import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { ModeNeverHave } from "@/app/modes/_components/mode-never-have";
import { ModePrefer } from "@/app/modes/_components/mode-prefer";
import { ModeTruthDare } from "@/app/modes/_components/mode-truth-dare";
import AdminUsersList from "@/app/users/_components/list/admin-users-list";

export const metadata: Metadata = {
  title: "Administrateurs",
};

export default function AdminUsersPage() {
  return (
    <>
      <Breadcrumb pageName="Administrateurs" />

      <AdminUsersList />
    </>
  );
}
