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
      <div className="space-y-8">
        {/* En-tête */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >
          <div>
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                text-zinc-950
                dark:text-zinc-100
                tracking-tight
                transition-colors
              "
            >
              Gestion des articles
            </h1>

            <p
              className="
                text-zinc-500
                dark:text-zinc-400
                text-sm
                mt-1
                transition-colors
              "
            >
              Liste et administration de l&apos;ensemble des publications du
              blog.
            </p>
          </div>

          <Link
            href="/admin/articles/nouveau"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-zinc-900
              dark:bg-zinc-100
              hover:bg-zinc-800
              dark:hover:bg-zinc-200
              text-white
              dark:text-zinc-900
              font-medium
              text-sm
              py-2.5
              px-4
              rounded-xl
              shadow-2xs
              hover:shadow-md
              transition-all
              shrink-0
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>

            Nouvel article
          </Link>
        </div>

        {/* Chargement */}
        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div
              className="
                w-5
                h-5
                border-2
                border-zinc-900
                dark:border-zinc-100
                border-t-transparent
                rounded-full
                animate-spin
              "
            />

            <p
              className="
                text-zinc-500
                dark:text-zinc-400
                text-sm
                font-medium
              "
            >
              Chargement des articles...
            </p>
          </div>
        ) : articles.length === 0 ? (
          /* Aucun article */
          <div
            className="
              bg-[#FAFAFC]
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              rounded-2xl
              p-12
              text-center
              transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="
                h-12
                w-12
                mx-auto
                text-zinc-400
                dark:text-zinc-500
                mb-4
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>

            <p
              className="
                text-zinc-900
                dark:text-zinc-100
                font-semibold
                text-lg
              "
            >
              Aucun article pour l&apos;instant.
            </p>

            <p
              className="
                text-zinc-500
                dark:text-zinc-400
                text-sm
                mt-1
              "
            >
              Commencez par créer votre première publication.
            </p>
          </div>
        ) : (
          /* Tableau */
          <div
            className="
              bg-white
              dark:bg-zinc-900
              border
              border-zinc-200/80
              dark:border-zinc-800
              rounded-2xl
              shadow-2xs
              dark:shadow-none
              overflow-hidden
              transition-colors
            "
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="
                      bg-[#FAFAFC]
                      dark:bg-zinc-800/70
                      border-b
                      border-zinc-200
                      dark:border-zinc-800
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-zinc-500
                      dark:text-zinc-400
                      transition-colors
                    "
                  >
                    <th className="px-6 py-4">Titre</th>
                    <th className="px-6 py-4">Catégorie</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Publication</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody
                  className="
                    divide-y
                    divide-zinc-100
                    dark:divide-zinc-800
                    text-sm
                  "
                >
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="
                        hover:bg-zinc-50/60
                        dark:hover:bg-zinc-800/50
                        transition-colors
                      "
                    >
                      {/* Titre */}
                      <td
                        className="
                          px-6
                          py-4
                          font-semibold
                          text-zinc-900
                          dark:text-zinc-100
                          max-w-xs
                          truncate
                        "
                      >
                        {article.titre}
                      </td>

                      {/* Catégorie */}
                      <td
                        className="
                          px-6
                          py-4
                          text-zinc-600
                          dark:text-zinc-400
                        "
                      >
                        <span
                          className="
                            inline-flex
                            items-center
                            px-2.5
                            py-1
                            rounded-md
                            text-xs
                            font-medium
                            bg-zinc-100
                            dark:bg-zinc-800
                            text-zinc-800
                            dark:text-zinc-200
                            transition-colors
                          "
                        >
                          {article.categorie?.nom || "Non catégorisé"}
                        </span>
                      </td>

                      {/* Statut */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            article.statut === "Publié"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900"
                          }`}
                        >
                          {article.statut}
                        </span>
                      </td>

                      {/* Date */}
                      <td
                        className="
                          px-6
                          py-4
                          text-zinc-500
                          dark:text-zinc-400
                          font-medium
                          text-xs
                        "
                      >
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
                      <td className="px-6 py-4 text-right space-x-4">
                        <Link
                          href={`/admin/articles/${article.id}/modifier`}
                          className="
                            font-medium
                            text-zinc-900
                            dark:text-zinc-100
                            hover:text-zinc-600
                            dark:hover:text-zinc-300
                            hover:underline
                            text-xs
                            uppercase
                            tracking-wider
                            transition-colors
                          "
                        >
                          Modifier
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(article.id)}
                          className="
                            font-medium
                            text-red-600
                            dark:text-red-400
                            hover:text-red-700
                            dark:hover:text-red-300
                            hover:underline
                            text-xs
                            uppercase
                            tracking-wider
                            cursor-pointer
                            transition-colors
                          "
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}

