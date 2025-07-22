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
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des catégories</h1>

      {/* Formulaire de création */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des catégories */}
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between border-b pb-2">
            {editingId === cat.id ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editingNom}
                  onChange={(e) => setEditingNom(e.target.value)}
                  className="flex-grow border px-2 py-1 rounded"
                />
                <button onClick={handleUpdate} className="text-green-600">✅</button>
                <button onClick={() => setEditingId(null)} className="text-gray-500">❌</button>
              </div>
            ) : (
              <>
                <span>{cat.nom}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(cat.id); setEditingNom(cat.nom) }} className="text-blue-500">Modifier</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500">Supprimer</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
