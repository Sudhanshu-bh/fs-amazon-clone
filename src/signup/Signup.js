import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'
import { auth } from '../firebase'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import LoaderButton from '../reusable/LoaderButton'

function Signup() {

  const history = useHistory()
  const [displayName, setdisplayName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [isLoading, setisLoading] = useState(false)

  const [invalidName, setinvalidName] = useState("")
  const [invalidEmail, setinvalidEmail] = useState("")
  const [invalidPassword, setinvalidPassword] = useState("signup__normalInfo")

  const updateName = e => {
    setdisplayName(e.target.value)
    setinvalidName("")
  }

  const updateEmail = e => {
    setemail(e.target.value)
    setinvalidEmail("")
  }

  const updatePassword = e => {
    setpassword(e.target.value)
    setinvalidPassword("signup__normalInfo")
  }

  const register = (e) => {
    e.preventDefault()

    if (displayName === "") {
      setinvalidName("Please enter your name.")
      return
    }

    setisLoading(true)

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (auth2) => {
        if (auth2) {
          await auth.signInWithEmailAndPassword(email, password)
          auth.currentUser.updateProfile({
            displayName: displayName,
          }).then(() => {
            history.push("/")
          }).catch(error => {
            console.log(error)
            setisLoading(false)
          })
          // history.push("/")
        }
      })
      .catch(error => {
        setisLoading(false)

        // console.log(error)

        if (error.code === "auth/invalid-email") {
          setinvalidEmail("Please enter a valid email id.")
        } else if (error.code === "auth/email-already-in-use") {
          setinvalidEmail("This email is already in use by another account.")
        } else if (error.code === "auth/weak-password") {
          setinvalidPassword("signup__redInfo")
        }
      })
  }

  return (
    <>
      <div className="signup">
        <Link to="/">
          <img
            className="signup__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png"
            alt="Amazon logo"
          />
        </Link>

        <div className="signup__outerContainer">
          <div className="signup__innerContainer">
            <h2 className="signup__header">Create Account</h2>

            <form>
              <h5>Your name</h5>
              <input
                type="text"
                onChange={e => updateName(e)}
                value={displayName}
                maxLength="100"
                spellCheck="false"
              />
              <div className="signup__invalidAlert">
                {invalidName}
              </div>

              <h5>Email</h5>
              <input
                type="email"
                onChange={e => updateEmail(e)}
                value={email}
                maxLength="100"
                spellCheck="false"
              />
              <div className="signup__invalidAlert">
                {invalidEmail}
              </div>

              <h5>Password</h5>
              <input
                type="password"
                onChange={e => updatePassword(e)}
                value={password}
                placeholder="At least 6 characters"
                maxLength="100"
              />
              <small className={invalidPassword}>
                <InfoOutlinedIcon fontSize="inherit" />&nbsp;
                Password must be at least 6 characters.
              </small>

              <LoaderButton type="submit" onClick={register}
                isLoading={isLoading} className="am-orange-button signup__continue">
                Continue
              </LoaderButton>

            </form>
          </div>

          <div className="signup__smallTextContainer">
            <div className="signup__smallText">Already have an account?</div>
          </div>

          <Link to="/login">
            <button
              className="am-button signup__signinButton">
              Sign In
            </button>
          </Link>

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
    </>
  )
}

export default Signup
