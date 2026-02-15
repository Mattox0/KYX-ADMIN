"use client";

import { FormEvent, useEffect, useState } from "react";
import { useLoginMutation } from "@/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hydrate } from "@/store/authSlice";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password }).unwrap();
    } catch {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2">
        <h1 className="mb-8 text-center text-2xl font-bold text-dark dark:text-white">
          Kyx Admin
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@kyx.app"
              className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark dark:text-white">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { token, hydrated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-dark dark:text-white">Chargement...</p>
      </div>
    );
  }

  if (!token) {
    return <SignInForm />;
  }

  return <>{children}</>;
}
