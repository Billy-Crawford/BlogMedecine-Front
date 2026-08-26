"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArticles } from "../../../../lib/api";

type Categorie = {
  id: number;
  nom: string;
  slug: string;
};

type Article = {
  id: number;
  titre: string;
  slug: string;
  image: string;
  contenu: string;
  categorie: Categorie;
  statut: string;
  date_publication: string | null;
};

export default function CategoryArticlesPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(slug);
        setArticles(data);
      } catch (err) {
        console.error("Erreur chargement articles :", err);
        setError("Impossible de charger les articles de cette catégorie.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticles();
    }
  }, [slug]);

  const categoryName = articles.length > 0 ? articles[0].categorie.nom : slug;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* =========================
          EN-TÊTE
      ========================== */}
      <div className="mb-10">
        <Link
          href="/categories"
          className="
            text-sm
            text-zinc-500
            dark:text-zinc-400
            hover:text-zinc-900
            dark:hover:text-white
            transition-colors
          "
        >
          ← Toutes les catégories
        </Link>

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-extrabold
            text-zinc-950
            dark:text-white
            mt-5
          "
        >
          {categoryName}
        </h1>

        <p
          className="
            mt-2
            text-zinc-500
            dark:text-zinc-400
          "
        >
          Articles de cette catégorie
        </p>
      </div>

      {/* =========================
          CHARGEMENT
      ========================== */}
      {loading && (
        <div className="flex items-center gap-3 py-10">
          <div
            className="
              w-5
              h-5
              border-2
              border-zinc-900
              dark:border-white
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p
            className="
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Chargement des articles...
          </p>
        </div>
      )}

      {/* =========================
          ERREUR
      ========================== */}
      {!loading && error && (
        <div
          className="
            bg-red-50
            dark:bg-red-950/40
            border
            border-red-200
            dark:border-red-900
            text-red-700
            dark:text-red-300
            rounded-xl
            px-4
            py-3
          "
        >
          {error}
        </div>
      )}

      {/* =========================
          AUCUN ARTICLE
      ========================== */}
      {!loading && !error && articles.length === 0 && (
        <div
          className="
            bg-zinc-50
            dark:bg-zinc-900
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-2xl
            p-10
            text-center
          "
        >
          <p
            className="
              text-zinc-600
              dark:text-zinc-300
            "
          >
            Aucun article disponible dans cette catégorie.
          </p>
        </div>
      )}

      {/* =========================
          ARTICLES
      ========================== */}
      {!loading && !error && articles.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="
                group

                bg-white
                dark:bg-zinc-900

                border
                border-zinc-200
                dark:border-zinc-800

                rounded-2xl
                overflow-hidden

                hover:shadow-md
                dark:hover:shadow-black/30

                hover:border-zinc-300
                dark:hover:border-zinc-700

                transition-all
              "
            >
              {/* =========================
                  IMAGE
              ========================== */}
              {article.image && (
                <div
                  className="
                    aspect-video
                    overflow-hidden
                    bg-zinc-100
                    dark:bg-zinc-800
                  "
                >
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />
                </div>
              )}

              {/* =========================
                  CONTENU
              ========================== */}
              <div className="p-5">
                <h2
                  className="
                    text-xl
                    font-bold

                    text-zinc-900
                    dark:text-white

                    group-hover:text-zinc-700
                    dark:group-hover:text-zinc-200

                    transition-colors
                  "
                >
                  {article.titre}
                </h2>

                <p
                  className="
                    text-sm
                    text-zinc-500
                    dark:text-zinc-400
                    mt-2
                  "
                >
                  {article.categorie.nom}
                </p>

                <span
                  className="
                    inline-block
                    mt-4
                    text-sm
                    font-medium

                    text-zinc-900
                    dark:text-white

                    group-hover:text-zinc-600
                    dark:group-hover:text-zinc-300

                    transition-colors
                  "
                >
                  Lire l'article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
