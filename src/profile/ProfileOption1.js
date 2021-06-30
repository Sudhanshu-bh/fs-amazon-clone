import React from 'react'
import { Link } from 'react-router-dom'
import './ProfileOption1.css'

function ProfileOption1({ image, title, desc, link }) {
  return (

    <Link
      className="profileOption1"
      to={link} >
      <img
        className="profileOption1__image"
        src={image}
        alt=""
      />
      <div className="profileOption1__info">
        <h5 className="profileOption1__title">{title}</h5>
        <small className="profileOption1__desc">{desc}</small>
      </div>
    </Link>

  )
}

export default ProfileOption1