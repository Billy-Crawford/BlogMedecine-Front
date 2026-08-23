// src/app/admin/layout.tsx

import Link from "next/link";
import '@/app/globals.css';

export default function AdminLayout({ children } : { children: React.ReactNode}) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFC] text-zinc-900 selection:bg-zinc-900 selection:text-white">
            {/* sidebar */}
            <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-zinc-200/80 p-6 md:p-8 flex flex-col justify-between shrink-0">
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                            A
                        </div>
                        <span className="font-extrabold text-zinc-900 tracking-tight text-lg">Admin Panel</span>
                    </div>

                    <nav className="flex flex-col space-y-1.5">
                        <Link 
                            href="/admin" 
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link 
                            href="/admin/articles" 
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Articles
                        </Link>
                        <Link 
                            href="/admin/categories" 
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Categories
                        </Link>
                        <Link 
                            href="/admin/commentaires" 
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Commentaires
                        </Link>
                    </nav>
                </div>

                <div className="hidden md:block pt-6 border-t border-zinc-100">
                    <a href="/" className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2">
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

