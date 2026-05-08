import { AppWindowIcon, CodeIcon, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import Code from "@/features/drag-basic/components/code"
import Preview from "@/features/drag-basic/components/preview"
import type { GridLayout } from "@/shared/components/container/grid"
import { LayoutPicker } from "@/shared/components/custom/layout-picker"
import { Button } from "@/shared/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

export default function DragBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [layout, setLayout] = useState<GridLayout>("1")
  const [count, setCount] = useState(
    () => Number(searchParams.get("count")) || 1,
  )
  const [content, setContent] = useState(
    () => searchParams.get("content") || "",
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (count !== 1) params.set("count", String(count))
    else params.delete("count")

    if (content) params.set("content", content)
    else params.delete("content")

    setSearchParams(params, { replace: true })
  }, [count, content, searchParams, setSearchParams])

  const handleReset = () => {
    setCount(1)
    setContent("")
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="xl:px-36 flex flex-col gap-4">
      <div className="text-5xl font-extrabold">Draggable basic</div>
      <Tabs defaultValue="preview">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="h-auto! p-1">
            <TabsTrigger value="preview" className="px-4 py-2">
              <AppWindowIcon />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="px-4 py-2">
              <CodeIcon />
              Code
            </TabsTrigger>
          </TabsList>
          <div className="h-full flex gap-3">
            {searchParams.size !== 0 && (
              <Button
                variant={"outline"}
                className="flex h-full px-4"
                onClick={handleReset}
              >
                <RotateCcw />
                <p>Reset</p>
              </Button>
            )}
            <LayoutPicker value={layout} onChange={setLayout} />
          </div>
        </div>

        <TabsContent value={"preview"}>
          <Preview
            count={count}
            setCount={setCount}
            content={content}
            setContent={setContent}
            layout={layout}
          />
        </TabsContent>
        <TabsContent value={"code"}>
          <Code />
        </TabsContent>
      </Tabs>
    </div>
  )
}
