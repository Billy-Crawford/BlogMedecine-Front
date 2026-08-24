/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArticleBySlug } from "../../../../lib/api";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import ArticleReactions from "@/components/ArticleReactions";
import Image from "next/image";
import axios from "axios";
import type { Commentaire } from "@/types/commentaire";


type Categorie = {
  id: number;
  nom: string;
};

type Article = {
  id: number;
  titre: string;
  slug: string;
  image: string | null;
  contenu: string;
  date_publication: string;
  categorie: Categorie;
  commentaires: Commentaire[];
};

export default function ArticleDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<Article | null>(null);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const data = await getArticleBySlug(slug);
      if (!data) return notFound();
      setArticle(data);
      setCommentaires(data.commentaires || []);
    };

    fetchArticle();
  }, [slug]);

  if (!article)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-zinc-500 font-medium text-sm tracking-wide">
            Chargement de l'article...
          </p>
        </div>
      </div>
    );

  const handleNewComment = (comment: Commentaire) => {
    setCommentaires((prev) => [comment, ...prev]);
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce commentaire ?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/commentaires/${commentId}/`,
        {
          withCredentials: true,
        },
      );

      setCommentaires((prev) =>
        prev.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error("Erreur suppression commentaire :", error);

      alert("Impossible de supprimer ce commentaire.");
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* En-tête de l'article */}
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {article.categorie && (
            <span className="bg-zinc-900 text-white text-xs font-medium uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
              {article.categorie.nom}
            </span>
          )}
          {article.date_publication && (
            <span className="text-zinc-400 text-xs uppercase tracking-wider font-medium">
              {new Date(article.date_publication).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight tracking-tight mb-8">
          {article.titre}
        </h1>

        <div className="w-16 h-0.5 bg-zinc-300 mx-auto rounded-full"></div>
      </header>

      {/* Image de l'article */}
      {typeof article.image === "string" &&
        article.image.startsWith("/media") && (
          <div className="mb-14 rounded-2xl overflow-hidden shadow-sm border border-zinc-200/80 aspect-[16/10] bg-zinc-100">
            <Image
              src={article.image}
              alt={article.titre}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        )}

      {/* Contenu de l'article */}
      <div className="prose prose-lg max-w-none mb-20">
        <div className="text-zinc-700 leading-relaxed space-y-6 text-base sm:text-lg font-normal">
          {article.contenu.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Réactions */}
      <ArticleReactions articleId={article.id} />

      <hr className="border-zinc-200 my-16" />

      {/* Section commentaires */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Commentaires
          </h2>
          <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
            {commentaires.length}
          </span>
        </div>

        {commentaires.length > 0 ? (
          <ul className="space-y-4">
            {commentaires.map((comment, index) => (
              <li
                key={comment.id ?? `comment-${index}`}
                className="bg-[#FAFAFC] p-6 rounded-2xl border border-zinc-200/70 shadow-2xs transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-900 text-white rounded-xl p-2.5 mt-0.5 shadow-2xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-800 text-sm sm:text-base leading-relaxed break-words">
                      {comment.texte}
                    </p>
                    <div className="flex items-center justify-between gap-4 mt-3">
                      <p className="text-xs text-zinc-400 font-medium">
                        Posté le{" "}
                        {comment.date_creation
                          ? new Date(comment.date_creation).toLocaleString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "Date inconnue"}
                      </p>

                      {comment.can_delete && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-[#FAFAFC] border border-zinc-200 rounded-2xl p-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-zinc-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-zinc-800 font-medium text-sm">
              Aucun commentaire pour le moment.
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Soyez le premier à réagir à cet article.
            </p>
          </div>
        )}
      </section>

      {/* Formulaire de commentaire */}
      <section className="bg-[#FAFAFC] rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs">
        <h3 className="text-lg font-bold text-zinc-900 mb-6 tracking-tight">
          Laisser un commentaire
        </h3>
        <CommentForm articleId={article.id} onCommentAdded={handleNewComment} />
      </section>
    </article>
  );
}
