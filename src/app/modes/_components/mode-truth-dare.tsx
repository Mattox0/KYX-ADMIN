"use client";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTruthDareModesQuery, useDeleteModeMutation } from "@/services/modes.service";
import { useState } from "react";
import { CreateModeForm } from "@/app/modes/_components/create-mode-form";
import { Mode } from "@/types/api/Mode";

export function ModeTruthDare() {
  const { isLoading, error, data } = useGetTruthDareModesQuery();
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [editingMode, setEditingMode] = useState<Mode | null>(null);
  const [deleteMode] = useDeleteModeMutation();

  const toggleCreateMode = () => {
    setEditingMode(null);
    setIsCreatingMode(prev => !prev);
  };

  const handleEdit = (mode: Mode) => {
    setIsCreatingMode(false);
    setEditingMode(mode);
  };

  const handleEditSuccess = () => {
    setEditingMode(null);
  };

  const handleDelete = async (mode: Mode) => {
    try {
      await deleteMode(mode.id).unwrap();
    } catch (err) {
      console.error("Failed to delete mode:", err);
    }
  };

  const showForm = isCreatingMode || editingMode !== null;

  if (error) {
    return (
      <ShowcaseSection title="Modes - Action ou Vérité" className="!p-6.5">
        <p className="text-red">Une erreur est survenue lors de la récupération des données.</p>
      </ShowcaseSection>
    );
  }

  return (
    <ShowcaseSection
      title="Modes - Action ou Vérité"
      className="!p-6.5"
      headerChildren={
        <button className="rounded-md bg-primary px-4 py-2 mr-4 text-sm text-white hover:bg-primary/90" onClick={toggleCreateMode}>
          {isCreatingMode ? "Fermer" : "Ajouter"}
        </button>
      }
    >
      {showForm && (
        <CreateModeForm
          key={editingMode?.id ?? "create"}
          mode={editingMode ?? undefined}
          gameType="truthDare"
          onSuccess={editingMode ? handleEditSuccess : toggleCreateMode}
          onCancel={editingMode ? handleEditSuccess : undefined}
        />
      )}
      {!showForm && !isLoading && data?.length === 0 ? (
        <p className="text-center py-8 text-body-color dark:text-dark-6">
          Il n&#39;y a pas encore de modes
        </p>
      ) : !showForm && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-stroke dark:border-dark-3">
                  <td className="px-4 py-4"><Skeleton className="h-4 w-8" /></td>
                  <td className="px-4 py-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="px-4 py-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </td>
                </tr>
              ))
              : data?.map((mode) => (
                <tr key={mode.id} className="border-b border-stroke dark:border-dark-3">
                  <td className="px-4 py-4 font-medium text-dark dark:text-white">
                    {mode.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-body-color dark:text-dark-6">
                    {mode.description}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors"
                        onClick={() => handleEdit(mode)}
                      >
                        Modifier
                      </button>
                      <button
                        className="rounded-md bg-white px-4 py-2 text-sm text-red hover:bg-red-light/90 hover:text-white transition-colors"
                        onClick={() => handleDelete(mode)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ShowcaseSection>
  );
}
