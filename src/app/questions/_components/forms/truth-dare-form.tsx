"use client";

import { FormEvent, useState } from "react";
import { useGetTruthDareModesQuery } from "@/services/modes.service";
import {
  useCreateTruthDareMutation,
  useUpdateTruthDareMutation,
} from "@/services/truth-dare.service";
import { ChallengeType, Gender, TruthDare } from "@/types/api/Question";
import { Switch } from "@/components/FormElements/switch";

interface TruthDareFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  question?: TruthDare;
}

export function TruthDareForm({
  onSuccess,
  onCancel,
  question,
}: TruthDareFormProps) {
  const isEditing = !!question;
  const { data: modes, isLoading: modesLoading } = useGetTruthDareModesQuery();
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [createTruthDare, { isLoading: isCreating }] =
    useCreateTruthDareMutation();
  const [updateTruthDare, { isLoading: isUpdating }] =
    useUpdateTruthDareMutation();

  const [type, setType] = useState<string>(
    question?.type ?? ChallengeType.DARE,
  );
  const [gender, setGender] = useState<string>(question?.gender ?? Gender.ALL);
  const [modeId, setModeId] = useState(question?.mode?.id ?? "");

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: question a check
    try {
      if (isEditing) {
        await updateTruthDare({
          id: question.id,
          body: { type, question: "", gender, modeId },
        }).unwrap();
      } else {
        await createTruthDare({ type, question: "", gender, modeId }).unwrap();
      }
      setType("");
      setGender("");
      if (!keepFormOpen) {
        setModeId("");
        onSuccess?.();
      }
    } catch (err) {
      console.error(
        isEditing ? "Failed to update question:" : "Failed to create question:",
        err,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4.5">
        <div className="space-y-3">
          <label className="block text-body-sm font-medium text-dark dark:text-white">
            Mode
          </label>
          <select
            value={modeId}
            onChange={(e) => setModeId(e.target.value)}
            required
            className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary text-dark dark:text-white"
          >
            <option value="" disabled hidden>
              {modesLoading ? "Chargement..." : "Sélectionner un mode"}
            </option>
            {modes?.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-body-sm font-medium text-dark dark:text-white">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary text-dark dark:text-white"
          >
            <option value="" disabled hidden>
              Sélectionner le type
            </option>
            <option value="DARE">Action</option>
            <option value="TRUTH">Vérité</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-body-sm font-medium text-dark dark:text-white">
            Genre
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary text-dark dark:text-white"
          >
            <option value="" disabled hidden>
              Sélectionner le genre
            </option>
            <option value="MAN">Homme</option>
            <option value="FEMALE">Femme</option>
            <option value="ALL">Tous</option>
          </select>
        </div>

        {!isEditing && (
          <Switch
            withIcon
            label="Créer une autre question"
            checked={keepFormOpen}
            onChange={setKeepFormOpen}
          />
        )}
      </div>

      <div className="mt-6 flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex w-full justify-center rounded-lg border border-stroke p-[13px] font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
        >
          {isEditing
            ? isLoading
              ? "Modification..."
              : "Modifier"
            : isLoading
              ? "Création..."
              : "Créer"}
        </button>
      </div>
    </form>
  );
}
