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

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div
            className="
              w-8
              h-8
              border-2
              border-primary
              border-t-transparent
              rounded-full
              animate-spin
              mb-4
            "
          />

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Chargement de l'article...
          </p>
        </div>
      </div>
    );
  }

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

  const paragraphes = article.contenu.split("\n");

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-4 md:py-8">
      {/* =====================================================
          EN-TÊTE DE L'ARTICLE
      ====================================================== */}

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          {article.categorie && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {article.categorie.nom}
            </span>
          )}

          {article.date_publication && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {new Date(article.date_publication).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-8">
          {article.titre}
        </h1>

        <svg
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          className="w-24 h-3 text-primary/70"
          aria-hidden="true"
        >
          <polyline
            points="0,10 160,10 175,10 185,2 195,18 205,10 215,10 400,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </header>

      {/* =====================================================
          IMAGE DE L'ARTICLE
      ====================================================== */}

      {typeof article.image === "string" &&
        article.image.startsWith("/media") && (
          <div className="mb-14 -mx-4 sm:mx-0 border-y sm:border border-border aspect-[16/10] bg-muted overflow-hidden">
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

      {/* =====================================================
          CONTENU DE L'ARTICLE
      ====================================================== */}

      <div className="max-w-none mb-16">
        <div className="text-foreground/85 leading-relaxed space-y-6 text-base sm:text-lg">
          {paragraphes.map((paragraph, index) =>
            index === 0 ? (
              <p
                key={index}
                className="first-letter:font-display first-letter:not-italic first-letter:text-6xl sm:first-letter:text-7xl first-letter:text-primary first-letter:float-left first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1"
              >
                {paragraph}
              </p>
            ) : (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>
      </div>

      {/* =====================================================
          RÉACTIONS
      ====================================================== */}

      <ArticleReactions articleId={article.id} />

      <hr className="border-border my-16" />

      {/* =====================================================
          SECTION COMMENTAIRES
      ====================================================== */}

      <section className="mb-16">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="font-display italic text-2xl text-foreground">
            Commentaires
          </h2>

          <span className="font-mono text-xs text-muted-foreground">
            ({commentaires.length})
          </span>
        </div>

        {commentaires.length > 0 ? (
          <ul className="space-y-6">
            {commentaires.map((comment, index) => (
              <li
                key={comment.id ?? `comment-${index}`}
                className="border-l-2 border-border pl-5"
              >
                <p className="text-foreground/85 text-sm sm:text-base leading-relaxed break-words">
                  {comment.texte}
                </p>

                <div className="flex items-center justify-between gap-4 mt-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
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
                      className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent hover:underline underline-offset-4 transition"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-border py-10 text-center">
            <p className="font-display italic text-foreground/80">
              Aucun commentaire pour le moment.
            </p>

            <p className="text-muted-foreground text-xs mt-1">
              Soyez le premier à réagir à cet article.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          FORMULAIRE DE COMMENTAIRE
      ====================================================== */}

      <section className="border-t border-border pt-10">
        <h3 className="font-display italic text-xl text-foreground mb-6">
          Laisser un commentaire
        </h3>

        <CommentForm
          articleId={article.id}
          onCommentAdded={handleNewComment}
        />
      </section>
    </article>
  );
}