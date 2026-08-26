"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
      "
    >
      {isDark ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}
