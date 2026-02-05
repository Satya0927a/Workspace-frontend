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

export default createWorkspace