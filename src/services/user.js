import axios from "axios";

const createWorkspace = async (workspaceName, token) => {
  const result = await axios.post('/api/workspace/create', {
    workspaceName: workspaceName,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result.data
}
const fetchWorkspace = async (workspaceId, token) => {
  const result = await axios.get(`/api/workspace/fetch/${workspaceId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result.data
}
const createProject = async (projectName, Description, Priority, workspaceId, token) => {
  const result = await axios.post('/api/workspace/project/create', {
    project: projectName,
    description: Description,
    priority: Priority,
    workspaceId: workspaceId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result.data
}
const AddTask = async (task, fromprojectId, token) => {
  const result = await axios.post('/api/workspace/project/task/create', {
    task: task,
    fromProject: fromprojectId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result.data
}
export { createWorkspace, fetchWorkspace, createProject, AddTask }