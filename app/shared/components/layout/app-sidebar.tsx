import { ChevronRight } from "lucide-react"
import * as React from "react"
import { Link } from "react-router"
import dndkitLogo from "@/shared/assets/dnd-kit-logo.svg"
import NavItem from "@/shared/components/layout-ui/nav-item"
import { SearchForm } from "@/shared/components/layout-ui/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { navData } from "@/shared/constants/sidebar.constant"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-auto">
              <Link to="/">
                <div className="w-40 max-w-[100vw]">
                  <img src={dndkitLogo} alt="React Router" className="w-full" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {navData.map((navGroup) => (
          <>
            <SidebarGroupLabel className="ml-2 mt-4 -mb-3 uppercase">
              {navGroup.title}
            </SidebarGroupLabel>
            <SidebarGroup>
              <SidebarMenu>
                {navGroup.navMains.map((navMain) => (
                  <Collapsible
                    key={navMain.title}
                    defaultOpen={true}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      {!navMain.items?.length && navMain.url ? (
                        <NavItem
                          key={navMain.title}
                          title={navMain.title}
                          url={navMain.url}
                        />
                      ) : (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={navMain.title}>
                              <span>{navMain.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {navMain.items?.length ? (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {navMain.items.map((item) => (
                                  <NavItem
                                    key={item.title}
                                    title={item.title}
                                    url={item.url}
                                  />
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          ) : null}
                        </>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
