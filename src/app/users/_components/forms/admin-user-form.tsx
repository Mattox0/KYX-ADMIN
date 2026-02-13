"use client";

import React, { useRef, useState } from "react";
import { Switch } from "@/components/FormElements/switch";
import InputGroup from "@/components/FormElements/InputGroup";
import Image from "next/image";
import { AdminUser } from "@/types/api/User";
import {
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
} from "@/services/admin-users.service";
import { PasswordIcon } from "@/assets/icons";

interface CreateAdminUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  adminUser?: AdminUser;
}

export function AdminUserForm({ onSuccess, onCancel, adminUser }: CreateAdminUserFormProps) {
  const isEditing = !!adminUser;
  const [email, setEmail] = useState(adminUser?.email ?? "");
  const [password, setPassword] = useState(adminUser?.password ?? "");
  const [displayName, setDisplayName] = useState(adminUser?.displayName ?? "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [createAdminUser, { isLoading: isCreating }] = useCreateAdminUserMutation();
  const [updateAdminUser, { isLoading: isUpdating }] = useUpdateAdminUserMutation();

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("displayName", displayName);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      if (isEditing) {
        await updateAdminUser({ id: adminUser.id, body: formData }).unwrap();
      } else {
        await createAdminUser(formData).unwrap();
      }
      setEmail("");
      setPassword("");
      setDisplayName("");

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
          label="Nom d'affichage"
          type="text"
          placeholder="Entrer le nom d'affichage"
          className="w-full"
          value={displayName}
          handleChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <InputGroup
          label="Email"
          type="text"
          placeholder="Entrer l'email"
          className="w-full"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputGroup
          type="password"
          label="Mot de passe"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Entrer le mot de passe"
          name="password"
          handleChange={(e) => setPassword(e.target.value)}
          value={password}
          icon={<PasswordIcon />}
        />

        {isEditing && adminUser.profilePicture && !profilePicture && (
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Image actuelle
            </label>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + `/${adminUser.profilePicture}` || ""}
              alt={`Icône de ${adminUser.displayName}`}
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
          label={isEditing ? "Changer l'image" : "Image du profil"}
          placeholder="Attacher une image"
          handleChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)}
          required={!isEditing}
        />

        {!isEditing && (
          <Switch
            withIcon
            label="Créer un autre administrateur"
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
