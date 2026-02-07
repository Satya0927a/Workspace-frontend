import { AppSidebar } from "@/components/custom/appsidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AddTask, createProject, fetchWorkspace } from "@/services/user";
import { CrosshairIcon, CrossIcon, EditIcon, FilesIcon, FileTextIcon, PlusIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskTable from "./data-table";
import { Column } from "./columns";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxList, ComboboxContent, ComboboxItem } from "@/components/ui/combobox";
import { Toast } from "radix-ui";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const WorkspacePage = ({ user, setuser }) => {
  const workspaceId = useParams().workspaceId
  const [workspace, setworkspace] = useState(null)
  console.log(workspace);

  useEffect(() => {
    async function fetchdata() {
      try {
        const data = await fetchWorkspace(workspaceId, user.token)
        setworkspace(data)
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchdata()
  }, [workspaceId, user.token])

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={user} setuser={setuser} />
        <main className="w-full">
          <SidebarTrigger />
          {workspace ? <AfterFetch workspace={workspace} setworkspace={setworkspace} /> : null}
        </main>
      </SidebarProvider>
    </div>
  )
}

const AfterFetch = ({ workspace, setworkspace }) => {
  return (
    <section className="flex flex-col items-center">
      <div className="flex gap-5  w-full justify-center relative">
        <div className="flex gap-5 ">
          <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balanced flex underline"> <FileTextIcon className="scale-150 relative top-1 right-1" />{workspace.workspaceName}</h1>
          <Button variant="outline"><EditIcon className="scale-150" /></Button>
        </div>
        <div className=" absolute right-20" >
          {workspace.projects.length != 0 ? <CreateProjectBtn workspace={workspace} setworkspace={setworkspace} /> : null}
        </div>
      </div>
      {workspace.projects.length != 0 ? <NotEmptyProject workspace={workspace} setworkspace={setworkspace} projects={workspace.projects} /> : <EmptyProject workspace={workspace} setworkspace={setworkspace} />}
    </section>
  )
}
const EmptyProject = ({ workspace, setworkspace }) => {

  return (
    <>
      <Empty className='mt-50'>
        <EmptyHeader>
          <FilesIcon />
          <EmptyTitle>No Projects in this Workspace</EmptyTitle>
          <EmptyDescription>Start by creating a new project to work and collaborate with others</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateProjectBtn workspace={workspace} setworkspace={setworkspace} />
        </EmptyContent>
      </Empty>

    </>
  )
}
const NotEmptyProject = ({ workspace, setworkspace, projects }) => {
  return (
    <>

      <div className="w-full flex flex-col items-center mt-10 gap-20">
        {projects.map((project) => {
          return (
            <Project key={project.id} workspace={workspace} setworkspace={setworkspace} project={project} />
          )
        })}
      </div>
    </>
  )
}
const Project = ({ workspace, setworkspace, project }) => {
  const [openaddtaskfield, setopenaddtaskfield] = useState(false)
  return (
    <div className=" w-[90%] flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="scroll-m-20  text-[26px] font-semibold tracking-tight text-balanced">{project.project} </h1>
          <PriorityBadge priority={project.priority} />
        </div>
        <p>{project.description}</p>
      </div>
      {!openaddtaskfield ? <Button onClick={() => { setopenaddtaskfield(true) }} variant="outline" className='w-fit'> <PlusIcon />Add tasks</Button> : <AddTaskField workspace={workspace} setworkspace={setworkspace} project={project} setopenaddtaskfield={setopenaddtaskfield} />}
      <TaskTable columns={Column} data={project.tasks} />
    </div>
  )
}
const AddTaskField = ({ workspace, setworkspace, project, setopenaddtaskfield }) => {
  const [task, settaks] = useState(null)
  const handleAddingtask = async () => {
    if (!task) {
      toast.error('Task cannot be empty', { position: 'top-right' })
      return
    }
    try {
      const data = await AddTask(task, project._id, localStorage.getItem('token'))
      const updatedproject = { ...project, tasks: project.tasks.concat(data.newTask) }
      const updatedworkspace = {
        ...workspace, projects: workspace.projects.map((proj) => {
          if (proj._id == project._id) {
            return updatedproject
          }
          else {
            return proj
          }
        })
      }
      setworkspace(updatedworkspace) 
      settaks(null)
      toast.success('Task added successfully', { position: 'top-right' })
      console.log(task);
    } catch (error) {
      const errormessage = error.response.data.message
      toast.error('Failed to add task: ' + errormessage, { position: 'top-right' })
    }
  }
  return (
    <div className="flex w-100 gap-2 items-center">
      <Input placeholder="Enter task" onChange={(e) => { settaks(e.target.value) }} value={task ? task : ""} />
      <Button className='' variant="outline" onClick={handleAddingtask}>Add</Button>
      <Button className='bg-red-50 text-red-700 hover:bg-red-100' onClick={() => { setopenaddtaskfield(false) }}><PlusIcon className=" rotate-45 scale-150" /></Button>

    </div>
  )
}
const PriorityBadge = ({ priority }) => {
  if (priority == "High") {
    return <Badge className="bg-red-50 text-red-700">{priority} priority</Badge>
  }
  else if (priority == "Mid") {
    return <Badge className="bg-yellow-50 text-yellow-700">{priority} priority</Badge>
  }
  else {
    return <Badge className="bg-blue-50 text-blue-700">{priority} priority</Badge>
  }
}
const CreateProjectBtn = ({ workspace, setworkspace }) => {
  const priorityItems = ['Low', 'Mid', 'High']
  const [projectName, setprojectName] = useState('')
  const [description, setdescription] = useState('')
  const [priority, setpriority] = useState('')
  async function handleProjectCreation() {
    if (!projectName || !description || !priority) {
      toast.error('Invalid Input', { position: 'top-right' })
      return
    }
    try {
      const data = await createProject(projectName, description, priority, workspace._id, localStorage.getItem('token'))
      const updatedworkspace = { ...workspace, projects: workspace.projects.concat(data.newProject) }
      setworkspace(updatedworkspace)
      toast.success('Project Created Successfully', { position: 'top-right' })
    } catch (error) {
      const errormessage = error.response.data.message
      toast.error('Failed to create project: ' + errormessage, { position: 'top-right' })
    }
  }
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button> <PlusIcon />Create Project</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Field>
            <FieldGroup>
              <FieldContent>
                <FieldLabel>Project Name</FieldLabel>
                <Input value={projectName} onChange={(e) => setprojectName(e.target.value)}></Input>
              </FieldContent>
            </FieldGroup>
            <FieldGroup>
              <FieldContent>
                <FieldLabel>Description</FieldLabel>
                <Input value={description} onChange={(e) => setdescription(e.target.value)}></Input>
              </FieldContent>
            </FieldGroup>
            <FieldGroup>
              <FieldContent>
                <FieldLabel>Priority</FieldLabel>
                <Combobox items={priorityItems} onValueChange={setpriority}>
                  <ComboboxInput placeholder="Set Priority" />
                  <ComboboxContent>
                    <ComboboxEmpty>No Item found</ComboboxEmpty>
                    <ComboboxList>
                      {priorityItems.map((item) => {
                        return (
                          <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
                        )
                      })}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FieldContent>
            </FieldGroup>
            <Button onClick={handleProjectCreation}>Create Project</Button>
          </Field>
        </PopoverContent>
      </Popover>
    </>
  )
}
export default WorkspacePage