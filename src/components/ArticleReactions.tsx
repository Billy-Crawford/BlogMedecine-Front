"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Reaction = {
  id: number;
  article: number;
  type: "like" | "dislike";
  ip: string;
  date_creation: string;
};

type Props = {
  articleId: number;
};

export default function ArticleReactions({ articleId }: Props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [loading, setLoading] = useState(false);
  const [activeReaction, setActiveReaction] = useState<
    "like" | "dislike" | null
  >(null);

  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /**
   * Charger les réactions de l'article
   */
  const fetchReactions = async () => {
    try {
      const response = await axios.get<Reaction[]>(`${API_URL}/reactions/`, {
        params: {
          article: articleId,
        },
        withCredentials: true,
      });

      const reactions = response.data;

      setLikes(reactions.filter((reaction) => reaction.type === "like").length);

      setDislikes(
        reactions.filter((reaction) => reaction.type === "dislike").length,
      );
    } catch (error) {
      console.error("Erreur chargement réactions :", error);
    }
  };

  const fetchMyReaction = async () => {
    try {
      const response = await axios.get(`${API_URL}/reactions/my-reaction/`, {
        params: {
          article: articleId,
        },
        withCredentials: true,
      });

      setActiveReaction(response.data.type);
    } catch (error) {
      console.error("Erreur récupération réaction personnelle :", error);
    }
  };

  useEffect(() => {
    fetchReactions();
    fetchMyReaction();
  }, [articleId]);

  /**
   * Ajouter / supprimer / changer une réaction
   */
  const handleReaction = async (type: "like" | "dislike") => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/reactions/`,
        {
          article: articleId,
          type,
        },
        {
          withCredentials: true,
        },
      );

      /*
       * 204 = la même réaction existait déjà.
       * Elle vient donc d'être supprimée.
       */
      if (response.status === 204) {
        if (type === "like") {
          setLikes((prev) => Math.max(0, prev - 1));
        } else {
          setDislikes((prev) => Math.max(0, prev - 1));
        }

        setActiveReaction(null);
        return;
      }

      /*
       * 201 = nouvelle réaction créée
       */
      if (response.status === 201) {
        if (type === "like") {
          setLikes((prev) => prev + 1);
        } else {
          setDislikes((prev) => prev + 1);
        }

        setActiveReaction(type);
        return;
      }

      /*
       * 200 = changement de réaction
       *
       * Exemple :
       * like → dislike
       */
      if (response.status === 200) {
        if (type === "like") {
          setLikes((prev) => prev + 1);
          setDislikes((prev) => Math.max(0, prev - 1));
        } else {
          setDislikes((prev) => prev + 1);
          setLikes((prev) => Math.max(0, prev - 1));
        }

        setActiveReaction(type);
      }
    } catch (error) {
      console.error("Erreur réaction :", error);

      setError("Impossible d'enregistrer votre réaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-y border-border py-8 mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h3 className="font-display italic text-xl text-foreground">
            Votre avis
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            Cet article vous a-t-il été utile ?
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* LIKE */}
          <button
            type="button"
            onClick={() => handleReaction("like")}
            disabled={loading}
            className={`
              flex items-center gap-2
              pb-1
              border-b-2
              font-mono text-xs uppercase tracking-[0.1em]
              transition-colors
              disabled:opacity-40
              disabled:cursor-not-allowed
              ${
                activeReaction === "like"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill={activeReaction === "like" ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 001.94-1.515l1.2-5A2 2 0 0019.48 13H14"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M7 11H5a2 2 0 00-2 2v7a2 2 0 002 2h2"
              />
            </svg>

            <span>J&apos;aime</span>

            <span className="min-w-4 text-center">{likes}</span>
          </button>

          {/* DISLIKE */}
          <button
            type="button"
            onClick={() => handleReaction("dislike")}
            disabled={loading}
            className={`
              flex items-center gap-2
              pb-1
              border-b-2
              font-mono text-xs uppercase tracking-[0.1em]
              transition-colors
              disabled:opacity-40
              disabled:cursor-not-allowed
              ${
                activeReaction === "dislike"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill={activeReaction === "dislike" ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-1.94 1.515l-1.2 5A2 2 0 004.52 11H10"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M17 13h2a2 2 0 002-2V4a2 2 0 00-2-2h-2"
              />
            </svg>

            <span>Pas utile</span>

            <span className="min-w-4 text-center">{dislikes}</span>
          </button>
        </div>
      </div>

      {error && <p className="text-accent text-sm mt-4">{error}</p>}
    </section>
  );
}
