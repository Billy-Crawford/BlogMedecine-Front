// lib/types.ts

export interface Article {
    id: number
    titre: string
    slug: string
    contenu: string
    image: string
    categorie: {
      id: number
      nom: string
    } | null
    created_at: string
  }
  