// import { Calendar, Search, Settings } from "lucide-react"
import FotosIcon2 from '@/components/SVG/FotosIcon2'
import Lupa from '@/components/SVG/Lupa'
import Etiqueta from '@/components/SVG/Etiqueta'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Fotos",
    url: "#",
    icon: FotosIcon2,
  },

  {
    title: "Buscar",
    url: "#",
    icon: Lupa,
  },
  {
    title: "Etiquetes",
    url: "#",
    icon: Etiqueta,
  }
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
