"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Évite les problèmes d'hydratation avec next-themes
  if (!mounted) {
    return (
      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-2
          px-3
          py-2
          rounded-lg
          border
          border-zinc-200
          bg-white
          text-zinc-900
          text-sm
          font-medium
          opacity-70
        "
        aria-label="Changer de thème"
      >
        🌙 Sombre
      </button>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      className="
        inline-flex
        items-center
        gap-2
        px-3
        py-2
        rounded-lg
        border
        border-zinc-200
        dark:border-zinc-700
        bg-white
        dark:bg-zinc-900
        text-zinc-900
        dark:text-zinc-100
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
        transition-colors
        duration-200
        text-sm
        font-medium
        cursor-pointer
      "
    >
      {isDark ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}

