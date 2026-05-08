export default function DemoBackground({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="
          [background-image:var(--card-gradient)] bg-size-[800%_800%] animate-gradient-move
          rounded-2xl p-6 min-h-60 flex flex-wrap gap-4 content-start
        "
    >
      {children}
    </div>
  )
}
