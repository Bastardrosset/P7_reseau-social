import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'


const NavBar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)


  return (
    <nav>
        <div className='nav-container'>
            <div className='logo'>
                <NavLink exact to="/">
                <div className='logo'>
                    <img src='/img/logo.png' alt='Logo du groupe groupomania'></img>
                    <h1>Groupomania</h1>
                </div>
                </NavLink>
            </div>
        </div>
            <div className='iconConnect'>
              {uid ? (
                <ul>
                  <li className='welcome'>
                    <NavLink exact to="/profil">
                      <div className="avatar-user">
                        <h5>Bienvenue {userData.pseudo}</h5>
                        <img src= {'http://localhost:5000' + userData.picture} alt="Avatar user" />
                      </div>
                    </NavLink>
                  </li>
                  <Logout />
                </ul>
              ) : (
                <ul>
                  <NavLink exact to="/profil">
                    <i class="fas fa-power-off" exact activeClasseName='off on'></i>
                  </NavLink>
                </ul>
              )}
            </div>
    </nav>
  )
}

export default NavBar
