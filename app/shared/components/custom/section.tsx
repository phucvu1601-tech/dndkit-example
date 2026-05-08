interface SectionProps {
  label: string
  children: React.ReactNode
}

export default function Section({ label, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl">{label}</div>
      {children}
    </div>
  )
}
