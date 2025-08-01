import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';
import"../styles/res.css";



const Register = () => {
    const  [username,setUsername]=useState("")
    const  [age,setAge]=useState(0)
    const  [email,setEmail]=useState("")
    const  [phone,setPhone]=useState("")
    const  [password,setPassword]=useState("")
    var nav=useNavigate()

    const addData=(e)=>{
        e.preventDefault();
        const newEntry={
            username:username,
            email:email,
            pass:password,
            phonenum:phone,
            age:age
        }
        axios.post("https://gapp-h0rb.onrender.com/user/post",newEntry)
        .then((res)=>alert(res.data.message))
        .catch(err=>alert(err.message))
        nav("/")

    }
  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form style={styles.form}>

        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e)=>setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          required
           onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Age"
          required
           onChange={(e)=>setAge(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
           onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          required
           onChange={(e)=>setPhone(e.target.value)}
          style={styles.input}
        />
        <button onClick={addData} style={styles.button}>
          Register
        </button>
        <p>Already Signup <Link to={"/"}>Login!</Link></p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    background: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Register;