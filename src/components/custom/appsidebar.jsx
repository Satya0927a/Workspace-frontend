import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Item, ItemContent, ItemTitle } from "../ui/item"
import { ChevronDown, HdIcon, HomeIcon, SearchIcon, UserIcon, WorkflowIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
export function AppSidebar({user,setuser}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Item variant="" size="xs">
          <ItemContent>
            <ItemTitle> <UserIcon />{user.username}'s Workspace</ItemTitle>
          </ItemContent>
        </Item>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HomeIcon/>
              Home
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SearchIcon/>
              Search
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon />
              Invites
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <WorkflowIcon/>
                  Workspaces
                  <ChevronDown className="ml-auto"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  {user.workspace.map((workspace) => (
                    <DropdownMenuItem key={workspace._id} className="p-2 hover:bg-gray-200 cursor-pointer">{workspace.workspaceName}</DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

