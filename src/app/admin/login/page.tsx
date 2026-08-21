/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
        username: email,
        password: password,
      })

      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
      router.push('/admin')
    } catch (err) {
      setError('Identifiants invalides')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4">Connexion Admin</h1>

        <input
          type="text"
          placeholder="Nom d’utilisateur"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
