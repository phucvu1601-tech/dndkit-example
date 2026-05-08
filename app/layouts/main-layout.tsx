import { DragDropProvider } from "@dnd-kit/react"
import { Outlet } from "react-router"
import AppHeader from "@/shared/components/layout/app-header"
import { AppSidebar } from "@/shared/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden min-w-0">
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <DragDropProvider>
            <Outlet />
          </DragDropProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
