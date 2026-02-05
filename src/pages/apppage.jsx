import { AppSidebar } from "@/components/custom/appsidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ScrollBar } from "@/components/ui/scroll-area";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import createWorkspace from "@/services/user";
import { CatIcon, FileIcon, FileInputIcon, PlusIcon, Sidebar } from "lucide-react";
import { DropdownMenu, ScrollArea, Separator, Toast } from "radix-ui";
import { useState } from "react";

const AppPage = ({ user, setuser }) => {
  console.log(user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex flex-col items-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Welcome {user.username}</h1>
          {user.workspace.length == 0 ? <Noworkspace token={user.token} setuser={setuser} /> : <HaveWorkspace workspace={user.workspace} />}
        </div>
      </main>
    </SidebarProvider>
  )
}
const Noworkspace = ({ token, setuser }) => {
  const [workspaceName, setworkspaceName] = useState(null)
  async function handleCreateWorkspace() {
    if (!workspaceName) {

    }
    const data = await createWorkspace(workspaceName, token)
    console.log(data);
  }
  return (
    <Empty className=' w-fit m-auto'>
      <EmptyHeader>
        <FileInputIcon />
        <EmptyTitle>You have no Workspace</EmptyTitle>
        <EmptyDescription>Start by creating a new workspace to work and collaborate with others</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Popover>
          <PopoverTrigger>
            <Button> <PlusIcon /> Create Workspace</Button>
          </PopoverTrigger>
          <PopoverContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel forhtml='Workspacename'>Workspace Name</FieldLabel>
                  <Input id='Workspacename' type='text' value={workspaceName ? workspaceName : ''} onChange={(e) => { setworkspaceName(e.target.value) }} placeholder='Coding Class'></Input>
                  <FieldDescription>e.g Coding classes, DSA, Yoga, etc.</FieldDescription>
                </Field>
                <Button onClick={handleCreateWorkspace}>Create</Button>
              </FieldGroup>
            </FieldSet>
          </PopoverContent>
        </Popover>
      </EmptyContent>
    </Empty>
  )
}
const HaveWorkspace = ({ workspace }) => {
  return (
    <Card className="mt-10 w-[90%]">
      <CardHeader>
        <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Your Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5 flex-wrap">
          {workspace.map((elem,index)=>{return <WorkspaceCard key={index} name={elem.workspaceName}/>})}
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
const WorkspaceCard = ({name}) => {
  return (
    <Card className='w-50 h-50 cursor-pointer transition-all hover:scale-110'>
      <CardHeader>
        <CardTitle>Coding class</CardTitle>
      </CardHeader>
    </Card>
  )
}
export default AppPage