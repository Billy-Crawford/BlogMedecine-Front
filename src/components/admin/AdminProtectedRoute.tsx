// src/components/admin/AdminProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'

interface AdminProtectedRouteProps {
  children: ReactNode
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) {
      router.replace('/admin/login')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Chargement...
        </p>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminProtectedRoute

