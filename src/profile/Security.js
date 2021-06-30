import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../reusable/Footer'
import Header from '../reusable/Header'
import './Security.css'

function Security() {
  return (
    <>
      <Header />

      <div className="security">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="">Your Account</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Login & Security</li>
          </ol>
        </nav>
      </div>

      <Footer />
    </>
  )
}

export default Security
