"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { SearchIcon } from "@/assets/icons";
import { ListLayout } from "@/components/list-layout";
import { AdminUserForm } from "@/app/users/_components/forms/admin-user-form";
import { authClient } from "../../../../../lib/auth-client";
import { PaginatedResponse } from "@/types/api/Pagination";

interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  image: string | null;
  role: string;
  createdAt: string;
}

const LIMIT = 50;

export default function AdminUsersList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<PaginatedResponse<BetterAuthUser> | undefined>();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.admin.listUsers({
        limit: LIMIT,
        offset: (page - 1) * LIMIT,
        sortBy: "createdAt",
        sortDirection: "desc",
        ...(search ? { searchValue: search, searchField: "email", searchOperator: "contains" } : {}),
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Failed to fetch users");
      }

      const users = result.data?.users ?? [];
      const total = result.data?.total ?? 0;
      const totalPages = Math.ceil(total / LIMIT);

      setData({
        data: users as BetterAuthUser[],
        total,
        page,
        limit: LIMIT,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (item: BetterAuthUser) => {
    try {
      const result = await authClient.admin.removeUser({ userId: item.id });
      if (result.error) {
        throw new Error(result.error.message ?? "Failed to delete user");
      }
      await fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Rechercher un administrateur..."
            value={search ?? ""}
            onChange={(e) => {
              setSearch(e.target.value || null);
              setPage(1);
            }}
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>
        <button
          onClick={() => fetchUsers()}
          className="shrink-0 rounded-full bg-dark-2 px-5 py-3 text-sm font-medium text-white hover:bg-dark-3 transition-colors dark:bg-dark-3 dark:hover:bg-dark-4"
        >
          Refresh
        </button>
      </div>
      <ListLayout<BetterAuthUser>
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
              {item.name}
            </td>
            <td className="flex-1 px-6 py-4 font-medium text-dark dark:text-white">
              {item.email}
            </td>
            <td className="px-6 py-4 text-sm text-body-color dark:text-dark-6">
              {item.role}
            </td>
          </>
        )}
        renderForm={({ item, onSuccess, onCancel }) => (
          <AdminUserForm
            key={item?.id ?? "create"}
            onSuccess={() => {
              onSuccess();
              fetchUsers();
            }}
            onCancel={onCancel}
            adminUser={item}
          />
        )}
      />
    </Fragment>
  );
}
