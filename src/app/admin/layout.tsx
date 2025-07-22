// src/app/admin/layout.tsx

import Link from "next/link";
import '@/app/globals.css';

export default function AdminLayout({ children } : { children: React.ReactNode}) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 space-y-6">
                <h2 className="text-xl font-bold text-blue-700">Admin Panel</h2>
                <nav className="flex flex-col space-y-2">
                    <Link href="/admin" className="hover:text-blue-600">Dashboard</Link>
                    <Link href="/admin/articles" className="hover:text-blue-600">Articles</Link>
                    <Link href="/admin/categories" className="hover:text-blue-600">Categories</Link>
                    <Link href="/admin/commentaires" className="hover:text-blue-600">Commentaires</Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    )
}