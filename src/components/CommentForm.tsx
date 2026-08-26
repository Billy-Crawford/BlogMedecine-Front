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

export default function CommentForm({
  articleId,
  onCommentAdded,
}: Props) {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
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
        {/* =================================================
            TEXTAREA
        ================================================== */}

        <textarea
          className="
            w-full
            border
            border-zinc-300
            dark:border-zinc-700
            rounded-xl
            p-4
            shadow-sm
            bg-white
            dark:bg-zinc-900
            text-zinc-900
            dark:text-zinc-100
            placeholder:text-zinc-400
            dark:placeholder:text-zinc-500
            focus:outline-none
            focus:ring-2
            focus:ring-zinc-900
            dark:focus:ring-zinc-400
            focus:border-transparent
            resize-none
            text-sm
            transition-colors
          "
          rows={4}
          maxLength={300}
          placeholder="Écrire un commentaire…"
          value={texte}
          onChange={(e) => {
            setTexte(e.target.value);
            setError(null);
            setSuccess(false);
          }}
          disabled={loading}
        />

        {/* =================================================
            COMPTEUR
        ================================================== */}

        <div className="flex justify-between mt-2">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Votre commentaire sera visible publiquement.
          </p>

          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {texte.length}/300
          </span>
        </div>
      </div>

      {/* ===================================================
          ERREUR
      ==================================================== */}

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
          {error}
        </p>
      )}

      {/* ===================================================
          SUCCÈS
      ==================================================== */}

      {success && (
        <p className="text-green-600 dark:text-green-400 text-sm font-medium">
          Commentaire publié !
        </p>
      )}

      {/* ===================================================
          BOUTON
      ==================================================== */}

      <button
        type="submit"
        disabled={loading || !texte.trim()}
        className="
          bg-zinc-900
          dark:bg-zinc-100
          text-white
          dark:text-zinc-900
          px-5
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          hover:bg-zinc-800
          dark:hover:bg-zinc-200
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-colors
        "
      >
        {loading ? "Publication..." : "Publier le commentaire"}
      </button>
    </form>
  );
}

