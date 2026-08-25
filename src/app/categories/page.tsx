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
      {/* En-tête */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950">
          Catégories
        </h1>

        <p className="mt-2 text-zinc-500">
          Explorez nos articles par thématique.
        </p>
      </div>

      {/* Chargement */}
      {loading && (
        <div className="flex items-center gap-3 py-10">
          <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500">
            Chargement des catégories...
          </p>
        </div>
      )}

      {/* Erreur */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Aucune catégorie */}
      {!loading && !error && categories.length === 0 && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-10 text-center">
          <p className="text-zinc-600">
            Aucune catégorie disponible pour le moment.
          </p>
        </div>
      )}

      {/* Catégories */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((categorie) => (
            <Link
              key={categorie.id}
              href={`/categories/${categorie.slug}`}
              className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-zinc-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700">
                    {categorie.nom}
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    Voir les articles
                  </p>
                </div>

                <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors text-xl">
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
