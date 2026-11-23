"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Undefined on the server and on the first client render alike, so the
  // markup matches and no mounted flag is needed to avoid a mismatch.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative grid size-10 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-ochre hover:text-ochre-ink"
    >
      <Sun
        className={`absolute size-4.5 transition-all duration-400 ${
          isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute size-4.5 transition-all duration-400 ${
          isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      />
    </button>
  );
}
