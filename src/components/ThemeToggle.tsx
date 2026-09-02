"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-2
          font-mono
          text-[11px]
          uppercase
          tracking-[0.14em]
          text-muted-foreground
        "
        aria-label="Changer de thème"
      >
        Sombre
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Activer le thème clair" : "Activer le thème sombre"
      }
      className="
        group
        inline-flex
        items-center
        gap-2.5
        font-mono
        text-[11px]
        uppercase
        tracking-[0.14em]
        text-foreground/70
        hover:text-primary
        transition-colors
        duration-200
        cursor-pointer
      "
    >
      <span
        className="
          relative
          w-8
          h-4
          rounded-full
          border
          border-border
          bg-muted
          transition-colors
          duration-200
          group-hover:border-primary/50
        "
        aria-hidden="true"
      >
        <span
          className={`
            absolute
            top-[1px]
            left-[1px]
            w-3
            h-3
            rounded-full
            bg-primary
            transition-transform
            duration-200
            ${isDark ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </span>

      {isDark ? "Clair" : "Sombre"}
    </button>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// export default function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <button
//         type="button"
//         className="
//           inline-flex
//           items-center
//           gap-2
//           px-3
//           py-2
//           rounded-lg
//           border
//           border-zinc-200
//           bg-white
//           text-zinc-900
//           text-sm
//           font-medium
//         "
//         aria-label="Changer de thème"
//       >
//         🌙 Sombre
//       </button>
//     );
//   }

//   const isDark = resolvedTheme === "dark";

//   const toggleTheme = () => {
//     setTheme(isDark ? "light" : "dark");
//   };

//   return (
//     <button
//       type="button"
//       onClick={toggleTheme}
//       aria-label={
//         isDark ? "Activer le thème clair" : "Activer le thème sombre"
//       }
//       className="
//         inline-flex
//         items-center
//         gap-2
//         px-3
//         py-2
//         rounded-lg
//         border
//         border-zinc-200
//         dark:border-zinc-700
//         bg-white
//         dark:bg-zinc-900
//         text-zinc-900
//         dark:text-zinc-100
//         hover:bg-zinc-100
//         dark:hover:bg-zinc-800
//         transition-colors
//         duration-200
//         text-sm
//         font-medium
//         cursor-pointer
//       "
//     >
//       {isDark ? "☀️ Clair" : "🌙 Sombre"}
//     </button>
//   );
// }
