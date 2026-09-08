import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  type ProgressoSincronizavel,
  LIMITE_TENTATIVAS,
  mesclarProgresso,
} from "./progresso-merge.ts";

function progresso(
  parcial: Partial<ProgressoSincronizavel> = {}
): ProgressoSincronizavel {
  return {
    licoesConcluidas: [],
    tentativas: [],
    dataProva: null,
    atualizadoEm: "2026-01-01T00:00:00.000Z",
    ...parcial,
  };
}

describe("mesclarProgresso", () => {
  it("une as lições concluídas dos dois aparelhos", () => {
    const resultado = mesclarProgresso(
      progresso({ licoesConcluidas: ["s01l01", "s01l02"] }),
      progresso({ licoesConcluidas: ["s01l02", "s02l01"] })
    );
    assert.deepEqual(resultado.licoesConcluidas.sort(), [
      "s01l01",
      "s01l02",
      "s02l01",
    ]);
  });

  it("não perde progresso de quem estudou offline", () => {
    const celular = progresso({ licoesConcluidas: ["s02l04"] });
    const computador = progresso({ licoesConcluidas: [] });
    assert.deepEqual(mesclarProgresso(computador, celular).licoesConcluidas, [
      "s02l04",
    ]);
  });

  it("une tentativas sem duplicar pelo id", () => {
    const t = (id: string, data: string) => ({ id, data, acertos: 8, total: 10 });
    const resultado = mesclarProgresso(
      progresso({ tentativas: [t("t1", "2026-02-01T10:00:00Z")] }),
      progresso({
        tentativas: [
          t("t1", "2026-02-01T10:00:00Z"),
          t("t2", "2026-02-02T10:00:00Z"),
        ],
      })
    );
    assert.equal(resultado.tentativas.length, 2);
    assert.equal(resultado.tentativas[0].id, "t2", "mais recente primeiro");
  });

  it("limita o histórico de tentativas", () => {
    const muitas = Array.from({ length: 40 }, (_, i) => ({
      id: `t${i}`,
      data: new Date(2026, 0, i + 1).toISOString(),
    }));
    const resultado = mesclarProgresso(
      progresso({ tentativas: muitas }),
      progresso()
    );
    assert.equal(resultado.tentativas.length, LIMITE_TENTATIVAS);
  });

  it("mantém a data da prova definida mais recentemente", () => {
    const antigo = progresso({
      dataProva: "2026-05-01T00:00:00.000Z",
      atualizadoEm: "2026-03-01T00:00:00.000Z",
    });
    const novo = progresso({
      dataProva: "2026-06-15T00:00:00.000Z",
      atualizadoEm: "2026-04-01T00:00:00.000Z",
    });
    assert.equal(mesclarProgresso(antigo, novo).dataProva, "2026-06-15T00:00:00.000Z");
  });

  it("aproveita a data do outro lado quando o mais recente não tem", () => {
    const semData = progresso({ atualizadoEm: "2026-04-01T00:00:00.000Z" });
    const comData = progresso({
      dataProva: "2026-06-15T00:00:00.000Z",
      atualizadoEm: "2026-03-01T00:00:00.000Z",
    });
    assert.equal(mesclarProgresso(semData, comData).dataProva, "2026-06-15T00:00:00.000Z");
  });

  it("é comutativa nas lições e nas tentativas", () => {
    const a = progresso({ licoesConcluidas: ["x"], tentativas: [{ id: "t1", data: "2026-01-01T00:00:00Z" }] });
    const b = progresso({ licoesConcluidas: ["y"], tentativas: [{ id: "t2", data: "2026-01-02T00:00:00Z" }] });
    const ab = mesclarProgresso(a, b);
    const ba = mesclarProgresso(b, a);
    assert.deepEqual(ab.licoesConcluidas.sort(), ba.licoesConcluidas.sort());
    assert.deepEqual(
      ab.tentativas.map((t) => t.id),
      ba.tentativas.map((t) => t.id)
    );
  });
});
