import React from 'react'
import { NavLink } from 'react-router-dom'


const LeftNav = () => {
  return (
    <React.StrictMode>
      <div className='left-nav-container'>
        <div className='icons'>
          <NavLink to="/">
              <i className="fas fa-home-alt"></i>
          </NavLink>
          <br/>
          <NavLink to="/profil">
              <i className="fas fa-user"></i>
          </NavLink>
          <br/>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default LeftNav
