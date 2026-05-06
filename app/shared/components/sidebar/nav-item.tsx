import { NavLink } from "react-router"
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar"

interface NavItemProps {
  title: string
  url: string
}

export default function NavItem({ title, url }: NavItemProps) {
  return (
    <SidebarMenuSubItem>
      <NavLink to={url}>
        {({ isActive }) => (
          <SidebarMenuSubButton isActive={isActive}>
            {title}
          </SidebarMenuSubButton>
        )}
      </NavLink>
    </SidebarMenuSubItem>
  )
}
