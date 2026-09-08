import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  DIAS_DE_CARENCIA,
  diasAteLiberar,
  diasDeAssinatura,
  diasParaLiberarSecao,
  rotuloDeLiberacao,
  secaoLiberada,
} from "./liberacao.ts";

const UM_DIA = 24 * 60 * 60 * 1000;
const AGORA = Date.parse("2026-09-08T12:00:00.000Z");

/** ISO de uma assinatura criada há `dias` dias. */
function assinadaHa(dias: number, horas = 0): string {
  return new Date(AGORA - dias * UM_DIA - horas * 60 * 60 * 1000).toISOString();
}

describe("diasDeAssinatura", () => {
  it("conta dias completos, não calendário", () => {
    assert.equal(diasDeAssinatura(assinadaHa(0), AGORA), 0);
    assert.equal(diasDeAssinatura(assinadaHa(0, 23), AGORA), 0);
    assert.equal(diasDeAssinatura(assinadaHa(1), AGORA), 1);
    assert.equal(diasDeAssinatura(assinadaHa(7), AGORA), 7);
    assert.equal(diasDeAssinatura(assinadaHa(30), AGORA), 30);
  });

  it("trata data no futuro como o primeiro dia", () => {
    const futuro = new Date(AGORA + 3 * UM_DIA).toISOString();
    assert.equal(diasDeAssinatura(futuro, AGORA), 0);
  });

  it("devolve null sem data ou com data inválida", () => {
    assert.equal(diasDeAssinatura(null, AGORA), null);
    assert.equal(diasDeAssinatura(undefined, AGORA), null);
    assert.equal(diasDeAssinatura("nao é data", AGORA), null);
  });
});

describe("diasParaLiberarSecao", () => {
  it("respeita o valor declarado na seção", () => {
    assert.equal(diasParaLiberarSecao({ diasParaLiberar: 0 }), 0);
    assert.equal(diasParaLiberarSecao({ diasParaLiberar: 14 }), 14);
  });

  it("aplica a carência quando a seção não declara nada", () => {
    // Fail-safe: seção nova nunca abre antes do prazo por esquecimento.
    assert.equal(diasParaLiberarSecao({}), DIAS_DE_CARENCIA);
  });
});

describe("secaoLiberada", () => {
  const semCarencia = { diasParaLiberar: 0, cortesia: false };
  const comCarencia = { diasParaLiberar: 7, cortesia: false };

  it("abre as seções sem carência desde o primeiro dia", () => {
    assert.equal(secaoLiberada({ ...semCarencia, diasDecorridos: 0 }), true);
  });

  it("segura as demais durante os 7 primeiros dias", () => {
    for (const dia of [0, 1, 3, 6]) {
      assert.equal(
        secaoLiberada({ ...comCarencia, diasDecorridos: dia }),
        false,
        `dia ${dia} deveria continuar fechado`
      );
    }
  });

  it("abre no 8º dia de acesso, que são 7 dias completos", () => {
    assert.equal(secaoLiberada({ ...comCarencia, diasDecorridos: 7 }), true);
    assert.equal(secaoLiberada({ ...comCarencia, diasDecorridos: 8 }), true);
  });

  it("não libera sem assinatura", () => {
    assert.equal(secaoLiberada({ ...comCarencia, diasDecorridos: null }), false);
  });

  it("cortesia entra sem carência", () => {
    assert.equal(
      secaoLiberada({ diasParaLiberar: 7, diasDecorridos: null, cortesia: true }),
      true
    );
    assert.equal(
      secaoLiberada({ diasParaLiberar: 7, diasDecorridos: 0, cortesia: true }),
      true
    );
  });
});

describe("diasAteLiberar", () => {
  it("conta o que falta durante a carência", () => {
    const base = { diasParaLiberar: 7, cortesia: false };
    assert.equal(diasAteLiberar({ ...base, diasDecorridos: 0 }), 7);
    assert.equal(diasAteLiberar({ ...base, diasDecorridos: 6 }), 1);
  });

  it("devolve 0 quando já está liberada", () => {
    assert.equal(
      diasAteLiberar({ diasParaLiberar: 7, diasDecorridos: 7, cortesia: false }),
      0
    );
    assert.equal(
      diasAteLiberar({ diasParaLiberar: 0, diasDecorridos: 0, cortesia: false }),
      0
    );
  });
});

describe("rotuloDeLiberacao", () => {
  it("usa singular no último dia", () => {
    assert.equal(rotuloDeLiberacao(1), "abre amanhã");
    assert.equal(rotuloDeLiberacao(3), "abre em 3 dias");
    assert.equal(rotuloDeLiberacao(0), "liberada");
  });
});
