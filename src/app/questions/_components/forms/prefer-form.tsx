"use client";

import { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { useGetPreferModesQuery } from "@/services/modes.service";
import { useCreatePreferMutation, useUpdatePreferMutation } from "@/services/prefer.service";
import { Prefer } from "@/types/api/Question";
import { Switch } from "@/components/FormElements/switch";

interface PreferFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  question?: Prefer;
}

export function PreferForm({ onSuccess, onCancel, question }: PreferFormProps) {
  const isEditing = !!question;
  const { data: modes, isLoading: modesLoading } = useGetPreferModesQuery();
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [createPrefer, { isLoading: isCreating }] = useCreatePreferMutation();
  const [updatePrefer, { isLoading: isUpdating }] = useUpdatePreferMutation();

  const [choiceOne, setChoiceOne] = useState(question?.choiceOne ?? "");
  const [choiceTwo, setChoiceTwo] = useState(question?.choiceTwo ?? "");
  const [modeId, setModeId] = useState(question?.mode?.id ?? "");

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updatePrefer({ id: question.id, body: { choiceOne, choiceTwo, modeId } }).unwrap();
      } else {
        await createPrefer({ choiceOne, choiceTwo, modeId }).unwrap();
      }
      setChoiceOne("");
      setChoiceTwo("");
      if (!keepFormOpen) {
        setModeId("");
        onSuccess?.();
      }
    } catch (err) {
      console.error(isEditing ? "Failed to update question:" : "Failed to create question:", err);
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

        <InputGroup
          label="Choix 1"
          type="text"
          placeholder="Entrer le premier choix"
          className="w-full"
          value={choiceOne}
          handleChange={(e) => setChoiceOne(e.target.value)}
          required
        />

        <InputGroup
          label="Choix 2"
          type="text"
          placeholder="Entrer le deuxième choix"
          className="w-full"
          value={choiceTwo}
          handleChange={(e) => setChoiceTwo(e.target.value)}
          required
        />

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
            ? isLoading ? "Modification..." : "Modifier"
            : isLoading ? "Création..." : "Créer"
          }
        </button>
      </div>
    </form>
  );
}
