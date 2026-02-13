"use client";

import { Fragment, useState } from "react";
import { SearchIcon } from "@/assets/icons";
import { ListLayout } from "@/components/list-layout";
import { AdminUser } from "@/types/api/User";
import {
  useDeleteAdminUserMutation,
  useGetAdminUserPaginationQuery,
} from "@/services/admin-users.service";
import { AdminUserForm } from "@/app/users/_components/forms/admin-user-form";
import Image from "next/image";

export default function AdminUsersList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const { isLoading, error, data, refetch } = useGetAdminUserPaginationQuery({ page, limit: 50, search: search });
  const [deleteAdminuser] = useDeleteAdminUserMutation();

  const handleDelete = async (item: AdminUser) => {
    try {
      await deleteAdminuser(item.id).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
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
        <button
          onClick={() => refetch()}
          className="shrink-0 rounded-full bg-dark-2 px-5 py-3 text-sm font-medium text-white hover:bg-dark-3 transition-colors dark:bg-dark-3 dark:hover:bg-dark-4"
        >
          Refresh
        </button>
      </div>
      <ListLayout<AdminUser>
        title="Administrateurs"
        data={data}
        isLoading={isLoading}
        error={error}
        onPageChange={setPage}
        onDelete={handleDelete}
        renderColumns={(item) => (
          <>
            <td className="px-4 py-4 text-sm text-body-color dark:text-dark-6">
              {item.id}
            </td>
            <td className="px-6 py-4 font-medium text-dark dark:text-white">
              {item.displayName}
            </td>
            <td className="flex-1 px-6 py-4 font-medium text-dark dark:text-white">
              {item.email}
            </td>
            {item.profilePicture && (
              <td className="px-6 py-4">
                <Image
                  src={process.env.NEXT_PUBLIC_API_URL + `/${item.profilePicture}` || ""}
                  alt={`Image de profil de ${item.displayName}`}
                  className="rounded-full object-cover"
                  width={40}
                  height={40}
                />
              </td>
            )}
          </>
        )}
        renderForm={({ item, onSuccess, onCancel }) => (
          <AdminUserForm
            key={item?.id ?? "create"}
            onSuccess={onSuccess}
            onCancel={onCancel}
            adminUser={item}
          />
        )}
      />
    </Fragment>
  );
}
