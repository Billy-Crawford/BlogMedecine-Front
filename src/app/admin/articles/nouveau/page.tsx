// src/app/admin/articles/nouveau/page.tsx

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../../lib/axios";
import RequireAuth from "@/components/RequireAuth";

type Categorie = {
  id: number;
  nom: string;
};

export default function CreateArticlePage() {
  const router = useRouter();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération des catégories
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

  // Soumission du formulaire
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
      formData.append("categorie_id", String(categorieId));
      formData.append("statut", "publie");

      if (image) {
        formData.append("image", image);
      }

      await axios.post("admin/articles/", formData, {
        headers: {
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
      <div className="max-w-2xl space-y-12">
        {/* En-tête */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Espace de gestion
          </p>

          <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Nouvel article
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            Rédigez et publiez un nouveau contenu pour votre blog médical.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Titre */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Titre de l&apos;article
            </label>

            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Les avancées de la cardiologie en 2026"
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Catégorie
            </label>

            <select
              value={categorieId ?? ""}
              onChange={(e) => setCategorieId(Number(e.target.value))}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              required
            >
              <option value="" disabled>
                Choisir une catégorie
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Contenu */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Contenu de l&apos;article
            </label>

            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Rédigez le texte de votre article..."
              rows={8}
              className="w-full bg-transparent border border-border p-4 text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors leading-relaxed resize-none"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
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
              className="w-full text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.1em] file:bg-muted file:text-foreground hover:file:bg-border transition-colors cursor-pointer"
              required
            />
          </div>

          {/* Erreur */}
          {error && <p className="text-accent text-sm">{error}</p>}

          {/* Actions */}
          <div className="flex items-center justify-end gap-6 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] py-3 px-6 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? "Enregistrement..." : "Créer l'article"}
            </button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}

