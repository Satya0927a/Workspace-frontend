import { Routes, Route,BrowserRouter, Navigate } from "react-router"
import Loginpage from "./pages/loginpage"
import { useState } from "react"
import ProtectedPage from "./pages/protectedpage"
import AppPage from "./pages/apppage"
import { Toaster } from "./components/ui/sonner"
import WorkspacePage from "./pages/workspacepage"
function App() {
  const [user,setuser] = useState(null)
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Navigate to={'/app'}></Navigate>}></Route>
        <Route path="/login" element={<Loginpage setuser={setuser}/>}></Route>
        <Route path='/app' element={<ProtectedPage user={user} setuser={setuser}><AppPage user={user} setuser={setuser}/></ProtectedPage>}></Route>
        <Route path='/app/workspace/:workspaceId' element={<WorkspacePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
