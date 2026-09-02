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
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Chargement de l&apos;article...
          </p>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="max-w-2xl space-y-12">
        {/* En-tête */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Espace de gestion
          </p>

          <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Modifier l&apos;article
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            Modifiez les informations de votre publication.
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
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {/* Catégorie et Statut côte à côte */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Statut
              </label>

              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="publie">Publié</option>
                <option value="brouillon">Brouillon</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Date de publication
            </label>

            <input
              type="datetime-local"
              value={datePublication}
              onChange={(e) => setDatePublication(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Contenu */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Contenu
            </label>

            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              rows={10}
              className="w-full bg-transparent border border-border p-4 text-foreground text-sm focus:outline-none focus:border-primary transition-colors leading-relaxed resize-none"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
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
              className="w-full text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.1em] file:bg-muted file:text-foreground hover:file:bg-border transition-colors cursor-pointer"
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
              disabled={saving}
              className="bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] py-3 px-6 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}

