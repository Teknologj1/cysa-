# Guia de conteúdo

Como o conteúdo do curso está organizado e o que enviar para publicar uma nova
seção ou lição.

## Estrutura

```
src/content/
  types.ts             contratos (Secao, Licao, Questao…)
  exame.ts             metadados do CS0-004 (código, questões, tempo, nota)
  dominios.ts          os 4 domínios e seus pesos oficiais
  fases.ts             as 4 fases pedagógicas do curso
  roadmap.ts           seções ainda em produção, por fase
  secoes/
    index.ts           registro ordenado + navegação entre lições
    s01-comecando.ts   uma seção por arquivo
    s02-fundamentos-soc.ts
  questoes/
    index.ts           junta tudo
    banco-geral.ts     questões por domínio (simulados livres e modo prova)
    s01.ts, s02.ts     checkpoints de cada seção
  lab-ingles/          passagens e termos do SOC English Lab
  planos.ts            planos, preços e benefícios
  faq.ts               perguntas da landing
```

Uma seção = um arquivo. Para publicar, basta criar o arquivo e registrá-lo em
`src/content/secoes/index.ts`.

## O que me enviar por lição

O formato ideal é o mesmo das transcrições que você já mandou. Para cada lição:

1. **Título** e, se houver, o **objetivo oficial** (ex.: OBJ 1.5)
2. **Duração** aproximada em minutos
3. **Tipo**: aula, leitura, lab ou checkpoint
4. **O texto da lição** — pode ser a transcrição corrida, eu estruturo
5. **Bottom line** — os pontos que precisam ficar (vira o bloco "O que precisa ficar")
6. **For the exam** — como o assunto é cobrado (vira o bloco "Na prova")
7. **Tarefa** sugerida antes da próxima lição
8. **Links** de apoio citados

Nada disso é obrigatório além do título e do texto: os blocos que faltarem
simplesmente não aparecem na página.

## Como a lição vira código

```ts
{
  id: "s03l02",                    // <secaoId>l<nn>
  titulo: "Segmentação de rede na prática",
  resumo: "Uma ou duas frases para a lista da seção.",
  minutos: 18,
  tipo: "aula",
  objetivo: "1.1",                 // opcional
  gratis: false,                   // amostra liberada sem assinatura
  conteudo: `
## Subtítulo

Texto em Markdown. Tabelas, listas, **negrito**, \`código\` e
> blocos de citação funcionam.
`.trim(),
  pontosChave: ["…", "…"],
  dicaExame: "…",
  tarefa: "…",
  recursos: [{ titulo: "MITRE ATT&CK", url: "https://attack.mitre.org" }],
}
```

Sem `conteudo`, a página da lição mostra o `roteiro` com o aviso de conteúdo em
produção — útil para publicar a estrutura antes do texto ficar pronto.

## Convenções

- **Idioma**: português, com os termos técnicos em inglês (SIEM, SOAR, threat
  hunting, impossible travel, living off the land). É assim que a prova cobra e
  é assim que o mercado fala.
- **IDs**: seção `sNN`, lição `sNNlNN`, questão de checkpoint `sNNqN`. Nunca
  reaproveite um ID já usado — o progresso do aluno é gravado por ID.
- **Grátis**: mantenha algumas lições por fase como amostra. Hoje são quatro,
  todas nas seções 1 e 2.
- **Checkpoint**: cada seção termina com uma lição do tipo `checkpoint`
  apontando para `/simulado?secao=sNN`, e as questões correspondentes vão em
  `src/content/questoes/sNN.ts` com o campo `secaoId`.

## Questões

```ts
{
  id: "s03q1",
  secaoId: "s03",
  dominio: "d1",
  objetivo: "1.1",
  enunciado: "Cenário curto e específico…",
  alternativas: ["…", "…", "…", "…"],
  correta: 1,                      // índice em `alternativas`
  explicacao: "Por que a certa está certa e por que as outras falham.",
  gratis: false,
}
```

A explicação é o que faz a questão valer: diga o raciocínio, não só o gabarito.

## Depois de adicionar conteúdo

```bash
npm run typecheck   # os contratos pegam ID duplicado, campo faltando, domínio inválido
npm run build       # gera as páginas estáticas das novas lições
```

O restante do app se ajusta sozinho: contagem de lições na landing, progresso,
sitemap, navegação entre lições e filtros do simulado saem todos do conteúdo.
