/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/token/`,
        {
          username: email,
          password: password,
        },
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      router.push("/admin");
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div
      className="
        min-h-[85vh]
        flex
        items-center
        justify-center
        px-4
        py-12
      "
    >
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div
            className="
              w-12
              h-12
              bg-zinc-900
              dark:bg-zinc-100
              text-white
              dark:text-zinc-900
              rounded-xl
              mx-auto
              flex
              items-center
              justify-center
              shadow-xs
              mb-4
              transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-extrabold
              text-zinc-900
              dark:text-zinc-100
              tracking-tight
              transition-colors
            "
          >
            Administration
          </h1>

          <p
            className="
              text-zinc-500
              dark:text-zinc-400
              text-sm
              mt-1.5
              transition-colors
            "
          >
            Connectez-vous pour accéder à votre espace de gestion
          </p>
        </div>

        {/* Formulaire */}
        <div
          className="
            bg-[#FAFAFC]
            dark:bg-zinc-900
            border
            border-zinc-200/80
            dark:border-zinc-800
            rounded-2xl
            p-8
            shadow-xs
            transition-colors
          "
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom d'utilisateur */}
            <div>
              <label
                className="
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-zinc-700
                  dark:text-zinc-300
                  mb-2
                "
              >
                Nom d&apos;utilisateur
              </label>

              <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  bg-white
                  dark:bg-zinc-950
                  border
                  border-zinc-200
                  dark:border-zinc-700
                  rounded-xl
                  px-4
                  py-3
                  text-zinc-900
                  dark:text-zinc-100
                  text-sm
                  placeholder:text-zinc-400
                  dark:placeholder:text-zinc-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-zinc-900/20
                  dark:focus:ring-zinc-100/20
                  focus:border-zinc-900
                  dark:focus:border-zinc-100
                  transition-all
                "
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label
                className="
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-zinc-700
                  dark:text-zinc-300
                  mb-2
                "
              >
                Mot de passe
              </label>

              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  bg-white
                  dark:bg-zinc-950
                  border
                  border-zinc-200
                  dark:border-zinc-700
                  rounded-xl
                  px-4
                  py-3
                  text-zinc-900
                  dark:text-zinc-100
                  text-sm
                  placeholder:text-zinc-400
                  dark:placeholder:text-zinc-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-zinc-900/20
                  dark:focus:ring-zinc-100/20
                  focus:border-zinc-900
                  dark:focus:border-zinc-100
                  transition-all
                "
                required
              />
            </div>

            {/* Erreur */}
            {error && (
              <div
                className="
                  bg-red-50
                  dark:bg-red-950/40
                  border
                  border-red-200
                  dark:border-red-900
                  text-red-700
                  dark:text-red-300
                  text-xs
                  font-medium
                  px-4
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  transition-colors
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>

                {error}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              className="
                w-full
                bg-zinc-900
                dark:bg-zinc-100
                hover:bg-zinc-800
                dark:hover:bg-zinc-200
                text-white
                dark:text-zinc-900
                font-medium
                text-sm
                py-3
                px-4
                rounded-xl
                shadow-2xs
                hover:shadow-md
                transition-all
                duration-200
                cursor-pointer
              "
            >
              Se connecter
            </button>
          </form>
        </div>

        {/* Retour */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="
              text-xs
              font-medium
              text-zinc-500
              dark:text-zinc-400
              hover:text-zinc-900
              dark:hover:text-zinc-100
              transition-colors
            "
          >
            ← Retour au site public
          </a>
        </div>
      </div>
    </div>
  );
}

