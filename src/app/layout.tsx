import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

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
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div
            className="
              min-h-screen
              flex
              flex-col
              bg-white
              text-zinc-900
              dark:bg-zinc-950
              dark:text-zinc-100
              transition-colors
              duration-300
            "
          >
            {/* Navbar */}
            <header className="p-4 shadow-md bg-white dark:bg-gray-900 transition-colors">
              <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">MedicalBlog</h1>

                <div className="flex items-center gap-5">
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

                  <ThemeToggle />
                </div>
              </nav>
            </header>

            {/* Contenu principal */}
            <main className="flex-grow container mx-auto py-10 px-4">
              {children}
            </main>

            {/* Footer */}
            <footer
              className="
                bg-gray-100
                dark:bg-zinc-900
                py-6
                text-center
                text-sm
                text-gray-600
                dark:text-zinc-400
                border-t
                border-zinc-200
                dark:border-zinc-800
              "
            >
              © {new Date().getFullYear()} RoBomed Blog — Tous droits réservés
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
