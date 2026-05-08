import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import { useTheme } from "@/shared/components/providers/theme-provider"
import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

interface CodeBlockProps {
  code: string
  fileName?: string
}

export function CodeBlock({ code, fileName = "TSX" }: CodeBlockProps) {
  const { theme } = useTheme()
  const [html, setHtml] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    codeToHtml(code, {
      lang: "tsx",
      theme: theme === "light" ? "github-light" : "github-dark",
    }).then(setHtml)
  }, [code, theme])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">
          {fileName}
        </span>
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
      <div
        className="text-sm [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:min-w-full"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: code highlight
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
