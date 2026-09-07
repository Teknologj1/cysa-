// next.config.ts
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// Cache runtime: conteúdo do curso e assets precisam funcionar offline.
const runtimeCaching = [
  {
    // Conteúdo do curso (módulos, aulas, questões) — offline-first com revalidação
    urlPattern: /^https?:\/\/[^/]+\/api\/(curriculo|questoes).*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "api-conteudo",
      expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 7 }, // 7 dias
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    // Páginas do app
    urlPattern: /^https?:\/\/[^/]+\/(curso|simulado|progresso)(\/.*)?$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "paginas-curso",
      networkTimeoutSeconds: 5,
      expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
];

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  importScripts: ["/pwa-custom-sw.js"],
  fallbacks: { document: "/offline.html" },
  runtimeCaching,
});

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    const csp = [
      "default-src 'self'",
      // Stripe Checkout é redirect (top-level), mas js.stripe.com é liberado para uso futuro do Elements
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://api.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/offline.html",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), usb=()",
          },
          { key: "Content-Security-Policy", value: csp },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
