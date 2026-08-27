// src/app/admin/categories/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../../../lib/api";
import RequireAuth from "@/components/RequireAuth";

type Categorie = {
  id: number;
  nom: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [newNom, setNewNom] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNom, setEditingNom] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleCreate = async () => {
    if (newNom.trim()) {
      await createCategory(newNom);
      setNewNom("");
      loadCategories();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  const handleUpdate = async () => {
    if (editingId !== null && editingNom.trim()) {
      await updateCategory(editingId, editingNom);
      setEditingId(null);
      setEditingNom("");
      loadCategories();
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto py-8">

        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-100 tracking-tight">
            Gestion des catégories
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Organisez les thématiques et rubriques de vos articles.
          </p>
        </div>

        {/* =====================================================
            FORMULAIRE DE CRÉATION
        ====================================================== */}

        <div className="bg-[#FAFAFC] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-2xs mb-8">

          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
            Ajouter une nouvelle catégorie
          </label>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Ex: Cardiologie, Pédiatrie..."
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="
                flex-grow
                bg-white
                dark:bg-zinc-950
                border
                border-zinc-200
                dark:border-zinc-700
                rounded-xl
                px-4
                py-3
                text-zinc-900
                dark:text-zinc-100
                text-sm
                placeholder:text-zinc-400
                dark:placeholder:text-zinc-500
                focus:outline-none
                focus:ring-2
                focus:ring-zinc-900/20
                dark:focus:ring-zinc-100/20
                focus:border-zinc-900
                dark:focus:border-zinc-100
                transition-all
              "
            />

            <button
              type="button"
              onClick={handleCreate}
              className="
                bg-zinc-900
                dark:bg-zinc-100
                hover:bg-zinc-800
                dark:hover:bg-white
                text-white
                dark:text-zinc-900
                font-medium
                text-sm
                py-3
                px-6
                rounded-xl
                shadow-2xs
                hover:shadow-md
                transition-all
                duration-200
                cursor-pointer
                shrink-0
              "
            >
              Ajouter
            </button>

          </div>
        </div>

        {/* =====================================================
            LISTE DES CATÉGORIES
        ====================================================== */}

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-2xs overflow-hidden">

          {/* En-tête */}
          <div className="px-6 py-4 bg-[#FAFAFC] dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Liste des catégories ({categories.length})
          </div>

          {/* Aucune catégorie */}
          {categories.length === 0 ? (

            <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
              Aucune catégorie enregistrée pour le moment.
            </div>

          ) : (

            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">

              {categories.map((cat) => (

                <li
                  key={cat.id}
                  className="
                    px-6
                    py-4
                    flex
                    items-center
                    justify-between
                    hover:bg-zinc-50/60
                    dark:hover:bg-zinc-800/50
                    transition-colors
                  "
                >

                  {/* Mode édition */}
                  {editingId === cat.id ? (

                    <div className="flex items-center gap-3 w-full">

                      <input
                        type="text"
                        value={editingNom}
                        onChange={(e) => setEditingNom(e.target.value)}
                        className="
                          flex-grow
                          bg-white
                          dark:bg-zinc-950
                          border
                          border-zinc-200
                          dark:border-zinc-700
                          rounded-xl
                          px-4
                          py-2
                          text-zinc-900
                          dark:text-zinc-100
                          text-sm
                          focus:outline-none
                          focus:ring-2
                          focus:ring-zinc-900/20
                          dark:focus:ring-zinc-100/20
                          focus:border-zinc-900
                          dark:focus:border-zinc-100
                        "
                      />

                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="
                          bg-emerald-50
                          dark:bg-emerald-950/40
                          text-emerald-700
                          dark:text-emerald-400
                          hover:bg-emerald-100
                          dark:hover:bg-emerald-950/70
                          px-3.5
                          py-2
                          rounded-xl
                          text-xs
                          font-semibold
                          transition-colors
                          cursor-pointer
                        "
                      >
                        Enregistrer
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="
                          bg-zinc-100
                          dark:bg-zinc-800
                          text-zinc-600
                          dark:text-zinc-300
                          hover:bg-zinc-200
                          dark:hover:bg-zinc-700
                          px-3.5
                          py-2
                          rounded-xl
                          text-xs
                          font-semibold
                          transition-colors
                          cursor-pointer
                        "
                      >
                        Annuler
                      </button>

                    </div>

                  ) : (

                    /* Mode normal */
                    <>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                        {cat.nom}
                      </span>

                      <div className="flex items-center gap-4">

                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(cat.id);
                            setEditingNom(cat.nom);
                          }}
                          className="
                            font-medium
                            text-zinc-900
                            dark:text-zinc-200
                            hover:text-zinc-600
                            dark:hover:text-zinc-400
                            hover:underline
                            text-xs
                            uppercase
                            tracking-wider
                            cursor-pointer
                            transition-colors
                          "
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id)}
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

                      </div>
                    </>
                  )}

                </li>
              ))}

            </ul>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}

