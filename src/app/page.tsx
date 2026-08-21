/* eslint-disable react/no-unescaped-entities */
import { getArticles } from "../../lib/api";
import type { Article } from "../../lib/types";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Section d'accueil */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 mb-12 shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          Bienvenue sur BARADINE's Medical Blog
        </h1>

        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="text-xl leading-relaxed mb-4">
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
            croyons fermement que chaqueindividu devrait avoir accès à une
            information claire pour prendre des décisions éclairées concernant
            sa santé.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Notre approche
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0"
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
              <span>
                Tous nos articles sont relus par au moins deux professionnels de
                santé
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0"
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
              <span>
                Nous citons systématiquement nos sources (études,
                recommandations officielles)
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0"
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
              <span>
                Nous actualisons régulièrement nos contenus pour refléter
                l&apos;état actuel des connaissances
              </span>
            </li>
          </ul>

          {/* <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Comment naviguer sur le site
          </h2>

          <p>
            Explorez nos articles par catégories ou utilisez notre moteur de
            recherche pour trouver des informations sur un sujet spécifique. Nos
            contenus sont classés par niveau de complexité (débutant,
            intermédiaire, avancé) pour s'adapter à vos connaissances.
          </p> */}

          <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200 mt-6">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
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
              <div>
                <p className="font-medium text-gray-900">Important :</p>
                <p className="text-gray-700">
                  Les informations fournies sur ce site ne remplacent pas une
                  consultation médicale. Consultez toujours un professionnel de
                  santé pour toute question concernant votre santé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des articles */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          Articles récents
        </h2>

        {articles.length === 0 ? (
          <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-8 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 mx-auto text-teal-400 mb-4"
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
            <p className="text-gray-700 text-lg">
              Aucun article pour l&apos;instant.
            </p>
            <p className="text-gray-500 mt-2">
              Revenez bientôt pour découvrir nos nouveaux contenus.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: Article) => (
              <li
                key={article.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-gray-50/30 to-white hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="w-full h-52 object-cover"
                  />
                  {article.categorie?.nom && (
                    <span className="absolute top-4 right-4 bg-teal-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                      {article.categorie.nom}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
                    {article.titre}
                  </h3>
                  <p className="text-gray-700 mb-5 line-clamp-3">
                    {article.contenu}
                  </p>
                  <a
                    href={`/articles/${article.slug}`}
                    className="mt-2 inline-flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors group"
                  >
                    Lire la suite
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                  </a>
                  <div className="mt-6 pt-5 border-t border-gray-200/50 flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5 text-gray-500"
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
                      ? new Date(article.date_publication).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )
                      : "Date non disponible"}
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
