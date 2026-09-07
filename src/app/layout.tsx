import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import SafeArea from "@/components/layout/SafeArea";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import InstallPrompt from "@/features/pwa/InstallPrompt";
import { EXAME } from "@/content/exame";

const TITULO = `CySA+ Prep — Curso preparatório para o ${EXAME.codigo}`;
const DESCRICAO = `Curso preparatório para a certificação CompTIA CySA+ (${EXAME.codigo}): lições por seção, laboratórios, simulados comentados e SOC English Lab. Estude offline pelo celular.`;

export const metadata: Metadata = {
  title: { default: TITULO, template: "%s · CySA+ Prep" },
  description: DESCRICAO,
  manifest: "/manifest.json",
  applicationName: "CySA+ Prep",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  keywords: [
    "CySA+",
    EXAME.codigo,
    "CompTIA",
    "certificação",
    "cibersegurança",
    "SOC",
    "curso preparatório",
    "simulado",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CySA+ Prep",
    title: TITULO,
    description: DESCRICAO,
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO },
  robots: { index: true, follow: true },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "CySA+ Prep",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070b12" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body>
        <AppProviders>
          <SafeArea>
            <Header />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <BottomNav />
            <InstallPrompt />
          </SafeArea>
        </AppProviders>
      </body>
    </html>
  );
}
