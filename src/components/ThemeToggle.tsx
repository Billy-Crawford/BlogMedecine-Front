"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        px-3
        py-2
        rounded-lg
        border
        border-zinc-200
        dark:border-zinc-700
        bg-white
        dark:bg-zinc-900
        text-zinc-900
        dark:text-white
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
        transition
      "
    >
      {theme === "dark" ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}
