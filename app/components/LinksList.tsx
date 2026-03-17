"use client";

import React from "react";
import { Instagram, Linkedin, Globe, ChevronRight, Gift } from "lucide-react";
import { useLocale } from "../context/locale-context";
import { useTheme } from "../context/theme-context";

type LinkItem = {
  href: string;
  labelPt: string;
  labelEn: string;
  subtitlePt: string;
  subtitleEn: string;
  Icon: React.ElementType;
};

const items: LinkItem[] = [
  {
    href: "https://www.redd.com.br/",
    labelPt: "Site Oficial",
    labelEn: "Official Website",
    subtitlePt: "Conheça nossos produtos",
    subtitleEn: "Discover our products",
    Icon: Globe,
  },
  {
    href: "https://www.instagram.com/reddbrindes",
    labelPt: "Instagram",
    labelEn: "Instagram",
    subtitlePt: "Nos siga nas redes sociais",
    subtitleEn: "Follow us on social media",
    Icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/company/redd-brindes-promocionais",
    labelPt: "LinkedIn",
    labelEn: "LinkedIn",
    subtitlePt: "Conecte-se conosco",
    subtitleEn: "Connect with us",
    Icon: Linkedin,
  },
  {
    href: "https://www.redd.com.br/catalogo",
    labelPt: "Catálogo de Produtos",
    labelEn: "Product Catalog",
    subtitlePt: "Veja todos os nossos presentes",
    subtitleEn: "Browse all our gifts",
    Icon: Gift,
  },
];

export default function LinksList() {
  const { locale } = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="w-full">
      <ul className="flex flex-col gap-3 sm:gap-4">
        {items.map((item) => {
          const label = locale === "pt-BR" ? item.labelPt : item.labelEn;
          const subtitle = locale === "pt-BR" ? item.subtitlePt : item.subtitleEn;
          const Icon = item.Icon;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={[
                  "group relative flex items-center justify-between gap-4",
                  "rounded-full",
                  "border border-[#dc2626]/70",
                  "px-4 sm:px-5 py-3 sm:py-4",
                  "transition-all duration-300",
                  "hover:-translate-y-px",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                  isDark
                    ? "bg-zinc-800/90 backdrop-blur-md hover:bg-zinc-700/90 hover:shadow-[0_14px_44px_-18px_rgba(220,38,38,0.6)] focus-visible:ring-offset-zinc-800"
                    : "bg-white/85 backdrop-blur-md hover:bg-white hover:shadow-[0_14px_44px_-18px_rgba(220,38,38,0.45)] focus-visible:ring-offset-white",
                ].join(" ")}
              >
                {/* Gradiente vermelho suave */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(220,38,38,0.10),rgba(220,38,38,0.03))]" />

                {/* Shine no hover */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/35 opacity-0 blur-md transition-all duration-500 group-hover:opacity-70 group-hover:left-[110%]" />
                </span>

                <span className="relative flex items-center gap-3 min-w-0">
                  {/* Ícone: borda vermelha, fundo branco, ícone vermelho */}
                  <span
                    className={[
                      "grid place-items-center size-11 shrink-0 rounded-full border-2 border-[#dc2626] shadow-sm",
                      isDark ? "bg-zinc-700" : "bg-white",
                    ].join(" ")}
                  >
                    <Icon className="text-[#dc2626]" size={20} />
                  </span>

                  <span className="min-w-0">
                    <span
                      className={[
                        "block truncate text-[15px] sm:text-[16px] font-extrabold tracking-tight",
                        isDark ? "text-white" : "text-zinc-950",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                    <span
                      className={[
                        "block truncate text-xs sm:text-sm",
                        isDark ? "text-zinc-400" : "text-zinc-600",
                      ].join(" ")}
                    >
                      {subtitle}
                    </span>
                  </span>
                </span>

                <span className="relative flex shrink-0 items-center gap-2">
                  <span
                    className={[
                      "hidden sm:inline text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity",
                      isDark ? "text-zinc-300" : "text-[#dc2626]",
                    ].join(" ")}
                  >
                    {locale === "pt-BR" ? "Acessar" : "Open"}
                  </span>
                  <ChevronRight
                    size={18}
                    className={[
                      "transition-transform duration-300 group-hover:translate-x-1",
                      isDark ? "text-zinc-300" : "text-[#dc2626]",
                    ].join(" ")}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 text-center">
        <p
          className={[
            "text-[11px] sm:text-xs",
            isDark ? "text-zinc-400" : "text-zinc-600",
          ].join(" ")}
        >
          {locale === "pt-BR"
            ? "Experiência personalizada • Presentes que marcam • Atendimento B2B"
            : "Personalized experience • Gifts that make an impression • B2B service"}
        </p>
      </div>
    </nav>
  );
}