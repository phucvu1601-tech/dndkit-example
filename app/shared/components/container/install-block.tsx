import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const commands: Record<PackageManager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
}

interface InstallBlockProps {
  packages: string | string[]
}

export function InstallBlock({ packages }: InstallBlockProps) {
  const [pm, setPm] = useState<PackageManager>("pnpm")
  const [copied, setCopied] = useState(false)

  const pkgStr = Array.isArray(packages) ? packages.join(" ") : packages
  const command = `${commands[pm]} ${pkgStr}`

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tabs defaultValue="pnpm" onValueChange={(v) => setPm(v as PackageManager)}>
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <TabsList variant={"line"}>
            {(Object.keys(commands) as PackageManager[]).map((key) => (
              <TabsTrigger key={key} value={key}>
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" onClick={handleCopy}>
                {copied ? <Check /> : <Copy />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <pre className="text-sm p-4 overflow-x-auto bg-background">
          <code>{command}</code>
        </pre>
      </div>
    </Tabs>
  )
}
