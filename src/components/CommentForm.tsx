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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        {/* =================================================
            TEXTAREA
        ================================================== */}

        <textarea
          className="
            w-full
            border
            border-border
            bg-background
            text-foreground
            placeholder:text-muted-foreground
            focus:outline-none
            focus:border-primary
            resize-none
            text-sm
            sm:text-base
            leading-relaxed
            p-4
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
          <p className="font-mono text-[11px] text-muted-foreground">
            Votre commentaire sera visible publiquement.
          </p>

          <span className="font-mono text-[11px] text-muted-foreground">
            {texte.length}/300
          </span>
        </div>
      </div>

      {/* ===================================================
          ERREUR
      ==================================================== */}

      {error && (
        <p className="text-accent text-sm font-medium">{error}</p>
      )}

      {/* ===================================================
          SUCCÈS
      ==================================================== */}

      {success && (
        <p className="text-primary text-sm font-medium">
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
          inline-flex
          items-center
          gap-2
          bg-primary
          text-primary-foreground
          px-6
          py-3
          font-mono
          text-xs
          uppercase
          tracking-[0.14em]
          hover:opacity-90
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-opacity
        "
      >
        {loading ? "Publication..." : "Publier le commentaire"}
      </button>
    </form>
  );
}

