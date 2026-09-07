export default function ProgressBar({
  valor,
  cor = "#22d3ee",
  className = "",
  rotulo,
}: {
  /** Percentual de 0 a 100. */
  valor: number;
  cor?: string;
  className?: string;
  rotulo?: string;
}) {
  const seguro = Math.max(0, Math.min(100, Math.round(valor)));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
      role="progressbar"
      aria-valuenow={seguro}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={rotulo}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${seguro}%`, backgroundColor: cor }}
      />
    </div>
  );
}
