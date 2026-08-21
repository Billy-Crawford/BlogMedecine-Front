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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Tableau de bord
          </h1>

          <p className="text-gray-500 mt-1">
            Vue d&apos;ensemble de votre blog.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">
            Chargement des statistiques...
          </p>
        ) : error ? (
          <p className="text-red-500">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Articles */}
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-sm text-gray-500">
                Articles publiés
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.articles_publies}
              </p>
            </div>

            {/* Commentaires */}
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-sm text-gray-500">
                Commentaires
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.commentaires}
              </p>
            </div>

            {/* Catégories */}
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-sm text-gray-500">
                Catégories
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.categories}
              </p>
            </div>

          </div>
        )}
      </div>
    </AdminProtectedRoute>
  )
}

