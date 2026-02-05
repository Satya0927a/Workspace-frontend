import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Item, ItemContent, ItemTitle } from "../ui/item"
import { HdIcon, HomeIcon, UserIcon, WorkflowIcon } from "lucide-react"
import { Separator } from "../ui/separator"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Item variant="" size="xs">
          <ItemContent>
            <ItemTitle> <UserIcon />Satya's Workspace</ItemTitle>
          </ItemContent>
        </Item>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <Item size="sm" className='hover:bg-white cursor-pointer'>
            <ItemContent>
              <ItemTitle><HomeIcon /> Home</ItemTitle>
            </ItemContent>
          </Item>
          <Item size="sm">
            <ItemContent>
              <ItemTitle><WorkflowIcon/>Workspace</ItemTitle>
            </ItemContent>
          </Item>
        </SidebarGroup>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

