"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyThemeToHtml(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function getInitialTheme(): Theme {
  // SSR safe
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem("pepperone_theme");
  if (stored === "light" || stored === "dark") return stored;

  // Sempre padrão light
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyThemeToHtml(theme);
    window.localStorage.setItem("pepperone_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Mantém coerência quando usuário muda o tema do sistema e não escolheu manualmente
    const stored = window.localStorage.getItem("pepperone_theme");
    if (stored === "light" || stored === "dark") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setThemeState(mq.matches ? "dark" : "light");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      setTheme: (t) => setThemeState(t),
      toggleTheme: () => setThemeState((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}