// src/app/admin/layout.tsx

'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import '@/app/globals.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // La page de connexion ne doit pas afficher le panneau admin
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFC] text-zinc-900 selection:bg-zinc-900 selection:text-white">

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-zinc-200/80 p-6 md:p-8 flex flex-col justify-between shrink-0">

        <div className="space-y-8">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              A
            </div>

            <span className="font-extrabold text-zinc-900 tracking-tight text-lg">
              Admin Panel
            </span>
          </div>

          <nav className="flex flex-col space-y-1.5">

            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/articles"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
            >
              Articles
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
            >
              Categories
            </Link>

            <Link
              href="/admin/commentaires"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
            >
              Commentaires
            </Link>

          </nav>
        </div>

        <div className="hidden md:block pt-6 border-t border-zinc-100">
          <a
            href="/"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2"
          >
            ← Voir le site public
          </a>
        </div>

      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  )
}

