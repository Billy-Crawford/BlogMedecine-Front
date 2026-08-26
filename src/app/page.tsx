// src/app/page.tsx

/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { getArticles } from "../../lib/api";
import type { Article } from "../../lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* =====================================================
          SECTION D'ACCUEIL
      ====================================================== */}

      <div
        className="
          bg-[#FAFAFC]
          dark:bg-zinc-900
          border
          border-zinc-200/80
          dark:border-zinc-800
          rounded-2xl
          p-8
          sm:p-12
          mb-16
          shadow-xs
          transition-colors
          duration-300
        "
      >
        {/* En-tête */}

        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-zinc-900
              dark:bg-zinc-100
              text-white
              dark:text-zinc-900
              flex
              items-center
              justify-center
              shadow-sm
              transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>

          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500 dark:text-zinc-400">
            Revue Médicale Indépendante
          </span>
        </div>

        {/* Titre */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-zinc-900
            dark:text-zinc-100
            mb-6
            tracking-tight
          "
        >
          Bienvenue sur BARADINE's Medical Blog
        </h1>

        <div
          className="
            max-w-none
            text-zinc-600
            dark:text-zinc-300
            leading-relaxed
            space-y-5
            text-base
            sm:text-lg
          "
        >
          <p className="text-xl text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
            Votre source d'informations médicales fiables et accessibles,
            rédigée par des professionnels de santé.
          </p>

          <p>
            Dans un monde où l'information santé est omniprésente mais souvent
            contradictoire, notre mission est de vous fournir des contenus
            vérifiés, basés sur les dernières études scientifiques et
            recommandations médicales.
          </p>

          <p>
            Fondé en 2025 par une équipe de de jeunes passiones, acteurs du
            changement et l'evolution, BARADINE's Medical Blog se veut etre
            comme une référence dans la vulgarisation médicale de qualité. Nous
            croyons fermement que chaque individu devrait avoir accès à une
            information claire pour prendre des décisions éclairées concernant
            sa santé.
          </p>

          {/* Notre approche */}

          <div className="pt-4">
            <h2
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-zinc-900
                dark:text-zinc-100
                mb-6
                tracking-tight
              "
            >
              Notre approche
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Carte 1 */}

              <li
                className="
                  bg-white
                  dark:bg-zinc-800
                  p-5
                  rounded-xl
                  border
                  border-zinc-200/70
                  dark:border-zinc-700
                  shadow-2xs
                  flex
                  flex-col
                  justify-between
                  transition-colors
                  duration-300
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-zinc-100
                    dark:bg-zinc-700
                    text-zinc-900
                    dark:text-zinc-100
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  Tous nos articles sont relus par au moins deux professionnels
                  de santé
                </span>
              </li>

              {/* Carte 2 */}

              <li
                className="
                  bg-white
                  dark:bg-zinc-800
                  p-5
                  rounded-xl
                  border
                  border-zinc-200/70
                  dark:border-zinc-700
                  shadow-2xs
                  flex
                  flex-col
                  justify-between
                  transition-colors
                  duration-300
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-zinc-100
                    dark:bg-zinc-700
                    text-zinc-900
                    dark:text-zinc-100
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  Nous citons systématiquement nos sources (études,
                  recommandations officielles)
                </span>
              </li>

              {/* Carte 3 */}

              <li
                className="
                  bg-white
                  dark:bg-zinc-800
                  p-5
                  rounded-xl
                  border
                  border-zinc-200/70
                  dark:border-zinc-700
                  shadow-2xs
                  flex
                  flex-col
                  justify-between
                  transition-colors
                  duration-300
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-zinc-100
                    dark:bg-zinc-700
                    text-zinc-900
                    dark:text-zinc-100
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  Nous actualisons régulièrement nos contenus pour refléter
                  l&apos;état actuel des connaissances
                </span>
              </li>
            </ul>
          </div>

          {/* Avertissement */}

          <div
            className="
              bg-white
              dark:bg-zinc-800
              p-6
              rounded-xl
              border-l-4
              border-zinc-900
              dark:border-zinc-100
              border-y
              border-r
              border-zinc-200/70
              dark:border-zinc-700
              shadow-2xs
              mt-8
              transition-colors
            "
          >
            <div className="flex items-start gap-4">
              <div className="text-zinc-900 dark:text-zinc-100 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider mb-1">
                  Avertissement important
                </p>

                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                  Les informations fournies sur ce site ne remplacent pas une
                  consultation médicale. Consultez toujours un professionnel de
                  santé pour toute question concernant votre santé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SECTION ARTICLES
      ====================================================== */}

      <section>
        <div
          className="
            flex
            items-center
            justify-between
            mb-8
            pb-4
            border-b
            border-zinc-200
            dark:border-zinc-800
          "
        >
          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-zinc-900
              dark:text-zinc-100
              tracking-tight
              flex
              items-center
              gap-3
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-zinc-800 dark:text-zinc-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>

            Articles récents
          </h2>
        </div>

        {/* Aucun article */}

        {articles.length === 0 ? (
          <div
            className="
              bg-[#FAFAFC]
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              rounded-2xl
              p-12
              text-center
              transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-zinc-400 dark:text-zinc-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-lg">
              Aucun article pour l&apos;instant.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Revenez bientôt pour découvrir nos nouveaux contenus.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: Article) => (
              <li
                key={article.id}
                className="
                  group
                  bg-white
                  dark:bg-zinc-900
                  border
                  border-zinc-200/80
                  dark:border-zinc-800
                  rounded-2xl
                  overflow-hidden
                  shadow-xs
                  hover:shadow-xl
                  dark:hover:shadow-black/30
                  transition-all
                  duration-300
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  {/* Image */}

                  <div
                    className="
                      relative
                      overflow-hidden
                      bg-zinc-100
                      dark:bg-zinc-800
                      aspect-[16/10]
                    "
                  >
                    <img
                      src={article.image}
                      alt={article.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {article.categorie?.nom && (
                      <span
                        className="
                          absolute
                          top-3
                          right-3
                          bg-zinc-900/90
                          dark:bg-zinc-100/90
                          backdrop-blur-md
                          text-white
                          dark:text-zinc-900
                          text-[11px]
                          uppercase
                          tracking-wider
                          px-3
                          py-1
                          rounded-full
                          font-medium
                          shadow-sm
                        "
                      >
                        {article.categorie.nom}
                      </span>
                    )}
                  </div>

                  {/* Contenu */}

                  <div className="p-6">
                    <h3
                      className="
                        text-lg
                        font-bold
                        text-zinc-900
                        dark:text-zinc-100
                        mb-2.5
                        group-hover:text-zinc-600
                        dark:group-hover:text-zinc-300
                        transition-colors
                        leading-snug
                      "
                    >
                      {article.titre}
                    </h3>

                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.contenu}
                    </p>
                  </div>
                </div>

                {/* Footer de la card */}

                <div className="px-6 pb-6 pt-0 mt-auto">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      pt-4
                      border-t
                      border-zinc-100
                      dark:border-zinc-800
                    "
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="
                        inline-flex
                        items-center
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-zinc-900
                        dark:text-zinc-100
                        group-hover:underline
                      "
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

                    <div className="flex items-center text-xs text-zinc-400 dark:text-zinc-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>

                      {article.date_publication
                        ? new Date(
                            article.date_publication,
                          ).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date non disponible"}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

