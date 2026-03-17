"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "pt-BR" | "en-US";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleCtx | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt-BR";
  const stored = window.localStorage.getItem("redd_locale");
  if (stored === "pt-BR" || stored === "en-US") return stored;
  return "pt-BR";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem("redd_locale", locale);
  }, [locale]);

  const value = useMemo<LocaleCtx>(
    () => ({ locale, setLocale: (l) => setLocaleState(l) }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}