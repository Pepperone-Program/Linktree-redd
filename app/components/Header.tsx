"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Share2, X, Copy, Check, QrCode, Sun, Moon } from "lucide-react";
import { useLocale } from "../context/locale-context";
import { useTheme } from "../context/theme-context";

const LINKTREE_URL = "https://www.redd.com.br/";
const REDD = "#dc2626";

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = locale === "pt-BR" ? "REDD Presentes Corporativos" : "REDD Corporate Gifts";
  const subtitle =
    locale === "pt-BR"
      ? "Presentes corporativos personalizados com padrão premium."
      : "Premium corporate gifts, fully customizable.";

  const shareLabel = locale === "pt-BR" ? "Compartilhar" : "Share";
  const closeLabel = locale === "pt-BR" ? "Fechar" : "Close";

  const qrSrc = useMemo(() => {
    const encoded = encodeURIComponent(LINKTREE_URL);
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encoded}`;
  }, []);

  async function handleNativeShare() {
    const data = {
      title: "REDD Presentes Corporativos",
      text: locale === "pt-BR" ? "Acesse os links oficiais da REDD:" : "Access REDD official links:",
      url: LINKTREE_URL,
    };

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(data);
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(LINKTREE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      window.prompt(locale === "pt-BR" ? "Copie o link:" : "Copy the link:", LINKTREE_URL);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(LINKTREE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      window.prompt(locale === "pt-BR" ? "Copie o link:" : "Copy the link:", LINKTREE_URL);
    }
  }

  const btnBase = isDark
    ? "bg-zinc-700 border-white/10 text-white hover:bg-zinc-600 shadow-sm"
    : "bg-white border-black/10 text-zinc-900 shadow-sm hover:bg-zinc-50";

  const selectBase = isDark
    ? "bg-zinc-700 border-white/10 text-white hover:bg-zinc-600"
    : "bg-white border-black/10 text-zinc-900 hover:bg-zinc-50";

  return (
    <>
      <header className="flex flex-col gap-5 sm:gap-6">
        <div className="flex items-center justify-between gap-3">
          {/* Locale switcher */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "pt-BR" | "en-US")}
              aria-label={locale === "pt-BR" ? "Selecionar idioma" : "Select language"}
              className={[
                "h-11 rounded-full pl-4 pr-10 text-sm font-semibold transition-all",
                "border shadow-sm appearance-none cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                isDark ? "focus-visible:ring-offset-zinc-800" : "focus-visible:ring-offset-white",
                selectBase,
              ].join(" ")}
            >
              <option value="pt-BR">🇧🇷 Português</option>
              <option value="en-US">🇺🇸 English</option>
            </select>
            <span className={["pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", isDark ? "text-zinc-300" : "text-zinc-500"].join(" ")}>
              ▾
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? (locale === "pt-BR" ? "Tema claro" : "Light theme") : (locale === "pt-BR" ? "Tema escuro" : "Dark theme")}
              className={[
                "relative h-11 w-11 rounded-full grid place-items-center transition-all",
                "border hover:-translate-y-px hover:shadow-md",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                isDark ? "focus-visible:ring-offset-zinc-800" : "focus-visible:ring-offset-white",
                btnBase,
              ].join(" ")}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              aria-label={shareLabel}
              className={[
                "relative h-11 w-11 rounded-full grid place-items-center transition-all",
                "border hover:-translate-y-px hover:shadow-md",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                isDark ? "focus-visible:ring-offset-zinc-800" : "focus-visible:ring-offset-white",
                btnBase,
              ].join(" ")}
            >
              <Share2 size={18} />
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),transparent_60%)]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2">
            {isDark ? (
              <Image
                src="/LOGO_REDD_HORIZONTAL_COLORIDO.png"
                alt="Logo REDD"
                width={200}
                height={80}
                sizes="200px"
                quality={75}
                className="bg-transparent"
                priority
              />
            ) : (
              <Image
                src="/REDD_LOGO_v2.png"
                alt="Logo REDD"
                width={200}
                height={80}
                sizes="200px"
                quality={75}
                className="bg-transparent"
                priority
              />
            )}
          </div>

          <h1 className={["text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight", isDark ? "text-white" : "text-zinc-950"].join(" ")}>
            {title}
          </h1>

          <p className={["max-w-xl text-sm sm:text-base", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
            {subtitle}
          </p>

          {/* Social icons — todos vermelhos */}
          <div className="flex justify-around gap-1">
            <a
              href="mailto:redd@redd.com.br"
              className="m-1 px-2 py-2 transition-transform duration-300 hover:scale-110"
              style={{ borderRadius: "50%", border: `1.5px solid ${REDD}`, background: isDark ? "#3f3f46" : "white" }}
              aria-label="E-mail"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 448" fill={REDD}>
                <path fill={REDD} d="M469 21H43q-18 0-30.5 13T0 64v256q0 17 12.5 30T43 363h426q18 0 30.5-13t12.5-30V64q0-17-12.5-30T469 21zm-40 43L256 166L83 64h346zM43 320V90l202 121q2 2 11 2t11-2L469 90v230H43z" />
              </svg>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=551126133882&text=Ol%C3%A1+vim+atrav%C3%A9s+do+Linktree+e+gostaria+de+atendimento&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="m-1 px-2 py-2 transition-transform duration-300 hover:scale-110"
              style={{ borderRadius: "50%", border: `1.5px solid ${REDD}`, background: isDark ? "#3f3f46" : "white" }}
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 464 488" fill={REDD}>
                <path fill={REDD} d="M462 228q0 93-66 159t-160 66q-56 0-109-28L2 464l40-120q-32-54-32-116q0-93 66-158.5T236 4t160 65.5T462 228zM236 39q-79 0-134.5 55.5T46 228q0 62 36 111l-24 70l74-23q49 31 104 31q79 0 134.5-55.5T426 228T370.5 94.5T236 39zm114 241q-1-1-10-7q-3-1-19-8.5t-19-8.5q-9-3-13 2q-1 3-4.5 7.5t-7.5 9t-5 5.5q-4 6-12 1q-34-17-45-27q-7-7-13.5-15t-12-15t-5.5-8q-3-7 3-11q4-6 8-10l6-9q2-5-1-10q-4-13-17-41q-3-9-12-9h-11q-9 0-15 7q-19 19-19 45q0 24 22 57l2 3q2 3 4.5 6.5t7 9t9 10.5t10.5 11.5t13 12.5t14.5 11.5t16.5 10t18 8.5q16 6 27.5 10t18 5t9.5 1t7-1t5-1q9-1 21.5-9t15.5-17q8-21 3-26z" />
              </svg>
            </a>

            <a
              href="https://youtube.com/@reddpromocional6447?si=TB1fnorAHqtXVXIm"
              target="_blank"
              rel="noopener noreferrer"
              className="m-1 px-2 py-2 transition-transform duration-300 hover:scale-110"
              style={{ borderRadius: "50%", border: `1.8px solid ${REDD}`, background: isDark ? "#3f3f46" : "white" }}
              aria-label="Youtube"
            >
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 50.000000 50.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                fill={REDD} stroke="none">
                <path d="M104 403 c-49 -7 -66 -33 -72 -112 -7 -100 4 -158 33 -177 53 -34
                323 -30 367 6 21 17 23 26 23 129 0 154 1 154 -182 157 -76 1 -152 0 -169 -3z
                m314 -37 c14 -13 17 -36 17 -116 0 -139 5 -135 -190 -135 -191 0 -187 -2 -192
                122 -6 147 4 153 220 149 105 -2 131 -6 145 -20z"/>
                <path d="M190 250 l0 -80 53 30 c87 51 84 49 67 60 -8 5 -39 23 -67 40 l-53
                30 0 -80z m61 23 c16 -10 29 -20 29 -23 0 -6 -54 -40 -64 -40 -3 0 -6 18 -6
                40 0 46 1 46 41 23z"/>
                </g>
                </svg>
            </a>

            
          </div>
        </div>
      </header>

      {/* Modal Share + QR */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={shareLabel}
        >
          <button
            type="button"
            onClick={() => setShareOpen(false)}
            aria-label={closeLabel}
            className="absolute inset-0 bg-black/45"
          />

          <div
            className={[
              "relative w-full max-w-105 overflow-hidden rounded-2xl border backdrop-blur-xl",
              isDark
                ? "bg-zinc-700 border-white/10 shadow-[0_0_80px_18px_rgba(255,255,255,0.12),0_30px_90px_-20px_rgba(0,0,0,0.8)]"
                : "bg-zinc-100 border-black/10 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.55)]",
            ].join(" ")}
          >
            {/* acabamento */}
            <div className={["pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.55)_18%,transparent_42%)]", isDark ? "opacity-10" : "opacity-60"].join(" ")} />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />

            <div className="relative p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={[
                      "size-10 rounded-xl grid place-items-center border shadow-sm",
                      isDark ? "bg-zinc-600 border-white/10 text-white" : "bg-white border-black/10 text-zinc-900",
                    ].join(" ")}
                  >
                    <QrCode size={18} />
                  </div>
                  <div className="text-left">
                    <p className={["font-extrabold", isDark ? "text-white" : "text-zinc-950"].join(" ")}>
                      {locale === "pt-BR" ? "Compartilhar site REDD" : "Share REDD website"}
                    </p>
                    <p className={["text-xs", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>{LINKTREE_URL}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShareOpen(false)}
                  aria-label={closeLabel}
                  className={[
                    "h-10 w-10 rounded-full grid place-items-center transition-all border shadow-sm",
                    isDark ? "bg-zinc-600 border-white/10 text-white hover:bg-zinc-500" : "bg-white border-black/10 text-zinc-700 hover:bg-zinc-50",
                  ].join(" ")}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 flex justify-center">
                <div
                  className={[
                    "rounded-2xl p-4 border shadow-sm",
                    isDark ? "bg-white border-white/20" : "bg-white border-black/10",
                  ].join(" ")}
                >
                  <Image
                    src={qrSrc}
                    alt="QR Code REDD"
                    width={240}
                    height={240}
                    className="block rounded-xl"
                  />
                </div>
              </div>

              <p className={["mt-4 text-center text-xs", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                {locale === "pt-BR" ? "Aponte a câmera para acessar rapidamente." : "Point your camera to open quickly."}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className={[
                    "h-12 rounded-xl font-extrabold tracking-tight transition-all",
                    "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
                    "hover:-translate-y-px hover:shadow-md",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                    isDark ? "focus-visible:ring-offset-zinc-700" : "focus-visible:ring-offset-zinc-100",
                  ].join(" ")}
                >
                  {locale === "pt-BR" ? "Compartilhar" : "Share"}
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className={[
                    "h-12 rounded-xl font-extrabold tracking-tight transition-all border",
                    "hover:-translate-y-px hover:shadow-md",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]/60 focus-visible:ring-offset-2",
                    isDark
                      ? "bg-zinc-600 border-white/10 text-white hover:bg-zinc-500 focus-visible:ring-offset-zinc-700"
                      : "bg-white border-black/10 text-zinc-950 hover:bg-zinc-50 focus-visible:ring-offset-zinc-100",
                    "inline-flex items-center justify-center gap-2",
                  ].join(" ")}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied
                    ? locale === "pt-BR" ? "Copiado" : "Copied"
                    : locale === "pt-BR" ? "Copiar link" : "Copy link"}
                </button>
              </div>
            </div>

            <div className={["h-1", isDark ? "bg-white/5" : "bg-black/5"].join(" ")} />
          </div>
        </div>
      )}
    </>
  );
}