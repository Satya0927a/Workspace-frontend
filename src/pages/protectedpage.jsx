import axios from "axios"
import { Navigate ,useNavigate} from "react-router"

const ProtectedPage = ({user,setuser,children})=>{
  const navigate = useNavigate()
  if(!user){
    const token = localStorage.getItem('token')
    if(token){
      async function fetchdata() {
        try {
          const result =  await axios.get('/api/user/data',{
            headers:{
              Authorization: `Bearer ${token}`  
            }
          })
          const user = {...result.data.userdata,token:token}
          setuser(user)
          return(
            <Navigate to='/app'></Navigate>
          )
        } catch (error) {
          console.log(error.response.data);
          navigate('/login')
        }
      }
      fetchdata()
    }
    else{
      return(
        <Navigate to='/login'></Navigate>
      )
    }
  }
  else{
    return(
      children
    )
  }

}
export default ProtectedPage