// src/app/admin/layout.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/categories", label: "Catégories" },
  { href: "/admin/commentaires", label: "Commentaires" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // La page de connexion ne doit pas afficher le panneau admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        md:flex-row
        bg-background
        text-foreground
        selection:bg-primary
        selection:text-primary-foreground
        transition-colors
        duration-300
      "
    >
      {/* Sidebar */}
      <aside
        className="
          w-full
          md:w-64
          bg-card
          border-b
          md:border-b-0
          md:border-r
          border-border
          p-6
          md:p-8
          flex
          flex-col
          justify-between
          shrink-0
          transition-colors
          duration-300
        "
      >
        <div className="space-y-10">
          {/* Logo / titre */}
          <div>
            <span className="font-display italic text-2xl text-foreground">
              Robomed
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
              Espace de gestion
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-3
                    text-sm
                    border-l-2
                    transition-colors
                    ${
                      active
                        ? "border-primary bg-muted text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Retour vers le site public */}
        <div className="hidden md:block pt-8 mt-8 border-t border-border">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            &larr; Voir le site public
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10 lg:p-14 overflow-y-auto transition-colors duration-300">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

