import Link from "next/link";
import { EMPRESA, EMPRESA_CONFIGURADA, NOME_PRODUTO } from "@/content/empresa";
import { EXAME } from "@/content/exame";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 pb-24 md:grid-cols-4 md:pb-10">
        <div className="md:col-span-2">
          <h3 className="text-base font-semibold">{NOME_PRODUTO}</h3>
          <p className="mt-2 max-w-sm text-sm text-mutedFg">
            Curso preparatório para a certificação CompTIA CySA+ ({EXAME.codigo}
            ), com lições, laboratórios e simulados — instalável no celular e
            disponível offline.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">App</h4>
          <ul className="space-y-2 text-sm text-mutedFg">
            <li>
              <Link href="/curso" className="hover:text-foreground">
                Seções do curso
              </Link>
            </li>
            <li>
              <Link href="/lab-ingles" className="hover:text-foreground">
                SOC English Lab
              </Link>
            </li>
            <li>
              <Link href="/simulado" className="hover:text-foreground">
                Simulados
              </Link>
            </li>
            <li>
              <Link href="/planos" className="hover:text-foreground">
                Planos
              </Link>
            </li>
            <li>
              <Link href="/conta" className="hover:text-foreground">
                Minha conta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-mutedFg">
            <li>
              <Link href="/termos" className="hover:text-foreground">
                Termos de uso
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-foreground">
                Privacidade
              </Link>
            </li>
            {EMPRESA_CONFIGURADA && (
              <li>
                <a
                  href={`mailto:${EMPRESA.emailContato}`}
                  className="hover:text-foreground"
                >
                  Falar com o suporte
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5">
        <p className="mx-auto max-w-6xl text-xs text-mutedFg">
          © {ano}{" "}
          {EMPRESA_CONFIGURADA ? EMPRESA.razaoSocial : NOME_PRODUTO}.
          CompTIA®, CySA+® e {EXAME.codigo} são marcas da CompTIA. Este material
          é independente e não possui vínculo, patrocínio ou endosso da CompTIA.
        </p>
      </div>
    </footer>
  );
}
