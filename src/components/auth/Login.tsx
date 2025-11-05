import React from 'react'
import { useNavigate } from "react-router-dom";

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform login logic here
    navigate('/');
  };

  return (
    <div className='login-container'>
        <h1>Welcome Back 👋</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" id="username" name="username" placeholder="Username or email" />
              <input type="password" id="password" name="password" placeholder="Password" />
            </div>
            <div className='submit-button'>
              <button type="submit">Login</button>
            </div>
            <div className='forgot-password'>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div className='break-line'/>
            <div className='social-login'>
              <button className='google-login'>Google</button>
              <button className='github-login'>GitHub</button>
            </div>
            <div className='break-line'/>
            <div className='register-account'>
              <p>Don't have an account? </p>
              <a href="/register">Register</a>
            </div>
        </form>
    </div>
  )
}

export default Login