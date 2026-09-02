/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-sm">
        {/* En-tête */}
        <div className="mb-10">
          <span className="font-display italic text-3xl text-foreground">
            Robomed
          </span>
          <h1 className="text-lg text-foreground mt-4 mb-1.5">
            Administration
          </h1>
          <p className="text-muted-foreground text-sm">
            Connectez-vous pour accéder à votre espace de gestion.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom d'utilisateur */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
              Nom d&apos;utilisateur
            </label>

            <input
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Erreur */}
          {error && <p className="text-accent text-sm">{error}</p>}

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] py-3.5 hover:opacity-90 transition-opacity cursor-pointer mt-2"
          >
            Se connecter
          </button>
        </form>

        {/* Retour */}
        <div className="mt-8">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}