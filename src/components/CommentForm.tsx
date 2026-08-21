'use client'

import { useState } from 'react'
import axios, { AxiosError } from 'axios'

type Props = {
  articleId: number
  onCommentAdded: (comment: Commentaire) => void
}

type ValidationError = {
  texte?: string[]
  detail?: string
}

type Commentaire = {
  id: number
  texte: string
  date_creation: string
}

export default function CommentForm({ articleId, onCommentAdded }: Props) {
  const [texte, setTexte] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/commentaires/`, {
        article: articleId,
        texte,
      })

      setTexte('')
      setSuccess(true)
      onCommentAdded(response.data) // ➕ Ajoute à la liste
    } catch (err) {
      const axiosError = err as AxiosError<ValidationError>
      if (axiosError.response?.data) {
        const data = axiosError.response.data
        setError(data.texte?.[0] || data.detail || 'Une erreur est survenue.')
      } else {
        setError('Une erreur est survenue.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Écrire un commentaire…"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">✅ Commentaire publié !</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  )
}
