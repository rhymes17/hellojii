import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
  
      } catch (error) {
        setErr(true)
      }
      
  
    }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
        <span className="logo"><Link to="/">helloJii</Link></span>
            <span className="title">Log In</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Enter Your Password" />
                <button>Log in</button>
            </form>
            <p className="">Don't have an account? <Link to="/register">Sign Up</Link></p>
            {err && <span style={{color: "red"}}>Something went wrong! Please check your credentials</span>}
        </div>
    </div>
  )
}

export default Login