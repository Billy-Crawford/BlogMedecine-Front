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
      <div className="space-y-12">
        {/* En-tête */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Espace de gestion
          </p>

          <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Gestion des catégories
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            Organisez les thématiques et rubriques de vos articles.
          </p>
        </div>

        {/* =====================================================
            FORMULAIRE DE CRÉATION
        ====================================================== */}

        <div className="border-b border-border pb-10">
          <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Ajouter une nouvelle catégorie
          </label>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <input
              type="text"
              placeholder="Ex: Cardiologie, Pédiatrie..."
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="flex-grow bg-transparent border-0 border-b border-border px-0 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors"
            />

            <button
              type="button"
              onClick={handleCreate}
              className="bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] py-3 px-6 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* =====================================================
            LISTE DES CATÉGORIES
        ====================================================== */}

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Liste des catégories ({categories.length})
          </p>

          {/* Aucune catégorie */}
          {categories.length === 0 ? (
            <div className="border border-border py-14 text-center">
              <p className="font-display italic text-foreground/80">
                Aucune catégorie enregistrée pour le moment.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-t border-b border-border">
              {categories.map((cat) => (
                <li key={cat.id} className="px-1 py-5">
                  {/* Mode édition */}
                  {editingId === cat.id ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                      <input
                        type="text"
                        value={editingNom}
                        onChange={(e) => setEditingNom(e.target.value)}
                        className="flex-grow bg-transparent border-0 border-b border-primary px-0 py-2 text-foreground text-sm focus:outline-none"
                      />

                      <div className="flex items-center gap-5 shrink-0">
                        <button
                          type="button"
                          onClick={handleUpdate}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary hover:underline underline-offset-4 cursor-pointer"
                        >
                          Enregistrer
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Mode normal */
                    <div className="flex items-center justify-between">
                      <span className="text-foreground text-sm">
                        {cat.nom}
                      </span>

                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(cat.id);
                            setEditingNom(cat.nom);
                          }}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id)}
                          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-accent cursor-pointer transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
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

