// src/app/admin/articles/[id]/modifier/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/../lib/axios";
import RequireAuth from "@/components/RequireAuth";

type Categorie = {
  id: number;
  nom: string;
};

type Article = {
  id: number;
  titre: string;
  contenu: string;
  categorie: {
    id: number;
    nom: string;
  } | null;
  statut: string;
  date_publication: string | null;
  image: string | null;
};

export default function ModifierArticlePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [statut, setStatut] = useState("publie");
  const [datePublication, setDatePublication] = useState("");
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleResponse, categoriesResponse] = await Promise.all([
          axios.get(`admin/articles/${id}/`),
          axios.get("categories/"),
        ]);

        const article: Article = articleResponse.data;

        setTitre(article.titre);
        setContenu(article.contenu);
        setCategorieId(article.categorie?.id ?? null);
        setStatut(article.statut);

        if (article.date_publication) {
          setDatePublication(article.date_publication.slice(0, 16));
        }

        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erreur chargement article", error);
        setError("Impossible de charger l'article.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError(null);

    if (!categorieId) {
      setError("Veuillez sélectionner une catégorie.");
      setSaving(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("titre", titre);
      formData.append("contenu", contenu);
      formData.append("categorie_id", String(categorieId));
      formData.append("statut", statut);

      if (datePublication) {
        formData.append("date_publication", datePublication);
      }

      if (image) {
        formData.append("image", image);
      }

      await axios.patch(`admin/articles/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/articles");
      router.refresh();
    } catch (error: any) {
      console.error(
        "Erreur modification article",
        error.response?.data || error,
      );

      setError(
        error.response?.data?.detail ||
          "Erreur lors de la modification de l'article.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <RequireAuth>
        <div className="flex items-center gap-3 py-12">
          <div className="w-5 h-5 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent rounded-full animate-spin" />

          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Chargement de l'article...
          </p>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-100 tracking-tight">
            Modifier l&apos;article
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Modifiez les informations de votre publication.
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-[#FAFAFC] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Titre de l&apos;article
              </label>

              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                required
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Catégorie
              </label>

              <select
                value={categorieId ?? ""}
                onChange={(e) => setCategorieId(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                required
              >
                <option value="" disabled>
                  Choisir une catégorie
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Statut
              </label>

              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
              >
                <option
                  value="publie"
                  className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                >
                  Publié
                </option>

                <option
                  value="brouillon"
                  className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                >
                  Brouillon
                </option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Date de publication
              </label>

              <input
                type="datetime-local"
                value={datePublication}
                onChange={(e) => setDatePublication(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
              />
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Contenu
              </label>

              <textarea
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                rows={10}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-900 dark:focus:border-zinc-100 leading-relaxed transition-all"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Nouvelle image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-900 file:text-white dark:file:bg-zinc-100 dark:file:text-zinc-900"
              />
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => router.push("/admin/articles")}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-4 py-2.5 transition-colors"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-sm py-3 px-6 rounded-xl disabled:opacity-50 transition-colors"
              >
                {saving
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </RequireAuth>
  );
}

