/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArticleBySlug } from "../../../../lib/api";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import Image from "next/image";

type Commentaire = {
  id: number;
  texte: string;
  date_creation: string;
};

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

  if (!article) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <svg className="h-12 w-12 text-teal-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <p className="text-gray-600">Chargement de l'article...</p>
      </div>
    </div>
  );

  const handleNewComment = (comment: Commentaire) => {
    setCommentaires((prev) => [comment, ...prev]);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* En-tête de l'article */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          {article.categorie && (
            <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
              {article.categorie.nom}
            </span>
          )}
          <span className="text-gray-500 text-sm">
            {article.date_publication && new Date(article.date_publication).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
          {article.titre}
        </h1>
        
        <div className="w-full h-0.5 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full mb-8"></div>
      </header>

      {/* Image de l'article */}
      {typeof article.image === "string" && article.image.startsWith("/media") && (
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={`http://127.0.0.1:8000${article.image}`}
            alt={article.titre}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Contenu de l'article */}
      <div className="prose prose-lg max-w-none mb-16">
        <div className="text-gray-700 leading-relaxed space-y-6">
          {article.contenu.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Section commentaires */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Commentaires
          </h2>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {commentaires.length}
          </span>
        </div>

        {commentaires.length > 0 ? (
          <ul className="space-y-6">
            {commentaires.map((comment, index) => (
              <li
                key={comment.id ?? `comment-${index}`}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-teal-100 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 text-teal-600 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{comment.texte}</p>
                    <p className="text-xs text-gray-500 mt-3">
                      Posté le {comment.date_creation ? new Date(comment.date_creation).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }) : "Date inconnue"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-600">Aucun commentaire pour le moment. Soyez le premier à réagir !</p>
          </div>
        )}
      </section>

      {/* Formulaire de commentaire */}
      <section className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Laisser un commentaire</h3>
        <CommentForm articleId={article.id} onCommentAdded={handleNewComment} />
      </section>
    </article>
  );
}