import { getArticles } from '../../lib/api'
import type { Article } from '../../lib/types'

export default async function Home() {
  const articles = await getArticles()

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Articles récents</h2>
      {articles.length === 0 ? (
        <p>Aucun article pour l’instant.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article: Article) => (
            <li key={article.id} className="border rounded-lg p-4 shadow">
              <img
                src={article.image}
                alt={article.titre}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold">{article.titre}</h3>
              <p className="text-sm text-gray-600">{article.categorie?.nom}</p>
              <p className="text-gray-700 mt-2 line-clamp-3">{article.contenu}</p>
              <a
                href={`/articles/${article.slug}`}
                className="mt-4 inline-block text-blue-600 hover:underline text-sm"
              >
                Lire la suite →
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
