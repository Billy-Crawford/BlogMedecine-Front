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

  if (!article) return <p className="text-center py-10">Chargement...</p>;

  const handleNewComment = (comment: Commentaire) => {
    setCommentaires((prev) => [comment, ...prev]);
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{article.titre}</h1>

      {typeof article.image === "string" &&
        article.image.startsWith("/media") && (
          <div className="mb-6">
            <Image
              src={`http://127.0.0.1:8000${article.image}`}
              alt={article.titre}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow"
              unoptimized
            />
          </div>
        )}

      <div className="prose prose-lg max-w-none mb-8">
        <p>{article.contenu}</p>
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-10">
        {article.categorie && (
          <p>
            🏷️ Catégorie : <strong>{article.categorie.nom}</strong>
          </p>
        )}
        {article.date_publication && (
          <p>
            📅 Publié le :{" "}
            {new Date(article.date_publication).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          💬 Commentaires
        </h2>

        {commentaires.length > 0 ? (
          <ul className="space-y-4">
            {commentaires.map((comment, index) => (
              <li
                key={comment.id ?? `comment-${index}`}
                className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
              >
                <p className="text-gray-800">{comment.texte}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Posté le{" "}
                  {comment.date_creation
                    ? new Date(comment.date_creation).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Date inconnue"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun commentaire pour le moment.</p>
        )}
      </section>

      <section className="mt-12">
        <CommentForm articleId={article.id} onCommentAdded={handleNewComment} />
      </section>
    </article>
  );
}
