import React ,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Login = () => {
  const [credentials,setcredentials]=useState({email:"",password:""})
  let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
        const response=await fetch('http://localhost:5000/api/loginuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const data=await response.json()
        console.log(data);
        if(!data.success){
            alert("Enter valid credentials")
        }
        if(data.success){
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",data.authToken)
          console.log(localStorage.getItem("authToken"))
            navigate("/")
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
          <div className="container">
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
    <div id="passwordHelp" className="form-text">Password should be mimimum 8 characters</div>
  </div>
  <button type="submit" className="btn btn-success m-3">Login</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>New user? Signup here</Link>
</form>
</div>

    </>
  )
}

export default Login
