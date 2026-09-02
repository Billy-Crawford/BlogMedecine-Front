// src/app/admin/commentaires/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";
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
        const res = await axios.get("/commentaires/");
        setCommentaires(res.data);
      } catch (error) {
        console.error("Erreur chargement commentaires :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentaires();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Supprimer ce commentaire ?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`/commentaires/${id}/`);

      setCommentaires((prev) =>
        prev.filter((comment) => comment.id !== id),
      );
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  return (
    <RequireAuth>
      <div className="space-y-12">
        {/* En-tête */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Espace de gestion
          </p>

          <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Gestion des commentaires
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            Modérez et supervisez les réactions des lecteurs sur vos articles.
          </p>
        </div>

        {/* Chargement */}
        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />

            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Chargement des commentaires...
            </p>
          </div>
        ) : commentaires.length === 0 ? (
          /* Aucun commentaire */
          <div className="border border-border py-16 text-center">
            <p className="font-display italic text-xl text-foreground mb-2">
              Aucun commentaire trouvé.
            </p>

            <p className="text-muted-foreground text-sm">
              Les réactions de vos lecteurs apparaîtront ici.
            </p>
          </div>
        ) : (
          /* Tableau */
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full text-left border-collapse">
              {/* En-tête du tableau */}
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Texte
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Article
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    IP
                  </th>
                  <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                    Date
                  </th>
                  <th className="py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground text-right font-normal">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Corps */}
              <tbody className="divide-y divide-border text-sm">
                {commentaires.map((comment) => (
                  <tr key={comment.id} className="hover:bg-card/60 transition-colors">
                    {/* Texte */}
                    <td className="py-4 pr-6 text-foreground max-w-sm leading-relaxed">
                      {comment.texte}
                    </td>

                    {/* Article */}
                    <td className="py-4 pr-6 text-foreground/80 max-w-xs truncate">
                      {comment.article?.titre || "Article inconnu"}
                    </td>

                    {/* IP */}
                    <td className="py-4 pr-6 font-mono text-xs text-muted-foreground">
                      {comment.ip}
                    </td>

                    {/* Date */}
                    <td className="py-4 pr-6 font-mono text-xs text-muted-foreground">
                      {comment.date_creation
                        ? new Date(
                            comment.date_creation,
                          ).toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Date inconnue"}
                    </td>

                    {/* Action */}
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(comment.id)}
                        className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-accent cursor-pointer transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}

