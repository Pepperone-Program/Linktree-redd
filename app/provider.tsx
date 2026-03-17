"use client";

import { ThemeProvider } from "./context/theme-context";
import { LocaleProvider } from "./context/locale-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}