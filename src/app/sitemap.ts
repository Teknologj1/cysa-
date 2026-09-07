import type { MetadataRoute } from "next";
import { LICOES_EM_ORDEM, SECOES } from "@/content/secoes";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = [
    "",
    "/planos",
    "/curso",
    "/simulado",
    "/lab-ingles",
    "/progresso",
    "/termos",
    "/privacidade",
  ];

  return [
    ...fixas.map((rota) => ({
      url: `${base}${rota}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: rota === "" ? 1 : 0.7,
    })),
    ...SECOES.map((secao) => ({
      url: `${base}/curso/${secao.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...LICOES_EM_ORDEM.map(({ secao, licao }) => ({
      url: `${base}/curso/${secao.id}/${licao.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
