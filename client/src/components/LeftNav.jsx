import React from 'react'
import { NavLink } from 'react-router-dom'


const LeftNav = () => {
  return (
    <React.StrictMode>
      <div className='left-nav-container'>
        <div className='icons'>
          <NavLink to="/">
              <i class="fas fa-home-alt"></i>
          </NavLink>
          <br/>
          <NavLink to="/trending">
              <i class="fas fa-rss"></i>
          </NavLink>
          <br/>
          <NavLink to="/profil">
              <i class="fas fa-user"></i>
          </NavLink>
          <br/>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default LeftNav
