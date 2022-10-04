import React from 'react'
import { NavLink } from 'react-router-dom'


const LeftNav = () => {
  return (
    <div className='left-nav-container'>
      <div className='icons'>
        <NavLink to="/" exact activeClasseName='active-Left-Nav'>
            <i class="fas fa-home-alt"></i>
        </NavLink>
        <br/>
        <NavLink to="/trending" exact activeClasseName='active-Left-Nav'>
            <i class="fas fa-rss"></i>
        </NavLink>
        <br/>
        <NavLink to="/profil" exact activeClasseName='active-Left-Nav'>
            <i class="fas fa-user"></i>
        </NavLink>
        <br/>
      </div>
    </div>
  )
}

export default LeftNav
