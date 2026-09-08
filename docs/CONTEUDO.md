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

## Uma regra que não pode ser quebrada

Nunca importe `@/content/secoes` ou `@/content/questoes` de um componente com
`"use client"`. Tudo que a interface importa vai para o JavaScript público, e
isso entregaria o corpo das lições e o gabarito das questões a qualquer
visitante.

Na interface, use `@/content/catalogo` — metadados gerados no build. Conteúdo
pago vem do servidor, por props ou por rota de API. O `npm run verificar:bundle`
roda depois de todo build e falha se isso escapar.

## Objetivos oficiais

`src/content/objetivos.ts` traz os 15 objetivos do CS0-004 conforme o documento
oficial da CompTIA (versão 2.0), com os tópicos que cada um lista. É a fonte da
verdade das marcações `objetivo` das lições e questões.

Ao escrever conteúdo novo:

1. Escolha o **código oficial** que a lição cobre e marque em `objetivo`.
2. `scripts/verificar-conteudo.mts` **falha o build** se o código não existir na
   lista — um código inventado engana o aluno e some do mapa de cobertura.
3. O verificador também reporta a cobertura, no formato
   `✓ objetivos: N de 15 com conteúdo (faltam …)`. Use isso para decidir o que
   escrever em seguida.

O mapa aparece para o aluno em `/objetivos`, com o peso de cada domínio e as
seções que cobrem cada objetivo. Uma lição também exibe o título do objetivo na
sua abertura, porque "OBJ 1.1" sozinho não diz nada.

O `ROADMAP` (`src/content/roadmap.ts`) sai da mesma lista, para o curso prometer
exatamente o que a prova cobra.

## Liberação progressiva

Nos primeiros 7 dias de assinatura o aluno estuda **apenas as seções 1 e 2**. A
partir do 8º dia todas as demais abrem de uma vez.

No código isso é o campo `diasParaLiberar` da seção:

| Valor | Efeito |
| --- | --- |
| `0` | abre no primeiro dia (é o caso de s01 e s02) |
| omitido | abre depois de `DIAS_DE_CARENCIA` = 7 dias completos |

**Uma seção nova não precisa declarar nada** — a ausência do campo já significa
carência. Isso é proposital: o esquecimento erra para o lado seguro, fechando a
seção, em vez de liberar conteúdo antes da hora.

O relógio começa na criação da assinatura no Stripe (`criadaEm`), que já é a
fonte da verdade do acesso. Dia da compra = 0 dias completos; o 8º dia de acesso
são 7 dias completos.

Três coisas que a regra **não** afeta:

- **Lições e questões `gratis`** continuam visíveis a qualquer um. Assinante
  nunca pode ver menos que um visitante.
- **Acesso de cortesia** entra sem carência — é para equipe e revisão.
- **Ambiente sem contas** (`contasAtivas` falso) continua abrindo tudo: não há
  assinatura para datar.

A regra é aplicada no servidor em dois lugares, e os dois importam:
`src/app/curso/[secaoId]/[licaoId]/page.tsx` (que decide se o corpo da lição
chega a sair) e `src/server/simulado/selecao.ts` (sem o qual o checkpoint de uma
seção fechada devolveria gabarito pela API). `scripts/verificar-conteudo.mts`
confere os dois contra o conteúdo real e falha o build se a carência furar.

## Depois de adicionar conteúdo

```bash
npm run typecheck   # os contratos pegam ID duplicado, campo faltando, domínio inválido
npm run build       # regenera o catálogo, gera as páginas e verifica o bundle
```

O restante do app se ajusta sozinho: contagem de lições na landing, progresso,
sitemap, navegação entre lições e filtros do simulado saem todos do conteúdo.
