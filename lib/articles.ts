import { getArticles as fetchArticles } from './api'
import type { Article } from './types' // Optionnel si tu veux centraliser les types

export async function getArticles(): Promise<Article[]> {
  return await fetchArticles()
}
