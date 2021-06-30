import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import './Security.css'
import { useStateValue } from '../StateProvider'

function Security() {
  const [{ user }] = useStateValue()

  return (
    <>
      <Header />

      <div className="security">
        <div className="security__inner">

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to="/user"><small>Your Account</small></Link></li>
              <li class="breadcrumb-item active" aria-current="page"><small>Login & Security</small></li>
            </ol>
          </nav>

          <h2 className="security__header">Login & Security</h2>
          <div className="security__container">

            <div className="security__entry">
              <div className="">
                <div className="security__entryTitle">Name:</div>
                <div>{user?.displayName}</div>
              </div>

              <button className="security__editButton am-button">Edit</button>
            </div>

            <div className="security__entry">
              <div className="">
                <div className="security__entryTitle">E-mail:</div>
                <div>{user?.email}</div>
              </div>

              <button className="security__editButton am-button">Edit</button>
            </div>

            <div className="security__entry last">
              <div className="">
                <div className="security__entryTitle">Password:</div>
                <div>********</div>
              </div>

              <button className="security__editButton am-button">Edit</button>
            </div>

          </div>

          <Link to="/user">
            <button className="security__doneButton am-orange-button">Done</button>
          </Link>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Security
