import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",location:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location}))
        const response=await fetch('http://localhost:5000/api/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
        });
        const data=await response.json()
        console.log(data);
        if(!data.success){
            alert("Enter valid credentials")
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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
    <div id="passwordHelp" className="form-text">Password should be mimimum 8 characters</div>
    <div className="mb-3">
    <label htmlFor="exampleInputLocation1" className="form-label">Address</label>
    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange}/>
  </div>
  </div>
  <button type="submit" className="btn btn-success m-3">Signup</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user? Login here</Link>
</form>
</div>
    </>
  )
}

export default Signup
