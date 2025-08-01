
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'; 
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate=useNavigate();

  const addData=((e)=>{
    e.preventDefault();
    var newEntry={
      email:email,
      pass:password
    };
    axios.post(`https://gapp-h0rb.onrender.com/login`,newEntry)
    .then((res)=>{
      alert(res.data.message)
      console.log(res.data.data._id);
      localStorage.setItem("user",res.data.data._id)
      navigate('/home');
    })
    .catch((err)=>alert(err.message))
    setEmail("")
    setPassword("")
   
  })
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={addData}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;