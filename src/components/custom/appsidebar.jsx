import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Item, ItemContent, ItemTitle } from "../ui/item"
import { ChevronDown, DeleteIcon, EllipsisVertical, HdIcon, HomeIcon, SearchIcon, TrashIcon, User, UserIcon, WorkflowIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Avatar, AvatarBadge, AvatarFallback } from "../ui/avatar"
import { useLocation } from "react-router"
export function AppSidebar({ user, setuser }) {
  const path = useLocation().pathname
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={`${path == '/app' ? "bg-white border shadow-2xl" : ""}`}>
                <a href="/app"><HomeIcon />Home</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <SearchIcon />
                Search
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserIcon />
                Invites
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <Collapsible defaultOpen>
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
                      <SidebarMenuSubButton key={workspace._id} asChild className={`p-2 hover:bg-gray-200 cursor-pointer ${path == `/app/workspace/${workspace._id}` ? "bg-white border" : ""}`}>
                        <a href={`/app/workspace/${workspace._id}`}>{workspace.workspaceName}</a>
                      </SidebarMenuSubButton>
                    ))}
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger className=' w-full'>
              <SidebarMenuButton className=' '>

                <Avatar>
                  <AvatarFallback>
                    {user.username[0]}
                  </AvatarFallback>
                </Avatar>
                <AvatarBadge className='bg-green-600' />
                {user.username}
                <EllipsisVertical className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[]"t>
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <TrashIcon />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

