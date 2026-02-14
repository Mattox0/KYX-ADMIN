import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
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
