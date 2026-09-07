import type { MetadataRoute } from "next";
import { MODULOS } from "@/content/curriculum";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = ["", "/planos", "/curso", "/simulado", "/progresso", "/termos", "/privacidade"];

  return [
    ...fixas.map((rota) => ({
      url: `${base}${rota}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: rota === "" ? 1 : 0.7,
    })),
    ...MODULOS.map((modulo) => ({
      url: `${base}/curso/${modulo.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
