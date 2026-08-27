// src/app/admin/layout.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

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

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        md:flex-row
        bg-[#FAFAFC]
        dark:bg-zinc-950
        text-zinc-900
        dark:text-zinc-100
        selection:bg-zinc-900
        selection:text-white
        dark:selection:bg-zinc-100
        dark:selection:text-zinc-900
        transition-colors
        duration-300
      "
    >
      {/* Sidebar */}
      <aside
        className="
          w-full
          md:w-72
          bg-white
          dark:bg-zinc-900
          border-b
          md:border-b-0
          md:border-r
          border-zinc-200/80
          dark:border-zinc-800
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
        <div className="space-y-8">
          {/* Logo / titre */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-zinc-900
                dark:bg-zinc-100
                text-white
                dark:text-zinc-900
                flex
                items-center
                justify-center
                font-bold
                text-sm
                shadow-2xs
                transition-colors
              "
            >
              A
            </div>

            <span
              className="
                font-extrabold
                text-zinc-900
                dark:text-zinc-100
                tracking-tight
                text-lg
                transition-colors
              "
            >
              Admin Panel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-1.5">
            <Link
              href="/admin"
              className="
                flex
                items-center
                gap-3
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                text-zinc-600
                dark:text-zinc-400
                hover:text-zinc-900
                dark:hover:text-zinc-100
                hover:bg-zinc-100/80
                dark:hover:bg-zinc-800
                transition-all
              "
            >
              Dashboard
            </Link>

            <Link
              href="/admin/articles"
              className="
                flex
                items-center
                gap-3
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                text-zinc-600
                dark:text-zinc-400
                hover:text-zinc-900
                dark:hover:text-zinc-100
                hover:bg-zinc-100/80
                dark:hover:bg-zinc-800
                transition-all
              "
            >
              Articles
            </Link>

            <Link
              href="/admin/categories"
              className="
                flex
                items-center
                gap-3
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                text-zinc-600
                dark:text-zinc-400
                hover:text-zinc-900
                dark:hover:text-zinc-100
                hover:bg-zinc-100/80
                dark:hover:bg-zinc-800
                transition-all
              "
            >
              Categories
            </Link>

            <Link
              href="/admin/commentaires"
              className="
                flex
                items-center
                gap-3
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                text-zinc-600
                dark:text-zinc-400
                hover:text-zinc-900
                dark:hover:text-zinc-100
                hover:bg-zinc-100/80
                dark:hover:bg-zinc-800
                transition-all
              "
            >
              Commentaires
            </Link>
          </nav>
        </div>

        {/* Retour vers le site public */}
        <div
          className="
            hidden
            md:block
            pt-6
            border-t
            border-zinc-100
            dark:border-zinc-800
          "
        >
          <Link
            href="/"
            className="
              text-xs
              font-medium
              text-zinc-400
              dark:text-zinc-500
              hover:text-zinc-900
              dark:hover:text-zinc-100
              transition-colors
              flex
              items-center
              gap-2
            "
          >
            ← Voir le site public
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="
          flex-1
          p-6
          sm:p-10
          md:p-12
          overflow-y-auto
          transition-colors
          duration-300
        "
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
