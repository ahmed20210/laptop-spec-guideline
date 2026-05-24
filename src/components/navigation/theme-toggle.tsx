"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = resolveInitialTheme();
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-cyan-200/20 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100"
        aria-label="Theme toggle loading"
      >
        Theme | النمط
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="rounded-full border border-cyan-200/30 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-white/20"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "Dark | داكن" : "Light | فاتح"}
    </button>
  );
}
