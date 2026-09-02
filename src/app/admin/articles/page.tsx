// src/app/admin/articles/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "../../../../lib/axios";
import RequireAuth from "@/components/RequireAuth";

type Article = {
  id: number;
  titre: string;
  slug: string;
  statut: string;
  date_publication: string | null;
  categorie: {
    id: number;
    nom: string;
  } | null;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("admin/articles/");
        setArticles(res.data);
      } catch (error) {
        console.error("Erreur chargement articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Supprimer cet article ?");
    if (!confirm) return;

    try {
      await axios.delete(`admin/articles/${id}/`);

      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error: any) {
      console.error(
        "Erreur suppression article :",
        error.response?.data || error,
      );

      alert(
        error.response?.data?.detail || "Impossible de supprimer l'article.",
      );
    }
  };

  return (
    <RequireAuth>
      <div className="space-y-12">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Espace de gestion
            </p>

            <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
              Gestion des articles
            </h1>

            <p className="text-muted-foreground text-sm mt-2">
              Liste et administration de l&apos;ensemble des publications du
              blog.
            </p>
          </div>

          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] py-3 px-6 hover:opacity-90 transition-opacity shrink-0"
          >
            + Nouvel article
          </Link>
        </div>

        {/* Chargement */}
        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />

            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Chargement des articles...
            </p>
          </div>
        ) : articles.length === 0 ? (
          /* Aucun article */
          <div className="border border-border py-16 text-center">
            <p className="font-display italic text-xl text-foreground mb-2">
              Aucun article pour l&apos;instant.
            </p>

            <p className="text-muted-foreground text-sm">
              Commencez par créer votre première publication.
            </p>
          </div>
        ) : (
          /* Tableau */
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Titre
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Catégorie
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Statut
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Publication
                  </th>
                  <th className="py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground text-right font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border text-sm">
                {articles.map((article) => {
                  const isPublished = article.statut === "Publié";

                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-card/60 transition-colors"
                    >
                      {/* Titre */}
                      <td className="py-4 pr-6 text-foreground max-w-xs truncate">
                        {article.titre}
                      </td>

                      {/* Catégorie */}
                      <td className="py-4 pr-6 text-muted-foreground">
                        {article.categorie?.nom || "Non catégorisé"}
                      </td>

                      {/* Statut */}
                      <td className="py-4 pr-6">
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? "bg-primary" : "bg-gold"
                            }`}
                          />
                          {article.statut}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 pr-6 font-mono text-xs text-muted-foreground">
                        {article.date_publication
                          ? new Date(
                              article.date_publication,
                            ).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Non publiée"}
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right space-x-5">
                        <Link
                          href={`/admin/articles/${article.id}/modifier`}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
                        >
                          Modifier
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(article.id)}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-accent cursor-pointer transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}

