"use client";

import { Globe2, ChevronDown } from "lucide-react";
import { useLocale } from "../context/locale-context";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative">
      <Globe2
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700 dark:text-zinc-300"
      />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as "pt-BR" | "en-US")}
        className={[
          "appearance-none",
          "h-11",
          "rounded-full",
          "pl-9 pr-9",
          "text-sm font-semibold",
          "border border-black/10 bg-white/70 shadow-sm backdrop-blur-md",
          "text-zinc-900",
          "hover:bg-white/80",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#accb04]/60 focus-visible:ring-offset-2",
          "dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#0b0b0b]",
        ].join(" ")}
        aria-label="Selecionar idioma"
      >
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en-US">🇺🇸 English</option>
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700 dark:text-zinc-400"
      />
    </div>
  );
}