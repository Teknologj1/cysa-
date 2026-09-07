import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renderiza o corpo Markdown das lições. O react-markdown não interpreta HTML
 * bruto por padrão, então o conteúdo é renderizado de forma segura.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 border-b border-border pb-2 text-xl font-semibold tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-base font-semibold">{children}</h3>
          ),
          p: ({ children }) => <p className="text-mutedFg">{children}</p>,
          ul: ({ children }) => (
            <ul className="ml-5 list-disc space-y-1.5 text-mutedFg marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-1.5 text-mutedFg marker:text-primary">
              {children}
            </ol>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="rounded-r-xl border-l-2 border-primary bg-muted/40 px-4 py-3 text-mutedFg [&>p]:m-0">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-muted/50 p-3 text-left font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border p-3 text-mutedFg">{children}</td>
          ),
          hr: () => <hr className="border-border" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
