import { cn } from "@/shared/lib/utils"

interface SectionProps {
  label: string
  children: React.ReactNode
  className?: string
}

export default function Section({ label, children, className }: SectionProps) {
  return (
    <div className={cn("@container flex flex-col gap-4 w-full", className)}>
      <div className="font-bold text-2xl">{label}</div>
      {children}
    </div>
  )
}
