import { AppWindowIcon, CodeIcon, RotateCcw } from "lucide-react"
import { useState } from "react"
import type { GridLayout } from "@/shared/components/container/grid"
import { LayoutPicker } from "@/shared/components/custom/layout-picker"
import { Button } from "@/shared/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

interface DemoPageProps {
  title: string
  renderPreview: (layout: GridLayout) => React.ReactNode
  renderCode: () => React.ReactNode
  hasChanges?: boolean
  onReset?: () => void
}

export function DemoPage({
  title,
  renderPreview,
  renderCode,
  hasChanges,
  onReset,
}: DemoPageProps) {
  const [layout, setLayout] = useState<GridLayout>("1")

  return (
    <div className="xl:px-36 flex flex-col gap-4">
      <div className="text-5xl font-extrabold">{title}</div>
      <Tabs defaultValue="preview">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="h-auto! p-1">
            <TabsTrigger value="preview" className="px-4 py-2">
              <AppWindowIcon /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="px-4 py-2">
              <CodeIcon /> Code
            </TabsTrigger>
          </TabsList>
          <div className="h-full flex gap-3">
            {hasChanges && (
              <Button
                variant="outline"
                className="flex h-full px-4"
                onClick={onReset}
              >
                <RotateCcw /> <p className="max-sm:hidden">Reset</p>
              </Button>
            )}
            <LayoutPicker value={layout} onChange={setLayout} />
          </div>
        </div>

        <TabsContent value="preview">{renderPreview(layout)}</TabsContent>
        <TabsContent value="code">{renderCode()}</TabsContent>
      </Tabs>
    </div>
  )
}
