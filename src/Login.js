import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className='login'>
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png"
          alt="Amazon logo"
        />
      </Link>
    </div>

  )
}

export default Login
