/**
 * Metadados do exame que o curso prepara. Centralizados aqui para que a
 * troca de versão do exame não exija caçar número solto pelo app.
 */
export const EXAME = {
  codigo: "CS0-004",
  nome: "CompTIA CySA+",
  nomeCompleto: "CompTIA Cybersecurity Analyst (CySA+)",
  substitui: "CS0-003",
  questoes: 85,
  minutos: 165,
  notaMinima: 750,
  escala: { minima: 100, maxima: 900 },
  validadeAnos: 3,
  experienciaRecomendadaAnos: 4,
  objetivosUrl:
    "https://www.comptia.org/certifications/cybersecurity-analyst",
} as const;
