// src/app/admin/commentaires/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RequireAuth from "@/components/RequireAuth";

type Commentaire = {
  id: number;
  texte: string;
  ip: string;
  date_creation: string;
  article: {
    id: number;
    titre: string;
  };
};

export default function AdminCommentairesPage() {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommentaires = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/commentaires/`,
        );
        setCommentaires(res.data);
      } catch (error) {
        console.error("Erreur chargement commentaires", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentaires();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Supprimer ce commentaire ?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/commentaires/${id}/`,
      );
      setCommentaires((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  return (
    <RequireAuth>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Gestion des commentaires
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Modérez et supervisez les réactions des lecteurs sur vos articles.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm font-medium">
              Chargement des commentaires...
            </p>
          </div>
        ) : commentaires.length === 0 ? (
          <div className="bg-[#FAFAFC] border border-zinc-200 rounded-2xl p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-zinc-400 mb-4"
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
            <p className="text-zinc-900 font-semibold text-lg">
              Aucun commentaire trouvé.
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              Les réactions de vos lecteurs apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFC] border-b border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    <th className="px-6 py-4">Texte</th>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">IP</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  {commentaires.map((comment) => (
                    <tr
                      key={comment.id}
                      className="hover:bg-zinc-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 text-zinc-900 max-w-sm leading-relaxed">
                        {comment.texte}
                      </td>
                      <td className="px-6 py-4 text-zinc-800 font-semibold max-w-xs truncate">
                        {comment.article?.titre || "Article inconnu"}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                        {comment.ip}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 font-medium text-xs">
                        {comment.date_creation
                          ? new Date(comment.date_creation).toLocaleString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "Date inconnue"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="font-medium text-red-600 hover:underline text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
