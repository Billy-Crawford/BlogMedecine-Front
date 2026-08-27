// src/app/page.tsx

/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { getArticles } from "../../lib/api";
import type { Article } from "../../lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* =====================================================
          SECTION D'ACCUEIL — masthead éditorial
      ====================================================== */}

      <section className="pt-2 pb-14 sm:pb-20 border-b border-border">
        {/* Eyebrow */}

        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="w-2 h-2 rounded-full bg-gold" />
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Revue Médicale Indépendante
          </span>
        </div>

        {/* Titre */}

        <h1 className="font-display italic text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground max-w-3xl mb-8">
          Bienvenue sur BARADINE&apos;s Medical Blog
        </h1>

        <div className="max-w-3xl">
          <p className="text-xl sm:text-2xl text-foreground font-medium leading-snug mb-6">
            Votre source d&apos;informations médicales fiables et
            accessibles, rédigée par des professionnels de santé.
          </p>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-5 first-letter:font-display first-letter:not-italic first-letter:text-6xl sm:first-letter:text-7xl first-letter:text-primary first-letter:float-left first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1">
            Dans un monde où l&apos;information santé est omniprésente mais
            souvent contradictoire, notre mission est de vous fournir des
            contenus vérifiés, basés sur les dernières études scientifiques
            et recommandations médicales.
          </p>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Fondé en 2025 par une équipe de de jeunes passiones, acteurs du
            changement et l&apos;evolution, BARADINE&apos;s Medical Blog se
            veut etre comme une référence dans la vulgarisation médicale de
            qualité. Nous croyons fermement que chaque individu devrait
            avoir accès à une information claire pour prendre des décisions
            éclairées concernant sa santé.
          </p>

          {/* Notre approche */}

          <div className="pt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Notre approche
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-border">
              <li className="flex gap-3 sm:pr-6">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground/80 leading-snug">
                  Tous nos articles sont relus par au moins deux
                  professionnels de santé
                </span>
              </li>

              <li className="flex gap-3 pt-5 sm:pt-0 sm:px-6">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground/80 leading-snug">
                  Nous citons systématiquement nos sources (études,
                  recommandations officielles)
                </span>
              </li>

              <li className="flex gap-3 pt-5 sm:pt-0 sm:pl-6">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground/80 leading-snug">
                  Nous actualisons régulièrement nos contenus pour refléter
                  l&apos;état actuel des connaissances
                </span>
              </li>
            </ul>
          </div>

          {/* Avertissement */}

          <div className="mt-10 bg-card border-l-2 border-accent py-5 pl-6 pr-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-2">
              Avertissement important
            </p>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Les informations fournies sur ce site ne remplacent pas une
              consultation médicale. Consultez toujours un professionnel de
              santé pour toute question concernant votre santé.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION ARTICLES
      ====================================================== */}

      <section className="py-14 sm:py-20">
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Édition courante
          </p>
          <h2 className="font-display italic text-3xl sm:text-4xl text-foreground">
            Articles récents
          </h2>
        </div>

        {/* Aucun article */}

        {articles.length === 0 ? (
          <div className="border border-border py-16 text-center">
            <p className="font-display italic text-xl text-foreground mb-2">
              Aucun article pour l&apos;instant.
            </p>

            <p className="text-muted-foreground text-sm">
              Revenez bientôt pour découvrir nos nouveaux contenus.
            </p>
          </div>
        ) : (
          <div>
            {/* ------- Article à la une ------- */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pb-12 mb-12 border-b border-border">
              <div className="bg-muted aspect-[4/3] sm:aspect-[16/12] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.titre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  À la une
                  {featured.categorie?.nom ? ` · ${featured.categorie.nom}` : ""}
                </p>

                <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-tight mb-4">
                  {featured.titre}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                  {featured.contenu}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Link
                    href={`/articles/${featured.slug}`}
                    className="inline-flex items-center text-xs font-mono uppercase tracking-[0.14em] text-primary hover:underline underline-offset-4"
                  >
                    Lire la suite
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 ml-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>

                  <span className="font-mono text-xs text-muted-foreground">
                    {featured.date_publication
                      ? new Date(featured.date_publication).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : "Date non disponible"}
                  </span>
                </div>
              </div>
            </div>

            {/* ------- Liste des autres articles ------- */}

            {rest.length > 0 && (
              <ul className="divide-y divide-border">
                {rest.map((article: Article) => (
                  <li
                    key={article.id}
                    className="group flex flex-col sm:flex-row gap-5 sm:gap-8 py-8"
                  >
                    <div className="bg-muted w-full sm:w-48 flex-shrink-0 aspect-[4/3] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      {article.categorie?.nom && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-2">
                          {article.categorie.nom}
                        </span>
                      )}

                      <h3 className="font-display text-xl text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                        {article.titre}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {article.contenu}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="inline-flex items-center text-xs font-mono uppercase tracking-[0.14em] text-primary hover:underline underline-offset-4"
                        >
                          Lire la suite
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>

                        <span className="font-mono text-xs text-muted-foreground">
                          {article.date_publication
                            ? new Date(
                                article.date_publication,
                              ).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Date non disponible"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

