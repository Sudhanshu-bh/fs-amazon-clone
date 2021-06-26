import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {

  const history = useHistory()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const signIn = e => {

    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push("/")
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/")
        }
      })
      .catch(error => alert(error.message))
  }

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
          <h2 className="login__header">Sign-In</h2>

          <form action="">
            <h5>Email</h5>
            <input
              type="email"
              onChange={e => setemail(e.target.value)}
              value={email}
              maxLength="100"
            />

            <h5>Password</h5>
            <input
              type="password"
              onChange={e => setpassword(e.target.value)}
              value={password}
              maxLength="40"
            />

            <button
              className="am-orange-button login__signInButton"
              type="submit"
              onClick={signIn}>
              Sign In
            </button>
          </form>

          <p className="login__privacy">
            <small>
              By continuing, you agree to Amazon's FAKE CLONE's <Link to="#">Conditions of Use</Link> and <Link to="#">Privacy Notice</Link>.
            </small>
          </p>
        </div>

        <div className="login__smallTextContainer">
          <div className="login__smallText">New to Amazon?</div>
        </div>
        <button
          className="am-button login__registerButton"
          onClick={register}>
          Create your Amazon account
        </button>

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
