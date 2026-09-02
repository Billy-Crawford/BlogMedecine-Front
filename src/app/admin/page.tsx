// src/app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import axios from "../../../lib/axios";

type DashboardStats = {
  articles_publies: number;
  commentaires: number;
  categories: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    articles_publies: 0,
    commentaires: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("admin/dashboard/stats/");
        setStats(response.data);
      } catch (error) {
        console.error("Erreur récupération statistiques :", error);
        setError("Impossible de récupérer les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Articles publiés",
      value: stats.articles_publies,
      accent: "bg-primary",
    },
    {
      label: "Commentaires",
      value: stats.commentaires,
      accent: "bg-accent",
    },
    {
      label: "Catégories",
      value: stats.categories,
      accent: "bg-gold",
    },
  ];

  return (
    <AdminProtectedRoute>
      <div className="space-y-12">
        {/* En-tête */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Espace de gestion
          </p>

          <h1 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Tableau de bord
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            Vue d&apos;ensemble de votre blog et indicateurs clés.
          </p>
        </div>

        {/* Chargement */}
        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div
              className="
                w-5
                h-5
                border-2
                border-primary
                border-t-transparent
                rounded-full
                animate-spin
              "
            />

            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Chargement des statistiques...
            </p>
          </div>
        ) : error ? (
          /* Erreur */
          <div className="border-l-2 border-accent bg-card py-4 pl-5 pr-4">
            <p className="text-accent text-sm">{error}</p>
          </div>
        ) : (
          /* Cards statistiques */
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-border border-t border-b border-border">
            {cards.map((card, index) => (
              <div
                key={card.label}
                className={`
                  p-8
                  sm:p-10
                  ${index > 0 ? "border-t sm:border-t-0 border-border" : ""}
                `}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${card.accent}`} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {card.label}
                  </span>
                </div>

                <p className="font-display text-5xl sm:text-6xl text-foreground leading-none">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminProtectedRoute>
  );
}

