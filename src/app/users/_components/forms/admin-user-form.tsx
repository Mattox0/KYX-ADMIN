"use client";

import React, { useState } from "react";
import { Switch } from "@/components/FormElements/switch";
import InputGroup from "@/components/FormElements/InputGroup";
import { PasswordIcon } from "@/assets/icons";
import { authClient } from "../../../../../lib/auth-client";

interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  image: string | null;
  role: string;
}

interface AdminUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  adminUser?: BetterAuthUser;
}

export function AdminUserForm({ onSuccess, onCancel, adminUser }: AdminUserFormProps) {
  const isEditing = !!adminUser;
  const [email, setEmail] = useState(adminUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(adminUser?.name ?? "");
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        const result = await authClient.admin.updateUser({
          userId: adminUser.id,
          data: { email, name },
        });
        if (result.error) {
          throw new Error(result.error.message ?? "Failed to update user");
        }

        if (password) {
          const pwResult = await authClient.admin.setUserPassword({
            userId: adminUser.id,
            newPassword: password,
          });
          if (pwResult.error) {
            throw new Error(pwResult.error.message ?? "Failed to update password");
          }
        }
      } else {
        const result = await authClient.admin.createUser({
          email,
          password,
          name,
          role: "admin",
        });
        if (result.error) {
          throw new Error(result.error.message ?? "Failed to create user");
        }
      }

      setEmail("");
      setPassword("");
      setName("");

      if (isEditing || !keepFormOpen) {
        onSuccess?.();
      }
    } catch (err) {
      console.error(isEditing ? "Failed to update user:" : "Failed to create user:", err);
    } finally {
      setIsLoading(false);
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
          value={name}
          handleChange={(e) => setName(e.target.value)}
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
