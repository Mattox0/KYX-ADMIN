"use client";

import { useRef, useState } from "react";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { useCreateModeMutation, useUpdateModeMutation } from "@/services/modes.service";
import { Switch } from "@/components/FormElements/switch";
import InputGroup from "@/components/FormElements/InputGroup";
import { Mode } from "@/types/api/Mode";
import Image from "next/image";

interface CreateModeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  mode?: Mode;
  gameType: string;
}

export function CreateModeForm({ onSuccess, onCancel, mode, gameType }: CreateModeFormProps) {
  const isEditing = !!mode;
  const [name, setName] = useState(mode?.name ?? "");
  const [description, setDescription] = useState(mode?.description ?? "");
  const [icon, setIcon] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [createMode, { isLoading: isCreating }] = useCreateModeMutation();
  const [updateMode, { isLoading: isUpdating }] = useUpdateModeMutation();

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("gameType", gameType);
    if (icon) {
      formData.append("icon", icon);
    }

    try {
      if (isEditing) {
        await updateMode({ id: mode.id, formData }).unwrap();
      } else {
        await createMode(formData).unwrap();
      }
      setName("");
      setDescription("");
      setIcon(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (isEditing || !keepFormOpen) {
        onSuccess?.();
      }
    } catch (err) {
      console.error(isEditing ? "Failed to update mode:" : "Failed to create mode:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4.5">
        <InputGroup
          label="Titre"
          type="text"
          placeholder="Entrer le titre du mode"
          className="w-full"
          value={name}
          handleChange={(e) => setName(e.target.value)}
          required
        />

        <TextAreaGroup
          label="Description"
          placeholder="Entrer la description du mode"
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
          required
        />

        {isEditing && mode.icon && !icon && (
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Icône actuelle
            </label>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + `/${mode.icon}` || ""}
              alt={`Icône de ${mode.name}`}
              className="h-16 w-16 rounded-md object-cover"
              width={64}
              height={64}
            />
          </div>
        )}

        <InputGroup
          ref={fileInputRef}
          type="file"
          fileStyleVariant="style1"
          label={isEditing ? "Changer l'icône" : "Icône du mode"}
          placeholder="Attacher une icône"
          handleChange={(e) => setIcon(e.target.files?.[0] ?? null)}
          required={!isEditing}
        />

        {!isEditing && (
          <Switch
            withIcon
            label="Créer un autre mode"
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
