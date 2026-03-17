"use client";

import Header from "./components/Header";
import LinksList from "./components/LinksList";
import { useTheme } from "./context/theme-context";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={["min-h-dvh w-full overflow-x-hidden transition-colors duration-300", isDark ? "bg-zinc-800" : "bg-white"].join(" ")}>
      {/* Fundo com luz vermelha sutil */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(220,38,38,0.09),transparent_56%),radial-gradient(900px_circle_at_85%_18%,rgba(220,38,38,0.07),transparent_58%),radial-gradient(900px_circle_at_50%_92%,rgba(220,38,38,0.05),transparent_60%)]" />

      <div className="mx-auto w-full max-w-190 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Card principal */}
        <div className={["relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300", isDark ? "border-white/8 bg-zinc-800/90 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.8)]" : "border-black/10 bg-white/85 shadow-[0_28px_90px_-55px_rgba(0,0,0,0.35)]"].join(" ")}>
          {/* brilho sutil */}
          <div className={["pointer-events-none absolute inset-0", isDark ? "opacity-10 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_18%,transparent_42%)]" : "opacity-70 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.03)_18%,transparent_42%)]"].join(" ")} />
          {/* acabamento: ring interno */}
          <div className={["pointer-events-none absolute inset-0 rounded-3xl ring-1", isDark ? "ring-white/5" : "ring-black/5"].join(" ")} />

          <div className={["relative p-5 sm:p-8 lg:p-10", isDark ? "text-white" : "text-zinc-900"].join(" ")}>
            <Header />

            <div className="mt-2 sm:mt-8">
              <LinksList />
            </div>

            <footer className={["mt-8 sm:mt-10 border-t pt-6", isDark ? "border-white/10" : "border-black/10"].join(" ")}>
              <div className={["text-center text-xs sm:text-sm", isDark ? "text-zinc-300" : "text-zinc-800"].join(" ")}>
                <span>© {new Date().getFullYear()} REDD Presentes Corporativos</span>
                <span className="mx-2 opacity-40">•</span>
                <span>Presentes que criam conexões</span>
              </div>
              <div className={["mt-2 text-center text-[11px]", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
                Produção em escala • Atendimento B2B • Envio para todo o Brasil
              </div>
            </footer>
          </div>
        </div>

        <div className="h-8 sm:h-12" />
      </div>
    </div>
  );
}