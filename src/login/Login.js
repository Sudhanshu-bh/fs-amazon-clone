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

      <div className="login__outerContainer">

        <div className="login__innerContainer">
          <h1 className="login__header">Sign-In</h1>

          <form action="">
            <h5>Email</h5>
            <input type="email" maxLength="120" />

            <h5>Password</h5>
            <input type="password" />

            <button className="am-orange-button login__signInButton">Sign In</button>
          </form>

          <p className="login__privacy">
            <small>
              By continuing, you agree to Amazon's FAKE CLONE's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
            </small>
          </p>
        </div>

        <div className="login__smallTextContainer">
          <div className="login__smallText">New to Amazon?</div>
        </div>
        <button className="am-button login__registerButton">Create your Amazon account</button>

      </div>

      <div className="login__footer">
        <div className="links">
          <Link to="#">Conditions of Use</Link>
          <Link to="#">Privacy Notice</Link>
          <Link to="#">Help</Link>
        </div>

        <span>© 1996-2021, Amazon.com, Inc. or its affiliates</span>
      </div>
    </div>
  )
}

export default Login
