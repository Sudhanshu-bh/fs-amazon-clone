import React from 'react'
import './ProfileOption2.css'

function ProfileOption2({ title, ...props }) {
  return (
    <div className="profileOption2">
      <h5>{title}</h5>
      {props.children}
    </div>
  )
}

export default ProfileOption2
