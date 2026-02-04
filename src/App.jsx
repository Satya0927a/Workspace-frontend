import { Routes, Route,BrowserRouter, Navigate } from "react-router"
import Loginpage from "./pages/loginpage"
import { useState } from "react"
import ProtectedPage from "./pages/protectedpage"
import AppPage from "./pages/apppage"
function App() {
  const [user,setuser] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/app'}></Navigate>}></Route>
        <Route path="/login" element={<Loginpage setuser={setuser}/>}></Route>
        <Route path='/app' element={<ProtectedPage user={user} setuser={setuser}><AppPage user={user} setuser={setuser}/></ProtectedPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
