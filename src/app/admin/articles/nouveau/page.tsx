// src/app/admin/articles/nouveau/page.tsx

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../../lib/axios";
import RequireAuth from "@/components/RequireAuth";

type Categorie = { id: number; nom: string };

export default function CreateArticlePage() {
  const router = useRouter();
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("categories/");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur de récupération des catégories");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!categorieId) {
      setError("Veuillez sélectionner une catégorie");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("contenu", contenu);
      formData.append("categorie", String(categorieId));
      formData.append("statut", "publie"); // ⚠️ Confirmer dans le backend
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("access");

      await axios.post("admin/articles/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/articles");
    } catch (err: any) {
      console.error("Erreur détaillée:", err.response?.data || err);
      const errMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Erreur lors de l'enregistrement";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Nouvel article
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Rédigez et publiez un nouveau contenu pour votre blog médical.
          </p>
        </div>

        <div className="bg-[#FAFAFC] border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Titre de l&apos;article
              </label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex: Les avancées de la cardiologie en 2026"
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Catégorie
              </label>
              <select
                value={categorieId ?? ""}
                onChange={(e) => setCategorieId(Number(e.target.value))}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all"
                required
              >
                <option value="" disabled>Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Contenu de l&apos;article
              </label>
              <textarea
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                placeholder="Rédigez le texte de votre article..."
                rows={8}
                className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                Image d&apos;illustration
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-800 transition-all cursor-pointer"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200/80">
              <button
                type="button"
                onClick={() => router.push("/admin/articles")}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 px-4 py-2.5 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm py-3 px-6 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Enregistrement..." : "Créer l’article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </RequireAuth>
  );
}
