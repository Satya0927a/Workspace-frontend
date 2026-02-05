import { AppSidebar } from "@/components/custom/appsidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {  SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import createWorkspace from "@/services/user";
import {  FileInputIcon,  FileTextIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AppPage = ({ user, setuser }) => {
  console.log(user);

  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar user={user} setuser={setuser}/>
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex flex-col items-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Welcome {user.username}</h1>
          {user.workspace.length == 0 ? <Noworkspace token={user.token} setuser={setuser} user={user}/> : <HaveWorkspace workspace={user.workspace} token={user.token} user={user} setuser={setuser} />}
        </div>
      </main>
    </SidebarProvider>
  )
}
const Noworkspace = ({ token, setuser ,user}) => {
  const [workspaceName, setworkspaceName] = useState(null)
  async function handleCreateWorkspace() {
    if (!workspaceName) {

    }
    try {
      const data = await createWorkspace(workspaceName, token)
      const updatedUser = { ...user, workspace: [...user.workspace, data.newworkspace] }
      setuser(updatedUser)
      setworkspaceName('')
      toast.success(data.message, { position: 'top-right' })
    } catch (error) {
      const message = error.response.data.message
      toast.error(message, { position: 'top-right' })
    }
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
const HaveWorkspace = ({ workspace, token, user, setuser }) => {
  const [workspaceName, setworkspaceName] = useState(null)
  async function handleCreateWorkspace() {
    if (!workspaceName) {

    }
    try {
      const data = await createWorkspace(workspaceName, token)
      const updatedUser = { ...user, workspace: [...user.workspace, data.newworkspace] }
      setuser(updatedUser)
      setworkspaceName('')
      toast.success(data.message, { position: 'top-right' })
    } catch (error) {
      const message = error.response.data.message
      toast.error(message, { position: 'top-right' })
    }
  }
  return (
    <div className=" mt-10 w-400 flex flex-col gap-5 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Your Workspace</h1>
        <div>
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
        </div>
      </div>
      <Separator />
      <ScrollArea className=" w-full whitespace-nowrap">
        <div className="flex gap-5 p-5 ">
          {workspace.map((elem, index) => { return <WorkspaceCard key={index} name={elem.workspaceName} /> })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
const WorkspaceCard = ({ name }) => {
  return (
    <Card className='w-90 cursor-pointer transition-all hover:scale-105 transform-gpu'>
      <CardHeader>
        <FileTextIcon />
        <CardTitle className='text-[20px]'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className=''>
        <p>created on </p>
      </CardFooter>
    </Card>
  )
}

export default AppPage