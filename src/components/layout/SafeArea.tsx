export default function SafeArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      className="flex min-h-svh flex-col"
    >
      {children}
    </div>
  );
}
