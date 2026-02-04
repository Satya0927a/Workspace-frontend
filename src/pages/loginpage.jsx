import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router"

const Loginpage = ({setuser}) => {
  const [isnewuser, setisnewuser] = useState(false)
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)
  const navigate = useNavigate()
  // console.log(username, password);
  async function handleSignup() {
    if (!username || !password) {
      toast.error("Invalid Input", {
        position: "top-right",
      })
      return
    } if (username.length < 3 || password.length < 8) {
      toast.error("Invalid Input", {
        position: "top-right",
      })
      return
    }
    try {
      const result = await axios.post('/api/user/create', {
        username: username.trim(),
        password: password.trim()
      })
      toast.success(result.data.message, { position: 'top-right' })
    } catch (error) {
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }
  async function handleLogin() {
    if (!username || !password) {
      toast.error("Invalid Input", {
        position: "top-right",
      })
      return
    } if (username.length < 3 || password.length < 8) {
      toast.error("Invalid Input", {
        position: "top-right",
      })
      return
    }
    try {
      const result = await axios.post('/api/user/login', {
        username: username.trim(),
        password: password.trim()
      })
      toast.success(result.data.message, { position: 'top-right' })
      const userdata = {...result.data.userdata,token:result.data.token}
      setuser(userdata)
      localStorage.setItem('token',userdata.token)
      navigate('/app')
    } catch (error) {
      toast.error(error.response.data.message, { position: 'top-right' })
    }
  }

  return (
    <div>
      <Toaster></Toaster>
      <div>
        <h1 className='mt-20 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance' >Welcome to Workspace</h1>
      </div>
      <FieldSet className='m-auto mt-10  w-90 flex flex-col items-center'>
        {!isnewuser && <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Login</h1>}
        {isnewuser && <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>SignUp</h1>}
        <FieldGroup className="flex flex-col  items-center">
          <Field>
            <FieldLabel htmlFor='username'>Username</FieldLabel>
            <Input id='username' type='text' placeholder='Min 3 letters' value={username ? username : ""} onChange={(e) => { setusername(e.target.value) }}></Input>
            {isnewuser ? <FieldDescription>Choose a unique username for your account</FieldDescription> : <FieldDescription>Enter the username</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input id='password' type='password' placeholder='Min 8 Charecters' value={password ? password : ""} onChange={(e) => { setpassword(e.target.value) }}></Input>
          </Field>
        </FieldGroup>
        {!isnewuser && <Button className='w-20 cursor-pointer' onClick={handleLogin}>Login</Button>}
        {isnewuser && <Button className='w-20 cursor-pointer' onClick={handleSignup}>Signup</Button>}
        <Separator></Separator>
        {!isnewuser && <p>New User? <span className="underline cursor-pointer" onClick={() => { setisnewuser(true) }}>Create an account</span></p>}
        {isnewuser && <p>Already an User? <span className="underline cursor-pointer" onClick={() => { setisnewuser(false) }}>Login in your account</span></p>}
      </FieldSet>
    </div>
  )
}
export default Loginpage