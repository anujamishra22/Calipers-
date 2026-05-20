"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);
  if (!mounted) {
    return (
      <button
        type="button"
        suppressHydrationWarning
        className="btn-brutal-outline border-[var(--color-void)] p-2 aspect-square"
        aria-label="Toggle theme"
      />
    );
  }
  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn-brutal-outline border-[var(--color-void)] p-2 aspect-square"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
