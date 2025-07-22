'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface RequireAuthProps {
  children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) {
      router.replace('/admin/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <p className="text-center mt-10">Chargement...</p>

  return <>{children}</>
}
