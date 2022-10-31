import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Auth/Logout'


const NavBar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)


  return (
    <React.StrictMode>
      <nav>
          <div className='nav-container'>
              <div className='logo'>
                  <NavLink exact='true' to="/">
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
                      <NavLink exact='true' to="/profil">
                        <div className="avatar-user">
                          <h5>Bienvenue {userData.pseudo}</h5>
                          <img src= {
                            userData.picture ?
                            userData.picture :
                            '/img/noAvatar.png'} alt="Avatar user" />
                        </div>
                      </NavLink>
                    </li>
                    <Logout />
                  </ul>
                ) : (
                  <ul>
                    <NavLink exact='true' to="/profil">
                      <i className="fas fa-power-off"></i>
                    </NavLink>
                  </ul>
                )}
              </div>
      </nav>
    </React.StrictMode>

  )
}

export default NavBar
