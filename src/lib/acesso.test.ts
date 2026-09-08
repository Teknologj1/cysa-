import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { podeEntregarConteudo, podeVerConteudo } from "./acesso.ts";

/** Seção já aberta, para os casos que não estão testando a carência. */
const ABERTA = { secaoLiberada: true };

describe("podeEntregarConteudo", () => {
  it("entrega tudo enquanto não existem contas de verdade", () => {
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: false,
        liberado: false,
        gratis: false,
        secaoLiberada: false,
      }),
      true
    );
  });

  it("retém a lição paga de quem não tem assinatura", () => {
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: true,
        liberado: false,
        gratis: false,
        ...ABERTA,
      }),
      false
    );
  });

  it("entrega a lição paga a quem tem assinatura ativa", () => {
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: true,
        liberado: true,
        gratis: false,
        ...ABERTA,
      }),
      true
    );
  });

  it("entrega a amostra grátis mesmo sem assinatura", () => {
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: true,
        liberado: false,
        gratis: true,
        secaoLiberada: false,
      }),
      true
    );
  });

  it("retém a lição paga de assinante cuja seção ainda não abriu", () => {
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: true,
        liberado: true,
        gratis: false,
        secaoLiberada: false,
      }),
      false
    );
  });

  it("mantém a amostra grátis visível dentro de seção em carência", () => {
    // Assinante nunca pode ver menos que um visitante.
    assert.equal(
      podeEntregarConteudo({
        contasAtivas: true,
        liberado: true,
        gratis: true,
        secaoLiberada: false,
      }),
      true
    );
  });
});

describe("podeVerConteudo", () => {
  it("libera amostra grátis", () => {
    assert.equal(
      podeVerConteudo({
        contasAtivas: true,
        liberado: false,
        gratis: true,
        ...ABERTA,
      }),
      true
    );
  });

  it("bloqueia lição paga sem assinatura", () => {
    assert.equal(
      podeVerConteudo({
        contasAtivas: true,
        liberado: false,
        gratis: false,
        ...ABERTA,
      }),
      false
    );
  });

  it("bloqueia lição paga de seção em carência", () => {
    assert.equal(
      podeVerConteudo({
        contasAtivas: true,
        liberado: true,
        gratis: false,
        secaoLiberada: false,
      }),
      false
    );
  });
});
