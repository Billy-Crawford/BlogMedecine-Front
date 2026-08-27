import "./globals.css";
import type { Metadata } from "next";
import { Newsreader, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "RoBomed — Journal de médecine",
  description: "Blog médical RoBomed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            {/* ================= NAVBAR ================= */}

            <header className="bg-background transition-colors duration-300">
              {/* Bandeau supérieur — repère mono, discret */}
              <div className="border-b border-border">
                <div className="container mx-auto px-4 sm:px-6">
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground py-2">
                    Journal de médecine générale &amp; grand public
                  </p>
                </div>
              </div>

              <nav
                className="
                  container mx-auto px-4 sm:px-6 py-6
                  flex flex-col gap-4
                  sm:flex-row sm:items-center sm:justify-between
                "
              >
                <Link href="/" className="group inline-flex items-baseline gap-2 w-fit">
                  <span className="font-display italic text-[28px] sm:text-[32px] leading-none text-foreground group-hover:text-primary transition-colors">
                    Robomed
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hidden sm:inline">
                    depuis 2024
                  </span>
                </Link>

                <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
                  <li>
                    <Link
                      href="/"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      Accueil
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      Catégories
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </li>

                  <li className="ml-1">
                    <ThemeToggle />
                  </li>
                </ul>
              </nav>

              {/* Trait "signe vital" — signature de la marque */}
              <div className="border-b border-border">
                <svg
                  viewBox="0 0 1200 24"
                  preserveAspectRatio="none"
                  className="w-full h-4 text-primary/70"
                  aria-hidden="true"
                >
                  <polyline
                    points="0,12 260,12 290,12 305,3 320,21 335,12 360,12 1200,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </header>

            {/* ================= CONTENU ================= */}

            <main className="flex-grow container mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
              {children}
            </main>

            {/* ================= FOOTER ================= */}

            <footer className="bg-card border-t border-border transition-colors duration-300">
              <div className="container mx-auto px-4 sm:px-6 py-10">
                <svg
                  viewBox="0 0 1200 24"
                  preserveAspectRatio="none"
                  className="w-full h-3 text-accent/50 mb-6"
                  aria-hidden="true"
                >
                  <polyline
                    points="0,12 540,12 560,12 575,4 590,20 605,12 620,12 1200,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="font-display italic text-lg text-foreground/90">
                    Robomed
                  </span>
                  <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
                    © {new Date().getFullYear()} RoBomed Blog — Tous droits réservés
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
