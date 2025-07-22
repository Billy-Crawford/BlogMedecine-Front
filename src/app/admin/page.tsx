// src/app/admin/page.tsx

import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6 text-center">
            <p className="text-sm text-gray-500">Articles publiés</p>
            <p className="text-2xl font-bold text-blue-600">15</p>
          </div>
          <div className="bg-white shadow rounded p-6 text-center">
            <p className="text-sm text-gray-500">Commentaires</p>
            <p className="text-2xl font-bold text-green-600">134</p>
          </div>
          <div className="bg-white shadow rounded p-6 text-center">
            <p className="text-sm text-gray-500">Catégories</p>
            <p className="text-2xl font-bold text-purple-600">4</p>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
