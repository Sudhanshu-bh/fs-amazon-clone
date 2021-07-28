import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import Toast from '../reusable/Toast'
import LoaderButton from '../reusable/LoaderButton'

function Login() {

  const history = useHistory()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [invalidEmail, setinvalidEmail] = useState("")
  const [invalidPassword, setinvalidPassword] = useState("")
  const [toast, settoast] = useState({ text: "", type: "success" })  // type can be success, danger, or anything else.

  const updateEmail = e => {
    setemail(e.target.value)
    setinvalidEmail("")
  }

  const updatePassword = e => {
    setpassword(e.target.value)
    setinvalidPassword("")
  }

  const signIn = e => {

    e.preventDefault()
    setIsLoading(true)

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // if (!auth.currentUser.emailVerified) {
        //   console.log("Email not yet verified!")
        //   auth.signOut()
        //   history.push({
        //     pathname: "/verifyemail",
        //     state: { email: email }
        //   })
        // }
        // console.log("auth.user.isEmailVerified: ", auth.currentUser.emailVerified)
        settoast({ text: "", type: "success" })
        history.push({
          pathname: "/",
          state: { toast: toast }
        })
      })
      .catch(error => {
        // console.log(error)
        setIsLoading(false)

        if (error.code === "auth/invalid-email") {
          setinvalidEmail("Please enter a valid email address.")
        } else if (error.code === "auth/user-not-found") {
          setinvalidEmail("This email is not registered with us.")
        } else if (error.code === "auth/wrong-password") {
          setinvalidPassword("Please enter the correct password.")
        } else if (error.code === "auth/network-request-failed") {
          settoast({ text: "Please check your internet connection!", type: "danger" })
        }
      }
      )
  }

  return (
    <>

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

            <form>
              <h5>Email</h5>
              <input
                autoFocus
                type="email"
                onChange={e => updateEmail(e)}
                value={email}
                maxLength="100"
                spellCheck="false"
              />
              <div className="login__invalidAlertText">
                {invalidEmail}
              </div>

              <h5 id="login__passwordLabel">Password</h5>
              <input
                id="login__passwordInput"
                type="password"
                onChange={e => updatePassword(e)}
                value={password}
                maxLength="40"
              />
              <div className="login__invalidAlertText">
                {invalidPassword}
              </div>

              <LoaderButton type="submit" onClick={signIn}
                isLoading={isLoading} className="am-orange-button login__signInButton">
                Sign In
              </LoaderButton>


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

          <Link to="/signup">
            <button
              className="am-button login__registerButton">
              Create your Amazon account
            </button>
          </Link>

        </div>

        <div className="login__footer">
          <div className="links">
            <Link to="#">Conditions of Use</Link>
            <Link to="#">Privacy Notice</Link>
            <Link to="#">Help</Link>
          </div>

          <span>© 2021, FS Amazon Clone | All Rights Reserved</span>
        </div>
      </div>

      <Toast toast={toast} settoast={settoast} />

    </>
  )
}

export default Login
