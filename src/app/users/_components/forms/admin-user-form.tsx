"use client";

import React, { useState } from "react";
import { Switch } from "@/components/FormElements/switch";
import InputGroup from "@/components/FormElements/InputGroup";
import { PasswordIcon } from "@/assets/icons";
import { AdminUser } from "@/types/api/User";
import {
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
} from "@/services/admin-users.service";

interface AdminUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  adminUser?: AdminUser;
}

export function AdminUserForm({ onSuccess, onCancel, adminUser }: AdminUserFormProps) {
  const isEditing = !!adminUser;
  const [email, setEmail] = useState(adminUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(adminUser?.displayName ?? "");
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [createAdminUser, { isLoading: isCreating }] = useCreateAdminUserMutation();
  const [updateAdminUser, { isLoading: isUpdating }] = useUpdateAdminUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateAdminUser({ id: adminUser?.id , body: { email, password, displayName }}).unwrap();
      } else {
        await createAdminUser({ email, password, displayName }).unwrap();
      }

      setEmail("");
      setPassword("");
      setDisplayName("");

      if (isEditing || !keepFormOpen) {
        onSuccess?.();
      }
    } catch (err) {
      console.error(isEditing ? "Failed to update user:" : "Failed to create user:", err);
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
          label={isEditing ? "Nouveau mot de passe (optionnel)" : "Mot de passe"}
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Entrer le mot de passe"
          name="password"
          handleChange={(e) => setPassword(e.target.value)}
          value={password}
          icon={<PasswordIcon />}
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
          disabled={isUpdating || isCreating}
          className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
        >
          {isEditing
            ? isUpdating ? "Modification..." : "Modifier"
            : isCreating ? "Création..." : "Créer"
          }
        </button>
      </div>
    </form>
  );
}
