import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { listaDeCortesia, temCortesia } from "./cortesia.ts";

describe("listaDeCortesia", () => {
  it("aceita vírgula, ponto e vírgula e espaço como separadores", () => {
    assert.deepEqual(listaDeCortesia("a@x.com, b@x.com;c@x.com d@x.com"), [
      "a@x.com",
      "b@x.com",
      "c@x.com",
      "d@x.com",
    ]);
  });

  it("normaliza caixa e espaços em volta", () => {
    assert.deepEqual(listaDeCortesia("  Contato@Teknologji.com.BR  "), [
      "contato@teknologji.com.br",
    ]);
  });

  it("devolve lista vazia quando a variável não existe ou está vazia", () => {
    assert.deepEqual(listaDeCortesia(undefined), []);
    assert.deepEqual(listaDeCortesia(""), []);
    assert.deepEqual(listaDeCortesia("   ,  ; "), []);
  });
});

describe("temCortesia", () => {
  const lista = "contato@teknologji.com.br, revisor@teknologji.com.br";

  it("libera quem está na lista, ignorando caixa", () => {
    assert.equal(temCortesia("contato@teknologji.com.br", lista), true);
    assert.equal(temCortesia("Contato@Teknologji.com.br", lista), true);
    assert.equal(temCortesia(" contato@teknologji.com.br ", lista), true);
  });

  it("não libera quem está fora da lista", () => {
    assert.equal(temCortesia("outro@teknologji.com.br", lista), false);
    assert.equal(temCortesia("contato@outrodominio.com", lista), false);
  });

  it("não casa por domínio nem por prefixo", () => {
    assert.equal(temCortesia("qualquer@teknologji.com.br", "@teknologji.com.br"), false);
    assert.equal(temCortesia("contato@teknologji.com.br.attacker.com", lista), false);
    assert.equal(temCortesia("contato@teknologji.com", lista), false);
  });

  it("não libera ninguém quando a variável está ausente", () => {
    assert.equal(temCortesia("contato@teknologji.com.br", undefined), false);
    assert.equal(temCortesia("contato@teknologji.com.br", ""), false);
  });

  it("não libera com e-mail ausente", () => {
    assert.equal(temCortesia(null, lista), false);
    assert.equal(temCortesia("", lista), false);
    assert.equal(temCortesia("   ", lista), false);
  });
});
