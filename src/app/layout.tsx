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
            {/* ================= NAVBAR ================= */}

            <header
              className="
                p-4
                border-b
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-zinc-950
                transition-colors
                duration-300
              "
            >
              <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  MedicalBlog
                </h1>

                <div className="flex items-center gap-5">
                  <ul className="flex gap-4 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Accueil
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/categories"
                        className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Catégories
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>

                  <ThemeToggle />
                </div>
              </nav>
            </header>

            {/* ================= CONTENU ================= */}

            <main className="flex-grow container mx-auto py-10 px-4">
              {children}
            </main>

            {/* ================= FOOTER ================= */}

            <footer
              className="
                bg-zinc-100
                dark:bg-zinc-900
                border-t
                border-zinc-200
                dark:border-zinc-800
                py-6
                text-center
                text-sm
                text-zinc-600
                dark:text-zinc-400
                transition-colors
                duration-300
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
