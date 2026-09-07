/** Contratos de conteúdo do curso. Tudo em `src/content` obedece a estes tipos. */

export type DominioId = "d1" | "d2" | "d3" | "d4";

export type Dominio = {
  id: DominioId;
  /** Código oficial do domínio no CS0-004 ("1.0", "2.0"…). */
  codigo: string;
  nome: string;
  /** Peso do domínio no exame (%). */
  peso: number;
  descricao: string;
  /** Cor usada em selos, gráficos e barras de progresso. */
  cor: string;
};

/** Fases pedagógicas do curso — a ordem em que um analista constrói a habilidade. */
export type FaseId = "f0" | "f1" | "f2" | "f3" | "f4";

export type Fase = {
  id: FaseId;
  numero: number;
  titulo: string;
  descricao: string;
};

export type TipoLicao = "aula" | "leitura" | "lab" | "checkpoint";

export type Licao = {
  /** Único no curso. Convenção: `<secaoId>l<nn>` (ex.: "s02l03"). */
  id: string;
  titulo: string;
  /** Uma ou duas frases exibidas na lista da seção. */
  resumo: string;
  minutos: number;
  tipo: TipoLicao;
  /** Objetivo oficial do exame coberto pela lição (ex.: "1.5"). */
  objetivo?: string;
  /** Lições gratuitas ficam liberadas sem assinatura (amostra do curso). */
  gratis?: boolean;
  /** Corpo da lição em Markdown (GFM). Vazio ⇒ página mostra o roteiro. */
  conteudo?: string;
  /** "Bottom line": o que precisa ficar na memória. */
  pontosChave?: string[];
  /** "For the exam": como o assunto costuma ser cobrado. */
  dicaExame?: string;
  /** Tarefa prática sugerida ao fim da lição. */
  tarefa?: string;
  /** Tópicos que a lição cobre — briefing para redigir o conteúdo. */
  roteiro?: string[];
  recursos?: { titulo: string; url: string }[];
  /** Rota interna aberta pela lição (usada por labs). */
  rota?: string;
};

export type Secao = {
  /** Convenção: "s01".."s43". Usado na URL /curso/[secaoId]. */
  id: string;
  numero: number;
  titulo: string;
  fase: FaseId;
  /** Domínio predominante da seção. Null nas seções introdutórias. */
  dominio: DominioId | null;
  descricao: string;
  /** O que o aluno consegue fazer ao terminar a seção. */
  objetivos?: string[];
  licoes: Licao[];
};

/** Seção ainda não produzida — aparece no roadmap do curso como "em breve". */
export type SecaoPlanejada = {
  numero: number;
  titulo: string;
  fase: FaseId;
  dominio: DominioId | null;
};

export type Questao = {
  id: string;
  dominio: DominioId;
  /** Seção à qual a questão pertence — usada nos checkpoints. */
  secaoId?: string;
  /** Objetivo oficial cobrado pela questão. */
  objetivo?: string;
  enunciado: string;
  alternativas: string[];
  /** Índice da alternativa correta em `alternativas`. */
  correta: number;
  explicacao: string;
  /** Questões de amostra, liberadas sem assinatura. */
  gratis?: boolean;
};
