import { ImageResponse } from "next/og";
import { DOMINIOS } from "@/content/dominios";
import { EXAME } from "@/content/exame";
import { NOME_PRODUTO } from "@/content/empresa";

export const alt = `${NOME_PRODUTO} — curso preparatório para o ${EXAME.codigo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de compartilhamento (WhatsApp, LinkedIn, X). Gerada no build a partir
 * do próprio conteúdo, então os pesos dos domínios nunca ficam desatualizados.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #070b12 0%, #0d1826 100%)",
          padding: "64px 72px",
          color: "#e6edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#22d3ee",
              color: "#04121a",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            C+
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>
              {NOME_PRODUTO}
            </span>
            <span style={{ fontSize: 18, color: "#94a3b8" }}>
              CompTIA CySA+ · exame {EXAME.codigo}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Passe no CompTIA CySA+ estudando pelo celular
          </span>
          <span style={{ fontSize: 26, color: "#94a3b8", maxWidth: 880 }}>
            Lições por objetivo do exame, simulados comentados, laboratório de
            inglês para SOC e estudo offline.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {DOMINIOS.map((dominio) => (
            <div
              key={dominio.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
                padding: "18px 20px",
                borderRadius: 16,
                border: "1px solid #1c2634",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span style={{ fontSize: 20, color: "#94a3b8" }}>
                Domínio {dominio.codigo}
              </span>
              <span style={{ fontSize: 34, fontWeight: 700, color: dominio.cor }}>
                {dominio.peso}%
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
