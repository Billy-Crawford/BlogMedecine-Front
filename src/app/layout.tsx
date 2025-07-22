// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Un blog moderne avec Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          {/* Navbar */}
          <header className="p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">MedicalBlog</h1>
              <ul className="flex gap-4 text-sm">
                <li>
                  <Link href="/">Accueil</Link>
                </li>
                <li>
                  <Link href="/categories">Catégories</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </header>

          {/* Contenu principal */}
          <main className="flex-grow container mx-auto py-10 px-4">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Mon Blog — Tous droits réservés
          </footer>
        </div>
      </body>
    </html>
  );
}

