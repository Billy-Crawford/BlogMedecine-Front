"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { Commentaire } from "@/types/commentaire";

type Props = {
  articleId: number;
  onCommentAdded: (comment: Commentaire) => void;
};

type ValidationError = {
  texte?: string[];
  detail?: string;
};

export default function CommentForm({ articleId, onCommentAdded }: Props) {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!texte.trim()) {
      setError("Le commentaire ne peut pas être vide.");
      return;
    }

    if (texte.length > 300) {
      setError("Le commentaire ne doit pas dépasser 300 caractères.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/commentaires/`,
        {
          article: articleId,
          texte: texte.trim(),
        },
        {
          withCredentials: true,
        },
      );

      setTexte("");
      setSuccess(true);

      onCommentAdded({
        ...response.data,
        can_delete: true,
      });
    } catch (err) {
      const axiosError = err as AxiosError<ValidationError>;

      if (axiosError.response?.data) {
        const data = axiosError.response.data;

        setError(
          data.texte?.[0] ||
            data.detail ||
            "Impossible de publier le commentaire.",
        );
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <textarea
          className="w-full border border-zinc-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none text-sm text-zinc-900 placeholder:text-zinc-400"
          rows={4}
          maxLength={300}
          placeholder="Écrire un commentaire…"
          value={texte}
          onChange={(e) => {
            setTexte(e.target.value);
            setError(null);
          }}
          disabled={loading}
        />

        <div className="flex justify-between mt-2">
          <p className="text-xs text-zinc-400">
            Votre commentaire sera visible publiquement.
          </p>

          <span className="text-xs text-zinc-400">{texte.length}/300</span>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      {success && (
        <p className="text-green-600 text-sm font-medium">
          Commentaire publié !
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !texte.trim()}
        className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Publication..." : "Publier le commentaire"}
      </button>
    </form>
  );
}

// 'use client'

// import { useState } from 'react'
// import axios, { AxiosError } from 'axios'

// type Props = {
//   articleId: number
//   onCommentAdded: (comment: Commentaire) => void
// }

// type ValidationError = {
//   texte?: string[]
//   detail?: string
// }

// type Commentaire = {
//   id: number
//   texte: string
//   date_creation: string
// }

// export default function CommentForm({ articleId, onCommentAdded }: Props) {
//   const [texte, setTexte] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<boolean>(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(false)

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/commentaires/`, {
//         article: articleId,
//         texte,
//       })

//       setTexte('')
//       setSuccess(true)
//       onCommentAdded(response.data) // ➕ Ajoute à la liste
//     } catch (err) {
//       const axiosError = err as AxiosError<ValidationError>
//       if (axiosError.response?.data) {
//         const data = axiosError.response.data
//         setError(data.texte?.[0] || data.detail || 'Une erreur est survenue.')
//       } else {
//         setError('Une erreur est survenue.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//       <textarea
//         className="w-full border border-gray-300 rounded-md p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
//         rows={4}
//         placeholder="Écrire un commentaire…"
//         value={texte}
//         onChange={(e) => setTexte(e.target.value)}
//         required
//       />

//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       {success && <p className="text-green-600 text-sm"> Commentaire publié !</p>}

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? 'Envoi...' : 'Envoyer'}
//       </button>
//     </form>
//   )
// }
