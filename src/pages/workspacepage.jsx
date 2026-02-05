import { useParams } from "react-router";

const WorkspacePage = ()=>{
  const workspaceId = useParams().workspaceId
  return(
    <div>
      I am inside the workspace page of id {workspaceId}
    </div>
  )
}
export default WorkspacePage;