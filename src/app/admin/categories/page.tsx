// src/app/admin/categories/page.tsx

'use client'

import { useEffect, useState } from 'react'
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../../../lib/api'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<{ id: number; nom: string }[]>([])
  const [newNom, setNewNom] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingNom, setEditingNom] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const data = await getCategories()
    setCategories(data)
  }

  const handleCreate = async () => {
    if (newNom.trim()) {
      await createCategory(newNom)
      setNewNom('')
      loadCategories()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Confirmer la suppression ?')) {
      await deleteCategory(id)
      loadCategories()
    }
  }

  const handleUpdate = async () => {
    if (editingId !== null && editingNom.trim()) {
      await updateCategory(editingId, editingNom)
      setEditingId(null)
      setEditingNom('')
      loadCategories()
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          Gestion des catégories
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Organisez les thématiques et rubriques de vos articles.
        </p>
      </div>

      {/* Formulaire de création */}
      <div className="bg-[#FAFAFC] border border-zinc-200/80 rounded-2xl p-6 shadow-2xs mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
          Ajouter une nouvelle catégorie
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ex: Cardiologie, Pédiatrie..."
            value={newNom}
            onChange={(e) => setNewNom(e.target.value)}
            className="flex-grow bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all"
          />
          <button
            onClick={handleCreate}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm py-3 px-6 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer shrink-0"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="px-6 py-4 bg-[#FAFAFC] border-b border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Liste des catégories ({categories.length})
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            Aucune catégorie enregistrée pour le moment.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {categories.map((cat) => (
              <li key={cat.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50/60 transition-colors">
                {editingId === cat.id ? (
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="text"
                      value={editingNom}
                      onChange={(e) => setEditingNom(e.target.value)}
                      className="flex-grow bg-white border border-zinc-200 rounded-xl px-4 py-2 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900"
                    />
                    <button 
                      onClick={handleUpdate} 
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Enregistrer
                    </button>
                    <button 
                      onClick={() => setEditingId(null)} 
                      className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-zinc-900 text-sm">{cat.nom}</span>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => { setEditingId(cat.id); setEditingNom(cat.nom) }} 
                        className="font-medium text-zinc-900 hover:underline text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)} 
                        className="font-medium text-red-600 hover:underline text-xs uppercase tracking-wider cursor-pointer"
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
  )
}

