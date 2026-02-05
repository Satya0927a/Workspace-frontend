import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Item, ItemContent, ItemTitle } from "../ui/item"
import { ChevronDown, HdIcon, HomeIcon, SearchIcon, User, UserIcon, WorkflowIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
export function AppSidebar({ user, setuser }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem className="flex items-center gap-2">
          <UserIcon />
          {user.username}'s Dashboard
        </SidebarMenuItem>

      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HomeIcon />
              Home
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SearchIcon />
              Search
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon />
              Invites
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <Collapsible>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <WorkflowIcon />
                  Workspaces
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-[--radix-popper-anchor-width]">
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                {user.workspace.map((workspace) => (
                  <SidebarMenuSubButton key={workspace._id} className="p-2 hover:bg-gray-200 cursor-pointer">{workspace.workspaceName}</SidebarMenuSubButton>
                ))}
                </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

