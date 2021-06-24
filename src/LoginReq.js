import React from 'react'
import './LoginReq.css'

function LoginReq({ children, show }) {

  return (
    <>
      {show && (
        <div className="loginReq">
          {children}
        </div>
      )}
    </>
  )
}

export default LoginReq
