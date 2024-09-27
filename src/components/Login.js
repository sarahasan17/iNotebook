import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Login(props) {
  const host = "http://localhost:5000";
  let navigate=useNavigate()
  const [credentials,setCredentials]=useState({email:"",password:""})
  const handleSubmit= async(e)=>{
    e.preventDefault();
     const response = await fetch(`${host}/api/auth/userLogin`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email:credentials.email,password:credentials.password}), // Pass note data
     });
     const json=await response.json();
     if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/");
        props.showAlert("login successful", "success");
        
     }else{
        props.showAlert("invalid credentials","danger")
     }
     console.log(json)
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-3">
        <h2>Login to continue</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login
