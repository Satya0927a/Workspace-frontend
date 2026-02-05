import axios from "axios";

const createWorkspace = async (workspaceName, token) => {
  try {
    const result = await axios.post('/api/workspace/create', {
      workspaceName: workspaceName,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error.response.data
  }
}

export default createWorkspace