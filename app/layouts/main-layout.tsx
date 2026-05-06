import { Outlet } from "react-router"
import AppHeader from "@/shared/components/layout/app-header"
import { AppSidebar } from "@/shared/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
