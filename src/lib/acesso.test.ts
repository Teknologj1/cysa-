import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { podeEntregarConteudo, podeVerConteudo } from "./acesso.ts";

describe("podeEntregarConteudo", () => {
  it("entrega tudo enquanto não existem contas de verdade", () => {
    assert.equal(
      podeEntregarConteudo({ contasAtivas: false, liberado: false, gratis: false }),
      true
    );
  });

  it("retém a lição paga de quem não tem assinatura", () => {
    assert.equal(
      podeEntregarConteudo({ contasAtivas: true, liberado: false, gratis: false }),
      false
    );
  });

  it("entrega a lição paga a quem tem assinatura ativa", () => {
    assert.equal(
      podeEntregarConteudo({ contasAtivas: true, liberado: true, gratis: false }),
      true
    );
  });

  it("entrega a amostra grátis mesmo sem assinatura", () => {
    assert.equal(
      podeEntregarConteudo({ contasAtivas: true, liberado: false, gratis: true }),
      true
    );
  });
});

describe("podeVerConteudo", () => {
  it("libera amostra grátis", () => {
    assert.equal(
      podeVerConteudo({ contasAtivas: true, liberado: false, gratis: true }),
      true
    );
  });

  it("bloqueia lição paga sem assinatura", () => {
    assert.equal(
      podeVerConteudo({ contasAtivas: true, liberado: false, gratis: false }),
      false
    );
  });
});
