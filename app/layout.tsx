import type { Metadata, Viewport } from "next";
import { Archivo_Narrow } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: true,
});

const SITE_NAME = "REDD Presentes Corporativos";
const SITE_URL = "https://www.redd.com.br";
const TITLE = "REDD Presentes Corporativos | Links Oficiais";
const DESCRIPTION =
  "Acesse os links oficiais da REDD Presentes Corporativos: site, Instagram e LinkedIn. Presentes corporativos personalizados com padrão premium para empresas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s | REDD Presentes Corporativos",
  },

  description: DESCRIPTION,

  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "business",
  keywords: [
    "REDD Presentes Corporativos",
    "presentes corporativos",
    "brindes personalizados",
    "presentes para empresas",
    "presentes corporativos",
    "brindes premium",
    "kits corporativos",
    "presentes para eventos",
    "produção em escala",
    "linktree redd",
  ],

  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/?lang=en-US",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_BR",
    images: [
      {
        url: "/og.png", // ✅ crie esse arquivo em /public/og.png (1200x630)
        width: 1200,
        height: 630,
        alt: "REDD Presentes corporativos - Links Oficiais",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"], // mesma imagem
  },

  icons: {
    icon: [
      { url: "/REDD_SIMBOLO.png" },
      { url: "/REDD_SIMBOLO.png", type: "image/png" }, // opcional
    ],
    apple: [{ url: "/REDD_SIMBOLO.png" }], // opcional
  },

  // Se tiver Google Search Console / Bing, coloque tokens aqui
  verification: {
    // google: "SEU_TOKEN_AQUI",
    // other: { "msvalidate.01": "SEU_TOKEN_AQUI" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD (Organization / WebSite) — ajuda rich results e confiança sem “keyword stuffing”
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/REDD_SIMBOLO.png`,
        sameAs: [
          "https://www.redd.com.br",
          "https://www.instagram.com/reddbrindes",
          "https://www.linkedin.com/company/redd-presentes-corporativos",
        ],
      },
      {
        "@type": "WebSite",
        name: `${SITE_NAME} - Links Oficiais`,
        url: SITE_URL,
        inLanguage: ["pt-BR", "en-US"],
      },
      {
        "@type": "WebPage",
        name: TITLE,
        url: SITE_URL,
        description: DESCRIPTION,
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href="/REDD_LOGO_v2.png" fetchPriority="high" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={archivoNarrow.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}