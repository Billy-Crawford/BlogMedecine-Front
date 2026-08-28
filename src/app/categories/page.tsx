"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../../../lib/api";

type Categorie = {
  id: number;
  nom: string;
  slug: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur chargement catégories :", err);
        setError("Impossible de charger les catégories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-4 md:py-8">
      {/* =====================================================
          EN-TÊTE
      ====================================================== */}

      <div className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Sommaire thématique
        </p>

        <h1 className="font-display italic text-4xl sm:text-5xl text-foreground">
          Catégories
        </h1>

        <p className="mt-3 text-muted-foreground">
          Explorez nos articles par thématique.
        </p>
      </div>

      {/* =====================================================
          CHARGEMENT
      ====================================================== */}

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
            Chargement des catégories...
          </p>
        </div>
      )}

      {/* =====================================================
          ERREUR
      ====================================================== */}

      {!loading && error && (
        <div className="border-l-2 border-accent bg-card py-4 pl-5 pr-4">
          <p className="text-accent text-sm">{error}</p>
        </div>
      )}

      {/* =====================================================
          AUCUNE CATÉGORIE
      ====================================================== */}

      {!loading && !error && categories.length === 0 && (
        <div className="border border-border py-14 text-center">
          <p className="font-display italic text-foreground/80">
            Aucune catégorie disponible pour le moment.
          </p>
        </div>
      )}

      {/* =====================================================
          CATÉGORIES
      ====================================================== */}

      {!loading && !error && categories.length > 0 && (
        <ul className="divide-y divide-border border-t border-b border-border">
          {categories.map((categorie, index) => (
            <li key={categorie.id}>
              <Link
                href={`/categories/${categorie.slug}`}
                className="group flex items-center gap-5 sm:gap-8 py-6 hover:bg-card/60 transition-colors -mx-1 px-1"
              >
                <span className="font-mono text-xs text-muted-foreground w-7 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {categorie.nom}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Voir les articles
                  </p>
                </div>

                <span className="font-mono text-lg text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
