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
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* =====================================================
          EN-TÊTE
      ====================================================== */}

      <div className="mb-10">
        <h1
          className="
            text-3xl
            sm:text-4xl
            font-extrabold
            text-zinc-950
            dark:text-zinc-100
          "
        >
          Catégories
        </h1>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
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
              border-zinc-900
              dark:border-zinc-100
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Chargement des catégories...
          </p>
        </div>
      )}

      {/* =====================================================
          ERREUR
      ====================================================== */}

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

      {/* =====================================================
          AUCUNE CATÉGORIE
      ====================================================== */}

      {!loading && !error && categories.length === 0 && (
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
          <p className="text-zinc-600 dark:text-zinc-300">
            Aucune catégorie disponible pour le moment.
          </p>
        </div>
      )}

      {/* =====================================================
          CATÉGORIES
      ====================================================== */}

      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((categorie) => (
            <Link
              key={categorie.id}
              href={`/categories/${categorie.slug}`}
              className="
                group
                bg-white
                dark:bg-zinc-900
                border
                border-zinc-200
                dark:border-zinc-800
                rounded-2xl
                p-6
                hover:border-zinc-400
                dark:hover:border-zinc-700
                hover:shadow-md
                dark:hover:shadow-black/30
                transition-all
                duration-300
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className="
                      text-lg
                      font-bold
                      text-zinc-900
                      dark:text-zinc-100
                      group-hover:text-zinc-700
                      dark:group-hover:text-zinc-300
                      transition-colors
                    "
                  >
                    {categorie.nom}
                  </h2>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Voir les articles
                  </p>
                </div>

                <span
                  className="
                    text-zinc-400
                    dark:text-zinc-500
                    group-hover:text-zinc-900
                    dark:group-hover:text-zinc-100
                    transition-colors
                    text-xl
                  "
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

