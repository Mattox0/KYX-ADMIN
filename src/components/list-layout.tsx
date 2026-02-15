"use client";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { ModePicker } from "@/components/mode-picker";
import { Question } from "@/types/api/Question";
import { PaginatedResponse } from "@/types/api/Pagination";
import { Mode } from "@/types/api/Mode";
import { ReactNode, useState } from "react";

interface WithId {
  id: string;
}

interface ListLayoutProps<T extends WithId> {
  title: string;
  data: PaginatedResponse<T> | undefined;
  isLoading: boolean;
  error: unknown;
  textNoData?: string;
  onPageChange: (page: number) => void;
  onDelete?: (item: T) => Promise<void>;
  renderColumns: (item: T) => ReactNode;
  renderForm?: (props: { item?: T; onSuccess: () => void; onCancel?: () => void }) => ReactNode;
}

export function ListLayout<T extends WithId>({
                                                          title,
                                                          data,
                                                          isLoading,
                                                          error,
                                                          textNoData = "Il n'y a pas encore de données",
                                                          onPageChange,
                                                          onDelete,
                                                          renderColumns,
                                                          renderForm,
                                                        }: ListLayoutProps<T>) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const toggleCreate = () => {
    setEditingItem(null);
    setIsCreating((prev) => !prev);
  };

  const handleEdit = (item: T) => {
    setIsCreating(false);
    setEditingItem(item);
  };

  const handleEditSuccess = () => {
    setEditingItem(null);
  };

  const showForm = isCreating || editingItem !== null;

  if (error) {
    return (
      <ShowcaseSection title={title} className="!p-6.5">
        <p className="text-red">Une erreur est survenue lors de la récupération des données.</p>
      </ShowcaseSection>
    );
  }

  return (
    <ShowcaseSection
      title={title}
      className="!p-6.5"
      headerChildren={
        renderForm && (
          <div className="flex items-center gap-2 mr-4">
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
            onClick={toggleCreate}
          >
            {isCreating ? "Fermer" : "Ajouter"}
          </button>
        </div>
      )}
    >
      {renderForm && showForm &&
        renderForm({
          item: editingItem ?? undefined,
          onSuccess: editingItem ? handleEditSuccess : toggleCreate,
          onCancel: editingItem ? handleEditSuccess : undefined,
        })}
      {!showForm && !isLoading && data?.data.length === 0 ? (
        <p className="text-center py-8 text-body-color dark:text-dark-6">
          {textNoData}
        </p>
      ) : (
        !showForm && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-stroke dark:border-dark-3">
                      <td className="px-4 py-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="px-4 py-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-20" />
                          <Skeleton className="h-8 w-20" />
                        </div>
                      </td>
                    </tr>
                  ))
                  : data?.data.map((item) => (
                    <tr
                      key={item.id}
                      className="flex items-center border-b border-stroke dark:border-dark-3"
                    >
                      {renderColumns(item)}
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {renderForm && (
                            <button
                              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors"
                              onClick={() => handleEdit(item)}
                            >
                              Modifier
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="rounded-md bg-white px-4 py-2 text-sm text-red hover:bg-red-light/90 hover:text-white transition-colors"
                              onClick={() => onDelete(item)}
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data && data.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-body-color dark:text-dark-6">
                  Page {data.page} sur {data.totalPages} ({data.total} questions)
                </p>
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )
      )}
    </ShowcaseSection>
  );
}
