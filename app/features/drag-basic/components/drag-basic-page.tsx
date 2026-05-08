import { AppWindowIcon, CodeIcon } from "lucide-react"
import { useState } from "react"
import Code from "@/features/drag-basic/components/code"
import Preview from "@/features/drag-basic/components/preview"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

export default function DragBasicPage() {
  const [count, setCount] = useState(1)
  const [content, setContent] = useState("")

  return (
    <div className="lg:px-36 flex flex-col gap-4">
      <div className="text-5xl font-extrabold">Draggable basic</div>
      <Tabs defaultValue="preview">
        <TabsList className="h-auto! p-1 mb-4">
          <TabsTrigger value="preview" className="px-4 py-2">
            <AppWindowIcon />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="px-4 py-2">
            <CodeIcon />
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"preview"}>
          <Preview
            count={count}
            setCount={setCount}
            content={content}
            setContent={setContent}
          />
        </TabsContent>
        <TabsContent value={"code"}>
          <Code />
        </TabsContent>
      </Tabs>
    </div>
  )
}
