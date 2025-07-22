// lib/types.ts

export interface Article {
    [x: string]: string | number | Date
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
  