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

  const categoryName =
    articles.length > 0 ? articles[0].categorie.nom : slug;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-10">
        <Link
          href="/categories"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          ← Toutes les catégories
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-5">
          {categoryName}
        </h1>

        <p className="mt-2 text-zinc-500">
          Articles de cette catégorie
        </p>
      </div>

      {/* Chargement */}
      {loading && (
        <div className="flex items-center gap-3 py-10">
          <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-zinc-500">
            Chargement des articles...
          </p>
        </div>
      )}

      {/* Erreur */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Aucun article */}
      {!loading && !error && articles.length === 0 && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-10 text-center">
          <p className="text-zinc-600">
            Aucun article disponible dans cette catégorie.
          </p>
        </div>
      )}

      {/* Articles */}
      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
            >
              {/* Image */}
              {article.image && (
                <div className="aspect-video overflow-hidden bg-zinc-100">
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Contenu */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-zinc-900 group-hover:text-zinc-700">
                  {article.titre}
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                  {article.categorie.nom}
                </p>

                <span className="inline-block mt-4 text-sm font-medium text-zinc-900">
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

