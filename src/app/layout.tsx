import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AppStateProvider from "@/components/AppStateProvider";
import { ToastProvider } from "@/components/Toast";
import SafeArea from "@/components/SafeArea";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

const TITULO = "CySA+ Prep — Curso preparatório para o CS0-003";
const DESCRICAO =
  "Curso preparatório completo para a certificação CompTIA CySA+ (CS0-003): 9 módulos, laboratórios guiados e simulados cronometrados. Estude offline pelo celular.";

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
    "CS0-003",
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
        <ThemeProvider>
          <ToastProvider>
            <AppStateProvider>
              <SafeArea>
                <Header />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
                <Footer />
                <BottomNav />
                <InstallPrompt />
              </SafeArea>
            </AppStateProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
