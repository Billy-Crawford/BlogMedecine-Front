// lib/api.ts

import axios from 'axios'


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles/`)
  return response.data
}

export const getArticleBySlug = async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${slug}/`)
      return response.data
    } catch (error) {
        console.error("Erreur lors du chargement de l'article :", error)
      return null
    }
  }
  
// 🟢 Obtenir toutes les catégories
export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories/`)
  return response.data
}

// ➕ Créer une catégorie
export const createCategory = async (nom: string) => {
  const response = await axios.post(`${API_BASE_URL}/categories/`, { nom })
  return response.data
}

// ✏️ Modifier une catégorie
export const updateCategory = async (id: number, nom: string) => {
  const response = await axios.put(`${API_BASE_URL}/categories/${id}/`, { nom })
  return response.data
}

// ❌ Supprimer une catégorie
export const deleteCategory = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/categories/${id}/`)
}