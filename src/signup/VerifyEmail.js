import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../firebase'
import LoaderButton from '../reusable/LoaderButton'
import Toast from '../reusable/Toast'
import './VerifyEmail.css'

function VerifyEmail() {
  const location = useLocation()
  const [emailId, setemailId] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const [toast, settoast] = useState({ text: "", type: "success" })

  useEffect(() => {
    setemailId(location.state?.email)
  }, [location])

  const resendEmail = () => {
    setisLoading(true)

    auth.currentUser?.sendEmailVerification()
      .then(() => {
        settoast({ text: "Verification email sent successfully!", type: "success" })
        setisLoading(false)
      })
      .catch(error => {
        console.log("Error while sending email: ", error)
        setisLoading(false)
      })
  }

  useEffect(() => {
    resendEmail()
  }, [])

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
          <div className="signup__innerContainer verifyEmail__innerContainer">
            <h2 className="login__header">Email Verification</h2>

            <p>
              We have sent an email to <strong>{emailId}</strong> for verification.
            </p>
            <p>Please follow the steps mentioned in that email to begin using your account.</p>

            <small className="verifyEmail__small">Didn't recieve the email?</small>
            <LoaderButton
              isLoading={isLoading}
              className="am-orange-button verifyEmail__resendButton"
              onClick={resendEmail}>
              Resend Email
            </LoaderButton>
          </div>

          <Link to="/">
            <button
              className="am-button verifyEmail__homeButton">
              Return to Home
            </button>
          </Link>

        </div>

        <div className="login__footer verifyEmail__footer">
          <div className="links">
            <Link to="#">Conditions of Use</Link>
            <Link to="#">Privacy Notice</Link>
            <Link to="#">Help</Link>
          </div>

          <span>© 1996-2021, Amazon.com, Inc. or its affiliates</span>
        </div>

      </div>

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default VerifyEmail
