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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-8">
      {/* =========================
          EN-TÊTE
      ========================== */}
      <div className="mb-12 pb-8 border-b border-border">
        <Link
          href="/categories"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
        >
          ← Toutes les catégories
        </Link>

        <h1 className="font-display italic text-4xl sm:text-5xl text-foreground mt-5">
          {categoryName}
        </h1>

        <p className="mt-3 text-muted-foreground">
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
              border-primary
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Chargement des articles...
          </p>
        </div>
      )}

      {/* =========================
          ERREUR
      ========================== */}
      {!loading && error && (
        <div className="border-l-2 border-accent bg-card py-4 pl-5 pr-4">
          <p className="text-accent text-sm">{error}</p>
        </div>
      )}

      {/* =========================
          AUCUN ARTICLE
      ========================== */}
      {!loading && !error && articles.length === 0 && (
        <div className="border border-border py-14 text-center">
          <p className="font-display italic text-foreground/80">
            Aucun article disponible dans cette catégorie.
          </p>
        </div>
      )}

      {/* =========================
          ARTICLES
      ========================== */}
      {!loading && !error && articles.length > 0 && (
        <ul className="divide-y divide-border border-t border-b border-border">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articles/${article.slug}`}
                className="group flex flex-col sm:flex-row items-start gap-5 sm:gap-8 py-8"
              >
                {article.image && (
                  <div className="w-full sm:w-40 flex-shrink-0 aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-2">
                    {article.categorie.nom}
                  </p>

                  <h2 className="font-display text-xl sm:text-2xl text-foreground leading-snug group-hover:text-primary transition-colors">
                    {article.titre}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs uppercase tracking-[0.14em] text-primary group-hover:underline underline-offset-4">
                    Lire l&apos;article →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

