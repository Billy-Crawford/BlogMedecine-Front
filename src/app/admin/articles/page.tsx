'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from '../../../../lib/axios'
import RequireAuth from '@/components/RequireAuth'

type Article = {
  id: number
  titre: string
  slug: string
  statut: string
  date_publication: string
  categorie: { nom: string }
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('articles/')
        setArticles(res.data)
      } catch (error) {
        console.error('Erreur chargement articles', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Supprimer cet article ?')
    if (!confirm) return

    try {
      await axios.delete(`articles/${id}/`)
      setArticles((prev) => prev.filter((article) => article.id !== id))
    } catch (error) {
      console.error('Erreur suppression', error)
    }
  }

  return (
    <RequireAuth>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📝 Gestion des articles</h1>
          <Link
            href="/admin/articles/nouveau"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Nouvel article
          </Link>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : articles.length === 0 ? (
          <p>Aucun article pour l’instant.</p>
        ) : (
          <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Catégorie</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Publication</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b text-sm">
                  <td className="px-4 py-2">{article.titre}</td>
                  <td className="px-4 py-2">{article.categorie?.nom}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        article.statut === 'Publié'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {article.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <Link
                      href="#"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RequireAuth>
  )
}
