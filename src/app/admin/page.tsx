// src/app/admin/page.tsx

'use client'

import { useEffect, useState } from 'react'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import axios from '../../../lib/axios'

type DashboardStats = {
  articles_publies: number
  commentaires: number
  categories: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    articles_publies: 0,
    commentaires: 0,
    categories: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('admin/dashboard/stats/')
        setStats(response.data)
      } catch (error) {
        console.error('Erreur récupération statistiques :', error)
        setError('Impossible de récupérer les statistiques.')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminProtectedRoute>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Tableau de bord
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            Vue d&apos;ensemble de votre blog et indicateurs clés.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm font-medium">Chargement des statistiques...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium p-4 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Articles */}
            <div className="bg-[#FAFAFC] border border-zinc-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Articles publiés
                </span>
                <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-2xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                {stats.articles_publies}
              </p>
            </div>

            {/* Commentaires */}
            <div className="bg-[#FAFAFC] border border-zinc-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Commentaires
                </span>
                <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-2xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                {stats.commentaires}
              </p>
            </div>

            {/* Catégories */}
            <div className="bg-[#FAFAFC] border border-zinc-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Catégories
                </span>
                <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-2xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                {stats.categories}
              </p>
            </div>

          </div>
        )}
      </div>
    </AdminProtectedRoute>
  )
}

