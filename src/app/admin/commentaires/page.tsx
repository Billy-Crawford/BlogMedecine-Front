'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Commentaire = {
  id: number
  texte: string
  ip: string
  date_creation: string
  article: {
    id: number
    titre: string
  }
}

export default function AdminCommentairesPage() {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCommentaires = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/commentaires/')
        setCommentaires(res.data)
      } catch (error) {
        console.error('Erreur chargement commentaires', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommentaires()
  }, [])

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Supprimer ce commentaire ?')
    if (!confirm) return

    try {
      await axios.delete(`http://127.0.0.1:8000/api/commentaires/${id}/`)
      setCommentaires(prev => prev.filter(comment => comment.id !== id))
    } catch (error) {
      console.error('Erreur suppression', error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">💬 Gestion des commentaires</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : commentaires.length === 0 ? (
        <p>Aucun commentaire trouvé.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-2">Texte</th>
              <th className="px-4 py-2">Article</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {commentaires.map((comment) => (
              <tr key={comment.id} className="border-b text-sm">
                <td className="px-4 py-2 max-w-sm">{comment.texte}</td>
                <td className="px-4 py-2 text-blue-600">{comment.article?.titre}</td>
                <td className="px-4 py-2">{comment.ip}</td>
                <td className="px-4 py-2">
                  {new Date(comment.date_creation).toLocaleString('fr-FR')}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDelete(comment.id)}
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
  )
}
